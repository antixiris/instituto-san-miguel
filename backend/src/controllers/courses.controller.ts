// Controlador de cursos
import { Response, NextFunction } from 'express';
import { AuthRequest, ApiResponse, CreateCourseData, UpdateCourseData } from '../types';
import { prisma } from '../utils/prisma';
import { slugify } from '../utils/slugify';
import { NotFoundError, AuthorizationError, ValidationError } from '../utils/errors';
import { UserRole, CourseStatus } from '@prisma/client';

/**
 * Obtener todos los cursos (público con filtros)
 */
export async function getAllCourses(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const {
      page = '1',
      limit = '12',
      search,
      category,
      level,
      featured,
      instructor,
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Construir filtros
    const where: any = {};

    // Solo mostrar cursos publicados para usuarios no autenticados o estudiantes
    if (!req.user || req.user.role === UserRole.STUDENT) {
      where.published = true;
      where.status = CourseStatus.PUBLISHED;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.categoryId = category as string;
    }

    if (level) {
      where.level = level;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (instructor) {
      where.instructorId = instructor as string;
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          instructor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          _count: {
            select: {
              modules: true,
              enrollments: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.course.count({ where }),
    ]);

    const response: ApiResponse = {
      success: true,
      data: {
        courses,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener un curso por slug
 */
export async function getCourseBySlug(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            bio: true,
          },
        },
        category: true,
        modules: {
          where: {
            isPublished: true,
          },
          orderBy: {
            order: 'asc',
          },
          include: {
            lessons: {
              where: {
                isPublished: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
            moduleTest: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundError('Curso no encontrado');
    }

    // Verificar si el curso está publicado (excepto para instructor y admin)
    if (
      !course.published &&
      (!req.user ||
        (req.user.role === UserRole.STUDENT && req.user.id !== course.instructorId))
    ) {
      throw new NotFoundError('Curso no encontrado');
    }

    // Verificar si el usuario está inscrito
    let isEnrolled = false;
    if (req.user) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: req.user.id,
            courseId: course.id,
          },
        },
      });
      isEnrolled = !!enrollment;
    }

    const response: ApiResponse = {
      success: true,
      data: {
        ...course,
        isEnrolled,
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Crear un nuevo curso (solo instructor y admin)
 */
export async function createCourse(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const data: CreateCourseData = req.body;

    // Generar slug único
    const baseSlug = slugify(data.title);
    const existingCourses = await prisma.course.findMany({
      where: {
        slug: {
          startsWith: baseSlug,
        },
      },
      select: { slug: true },
    });

    let slug = baseSlug;
    let counter = 1;
    while (existingCourses.some(c => c.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const course = await prisma.course.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        shortDescription: data.shortDescription,
        thumbnail: data.thumbnail,
        level: data.level as any,
        price: data.price || 0,
        duration: data.duration,
        prerequisites: data.prerequisites ? JSON.stringify(data.prerequisites) : null,
        learningGoals: data.learningGoals ? JSON.stringify(data.learningGoals) : null,
        instructorId: req.user.id,
        categoryId: data.categoryId,
      },
      include: {
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        category: true,
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Curso creado exitosamente',
      data: course,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Actualizar un curso
 */
export async function updateCourse(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;
    const data: UpdateCourseData = req.body;

    // Verificar que el curso existe
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      throw new NotFoundError('Curso no encontrado');
    }

    // Verificar permisos (solo el instructor del curso o admin)
    if (
      req.user.role !== UserRole.ADMIN &&
      existingCourse.instructorId !== req.user.id
    ) {
      throw new AuthorizationError('No tienes permiso para editar este curso');
    }

    // Actualizar curso
    const updateData: any = {};
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription;
    if (data.thumbnail !== undefined) updateData.thumbnail = data.thumbnail;
    if (data.level) updateData.level = data.level;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.duration !== undefined) updateData.duration = data.duration;
    if (data.prerequisites !== undefined) updateData.prerequisites = JSON.stringify(data.prerequisites);
    if (data.learningGoals !== undefined) updateData.learningGoals = JSON.stringify(data.learningGoals);
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
    if (data.status) updateData.status = data.status;
    if (data.published !== undefined) {
      updateData.published = data.published;
      if (data.published && !existingCourse.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const course = await prisma.course.update({
      where: { id },
      data: updateData,
      include: {
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        category: true,
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Curso actualizado exitosamente',
      data: course,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Eliminar un curso
 */
export async function deleteCourse(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;

    // Verificar que el curso existe
    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundError('Curso no encontrado');
    }

    // Verificar permisos (solo el instructor del curso o admin)
    if (
      req.user.role !== UserRole.ADMIN &&
      course.instructorId !== req.user.id
    ) {
      throw new AuthorizationError('No tienes permiso para eliminar este curso');
    }

    // Eliminar curso (Prisma eliminará automáticamente los módulos y lecciones relacionadas)
    await prisma.course.delete({
      where: { id },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Curso eliminado exitosamente',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Inscribirse en un curso
 */
export async function enrollInCourse(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;

    // Verificar que el curso existe y está publicado
    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course || !course.published) {
      throw new NotFoundError('Curso no encontrado o no disponible');
    }

    // Verificar si ya está inscrito
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: req.user.id,
          courseId: id,
        },
      },
    });

    if (existingEnrollment) {
      throw new ValidationError('Ya estás inscrito en este curso');
    }

    // Crear inscripción
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: req.user.id,
        courseId: id,
      },
      include: {
        course: {
          include: {
            instructor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Inscripción exitosa',
      data: enrollment,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener cursos del usuario (inscripciones)
 */
export async function getMyCourses(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        course: {
          include: {
            instructor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
            category: true,
            _count: {
              select: {
                modules: true,
              },
            },
          },
        },
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    });

    const response: ApiResponse = {
      success: true,
      data: enrollments,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

// Controlador de lecciones y progreso
import { Response, NextFunction } from 'express';
import { AuthRequest, ApiResponse } from '../types';
import { prisma } from '../utils/prisma';
import { NotFoundError, AuthorizationError } from '../utils/errors';
import { UserRole } from '@prisma/client';
import * as gamificationService from '../services/gamificationService';

/**
 * Obtener una lección por ID
 */
export async function getLessonById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                slug: true,
                instructorId: true,
              },
            },
          },
        },
        quiz: {
          include: {
            questions: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
        exercise: true,
        gameExercise: {
          select: {
            id: true,
            title: true,
            type: true,
            instructions: true,
            points: true,
            timeLimit: true,
            isActive: true,
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundError('Lección no encontrada');
    }

    // Verificar acceso: debe estar inscrito, ser el instructor o ser admin
    const isInstructor = lesson.module.course.instructorId === req.user.id;
    const isAdmin = req.user.role === UserRole.ADMIN;

    if (!isInstructor && !isAdmin && !lesson.isFree) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: req.user.id,
            courseId: lesson.module.course.id,
          },
        },
      });

      if (!enrollment) {
        throw new AuthorizationError('Debes estar inscrito en el curso para acceder a esta lección');
      }
    }

    // Obtener progreso del usuario
    const progress = await prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId: req.user.id,
          lessonId: id,
        },
      },
    });

    const response: ApiResponse = {
      success: true,
      data: {
        ...lesson,
        progress,
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Actualizar progreso de una lección
 */
export async function updateLessonProgress(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;
    const { completed, timeSpent, lastPosition } = req.body;

    // Verificar que la lección existe
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundError('Lección no encontrada');
    }

    // Verificar inscripción
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: req.user.id,
          courseId: lesson.module.course.id,
        },
      },
    });

    if (!enrollment) {
      throw new AuthorizationError('Debes estar inscrito en el curso');
    }

    // Verificar si la lección ya estaba completada
    const existingProgress = await prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId: req.user.id,
          lessonId: id,
        },
      },
    });

    const wasAlreadyCompleted = existingProgress?.completed || false;

    // Crear o actualizar progreso
    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: req.user.id,
          lessonId: id,
        },
      },
      create: {
        userId: req.user.id,
        lessonId: id,
        completed: completed || false,
        timeSpent: timeSpent || 0,
        lastPosition: lastPosition || 0,
        completedAt: completed ? new Date() : null,
      },
      update: {
        completed: completed !== undefined ? completed : undefined,
        timeSpent: timeSpent !== undefined ? timeSpent : undefined,
        lastPosition: lastPosition !== undefined ? lastPosition : undefined,
        completedAt: completed ? new Date() : undefined,
      },
    });

    // Si se acaba de completar (no estaba completada antes), actualizar gamificación
    if (completed && !wasAlreadyCompleted) {
      try {
        await gamificationService.completeLesson(req.user.id, id);
        console.log(`✅ Gamification updated: User ${req.user.id} completed lesson ${id}`);
      } catch (error) {
        console.error('⚠️ Error updating gamification:', error);
        // No lanzar error, la lección se marcó como completada correctamente
      }
    }

    // Actualizar progreso general del curso
    await updateCourseProgress(req.user.id, lesson.module.course.id);

    const response: ApiResponse = {
      success: true,
      message: 'Progreso actualizado',
      data: progress,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Función helper para actualizar el progreso general del curso
 */
async function updateCourseProgress(userId: string, courseId: string) {
  // Obtener todas las lecciones del curso
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          lessons: {
            where: {
              isPublished: true,
            },
          },
        },
      },
    },
  });

  if (!course) return;

  // Contar lecciones totales y completadas
  const totalLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );

  if (totalLessons === 0) return;

  const completedProgress = await prisma.progress.count({
    where: {
      userId,
      completed: true,
      lesson: {
        module: {
          courseId,
        },
      },
    },
  });

  const progressPercentage = Math.round((completedProgress / totalLessons) * 100);

  // Actualizar enrollment
  await prisma.enrollment.update({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    data: {
      progress: progressPercentage,
      lastAccessedAt: new Date(),
      ...(progressPercentage === 100 && {
        status: 'COMPLETED',
        completedAt: new Date(),
      }),
    },
  });
}

/**
 * Obtener progreso del curso
 */
export async function getCourseProgress(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { courseId } = req.params;

    // Verificar inscripción
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: req.user.id,
          courseId,
        },
      },
      include: {
        course: {
          include: {
            modules: {
              orderBy: {
                order: 'asc',
              },
              include: {
                lessons: {
                  orderBy: {
                    order: 'asc',
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundError('No estás inscrito en este curso');
    }

    // Obtener progreso de todas las lecciones
    const lessonIds = enrollment.course.modules.flatMap(module =>
      module.lessons.map(lesson => lesson.id)
    );

    const progressRecords = await prisma.progress.findMany({
      where: {
        userId: req.user.id,
        lessonId: {
          in: lessonIds,
        },
      },
    });

    // Mapear progreso a cada lección
    const progressMap = new Map(
      progressRecords.map(p => [p.lessonId, p])
    );

    const modulesWithProgress = enrollment.course.modules.map(module => ({
      ...module,
      lessons: module.lessons.map(lesson => ({
        ...lesson,
        progress: progressMap.get(lesson.id) || null,
      })),
    }));

    const response: ApiResponse = {
      success: true,
      data: {
        enrollment,
        modules: modulesWithProgress,
        overallProgress: enrollment.progress,
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

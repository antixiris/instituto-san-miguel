// Controlador de módulos
import { Response, NextFunction } from 'express';
import { AuthRequest, ApiResponse } from '../types';
import { prisma } from '../utils/prisma';
import { NotFoundError, AuthorizationError } from '../utils/errors';
import { UserRole } from '@prisma/client';

/**
 * Obtener módulos de un curso
 */
export async function getCourseModules(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { courseId } = req.params;

    const modules = await prisma.module.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            type: true,
            order: true,
            isPublished: true,
            isFree: true,
            videoDuration: true,
          },
        },
        _count: {
          select: {
            lessons: true,
          },
        },
      },
    });

    const response: ApiResponse = {
      success: true,
      data: modules,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Crear módulo
 */
export async function createModule(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { courseId } = req.params;
    const { title, description, order, isPublished } = req.body;

    // Verificar que el curso existe y el usuario tiene permisos
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundError('Curso no encontrado');
    }

    if (
      req.user.role !== UserRole.ADMIN &&
      course.instructorId !== req.user.id
    ) {
      throw new AuthorizationError('No tienes permiso para modificar este curso');
    }

    // Si no se especifica order, calcular el siguiente
    let moduleOrder = order;
    if (moduleOrder === undefined) {
      const lastModule = await prisma.module.findFirst({
        where: { courseId },
        orderBy: { order: 'desc' },
      });
      moduleOrder = lastModule ? lastModule.order + 1 : 0;
    }

    const module = await prisma.module.create({
      data: {
        title,
        description,
        order: moduleOrder,
        courseId,
        isPublished: isPublished || false,
      },
      include: {
        _count: {
          select: {
            lessons: true,
          },
        },
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Módulo creado exitosamente',
      data: module,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Actualizar módulo
 */
export async function updateModule(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;
    const { title, description, order, isPublished } = req.body;

    // Verificar que el módulo existe
    const existingModule = await prisma.module.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!existingModule) {
      throw new NotFoundError('Módulo no encontrado');
    }

    // Verificar permisos
    if (
      req.user.role !== UserRole.ADMIN &&
      existingModule.course.instructorId !== req.user.id
    ) {
      throw new AuthorizationError('No tienes permiso para modificar este módulo');
    }

    const module = await prisma.module.update({
      where: { id },
      data: {
        title,
        description,
        order,
        isPublished,
      },
      include: {
        _count: {
          select: {
            lessons: true,
          },
        },
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Módulo actualizado exitosamente',
      data: module,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Eliminar módulo
 */
export async function deleteModule(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;

    // Verificar que el módulo existe
    const module = await prisma.module.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!module) {
      throw new NotFoundError('Módulo no encontrado');
    }

    // Verificar permisos
    if (
      req.user.role !== UserRole.ADMIN &&
      module.course.instructorId !== req.user.id
    ) {
      throw new AuthorizationError('No tienes permiso para eliminar este módulo');
    }

    await prisma.module.delete({
      where: { id },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Módulo eliminado exitosamente',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Reordenar módulos
 */
export async function reorderModules(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { courseId } = req.params;
    const { modules } = req.body; // Array de { id, order }

    // Verificar permisos
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundError('Curso no encontrado');
    }

    if (
      req.user.role !== UserRole.ADMIN &&
      course.instructorId !== req.user.id
    ) {
      throw new AuthorizationError('No tienes permiso para modificar este curso');
    }

    // Actualizar orden de cada módulo
    await Promise.all(
      modules.map((m: { id: string; order: number }) =>
        prisma.module.update({
          where: { id: m.id },
          data: { order: m.order },
        })
      )
    );

    const response: ApiResponse = {
      success: true,
      message: 'Orden actualizado exitosamente',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Crear lección dentro de un módulo
 */
export async function createLesson(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { moduleId } = req.params;
    const {
      title,
      description,
      type,
      content,
      videoUrl,
      videoDuration,
      resources,
      order,
      isPublished,
      isFree,
    } = req.body;

    // Verificar que el módulo existe y el usuario tiene permisos
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        course: true,
      },
    });

    if (!module) {
      throw new NotFoundError('Módulo no encontrado');
    }

    if (
      req.user.role !== UserRole.ADMIN &&
      module.course.instructorId !== req.user.id
    ) {
      throw new AuthorizationError('No tienes permiso para modificar este curso');
    }

    // Si no se especifica order, calcular el siguiente
    let lessonOrder = order;
    if (lessonOrder === undefined) {
      const lastLesson = await prisma.lesson.findFirst({
        where: { moduleId },
        orderBy: { order: 'desc' },
      });
      lessonOrder = lastLesson ? lastLesson.order + 1 : 0;
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        description,
        type,
        content,
        videoUrl,
        videoDuration,
        resources: resources ? JSON.stringify(resources) : null,
        order: lessonOrder,
        moduleId,
        isPublished: isPublished || false,
        isFree: isFree || false,
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Lección creada exitosamente',
      data: lesson,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Actualizar lección
 */
export async function updateLesson(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;
    const {
      title,
      description,
      type,
      content,
      videoUrl,
      videoDuration,
      resources,
      order,
      isPublished,
      isFree,
    } = req.body;

    // Verificar que la lección existe
    const existingLesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!existingLesson) {
      throw new NotFoundError('Lección no encontrada');
    }

    // Verificar permisos
    if (
      req.user.role !== UserRole.ADMIN &&
      existingLesson.module.course.instructorId !== req.user.id
    ) {
      throw new AuthorizationError('No tienes permiso para modificar esta lección');
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (content !== undefined) updateData.content = content;
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl;
    if (videoDuration !== undefined) updateData.videoDuration = videoDuration;
    if (resources !== undefined) updateData.resources = JSON.stringify(resources);
    if (order !== undefined) updateData.order = order;
    if (isPublished !== undefined) updateData.isPublished = isPublished;
    if (isFree !== undefined) updateData.isFree = isFree;

    const lesson = await prisma.lesson.update({
      where: { id },
      data: updateData,
    });

    const response: ApiResponse = {
      success: true,
      message: 'Lección actualizada exitosamente',
      data: lesson,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Eliminar lección
 */
export async function deleteLesson(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;

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

    // Verificar permisos
    if (
      req.user.role !== UserRole.ADMIN &&
      lesson.module.course.instructorId !== req.user.id
    ) {
      throw new AuthorizationError('No tienes permiso para eliminar esta lección');
    }

    await prisma.lesson.delete({
      where: { id },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Lección eliminada exitosamente',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

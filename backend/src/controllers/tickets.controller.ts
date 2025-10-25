// Controlador de Tickets/Consultas
import { Response, NextFunction } from 'express';
import { AuthRequest, ApiResponse } from '../types';
import { prisma } from '../utils/prisma';
import { NotFoundError, AuthorizationError, ValidationError } from '../utils/errors';
import { UserRole, TicketType, TicketStatus, TicketPriority } from '@prisma/client';

/**
 * Obtener todos los tickets según el rol del usuario
 * - ADMIN: Ve todos los tickets
 * - PROFESOR: Ve tickets PROFESOR de sus cursos, GENERAL y tickets que creó
 * - STUDENT: Ve solo tickets que creó o CLASE/GENERAL de sus cursos
 */
export async function getAllTickets(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const {
      page = '1',
      limit = '20',
      type,
      status,
      priority,
      courseId,
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Construir filtros según el rol
    const where: any = {};

    if (req.user.role === UserRole.ADMIN) {
      // Admin ve todos los tickets
      if (type) where.type = type;
      if (status) where.status = status;
      if (priority) where.priority = priority;
      if (courseId) where.courseId = courseId;
    } else if (req.user.role === UserRole.PROFESOR) {
      // Profesor ve:
      // 1. Tickets GENERAL (todos)
      // 2. Tickets PROFESOR de sus cursos
      // 3. Tickets que él creó
      const professorCourses = await prisma.course.findMany({
        where: { instructorId: req.user.id },
        select: { id: true },
      });

      const courseIds = professorCourses.map(c => c.id);

      where.OR = [
        { type: TicketType.GENERAL },
        { type: TicketType.PROFESOR, courseId: { in: courseIds } },
        { creatorId: req.user.id },
      ];

      if (type) {
        delete where.OR;
        where.type = type;
        if (type === TicketType.PROFESOR) {
          where.courseId = { in: courseIds };
        }
      }
      if (status) where.status = status;
      if (priority) where.priority = priority;
      if (courseId) where.courseId = courseId;
    } else {
      // Estudiante ve:
      // 1. Tickets GENERAL (todos)
      // 2. Tickets CLASE de sus cursos
      // 3. Tickets que él creó
      const studentEnrollments = await prisma.enrollment.findMany({
        where: { userId: req.user.id },
        select: { courseId: true },
      });

      const courseIds = studentEnrollments.map(e => e.courseId);

      where.OR = [
        { type: TicketType.GENERAL },
        { type: TicketType.CLASE, courseId: { in: courseIds } },
        { creatorId: req.user.id },
      ];

      if (type) {
        delete where.OR;
        where.type = type;
        if (type === TicketType.CLASE) {
          where.courseId = { in: courseIds };
        }
      }
      if (status) where.status = status;
      if (priority) where.priority = priority;
      if (courseId) where.courseId = courseId;
    }

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
              role: true,
            },
          },
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
          _count: {
            select: {
              responses: true,
            },
          },
        },
        orderBy: [
          { priority: 'desc' }, // Urgentes primero
          { createdAt: 'desc' },
        ],
      }),
      prisma.ticket.count({ where }),
    ]);

    const response: ApiResponse = {
      success: true,
      data: {
        tickets,
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
 * Obtener un ticket por ID (con control de permisos)
 */
export async function getTicketById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            role: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            instructorId: true,
          },
        },
        responses: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                role: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!ticket) {
      throw new NotFoundError('Ticket no encontrado');
    }

    // Verificar permisos
    const hasAccess = await canAccessTicket(req.user.id, req.user.role, ticket);
    if (!hasAccess) {
      throw new AuthorizationError('No tienes permiso para ver este ticket');
    }

    // Marcar como leído si no es el creador
    if (ticket.creatorId !== req.user.id && !ticket.isRead) {
      await prisma.ticket.update({
        where: { id },
        data: { isRead: true, readAt: new Date() },
      });
    }

    const response: ApiResponse = {
      success: true,
      data: ticket,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Crear un nuevo ticket
 */
export async function createTicket(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { type, subject, message, courseId, priority, attachments } = req.body;

    // Validaciones
    if (!type || !subject || !message) {
      throw new ValidationError('Tipo, asunto y mensaje son requeridos');
    }

    // Validar que courseId sea requerido para PROFESOR y CLASE
    if ((type === TicketType.PROFESOR || type === TicketType.CLASE) && !courseId) {
      throw new ValidationError('El curso es requerido para tickets de profesor o clase');
    }

    // Solo ADMIN puede crear tickets GENERAL
    if (type === TicketType.GENERAL && req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('Solo administradores pueden crear anuncios generales');
    }

    // Validar que el usuario esté matriculado en el curso (para estudiantes)
    if (req.user.role === UserRole.STUDENT && courseId) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: req.user.id,
            courseId,
          },
        },
      });

      if (!enrollment) {
        throw new AuthorizationError('No estás matriculado en este curso');
      }
    }

    const ticket = await prisma.ticket.create({
      data: {
        type,
        subject,
        message,
        courseId,
        priority: priority || TicketPriority.MEDIA,
        creatorId: req.user.id,
        attachments: attachments ? JSON.stringify(attachments) : null,
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            role: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Ticket creado exitosamente',
      data: ticket,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Responder a un ticket
 */
export async function respondToTicket(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;
    const { message, attachments } = req.body;

    if (!message) {
      throw new ValidationError('El mensaje es requerido');
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!ticket) {
      throw new NotFoundError('Ticket no encontrado');
    }

    // Verificar permisos para responder
    const canRespond = await canRespondToTicket(req.user.id, req.user.role, ticket);
    if (!canRespond) {
      throw new AuthorizationError('No tienes permiso para responder a este ticket');
    }

    const response = await prisma.ticketResponse.create({
      data: {
        ticketId: id,
        userId: req.user.id,
        message,
        attachments: attachments ? JSON.stringify(attachments) : null,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            role: true,
          },
        },
      },
    });

    // Actualizar estado del ticket a RESPONDIDO
    await prisma.ticket.update({
      where: { id },
      data: { status: TicketStatus.RESPONDIDO },
    });

    const apiResponse: ApiResponse = {
      success: true,
      message: 'Respuesta enviada exitosamente',
      data: response,
    };

    res.status(201).json(apiResponse);
  } catch (error) {
    next(error);
  }
}

/**
 * Cerrar un ticket
 */
export async function closeTicket(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;

    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      throw new NotFoundError('Ticket no encontrado');
    }

    // Solo el creador o admin puede cerrar el ticket
    if (ticket.creatorId !== req.user.id && req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para cerrar este ticket');
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: {
        status: TicketStatus.CERRADO,
        resolvedAt: new Date(),
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Ticket cerrado exitosamente',
      data: updatedTicket,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Eliminar un ticket (solo ADMIN o creador)
 */
export async function deleteTicket(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;

    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      throw new NotFoundError('Ticket no encontrado');
    }

    // Solo el creador o admin puede eliminar
    if (ticket.creatorId !== req.user.id && req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para eliminar este ticket');
    }

    await prisma.ticket.delete({
      where: { id },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Ticket eliminado exitosamente',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Verificar si el usuario puede acceder a un ticket
 */
async function canAccessTicket(userId: string, userRole: UserRole, ticket: any): Promise<boolean> {
  // Admin puede ver todos
  if (userRole === UserRole.ADMIN) return true;

  // Creador puede ver su ticket
  if (ticket.creatorId === userId) return true;

  // GENERAL todos pueden ver
  if (ticket.type === TicketType.GENERAL) return true;

  // DIRECTOR solo admin y el creador
  if (ticket.type === TicketType.DIRECTOR) {
    return ticket.creatorId === userId;
  }

  // PROFESOR: el profesor del curso puede ver
  if (ticket.type === TicketType.PROFESOR && ticket.courseId) {
    if (userRole === UserRole.PROFESOR) {
      const course = await prisma.course.findUnique({
        where: { id: ticket.courseId },
        select: { instructorId: true },
      });
      return course?.instructorId === userId;
    }
  }

  // CLASE: alumnos del curso pueden ver
  if (ticket.type === TicketType.CLASE && ticket.courseId) {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: ticket.courseId,
        },
      },
    });
    return !!enrollment;
  }

  return false;
}

/**
 * Verificar si el usuario puede responder a un ticket
 */
async function canRespondToTicket(userId: string, userRole: UserRole, ticket: any): Promise<boolean> {
  // Admin puede responder a todos
  if (userRole === UserRole.ADMIN) return true;

  // DIRECTOR: solo admin puede responder (ya verificado arriba)
  if (ticket.type === TicketType.DIRECTOR) {
    return false; // Solo admin puede responder y ya se verificó arriba
  }

  // GENERAL: cualquiera puede responder
  if (ticket.type === TicketType.GENERAL) return true;

  // PROFESOR: el profesor del curso puede responder
  if (ticket.type === TicketType.PROFESOR && ticket.courseId) {
    if (userRole === UserRole.PROFESOR) {
      const course = await prisma.course.findUnique({
        where: { id: ticket.courseId },
        select: { instructorId: true },
      });
      return course?.instructorId === userId;
    }
  }

  // CLASE: cualquier alumno del curso puede responder
  if (ticket.type === TicketType.CLASE && ticket.courseId) {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: ticket.courseId,
        },
      },
    });
    return !!enrollment;
  }

  return false;
}

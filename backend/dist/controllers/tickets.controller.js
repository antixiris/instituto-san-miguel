"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTickets = getAllTickets;
exports.getTicketById = getTicketById;
exports.createTicket = createTicket;
exports.respondToTicket = respondToTicket;
exports.closeTicket = closeTicket;
exports.deleteTicket = deleteTicket;
const prisma_1 = require("../utils/prisma");
const errors_1 = require("../utils/errors");
const client_1 = require("@prisma/client");
/**
 * Obtener todos los tickets según el rol del usuario
 * - ADMIN: Ve todos los tickets
 * - PROFESOR: Ve tickets PROFESOR de sus cursos, GENERAL y tickets que creó
 * - STUDENT: Ve solo tickets que creó o CLASE/GENERAL de sus cursos
 */
async function getAllTickets(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { page = '1', limit = '20', type, status, priority, courseId, } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        // Construir filtros según el rol
        const where = {};
        if (req.user.role === client_1.UserRole.ADMIN) {
            // Admin ve todos los tickets
            if (type)
                where.type = type;
            if (status)
                where.status = status;
            if (priority)
                where.priority = priority;
            if (courseId)
                where.courseId = courseId;
        }
        else if (req.user.role === client_1.UserRole.PROFESOR) {
            // Profesor ve:
            // 1. Tickets GENERAL (todos)
            // 2. Tickets PROFESOR de sus cursos
            // 3. Tickets que él creó
            const professorCourses = await prisma_1.prisma.course.findMany({
                where: { instructorId: req.user.id },
                select: { id: true },
            });
            const courseIds = professorCourses.map(c => c.id);
            where.OR = [
                { type: client_1.TicketType.GENERAL },
                { type: client_1.TicketType.PROFESOR, courseId: { in: courseIds } },
                { creatorId: req.user.id },
            ];
            if (type) {
                delete where.OR;
                where.type = type;
                if (type === client_1.TicketType.PROFESOR) {
                    where.courseId = { in: courseIds };
                }
            }
            if (status)
                where.status = status;
            if (priority)
                where.priority = priority;
            if (courseId)
                where.courseId = courseId;
        }
        else {
            // Estudiante ve:
            // 1. Tickets GENERAL (todos)
            // 2. Tickets CLASE de sus cursos
            // 3. Tickets que él creó
            const studentEnrollments = await prisma_1.prisma.enrollment.findMany({
                where: { userId: req.user.id },
                select: { courseId: true },
            });
            const courseIds = studentEnrollments.map(e => e.courseId);
            where.OR = [
                { type: client_1.TicketType.GENERAL },
                { type: client_1.TicketType.CLASE, courseId: { in: courseIds } },
                { creatorId: req.user.id },
            ];
            if (type) {
                delete where.OR;
                where.type = type;
                if (type === client_1.TicketType.CLASE) {
                    where.courseId = { in: courseIds };
                }
            }
            if (status)
                where.status = status;
            if (priority)
                where.priority = priority;
            if (courseId)
                where.courseId = courseId;
        }
        const [tickets, total] = await Promise.all([
            prisma_1.prisma.ticket.findMany({
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
            prisma_1.prisma.ticket.count({ where }),
        ]);
        const response = {
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
    }
    catch (error) {
        next(error);
    }
}
/**
 * Obtener un ticket por ID (con control de permisos)
 */
async function getTicketById(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { id } = req.params;
        const ticket = await prisma_1.prisma.ticket.findUnique({
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
            throw new errors_1.NotFoundError('Ticket no encontrado');
        }
        // Verificar permisos
        const hasAccess = await canAccessTicket(req.user.id, req.user.role, ticket);
        if (!hasAccess) {
            throw new errors_1.AuthorizationError('No tienes permiso para ver este ticket');
        }
        // Marcar como leído si no es el creador
        if (ticket.creatorId !== req.user.id && !ticket.isRead) {
            await prisma_1.prisma.ticket.update({
                where: { id },
                data: { isRead: true, readAt: new Date() },
            });
        }
        const response = {
            success: true,
            data: ticket,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Crear un nuevo ticket
 */
async function createTicket(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { type, subject, message, courseId, priority, attachments } = req.body;
        // Validaciones
        if (!type || !subject || !message) {
            throw new errors_1.ValidationError('Tipo, asunto y mensaje son requeridos');
        }
        // Validar que courseId sea requerido para PROFESOR y CLASE
        if ((type === client_1.TicketType.PROFESOR || type === client_1.TicketType.CLASE) && !courseId) {
            throw new errors_1.ValidationError('El curso es requerido para tickets de profesor o clase');
        }
        // Solo ADMIN puede crear tickets GENERAL
        if (type === client_1.TicketType.GENERAL && req.user.role !== client_1.UserRole.ADMIN) {
            throw new errors_1.AuthorizationError('Solo administradores pueden crear anuncios generales');
        }
        // Validar que el usuario esté matriculado en el curso (para estudiantes)
        if (req.user.role === client_1.UserRole.STUDENT && courseId) {
            const enrollment = await prisma_1.prisma.enrollment.findUnique({
                where: {
                    userId_courseId: {
                        userId: req.user.id,
                        courseId,
                    },
                },
            });
            if (!enrollment) {
                throw new errors_1.AuthorizationError('No estás matriculado en este curso');
            }
        }
        const ticket = await prisma_1.prisma.ticket.create({
            data: {
                type,
                subject,
                message,
                courseId,
                priority: priority || client_1.TicketPriority.MEDIA,
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
        const response = {
            success: true,
            message: 'Ticket creado exitosamente',
            data: ticket,
        };
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Responder a un ticket
 */
async function respondToTicket(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { id } = req.params;
        const { message, attachments } = req.body;
        if (!message) {
            throw new errors_1.ValidationError('El mensaje es requerido');
        }
        const ticket = await prisma_1.prisma.ticket.findUnique({
            where: { id },
            include: { course: true },
        });
        if (!ticket) {
            throw new errors_1.NotFoundError('Ticket no encontrado');
        }
        // Verificar permisos para responder
        const canRespond = await canRespondToTicket(req.user.id, req.user.role, ticket);
        if (!canRespond) {
            throw new errors_1.AuthorizationError('No tienes permiso para responder a este ticket');
        }
        const response = await prisma_1.prisma.ticketResponse.create({
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
        await prisma_1.prisma.ticket.update({
            where: { id },
            data: { status: client_1.TicketStatus.RESPONDIDO },
        });
        const apiResponse = {
            success: true,
            message: 'Respuesta enviada exitosamente',
            data: response,
        };
        res.status(201).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Cerrar un ticket
 */
async function closeTicket(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { id } = req.params;
        const ticket = await prisma_1.prisma.ticket.findUnique({
            where: { id },
        });
        if (!ticket) {
            throw new errors_1.NotFoundError('Ticket no encontrado');
        }
        // Solo el creador o admin puede cerrar el ticket
        if (ticket.creatorId !== req.user.id && req.user.role !== client_1.UserRole.ADMIN) {
            throw new errors_1.AuthorizationError('No tienes permiso para cerrar este ticket');
        }
        const updatedTicket = await prisma_1.prisma.ticket.update({
            where: { id },
            data: {
                status: client_1.TicketStatus.CERRADO,
                resolvedAt: new Date(),
            },
        });
        const response = {
            success: true,
            message: 'Ticket cerrado exitosamente',
            data: updatedTicket,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Eliminar un ticket (solo ADMIN o creador)
 */
async function deleteTicket(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { id } = req.params;
        const ticket = await prisma_1.prisma.ticket.findUnique({
            where: { id },
        });
        if (!ticket) {
            throw new errors_1.NotFoundError('Ticket no encontrado');
        }
        // Solo el creador o admin puede eliminar
        if (ticket.creatorId !== req.user.id && req.user.role !== client_1.UserRole.ADMIN) {
            throw new errors_1.AuthorizationError('No tienes permiso para eliminar este ticket');
        }
        await prisma_1.prisma.ticket.delete({
            where: { id },
        });
        const response = {
            success: true,
            message: 'Ticket eliminado exitosamente',
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
// ==================== HELPER FUNCTIONS ====================
/**
 * Verificar si el usuario puede acceder a un ticket
 */
async function canAccessTicket(userId, userRole, ticket) {
    // Admin puede ver todos
    if (userRole === client_1.UserRole.ADMIN)
        return true;
    // Creador puede ver su ticket
    if (ticket.creatorId === userId)
        return true;
    // GENERAL todos pueden ver
    if (ticket.type === client_1.TicketType.GENERAL)
        return true;
    // DIRECTOR solo admin y el creador
    if (ticket.type === client_1.TicketType.DIRECTOR) {
        return ticket.creatorId === userId;
    }
    // PROFESOR: el profesor del curso puede ver
    if (ticket.type === client_1.TicketType.PROFESOR && ticket.courseId) {
        if (userRole === client_1.UserRole.PROFESOR) {
            const course = await prisma_1.prisma.course.findUnique({
                where: { id: ticket.courseId },
                select: { instructorId: true },
            });
            return course?.instructorId === userId;
        }
    }
    // CLASE: alumnos del curso pueden ver
    if (ticket.type === client_1.TicketType.CLASE && ticket.courseId) {
        const enrollment = await prisma_1.prisma.enrollment.findUnique({
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
async function canRespondToTicket(userId, userRole, ticket) {
    // Admin puede responder a todos
    if (userRole === client_1.UserRole.ADMIN)
        return true;
    // DIRECTOR: solo admin puede responder (ya verificado arriba)
    if (ticket.type === client_1.TicketType.DIRECTOR) {
        return false; // Solo admin puede responder y ya se verificó arriba
    }
    // GENERAL: cualquiera puede responder
    if (ticket.type === client_1.TicketType.GENERAL)
        return true;
    // PROFESOR: el profesor del curso puede responder
    if (ticket.type === client_1.TicketType.PROFESOR && ticket.courseId) {
        if (userRole === client_1.UserRole.PROFESOR) {
            const course = await prisma_1.prisma.course.findUnique({
                where: { id: ticket.courseId },
                select: { instructorId: true },
            });
            return course?.instructorId === userId;
        }
    }
    // CLASE: cualquier alumno del curso puede responder
    if (ticket.type === client_1.TicketType.CLASE && ticket.courseId) {
        const enrollment = await prisma_1.prisma.enrollment.findUnique({
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
//# sourceMappingURL=tickets.controller.js.map
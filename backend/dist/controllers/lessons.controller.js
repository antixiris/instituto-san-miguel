"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLessonById = getLessonById;
exports.updateLessonProgress = updateLessonProgress;
exports.getCourseProgress = getCourseProgress;
const prisma_1 = require("../utils/prisma");
const errors_1 = require("../utils/errors");
const client_1 = require("@prisma/client");
/**
 * Obtener una lección por ID
 */
async function getLessonById(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { id } = req.params;
        const lesson = await prisma_1.prisma.lesson.findUnique({
            where: { id },
            include: {
                module: {
                    include: {
                        course: {
                            select: {
                                id: true,
                                title: true,
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
            },
        });
        if (!lesson) {
            throw new errors_1.NotFoundError('Lección no encontrada');
        }
        // Verificar acceso: debe estar inscrito, ser el instructor o ser admin
        const isInstructor = lesson.module.course.instructorId === req.user.id;
        const isAdmin = req.user.role === client_1.UserRole.ADMIN;
        if (!isInstructor && !isAdmin && !lesson.isFree) {
            const enrollment = await prisma_1.prisma.enrollment.findUnique({
                where: {
                    userId_courseId: {
                        userId: req.user.id,
                        courseId: lesson.module.course.id,
                    },
                },
            });
            if (!enrollment) {
                throw new errors_1.AuthorizationError('Debes estar inscrito en el curso para acceder a esta lección');
            }
        }
        // Obtener progreso del usuario
        const progress = await prisma_1.prisma.progress.findUnique({
            where: {
                userId_lessonId: {
                    userId: req.user.id,
                    lessonId: id,
                },
            },
        });
        const response = {
            success: true,
            data: {
                ...lesson,
                progress,
            },
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Actualizar progreso de una lección
 */
async function updateLessonProgress(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { id } = req.params;
        const { completed, timeSpent, lastPosition } = req.body;
        // Verificar que la lección existe
        const lesson = await prisma_1.prisma.lesson.findUnique({
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
            throw new errors_1.NotFoundError('Lección no encontrada');
        }
        // Verificar inscripción
        const enrollment = await prisma_1.prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: req.user.id,
                    courseId: lesson.module.course.id,
                },
            },
        });
        if (!enrollment) {
            throw new errors_1.AuthorizationError('Debes estar inscrito en el curso');
        }
        // Crear o actualizar progreso
        const progress = await prisma_1.prisma.progress.upsert({
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
        // Actualizar progreso general del curso
        await updateCourseProgress(req.user.id, lesson.module.course.id);
        const response = {
            success: true,
            message: 'Progreso actualizado',
            data: progress,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Función helper para actualizar el progreso general del curso
 */
async function updateCourseProgress(userId, courseId) {
    // Obtener todas las lecciones del curso
    const course = await prisma_1.prisma.course.findUnique({
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
    if (!course)
        return;
    // Contar lecciones totales y completadas
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    if (totalLessons === 0)
        return;
    const completedProgress = await prisma_1.prisma.progress.count({
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
    await prisma_1.prisma.enrollment.update({
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
async function getCourseProgress(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { courseId } = req.params;
        // Verificar inscripción
        const enrollment = await prisma_1.prisma.enrollment.findUnique({
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
            throw new errors_1.NotFoundError('No estás inscrito en este curso');
        }
        // Obtener progreso de todas las lecciones
        const lessonIds = enrollment.course.modules.flatMap(module => module.lessons.map(lesson => lesson.id));
        const progressRecords = await prisma_1.prisma.progress.findMany({
            where: {
                userId: req.user.id,
                lessonId: {
                    in: lessonIds,
                },
            },
        });
        // Mapear progreso a cada lección
        const progressMap = new Map(progressRecords.map(p => [p.lessonId, p]));
        const modulesWithProgress = enrollment.course.modules.map(module => ({
            ...module,
            lessons: module.lessons.map(lesson => ({
                ...lesson,
                progress: progressMap.get(lesson.id) || null,
            })),
        }));
        const response = {
            success: true,
            data: {
                enrollment,
                modules: modulesWithProgress,
                overallProgress: enrollment.progress,
            },
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=lessons.controller.js.map
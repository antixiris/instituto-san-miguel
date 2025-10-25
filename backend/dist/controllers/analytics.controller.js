"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalStats = getGlobalStats;
exports.getGrowthStats = getGrowthStats;
exports.getTopCourses = getTopCourses;
exports.getTopProfessors = getTopProfessors;
exports.getEngagementStats = getEngagementStats;
exports.getCourseStats = getCourseStats;
exports.getProfessorStats = getProfessorStats;
const prisma_1 = require("../utils/prisma");
const errors_1 = require("../utils/errors");
const client_1 = require("@prisma/client");
/**
 * Obtener estadísticas globales de la plataforma (solo ADMIN)
 */
async function getGlobalStats(req, res, next) {
    try {
        if (!req.user || req.user.role !== client_1.UserRole.ADMIN) {
            throw new errors_1.AuthorizationError('No tienes permiso para acceder a estas estadísticas');
        }
        // Obtener estadísticas en paralelo
        const [totalUsers, activeUsers, totalStudents, totalProfessors, totalCourses, publishedCourses, draftCourses, totalEnrollments, activeEnrollments, completedEnrollments, totalArticles, publishedArticles, totalTickets, openTickets, totalLessons, totalQuizzes,] = await Promise.all([
            // Usuarios
            prisma_1.prisma.user.count(),
            prisma_1.prisma.user.count({ where: { isActive: true } }),
            prisma_1.prisma.user.count({ where: { role: client_1.UserRole.STUDENT } }),
            prisma_1.prisma.user.count({ where: { role: client_1.UserRole.PROFESOR } }),
            // Cursos
            prisma_1.prisma.course.count(),
            prisma_1.prisma.course.count({ where: { published: true } }),
            prisma_1.prisma.course.count({ where: { status: 'DRAFT' } }),
            // Matrículas
            prisma_1.prisma.enrollment.count(),
            prisma_1.prisma.enrollment.count({ where: { status: client_1.EnrollmentStatus.ACTIVE } }),
            prisma_1.prisma.enrollment.count({ where: { status: client_1.EnrollmentStatus.COMPLETED } }),
            // Artículos
            prisma_1.prisma.article.count(),
            prisma_1.prisma.article.count({ where: { published: true } }),
            // Tickets
            prisma_1.prisma.ticket.count(),
            prisma_1.prisma.ticket.count({ where: { status: 'ABIERTO' } }),
            // Contenido
            prisma_1.prisma.lesson.count(),
            prisma_1.prisma.quiz.count(),
        ]);
        // Calcular tendencias (últimos 30 días)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const [newUsersLast30Days, newEnrollmentsLast30Days, newCoursesLast30Days, newArticlesLast30Days,] = await Promise.all([
            prisma_1.prisma.user.count({
                where: { createdAt: { gte: thirtyDaysAgo } },
            }),
            prisma_1.prisma.enrollment.count({
                where: { enrolledAt: { gte: thirtyDaysAgo } },
            }),
            prisma_1.prisma.course.count({
                where: { createdAt: { gte: thirtyDaysAgo } },
            }),
            prisma_1.prisma.article.count({
                where: { createdAt: { gte: thirtyDaysAgo } },
            }),
        ]);
        const stats = {
            users: {
                total: totalUsers,
                active: activeUsers,
                inactive: totalUsers - activeUsers,
                students: totalStudents,
                professors: totalProfessors,
                newLast30Days: newUsersLast30Days,
            },
            courses: {
                total: totalCourses,
                published: publishedCourses,
                draft: draftCourses,
                newLast30Days: newCoursesLast30Days,
            },
            enrollments: {
                total: totalEnrollments,
                active: activeEnrollments,
                completed: completedEnrollments,
                newLast30Days: newEnrollmentsLast30Days,
            },
            articles: {
                total: totalArticles,
                published: publishedArticles,
                draft: totalArticles - publishedArticles,
                newLast30Days: newArticlesLast30Days,
            },
            tickets: {
                total: totalTickets,
                open: openTickets,
                closed: totalTickets - openTickets,
            },
            content: {
                lessons: totalLessons,
                quizzes: totalQuizzes,
            },
        };
        const response = {
            success: true,
            data: stats,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Obtener estadísticas de crecimiento por mes (solo ADMIN)
 */
async function getGrowthStats(req, res, next) {
    try {
        if (!req.user || req.user.role !== client_1.UserRole.ADMIN) {
            throw new errors_1.AuthorizationError('No tienes permiso para acceder a estas estadísticas');
        }
        const { months = '12' } = req.query;
        const monthsNum = parseInt(months);
        // Calcular fecha de inicio (X meses atrás)
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - monthsNum);
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        // Obtener datos agregados por mes
        const [usersGrowth, enrollmentsGrowth, coursesGrowth] = await Promise.all([
            prisma_1.prisma.$queryRaw `
        SELECT
          DATE_TRUNC('month', "createdAt") as month,
          COUNT(*) as count
        FROM "users"
        WHERE "createdAt" >= ${startDate}
        GROUP BY month
        ORDER BY month ASC
      `,
            prisma_1.prisma.$queryRaw `
        SELECT
          DATE_TRUNC('month', "enrolledAt") as month,
          COUNT(*) as count
        FROM "enrollments"
        WHERE "enrolledAt" >= ${startDate}
        GROUP BY month
        ORDER BY month ASC
      `,
            prisma_1.prisma.$queryRaw `
        SELECT
          DATE_TRUNC('month', "createdAt") as month,
          COUNT(*) as count
        FROM "courses"
        WHERE "createdAt" >= ${startDate}
        GROUP BY month
        ORDER BY month ASC
      `,
        ]);
        const response = {
            success: true,
            data: {
                users: usersGrowth,
                enrollments: enrollmentsGrowth,
                courses: coursesGrowth,
            },
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Obtener top cursos por matrículas (solo ADMIN)
 */
async function getTopCourses(req, res, next) {
    try {
        if (!req.user || req.user.role !== client_1.UserRole.ADMIN) {
            throw new errors_1.AuthorizationError('No tienes permiso para acceder a estas estadísticas');
        }
        const { limit = '10' } = req.query;
        const limitNum = parseInt(limit);
        const topCourses = await prisma_1.prisma.course.findMany({
            where: {
                published: true,
            },
            select: {
                id: true,
                title: true,
                slug: true,
                thumbnail: true,
                level: true,
                _count: {
                    select: {
                        enrollments: true,
                    },
                },
                instructor: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: {
                enrollments: {
                    _count: 'desc',
                },
            },
            take: limitNum,
        });
        const response = {
            success: true,
            data: topCourses,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Obtener top profesores por cursos creados (solo ADMIN)
 */
async function getTopProfessors(req, res, next) {
    try {
        if (!req.user || req.user.role !== client_1.UserRole.ADMIN) {
            throw new errors_1.AuthorizationError('No tienes permiso para acceder a estas estadísticas');
        }
        const { limit = '10' } = req.query;
        const limitNum = parseInt(limit);
        const topProfessors = await prisma_1.prisma.user.findMany({
            where: {
                role: client_1.UserRole.PROFESOR,
                isActive: true,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatar: true,
                _count: {
                    select: {
                        coursesInstructed: true,
                        articles: true,
                    },
                },
            },
            orderBy: {
                coursesInstructed: {
                    _count: 'desc',
                },
            },
            take: limitNum,
        });
        // Calcular total de matrículas por profesor
        const professorsWithStats = await Promise.all(topProfessors.map(async (professor) => {
            const totalEnrollments = await prisma_1.prisma.enrollment.count({
                where: {
                    course: {
                        instructorId: professor.id,
                    },
                },
            });
            return {
                ...professor,
                totalEnrollments,
            };
        }));
        const response = {
            success: true,
            data: professorsWithStats,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Obtener estadísticas de engagement (solo ADMIN)
 */
async function getEngagementStats(req, res, next) {
    try {
        if (!req.user || req.user.role !== client_1.UserRole.ADMIN) {
            throw new errors_1.AuthorizationError('No tienes permiso para acceder a estas estadísticas');
        }
        // Calcular tasas de finalización
        const [totalEnrollments, completedEnrollments] = await Promise.all([
            prisma_1.prisma.enrollment.count(),
            prisma_1.prisma.enrollment.count({ where: { status: client_1.EnrollmentStatus.COMPLETED } }),
        ]);
        const completionRate = totalEnrollments > 0
            ? ((completedEnrollments / totalEnrollments) * 100).toFixed(2)
            : '0.00';
        // Estudiantes activos (con progreso en los últimos 30 días)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const activeStudents = await prisma_1.prisma.user.count({
            where: {
                role: client_1.UserRole.STUDENT,
                progressRecords: {
                    some: {
                        updatedAt: {
                            gte: thirtyDaysAgo,
                        },
                    },
                },
            },
        });
        // Total de tickets y tasa de respuesta
        const [totalTickets, respondedTickets, closedTickets] = await Promise.all([
            prisma_1.prisma.ticket.count(),
            prisma_1.prisma.ticket.count({ where: { status: 'RESPONDIDO' } }),
            prisma_1.prisma.ticket.count({ where: { status: 'CERRADO' } }),
        ]);
        const responseRate = totalTickets > 0
            ? (((respondedTickets + closedTickets) / totalTickets) * 100).toFixed(2)
            : '0.00';
        // Artículos más vistos
        const topArticles = await prisma_1.prisma.article.findMany({
            where: {
                published: true,
            },
            select: {
                id: true,
                title: true,
                slug: true,
                views: true,
            },
            orderBy: {
                views: 'desc',
            },
            take: 5,
        });
        const stats = {
            completionRate: parseFloat(completionRate),
            activeStudentsLast30Days: activeStudents,
            tickets: {
                total: totalTickets,
                responseRate: parseFloat(responseRate),
            },
            topArticles,
        };
        const response = {
            success: true,
            data: stats,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Obtener estadísticas de un curso específico (ADMIN y PROFESOR del curso)
 */
async function getCourseStats(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { id } = req.params;
        // Verificar que el curso existe
        const course = await prisma_1.prisma.course.findUnique({
            where: { id },
            select: {
                instructorId: true,
            },
        });
        if (!course) {
            throw new errors_1.AuthorizationError('Curso no encontrado');
        }
        // Verificar permisos: solo admin o el profesor del curso
        if (req.user.role !== client_1.UserRole.ADMIN && course.instructorId !== req.user.id) {
            throw new errors_1.AuthorizationError('No tienes permiso para ver estas estadísticas');
        }
        // Obtener estadísticas del curso
        const [totalEnrollments, activeEnrollments, completedEnrollments, totalModules, totalLessons, totalQuizzes, averageProgress,] = await Promise.all([
            prisma_1.prisma.enrollment.count({ where: { courseId: id } }),
            prisma_1.prisma.enrollment.count({ where: { courseId: id, status: client_1.EnrollmentStatus.ACTIVE } }),
            prisma_1.prisma.enrollment.count({ where: { courseId: id, status: client_1.EnrollmentStatus.COMPLETED } }),
            prisma_1.prisma.module.count({ where: { courseId: id } }),
            prisma_1.prisma.lesson.count({
                where: {
                    module: {
                        courseId: id,
                    },
                },
            }),
            prisma_1.prisma.quiz.count({
                where: {
                    lesson: {
                        module: {
                            courseId: id,
                        },
                    },
                },
            }),
            prisma_1.prisma.enrollment.aggregate({
                where: { courseId: id },
                _avg: {
                    progress: true,
                },
            }),
        ]);
        // Estudiantes activos recientes (últimos 30 días)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const activeStudentsLast30Days = await prisma_1.prisma.user.count({
            where: {
                enrollments: {
                    some: {
                        courseId: id,
                        lastAccessedAt: {
                            gte: thirtyDaysAgo,
                        },
                    },
                },
            },
        });
        const stats = {
            enrollments: {
                total: totalEnrollments,
                active: activeEnrollments,
                completed: completedEnrollments,
                activeRecent: activeStudentsLast30Days,
            },
            content: {
                modules: totalModules,
                lessons: totalLessons,
                quizzes: totalQuizzes,
            },
            progress: {
                average: averageProgress._avg.progress || 0,
            },
        };
        const response = {
            success: true,
            data: stats,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Obtener estadísticas de un profesor específico (ADMIN y el propio PROFESOR)
 */
async function getProfessorStats(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { id } = req.params;
        // Verificar permisos: solo admin o el propio profesor
        if (req.user.role !== client_1.UserRole.ADMIN && req.user.id !== id) {
            throw new errors_1.AuthorizationError('No tienes permiso para ver estas estadísticas');
        }
        // Verificar que el usuario es profesor
        const professor = await prisma_1.prisma.user.findUnique({
            where: { id },
            select: { role: true },
        });
        if (!professor || professor.role !== client_1.UserRole.PROFESOR) {
            throw new errors_1.AuthorizationError('Usuario no es un profesor');
        }
        // Obtener estadísticas del profesor
        const [totalCourses, publishedCourses, totalStudents, totalArticles, publishedArticles, totalTickets,] = await Promise.all([
            prisma_1.prisma.course.count({ where: { instructorId: id } }),
            prisma_1.prisma.course.count({ where: { instructorId: id, published: true } }),
            prisma_1.prisma.enrollment.count({
                where: {
                    course: {
                        instructorId: id,
                    },
                },
            }),
            prisma_1.prisma.article.count({ where: { authorId: id } }),
            prisma_1.prisma.article.count({ where: { authorId: id, published: true } }),
            prisma_1.prisma.ticket.count({
                where: {
                    type: 'PROFESOR',
                    course: {
                        instructorId: id,
                    },
                },
            }),
        ]);
        const stats = {
            courses: {
                total: totalCourses,
                published: publishedCourses,
            },
            students: {
                total: totalStudents,
            },
            articles: {
                total: totalArticles,
                published: publishedArticles,
            },
            tickets: {
                total: totalTickets,
            },
        };
        const response = {
            success: true,
            data: stats,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=analytics.controller.js.map
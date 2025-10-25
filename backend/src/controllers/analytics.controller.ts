// Controlador de estadísticas y analytics (Admin)
import { Response, NextFunction } from 'express';
import { AuthRequest, ApiResponse } from '../types';
import { prisma } from '../utils/prisma';
import { AuthorizationError } from '../utils/errors';
import { UserRole, EnrollmentStatus } from '@prisma/client';

/**
 * Obtener estadísticas globales de la plataforma (solo ADMIN)
 */
export async function getGlobalStats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para acceder a estas estadísticas');
    }

    // Obtener estadísticas en paralelo
    const [
      totalUsers,
      activeUsers,
      totalStudents,
      totalProfessors,
      totalCourses,
      publishedCourses,
      draftCourses,
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      totalArticles,
      publishedArticles,
      totalTickets,
      openTickets,
      totalLessons,
      totalQuizzes,
    ] = await Promise.all([
      // Usuarios
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: UserRole.STUDENT } }),
      prisma.user.count({ where: { role: UserRole.PROFESOR } }),

      // Cursos
      prisma.course.count(),
      prisma.course.count({ where: { published: true } }),
      prisma.course.count({ where: { status: 'DRAFT' } }),

      // Matrículas
      prisma.enrollment.count(),
      prisma.enrollment.count({ where: { status: EnrollmentStatus.ACTIVE } }),
      prisma.enrollment.count({ where: { status: EnrollmentStatus.COMPLETED } }),

      // Artículos
      prisma.article.count(),
      prisma.article.count({ where: { published: true } }),

      // Tickets
      prisma.ticket.count(),
      prisma.ticket.count({ where: { status: 'ABIERTO' } }),

      // Contenido
      prisma.lesson.count(),
      prisma.quiz.count(),
    ]);

    // Calcular tendencias (últimos 30 días)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [
      newUsersLast30Days,
      newEnrollmentsLast30Days,
      newCoursesLast30Days,
      newArticlesLast30Days,
    ] = await Promise.all([
      prisma.user.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      prisma.enrollment.count({
        where: { enrolledAt: { gte: thirtyDaysAgo } },
      }),
      prisma.course.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      prisma.article.count({
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

    const response: ApiResponse = {
      success: true,
      data: stats,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener estadísticas de crecimiento por mes (solo ADMIN)
 */
export async function getGrowthStats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para acceder a estas estadísticas');
    }

    const { months = '12' } = req.query;
    const monthsNum = parseInt(months as string);

    // Calcular fecha de inicio (X meses atrás)
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - monthsNum);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    // Obtener datos agregados por mes
    const [usersGrowth, enrollmentsGrowth, coursesGrowth] = await Promise.all([
      prisma.$queryRaw`
        SELECT
          DATE_TRUNC('month', "createdAt") as month,
          COUNT(*) as count
        FROM "users"
        WHERE "createdAt" >= ${startDate}
        GROUP BY month
        ORDER BY month ASC
      `,
      prisma.$queryRaw`
        SELECT
          DATE_TRUNC('month', "enrolledAt") as month,
          COUNT(*) as count
        FROM "enrollments"
        WHERE "enrolledAt" >= ${startDate}
        GROUP BY month
        ORDER BY month ASC
      `,
      prisma.$queryRaw`
        SELECT
          DATE_TRUNC('month', "createdAt") as month,
          COUNT(*) as count
        FROM "courses"
        WHERE "createdAt" >= ${startDate}
        GROUP BY month
        ORDER BY month ASC
      `,
    ]);

    const response: ApiResponse = {
      success: true,
      data: {
        users: usersGrowth,
        enrollments: enrollmentsGrowth,
        courses: coursesGrowth,
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener top cursos por matrículas (solo ADMIN)
 */
export async function getTopCourses(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para acceder a estas estadísticas');
    }

    const { limit = '10' } = req.query;
    const limitNum = parseInt(limit as string);

    const topCourses = await prisma.course.findMany({
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

    const response: ApiResponse = {
      success: true,
      data: topCourses,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener top profesores por cursos creados (solo ADMIN)
 */
export async function getTopProfessors(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para acceder a estas estadísticas');
    }

    const { limit = '10' } = req.query;
    const limitNum = parseInt(limit as string);

    const topProfessors = await prisma.user.findMany({
      where: {
        role: UserRole.PROFESOR,
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
    const professorsWithStats = await Promise.all(
      topProfessors.map(async (professor) => {
        const totalEnrollments = await prisma.enrollment.count({
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
      })
    );

    const response: ApiResponse = {
      success: true,
      data: professorsWithStats,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener estadísticas de engagement (solo ADMIN)
 */
export async function getEngagementStats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para acceder a estas estadísticas');
    }

    // Calcular tasas de finalización
    const [totalEnrollments, completedEnrollments] = await Promise.all([
      prisma.enrollment.count(),
      prisma.enrollment.count({ where: { status: EnrollmentStatus.COMPLETED } }),
    ]);

    const completionRate = totalEnrollments > 0
      ? ((completedEnrollments / totalEnrollments) * 100).toFixed(2)
      : '0.00';

    // Estudiantes activos (con progreso en los últimos 30 días)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const activeStudents = await prisma.user.count({
      where: {
        role: UserRole.STUDENT,
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
      prisma.ticket.count(),
      prisma.ticket.count({ where: { status: 'RESPONDIDO' } }),
      prisma.ticket.count({ where: { status: 'CERRADO' } }),
    ]);

    const responseRate = totalTickets > 0
      ? (((respondedTickets + closedTickets) / totalTickets) * 100).toFixed(2)
      : '0.00';

    // Artículos más vistos
    const topArticles = await prisma.article.findMany({
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

    const response: ApiResponse = {
      success: true,
      data: stats,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener estadísticas de un curso específico (ADMIN y PROFESOR del curso)
 */
export async function getCourseStats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;

    // Verificar que el curso existe
    const course = await prisma.course.findUnique({
      where: { id },
      select: {
        instructorId: true,
      },
    });

    if (!course) {
      throw new AuthorizationError('Curso no encontrado');
    }

    // Verificar permisos: solo admin o el profesor del curso
    if (req.user.role !== UserRole.ADMIN && course.instructorId !== req.user.id) {
      throw new AuthorizationError('No tienes permiso para ver estas estadísticas');
    }

    // Obtener estadísticas del curso
    const [
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      totalModules,
      totalLessons,
      totalQuizzes,
      averageProgress,
    ] = await Promise.all([
      prisma.enrollment.count({ where: { courseId: id } }),
      prisma.enrollment.count({ where: { courseId: id, status: EnrollmentStatus.ACTIVE } }),
      prisma.enrollment.count({ where: { courseId: id, status: EnrollmentStatus.COMPLETED } }),
      prisma.module.count({ where: { courseId: id } }),
      prisma.lesson.count({
        where: {
          module: {
            courseId: id,
          },
        },
      }),
      prisma.quiz.count({
        where: {
          lesson: {
            module: {
              courseId: id,
            },
          },
        },
      }),
      prisma.enrollment.aggregate({
        where: { courseId: id },
        _avg: {
          progress: true,
        },
      }),
    ]);

    // Estudiantes activos recientes (últimos 30 días)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const activeStudentsLast30Days = await prisma.user.count({
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

    const response: ApiResponse = {
      success: true,
      data: stats,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener estadísticas de un profesor específico (ADMIN y el propio PROFESOR)
 */
export async function getProfessorStats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;

    // Verificar permisos: solo admin o el propio profesor
    if (req.user.role !== UserRole.ADMIN && req.user.id !== id) {
      throw new AuthorizationError('No tienes permiso para ver estas estadísticas');
    }

    // Verificar que el usuario es profesor
    const professor = await prisma.user.findUnique({
      where: { id },
      select: { role: true },
    });

    if (!professor || professor.role !== UserRole.PROFESOR) {
      throw new AuthorizationError('Usuario no es un profesor');
    }

    // Obtener estadísticas del profesor
    const [
      totalCourses,
      publishedCourses,
      totalStudents,
      totalArticles,
      publishedArticles,
      totalTickets,
    ] = await Promise.all([
      prisma.course.count({ where: { instructorId: id } }),
      prisma.course.count({ where: { instructorId: id, published: true } }),
      prisma.enrollment.count({
        where: {
          course: {
            instructorId: id,
          },
        },
      }),
      prisma.article.count({ where: { authorId: id } }),
      prisma.article.count({ where: { authorId: id, published: true } }),
      prisma.ticket.count({
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

    const response: ApiResponse = {
      success: true,
      data: stats,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

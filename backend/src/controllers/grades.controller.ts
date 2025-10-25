import { Response } from 'express';
import { AuthRequest } from '../types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todas las calificaciones de un estudiante en un curso
export const getStudentGrades = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Usuario no autenticado',
      });
    }

    // Verificar que el estudiante está matriculado en el curso
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        error: 'No estás matriculado en este curso',
      });
    }

    // Obtener todas las calificaciones del estudiante en este curso
    const grades = await prisma.gradeRecord.findMany({
      where: {
        userId,
        courseId,
      },
      orderBy: {
        achievedAt: 'asc',
      },
    });

    // Agrupar calificaciones por módulo y lección
    const gradesByModule: any = {};
    const gameExerciseGrades: any[] = [];
    const moduleTestGrades: any[] = [];

    for (const grade of grades) {
      if (grade.type === 'GAME_EXERCISE') {
        gameExerciseGrades.push(grade);
      } else if (grade.type === 'MODULE_TEST') {
        moduleTestGrades.push(grade);
        if (grade.moduleId) {
          if (!gradesByModule[grade.moduleId]) {
            gradesByModule[grade.moduleId] = {
              moduleId: grade.moduleId,
              testGrade: null,
              exerciseGrades: [],
            };
          }
          gradesByModule[grade.moduleId].testGrade = grade;
        }
      }

      if (grade.moduleId && grade.type === 'GAME_EXERCISE') {
        if (!gradesByModule[grade.moduleId]) {
          gradesByModule[grade.moduleId] = {
            moduleId: grade.moduleId,
            testGrade: null,
            exerciseGrades: [],
          };
        }
        gradesByModule[grade.moduleId].exerciseGrades.push(grade);
      }
    }

    // Calcular nota final del curso (media de los tests de módulo)
    const moduleTestScores = moduleTestGrades.map(g => g.score);
    const finalGrade = moduleTestScores.length > 0
      ? moduleTestScores.reduce((sum, score) => sum + score, 0) / moduleTestScores.length
      : 0;

    res.json({
      success: true,
      data: {
        courseId,
        userId,
        finalGrade,
        totalGameExercises: gameExerciseGrades.length,
        totalModuleTests: moduleTestGrades.length,
        gameExerciseGrades,
        moduleTestGrades,
        gradesByModule: Object.values(gradesByModule),
        allGrades: grades,
      },
    });
  } catch (error) {
    console.error('Error fetching student grades:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las calificaciones',
    });
  }
};

// Obtener calificaciones de todos los estudiantes en un curso (para instructor/admin)
export const getCourseGrades = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;

    // Validar permisos
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'ADMIN' && user.role !== 'PROFESOR')) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para ver las calificaciones del curso',
      });
    }

    // Si es profesor, verificar que es el instructor
    if (user.role === 'PROFESOR') {
      const course = await prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!course || course.instructorId !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Solo el instructor puede ver las calificaciones',
        });
      }
    }

    // Obtener todos los estudiantes matriculados
    const enrollments = await prisma.enrollment.findMany({
      where: {
        courseId,
        status: 'ACTIVE',
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Obtener todas las calificaciones del curso
    const allGrades = await prisma.gradeRecord.findMany({
      where: { courseId },
      orderBy: {
        achievedAt: 'asc',
      },
    });

    // Agrupar calificaciones por estudiante
    const studentGrades: any = {};

    for (const enrollment of enrollments) {
      const studentId = enrollment.user.id;
      const grades = allGrades.filter(g => g.userId === studentId);

      const moduleTests = grades.filter(g => g.type === 'MODULE_TEST');
      const gameExercises = grades.filter(g => g.type === 'GAME_EXERCISE');

      const finalGrade = moduleTests.length > 0
        ? moduleTests.reduce((sum, g) => sum + g.score, 0) / moduleTests.length
        : 0;

      studentGrades[studentId] = {
        student: enrollment.user,
        finalGrade,
        moduleTestCount: moduleTests.length,
        gameExerciseCount: gameExercises.length,
        moduleTestGrades: moduleTests,
        gameExerciseGrades: gameExercises,
        enrollmentStatus: enrollment.status,
        progress: enrollment.progress,
      };
    }

    res.json({
      success: true,
      data: {
        courseId,
        totalStudents: enrollments.length,
        studentGrades: Object.values(studentGrades),
      },
    });
  } catch (error) {
    console.error('Error fetching course grades:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las calificaciones del curso',
    });
  }
};

// Obtener evolución temporal de un estudiante en un curso
export const getStudentProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Usuario no autenticado',
      });
    }

    // Verificar matriculación
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        error: 'No estás matriculado en este curso',
      });
    }

    // Obtener estructura del curso
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
            moduleTest: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Curso no encontrado',
      });
    }

    // Obtener todas las calificaciones
    const grades = await prisma.gradeRecord.findMany({
      where: {
        userId,
        courseId,
      },
      orderBy: {
        achievedAt: 'asc',
      },
    });

    // Obtener progreso de lecciones
    const lessonProgress = await prisma.progress.findMany({
      where: {
        userId,
        lesson: {
          module: {
            courseId,
          },
        },
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            moduleId: true,
          },
        },
      },
    });

    // Construir evolución temporal
    const timeline = grades.map(grade => ({
      date: grade.achievedAt,
      type: grade.type,
      score: grade.score,
      moduleId: grade.moduleId,
      lessonId: grade.lessonId,
    }));

    // Calcular estadísticas por módulo
    const moduleStats = course.modules.map(module => {
      const moduleLessonIds = module.lessons.map(l => l.id);
      const completedLessons = lessonProgress.filter(
        p => moduleLessonIds.includes(p.lessonId) && p.completed
      ).length;

      const moduleGrades = grades.filter(g => g.moduleId === module.id);
      const testGrade = moduleGrades.find(g => g.type === 'MODULE_TEST');
      const exerciseGrades = moduleGrades.filter(g => g.type === 'GAME_EXERCISE');

      return {
        moduleId: module.id,
        moduleTitle: module.title,
        moduleOrder: module.order,
        totalLessons: module.lessons.length,
        completedLessons,
        completionPercentage: module.lessons.length > 0
          ? (completedLessons / module.lessons.length) * 100
          : 0,
        hasTest: !!module.moduleTest,
        testCompleted: !!testGrade,
        testScore: testGrade?.score || null,
        exerciseCount: exerciseGrades.length,
        averageExerciseScore: exerciseGrades.length > 0
          ? exerciseGrades.reduce((sum, g) => sum + g.score, 0) / exerciseGrades.length
          : null,
      };
    });

    res.json({
      success: true,
      data: {
        courseId,
        courseTitle: course.title,
        userId,
        enrolledAt: enrollment.enrolledAt,
        overallProgress: enrollment.progress,
        totalModules: course.modules.length,
        moduleStats,
        timeline,
        lessonProgress,
      },
    });
  } catch (error) {
    console.error('Error fetching student progress:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el progreso del estudiante',
    });
  }
};

// Obtener resumen de calificaciones de un módulo específico
export const getModuleGrades = async (req: AuthRequest, res: Response) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Usuario no autenticado',
      });
    }

    // Obtener módulo con información del curso
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        course: true,
        lessons: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Módulo no encontrado',
      });
    }

    // Verificar matriculación
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: module.courseId,
        },
      },
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        error: 'No estás matriculado en este curso',
      });
    }

    // Obtener calificaciones del módulo
    const grades = await prisma.gradeRecord.findMany({
      where: {
        userId,
        moduleId,
      },
      orderBy: {
        achievedAt: 'asc',
      },
    });

    const testGrade = grades.find(g => g.type === 'MODULE_TEST');
    const exerciseGrades = grades.filter(g => g.type === 'GAME_EXERCISE');

    res.json({
      success: true,
      data: {
        moduleId,
        moduleTitle: module.title,
        courseId: module.courseId,
        testGrade,
        exerciseGrades,
        totalExercises: module.lessons.length,
        completedExercises: exerciseGrades.length,
        averageExerciseScore: exerciseGrades.length > 0
          ? exerciseGrades.reduce((sum, g) => sum + g.score, 0) / exerciseGrades.length
          : null,
      },
    });
  } catch (error) {
    console.error('Error fetching module grades:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las calificaciones del módulo',
    });
  }
};

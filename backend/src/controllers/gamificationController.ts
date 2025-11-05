import { Request, Response } from 'express';
import gamificationService from '../services/gamificationService';

/**
 * GET /api/gamification/dashboard
 * Obtiene el dashboard completo del usuario con progreso, nivel, achievements y estadísticas
 */
export const getUserDashboard = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const dashboard = await gamificationService.getUserDashboard(userId);

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    console.error('Error al obtener dashboard:', error);
    res.status(500).json({
      error: 'Error al obtener el dashboard de gamificación',
    });
  }
};

/**
 * GET /api/gamification/progress
 * Obtiene el progreso XP y nivel del usuario
 */
export const getUserProgress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const userProgress = await gamificationService.getUserProgress(userId);
    const levelInfo = gamificationService.getLevelInfo(userProgress.totalXP);

    res.status(200).json({
      success: true,
      data: {
        progress: userProgress,
        level: levelInfo,
      },
    });
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    res.status(500).json({
      error: 'Error al obtener el progreso del usuario',
    });
  }
};

/**
 * GET /api/gamification/achievements
 * Obtiene todos los achievements del usuario (desbloqueados y disponibles)
 */
export const getAchievements = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const [userAchievements, allAchievements] = await Promise.all([
      gamificationService.getUserAchievements(userId),
      gamificationService.getAllAchievements(),
    ]);

    // Marcar cuáles están desbloqueados
    const unlockedIds = new Set(userAchievements.map(ua => ua.achievement.id));

    const achievementsWithStatus = allAchievements.map(achievement => ({
      ...achievement,
      unlocked: unlockedIds.has(achievement.id),
      unlockedAt: userAchievements.find(ua => ua.achievement.id === achievement.id)?.earnedAt,
    }));

    // Agrupar por tipo
    const achievementsByType = achievementsWithStatus.reduce((acc: any, achievement) => {
      const type = achievement.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(achievement);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        achievements: achievementsWithStatus,
        achievementsByType,
        stats: {
          unlocked: userAchievements.length,
          total: allAchievements.length,
          completionPercentage: (userAchievements.length / allAchievements.length) * 100,
        },
      },
    });
  } catch (error) {
    console.error('Error al obtener achievements:', error);
    res.status(500).json({
      error: 'Error al obtener los achievements',
    });
  }
};

/**
 * POST /api/gamification/lesson-complete
 * Registra la completación de una lección y otorga XP
 */
export const completeLesson = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { lessonId } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if (!lessonId) {
      return res.status(400).json({ error: 'lessonId es requerido' });
    }

    const result = await gamificationService.completeLesson(userId, lessonId);

    res.status(200).json({
      success: true,
      data: result,
      message: result.alreadyCompleted
        ? 'Lección ya completada previamente'
        : `¡Lección completada! +${result.xpGained} XP`,
    });
  } catch (error) {
    console.error('Error al completar lección:', error);
    res.status(500).json({
      error: 'Error al registrar la completación de la lección',
    });
  }
};

/**
 * POST /api/gamification/exercise-complete
 * Registra la completación de un ejercicio gamificado y otorga XP
 */
export const completeExercise = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { exerciseId, score } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if (!exerciseId || score === undefined) {
      return res.status(400).json({ error: 'exerciseId y score son requeridos' });
    }

    const result = await gamificationService.completeExercise(userId, exerciseId, score);

    res.status(200).json({
      success: true,
      data: result,
      message: `¡Ejercicio completado! +${result.xpGained} XP`,
    });
  } catch (error) {
    console.error('Error al completar ejercicio:', error);
    res.status(500).json({
      error: 'Error al registrar la completación del ejercicio',
    });
  }
};

/**
 * POST /api/gamification/test-pass
 * Registra la aprobación de un test de módulo y otorga XP
 */
export const passTest = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { testId, score } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if (!testId || score === undefined) {
      return res.status(400).json({ error: 'testId y score son requeridos' });
    }

    const result = await gamificationService.passTest(userId, testId, score);

    const isPerfect = score === 10;
    const message = isPerfect
      ? `¡Test perfecto! +${result.xpGained} XP`
      : `¡Test aprobado! +${result.xpGained} XP`;

    res.status(200).json({
      success: true,
      data: result,
      message,
    });
  } catch (error) {
    console.error('Error al registrar test aprobado:', error);
    res.status(500).json({
      error: 'Error al registrar la aprobación del test',
    });
  }
};

/**
 * GET /api/gamification/leaderboard
 * Obtiene el ranking de estudiantes por XP (top 100)
 */
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    const topUsers = await prisma.userProgress.findMany({
      take: 100,
      orderBy: [
        { totalXP: 'desc' },
        { currentLevel: 'desc' },
      ],
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    const userId = (req as any).user?.id;

    // Encontrar posición del usuario actual
    let userRank = null;
    if (userId) {
      const userProgress = await prisma.userProgress.findUnique({
        where: { userId },
      });

      if (userProgress) {
        const rank = await prisma.userProgress.count({
          where: {
            totalXP: {
              gt: userProgress.totalXP,
            },
          },
        });

        userRank = {
          rank: rank + 1,
          ...userProgress,
        };
      }
    }

    const leaderboard = topUsers.map((entry, index) => {
      const levelInfo = gamificationService.getLevelInfo(entry.totalXP);

      return {
        rank: index + 1,
        user: {
          id: entry.user.id,
          name: `${entry.user.firstName} ${entry.user.lastName}`,
          avatar: entry.user.avatar,
        },
        totalXP: entry.totalXP,
        level: levelInfo.currentLevel,
        levelName: levelInfo.currentLevelName,
        currentStreak: entry.currentStreak,
      };
    });

    await prisma.$disconnect();

    res.status(200).json({
      success: true,
      data: {
        leaderboard,
        userRank,
      },
    });
  } catch (error) {
    console.error('Error al obtener leaderboard:', error);
    res.status(500).json({
      error: 'Error al obtener el ranking',
    });
  }
};

export default {
  getUserDashboard,
  getUserProgress,
  getAchievements,
  completeLesson,
  completeExercise,
  passTest,
  getLeaderboard,
};

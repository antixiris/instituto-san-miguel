import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ===============================================
// CONFIGURACIÓN DEL SISTEMA DE NIVELES Y XP
// ===============================================

// Niveles y XP requerido acumulativo
export const LEVELS = [
  { level: 1, name: '🌱 Aprendiz', minXP: 0, maxXP: 499 },
  { level: 2, name: '💻 Desarrollador Junior', minXP: 500, maxXP: 1499 },
  { level: 3, name: '⚡ Desarrollador', minXP: 1500, maxXP: 2999 },
  { level: 4, name: '🚀 Desarrollador Senior', minXP: 3000, maxXP: 4499 },
  { level: 5, name: '🎓 Experto', minXP: 4500, maxXP: 4999 },
  { level: 6, name: '💎 Maestro Claude Code', minXP: 5000, maxXP: 5999 },
  { level: 7, name: '👑 Leyenda', minXP: 6000, maxXP: Infinity },
];

// XP por acciones
export const XP_REWARDS = {
  LESSON_COMPLETED: 50,         // Completar lección
  EXERCISE_COMPLETED: 50,       // Completar ejercicio gamificado
  TEST_PASSED: 100,             // Aprobar test de módulo
  PERFECT_TEST: 150,            // Test con 10/10
  DAILY_STREAK: 10,             // Bonus por día consecutivo
  STREAK_MULTIPLIER_7DAYS: 1.5, // Multiplicador a partir de 7 días
};

// ===============================================
// FUNCIONES DE CÁLCULO DE NIVEL
// ===============================================

/**
 * Calcula el nivel actual basado en XP total
 */
export function calculateLevel(totalXP: number): number {
  const levelData = LEVELS.find(l => totalXP >= l.minXP && totalXP <= l.maxXP);
  return levelData ? levelData.level : 1;
}

/**
 * Obtiene información completa del nivel actual
 */
export function getLevelInfo(totalXP: number) {
  const currentLevelData = LEVELS.find(l => totalXP >= l.minXP && totalXP <= l.maxXP) || LEVELS[0];
  const nextLevelData = LEVELS[currentLevelData.level] || null;

  const xpInCurrentLevel = totalXP - currentLevelData.minXP;
  const xpNeededForNextLevel = nextLevelData
    ? nextLevelData.minXP - currentLevelData.minXP
    : 0;

  const progressToNextLevel = nextLevelData
    ? (xpInCurrentLevel / xpNeededForNextLevel) * 100
    : 100;

  return {
    currentLevel: currentLevelData.level,
    currentLevelName: currentLevelData.name,
    totalXP,
    xpInCurrentLevel,
    xpNeededForNextLevel,
    progressToNextLevel: Math.min(progressToNextLevel, 100),
    nextLevelName: nextLevelData?.name || 'Máximo nivel alcanzado',
    isMaxLevel: !nextLevelData,
  };
}

// ===============================================
// FUNCIONES DE PROGRESO DE USUARIO
// ===============================================

/**
 * Obtiene o crea el progreso de un usuario
 */
export async function getUserProgress(userId: string) {
  let userProgress = await prisma.userProgress.findUnique({
    where: { userId },
  });

  if (!userProgress) {
    // Crear progreso inicial si no existe
    userProgress = await prisma.userProgress.create({
      data: {
        userId,
        totalXP: 0,
        currentLevel: 1,
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: new Date(),
        totalLessonsCompleted: 0,
        totalExercisesCompleted: 0,
        totalTestsPassed: 0,
      },
    });
  }

  return userProgress;
}

/**
 * Añade XP al usuario y actualiza nivel
 */
export async function addXP(userId: string, xpAmount: number, reason: string) {
  const userProgress = await getUserProgress(userId);

  const newTotalXP = userProgress.totalXP + xpAmount;
  const newLevel = calculateLevel(newTotalXP);

  const updatedProgress = await prisma.userProgress.update({
    where: { userId },
    data: {
      totalXP: newTotalXP,
      currentLevel: newLevel,
      lastActivityDate: new Date(),
    },
  });

  // Verificar si subió de nivel
  const leveledUp = newLevel > userProgress.currentLevel;

  return {
    progress: updatedProgress,
    leveledUp,
    previousLevel: userProgress.currentLevel,
    newLevel,
    xpGained: xpAmount,
    reason,
  };
}

/**
 * Actualiza la racha de días consecutivos
 */
export async function updateStreak(userId: string) {
  const userProgress = await getUserProgress(userId);
  const today = new Date();
  const lastActivity = new Date(userProgress.lastActivityDate);

  // Calcular diferencia en días
  const diffTime = Math.abs(today.getTime() - lastActivity.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let currentStreak = userProgress.currentStreak;
  let streakBonus = 0;

  if (diffDays === 0) {
    // Mismo día, no hacer nada
    return { streakContinued: false, currentStreak, streakBonus };
  } else if (diffDays === 1) {
    // Día consecutivo
    currentStreak += 1;
    streakBonus = XP_REWARDS.DAILY_STREAK;

    // Multiplicador a partir de 7 días
    if (currentStreak >= 7) {
      streakBonus = Math.floor(streakBonus * XP_REWARDS.STREAK_MULTIPLIER_7DAYS);
    }
  } else {
    // Racha rota
    currentStreak = 1;
  }

  // Actualizar progreso
  const updatedProgress = await prisma.userProgress.update({
    where: { userId },
    data: {
      currentStreak,
      longestStreak: Math.max(currentStreak, userProgress.longestStreak),
      lastActivityDate: today,
      totalXP: userProgress.totalXP + streakBonus,
    },
  });

  // Verificar achievements de racha
  await checkStreakAchievements(userId, currentStreak);

  return {
    streakContinued: diffDays === 1,
    currentStreak,
    longestStreak: updatedProgress.longestStreak,
    streakBonus,
  };
}

/**
 * Registra la completación de una lección y otorga XP
 */
export async function completeLesson(userId: string, lessonId: string) {
  const userProgress = await getUserProgress(userId);

  // Verificar si la lección ya fue completada
  const existingProgress = await prisma.progress.findUnique({
    where: {
      userId_lessonId: { userId, lessonId },
    },
  });

  if (existingProgress?.completed) {
    return { alreadyCompleted: true, xpGained: 0 };
  }

  // Marcar lección como completada
  await prisma.progress.upsert({
    where: {
      userId_lessonId: { userId, lessonId },
    },
    create: {
      userId,
      lessonId,
      completed: true,
      completedAt: new Date(),
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
  });

  // Otorgar XP
  const xpResult = await addXP(userId, XP_REWARDS.LESSON_COMPLETED, 'Lección completada');

  // Actualizar contador de lecciones
  await prisma.userProgress.update({
    where: { userId },
    data: {
      totalLessonsCompleted: userProgress.totalLessonsCompleted + 1,
    },
  });

  // Actualizar racha
  const streakResult = await updateStreak(userId);

  // Verificar achievements de progreso
  await checkProgressAchievements(userId);

  return {
    alreadyCompleted: false,
    ...xpResult,
    streak: streakResult,
  };
}

/**
 * Registra la completación de un ejercicio gamificado y otorga XP
 */
export async function completeExercise(userId: string, exerciseId: string, score: number) {
  const userProgress = await getUserProgress(userId);

  // Otorgar XP (proporcional al score)
  const baseXP = XP_REWARDS.EXERCISE_COMPLETED;
  const xpAmount = Math.floor(baseXP * (score / 10)); // Score sobre 10

  const xpResult = await addXP(userId, xpAmount, 'Ejercicio completado');

  // Actualizar contador de ejercicios
  await prisma.userProgress.update({
    where: { userId },
    data: {
      totalExercisesCompleted: userProgress.totalExercisesCompleted + 1,
    },
  });

  return xpResult;
}

/**
 * Registra la aprobación de un test de módulo y otorga XP
 */
export async function passTest(userId: string, testId: string, score: number) {
  const userProgress = await getUserProgress(userId);

  // Otorgar XP (bonus si es perfecto)
  const baseXP = XP_REWARDS.TEST_PASSED;
  const isPerfect = score === 10;
  const xpAmount = isPerfect ? XP_REWARDS.PERFECT_TEST : baseXP;

  const xpResult = await addXP(userId, xpAmount, isPerfect ? 'Test perfecto' : 'Test aprobado');

  // Actualizar contador de tests
  await prisma.userProgress.update({
    where: { userId },
    data: {
      totalTestsPassed: userProgress.totalTestsPassed + 1,
    },
  });

  // Verificar achievements de excelencia
  await checkExcellenceAchievements(userId, score);

  return xpResult;
}

// ===============================================
// FUNCIONES DE ACHIEVEMENTS
// ===============================================

/**
 * Verifica TODOS los achievements según sus criterios JSON
 * Esta función centralizada revisa automáticamente todos los logros disponibles
 * Retorna array de achievements recién desbloqueados
 */
async function checkAllAchievements(userId: string) {
  // Obtener todos los achievements del sistema
  const allAchievements = await prisma.achievement.findMany();

  // Obtener progreso y datos del usuario
  const userProgress = await getUserProgress(userId);
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId },
    orderBy: { enrolledAt: 'desc' },
  });

  // Obtener todas las lecciones completadas por el usuario
  const completedLessons = await prisma.progress.findMany({
    where: {
      userId,
      completed: true
    },
    include: {
      lesson: {
        include: {
          module: true
        }
      }
    }
  });

  // Obtener todos los tests aprobados
  const passedTests = await prisma.moduleTestSubmission.findMany({
    where: {
      userId,
      passed: true
    },
    include: {
      test: {
        include: {
          module: true
        }
      }
    }
  });

  // Array para guardar achievements recién desbloqueados
  const newlyUnlocked = [];

  // Verificar cada achievement
  for (const achievement of allAchievements) {
    try {
      const criteria = JSON.parse(achievement.criteria as string);
      let shouldUnlock = false;

      switch (criteria.type) {
        // ACHIEVEMENTS DE PROGRESO
        case 'lesson_completed':
          // Verificar si completó una lección específica
          if (criteria.lessonOrder && criteria.moduleOrder) {
            shouldUnlock = completedLessons.some(
              p => p.lesson.order === criteria.lessonOrder &&
                   p.lesson.module.order === criteria.moduleOrder
            );
          }
          break;

        case 'lessons_count':
          // Verificar cantidad de lecciones completadas
          shouldUnlock = userProgress.totalLessonsCompleted >= criteria.count;
          break;

        case 'course_progress':
          // Verificar porcentaje de progreso del curso
          if (enrollment) {
            shouldUnlock = enrollment.progress >= criteria.percentage;
          }
          break;

        // ACHIEVEMENTS DE EXCELENCIA
        case 'test_perfect':
          // Verificar test perfecto (score === 10)
          shouldUnlock = passedTests.some(t => t.score === 10);
          break;

        case 'all_tests_passed':
          // Verificar que aprobó todos los tests del curso
          const totalTests = 9; // 9 módulos con test
          shouldUnlock = userProgress.totalTestsPassed >= totalTests;
          break;

        case 'test_first':
          // Primer test aprobado
          shouldUnlock = userProgress.totalTestsPassed >= 1;
          break;

        // ACHIEVEMENTS DE CONSISTENCIA
        case 'streak':
          // Verificar racha de días consecutivos
          shouldUnlock = userProgress.currentStreak >= criteria.days;
          break;

        // ACHIEVEMENTS DE ESPECIALIZACIÓN
        case 'module_complete':
          // Verificar si completó todas las lecciones de un módulo específico
          if (criteria.moduleName) {
            const moduleProgress = completedLessons.filter(
              p => p.lesson.module.title.toLowerCase().includes(criteria.moduleName.toLowerCase())
            );

            // Contar cuántas lecciones tiene el módulo
            const totalModuleLessons = await prisma.lesson.count({
              where: {
                module: {
                  title: {
                    contains: criteria.moduleName,
                    mode: 'insensitive'
                  }
                }
              }
            });

            shouldUnlock = moduleProgress.length >= totalModuleLessons && totalModuleLessons > 0;
          }
          break;

        // ACHIEVEMENTS OCULTOS
        case 'hidden':
          // Los achievements ocultos se otorgan manualmente o por eventos especiales
          // Por ahora, no se verifican automáticamente
          break;
      }

      if (shouldUnlock) {
        const result = await grantAchievement(userId, achievement.name);
        if (result && result.justUnlocked) {
          newlyUnlocked.push(result.achievement);
        }
      }
    } catch (error) {
      console.error(`Error checking achievement ${achievement.name}:`, error);
    }
  }

  return newlyUnlocked;
}

/**
 * Verifica y otorga achievements de progreso
 */
async function checkProgressAchievements(userId: string) {
  // Usar la función centralizada
  await checkAllAchievements(userId);
}

/**
 * Verifica y otorga achievements de rachas
 */
async function checkStreakAchievements(userId: string, currentStreak: number) {
  // Usar la función centralizada
  await checkAllAchievements(userId);
}

/**
 * Verifica y otorga achievements de excelencia
 */
async function checkExcellenceAchievements(userId: string, score: number) {
  // Usar la función centralizada
  await checkAllAchievements(userId);
}

/**
 * Otorga un achievement a un usuario (si aún no lo tiene)
 * Retorna información del achievement si fue desbloqueado por primera vez
 */
async function grantAchievement(userId: string, achievementName: string) {
  const achievement = await prisma.achievement.findUnique({
    where: { name: achievementName },
  });

  if (!achievement) return null;

  // Verificar si ya tiene el achievement
  const existing = await prisma.userAchievement.findUnique({
    where: {
      userId_achievementId: {
        userId,
        achievementId: achievement.id,
      },
    },
  });

  if (existing) return null; // Ya lo tiene, no hay nada nuevo

  // Otorgar achievement
  const userAchievement = await prisma.userAchievement.create({
    data: {
      userId,
      achievementId: achievement.id,
    },
  });

  // Otorgar XP del achievement
  await addXP(userId, achievement.points, `Achievement: ${achievement.name}`);

  console.log(`🏆 Achievement unlocked for user ${userId}: ${achievement.name} (+${achievement.points} XP)`);

  return {
    achievement,
    userAchievement,
    justUnlocked: true,
  };
}

/**
 * Obtiene todos los achievements del usuario
 */
export async function getUserAchievements(userId: string) {
  const userAchievements = await prisma.userAchievement.findMany({
    where: { userId },
    include: {
      achievement: true,
    },
    orderBy: {
      earnedAt: 'desc',
    },
  });

  return userAchievements;
}

/**
 * Obtiene todos los achievements disponibles
 */
export async function getAllAchievements() {
  return await prisma.achievement.findMany({
    orderBy: [
      { type: 'asc' },
      { points: 'asc' },
    ],
  });
}

/**
 * Obtiene el dashboard completo del usuario
 */
export async function getUserDashboard(userId: string) {
  const userProgress = await getUserProgress(userId);
  const levelInfo = getLevelInfo(userProgress.totalXP);
  const achievements = await getUserAchievements(userId);
  const allAchievements = await getAllAchievements();

  // Calcular progreso general del curso
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId },
    orderBy: { enrolledAt: 'desc' },
  });

  return {
    progress: userProgress,
    level: levelInfo,
    achievements: {
      unlocked: achievements,
      total: allAchievements,
      unlockedCount: achievements.length,
      totalCount: allAchievements.length,
      completionPercentage: (achievements.length / allAchievements.length) * 100,
    },
    stats: {
      lessonsCompleted: userProgress.totalLessonsCompleted,
      exercisesCompleted: userProgress.totalExercisesCompleted,
      testsPassed: userProgress.totalTestsPassed,
      currentStreak: userProgress.currentStreak,
      longestStreak: userProgress.longestStreak,
      courseProgress: enrollment?.progress || 0,
    },
  };
}

// Exportar función de verificación de achievements (útil para sincronización manual)
export { checkAllAchievements };

export default {
  getUserProgress,
  addXP,
  updateStreak,
  completeLesson,
  completeExercise,
  passTest,
  getUserAchievements,
  getAllAchievements,
  getUserDashboard,
  getLevelInfo,
  calculateLevel,
  checkAllAchievements,
};

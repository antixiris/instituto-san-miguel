import { Router } from 'express';
import gamificationController from '../controllers/gamificationController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Todas las rutas de gamificación requieren autenticación
router.use(authenticate);

/**
 * GET /api/gamification/dashboard
 * Obtiene el dashboard completo con progreso, nivel, achievements y stats
 */
router.get('/dashboard', gamificationController.getUserDashboard);

/**
 * GET /api/gamification/progress
 * Obtiene el progreso XP y nivel del usuario
 */
router.get('/progress', gamificationController.getUserProgress);

/**
 * GET /api/gamification/achievements
 * Obtiene todos los achievements (desbloqueados y disponibles)
 */
router.get('/achievements', gamificationController.getAchievements);

/**
 * POST /api/gamification/lesson-complete
 * Registra completación de lección y otorga XP
 * Body: { lessonId: string }
 */
router.post('/lesson-complete', gamificationController.completeLesson);

/**
 * POST /api/gamification/exercise-complete
 * Registra completación de ejercicio gamificado y otorga XP
 * Body: { exerciseId: string, score: number }
 */
router.post('/exercise-complete', gamificationController.completeExercise);

/**
 * POST /api/gamification/test-pass
 * Registra aprobación de test de módulo y otorga XP
 * Body: { testId: string, score: number }
 */
router.post('/test-pass', gamificationController.passTest);

/**
 * GET /api/gamification/leaderboard
 * Obtiene el ranking de estudiantes por XP (top 100)
 */
router.get('/leaderboard', gamificationController.getLeaderboard);

export default router;

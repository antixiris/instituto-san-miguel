// Rutas de estadísticas y analytics
import { Router } from 'express';
import {
  getGlobalStats,
  getGrowthStats,
  getTopCourses,
  getTopProfessors,
  getEngagementStats,
  getCourseStats,
  getProfessorStats,
} from '../controllers/analytics.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// Rutas de estadísticas globales (solo ADMIN)
router.get(
  '/global',
  authorize(UserRole.ADMIN),
  getGlobalStats
);

router.get(
  '/growth',
  authorize(UserRole.ADMIN),
  getGrowthStats
);

router.get(
  '/top-courses',
  authorize(UserRole.ADMIN),
  getTopCourses
);

router.get(
  '/top-professors',
  authorize(UserRole.ADMIN),
  getTopProfessors
);

router.get(
  '/engagement',
  authorize(UserRole.ADMIN),
  getEngagementStats
);

// Estadísticas de curso (ADMIN y PROFESOR del curso)
router.get(
  '/courses/:id',
  authorize(UserRole.ADMIN, UserRole.PROFESOR),
  getCourseStats
);

// Estadísticas de profesor (ADMIN y el propio PROFESOR)
router.get(
  '/professors/:id',
  authorize(UserRole.ADMIN, UserRole.PROFESOR),
  getProfessorStats
);

export default router;

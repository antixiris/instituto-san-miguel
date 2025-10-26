// Rutas de módulos y lecciones
import { Router } from 'express';
import { body } from 'express-validator';
import {
  getCourseModules,
  createModule,
  updateModule,
  deleteModule,
  reorderModules,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../controllers/modules.controller';
import { getLessonById, updateLessonProgress, getCourseProgress } from '../controllers/lessons.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { UserRole } from '@prisma/client';

const router = Router();

// Validaciones
const createModuleValidation = [
  body('title').notEmpty().withMessage('El título es requerido'),
];

const createLessonValidation = [
  body('title').notEmpty().withMessage('El título es requerido'),
  body('type')
    .isIn(['VIDEO', 'TEXT', 'QUIZ', 'EXERCISE', 'RESOURCE'])
    .withMessage('Tipo de lección inválido'),
];

// Rutas de módulos
router.get(
  '/courses/:courseId/modules',
  authenticate,
  getCourseModules
);

router.post(
  '/courses/:courseId/modules',
  authenticate,
  authorize(UserRole.PROFESOR, UserRole.ADMIN),
  validateRequest(createModuleValidation),
  createModule
);

router.put(
  '/modules/:id',
  authenticate,
  authorize(UserRole.PROFESOR, UserRole.ADMIN),
  updateModule
);

router.delete(
  '/modules/:id',
  authenticate,
  authorize(UserRole.PROFESOR, UserRole.ADMIN),
  deleteModule
);

router.post(
  '/courses/:courseId/modules/reorder',
  authenticate,
  authorize(UserRole.PROFESOR, UserRole.ADMIN),
  reorderModules
);

// Rutas de lecciones
router.get(
  '/lessons/:id',
  authenticate,
  getLessonById
);

router.post(
  '/modules/:moduleId/lessons',
  authenticate,
  authorize(UserRole.PROFESOR, UserRole.ADMIN),
  validateRequest(createLessonValidation),
  createLesson
);

router.put(
  '/lessons/:id',
  authenticate,
  authorize(UserRole.PROFESOR, UserRole.ADMIN),
  updateLesson
);

router.delete(
  '/lessons/:id',
  authenticate,
  authorize(UserRole.PROFESOR, UserRole.ADMIN),
  deleteLesson
);

// Ruta para actualizar progreso de lección (estudiantes)
router.put(
  '/lessons/:id/progress',
  authenticate,
  updateLessonProgress
);

// Ruta para obtener progreso del curso
router.get(
  '/courses/:courseId/progress',
  authenticate,
  getCourseProgress
);

export default router;

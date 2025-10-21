// Rutas de cursos
import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getMyCourses,
} from '../controllers/courses.controller';
import { authenticate, authorize, optionalAuthenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { UserRole } from '@prisma/client';

const router = Router();

// Validaciones
const createCourseValidation = [
  body('title').notEmpty().withMessage('El título es requerido'),
  body('description').notEmpty().withMessage('La descripción es requerida'),
  body('level').isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).withMessage('Nivel inválido'),
];

const updateCourseValidation = [
  body('title').optional().notEmpty().withMessage('El título no puede estar vacío'),
  body('description').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
  body('level').optional().isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).withMessage('Nivel inválido'),
];

// Rutas públicas (con autenticación opcional para saber si el usuario está inscrito)
router.get('/', optionalAuthenticate, getAllCourses);
router.get('/:slug', optionalAuthenticate, getCourseBySlug);

// Rutas protegidas - estudiantes
router.get('/my/enrollments', authenticate, getMyCourses);
router.post('/:id/enroll', authenticate, enrollInCourse);

// Rutas protegidas - instructores y admin
router.post(
  '/',
  authenticate,
  authorize(UserRole.INSTRUCTOR, UserRole.ADMIN),
  validateRequest(createCourseValidation),
  createCourse
);

router.put(
  '/:id',
  authenticate,
  authorize(UserRole.INSTRUCTOR, UserRole.ADMIN),
  validateRequest(updateCourseValidation),
  updateCourse
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.INSTRUCTOR, UserRole.ADMIN),
  deleteCourse
);

export default router;

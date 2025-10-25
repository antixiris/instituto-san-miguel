import { Router } from 'express';
import {
  getStudentGrades,
  getCourseGrades,
  getStudentProgress,
  getModuleGrades,
} from '../controllers/grades.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// Obtener mis calificaciones en un curso
router.get('/courses/:courseId/my-grades', getStudentGrades);

// Obtener mi progreso en un curso
router.get('/courses/:courseId/my-progress', getStudentProgress);

// Obtener mis calificaciones en un módulo específico
router.get('/modules/:moduleId/my-grades', getModuleGrades);

// Obtener calificaciones de todos los estudiantes de un curso (ADMIN/PROFESOR)
router.get('/courses/:courseId/grades', getCourseGrades);

export default router;

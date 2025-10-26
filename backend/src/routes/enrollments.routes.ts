import { Router } from 'express';
import {
  getMyCourses,
  enrollInCourse,
  unenrollFromCourse,
  checkEnrollment,
} from '../controllers/enrollments.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Rutas públicas (requieren autenticación)
router.get('/my-courses', authenticate, getMyCourses);
router.post('/courses/:courseId/enroll', authenticate, enrollInCourse);
router.delete('/courses/:courseId/unenroll', authenticate, unenrollFromCourse);
router.get('/courses/:courseId/check', authenticate, checkEnrollment);

export default router;

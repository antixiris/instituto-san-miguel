// Rutas de artículos de investigación (Notebook)
import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleCategories,
  getArticleTags,
  getMyArticles,
} from '../controllers/articles.controller';
import { authenticate, authorize, optionalAuthenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { UserRole } from '@prisma/client';

const router = Router();

// Validaciones
const createArticleValidation = [
  body('title').notEmpty().withMessage('El título es requerido'),
  body('excerpt').notEmpty().withMessage('El resumen es requerido'),
  body('content').notEmpty().withMessage('El contenido es requerido'),
];

const updateArticleValidation = [
  body('title').optional().notEmpty().withMessage('El título no puede estar vacío'),
  body('excerpt').optional().notEmpty().withMessage('El resumen no puede estar vacío'),
  body('content').optional().notEmpty().withMessage('El contenido no puede estar vacío'),
];

// Rutas públicas (con autenticación opcional)
router.get('/', optionalAuthenticate, getAllArticles);
router.get('/categories', getArticleCategories);
router.get('/tags', getArticleTags);
router.get('/:slug', optionalAuthenticate, getArticleBySlug);

// Rutas protegidas - obtener mis artículos
router.get('/my/articles', authenticate, getMyArticles);

// Rutas protegidas - creación, edición y eliminación (profesores y admins)
router.post(
  '/',
  authenticate,
  authorize(UserRole.PROFESOR, UserRole.ADMIN),
  validateRequest(createArticleValidation),
  createArticle
);

router.put(
  '/:id',
  authenticate,
  authorize(UserRole.PROFESOR, UserRole.ADMIN),
  validateRequest(updateArticleValidation),
  updateArticle
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.PROFESOR, UserRole.ADMIN),
  deleteArticle
);

export default router;

// Rutas de gestión de usuarios (Admin)
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getUserStats,
  getUsersByRole,
  searchUsers,
} from '../controllers/users.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { UserRole } from '@prisma/client';

const router = Router();

// Validaciones
const createUserValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('firstName').notEmpty().withMessage('El nombre es requerido'),
  body('lastName').notEmpty().withMessage('El apellido es requerido'),
  body('role').optional().isIn(['STUDENT', 'PROFESOR', 'ADMIN']).withMessage('Rol inválido'),
];

const updateUserValidation = [
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('password').optional().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('firstName').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('lastName').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
  body('role').optional().isIn(['STUDENT', 'PROFESOR', 'ADMIN']).withMessage('Rol inválido'),
];

const toggleStatusValidation = [
  body('isActive').isBoolean().withMessage('El campo isActive debe ser booleano'),
];

// Todas las rutas requieren autenticación
router.use(authenticate);

// Rutas de estadísticas (solo ADMIN)
router.get(
  '/stats',
  authorize(UserRole.ADMIN),
  getUserStats
);

// Búsqueda rápida (solo ADMIN)
router.get(
  '/search',
  authorize(UserRole.ADMIN),
  searchUsers
);

// Obtener usuarios por rol (ADMIN y PROFESOR)
router.get(
  '/role/:role',
  authorize(UserRole.ADMIN, UserRole.PROFESOR),
  getUsersByRole
);

// CRUD de usuarios (solo ADMIN)
router.get(
  '/',
  authorize(UserRole.ADMIN),
  getAllUsers
);

router.get(
  '/:id',
  authorize(UserRole.ADMIN),
  getUserById
);

router.post(
  '/',
  authorize(UserRole.ADMIN),
  validateRequest(createUserValidation),
  createUser
);

router.put(
  '/:id',
  authorize(UserRole.ADMIN),
  validateRequest(updateUserValidation),
  updateUser
);

router.delete(
  '/:id',
  authorize(UserRole.ADMIN),
  deleteUser
);

router.patch(
  '/:id/status',
  authorize(UserRole.ADMIN),
  validateRequest(toggleStatusValidation),
  toggleUserStatus
);

export default router;

// Rutas de autenticación
import { Router } from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} from '../controllers/auth.controller';
import { authenticate, optionalAuthenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';

const router = Router();

// Validaciones
const registerValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('firstName').notEmpty().withMessage('El nombre es requerido'),
  body('lastName').notEmpty().withMessage('El apellido es requerido'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
];

const updateProfileValidation = [
  body('firstName').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('lastName').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('phone').optional().isMobilePhone('any').withMessage('Teléfono inválido'),
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('La contraseña actual es requerida'),
  body('newPassword').isLength({ min: 8 }).withMessage('La nueva contraseña debe tener al menos 8 caracteres'),
];

// Rutas públicas
router.post('/register', optionalAuthenticate, validateRequest(registerValidation), register);
router.post('/login', validateRequest(loginValidation), login);

// Rutas protegidas
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validateRequest(updateProfileValidation), updateProfile);
router.post('/change-password', authenticate, validateRequest(changePasswordValidation), changePassword);

export default router;

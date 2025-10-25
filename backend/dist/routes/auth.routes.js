"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Rutas de autenticación
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Validaciones
const registerValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email inválido'),
    (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('El nombre es requerido'),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('El apellido es requerido'),
];
const loginValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email inválido'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('La contraseña es requerida'),
];
const updateProfileValidation = [
    (0, express_validator_1.body)('firstName').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    (0, express_validator_1.body)('lastName').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Email inválido'),
    (0, express_validator_1.body)('phone').optional().isMobilePhone('any').withMessage('Teléfono inválido'),
];
const changePasswordValidation = [
    (0, express_validator_1.body)('currentPassword').notEmpty().withMessage('La contraseña actual es requerida'),
    (0, express_validator_1.body)('newPassword').isLength({ min: 8 }).withMessage('La nueva contraseña debe tener al menos 8 caracteres'),
];
// Rutas públicas
router.post('/register', auth_1.optionalAuthenticate, (0, validation_1.validateRequest)(registerValidation), auth_controller_1.register);
router.post('/login', (0, validation_1.validateRequest)(loginValidation), auth_controller_1.login);
// Rutas protegidas
router.get('/profile', auth_1.authenticate, auth_controller_1.getProfile);
router.put('/profile', auth_1.authenticate, (0, validation_1.validateRequest)(updateProfileValidation), auth_controller_1.updateProfile);
router.post('/change-password', auth_1.authenticate, (0, validation_1.validateRequest)(changePasswordValidation), auth_controller_1.changePassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
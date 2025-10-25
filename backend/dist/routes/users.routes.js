"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Rutas de gestión de usuarios (Admin)
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_controller_1 = require("../controllers/users.controller");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Validaciones
const createUserValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email inválido'),
    (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('El nombre es requerido'),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('El apellido es requerido'),
    (0, express_validator_1.body)('role').optional().isIn(['STUDENT', 'PROFESOR', 'ADMIN']).withMessage('Rol inválido'),
];
const updateUserValidation = [
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Email inválido'),
    (0, express_validator_1.body)('password').optional().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    (0, express_validator_1.body)('firstName').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    (0, express_validator_1.body)('lastName').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
    (0, express_validator_1.body)('role').optional().isIn(['STUDENT', 'PROFESOR', 'ADMIN']).withMessage('Rol inválido'),
];
const toggleStatusValidation = [
    (0, express_validator_1.body)('isActive').isBoolean().withMessage('El campo isActive debe ser booleano'),
];
// Todas las rutas requieren autenticación
router.use(auth_1.authenticate);
// Rutas de estadísticas (solo ADMIN)
router.get('/stats', (0, auth_1.authorize)(client_1.UserRole.ADMIN), users_controller_1.getUserStats);
// Búsqueda rápida (solo ADMIN)
router.get('/search', (0, auth_1.authorize)(client_1.UserRole.ADMIN), users_controller_1.searchUsers);
// Obtener usuarios por rol (ADMIN y PROFESOR)
router.get('/role/:role', (0, auth_1.authorize)(client_1.UserRole.ADMIN, client_1.UserRole.PROFESOR), users_controller_1.getUsersByRole);
// CRUD de usuarios (solo ADMIN)
router.get('/', (0, auth_1.authorize)(client_1.UserRole.ADMIN), users_controller_1.getAllUsers);
router.get('/:id', (0, auth_1.authorize)(client_1.UserRole.ADMIN), users_controller_1.getUserById);
router.post('/', (0, auth_1.authorize)(client_1.UserRole.ADMIN), (0, validation_1.validateRequest)(createUserValidation), users_controller_1.createUser);
router.put('/:id', (0, auth_1.authorize)(client_1.UserRole.ADMIN), (0, validation_1.validateRequest)(updateUserValidation), users_controller_1.updateUser);
router.delete('/:id', (0, auth_1.authorize)(client_1.UserRole.ADMIN), users_controller_1.deleteUser);
router.patch('/:id/status', (0, auth_1.authorize)(client_1.UserRole.ADMIN), (0, validation_1.validateRequest)(toggleStatusValidation), users_controller_1.toggleUserStatus);
exports.default = router;
//# sourceMappingURL=users.routes.js.map
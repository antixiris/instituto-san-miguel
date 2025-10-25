"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Rutas de cursos
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const courses_controller_1 = require("../controllers/courses.controller");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Validaciones
const createCourseValidation = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('El título es requerido'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('La descripción es requerida'),
    (0, express_validator_1.body)('level').isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).withMessage('Nivel inválido'),
];
const updateCourseValidation = [
    (0, express_validator_1.body)('title').optional().notEmpty().withMessage('El título no puede estar vacío'),
    (0, express_validator_1.body)('description').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
    (0, express_validator_1.body)('level').optional().isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).withMessage('Nivel inválido'),
];
// Rutas públicas (con autenticación opcional para saber si el usuario está inscrito)
router.get('/', auth_1.optionalAuthenticate, courses_controller_1.getAllCourses);
router.get('/:slug', auth_1.optionalAuthenticate, courses_controller_1.getCourseBySlug);
// Rutas protegidas - estudiantes
router.get('/my/enrollments', auth_1.authenticate, courses_controller_1.getMyCourses);
router.post('/:id/enroll', auth_1.authenticate, courses_controller_1.enrollInCourse);
// Rutas protegidas - profesores y admin
router.post('/', auth_1.authenticate, (0, auth_1.authorize)(client_1.UserRole.PROFESOR, client_1.UserRole.ADMIN), (0, validation_1.validateRequest)(createCourseValidation), courses_controller_1.createCourse);
router.put('/:id', auth_1.authenticate, (0, auth_1.authorize)(client_1.UserRole.PROFESOR, client_1.UserRole.ADMIN), (0, validation_1.validateRequest)(updateCourseValidation), courses_controller_1.updateCourse);
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)(client_1.UserRole.PROFESOR, client_1.UserRole.ADMIN), courses_controller_1.deleteCourse);
exports.default = router;
//# sourceMappingURL=courses.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Rutas de artículos de investigación (Notebook)
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const articles_controller_1 = require("../controllers/articles.controller");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Validaciones
const createArticleValidation = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('El título es requerido'),
    (0, express_validator_1.body)('excerpt').notEmpty().withMessage('El resumen es requerido'),
    (0, express_validator_1.body)('content').notEmpty().withMessage('El contenido es requerido'),
];
const updateArticleValidation = [
    (0, express_validator_1.body)('title').optional().notEmpty().withMessage('El título no puede estar vacío'),
    (0, express_validator_1.body)('excerpt').optional().notEmpty().withMessage('El resumen no puede estar vacío'),
    (0, express_validator_1.body)('content').optional().notEmpty().withMessage('El contenido no puede estar vacío'),
];
// Rutas públicas (con autenticación opcional)
router.get('/', auth_1.optionalAuthenticate, articles_controller_1.getAllArticles);
router.get('/categories', articles_controller_1.getArticleCategories);
router.get('/tags', articles_controller_1.getArticleTags);
router.get('/:slug', auth_1.optionalAuthenticate, articles_controller_1.getArticleBySlug);
// Rutas protegidas - obtener mis artículos
router.get('/my/articles', auth_1.authenticate, articles_controller_1.getMyArticles);
// Rutas protegidas - creación, edición y eliminación (profesores y admins)
router.post('/', auth_1.authenticate, (0, auth_1.authorize)(client_1.UserRole.PROFESOR, client_1.UserRole.ADMIN), (0, validation_1.validateRequest)(createArticleValidation), articles_controller_1.createArticle);
router.put('/:id', auth_1.authenticate, (0, auth_1.authorize)(client_1.UserRole.PROFESOR, client_1.UserRole.ADMIN), (0, validation_1.validateRequest)(updateArticleValidation), articles_controller_1.updateArticle);
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)(client_1.UserRole.PROFESOR, client_1.UserRole.ADMIN), articles_controller_1.deleteArticle);
exports.default = router;
//# sourceMappingURL=articles.routes.js.map
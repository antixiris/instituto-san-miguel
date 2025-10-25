"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Rutas de estadísticas y analytics
const express_1 = require("express");
const analytics_controller_1 = require("../controllers/analytics.controller");
const auth_1 = require("../middleware/auth");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Todas las rutas requieren autenticación
router.use(auth_1.authenticate);
// Rutas de estadísticas globales (solo ADMIN)
router.get('/global', (0, auth_1.authorize)(client_1.UserRole.ADMIN), analytics_controller_1.getGlobalStats);
router.get('/growth', (0, auth_1.authorize)(client_1.UserRole.ADMIN), analytics_controller_1.getGrowthStats);
router.get('/top-courses', (0, auth_1.authorize)(client_1.UserRole.ADMIN), analytics_controller_1.getTopCourses);
router.get('/top-professors', (0, auth_1.authorize)(client_1.UserRole.ADMIN), analytics_controller_1.getTopProfessors);
router.get('/engagement', (0, auth_1.authorize)(client_1.UserRole.ADMIN), analytics_controller_1.getEngagementStats);
// Estadísticas de curso (ADMIN y PROFESOR del curso)
router.get('/courses/:id', (0, auth_1.authorize)(client_1.UserRole.ADMIN, client_1.UserRole.PROFESOR), analytics_controller_1.getCourseStats);
// Estadísticas de profesor (ADMIN y el propio PROFESOR)
router.get('/professors/:id', (0, auth_1.authorize)(client_1.UserRole.ADMIN, client_1.UserRole.PROFESOR), analytics_controller_1.getProfessorStats);
exports.default = router;
//# sourceMappingURL=analytics.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFoundHandler = notFoundHandler;
const errors_1 = require("../utils/errors");
/**
 * Middleware global de manejo de errores
 */
function errorHandler(err, req, res, next) {
    // Log del error en desarrollo
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', err);
    }
    // Si es un error operacional conocido
    if (err instanceof errors_1.AppError) {
        const response = {
            success: false,
            error: err.message,
        };
        return res.status(err.statusCode).json(response);
    }
    // Error de validación de Prisma
    if (err.name === 'PrismaClientValidationError') {
        const response = {
            success: false,
            error: 'Error de validación en los datos',
        };
        return res.status(400).json(response);
    }
    // Error de Prisma - registro no encontrado
    if (err.name === 'NotFoundError') {
        const response = {
            success: false,
            error: 'Recurso no encontrado',
        };
        return res.status(404).json(response);
    }
    // Error genérico del servidor
    const response = {
        success: false,
        error: process.env.NODE_ENV === 'production'
            ? 'Error interno del servidor'
            : err.message,
    };
    res.status(500).json(response);
}
/**
 * Middleware para rutas no encontradas
 */
function notFoundHandler(req, res) {
    const response = {
        success: false,
        error: `Ruta no encontrada: ${req.method} ${req.path}`,
    };
    res.status(404).json(response);
}
//# sourceMappingURL=errorHandler.js.map
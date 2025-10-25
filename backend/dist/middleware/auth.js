"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.authorize = authorize;
exports.optionalAuthenticate = optionalAuthenticate;
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
/**
 * Middleware que verifica que el usuario esté autenticado
 */
function authenticate(req, res, next) {
    try {
        // Obtener token del header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new errors_1.AuthenticationError('Token de autenticación no proporcionado');
        }
        const token = authHeader.substring(7); // Remover 'Bearer '
        // Verificar y decodificar token
        const payload = (0, jwt_1.verifyToken)(token);
        // Agregar información del usuario al request
        req.user = {
            id: payload.id,
            email: payload.email,
            role: payload.role,
        };
        next();
    }
    catch (error) {
        if (error instanceof errors_1.AuthenticationError) {
            next(error);
        }
        else {
            next(new errors_1.AuthenticationError('Token inválido o expirado'));
        }
    }
}
/**
 * Middleware que verifica que el usuario tenga uno de los roles especificados
 */
function authorize(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return next(new errors_1.AuthenticationError('Usuario no autenticado'));
        }
        if (!roles.includes(req.user.role)) {
            return next(new errors_1.AuthorizationError(`Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(', ')}`));
        }
        next();
    };
}
/**
 * Middleware opcional de autenticación - no falla si no hay token
 */
function optionalAuthenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const payload = (0, jwt_1.verifyToken)(token);
            req.user = {
                id: payload.id,
                email: payload.email,
                role: payload.role,
            };
        }
        next();
    }
    catch (error) {
        // Ignorar errores y continuar sin usuario
        next();
    }
}
//# sourceMappingURL=auth.js.map
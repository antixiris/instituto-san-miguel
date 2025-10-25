"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
exports.validateRequest = validateRequest;
const express_validator_1 = require("express-validator");
/**
 * Middleware que verifica los resultados de validación de express-validator
 */
function validate(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const response = {
            success: false,
            error: 'Error de validación',
            errors: errors.array(),
        };
        return res.status(400).json(response);
    }
    next();
}
/**
 * Función helper para ejecutar validaciones y verificar errores
 */
function validateRequest(validations) {
    return async (req, res, next) => {
        // Ejecutar todas las validaciones
        await Promise.all(validations.map(validation => validation.run(req)));
        // Verificar errores
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const response = {
                success: false,
                error: 'Error de validación',
                errors: errors.array(),
            };
            return res.status(400).json(response);
        }
        next();
    };
}
//# sourceMappingURL=validation.js.map
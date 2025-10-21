// Middleware de validación usando express-validator
import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ValidationError } from '../utils/errors';
import { ApiResponse } from '../types';

/**
 * Middleware que verifica los resultados de validación de express-validator
 */
export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const response: ApiResponse = {
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
export function validateRequest(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Ejecutar todas las validaciones
    await Promise.all(validations.map(validation => validation.run(req)));

    // Verificar errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response: ApiResponse = {
        success: false,
        error: 'Error de validación',
        errors: errors.array(),
      };

      return res.status(400).json(response);
    }

    next();
  };
}

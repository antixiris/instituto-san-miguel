// Middleware de manejo de errores
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { ApiResponse } from '../types';

/**
 * Middleware global de manejo de errores
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log del error en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // Si es un error operacional conocido
  if (err instanceof AppError) {
    const response: ApiResponse = {
      success: false,
      error: err.message,
    };

    return res.status(err.statusCode).json(response);
  }

  // Error de validación de Prisma
  if (err.name === 'PrismaClientValidationError') {
    const response: ApiResponse = {
      success: false,
      error: 'Error de validación en los datos',
    };
    return res.status(400).json(response);
  }

  // Error de Prisma - registro no encontrado
  if (err.name === 'NotFoundError') {
    const response: ApiResponse = {
      success: false,
      error: 'Recurso no encontrado',
    };
    return res.status(404).json(response);
  }

  // Error genérico del servidor
  const response: ApiResponse = {
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
export function notFoundHandler(req: Request, res: Response) {
  const response: ApiResponse = {
    success: false,
    error: `Ruta no encontrada: ${req.method} ${req.path}`,
  };

  res.status(404).json(response);
}

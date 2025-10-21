// Middleware de autenticación
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { verifyToken } from '../utils/jwt';
import { AuthenticationError, AuthorizationError } from '../utils/errors';
import { UserRole } from '@prisma/client';

/**
 * Middleware que verifica que el usuario esté autenticado
 */
export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Token de autenticación no proporcionado');
    }

    const token = authHeader.substring(7); // Remover 'Bearer '

    // Verificar y decodificar token
    const payload = verifyToken(token);

    // Agregar información del usuario al request
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      next(error);
    } else {
      next(new AuthenticationError('Token inválido o expirado'));
    }
  }
}

/**
 * Middleware que verifica que el usuario tenga uno de los roles especificados
 */
export function authorize(...roles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AuthenticationError('Usuario no autenticado'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AuthorizationError(
          `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(', ')}`
        )
      );
    }

    next();
  };
}

/**
 * Middleware opcional de autenticación - no falla si no hay token
 */
export function optionalAuthenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const payload = verifyToken(token);

      req.user = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      };
    }

    next();
  } catch (error) {
    // Ignorar errores y continuar sin usuario
    next();
  }
}

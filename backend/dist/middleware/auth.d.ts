import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { UserRole } from '@prisma/client';
/**
 * Middleware que verifica que el usuario esté autenticado
 */
export declare function authenticate(req: AuthRequest, res: Response, next: NextFunction): void;
/**
 * Middleware que verifica que el usuario tenga uno de los roles especificados
 */
export declare function authorize(...roles: UserRole[]): (req: AuthRequest, res: Response, next: NextFunction) => void;
/**
 * Middleware opcional de autenticación - no falla si no hay token
 */
export declare function optionalAuthenticate(req: AuthRequest, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.d.ts.map
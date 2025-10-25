import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
/**
 * Registro de nuevo usuario
 */
export declare function register(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Inicio de sesión
 */
export declare function login(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener perfil del usuario autenticado
 */
export declare function getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Actualizar perfil del usuario autenticado
 */
export declare function updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Cambiar contraseña del usuario autenticado
 */
export declare function changePassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map
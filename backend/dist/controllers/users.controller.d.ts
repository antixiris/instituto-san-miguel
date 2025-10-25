import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
/**
 * Obtener todos los usuarios con filtros (solo ADMIN)
 */
export declare function getAllUsers(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener un usuario por ID con información detallada (solo ADMIN)
 */
export declare function getUserById(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Crear un nuevo usuario (solo ADMIN)
 */
export declare function createUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Actualizar un usuario (solo ADMIN)
 */
export declare function updateUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Eliminar un usuario (solo ADMIN)
 */
export declare function deleteUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Activar/Desactivar un usuario (solo ADMIN)
 */
export declare function toggleUserStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener estadísticas de usuarios (solo ADMIN)
 */
export declare function getUserStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener usuarios por rol (solo ADMIN y PROFESOR)
 * Los profesores pueden ver lista de alumnos
 */
export declare function getUsersByRole(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Búsqueda rápida de usuarios (solo ADMIN)
 */
export declare function searchUsers(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=users.controller.d.ts.map
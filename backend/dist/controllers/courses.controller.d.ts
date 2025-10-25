import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
/**
 * Obtener todos los cursos (público con filtros)
 */
export declare function getAllCourses(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener un curso por slug
 */
export declare function getCourseBySlug(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Crear un nuevo curso (solo instructor y admin)
 */
export declare function createCourse(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Actualizar un curso
 */
export declare function updateCourse(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Eliminar un curso
 */
export declare function deleteCourse(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Inscribirse en un curso
 */
export declare function enrollInCourse(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener cursos del usuario (inscripciones)
 */
export declare function getMyCourses(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=courses.controller.d.ts.map
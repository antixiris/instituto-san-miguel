import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
/**
 * Obtener estadísticas globales de la plataforma (solo ADMIN)
 */
export declare function getGlobalStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener estadísticas de crecimiento por mes (solo ADMIN)
 */
export declare function getGrowthStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener top cursos por matrículas (solo ADMIN)
 */
export declare function getTopCourses(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener top profesores por cursos creados (solo ADMIN)
 */
export declare function getTopProfessors(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener estadísticas de engagement (solo ADMIN)
 */
export declare function getEngagementStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener estadísticas de un curso específico (ADMIN y PROFESOR del curso)
 */
export declare function getCourseStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener estadísticas de un profesor específico (ADMIN y el propio PROFESOR)
 */
export declare function getProfessorStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=analytics.controller.d.ts.map
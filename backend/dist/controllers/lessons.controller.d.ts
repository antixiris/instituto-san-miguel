import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
/**
 * Obtener una lección por ID
 */
export declare function getLessonById(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Actualizar progreso de una lección
 */
export declare function updateLessonProgress(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener progreso del curso
 */
export declare function getCourseProgress(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=lessons.controller.d.ts.map
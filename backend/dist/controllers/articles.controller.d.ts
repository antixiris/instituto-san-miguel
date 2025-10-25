import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
/**
 * Obtener todos los artículos (público con filtros)
 */
export declare function getAllArticles(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener un artículo por slug
 */
export declare function getArticleBySlug(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Crear un nuevo artículo (solo instructor y admin)
 */
export declare function createArticle(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Actualizar un artículo
 */
export declare function updateArticle(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Eliminar un artículo
 */
export declare function deleteArticle(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener categorías de artículos
 */
export declare function getArticleCategories(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener tags de artículos
 */
export declare function getArticleTags(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener artículos del autor actual
 */
export declare function getMyArticles(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=articles.controller.d.ts.map
import { Request, Response, NextFunction } from 'express';
/**
 * Middleware global de manejo de errores
 */
export declare function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
/**
 * Middleware para rutas no encontradas
 */
export declare function notFoundHandler(req: Request, res: Response): void;
//# sourceMappingURL=errorHandler.d.ts.map
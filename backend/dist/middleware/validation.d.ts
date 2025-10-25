import { Request, Response, NextFunction } from 'express';
import { ValidationChain } from 'express-validator';
/**
 * Middleware que verifica los resultados de validación de express-validator
 */
export declare function validate(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
/**
 * Función helper para ejecutar validaciones y verificar errores
 */
export declare function validateRequest(validations: ValidationChain[]): (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=validation.d.ts.map
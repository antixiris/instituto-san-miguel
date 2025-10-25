import { TokenPayload } from '../types';
/**
 * Genera un token JWT de acceso
 */
export declare function generateAccessToken(payload: TokenPayload): string;
/**
 * Genera un token JWT de refresco
 */
export declare function generateRefreshToken(payload: TokenPayload): string;
/**
 * Verifica y decodifica un token JWT
 */
export declare function verifyToken(token: string): TokenPayload;
/**
 * Decodifica un token sin verificar (útil para debugging)
 */
export declare function decodeToken(token: string): TokenPayload | null;
//# sourceMappingURL=jwt.d.ts.map
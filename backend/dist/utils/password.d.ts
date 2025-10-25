/**
 * Encripta una contraseña usando bcrypt
 */
export declare function hashPassword(password: string): Promise<string>;
/**
 * Compara una contraseña en texto plano con un hash
 */
export declare function comparePassword(password: string, hash: string): Promise<boolean>;
/**
 * Valida que una contraseña cumpla con los requisitos mínimos
 */
export declare function validatePasswordStrength(password: string): {
    valid: boolean;
    errors: string[];
};
//# sourceMappingURL=password.d.ts.map
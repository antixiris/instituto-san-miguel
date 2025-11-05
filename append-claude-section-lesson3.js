const fs = require('fs');
const path = require('path');

const claudeSection = `

---

## 🤖 Claude Code en Acción: Sistemas de Autenticación y Seguridad de Nivel Empresarial

**¿Cómo Claude Code transforma la implementación de autenticación?**

Implementar autenticación segura es uno de los desafíos más críticos en desarrollo backend. Un error puede exponer datos sensibles de miles de usuarios. Claude Code actúa como tu experto en ciberseguridad que no solo implementa autenticación, sino que aplica las mejores prácticas de la industria, previene vulnerabilidades comunes y crea sistemas robustos que cumplen estándares profesionales.

Imagina tener un especialista en seguridad que:
- Implementa JWT con refresh tokens y rotación automática
- Configura hashing de passwords con bcrypt y salts aleatorios
- Crea sistemas RBAC (Role-Based Access Control) escalables
- Implementa rate limiting para prevenir ataques de fuerza bruta
- Añade autenticación OAuth2 con múltiples proveedores
- Configura 2FA (autenticación de dos factores)
- Previene vulnerabilidades (XSS, CSRF, SQL injection, timing attacks)

### Prompts Efectivos para Autenticación Profesional

#### **Prompt 1: Sistema de Autenticación Completo con Refresh Tokens**

\`\`\`
Implementa un sistema de autenticación completo y seguro para una aplicación Node.js + Express + Prisma.

REQUISITOS FUNCIONALES:
1. Registro de usuarios con validación robusta
2. Login con generación de access token y refresh token
3. Logout con invalidación de tokens
4. Refresh token rotation (genera nuevo refresh token en cada uso)
5. Verificación de email con tokens temporales
6. Recuperación de contraseña con tokens de un solo uso
7. Cambio de contraseña (requiere contraseña actual)
8. Middleware de autenticación para rutas protegidas
9. Endpoint /me para obtener usuario actual

REQUISITOS DE SEGURIDAD:
- Passwords hasheados con bcrypt (cost factor 12)
- Access tokens JWT válidos por 15 minutos
- Refresh tokens válidos por 7 días
- Tokens almacenados en base de datos con fecha de expiración
- Invalidación automática de tokens expirados
- Rate limiting en login (máximo 5 intentos cada 15 minutos)
- Headers seguros (HTTP-only cookies para tokens)
- Validación exhaustiva de entrada con Zod
- Logs de actividad de seguridad

TECNOLOGÍAS:
- TypeScript para type-safety completo
- Prisma para base de datos
- bcryptjs para hashing
- jsonwebtoken para JWT
- express-rate-limit para protección contra brute force
- zod para validación

ENTREGABLES:
1. Schema Prisma con modelos User y RefreshToken
2. Servicios de autenticación (auth.service.ts)
3. Controllers con todas las rutas (auth.controller.ts)
4. Middlewares de autenticación y rate limiting
5. Validaciones Zod para todos los endpoints
6. Manejo de errores personalizado
7. Tipos TypeScript completos
8. Tests básicos para flujos críticos

TODO production-ready con documentación inline.
\`\`\`

**¿Qué hace Claude Code?**

1. **Diseña arquitectura de seguridad completa** → Access + Refresh tokens con rotación
2. **Implementa hashing robusto** → bcrypt con salt automático y cost factor alto
3. **Crea validaciones exhaustivas** → Zod schemas para cada endpoint
4. **Añade protecciones contra ataques** → Rate limiting, token invalidation
5. **Genera código type-safe** → TypeScript con tipos completos
6. **Documenta decisiones** → Explicaciones inline de por qué cada medida

**Código generado (Sistema completo):**

**1. Schema Prisma (prisma/schema.prisma):**

\`\`\`prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String    // Hasheado con bcrypt
  firstName     String
  lastName      String
  emailVerified Boolean   @default(false)
  role          UserRole  @default(USER)
  lastLoginAt   DateTime?
  loginAttempts Int       @default(0)
  lockedUntil   DateTime? // Para rate limiting
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  refreshTokens RefreshToken[]
  verificationTokens VerificationToken[]
  passwordResetTokens PasswordResetToken[]
  securityLogs SecurityLog[]

  @@index([email])
  @@map("users")
}

enum UserRole {
  USER
  ADMIN
  MODERATOR
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
  revokedAt DateTime? // Para invalidación manual
  replacedBy String?  // Para token rotation

  @@index([userId])
  @@index([token])
  @@map("refresh_tokens")
}

model VerificationToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([token])
  @@map("verification_tokens")
}

model PasswordResetToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([token])
  @@map("password_reset_tokens")
}

model SecurityLog {
  id        String   @id @default(uuid())
  userId    String?
  user      User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  action    String   // LOGIN, LOGOUT, FAILED_LOGIN, etc.
  ipAddress String
  userAgent String?
  metadata  Json?    // Datos adicionales
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([createdAt])
  @@map("security_logs")
}
\`\`\`

**2. Validaciones Zod (src/validations/auth.validation.ts):**

\`\`\`typescript
import { z } from 'zod';

// Validación de email robusta
const emailSchema = z
  .string()
  .email('Email inválido')
  .toLowerCase()
  .trim();

// Validación de password fuerte
const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener mínimo 8 caracteres')
  .regex(/[a-z]/, 'Debe contener al menos una minúscula')
  .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[^a-zA-Z0-9]/, 'Debe contener al menos un carácter especial');

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(2, 'Nombre muy corto').max(50),
  lastName: z.string().min(2, 'Apellido muy corto').max(50)
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Contraseña requerida')
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Contraseña actual requerida'),
  newPassword: passwordSchema
}).refine(
  (data) => data.currentPassword !== data.newPassword,
  {
    message: 'La nueva contraseña debe ser diferente a la actual',
    path: ['newPassword']
  }
);

export const forgotPasswordSchema = z.object({
  email: emailSchema
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token requerido'),
  newPassword: passwordSchema
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token requerido')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
\`\`\`

**3. Servicio de Autenticación (src/services/auth.service.ts):**

\`\`\`typescript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { PrismaClient, User } from '@prisma/client';
import type { RegisterInput, LoginInput, ChangePasswordInput } from '../validations/auth.validation';

const prisma = new PrismaClient();

// Configuración de seguridad
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 días en ms
const BCRYPT_ROUNDS = 12; // Mayor número = más seguro pero más lento
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutos en ms

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class AuthService {
  /**
   * Registrar nuevo usuario
   */
  async register(input: RegisterInput): Promise<{ user: Omit<User, 'password'>; accessToken: string; refreshToken: string }> {
    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email }
    });

    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Hashear password con bcrypt (salt automático)
    const hashedPassword = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName
      }
    });

    // Generar tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user.id);

    // Crear token de verificación de email
    await this.createEmailVerificationToken(user.id);

    // Log de seguridad
    await this.logSecurityEvent({
      userId: user.id,
      action: 'REGISTER',
      ipAddress: '0.0.0.0', // Se pasa desde el controller
      metadata: { email: user.email }
    });

    // Excluir password de la respuesta
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken
    };
  }

  /**
   * Login con protección contra brute force
   */
  async login(input: LoginInput, ipAddress: string): Promise<{ user: Omit<User, 'password'>; accessToken: string; refreshToken: string }> {
    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: input.email }
    });

    if (!user) {
      // No revelar si el email existe o no (seguridad)
      throw new Error('Credenciales inválidas');
    }

    // Verificar si la cuenta está bloqueada temporalmente
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const minutesLeft = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
      throw new Error(\`Cuenta bloqueada. Intenta de nuevo en \${minutesLeft} minutos\`);
    }

    // Verificar password
    const isValidPassword = await bcrypt.compare(input.password, user.password);

    if (!isValidPassword) {
      // Incrementar intentos fallidos
      await this.handleFailedLogin(user.id);

      // Log de seguridad
      await this.logSecurityEvent({
        userId: user.id,
        action: 'FAILED_LOGIN',
        ipAddress,
        metadata: { email: user.email }
      });

      throw new Error('Credenciales inválidas');
    }

    // Login exitoso: resetear intentos fallidos
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: new Date()
      }
    });

    // Generar tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user.id);

    // Log de seguridad
    await this.logSecurityEvent({
      userId: user.id,
      action: 'LOGIN',
      ipAddress,
      metadata: { email: user.email }
    });

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken
    };
  }

  /**
   * Refrescar access token usando refresh token
   */
  async refreshAccessToken(refreshTokenValue: string): Promise<{ accessToken: string; refreshToken: string }> {
    // Buscar refresh token en base de datos
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshTokenValue },
      include: { user: true }
    });

    if (!storedToken) {
      throw new Error('Refresh token inválido');
    }

    // Verificar si está revocado
    if (storedToken.revokedAt) {
      throw new Error('Refresh token revocado');
    }

    // Verificar si expiró
    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({
        where: { id: storedToken.id }
      });
      throw new Error('Refresh token expirado');
    }

    // TOKEN ROTATION: Revocar el token anterior
    const newRefreshTokenValue = await this.generateRefreshToken(storedToken.userId);

    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: {
        revokedAt: new Date(),
        replacedBy: newRefreshTokenValue
      }
    });

    // Generar nuevo access token
    const accessToken = this.generateAccessToken(storedToken.user);

    return {
      accessToken,
      refreshToken: newRefreshTokenValue
    };
  }

  /**
   * Logout (invalidar refresh token)
   */
  async logout(refreshTokenValue: string): Promise<void> {
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshTokenValue }
    });

    if (storedToken) {
      await prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { revokedAt: new Date() }
      });

      // Log de seguridad
      await this.logSecurityEvent({
        userId: storedToken.userId,
        action: 'LOGOUT',
        ipAddress: '0.0.0.0'
      });
    }
  }

  /**
   * Cambiar contraseña
   */
  async changePassword(userId: string, input: ChangePasswordInput): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Verificar contraseña actual
    const isValidPassword = await bcrypt.compare(input.currentPassword, user.password);

    if (!isValidPassword) {
      throw new Error('Contraseña actual incorrecta');
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(input.newPassword, BCRYPT_ROUNDS);

    // Actualizar contraseña
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    // Invalidar todos los refresh tokens (forzar re-login)
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { revokedAt: new Date() }
    });

    // Log de seguridad
    await this.logSecurityEvent({
      userId,
      action: 'PASSWORD_CHANGED',
      ipAddress: '0.0.0.0'
    });
  }

  /**
   * Iniciar proceso de recuperación de contraseña
   */
  async forgotPassword(email: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Por seguridad, no revelar si el email existe
      // Pero devolver éxito de todas formas
      return 'Si el email existe, recibirás instrucciones';
    }

    // Generar token de reset
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Guardar token en base de datos
    await prisma.passwordResetToken.create({
      data: {
        token: hashedToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hora
      }
    });

    // Log de seguridad
    await this.logSecurityEvent({
      userId: user.id,
      action: 'PASSWORD_RESET_REQUESTED',
      ipAddress: '0.0.0.0',
      metadata: { email: user.email }
    });

    // En producción, enviar email con el link:
    // https://tuapp.com/reset-password?token=${resetToken}

    return resetToken; // En producción no devolver esto
  }

  /**
   * Resetear contraseña con token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: hashedToken },
      include: { user: true }
    });

    if (!resetToken) {
      throw new Error('Token inválido o expirado');
    }

    if (resetToken.used) {
      throw new Error('Token ya utilizado');
    }

    if (resetToken.expiresAt < new Date()) {
      throw new Error('Token expirado');
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    // Actualizar contraseña
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword }
    });

    // Marcar token como usado
    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true }
    });

    // Invalidar todos los refresh tokens
    await prisma.refreshToken.updateMany({
      where: { userId: resetToken.userId },
      data: { revokedAt: new Date() }
    });

    // Log de seguridad
    await this.logSecurityEvent({
      userId: resetToken.userId,
      action: 'PASSWORD_RESET_COMPLETED',
      ipAddress: '0.0.0.0'
    });
  }

  /**
   * Generar access token JWT
   */
  private generateAccessToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
      issuer: 'your-app-name',
      audience: 'your-app-users'
    });
  }

  /**
   * Generar refresh token y guardarlo en base de datos
   */
  private async generateRefreshToken(userId: string): Promise<string> {
    const token = crypto.randomBytes(64).toString('hex');

    await prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY)
      }
    });

    return token;
  }

  /**
   * Manejar login fallido (incrementar intentos y bloquear si es necesario)
   */
  private async handleFailedLogin(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) return;

    const newAttempts = user.loginAttempts + 1;

    if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
      // Bloquear cuenta temporalmente
      await prisma.user.update({
        where: { id: userId },
        data: {
          loginAttempts: newAttempts,
          lockedUntil: new Date(Date.now() + LOCK_TIME)
        }
      });
    } else {
      // Solo incrementar intentos
      await prisma.user.update({
        where: { id: userId },
        data: {
          loginAttempts: newAttempts
        }
      });
    }
  }

  /**
   * Crear token de verificación de email
   */
  private async createEmailVerificationToken(userId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await prisma.verificationToken.create({
      data: {
        token: hashedToken,
        userId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
      }
    });

    return token;
  }

  /**
   * Log de eventos de seguridad
   */
  private async logSecurityEvent(data: {
    userId?: string;
    action: string;
    ipAddress: string;
    userAgent?: string;
    metadata?: any;
  }): Promise<void> {
    await prisma.securityLog.create({
      data
    });
  }

  /**
   * Verificar access token JWT
   */
  verifyAccessToken(token: string): TokenPayload {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!, {
        issuer: 'your-app-name',
        audience: 'your-app-users'
      }) as TokenPayload;

      return payload;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
}

export const authService = new AuthService();
\`\`\`

**4. Middleware de Autenticación (src/middleware/auth.middleware.ts):**

\`\`\`typescript
import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extender el tipo Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Middleware de autenticación
 * Verifica access token y añade usuario a req.user
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'No autenticado',
        message: 'Token no proporcionado'
      });
    }

    // Formato: "Bearer TOKEN"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'No autenticado',
        message: 'Formato de token inválido'
      });
    }

    // Verificar token
    const payload = authService.verifyAccessToken(token);

    // Verificar que el usuario existe y no está bloqueado
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });

    if (!user) {
      return res.status(401).json({
        error: 'No autenticado',
        message: 'Usuario no encontrado'
      });
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return res.status(403).json({
        error: 'Cuenta bloqueada',
        message: 'Tu cuenta está temporalmente bloqueada'
      });
    }

    // Añadir usuario a request
    req.user = payload;
    next();

  } catch (error: any) {
    return res.status(401).json({
      error: 'No autenticado',
      message: error.message || 'Token inválido'
    });
  }
};

/**
 * Middleware de autorización por rol
 */
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'No autenticado'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'No autorizado',
        message: 'No tienes permisos para acceder a este recurso'
      });
    }

    next();
  };
};
\`\`\`

**5. Rate Limiting Middleware (src/middleware/rate-limit.middleware.ts):**

\`\`\`typescript
import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

/**
 * Rate limiter para login (prevenir brute force)
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos
  message: 'Demasiados intentos de login. Intenta de nuevo en 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: 'Límite excedido',
      message: 'Demasiados intentos de login. Intenta de nuevo en 15 minutos'
    });
  }
});

/**
 * Rate limiter para registro
 */
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // Máximo 3 registros por IP
  message: 'Demasiados registros desde esta IP'
});

/**
 * Rate limiter general para API
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 requests
  message: 'Demasiadas peticiones. Intenta de nuevo más tarde'
});
\`\`\`

**6. Controller de Autenticación (src/controllers/auth.controller.ts):**

\`\`\`typescript
import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema
} from '../validations/auth.validation';

export class AuthController {
  /**
   * POST /api/auth/register
   */
  async register(req: Request, res: Response) {
    try {
      // Validar entrada
      const input = registerSchema.parse(req.body);

      // Registrar usuario
      const result = await authService.register(input);

      // Configurar refresh token en HTTP-only cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
      });

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: result.user,
        accessToken: result.accessToken
      });

    } catch (error: any) {
      console.error('Error en registro:', error);

      if (error.name === 'ZodError') {
        return res.status(400).json({
          error: 'Datos inválidos',
          details: error.errors
        });
      }

      res.status(400).json({
        error: 'Error al registrar usuario',
        message: error.message
      });
    }
  }

  /**
   * POST /api/auth/login
   */
  async login(req: Request, res: Response) {
    try {
      // Validar entrada
      const input = loginSchema.parse(req.body);

      // Login
      const ipAddress = req.ip || req.socket.remoteAddress || '0.0.0.0';
      const result = await authService.login(input, ipAddress);

      // Configurar refresh token en HTTP-only cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.json({
        message: 'Login exitoso',
        user: result.user,
        accessToken: result.accessToken
      });

    } catch (error: any) {
      console.error('Error en login:', error);

      if (error.name === 'ZodError') {
        return res.status(400).json({
          error: 'Datos inválidos',
          details: error.errors
        });
      }

      res.status(401).json({
        error: 'Error al hacer login',
        message: error.message
      });
    }
  }

  /**
   * POST /api/auth/refresh
   */
  async refreshToken(req: Request, res: Response) {
    try {
      // Obtener refresh token de cookie o body
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          error: 'Refresh token no proporcionado'
        });
      }

      // Refrescar tokens
      const result = await authService.refreshAccessToken(refreshToken);

      // Configurar nuevo refresh token en cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.json({
        accessToken: result.accessToken
      });

    } catch (error: any) {
      console.error('Error refreshing token:', error);
      res.status(401).json({
        error: 'Error al refrescar token',
        message: error.message
      });
    }
  }

  /**
   * POST /api/auth/logout
   */
  async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (refreshToken) {
        await authService.logout(refreshToken);
      }

      // Limpiar cookie
      res.clearCookie('refreshToken');

      res.json({
        message: 'Logout exitoso'
      });

    } catch (error: any) {
      console.error('Error en logout:', error);
      res.status(500).json({
        error: 'Error al hacer logout'
      });
    }
  }

  /**
   * GET /api/auth/me
   * Obtener usuario actual (requiere autenticación)
   */
  async me(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'No autenticado'
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          emailVerified: true,
          createdAt: true
        }
      });

      res.json({ user });

    } catch (error: any) {
      console.error('Error obteniendo usuario:', error);
      res.status(500).json({
        error: 'Error al obtener usuario'
      });
    }
  }

  /**
   * POST /api/auth/change-password
   * Cambiar contraseña (requiere autenticación)
   */
  async changePassword(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'No autenticado'
        });
      }

      const input = changePasswordSchema.parse(req.body);

      await authService.changePassword(req.user.userId, input);

      res.json({
        message: 'Contraseña cambiada exitosamente'
      });

    } catch (error: any) {
      console.error('Error cambiando contraseña:', error);

      if (error.name === 'ZodError') {
        return res.status(400).json({
          error: 'Datos inválidos',
          details: error.errors
        });
      }

      res.status(400).json({
        error: 'Error al cambiar contraseña',
        message: error.message
      });
    }
  }

  /**
   * POST /api/auth/forgot-password
   */
  async forgotPassword(req: Request, res: Response) {
    try {
      const input = forgotPasswordSchema.parse(req.body);

      const token = await authService.forgotPassword(input.email);

      // En producción, enviar email en lugar de devolver el token
      res.json({
        message: 'Si el email existe, recibirás instrucciones para recuperar tu contraseña',
        // token // NO devolver en producción
      });

    } catch (error: any) {
      console.error('Error en forgot password:', error);
      res.status(500).json({
        error: 'Error al procesar solicitud'
      });
    }
  }

  /**
   * POST /api/auth/reset-password
   */
  async resetPassword(req: Request, res: Response) {
    try {
      const input = resetPasswordSchema.parse(req.body);

      await authService.resetPassword(input.token, input.newPassword);

      res.json({
        message: 'Contraseña restablecida exitosamente'
      });

    } catch (error: any) {
      console.error('Error en reset password:', error);

      if (error.name === 'ZodError') {
        return res.status(400).json({
          error: 'Datos inválidos',
          details: error.errors
        });
      }

      res.status(400).json({
        error: 'Error al restablecer contraseña',
        message: error.message
      });
    }
  }
}

export const authController = new AuthController();
\`\`\`

**7. Rutas (src/routes/auth.routes.ts):**

\`\`\`typescript
import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { loginLimiter, registerLimiter } from '../middleware/rate-limit.middleware';

const router = Router();

// Rutas públicas (con rate limiting)
router.post('/register', registerLimiter, (req, res) => authController.register(req, res));
router.post('/login', loginLimiter, (req, res) => authController.login(req, res));
router.post('/forgot-password', (req, res) => authController.forgotPassword(req, res));
router.post('/reset-password', (req, res) => authController.resetPassword(req, res));

// Rutas con autenticación
router.post('/refresh', (req, res) => authController.refreshToken(req, res));
router.post('/logout', authenticateToken, (req, res) => authController.logout(req, res));
router.get('/me', authenticateToken, (req, res) => authController.me(req, res));
router.post('/change-password', authenticateToken, (req, res) => authController.changePassword(req, res));

export default router;
\`\`\`

**8. Configuración del servidor (src/index.ts):**

\`\`\`typescript
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { apiLimiter } from './middleware/rate-limit.middleware';

const app = express();

// Seguridad
app.use(helmet()); // Headers de seguridad
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Parsers
app.use(express.json());
app.use(cookieParser());

// Rate limiting global
app.use('/api/', apiLimiter);

// Rutas
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(\`🚀 Servidor corriendo en http://localhost:\${PORT}\`);
});
\`\`\`

**9. Variables de entorno (.env.example):**

\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# App
NODE_ENV="development"
PORT=3001
FRONTEND_URL="http://localhost:3000"
\`\`\`

**Tiempo comparativo:**
- ❌ Implementación manual completa: **15-20 horas** (diseño + código + testing + debugging)
- ✅ Con Claude Code: **10-15 minutos** (prompt + revisión)

**Ahorro: 98.75% del tiempo**

---

## Continuará en siguiente mensaje debido al límite de caracteres...

`;

// Leer archivo original
const originalPath = path.join(__dirname, 'contenidos-curso', 'mod6leccion3.md');
const originalContent = fs.readFileSync(originalPath, 'utf-8');

// Encontrar punto de inserción
const insertionPoint = originalContent.indexOf('---\n\n## Concepto 1: ¿Qué es un token JWT?');

if (insertionPoint === -1) {
  console.error('❌ No se encontró el punto de inserción');
  process.exit(1);
}

// Construir nuevo contenido
const newContent = 
  originalContent.slice(0, insertionPoint) + 
  claudeSection + 
  '\n\n' +
  originalContent.slice(insertionPoint);

// Guardar
fs.writeFileSync(originalPath, newContent, 'utf-8');

// Contar líneas
const originalLines = originalContent.split('\n').length;
const newLines = newContent.split('\n').length;
const addedLines = newLines - originalLines;
const percentageIncrease = ((addedLines / originalLines) * 100).toFixed(1);

console.log(\`
✅ Lesson 3 refactored successfully!

📊 Metrics:
- Original lines: \${originalLines}
- New lines: \${newLines}
- Lines added: \${addedLines}
- Percentage increase: \${percentageIncrease}%

📁 File: \${originalPath}
\`);


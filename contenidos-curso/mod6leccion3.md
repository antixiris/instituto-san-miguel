# Lección 3: Autenticación y Autorización con JWT

Dominar la seguridad de APIs mediante tokens JWT, middleware de autorización y protección de rutas con roles.

---

## 🤖 Claude Code en Acción: Construyendo Sistemas de Autenticación Empresariales

La autenticación es el guardián de cualquier aplicación moderna. Sin ella, tus datos están expuestos al mundo. Con JWT (JSON Web Tokens), implementarás sistemas de seguridad de nivel empresarial que protegen recursos sensibles mientras mantienen la experiencia de usuario fluida.

En esta lección, aprenderás a construir sistemas completos de autenticación que incluyen registro, login, refresh tokens, verificación por email, recuperación de contraseñas y control de acceso basado en roles. Claude Code transformará estas tareas complejas en flujos de trabajo estructurados y seguros.

### Por Qué JWT es el Estándar de la Industria

JWT ha reemplazado las sesiones tradicionales en aplicaciones modernas por razones técnicas sólidas:

- **Stateless**: El servidor no necesita almacenar sesiones en memoria
- **Escalable**: Funciona perfectamente con arquitecturas distribuidas y microservicios
- **Cross-domain**: Puedes usar el mismo token en múltiples subdominios
- **Mobile-friendly**: Ideal para aplicaciones móviles que necesitan autenticación persistente
- **Descentralizado**: Cualquier servicio puede verificar el token sin consultar una base de datos central

**Comparación técnica**: En sistemas con sesiones tradicionales, cada petición requiere una consulta a Redis o la base de datos para validar la sesión. Con JWT, la validación es computacional (verificar firma criptográfica), lo que reduce latencia y carga en infraestructura.

---

## Prompts Efectivos para Autenticación JWT

### Prompt 1: Sistema Completo de Autenticación con Refresh Tokens

```
Necesito un sistema de autenticación completo en TypeScript con Express que incluya:

1. Registro de usuarios con:
   - Hash de contraseñas usando bcrypt (10 rounds)
   - Validación de email único
   - Generación de token de verificación

2. Login que devuelva:
   - Access token (15 minutos de expiración)
   - Refresh token (7 días de expiración)
   - Información del usuario (sin password)

3. Endpoint de refresh para renovar access tokens

4. Logout que invalide el refresh token

Usa Prisma con PostgreSQL. Incluye tipos TypeScript completos y manejo de errores robusto.
```

**Resultado**: Claude Code genera un sistema de autenticación completo y listo para producción:

```typescript
// src/auth/auth.types.ts
export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface TokenPayload {
  userId: number;
  email: string;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR'
}
```

```typescript
// src/auth/auth.service.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { RegisterDTO, LoginDTO, TokenPayload, AuthTokens } from './auth.types';

const prisma = new PrismaClient();

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET!;
  private readonly JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
  private readonly ACCESS_TOKEN_EXPIRY = '15m';
  private readonly REFRESH_TOKEN_EXPIRY = '7d';
  private readonly SALT_ROUNDS = 10;

  async register(data: RegisterDTO): Promise<{ user: any; tokens: AuthTokens }> {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Validar fortaleza de la contraseña
    if (data.password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    if (!/[A-Z]/.test(data.password)) {
      throw new Error('La contraseña debe contener al menos una mayúscula');
    }

    if (!/[0-9]/.test(data.password)) {
      throw new Error('La contraseña debe contener al menos un número');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: 'USER'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    // Generar tokens
    const tokens = await this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole
    });

    // Guardar refresh token en la base de datos
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  async login(data: LoginDTO): Promise<{ user: any; tokens: AuthTokens }> {
    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(data.password, user.password);

    if (!validPassword) {
      throw new Error('Credenciales inválidas');
    }

    // Actualizar último login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Generar tokens
    const tokens = await this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole
    });

    // Guardar refresh token
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
      },
      tokens
    };
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      // Verificar refresh token
      const payload = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET) as TokenPayload;

      // Verificar que el token existe en la base de datos
      const storedToken = await prisma.refreshToken.findFirst({
        where: {
          token: refreshToken,
          userId: payload.userId,
          isRevoked: false
        }
      });

      if (!storedToken) {
        throw new Error('Refresh token inválido');
      }

      // Verificar que no ha expirado
      if (storedToken.expiresAt < new Date()) {
        throw new Error('Refresh token expirado');
      }

      // Revocar el token actual (rotación de tokens)
      await prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { isRevoked: true }
      });

      // Generar nuevos tokens
      const newTokens = await this.generateTokens(payload);

      // Guardar nuevo refresh token
      await this.saveRefreshToken(payload.userId, newTokens.refreshToken);

      return newTokens;
    } catch (error) {
      throw new Error('Refresh token inválido o expirado');
    }
  }

  async logout(userId: number): Promise<void> {
    // Revocar todos los refresh tokens del usuario
    await prisma.refreshToken.updateMany({
      where: {
        userId,
        isRevoked: false
      },
      data: {
        isRevoked: true
      }
    });
  }

  async logoutAll(userId: number): Promise<void> {
    // Revocar TODOS los refresh tokens del usuario (todas las sesiones)
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true }
    });
  }

  private async generateTokens(payload: TokenPayload): Promise<AuthTokens> {
    const accessToken = jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY
    });

    const refreshToken = jwt.sign(payload, this.JWT_REFRESH_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRY
    });

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: number, token: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 días

    await prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt
      }
    });
  }

  async verifyAccessToken(token: string): Promise<TokenPayload> {
    try {
      return jwt.verify(token, this.JWT_SECRET) as TokenPayload;
    } catch (error) {
      throw new Error('Access token inválido o expirado');
    }
  }
}
```

```typescript
// src/auth/auth.controller.ts
import { Router, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { authMiddleware } from './auth.middleware';

const router = Router();
const authService = new AuthService();

// Registro
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { user, tokens } = await authService.register(req.body);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user,
      tokens
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Error al registrar usuario'
    });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { user, tokens } = await authService.login(req.body);

    res.json({
      message: 'Login exitoso',
      user,
      tokens
    });
  } catch (error: any) {
    res.status(401).json({
      error: error.message || 'Credenciales inválidas'
    });
  }
});

// Refresh tokens
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token requerido' });
    }

    const tokens = await authService.refreshTokens(refreshToken);

    res.json({ tokens });
  } catch (error: any) {
    res.status(401).json({
      error: error.message || 'Refresh token inválido'
    });
  }
});

// Logout
router.post('/logout', authMiddleware, async (req: Request, res: Response) => {
  try {
    await authService.logout(req.user!.userId);

    res.json({ message: 'Logout exitoso' });
  } catch (error: any) {
    res.status(500).json({
      error: 'Error al cerrar sesión'
    });
  }
});

// Logout de todas las sesiones
router.post('/logout-all', authMiddleware, async (req: Request, res: Response) => {
  try {
    await authService.logoutAll(req.user!.userId);

    res.json({ message: 'Todas las sesiones cerradas' });
  } catch (error: any) {
    res.status(500).json({
      error: 'Error al cerrar sesiones'
    });
  }
});

// Obtener perfil actual
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        lastLogin: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user });
  } catch (error: any) {
    res.status(500).json({
      error: 'Error al obtener perfil'
    });
  }
});

export default router;
```

```prisma
// prisma/schema.prisma (fragmento relevante)
model User {
  id            Int            @id @default(autoincrement())
  email         String         @unique
  password      String
  name          String
  role          String         @default("USER")
  isVerified    Boolean        @default(false)
  lastLogin     DateTime?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  refreshTokens RefreshToken[]
}

model RefreshToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  isRevoked Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

**Por qué este código es producción-ready**:

1. **Rotación de tokens**: Al renovar tokens, el viejo se invalida automáticamente
2. **Validación de contraseñas**: Requiere mayúsculas, números y longitud mínima
3. **Tokens en base de datos**: Permite revocar sesiones específicas
4. **Logout selectivo**: Puedes cerrar una sesión o todas
5. **Última conexión**: Rastrea cuándo el usuario hizo login por última vez
6. **Cascada de eliminación**: Al borrar un usuario, sus tokens se eliminan automáticamente

---

### Prompt 2: Middleware de Autorización con Roles (RBAC)

```
Crea un sistema de autorización basado en roles (RBAC) con:

1. Middleware requireAuth que verifica tokens JWT
2. Middleware requireRole que acepta array de roles permitidos
3. Roles: ADMIN, EDITOR, USER
4. Decoradores para proteger rutas específicas
5. Middleware que añade información del usuario a req.user

Debe ser composable para usar así:
- requireAuth() - Solo autenticación
- requireRole(['ADMIN']) - Solo admins
- requireRole(['ADMIN', 'EDITOR']) - Admins o editores

Incluye tipos TypeScript y manejo de errores detallado.
```

**Resultado**:

```typescript
// src/auth/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload, UserRole } from './auth.types';

// Extender la interfaz Request de Express
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        error: 'Token no proporcionado',
        message: 'Debes incluir el header Authorization'
      });
      return;
    }

    // Verificar formato "Bearer TOKEN"
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Formato de token inválido',
        message: 'El header debe tener formato: Bearer <token>'
      });
      return;
    }

    // Extraer token
    const token = authHeader.substring(7); // Remueve "Bearer "

    // Verificar token
    const JWT_SECRET = process.env.JWT_SECRET!;
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;

    // Añadir usuario al request
    req.user = payload;

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        error: 'Token expirado',
        message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
      });
      return;
    }

    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        error: 'Token inválido',
        message: 'El token proporcionado no es válido'
      });
      return;
    }

    res.status(500).json({
      error: 'Error al verificar autenticación',
      message: 'Ocurrió un error al validar tu token'
    });
  }
};

export const requireRole = (allowedRoles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Verificar que el usuario está autenticado
      if (!req.user) {
        res.status(401).json({
          error: 'No autenticado',
          message: 'Debes iniciar sesión para acceder a este recurso'
        });
        return;
      }

      // Verificar rol
      if (!allowedRoles.includes(req.user.role)) {
        res.status(403).json({
          error: 'Acceso denegado',
          message: `Este recurso requiere uno de los siguientes roles: ${allowedRoles.join(', ')}`,
          userRole: req.user.role,
          requiredRoles: allowedRoles
        });
        return;
      }

      next();
    } catch (error: any) {
      res.status(500).json({
        error: 'Error al verificar autorización',
        message: 'Ocurrió un error al validar tus permisos'
      });
    }
  };
};

// Helper para combinar middlewares
export const protect = {
  // Solo autenticación
  auth: authMiddleware,

  // Roles específicos (incluye autenticación)
  admin: [authMiddleware, requireRole([UserRole.ADMIN])],
  editor: [authMiddleware, requireRole([UserRole.EDITOR])],
  adminOrEditor: [authMiddleware, requireRole([UserRole.ADMIN, UserRole.EDITOR])],

  // Custom
  roles: (roles: UserRole[]) => [authMiddleware, requireRole(roles)]
};
```

```typescript
// Ejemplo de uso en rutas
import { Router } from 'express';
import { protect } from '../auth/auth.middleware';
import { UserRole } from '../auth/auth.types';

const router = Router();

// Ruta pública - sin protección
router.get('/public', (req, res) => {
  res.json({ message: 'Esta ruta es pública' });
});

// Ruta protegida - requiere autenticación
router.get('/profile', protect.auth, (req, res) => {
  res.json({
    message: 'Acceso permitido',
    user: req.user
  });
});

// Ruta solo para admins
router.get('/admin/users', ...protect.admin, async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    }
  });

  res.json({ users });
});

// Ruta para admins o editores
router.post('/content', ...protect.adminOrEditor, async (req, res) => {
  // Crear contenido
  res.json({ message: 'Contenido creado' });
});

// Ruta con roles custom
router.delete('/critical-data', ...protect.roles([UserRole.ADMIN]), async (req, res) => {
  // Solo admins pueden eliminar datos críticos
  res.json({ message: 'Datos eliminados' });
});

export default router;
```

**Características avanzadas**:

1. **Mensajes de error detallados**: Distingue entre token expirado, inválido o ausente
2. **Composición de middlewares**: `protect.admin` es un array listo para usar con spread
3. **Tipos TypeScript**: `req.user` tiene tipado completo
4. **Seguridad**: Diferencia entre 401 (no autenticado) y 403 (no autorizado)
5. **Flexibilidad**: Puedes crear combinaciones custom con `protect.roles()`

---

### Prompt 3: Flujo Completo de Verificación de Email y Recuperación de Contraseña

```
Implementa un sistema completo de verificación de email y recuperación de contraseña que incluya:

1. Al registrarse, enviar email con token de verificación
2. Endpoint para verificar email con el token
3. Endpoint para solicitar recuperación de contraseña
4. Email con link de reset temporal (expira en 1 hora)
5. Endpoint para cambiar contraseña con token válido

Usa nodemailer para envío de emails y genera tokens criptográficamente seguros. Incluye templates HTML para los emails.
```

**Resultado**:

```typescript
// src/auth/email.service.ts
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configuración para Gmail (en producción usa servicio profesional)
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { background: #f4f4f4; padding: 30px; }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: #4F46E5;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Verifica tu Email</h1>
          </div>
          <div class="content">
            <h2>¡Bienvenido!</h2>
            <p>Gracias por registrarte. Para completar tu registro, por favor verifica tu dirección de email haciendo clic en el botón de abajo:</p>
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verificar Email</a>
            </div>
            <p>Si no solicitaste esta verificación, puedes ignorar este email.</p>
            <p><strong>Este link expira en 24 horas.</strong></p>
          </div>
          <div class="footer">
            <p>Este es un email automático, por favor no respondas.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verifica tu email',
      html
    });
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #DC2626; color: white; padding: 20px; text-align: center; }
          .content { background: #f4f4f4; padding: 30px; }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: #DC2626;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
          .warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Recuperación de Contraseña</h1>
          </div>
          <div class="content">
            <h2>Solicitud de Restablecimiento</h2>
            <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Restablecer Contraseña</a>
            </div>
            <div class="warning">
              <strong>⚠️ Importante:</strong>
              <ul>
                <li>Este link expira en <strong>1 hora</strong></li>
                <li>Si no solicitaste esto, ignora este email</li>
                <li>Tu contraseña actual sigue siendo válida hasta que la cambies</li>
              </ul>
            </div>
          </div>
          <div class="footer">
            <p>Este es un email automático, por favor no respondas.</p>
            <p>Si tienes problemas con el botón, copia este link: ${resetUrl}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Recuperación de contraseña',
      html
    });
  }
}
```

```typescript
// src/auth/verification.service.ts
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { EmailService } from './email.service';

const prisma = new PrismaClient();
const emailService = new EmailService();

export class VerificationService {
  async sendVerificationEmail(userId: number, email: string): Promise<void> {
    // Generar token criptográficamente seguro
    const token = crypto.randomBytes(32).toString('hex');

    // Guardar token en base de datos
    await prisma.emailVerificationToken.create({
      data: {
        token,
        userId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
      }
    });

    // Enviar email
    await emailService.sendVerificationEmail(email, token);
  }

  async verifyEmail(token: string): Promise<void> {
    // Buscar token
    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!verificationToken) {
      throw new Error('Token de verificación inválido');
    }

    // Verificar expiración
    if (verificationToken.expiresAt < new Date()) {
      throw new Error('Token de verificación expirado');
    }

    // Verificar email del usuario
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true }
    });

    // Eliminar token usado
    await prisma.emailVerificationToken.delete({
      where: { id: verificationToken.id }
    });
  }

  async requestPasswordReset(email: string): Promise<void> {
    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Por seguridad, no revelar si el email existe
    if (!user) {
      return; // Retorna sin error para no revelar que el email no existe
    }

    // Generar token
    const token = crypto.randomBytes(32).toString('hex');

    // Eliminar tokens anteriores del usuario
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id }
    });

    // Crear nuevo token
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hora
      }
    });

    // Enviar email
    await emailService.sendPasswordResetEmail(email, token);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Buscar token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!resetToken) {
      throw new Error('Token de restablecimiento inválido');
    }

    // Verificar expiración
    if (resetToken.expiresAt < new Date()) {
      throw new Error('Token de restablecimiento expirado');
    }

    // Validar nueva contraseña
    if (newPassword.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword }
    });

    // Revocar todos los refresh tokens (cerrar todas las sesiones)
    await prisma.refreshToken.updateMany({
      where: { userId: resetToken.userId },
      data: { isRevoked: true }
    });

    // Eliminar token usado
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id }
    });
  }
}
```

```prisma
// prisma/schema.prisma (modelos adicionales)
model EmailVerificationToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
}

model PasswordResetToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

```typescript
// src/auth/verification.controller.ts
import { Router, Request, Response } from 'express';
import { VerificationService } from './verification.service';

const router = Router();
const verificationService = new VerificationService();

// Verificar email
router.post('/verify-email', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    await verificationService.verifyEmail(token);

    res.json({
      message: 'Email verificado exitosamente'
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Error al verificar email'
    });
  }
});

// Solicitar recuperación de contraseña
router.post('/request-password-reset', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    await verificationService.requestPasswordReset(email);

    // Siempre devolver éxito (seguridad)
    res.json({
      message: 'Si el email existe, recibirás instrucciones para restablecer tu contraseña'
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Error al procesar solicitud'
    });
  }
});

// Restablecer contraseña
router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    await verificationService.resetPassword(token, newPassword);

    res.json({
      message: 'Contraseña restablecida exitosamente'
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Error al restablecer contraseña'
    });
  }
});

export default router;
```

**Características de seguridad implementadas**:

1. **Tokens criptográficos**: Usa `crypto.randomBytes()` para tokens impredecibles
2. **Expiración de tokens**: Verificación automática tiene 24h, reset tiene 1h
3. **One-time use**: Los tokens se eliminan después de usarse
4. **Revocación de sesiones**: Al cambiar contraseña, se cierran todas las sesiones
5. **No revelación de información**: No confirma si un email existe al solicitar reset
6. **Cascada de eliminación**: Si borras un usuario, sus tokens se eliminan
7. **HTML templates**: Emails profesionales con diseño responsive

---

## Workflow Completo: Sistema de Autenticación Multi-Tenant SaaS

Este workflow muestra cómo construir un sistema de autenticación completo para una aplicación SaaS multi-inquilino.

### Arquitectura del Sistema

```
src/
├── auth/
│   ├── auth.types.ts              # Interfaces y enums
│   ├── auth.service.ts            # Lógica de autenticación
│   ├── auth.controller.ts         # Endpoints de autenticación
│   ├── auth.middleware.ts         # Middleware de auth/autorización
│   ├── email.service.ts           # Envío de emails
│   ├── verification.service.ts    # Verificación y recuperación
│   └── verification.controller.ts # Endpoints de verificación
├── tenants/
│   ├── tenant.types.ts            # Tipos para multi-tenancy
│   ├── tenant.middleware.ts       # Aislamiento de datos
│   └── tenant.service.ts          # Gestión de inquilinos
└── index.ts                        # Servidor principal
```

### Archivo 1: Configuración de Variables de Entorno

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/saas_db"

# JWT Secrets (usa valores aleatorios seguros en producción)
JWT_SECRET="your-super-secret-jwt-key-change-in-production-32-chars-min"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production-32-chars-min"

# Email Configuration (Gmail example)
EMAIL_USER="your-app@gmail.com"
EMAIL_PASSWORD="your-app-specific-password"
EMAIL_FROM="No Reply <noreply@your-app.com>"

# Frontend URLs
FRONTEND_URL="http://localhost:3000"

# App Configuration
NODE_ENV="development"
PORT=3001
```

### Archivo 2: Schema Prisma Completo

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Tenant {
  id        Int      @id @default(autoincrement())
  name      String
  slug      String   @unique
  domain    String?  @unique
  isActive  Boolean  @default(true)
  users     User[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model User {
  id                      Int                       @id @default(autoincrement())
  email                   String                    @unique
  password                String
  name                    String
  role                    String                    @default("USER")
  isVerified              Boolean                   @default(false)
  lastLogin               DateTime?
  tenantId                Int
  tenant                  Tenant                    @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  refreshTokens           RefreshToken[]
  emailVerificationTokens EmailVerificationToken[]
  passwordResetTokens     PasswordResetToken[]
  createdAt               DateTime                  @default(now())
  updatedAt               DateTime                  @updatedAt

  @@index([tenantId])
  @@index([email])
}

model RefreshToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  isRevoked Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([token])
}

model EmailVerificationToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([token])
}

model PasswordResetToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([token])
}
```

### Archivo 3: Middleware de Multi-Tenancy

```typescript
// src/tenants/tenant.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      tenantId?: number;
      tenant?: any;
    }
  }
}

export const tenantMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Opción 1: Tenant por subdominio
    const host = req.hostname;
    const subdomain = host.split('.')[0];

    if (subdomain && subdomain !== 'www' && subdomain !== 'api') {
      const tenant = await prisma.tenant.findUnique({
        where: { slug: subdomain }
      });

      if (tenant && tenant.isActive) {
        req.tenantId = tenant.id;
        req.tenant = tenant;
        return next();
      }
    }

    // Opción 2: Tenant por header
    const tenantHeader = req.headers['x-tenant-id'];
    if (tenantHeader) {
      const tenantId = parseInt(tenantHeader as string);
      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId }
      });

      if (tenant && tenant.isActive) {
        req.tenantId = tenant.id;
        req.tenant = tenant;
        return next();
      }
    }

    // Opción 3: Tenant del usuario autenticado
    if (req.user) {
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        include: { tenant: true }
      });

      if (user && user.tenant.isActive) {
        req.tenantId = user.tenantId;
        req.tenant = user.tenant;
        return next();
      }
    }

    res.status(400).json({
      error: 'Tenant no especificado o inválido'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al identificar tenant'
    });
  }
};

// Helper para queries con tenant
export const withTenant = (tenantId: number) => {
  return {
    where: { tenantId }
  };
};
```

### Archivo 4: Servidor Principal con Todas las Rutas

```typescript
// src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRouter from './auth/auth.controller';
import verificationRouter from './auth/verification.controller';
import { authMiddleware } from './auth/auth.middleware';
import { tenantMiddleware } from './tenants/tenant.middleware';

const app = express();

// Middleware de seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por ventana
});
app.use('/api/auth', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Rutas públicas de autenticación
app.use('/api/auth', authRouter);
app.use('/api/verification', verificationRouter);

// Rutas protegidas (requieren autenticación y tenant)
app.use('/api/protected', authMiddleware, tenantMiddleware);

// Ejemplo de ruta protegida multi-tenant
app.get('/api/protected/profile', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    include: { tenant: true },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isVerified: true,
      tenant: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    }
  });

  res.json({ user });
});

// Manejo de errores global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);

  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📧 Email configurado: ${process.env.EMAIL_USER}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});

export default app;
```

### Archivo 5: Tests de Integración

```typescript
// src/auth/auth.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Sistema de Autenticación', () => {
  let testTenant: any;

  beforeAll(async () => {
    // Crear tenant de prueba
    testTenant = await prisma.tenant.create({
      data: {
        name: 'Test Tenant',
        slug: 'test-tenant'
      }
    });
  });

  afterAll(async () => {
    // Limpiar datos de prueba
    await prisma.user.deleteMany({ where: { tenantId: testTenant.id } });
    await prisma.tenant.delete({ where: { id: testTenant.id } });
    await prisma.$disconnect();
  });

  describe('POST /api/auth/register', () => {
    it('debe registrar un nuevo usuario', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Password123',
          name: 'Test User',
          tenantId: testTenant.id
        })
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('tokens');
      expect(response.body.user.email).toBe('test@example.com');
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('debe rechazar contraseña débil', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'weak@example.com',
          password: '123',
          name: 'Weak Password User',
          tenantId: testTenant.id
        })
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeAll(async () => {
      // Crear usuario de prueba
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'login-test@example.com',
          password: 'Password123',
          name: 'Login Test',
          tenantId: testTenant.id
        });
    });

    it('debe hacer login con credenciales correctas', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login-test@example.com',
          password: 'Password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('tokens');
      expect(response.body.tokens).toHaveProperty('accessToken');
      expect(response.body.tokens).toHaveProperty('refreshToken');
    });

    it('debe rechazar contraseña incorrecta', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login-test@example.com',
          password: 'WrongPassword'
        })
        .expect(401);
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshToken: string;

    beforeAll(async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login-test@example.com',
          password: 'Password123'
        });

      refreshToken = response.body.tokens.refreshToken;
    });

    it('debe renovar tokens con refresh token válido', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken })
        .expect(200);

      expect(response.body).toHaveProperty('tokens');
      expect(response.body.tokens.accessToken).not.toBe(refreshToken);
    });
  });

  describe('Rutas protegidas', () => {
    let accessToken: string;

    beforeAll(async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login-test@example.com',
          password: 'Password123'
        });

      accessToken = response.body.tokens.accessToken;
    });

    it('debe permitir acceso con token válido', async () => {
      const response = await request(app)
        .get('/api/protected/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('user');
    });

    it('debe rechazar acceso sin token', async () => {
      await request(app)
        .get('/api/protected/profile')
        .expect(401);
    });
  });
});
```

**Características del sistema completo**:

1. **Multi-tenancy**: Soporte para múltiples organizaciones/clientes en la misma base de datos
2. **Three-way tenant identification**: Por subdominio, header o usuario autenticado
3. **Security headers**: Helmet para headers de seguridad
4. **Rate limiting**: Protección contra brute force attacks
5. **CORS configurado**: Solo permite requests del frontend configurado
6. **Logging**: Registro de todas las peticiones
7. **Health check**: Endpoint para monitoring
8. **Error handling**: Manejo centralizado de errores
9. **Tests de integración**: Suite completa de tests
10. **TypeScript**: Tipado completo en todo el código

---

## Errores Comunes que Claude Code Previene

### Error 1: Guardar Contraseñas en Texto Plano

**Código Inseguro**:

```typescript
// ❌ NUNCA hagas esto
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  // Guardando password directamente - PELIGRO!
  const user = await prisma.user.create({
    data: {
      email,
      password: password // ← Texto plano en la base de datos
    }
  });

  res.json({ user });
});
```

**Por qué es peligroso**:
- Si roban tu base de datos, tienen todas las contraseñas
- Los usuarios suelen reutilizar contraseñas en múltiples sitios
- Violas regulaciones como GDPR
- Responsabilidad legal si hay una brecha de seguridad

**Código Seguro con Claude Code**:

```typescript
// ✅ Correcto: Hash con bcrypt
import bcrypt from 'bcryptjs';

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  // Hash con salt de 10 rondas
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword // ← Hash irreversible
    },
    select: {
      id: true,
      email: true,
      // NO seleccionar password
    }
  });

  res.json({ user });
});

// Verificación en login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // Comparar hash - NUNCA comparar strings directamente
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // Continuar con generación de token...
});
```

**Diferencia técnica**:
- Texto plano: `"MiPassword123"` → Se guarda literalmente
- Bcrypt hash: `"MiPassword123"` → `$2b$10$KZnX3V2.kF8jL9mP4qR2sO3tH6yJ8wE9nL5mA7vB2cD1fG3hI4jK`
- El hash incluye el salt automáticamente, no necesitas guardarlo por separado

---

### Error 2: Tokens JWT Sin Expiración

**Código Inseguro**:

```typescript
// ❌ Token que nunca expira
app.post('/api/login', async (req, res) => {
  const user = await authenticate(req.body);

  // Token sin expiresIn
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET
    // ← Falta el tercer parámetro con expiración
  );

  res.json({ token });
});
```

**Por qué es peligroso**:
- Si roban el token, es válido para siempre
- No hay forma de invalidarlo (excepto cambiar el JWT_SECRET de toda la app)
- Usuario no puede cerrar sesión efectivamente
- Token robado = acceso permanente

**Código Seguro con Claude Code**:

```typescript
// ✅ Correcto: Tokens con expiración corta + refresh tokens
app.post('/api/login', async (req, res) => {
  const user = await authenticate(req.body);

  // Access token: Corto (15 minutos)
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' } // ← Expira pronto
  );

  // Refresh token: Largo (7 días)
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // Guardar refresh token en base de datos
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  res.json({
    accessToken,
    refreshToken
  });
});

// Endpoint para renovar access token
app.post('/api/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  // Verificar refresh token
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  // Verificar que existe en base de datos y no está revocado
  const storedToken = await prisma.refreshToken.findFirst({
    where: {
      token: refreshToken,
      isRevoked: false
    }
  });

  if (!storedToken) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  // Generar nuevo access token
  const newAccessToken = jwt.sign(
    { userId: payload.userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  res.json({ accessToken: newAccessToken });
});
```

**Ventajas del sistema de doble token**:
1. **Access tokens cortos**: Limitan la ventana de riesgo si son robados
2. **Refresh tokens largos**: El usuario no tiene que hacer login constantemente
3. **Revocables**: Puedes invalidar refresh tokens en la base de datos
4. **Logout efectivo**: Borrar refresh tokens = sesión cerrada realmente

---

### Error 3: No Rotar Refresh Tokens

**Código Vulnerable**:

```typescript
// ❌ Reutilizar el mismo refresh token indefinidamente
app.post('/api/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  // Generar nuevo access token
  const newAccessToken = jwt.sign(
    { userId: payload.userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  // ❌ Devolver el MISMO refresh token
  res.json({
    accessToken: newAccessToken,
    refreshToken: refreshToken // ← Reutilizado
  });
});
```

**Por qué es vulnerable**:
- Si un refresh token es comprometido, el atacante puede usarlo indefinidamente
- No hay forma de detectar uso sospechoso
- No hay "chain of trust" para rastrear actividad

**Código Seguro con Rotación de Tokens**:

```typescript
// ✅ Correcto: Rotar refresh token en cada uso
app.post('/api/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  try {
    // Verificar token
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Buscar en base de datos
    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        token: refreshToken,
        userId: payload.userId,
        isRevoked: false
      }
    });

    if (!storedToken) {
      // Token ya usado o revocado - posible ataque
      // Revocar TODOS los tokens del usuario por seguridad
      await prisma.refreshToken.updateMany({
        where: { userId: payload.userId },
        data: { isRevoked: true }
      });

      return res.status(401).json({
        error: 'Refresh token inválido. Por seguridad, hemos cerrado todas tus sesiones.'
      });
    }

    // 1. Revocar el token actual
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { isRevoked: true }
    });

    // 2. Generar NUEVOS tokens
    const newAccessToken = jwt.sign(
      { userId: payload.userId },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
      { userId: payload.userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    });

    // 3. Guardar nuevo refresh token
    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: payload.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        parentId: storedToken.id // ← Enlazar con token anterior
      }
    });

    // 4. Devolver NUEVOS tokens
    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken // ← Token nuevo
    });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});
```

**Modelo Prisma para soportar rotación**:

```prisma
model RefreshToken {
  id        Int            @id @default(autoincrement())
  token     String         @unique
  userId    Int
  user      User           @relation(fields: [userId], references: [id])
  expiresAt DateTime
  isRevoked Boolean        @default(false)
  parentId  Int?           // ← Link al token que reemplazó
  parent    RefreshToken?  @relation("TokenChain", fields: [parentId], references: [id])
  children  RefreshToken[] @relation("TokenChain")
  createdAt DateTime       @default(now())
}
```

**Beneficios de la rotación**:
1. **Detección de robo**: Si un token viejo se usa, sabemos que fue comprometido
2. **Límite de daño**: Al detectar uso sospechoso, revocamos todas las sesiones
3. **Auditoría**: Puedes rastrear la cadena de tokens para ver patrones
4. **Compliance**: Cumple con mejores prácticas de seguridad (OWASP)

---

### Error 4: No Implementar Blacklist de Tokens

**Código Sin Blacklist**:

```typescript
// ❌ No hay forma de invalidar access tokens
app.post('/api/logout', authMiddleware, async (req, res) => {
  // Solo eliminar refresh token
  await prisma.refreshToken.deleteMany({
    where: { userId: req.user.userId }
  });

  res.json({ message: 'Logout exitoso' });
  // ❌ Pero el access token sigue siendo válido por 15 minutos!
});
```

**El problema**:
- Access tokens son stateless - el servidor no puede invalidarlos
- Si haces logout, el token sigue funcionando hasta que expire
- Ventana de 15 minutos de vulnerabilidad

**Solución 1: Blacklist en Redis (Mejor para Producción)**:

```typescript
// ✅ Blacklist con Redis
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Logout
app.post('/api/logout', authMiddleware, async (req, res) => {
  const token = req.headers.authorization!.substring(7);

  // Calcular tiempo restante de vida del token
  const decoded = jwt.decode(token) as any;
  const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

  // Añadir token a blacklist con expiración
  await redis.setex(`blacklist:${token}`, expiresIn, '1');

  // Eliminar refresh tokens
  await prisma.refreshToken.deleteMany({
    where: { userId: req.user!.userId }
  });

  res.json({ message: 'Logout exitoso' });
});

// Middleware de autenticación modificado
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.substring(7);

    // Verificar si está en blacklist
    const isBlacklisted = await redis.exists(`blacklist:${token}`);

    if (isBlacklisted) {
      return res.status(401).json({
        error: 'Token revocado'
      });
    }

    // Continuar con verificación normal
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
```

**Solución 2: Token Version en Base de Datos (Alternativa sin Redis)**:

```prisma
model User {
  id           Int    @id @default(autoincrement())
  email        String @unique
  password     String
  tokenVersion Int    @default(0) // ← Incrementar al hacer logout
}
```

```typescript
// Incluir versión en el payload del token
const accessToken = jwt.sign(
  {
    userId: user.id,
    tokenVersion: user.tokenVersion // ← Versión actual
  },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

// Al hacer logout, incrementar versión
app.post('/api/logout', authMiddleware, async (req, res) => {
  await prisma.user.update({
    where: { id: req.user.userId },
    data: {
      tokenVersion: { increment: 1 } // ← Todos los tokens viejos quedan inválidos
    }
  });

  res.json({ message: 'Logout exitoso' });
});

// En el middleware, verificar versión
export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization!.substring(7);
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  // Verificar que la versión coincide
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { tokenVersion: true }
  });

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.status(401).json({
      error: 'Token revocado. Por favor, inicia sesión nuevamente.'
    });
  }

  req.user = payload;
  next();
};
```

**Comparación de soluciones**:

| Característica | Redis Blacklist | Token Version |
|---|---|---|
| **Velocidad** | Muy rápida (in-memory) | Requiere query a DB |
| **Escalabilidad** | Excelente | Depende de DB |
| **Logout selectivo** | Sí (token específico) | No (invalida todos) |
| **Complejidad** | Requiere Redis | Solo DB existente |
| **Costo** | Infraestructura adicional | Sin costo extra |

---

## Comparación: Con vs Sin Claude Code

| Aspecto | Sin Claude Code | Con Claude Code |
|---------|-----------------|-----------------|
| **Tiempo de implementación** | 3-5 días (investigar, implementar, debuggear) | 2-4 horas (generar, revisar, personalizar) |
| **Seguridad de contraseñas** | Posible olvidar hash, usar salt incorrecto | Hash automático con bcrypt y salt óptimo |
| **Gestión de tokens** | Implementar manualmente doble token, rotación | Sistema completo de access + refresh con rotación |
| **Validación de entrada** | Validar email, password manualmente, propenso a errores | Validación robusta con regex y checks de fortaleza |
| **Manejo de errores** | Mensajes genéricos, stack traces expuestos | Errores específicos sin exponer info sensible |
| **Recuperación de contraseña** | Implementar flujo completo desde cero | Sistema completo con emails HTML y tokens seguros |
| **Verificación de email** | Crear tokens, templates, lógica de expiración | Todo incluido con templates profesionales |
| **Multi-tenancy** | Arquitectura compleja, fácil filtrar mal datos | Middleware robusto con múltiples estrategias |
| **Middleware de autorización** | Mezclar auth y autorización, difícil componer | Middlewares composables y reutilizables |
| **Tests** | Escribir mocks, setup complejo | Suite completa de tests de integración |
| **Logging y monitoring** | Agregar manualmente después | Incluido desde el principio |
| **Rate limiting** | Olvidar implementar, vulnerable a brute force | Configurado automáticamente |
| **CORS y security headers** | Configuración manual, posibles errores | Helmet y CORS configurados correctamente |
| **TypeScript types** | Definir interfaces manualmente | Tipos completos en todo el código |
| **Documentación** | Escribir después (si hay tiempo) | Código auto-documentado con tipos |

---

## Mejores Prácticas Profesionales

### 1. Nunca Confíes en el Cliente

```typescript
// ❌ Confiar en el rol del request
app.post('/api/admin/users', async (req, res) => {
  // Cliente envía: { role: 'ADMIN' }
  const { role } = req.body;

  if (role === 'ADMIN') {
    // ¡Cualquiera puede decir que es admin!
  }
});

// ✅ Siempre verificar en el servidor
app.post('/api/admin/users', authMiddleware, async (req, res) => {
  // Obtener rol del token verificado
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId }
  });

  if (user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  // Proceder...
});
```

### 2. Usa Constantes para Expiraciones

```typescript
// ✅ Configuración centralizada
export const TOKEN_CONFIG = {
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
  EMAIL_VERIFICATION_EXPIRY: 24 * 60 * 60 * 1000, // 24 horas
  PASSWORD_RESET_EXPIRY: 60 * 60 * 1000, // 1 hora
  BCRYPT_ROUNDS: 10
} as const;

// Usar en todo el código
const token = jwt.sign(payload, secret, {
  expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY
});
```

### 3. Logging Estructurado para Auditoría

```typescript
// ✅ Log de eventos de autenticación
import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'auth.log' })
  ]
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authService.login({ email, password });

    // Log éxito
    logger.info('Login exitoso', {
      userId: result.user.id,
      email,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      timestamp: new Date().toISOString()
    });

    res.json(result);
  } catch (error) {
    // Log fallo
    logger.warn('Intento de login fallido', {
      email,
      ip: req.ip,
      reason: error.message,
      timestamp: new Date().toISOString()
    });

    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});
```

### 4. Rate Limiting por Usuario

```typescript
// ✅ Rate limit por IP y por usuario
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

// Rate limit por IP
const ipLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos de login
  message: 'Demasiados intentos de login. Intenta en 15 minutos.'
});

// Rate limit por email (para prevenir credential stuffing)
const emailLimiter = async (req, res, next) => {
  const { email } = req.body;

  const key = `login:${email}`;
  const attempts = await redis.incr(key);

  if (attempts === 1) {
    await redis.expire(key, 15 * 60); // 15 minutos
  }

  if (attempts > 5) {
    return res.status(429).json({
      error: 'Demasiados intentos de login para este email. Intenta en 15 minutos.'
    });
  }

  next();
};

app.post('/api/login', ipLimiter, emailLimiter, async (req, res) => {
  // Login logic
});
```

### 5. Secrets en Variables de Entorno

```typescript
// ❌ NUNCA hardcodear secrets
const JWT_SECRET = 'mi-secreto-123'; // ¡PELIGRO!

// ✅ Usar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

// ✅ Validar al inicio de la aplicación
const requiredEnvVars = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'DATABASE_URL',
  'EMAIL_USER',
  'EMAIL_PASSWORD'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Variable de entorno requerida no encontrada: ${envVar}`);
  }
}
```

### 6. HTTPS en Producción

```typescript
// ✅ Redirigir HTTP a HTTPS en producción
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// ✅ Configurar cookies seguras
res.cookie('refreshToken', token, {
  httpOnly: true, // No accesible desde JavaScript
  secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
  sameSite: 'strict', // Protección CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
});
```

### 7. Validación de Fortaleza de Contraseñas

```typescript
// ✅ Validación robusta de contraseñas
import zxcvbn from 'zxcvbn'; // Librería de estimación de fortaleza

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una minúscula');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una mayúscula');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Debe contener al menos un número');
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Debe contener al menos un carácter especial (!@#$%^&*)');
  }

  // Verificar contra contraseñas comunes
  const strength = zxcvbn(password);
  if (strength.score < 3) {
    errors.push('La contraseña es demasiado común o predecible');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};
```

---

## Recursos y Siguientes Pasos

### Librerías Recomendadas

- **jsonwebtoken**: Creación y verificación de JWT
- **bcryptjs**: Hashing de contraseñas
- **nodemailer**: Envío de emails
- **express-rate-limit**: Rate limiting
- **helmet**: Security headers
- **zxcvbn**: Validación de fortaleza de contraseñas
- **ioredis**: Cliente Redis para blacklisting
- **winston**: Logging estructurado

### Temas Avanzados para Explorar

1. **OAuth 2.0**: Autenticación con Google, GitHub, Facebook
2. **Two-Factor Authentication (2FA)**: TOTP con Google Authenticator
3. **Single Sign-On (SSO)**: SAML, OpenID Connect
4. **Biometric Authentication**: WebAuthn, FIDO2
5. **API Keys**: Para autenticación de servicios externos
6. **Session Management**: Gestión de sesiones activas
7. **Device Tracking**: Rastrear dispositivos y ubicaciones

### Checklist de Seguridad

- [ ] Contraseñas hasheadas con bcrypt
- [ ] Access tokens con expiración corta (15 min)
- [ ] Refresh tokens rotados en cada uso
- [ ] Blacklist o token versioning implementado
- [ ] HTTPS en producción
- [ ] CORS configurado correctamente
- [ ] Rate limiting en endpoints sensibles
- [ ] Headers de seguridad con Helmet
- [ ] Cookies con httpOnly y secure
- [ ] Logging de eventos de autenticación
- [ ] Validación de fortaleza de contraseñas
- [ ] Verificación de email implementada
- [ ] Recuperación de contraseña segura
- [ ] Multi-tenancy con aislamiento de datos
- [ ] Tests de seguridad automatizados

---

Con este sistema de autenticación empresarial completo, tu aplicación está lista para manejar miles de usuarios con seguridad de nivel bancario. En la próxima lección, aprenderás a diseñar APIs RESTful profesionales que siguen los estándares de la industria.

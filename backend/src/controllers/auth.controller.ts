// Controlador de autenticación
import { Response, NextFunction } from 'express';
import { AuthRequest, ApiResponse, LoginCredentials, RegisterData } from '../types';
import { prisma } from '../utils/prisma';
import { hashPassword, comparePassword, validatePasswordStrength } from '../utils/password';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { ValidationError, AuthenticationError, ConflictError } from '../utils/errors';
import { UserRole } from '@prisma/client';

/**
 * Registro de nuevo usuario
 */
export async function register(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { email, password, firstName, lastName, role }: RegisterData = req.body;

    // Validar fortaleza de contraseña
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      throw new ValidationError(passwordValidation.errors.join(', '));
    }

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError('El correo electrónico ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario (solo admin puede crear usuarios con rol diferente a STUDENT)
    const userRole = req.user?.role === UserRole.ADMIN && role ? role : UserRole.STUDENT;

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: userRole,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    // Generar tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const response: ApiResponse = {
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Inicio de sesión
 */
export async function login(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { email, password }: LoginCredentials = req.body;

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AuthenticationError('Credenciales inválidas');
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      throw new AuthenticationError('Cuenta desactivada. Contacte al administrador');
    }

    // Verificar contraseña
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new AuthenticationError('Credenciales inválidas');
    }

    // Generar tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const response: ApiResponse = {
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
        },
        accessToken,
        refreshToken,
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener perfil del usuario autenticado
 */
export async function getProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthenticationError('Usuario no autenticado');
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        bio: true,
        phone: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AuthenticationError('Usuario no encontrado');
    }

    const response: ApiResponse = {
      success: true,
      data: user,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Actualizar perfil del usuario autenticado
 */
export async function updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthenticationError('Usuario no autenticado');
    }

    const { firstName, lastName, bio, phone, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(bio !== undefined && { bio }),
        ...(phone !== undefined && { phone }),
        ...(avatar !== undefined && { avatar }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        bio: true,
        phone: true,
        updatedAt: true,
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: user,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Cambiar contraseña del usuario autenticado
 */
export async function changePassword(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthenticationError('Usuario no autenticado');
    }

    const { currentPassword, newPassword } = req.body;

    // Obtener usuario con contraseña
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new AuthenticationError('Usuario no encontrado');
    }

    // Verificar contraseña actual
    const isValidPassword = await comparePassword(currentPassword, user.password);

    if (!isValidPassword) {
      throw new AuthenticationError('Contraseña actual incorrecta');
    }

    // Validar nueva contraseña
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.valid) {
      throw new ValidationError(passwordValidation.errors.join(', '));
    }

    // Hash de la nueva contraseña
    const hashedPassword = await hashPassword(newPassword);

    // Actualizar contraseña
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Contraseña actualizada exitosamente',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

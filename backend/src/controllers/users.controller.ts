// Controlador de gestión de usuarios (Admin)
import { Response, NextFunction } from 'express';
import { AuthRequest, ApiResponse } from '../types';
import { prisma } from '../utils/prisma';
import { hashPassword, validatePasswordStrength } from '../utils/password';
import { NotFoundError, AuthorizationError, ValidationError, ConflictError } from '../utils/errors';
import { UserRole } from '@prisma/client';

/**
 * Obtener todos los usuarios con filtros (solo ADMIN)
 */
export async function getAllUsers(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para acceder a este recurso');
    }

    const {
      page = '1',
      limit = '20',
      role,
      search,
      isActive,
      emailVerified,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Construir filtros
    const where: any = {};

    if (role) {
      where.role = role as UserRole;
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    if (emailVerified !== undefined) {
      where.emailVerified = emailVerified === 'true';
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    // Validar campo de ordenamiento
    const validSortFields = ['createdAt', 'updatedAt', 'firstName', 'lastName', 'email'];
    const orderByField = validSortFields.includes(sortBy as string) ? sortBy : 'createdAt';
    const orderByDirection = sortOrder === 'asc' ? 'asc' : 'desc';

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limitNum,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          avatar: true,
          bio: true,
          phone: true,
          isActive: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              enrollments: true,
              coursesInstructed: true,
              articles: true,
              ticketsCreated: true,
            },
          },
        },
        orderBy:
          orderByField === 'createdAt' ? { createdAt: orderByDirection } :
          orderByField === 'updatedAt' ? { updatedAt: orderByDirection } :
          orderByField === 'firstName' ? { firstName: orderByDirection } :
          orderByField === 'lastName' ? { lastName: orderByDirection } :
          orderByField === 'email' ? { email: orderByDirection } :
          { createdAt: orderByDirection },
      }),
      prisma.user.count({ where }),
    ]);

    const response: ApiResponse = {
      success: true,
      data: {
        users,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener un usuario por ID con información detallada (solo ADMIN)
 */
export async function getUserById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para acceder a este recurso');
    }

    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        bio: true,
        phone: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                slug: true,
                thumbnail: true,
                level: true,
              },
            },
          },
          orderBy: {
            enrolledAt: 'desc',
          },
        },
        coursesInstructed: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            level: true,
            status: true,
            published: true,
            _count: {
              select: {
                enrollments: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        articles: {
          select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
            published: true,
            views: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        ticketsCreated: {
          select: {
            id: true,
            subject: true,
            type: true,
            status: true,
            priority: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        _count: {
          select: {
            enrollments: true,
            coursesInstructed: true,
            articles: true,
            ticketsCreated: true,
            progressRecords: true,
            achievements: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
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
 * Crear un nuevo usuario (solo ADMIN)
 */
export async function createUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para crear usuarios');
    }

    const {
      email,
      password,
      firstName,
      lastName,
      role,
      bio,
      phone,
      avatar,
      isActive = true,
      emailVerified = false,
    } = req.body;

    // Validaciones
    if (!email || !password || !firstName || !lastName) {
      throw new ValidationError('Email, contraseña, nombre y apellido son requeridos');
    }

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

    // Validar rol
    const validRoles = Object.values(UserRole);
    if (role && !validRoles.includes(role)) {
      throw new ValidationError('Rol inválido');
    }

    // Hash de la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: role || UserRole.STUDENT,
        bio,
        phone,
        avatar,
        isActive,
        emailVerified,
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
        isActive: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Usuario creado exitosamente',
      data: user,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Actualizar un usuario (solo ADMIN)
 */
export async function updateUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para actualizar usuarios');
    }

    const { id } = req.params;
    const updateData = req.body;

    // Verificar que el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundError('Usuario no encontrado');
    }

    // No permitir cambiar el email a uno ya existente
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: updateData.email },
      });

      if (emailExists) {
        throw new ConflictError('El correo electrónico ya está registrado');
      }
    }

    // Si se está actualizando la contraseña, validarla y hashearla
    if (updateData.password) {
      const passwordValidation = validatePasswordStrength(updateData.password);
      if (!passwordValidation.valid) {
        throw new ValidationError(passwordValidation.errors.join(', '));
      }
      updateData.password = await hashPassword(updateData.password);
    }

    // Validar rol si se proporciona
    if (updateData.role) {
      const validRoles = Object.values(UserRole);
      if (!validRoles.includes(updateData.role)) {
        throw new ValidationError('Rol inválido');
      }
    }

    // Actualizar usuario
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        bio: true,
        phone: true,
        isActive: true,
        emailVerified: true,
        updatedAt: true,
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: user,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Eliminar un usuario (solo ADMIN)
 */
export async function deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para eliminar usuarios');
    }

    const { id } = req.params;

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }

    // No permitir que el admin se elimine a sí mismo
    if (user.id === req.user.id) {
      throw new ValidationError('No puedes eliminar tu propia cuenta');
    }

    // Eliminar usuario (Prisma eliminará automáticamente las relaciones en cascada)
    await prisma.user.delete({
      where: { id },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Usuario eliminado exitosamente',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Activar/Desactivar un usuario (solo ADMIN)
 */
export async function toggleUserStatus(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para cambiar el estado de usuarios');
    }

    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      throw new ValidationError('El campo isActive debe ser booleano');
    }

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }

    // No permitir que el admin se desactive a sí mismo
    if (user.id === req.user.id && !isActive) {
      throw new ValidationError('No puedes desactivar tu propia cuenta');
    }

    // Actualizar estado
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
      },
    });

    const response: ApiResponse = {
      success: true,
      message: `Usuario ${isActive ? 'activado' : 'desactivado'} exitosamente`,
      data: updatedUser,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener estadísticas de usuarios (solo ADMIN)
 */
export async function getUserStats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para acceder a estas estadísticas');
    }

    const [
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalStudents,
      totalProfessors,
      totalAdmins,
      verifiedUsers,
      unverifiedUsers,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { isActive: false } }),
      prisma.user.count({ where: { role: UserRole.STUDENT } }),
      prisma.user.count({ where: { role: UserRole.PROFESOR } }),
      prisma.user.count({ where: { role: UserRole.ADMIN } }),
      prisma.user.count({ where: { emailVerified: true } }),
      prisma.user.count({ where: { emailVerified: false } }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Últimos 30 días
          },
        },
      }),
    ]);

    const stats = {
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
      byRole: {
        students: totalStudents,
        professors: totalProfessors,
        admins: totalAdmins,
      },
      emailVerification: {
        verified: verifiedUsers,
        unverified: unverifiedUsers,
      },
      recent: {
        last30Days: recentUsers,
      },
    };

    const response: ApiResponse = {
      success: true,
      data: stats,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener usuarios por rol (solo ADMIN y PROFESOR)
 * Los profesores pueden ver lista de alumnos
 */
export async function getUsersByRole(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { role } = req.params;

    // Validar que el rol es válido
    const validRoles = Object.values(UserRole);
    if (!validRoles.includes(role as UserRole)) {
      throw new ValidationError('Rol inválido');
    }

    // Solo admin puede ver todos los roles, profesor solo puede ver estudiantes
    if (req.user.role !== UserRole.ADMIN) {
      if (req.user.role === UserRole.PROFESOR && role !== UserRole.STUDENT) {
        throw new AuthorizationError('Solo puedes ver la lista de estudiantes');
      } else if (req.user.role === UserRole.STUDENT) {
        throw new AuthorizationError('No tienes permiso para acceder a este recurso');
      }
    }

    const users = await prisma.user.findMany({
      where: {
        role: role as UserRole,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        createdAt: true,
      },
      orderBy: {
        firstName: 'asc',
      },
    });

    const response: ApiResponse = {
      success: true,
      data: users,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Búsqueda rápida de usuarios (solo ADMIN)
 */
export async function searchUsers(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
      throw new AuthorizationError('No tienes permiso para buscar usuarios');
    }

    const { q, limit = '10' } = req.query;

    if (!q || (q as string).length < 2) {
      throw new ValidationError('La búsqueda debe tener al menos 2 caracteres');
    }

    const limitNum = parseInt(limit as string);

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: q as string, mode: 'insensitive' } },
          { lastName: { contains: q as string, mode: 'insensitive' } },
          { email: { contains: q as string, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        isActive: true,
      },
      take: limitNum,
      orderBy: {
        firstName: 'asc',
      },
    });

    const response: ApiResponse = {
      success: true,
      data: users,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

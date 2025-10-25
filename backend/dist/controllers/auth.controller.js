"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.changePassword = changePassword;
const prisma_1 = require("../utils/prisma");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
const client_1 = require("@prisma/client");
/**
 * Registro de nuevo usuario
 */
async function register(req, res, next) {
    try {
        const { email, password, firstName, lastName, role } = req.body;
        // Validar fortaleza de contraseña
        const passwordValidation = (0, password_1.validatePasswordStrength)(password);
        if (!passwordValidation.valid) {
            throw new errors_1.ValidationError(passwordValidation.errors.join(', '));
        }
        // Verificar si el email ya existe
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new errors_1.ConflictError('El correo electrónico ya está registrado');
        }
        // Hash de la contraseña
        const hashedPassword = await (0, password_1.hashPassword)(password);
        // Crear usuario (solo admin puede crear usuarios con rol diferente a STUDENT)
        const userRole = req.user?.role === client_1.UserRole.ADMIN && role ? role : client_1.UserRole.STUDENT;
        const user = await prisma_1.prisma.user.create({
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
        const accessToken = (0, jwt_1.generateAccessToken)({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        const refreshToken = (0, jwt_1.generateRefreshToken)({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        const response = {
            success: true,
            message: 'Usuario registrado exitosamente',
            data: {
                user,
                accessToken,
                refreshToken,
            },
        };
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Inicio de sesión
 */
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        // Buscar usuario por email
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new errors_1.AuthenticationError('Credenciales inválidas');
        }
        // Verificar si el usuario está activo
        if (!user.isActive) {
            throw new errors_1.AuthenticationError('Cuenta desactivada. Contacte al administrador');
        }
        // Verificar contraseña
        const isValidPassword = await (0, password_1.comparePassword)(password, user.password);
        if (!isValidPassword) {
            throw new errors_1.AuthenticationError('Credenciales inválidas');
        }
        // Generar tokens
        const accessToken = (0, jwt_1.generateAccessToken)({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        const refreshToken = (0, jwt_1.generateRefreshToken)({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        const response = {
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
    }
    catch (error) {
        next(error);
    }
}
/**
 * Obtener perfil del usuario autenticado
 */
async function getProfile(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthenticationError('Usuario no autenticado');
        }
        const user = await prisma_1.prisma.user.findUnique({
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
            throw new errors_1.AuthenticationError('Usuario no encontrado');
        }
        const response = {
            success: true,
            data: user,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Actualizar perfil del usuario autenticado
 */
async function updateProfile(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthenticationError('Usuario no autenticado');
        }
        const { firstName, lastName, bio, phone, avatar } = req.body;
        const user = await prisma_1.prisma.user.update({
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
        const response = {
            success: true,
            message: 'Perfil actualizado exitosamente',
            data: user,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Cambiar contraseña del usuario autenticado
 */
async function changePassword(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthenticationError('Usuario no autenticado');
        }
        const { currentPassword, newPassword } = req.body;
        // Obtener usuario con contraseña
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: req.user.id },
        });
        if (!user) {
            throw new errors_1.AuthenticationError('Usuario no encontrado');
        }
        // Verificar contraseña actual
        const isValidPassword = await (0, password_1.comparePassword)(currentPassword, user.password);
        if (!isValidPassword) {
            throw new errors_1.AuthenticationError('Contraseña actual incorrecta');
        }
        // Validar nueva contraseña
        const passwordValidation = (0, password_1.validatePasswordStrength)(newPassword);
        if (!passwordValidation.valid) {
            throw new errors_1.ValidationError(passwordValidation.errors.join(', '));
        }
        // Hash de la nueva contraseña
        const hashedPassword = await (0, password_1.hashPassword)(newPassword);
        // Actualizar contraseña
        await prisma_1.prisma.user.update({
            where: { id: req.user.id },
            data: { password: hashedPassword },
        });
        const response = {
            success: true,
            message: 'Contraseña actualizada exitosamente',
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=auth.controller.js.map
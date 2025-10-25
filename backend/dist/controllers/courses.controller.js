"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCourses = getAllCourses;
exports.getCourseBySlug = getCourseBySlug;
exports.createCourse = createCourse;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;
exports.enrollInCourse = enrollInCourse;
exports.getMyCourses = getMyCourses;
const prisma_1 = require("../utils/prisma");
const slugify_1 = require("../utils/slugify");
const errors_1 = require("../utils/errors");
const client_1 = require("@prisma/client");
/**
 * Obtener todos los cursos (público con filtros)
 */
async function getAllCourses(req, res, next) {
    try {
        const { page = '1', limit = '12', search, category, level, featured, instructor, } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        // Construir filtros
        const where = {};
        // Solo mostrar cursos publicados para usuarios no autenticados o estudiantes
        if (!req.user || req.user.role === client_1.UserRole.STUDENT) {
            where.published = true;
            where.status = client_1.CourseStatus.PUBLISHED;
        }
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (category) {
            where.categoryId = category;
        }
        if (level) {
            where.level = level;
        }
        if (featured === 'true') {
            where.featured = true;
        }
        if (instructor) {
            where.instructorId = instructor;
        }
        const [courses, total] = await Promise.all([
            prisma_1.prisma.course.findMany({
                where,
                skip,
                take: limitNum,
                include: {
                    instructor: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            avatar: true,
                        },
                    },
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                    _count: {
                        select: {
                            modules: true,
                            enrollments: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prisma_1.prisma.course.count({ where }),
        ]);
        const response = {
            success: true,
            data: {
                courses,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total,
                    totalPages: Math.ceil(total / limitNum),
                },
            },
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Obtener un curso por slug
 */
async function getCourseBySlug(req, res, next) {
    try {
        const { slug } = req.params;
        const course = await prisma_1.prisma.course.findUnique({
            where: { slug },
            include: {
                instructor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        bio: true,
                    },
                },
                category: true,
                modules: {
                    where: {
                        isPublished: true,
                    },
                    orderBy: {
                        order: 'asc',
                    },
                    include: {
                        lessons: {
                            where: {
                                isPublished: true,
                            },
                            orderBy: {
                                order: 'asc',
                            },
                            select: {
                                id: true,
                                title: true,
                                type: true,
                                order: true,
                                isFree: true,
                                videoDuration: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        enrollments: true,
                    },
                },
            },
        });
        if (!course) {
            throw new errors_1.NotFoundError('Curso no encontrado');
        }
        // Verificar si el curso está publicado (excepto para instructor y admin)
        if (!course.published &&
            (!req.user ||
                (req.user.role === client_1.UserRole.STUDENT && req.user.id !== course.instructorId))) {
            throw new errors_1.NotFoundError('Curso no encontrado');
        }
        // Verificar si el usuario está inscrito
        let isEnrolled = false;
        if (req.user) {
            const enrollment = await prisma_1.prisma.enrollment.findUnique({
                where: {
                    userId_courseId: {
                        userId: req.user.id,
                        courseId: course.id,
                    },
                },
            });
            isEnrolled = !!enrollment;
        }
        const response = {
            success: true,
            data: {
                ...course,
                isEnrolled,
            },
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Crear un nuevo curso (solo instructor y admin)
 */
async function createCourse(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const data = req.body;
        // Generar slug único
        const baseSlug = (0, slugify_1.slugify)(data.title);
        const existingCourses = await prisma_1.prisma.course.findMany({
            where: {
                slug: {
                    startsWith: baseSlug,
                },
            },
            select: { slug: true },
        });
        let slug = baseSlug;
        let counter = 1;
        while (existingCourses.some(c => c.slug === slug)) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        const course = await prisma_1.prisma.course.create({
            data: {
                title: data.title,
                slug,
                description: data.description,
                shortDescription: data.shortDescription,
                thumbnail: data.thumbnail,
                level: data.level,
                price: data.price || 0,
                duration: data.duration,
                prerequisites: data.prerequisites ? JSON.stringify(data.prerequisites) : null,
                learningGoals: data.learningGoals ? JSON.stringify(data.learningGoals) : null,
                instructorId: req.user.id,
                categoryId: data.categoryId,
            },
            include: {
                instructor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
                category: true,
            },
        });
        const response = {
            success: true,
            message: 'Curso creado exitosamente',
            data: course,
        };
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Actualizar un curso
 */
async function updateCourse(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { id } = req.params;
        const data = req.body;
        // Verificar que el curso existe
        const existingCourse = await prisma_1.prisma.course.findUnique({
            where: { id },
        });
        if (!existingCourse) {
            throw new errors_1.NotFoundError('Curso no encontrado');
        }
        // Verificar permisos (solo el instructor del curso o admin)
        if (req.user.role !== client_1.UserRole.ADMIN &&
            existingCourse.instructorId !== req.user.id) {
            throw new errors_1.AuthorizationError('No tienes permiso para editar este curso');
        }
        // Actualizar curso
        const updateData = {};
        if (data.title)
            updateData.title = data.title;
        if (data.description)
            updateData.description = data.description;
        if (data.shortDescription !== undefined)
            updateData.shortDescription = data.shortDescription;
        if (data.thumbnail !== undefined)
            updateData.thumbnail = data.thumbnail;
        if (data.level)
            updateData.level = data.level;
        if (data.price !== undefined)
            updateData.price = data.price;
        if (data.duration !== undefined)
            updateData.duration = data.duration;
        if (data.prerequisites !== undefined)
            updateData.prerequisites = JSON.stringify(data.prerequisites);
        if (data.learningGoals !== undefined)
            updateData.learningGoals = JSON.stringify(data.learningGoals);
        if (data.categoryId !== undefined)
            updateData.categoryId = data.categoryId;
        if (data.status)
            updateData.status = data.status;
        if (data.published !== undefined) {
            updateData.published = data.published;
            if (data.published && !existingCourse.publishedAt) {
                updateData.publishedAt = new Date();
            }
        }
        const course = await prisma_1.prisma.course.update({
            where: { id },
            data: updateData,
            include: {
                instructor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
                category: true,
            },
        });
        const response = {
            success: true,
            message: 'Curso actualizado exitosamente',
            data: course,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Eliminar un curso
 */
async function deleteCourse(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { id } = req.params;
        // Verificar que el curso existe
        const course = await prisma_1.prisma.course.findUnique({
            where: { id },
        });
        if (!course) {
            throw new errors_1.NotFoundError('Curso no encontrado');
        }
        // Verificar permisos (solo el instructor del curso o admin)
        if (req.user.role !== client_1.UserRole.ADMIN &&
            course.instructorId !== req.user.id) {
            throw new errors_1.AuthorizationError('No tienes permiso para eliminar este curso');
        }
        // Eliminar curso (Prisma eliminará automáticamente los módulos y lecciones relacionadas)
        await prisma_1.prisma.course.delete({
            where: { id },
        });
        const response = {
            success: true,
            message: 'Curso eliminado exitosamente',
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Inscribirse en un curso
 */
async function enrollInCourse(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const { id } = req.params;
        // Verificar que el curso existe y está publicado
        const course = await prisma_1.prisma.course.findUnique({
            where: { id },
        });
        if (!course || !course.published) {
            throw new errors_1.NotFoundError('Curso no encontrado o no disponible');
        }
        // Verificar si ya está inscrito
        const existingEnrollment = await prisma_1.prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: req.user.id,
                    courseId: id,
                },
            },
        });
        if (existingEnrollment) {
            throw new errors_1.ValidationError('Ya estás inscrito en este curso');
        }
        // Crear inscripción
        const enrollment = await prisma_1.prisma.enrollment.create({
            data: {
                userId: req.user.id,
                courseId: id,
            },
            include: {
                course: {
                    include: {
                        instructor: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });
        const response = {
            success: true,
            message: 'Inscripción exitosa',
            data: enrollment,
        };
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Obtener cursos del usuario (inscripciones)
 */
async function getMyCourses(req, res, next) {
    try {
        if (!req.user) {
            throw new errors_1.AuthorizationError('Usuario no autenticado');
        }
        const enrollments = await prisma_1.prisma.enrollment.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                course: {
                    include: {
                        instructor: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                avatar: true,
                            },
                        },
                        category: true,
                        _count: {
                            select: {
                                modules: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                enrolledAt: 'desc',
            },
        });
        const response = {
            success: true,
            data: enrollments,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=courses.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Script para poblar la base de datos con datos iniciales
const client_1 = require("@prisma/client");
const password_1 = require("./password");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Iniciando seed de la base de datos...');
    // Crear usuarios
    const adminPassword = await (0, password_1.hashPassword)('Admin123!');
    const instructorPassword = await (0, password_1.hashPassword)('Instructor123!');
    const studentPassword = await (0, password_1.hashPassword)('Estudiante123!');
    await prisma.user.upsert({
        where: { email: 'admin@institutosanmiguel.com' },
        update: {},
        create: {
            email: 'admin@institutosanmiguel.com',
            password: adminPassword,
            firstName: 'Admin',
            lastName: 'Instituto',
            role: client_1.UserRole.ADMIN,
            isActive: true,
            emailVerified: true,
        },
    });
    const instructor = await prisma.user.upsert({
        where: { email: 'instructor@institutosanmiguel.com' },
        update: {},
        create: {
            email: 'instructor@institutosanmiguel.com',
            password: instructorPassword,
            firstName: 'Carlos',
            lastName: 'Martínez',
            role: client_1.UserRole.PROFESOR,
            bio: 'Instructor con 10 años de experiencia en desarrollo web y programación.',
            isActive: true,
            emailVerified: true,
        },
    });
    await prisma.user.upsert({
        where: { email: 'estudiante@institutosanmiguel.com' },
        update: {},
        create: {
            email: 'estudiante@institutosanmiguel.com',
            password: studentPassword,
            firstName: 'María',
            lastName: 'González',
            role: client_1.UserRole.STUDENT,
            isActive: true,
            emailVerified: true,
        },
    });
    console.log('✓ Usuarios creados');
    // Crear categorías
    const webDevCategory = await prisma.category.upsert({
        where: { slug: 'desarrollo-web' },
        update: {},
        create: {
            name: 'Desarrollo Web',
            slug: 'desarrollo-web',
            description: 'Cursos de desarrollo web frontend y backend',
            icon: 'code',
            color: '#3B82F6',
            order: 1,
        },
    });
    await prisma.category.upsert({
        where: { slug: 'inteligencia-artificial' },
        update: {},
        create: {
            name: 'Inteligencia Artificial',
            slug: 'inteligencia-artificial',
            description: 'Cursos de IA, Machine Learning y Deep Learning',
            icon: 'brain',
            color: '#8B5CF6',
            order: 2,
        },
    });
    await prisma.category.upsert({
        where: { slug: 'programacion' },
        update: {},
        create: {
            name: 'Programación',
            slug: 'programacion',
            description: 'Fundamentos y lenguajes de programación',
            icon: 'terminal',
            color: '#10B981',
            order: 3,
        },
    });
    console.log('✓ Categorías creadas');
    // Crear curso de ejemplo
    const course = await prisma.course.upsert({
        where: { slug: 'introduccion-desarrollo-web' },
        update: {
            status: client_1.CourseStatus.PUBLISHED,
            published: true,
        },
        create: {
            title: 'Introducción al Desarrollo Web',
            slug: 'introduccion-desarrollo-web',
            description: 'Aprende los fundamentos del desarrollo web moderno con HTML, CSS y JavaScript. Este curso te llevará desde cero hasta crear tus primeras páginas web interactivas.',
            shortDescription: 'Aprende HTML, CSS y JavaScript desde cero',
            level: client_1.CourseLevel.BEGINNER,
            price: 0,
            duration: 40,
            prerequisites: JSON.stringify(['Conocimientos básicos de computación', 'Ganas de aprender']),
            learningGoals: JSON.stringify([
                'Crear páginas web con HTML y CSS',
                'Añadir interactividad con JavaScript',
                'Entender cómo funciona la web',
                'Publicar tu primer sitio web',
            ]),
            instructorId: instructor.id,
            categoryId: webDevCategory.id,
            status: client_1.CourseStatus.PUBLISHED,
            published: true,
            publishedAt: new Date(),
            featured: true,
        },
    });
    console.log('✓ Curso creado');
    // Crear módulos
    const module1 = await prisma.module.create({
        data: {
            title: 'Fundamentos de HTML',
            description: 'Aprende la estructura básica de las páginas web con HTML',
            order: 1,
            courseId: course.id,
            isPublished: true,
        },
    });
    const module2 = await prisma.module.create({
        data: {
            title: 'Estilos con CSS',
            description: 'Dale estilo y diseño a tus páginas web',
            order: 2,
            courseId: course.id,
            isPublished: true,
        },
    });
    console.log('✓ Módulos creados');
    // Crear lecciones
    await prisma.lesson.create({
        data: {
            title: '¿Qué es HTML?',
            description: 'Introducción a HTML y su importancia en el desarrollo web',
            type: 'VIDEO',
            content: 'En esta lección aprenderás qué es HTML y por qué es fundamental...',
            videoUrl: 'https://www.youtube.com/watch?v=example',
            videoDuration: 600,
            order: 1,
            moduleId: module1.id,
            isPublished: true,
            isFree: true,
        },
    });
    await prisma.lesson.create({
        data: {
            title: 'Etiquetas básicas de HTML',
            description: 'Conoce las etiquetas más importantes de HTML',
            type: 'TEXT',
            content: 'Las etiquetas HTML son los bloques de construcción...',
            order: 2,
            moduleId: module1.id,
            isPublished: true,
            isFree: true,
        },
    });
    await prisma.lesson.create({
        data: {
            title: 'Introducción a CSS',
            description: 'Aprende qué es CSS y cómo se usa',
            type: 'VIDEO',
            content: 'CSS es el lenguaje que usamos para dar estilo...',
            videoUrl: 'https://www.youtube.com/watch?v=example2',
            videoDuration: 720,
            order: 1,
            moduleId: module2.id,
            isPublished: true,
            isFree: false,
        },
    });
    console.log('✓ Lecciones creadas');
    // Crear tags
    const htmlTag = await prisma.tag.upsert({
        where: { slug: 'html' },
        update: {},
        create: {
            name: 'HTML',
            slug: 'html',
        },
    });
    const cssTag = await prisma.tag.upsert({
        where: { slug: 'css' },
        update: {},
        create: {
            name: 'CSS',
            slug: 'css',
        },
    });
    const jsTag = await prisma.tag.upsert({
        where: { slug: 'javascript' },
        update: {},
        create: {
            name: 'JavaScript',
            slug: 'javascript',
        },
    });
    // Asociar tags con el curso
    await prisma.courseTag.createMany({
        data: [
            { courseId: course.id, tagId: htmlTag.id },
            { courseId: course.id, tagId: cssTag.id },
            { courseId: course.id, tagId: jsTag.id },
        ],
        skipDuplicates: true,
    });
    console.log('✓ Tags creados y asociados');
    // Crear achievements
    await prisma.achievement.createMany({
        data: [
            {
                name: 'Primer Paso',
                description: 'Completaste tu primera lección',
                icon: '🎯',
                type: 'COURSE_COMPLETION',
                criteria: JSON.stringify({ lessonsCompleted: 1 }),
                points: 10,
            },
            {
                name: 'Estudiante Dedicado',
                description: 'Completaste un curso completo',
                icon: '🏆',
                type: 'COURSE_COMPLETION',
                criteria: JSON.stringify({ coursesCompleted: 1 }),
                points: 50,
            },
            {
                name: 'Maestro del Quiz',
                description: 'Obtuviste 100% en un cuestionario',
                icon: '⭐',
                type: 'PERFECT_SCORE',
                criteria: JSON.stringify({ perfectScore: true }),
                points: 25,
            },
        ],
        skipDuplicates: true,
    });
    console.log('✓ Achievements creados');
    console.log('✓ Seed completado exitosamente');
}
main()
    .catch((e) => {
    console.error('Error durante el seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
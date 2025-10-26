import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function enrollMariaInNewCourse() {
  try {
    // Buscar el usuario María
    const maria = await prisma.user.findUnique({
      where: { email: 'estudiante@institutosanmiguel.com' }
    });

    if (!maria) {
      console.error('❌ Usuario María no encontrado');
      return;
    }

    // Buscar el curso nuevo
    const newCourse = await prisma.course.findFirst({
      where: { title: 'Especialista en Desarrollo con Claude Code' }
    });

    if (!newCourse) {
      console.error('❌ Curso nuevo no encontrado');
      return;
    }

    console.log(`👤 Usuario: ${maria.firstName} ${maria.lastName}`);
    console.log(`📚 Curso: ${newCourse.title}`);

    // Verificar si ya está inscrita
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        userId: maria.id,
        courseId: newCourse.id
      }
    });

    if (existingEnrollment) {
      console.log('✓ María ya está inscrita en el curso nuevo');
      return;
    }

    // Inscribir
    await prisma.enrollment.create({
      data: {
        userId: maria.id,
        courseId: newCourse.id,
        status: 'ACTIVE'
      }
    });

    console.log('✅ María inscrita exitosamente en el curso con contenido mejorado');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

enrollMariaInNewCourse();

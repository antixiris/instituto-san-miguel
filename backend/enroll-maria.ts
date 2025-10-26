import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function enrollMaria() {
  try {
    // Buscar usuario María González
    const maria = await prisma.user.findUnique({
      where: { email: 'estudiante@institutosanmiguel.com' }
    });

    if (!maria) {
      console.error('❌ Usuario María González no encontrado');
      process.exit(1);
    }

    // Buscar curso
    const course = await prisma.course.findUnique({
      where: { slug: 'especialista-desarrollo-claude-code' }
    });

    if (!course) {
      console.error('❌ Curso no encontrado');
      process.exit(1);
    }

    console.log(`✓ Usuario encontrado: ${maria.email} (${maria.id})`);
    console.log(`✓ Curso encontrado: ${course.title} (${course.id})`);

    // Verificar si ya está matriculada
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: maria.id,
          courseId: course.id
        }
      }
    });

    if (existingEnrollment) {
      console.log('⚠️  María González ya está matriculada en el curso');
      console.log(`   Status: ${existingEnrollment.status}, Progress: ${existingEnrollment.progress}%`);
      process.exit(0);
    }

    // Crear matrícula
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: maria.id,
        courseId: course.id,
        status: 'ACTIVE',
        progress: 0
      }
    });

    console.log('✓ María González matriculada exitosamente');
    console.log(`  Enrollment ID: ${enrollment.id}`);
    console.log(`  Status: ${enrollment.status}`);
    console.log(`  Progress: ${enrollment.progress}%`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

enrollMaria();

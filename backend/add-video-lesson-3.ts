import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addVideoToLesson3() {
  try {
    // Buscar la lección 3 del módulo 1 del curso correcto
    const lesson3 = await prisma.lesson.findFirst({
      where: {
        module: {
          course: {
            slug: 'especialista-claude-code'
          },
          order: 1  // Módulo 1
        },
        order: 3  // Lección 3
      },
      include: {
        module: {
          include: {
            course: {
              select: {
                title: true,
                slug: true
              }
            }
          }
        }
      }
    });

    if (!lesson3) {
      console.error('❌ No se encontró la lección 3');
      return;
    }

    console.log(`📚 Lección encontrada: ${lesson3.title}`);
    console.log(`   Curso: ${lesson3.module.course.title}`);
    console.log(`   Tipo actual: ${lesson3.type}`);
    console.log(`   Video actual: ${lesson3.videoUrl || 'ninguno'}\n`);

    // Actualizar la lección con el video
    const updated = await prisma.lesson.update({
      where: { id: lesson3.id },
      data: {
        type: 'VIDEO',
        videoUrl: '/videos/Tu_Primer_Proyecto_Claude.mp4',
        videoDuration: 420  // 7 minutos estimados
      }
    });

    console.log('✅ Lección 3 actualizada exitosamente');
    console.log(`   Tipo: ${updated.type}`);
    console.log(`   Video: ${updated.videoUrl}`);
    console.log(`   Duración: ${updated.videoDuration} segundos`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addVideoToLesson3();

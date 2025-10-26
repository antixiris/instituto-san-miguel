import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixAllLesson3Videos() {
  try {
    // Actualizar TODAS las lecciones "Primeros pasos" en el curso especialista-claude-code
    const result = await prisma.lesson.updateMany({
      where: {
        title: 'Primeros pasos: Tu primer proyecto con Claude',
        module: {
          course: {
            slug: 'especialista-claude-code'
          },
          order: 1
        }
      },
      data: {
        type: 'VIDEO',
        videoUrl: '/videos/Tu_Primer_Proyecto_Claude.mp4',
        videoDuration: 420
      }
    });

    console.log(`✅ ${result.count} lecciones actualizadas con el video`);

    // Verificar
    const lessons = await prisma.lesson.findMany({
      where: {
        title: 'Primeros pasos: Tu primer proyecto con Claude',
        module: {
          course: {
            slug: 'especialista-claude-code'
          },
          order: 1
        }
      },
      select: {
        id: true,
        title: true,
        type: true,
        videoUrl: true,
        videoDuration: true
      }
    });

    console.log('\n📊 Verificación:');
    lessons.forEach((lesson, index) => {
      console.log(`\n${index + 1}. ${lesson.title}`);
      console.log(`   ID: ${lesson.id}`);
      console.log(`   Tipo: ${lesson.type}`);
      console.log(`   Video: ${lesson.videoUrl}`);
      console.log(`   Duración: ${lesson.videoDuration}s`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAllLesson3Videos();

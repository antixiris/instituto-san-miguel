import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateLessonVideo() {
  try {
    // Buscar la lección 1 del módulo 1
    const lesson = await prisma.lesson.findFirst({
      where: {
        title: 'Qué es Claude Code y por qué usarlo',
        module: {
          order: 0,
          course: {
            slug: 'especialista-desarrollo-claude-code'
          }
        }
      }
    });

    if (!lesson) {
      console.error('No se encontró la lección');
      return;
    }

    console.log(`Lección encontrada: ${lesson.title}`);

    // Actualizar con el video
    const updated = await prisma.lesson.update({
      where: { id: lesson.id },
      data: {
        videoUrl: '/videos/Una_Revolucion_en_el_Codigo.mp4',
        videoDuration: 360, // 6 minutos (ajustar si es diferente)
        type: 'VIDEO'
      }
    });

    console.log('✅ Lección actualizada con el video');
    console.log('URL del video:', updated.videoUrl);
    console.log('Duración:', updated.videoDuration, 'segundos');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateLessonVideo();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateLesson() {
  try {
    // Primero encontramos el módulo 2
    const modules = await prisma.module.findMany({
      where: {
        course: {
          slug: 'especialista-claude-code'
        }
      },
      include: {
        lessons: {
          orderBy: {
            order: 'asc'
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    });

    // El módulo 2 es el segundo en orden
    const module2 = modules.find(m => m.order === 2);

    if (!module2) {
      console.error('No se encontró el módulo 2');
      return;
    }

    console.log('Módulo 2:', module2.title);
    console.log('Lecciones del módulo 2:');
    module2.lessons.forEach((lesson, index) => {
      console.log(`  ${index + 1}. ${lesson.title} (ID: ${lesson.id})`);
    });

    // La lección 4 es el cuarto elemento (index 3)
    const lesson4 = module2.lessons.find(l => l.order === 4);

    if (!lesson4) {
      console.error('No se encontró la lección 4 del módulo 2');
      return;
    }

    console.log('\nActualizando lección:', lesson4.title);

    // Actualizar la lección con el video
    const updated = await prisma.lesson.update({
      where: { id: lesson4.id },
      data: {
        type: 'VIDEO',
        videoUrl: 'http://localhost:3001/api/videos/Generación_y_Prueba_de_Código.mp4',
        videoDuration: 300 // Aproximado, ajustar si se conoce la duración real
      }
    });

    console.log('\n✅ Lección actualizada exitosamente:');
    console.log('ID:', updated.id);
    console.log('Título:', updated.title);
    console.log('Tipo:', updated.type);
    console.log('Video URL:', updated.videoUrl);
    console.log('Duración:', updated.videoDuration, 'segundos');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateLesson();

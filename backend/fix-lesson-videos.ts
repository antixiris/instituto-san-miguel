import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixLessonVideos() {
  try {
    console.log('🔧 Corrigiendo videos de las lecciones...\n');

    // 1. Obtener todas las lecciones del curso
    const lessons = await prisma.lesson.findMany({
      where: {
        module: {
          course: {
            slug: 'especialista-desarrollo-claude-code'
          }
        }
      },
      select: {
        id: true,
        title: true,
        type: true,
        videoUrl: true,
        order: true,
      },
      orderBy: { order: 'asc' }
    });

    console.log(`📋 Encontradas ${lessons.length} lecciones\n`);

    // 2. Actualizar la Lección 1 con el video correcto
    const leccion1 = lessons.find(l => l.order === 0);
    if (leccion1) {
      await prisma.lesson.update({
        where: { id: leccion1.id },
        data: {
          type: 'VIDEO',
          videoUrl: '/videos/Una_Revolucion_en_el_Codigo.mp4',
          videoDuration: 360
        }
      });
      console.log('✅ Lección 1 actualizada con el video local');
    }

    // 3. Remover videoUrl de las demás lecciones y cambiar tipo a TEXT
    for (const lesson of lessons) {
      if (lesson.order !== 0) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            type: 'TEXT',
            videoUrl: null,
            videoDuration: null
          }
        });
        console.log(`✅ ${lesson.title}: tipo cambiado a TEXT, videoUrl removido`);
      }
    }

    console.log('\n🎉 Corrección completada exitosamente');

    // 4. Verificar
    console.log('\n📊 Estado final:');
    const updated = await prisma.lesson.findMany({
      where: {
        module: {
          course: {
            slug: 'especialista-desarrollo-claude-code'
          }
        }
      },
      select: {
        title: true,
        type: true,
        videoUrl: true,
        order: true,
      },
      orderBy: { order: 'asc' }
    });

    updated.forEach(l => {
      console.log(`  ${l.order + 1}. ${l.title}`);
      console.log(`     Tipo: ${l.type}, Video: ${l.videoUrl || 'ninguno'}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixLessonVideos();

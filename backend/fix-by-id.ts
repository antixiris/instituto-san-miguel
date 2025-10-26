import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixByIds() {
  try {
    console.log('🔧 Actualizando lecciones por ID directo...\n');

    // La lección 1 que el usuario está viendo
    const lesson1Id = 'cmh7golqp0007grhvht5zaq8z';

    await prisma.lesson.update({
      where: { id: lesson1Id },
      data: {
        type: 'VIDEO',
        videoUrl: '/videos/Una_Revolucion_en_el_Codigo.mp4',
        videoDuration: 360
      }
    });

    console.log('✅ Lección 1 actualizada:');
    console.log('   ID:', lesson1Id);
    console.log('   VideoURL: /videos/Una_Revolucion_en_el_Codigo.mp4\n');

    // La lección 2 que el usuario está viendo
    const lesson2Id = 'cmh7golqs000bgrhvxmueiyun';

    await prisma.lesson.update({
      where: { id: lesson2Id },
      data: {
        type: 'TEXT',
        videoUrl: null,
        videoDuration: null
      }
    });

    console.log('✅ Lección 2 actualizada:');
    console.log('   ID:', lesson2Id);
    console.log('   VideoURL: null (removido)\n');

    // Actualizar todas las demás lecciones del mismo curso
    const allLessons = await prisma.lesson.findMany({
      where: {
        module: {
          course: {
            slug: 'especialista-claude-code'
          }
        },
        id: {
          notIn: [lesson1Id] // Excluir la lección 1
        }
      }
    });

    console.log(`🔄 Actualizando ${allLessons.length} lecciones adicionales...`);

    for (const lesson of allLessons) {
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: {
          type: 'TEXT',
          videoUrl: null,
          videoDuration: null
        }
      });
    }

    console.log(`✅ ${allLessons.length} lecciones actualizadas a TEXT sin video\n`);

    // Verificar lecciones específicas
    console.log('📊 Verificación:');
    const l1 = await prisma.lesson.findUnique({ where: { id: lesson1Id } });
    const l2 = await prisma.lesson.findUnique({ where: { id: lesson2Id } });

    console.log('\nLección 1:');
    console.log('  Título:', l1?.title);
    console.log('  Tipo:', l1?.type);
    console.log('  VideoURL:', l1?.videoUrl);

    console.log('\nLección 2:');
    console.log('  Título:', l2?.title);
    console.log('  Tipo:', l2?.type);
    console.log('  VideoURL:', l2?.videoUrl || 'null');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixByIds();

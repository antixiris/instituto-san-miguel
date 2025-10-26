import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkLesson3() {
  try {
    // Buscar todas las lecciones 3 en todos los cursos
    const lessons = await prisma.lesson.findMany({
      where: {
        order: 3
      },
      include: {
        module: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                slug: true
              }
            }
          }
        }
      }
    });

    console.log(`\n📚 Encontradas ${lessons.length} lecciones con order: 3\n`);

    lessons.forEach((lesson, index) => {
      console.log(`${index + 1}. ${lesson.title}`);
      console.log(`   ID: ${lesson.id}`);
      console.log(`   Curso: ${lesson.module.course.title} (${lesson.module.course.slug})`);
      console.log(`   Módulo order: ${lesson.module.order}`);
      console.log(`   Tipo: ${lesson.type}`);
      console.log(`   Video: ${lesson.videoUrl || 'NINGUNO'}`);
      console.log(`   Duración: ${lesson.videoDuration || 'N/A'}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkLesson3();

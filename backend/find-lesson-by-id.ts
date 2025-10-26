import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findLessonById() {
  try {
    // IDs que vi en los logs del usuario
    const ids = [
      'cmh7golqp0007grhvht5zaq8z',
      'cmh7golqs000bgrhvxmueiyun'
    ];

    for (const id of ids) {
      const lesson = await prisma.lesson.findUnique({
        where: { id },
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

      if (lesson) {
        console.log(`\n📚 Lección ID: ${id}`);
        console.log(`   Título: ${lesson.title}`);
        console.log(`   Tipo: ${lesson.type}`);
        console.log(`   VideoURL: ${lesson.videoUrl || 'null'}`);
        console.log(`   Curso: ${lesson.module.course.title}`);
        console.log(`   Slug: ${lesson.module.course.slug}`);
      } else {
        console.log(`\n❌ Lección con ID ${id} no encontrada`);
      }
    }

    // Contar todos los cursos
    const allCourses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      }
    });

    console.log(`\n\n📊 Total de cursos en la BD: ${allCourses.length}`);
    allCourses.forEach(course => {
      console.log(`  - ${course.title} (${course.slug})`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findLessonById();

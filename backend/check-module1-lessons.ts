import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkModule1Lessons() {
  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        module: {
          course: {
            slug: 'especialista-claude-code'
          },
          order: 1  // Módulo 1
        }
      },
      select: {
        id: true,
        title: true,
        order: true,
        content: true,
      },
      orderBy: { order: 'asc' }
    });

    console.log(`\n📚 Lecciones del Módulo 1: ${lessons.length}\n`);

    lessons.forEach((lesson, index) => {
      console.log(`${index + 1}. ${lesson.title}`);
      console.log(`   Order: ${lesson.order}`);
      console.log(`   Contenido: ${lesson.content ? lesson.content.substring(0, 200) + '...' : 'SIN CONTENIDO'}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkModule1Lessons();

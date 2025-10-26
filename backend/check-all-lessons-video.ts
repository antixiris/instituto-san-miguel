import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAllLessons() {
  try {
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
        module: {
          select: {
            title: true,
            order: true
          }
        }
      },
      orderBy: [
        { module: { order: 'asc' } },
        { order: 'asc' }
      ]
    });

    console.log('\n=== TODAS LAS LECCIONES ===\n');
    lessons.forEach(lesson => {
      console.log(`Módulo ${lesson.module.order + 1}: ${lesson.module.title}`);
      console.log(`  Lección ${lesson.order + 1}: ${lesson.title}`);
      console.log(`  Type: ${lesson.type}`);
      console.log(`  VideoURL: ${lesson.videoUrl || 'null'}`);
      console.log('---');
    });

    console.log(`\nTotal lecciones: ${lessons.length}`);
    console.log(`Lecciones con video: ${lessons.filter(l => l.videoUrl).length}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAllLessons();

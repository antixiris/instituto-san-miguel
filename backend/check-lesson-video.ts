import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkLessonVideo() {
  try {
    const lesson = await prisma.lesson.findFirst({
      where: {
        title: 'Qué es Claude Code y por qué usarlo',
      },
      select: {
        id: true,
        title: true,
        type: true,
        videoUrl: true,
        videoDuration: true,
      }
    });

    console.log('Lesson data:', JSON.stringify(lesson, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkLessonVideo();

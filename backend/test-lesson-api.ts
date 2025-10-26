import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testLessonAPI() {
  try {
    // Simular lo que hace el API
    const lessonId = 'cmh6umvth0005shc3n9jyw3f1'; // ID de la lección 1

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                instructorId: true,
              },
            },
          },
        },
        quiz: {
          include: {
            questions: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
        exercise: true,
      },
    });

    console.log('\n=== LESSON API RESPONSE ===');
    console.log('ID:', lesson?.id);
    console.log('Title:', lesson?.title);
    console.log('Type:', lesson?.type);
    console.log('VideoURL:', lesson?.videoUrl);
    console.log('VideoDuration:', lesson?.videoDuration);
    console.log('\n=== FULL LESSON OBJECT ===');
    console.log(JSON.stringify(lesson, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testLessonAPI();

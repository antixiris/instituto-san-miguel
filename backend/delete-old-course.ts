import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteOldCourse() {
  const courseIdToDelete = 'cmh6umvtd0001shc3fudj2pno'; // Curso antiguo

  console.log('🗑️  Eliminando curso antiguo...\n');

  try {
    // 1. Eliminar enrollments
    const enrollments = await prisma.enrollment.deleteMany({
      where: { courseId: courseIdToDelete }
    });
    console.log(`✓ Enrollments eliminados: ${enrollments.count}`);

    // 2. Eliminar CourseTag
    const courseTags = await prisma.courseTag.deleteMany({
      where: { courseId: courseIdToDelete }
    });
    console.log(`✓ Course tags eliminados: ${courseTags.count}`);

    // 3. Obtener módulos
    const modules = await prisma.module.findMany({
      where: { courseId: courseIdToDelete },
      select: { id: true, title: true }
    });
    console.log(`\n📚 Módulos encontrados: ${modules.length}`);

    // 4. Eliminar contenido de cada módulo
    for (const module of modules) {
      console.log(`\n  Procesando módulo: ${module.title}`);

      // Obtener lecciones
      const lessons = await prisma.lesson.findMany({
        where: { moduleId: module.id },
        select: { id: true, title: true }
      });
      console.log(`    - ${lessons.length} lecciones`);

      for (const lesson of lessons) {
        // Eliminar Progress
        await prisma.progress.deleteMany({
          where: { lessonId: lesson.id }
        });

        // Eliminar Exercise y ExerciseSubmission
        const exercises = await prisma.exercise.findMany({
          where: { lessonId: lesson.id },
          select: { id: true }
        });

        for (const exercise of exercises) {
          await prisma.exerciseSubmission.deleteMany({
            where: { exerciseId: exercise.id }
          });
        }

        await prisma.exercise.deleteMany({
          where: { lessonId: lesson.id }
        });

        // Eliminar Quiz, QuizQuestion, QuizSubmission
        const quizzes = await prisma.quiz.findMany({
          where: { lessonId: lesson.id },
          select: { id: true }
        });

        for (const quiz of quizzes) {
          // Eliminar QuizAnswer primero
          const submissions = await prisma.quizSubmission.findMany({
            where: { quizId: quiz.id },
            select: { id: true }
          });

          for (const submission of submissions) {
            await prisma.quizAnswer.deleteMany({
              where: { submissionId: submission.id }
            });
          }

          await prisma.quizSubmission.deleteMany({
            where: { quizId: quiz.id }
          });

          await prisma.quizQuestion.deleteMany({
            where: { quizId: quiz.id }
          });
        }

        await prisma.quiz.deleteMany({
          where: { lessonId: lesson.id }
        });

        // Eliminar la lección
        await prisma.lesson.delete({
          where: { id: lesson.id }
        });
      }

      // Eliminar el módulo
      await prisma.module.delete({
        where: { id: module.id }
      });
      console.log(`    ✓ Módulo eliminado`);
    }

    // 5. Finalmente eliminar el curso
    await prisma.course.delete({
      where: { id: courseIdToDelete }
    });

    console.log('\n✅ Curso antiguo eliminado exitosamente');
    console.log('\n📊 Verificando cursos restantes...\n');

    const remainingCourses = await prisma.course.findMany({
      where: {
        title: { contains: 'Claude Code' }
      },
      select: {
        id: true,
        title: true,
        slug: true
      }
    });

    console.log('Cursos de Claude Code restantes:', remainingCourses.length);
    remainingCourses.forEach(c => {
      console.log(`  - ${c.title} (${c.slug})`);
    });

  } catch (error) {
    console.error('❌ Error al eliminar curso:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteOldCourse();

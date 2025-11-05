import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkExercises() {
  console.log('🔍 Verificando ejercicios en el sistema...\n');

  // Contar ejercicios totales
  const totalExercises = await prisma.exercise.count();
  console.log(`📊 Total de ejercicios en el sistema: ${totalExercises}\n`);

  if (totalExercises > 0) {
    // Listar ejercicios
    const exercises = await prisma.exercise.findMany({
      include: {
        lesson: {
          include: {
            module: {
              select: {
                title: true,
                order: true
              }
            }
          }
        },
        submissions: {
          select: {
            id: true,
            userId: true,
            status: true
          }
        }
      },
      orderBy: [
        { lesson: { module: { order: 'asc' } } }
      ]
    });

    console.log('═══════════════════════════════════════════');
    console.log('📝 EJERCICIOS ENCONTRADOS:');
    console.log('═══════════════════════════════════════════\n');

    exercises.forEach((exercise, index) => {
      console.log(`${index + 1}. ${exercise.title}`);
      console.log(`   Módulo: ${exercise.lesson.module.title}`);
      console.log(`   Lección: ${exercise.lesson.title}`);
      console.log(`   Dificultad: ${'⭐'.repeat(exercise.difficulty)}`);
      console.log(`   Puntos: ${exercise.points}`);
      console.log(`   Envíos: ${exercise.submissions.length}`);
      console.log('');
    });
  }

  // Verificar submissions de María
  const maria = await prisma.user.findUnique({
    where: { email: 'estudiante@institutosanmiguel.com' }
  });

  if (maria) {
    const mariaSubmissions = await prisma.exerciseSubmission.findMany({
      where: { userId: maria.id },
      include: {
        exercise: {
          include: {
            lesson: true
          }
        }
      }
    });

    console.log('═══════════════════════════════════════════');
    console.log(`👤 ENVÍOS DE EJERCICIOS DE MARÍA:`);
    console.log('═══════════════════════════════════════════\n');

    if (mariaSubmissions.length === 0) {
      console.log('   ❌ No hay envíos de ejercicios registrados\n');
    } else {
      mariaSubmissions.forEach((submission, index) => {
        console.log(`${index + 1}. ${submission.exercise.title}`);
        console.log(`   Estado: ${submission.status}`);
        console.log(`   Calificación: ${submission.grade || 'Sin calificar'}`);
        console.log(`   Fecha: ${submission.submittedAt.toLocaleDateString('es-ES')}`);
        console.log('');
      });
    }
  }

  // Verificar UserProgress
  if (maria) {
    const userProgress = await prisma.userProgress.findUnique({
      where: { userId: maria.id }
    });

    console.log('═══════════════════════════════════════════');
    console.log(`📈 PROGRESO DE GAMIFICACIÓN DE MARÍA:`);
    console.log('═══════════════════════════════════════════\n');
    console.log(`   Total XP: ${userProgress?.totalXP || 0}`);
    console.log(`   Nivel: ${userProgress?.currentLevel || 1}`);
    console.log(`   Lecciones completadas: ${userProgress?.totalLessonsCompleted || 0}`);
    console.log(`   Ejercicios completados: ${userProgress?.totalExercisesCompleted || 0}`);
    console.log(`   Tests aprobados: ${userProgress?.totalTestsPassed || 0}`);
    console.log('');
  }

  await prisma.$disconnect();
}

checkExercises().catch(console.error);

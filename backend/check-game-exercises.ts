import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkGameExercises() {
  console.log('🎮 Verificando GameExercises en el sistema...\n');

  // Contar game exercises totales
  const totalGameExercises = await prisma.gameExercise.count();
  console.log(`📊 Total de GameExercises: ${totalGameExercises}\n`);

  if (totalGameExercises > 0) {
    const gameExercises = await prisma.gameExercise.findMany({
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
            userId: true,
            score: true,
            passed: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    console.log('═══════════════════════════════════════════');
    console.log('🎮 GAME EXERCISES ENCONTRADOS:');
    console.log('═══════════════════════════════════════════\n');

    gameExercises.forEach((ge, index) => {
      console.log(`${index + 1}. ${ge.title}`);
      console.log(`   Tipo: ${ge.type}`);
      console.log(`   Módulo: ${ge.lesson.module.title}`);
      console.log(`   Lección: ${ge.lesson.title}`);
      console.log(`   Puntos: ${ge.points}`);
      console.log(`   Tiempo límite: ${ge.timeLimit ? `${ge.timeLimit}s` : 'Sin límite'}`);
      console.log(`   Activo: ${ge.isActive ? 'Sí' : 'No'}`);
      console.log(`   Envíos: ${ge.submissions.length}`);
      console.log('');
    });

    // Verificar submissions de María
    const maria = await prisma.user.findUnique({
      where: { email: 'estudiante@institutosanmiguel.com' }
    });

    if (maria) {
      const mariaSubmissions = await prisma.gameExerciseSubmission.findMany({
        where: { userId: maria.id },
        include: {
          exercise: {
            include: {
              lesson: true
            }
          }
        },
        orderBy: {
          completedAt: 'desc'
        }
      });

      console.log('═══════════════════════════════════════════');
      console.log(`👤 GAME EXERCISE SUBMISSIONS DE MARÍA:`);
      console.log('═══════════════════════════════════════════\n');

      if (mariaSubmissions.length === 0) {
        console.log('   ❌ No hay submissions de game exercises\n');
      } else {
        mariaSubmissions.forEach((sub, index) => {
          console.log(`${index + 1}. ${sub.exercise.title}`);
          console.log(`   Puntuación: ${sub.score.toFixed(1)}/10`);
          console.log(`   Pasado: ${sub.passed ? '✅' : '❌'}`);
          console.log(`   Intento: #${sub.attempt}`);
          console.log(`   Tiempo: ${sub.timeSpent ? `${sub.timeSpent}s` : 'N/A'}`);
          console.log(`   Fecha: ${sub.completedAt.toLocaleDateString('es-ES')}`);
          console.log('');
        });
      }

      // Verificar UserProgress
      const userProgress = await prisma.userProgress.findUnique({
        where: { userId: maria.id }
      });

      console.log('═══════════════════════════════════════════');
      console.log(`📈 CONTADOR EN GAMIFICACIÓN:`);
      console.log('═══════════════════════════════════════════\n');
      console.log(`   totalExercisesCompleted: ${userProgress?.totalExercisesCompleted || 0}`);
      console.log('');
      console.log('   Nota: Este contador se refiere a "Exercise" (ejercicios de código tradicionales)');
      console.log('   Los "GameExercise" son un sistema separado de ejercicios gamificados');
      console.log('');
    }
  }

  await prisma.$disconnect();
}

checkGameExercises().catch(console.error);

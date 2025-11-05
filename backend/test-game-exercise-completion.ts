import { PrismaClient } from '@prisma/client';
import * as gamificationService from './src/services/gamificationService';

const prisma = new PrismaClient();

async function testGameExerciseCompletion() {
  console.log('🎮 Probando completación de GameExercise con integración de gamificación\n');

  // 1. Obtener María
  const maria = await prisma.user.findUnique({
    where: { email: 'estudiante@institutosanmiguel.com' }
  });

  if (!maria) {
    console.error('❌ No se encontró a María');
    return;
  }

  console.log(`👤 Usuario: ${maria.firstName} ${maria.lastName}`);
  console.log(`📧 Email: ${maria.email}\n`);

  // 2. Obtener el primer GameExercise activo
  const gameExercise = await prisma.gameExercise.findFirst({
    where: { isActive: true },
    include: {
      lesson: {
        include: {
          module: true
        }
      }
    }
  });

  if (!gameExercise) {
    console.error('❌ No se encontró ningún GameExercise activo');
    return;
  }

  console.log('═══════════════════════════════════════════');
  console.log('🎯 EJERCICIO A COMPLETAR:');
  console.log('═══════════════════════════════════════════\n');
  console.log(`Título: ${gameExercise.title}`);
  console.log(`Tipo: ${gameExercise.type}`);
  console.log(`Lección: ${gameExercise.lesson.title}`);
  console.log(`Módulo: ${gameExercise.lesson.module.title}`);
  console.log(`Puntos: ${gameExercise.points}\n`);

  // 3. Verificar progreso ANTES
  const progressBefore = await prisma.userProgress.findUnique({
    where: { userId: maria.id }
  });

  console.log('═══════════════════════════════════════════');
  console.log('📊 PROGRESO ANTES DE COMPLETAR:');
  console.log('═══════════════════════════════════════════\n');
  console.log(`Total XP: ${progressBefore?.totalXP || 0}`);
  console.log(`Nivel: ${progressBefore?.currentLevel || 1}`);
  console.log(`Ejercicios completados: ${progressBefore?.totalExercisesCompleted || 0}\n`);

  // 4. Simular respuestas correctas según el tipo de ejercicio
  const config = JSON.parse(gameExercise.config);
  let answers: any;
  let expectedScore = 10; // Respuestas perfectas

  switch (gameExercise.type) {
    case 'MULTIPLE_CHOICE':
      // Responder correctamente todas las preguntas
      answers = config.questions?.map((q: any) => q.correctAnswer) || [];
      break;

    case 'TRUE_FALSE':
      // Responder correctamente todas las afirmaciones
      answers = config.statements?.map((s: any) => s.correct) || [];
      break;

    case 'FILL_BLANKS':
      // Usar la primera respuesta aceptada de cada blank
      answers = config.blanks?.map((b: any) => b.acceptedAnswers[0]) || [];
      break;

    case 'MATCHING_PAIRS':
      // Hacer todos los pares correctamente
      answers = config.pairs?.map((p: any) => p.match) || [];
      break;

    case 'SEQUENCE_ORDER':
      // Ordenar correctamente la secuencia
      answers = { sequence: config.correctSequence || [] };
      break;

    case 'CODE_CHALLENGE':
      // Para código, dar una respuesta básica
      answers = { code: '// Código de prueba' };
      expectedScore = 5; // El CODE_CHALLENGE da 0.5 de correctCount = 5/10
      break;
  }

  console.log('═══════════════════════════════════════════');
  console.log('💾 ENVIANDO EJERCICIO...');
  console.log('═══════════════════════════════════════════\n');

  // 5. Calcular número de intento
  const previousAttempts = await prisma.gameExerciseSubmission.count({
    where: {
      exerciseId: gameExercise.id,
      userId: maria.id,
    },
  });

  const attempt = previousAttempts + 1;

  // 6. Evaluar respuestas (usando la misma lógica que el controlador)
  const evaluationResult = evaluateGameExercise(gameExercise.type, config, answers);

  console.log(`Puntuación obtenida: ${evaluationResult.score.toFixed(1)}/10`);
  console.log(`¿Aprobado? ${evaluationResult.passed ? '✅ Sí' : '❌ No'}`);
  console.log(`Intento: #${attempt}\n`);

  // 7. Crear la submission
  const submission = await prisma.gameExerciseSubmission.create({
    data: {
      exerciseId: gameExercise.id,
      userId: maria.id,
      answers: JSON.stringify(answers),
      score: evaluationResult.score,
      totalPoints: gameExercise.points,
      passed: evaluationResult.passed,
      timeSpent: 120, // 2 minutos de prueba
      attempt,
    },
  });

  console.log(`✅ Submission creada: ${submission.id}\n`);

  // 8. Crear GradeRecord
  await prisma.gradeRecord.create({
    data: {
      userId: maria.id,
      courseId: gameExercise.lesson.module.courseId,
      moduleId: gameExercise.lesson.moduleId,
      lessonId: gameExercise.lesson.id,
      type: 'GAME_EXERCISE',
      score: evaluationResult.score,
      weight: 1.0,
      submissionId: submission.id,
    },
  });

  console.log('✅ GradeRecord creado\n');

  // 9. 🎮 INTEGRACIÓN CON GAMIFICACIÓN
  if (evaluationResult.passed) {
    console.log('═══════════════════════════════════════════');
    console.log('🎮 ACTUALIZANDO GAMIFICACIÓN...');
    console.log('═══════════════════════════════════════════\n');

    try {
      const gamificationResult = await gamificationService.completeExercise(
        maria.id,
        gameExercise.id,
        evaluationResult.score
      );

      console.log(`✅ Gamificación actualizada exitosamente!`);
      console.log(`   XP ganado: +${gamificationResult.xpGained} XP`);
      console.log(`   XP total: ${gamificationResult.updatedProgress.totalXP} XP`);
      console.log(`   Nivel actual: ${gamificationResult.updatedProgress.currentLevel}\n`);

      if (gamificationResult.newAchievements && gamificationResult.newAchievements.length > 0) {
        console.log('🏆 ¡NUEVOS LOGROS DESBLOQUEADOS!');
        gamificationResult.newAchievements.forEach((achievement: any) => {
          console.log(`   ${achievement.icon} ${achievement.name} (+${achievement.points} XP)`);
        });
        console.log('');
      }

    } catch (error) {
      console.error('❌ Error en gamificación:', error);
    }
  } else {
    console.log('⚠️  Ejercicio no aprobado, no se otorga XP\n');
  }

  // 10. Verificar progreso DESPUÉS
  const progressAfter = await prisma.userProgress.findUnique({
    where: { userId: maria.id }
  });

  console.log('═══════════════════════════════════════════');
  console.log('📊 PROGRESO DESPUÉS DE COMPLETAR:');
  console.log('═══════════════════════════════════════════\n');
  console.log(`Total XP: ${progressAfter?.totalXP || 0} (${progressAfter ? '+' + (progressAfter.totalXP - (progressBefore?.totalXP || 0)) : '0'})`);
  console.log(`Nivel: ${progressAfter?.currentLevel || 1}`);
  console.log(`Ejercicios completados: ${progressAfter?.totalExercisesCompleted || 0} (${progressAfter ? '+' + (progressAfter.totalExercisesCompleted - (progressBefore?.totalExercisesCompleted || 0)) : '0'})\n`);

  await prisma.$disconnect();
  console.log('✅ Prueba completada con éxito!\n');
}

// Función auxiliar para evaluar ejercicios (copiada del controlador)
function evaluateGameExercise(
  type: any,
  config: any,
  answers: any
): { score: number; passed: boolean; feedback: any } {
  let correctCount = 0;
  let totalQuestions = 0;
  const feedback: any = {};

  switch (type) {
    case 'MULTIPLE_CHOICE':
      totalQuestions = config.questions?.length || 0;
      config.questions?.forEach((question: any, index: number) => {
        const userAnswer = answers[index];
        const correctAnswer = question.correctAnswer;
        const isCorrect = Array.isArray(correctAnswer)
          ? JSON.stringify(userAnswer?.sort()) === JSON.stringify(correctAnswer.sort())
          : userAnswer === correctAnswer;

        if (isCorrect) correctCount++;
        feedback[index] = {
          correct: isCorrect,
          correctAnswer,
          explanation: question.explanation,
        };
      });
      break;

    case 'TRUE_FALSE':
      totalQuestions = config.statements?.length || 0;
      config.statements?.forEach((statement: any, index: number) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === statement.correct;
        if (isCorrect) correctCount++;
        feedback[index] = {
          correct: isCorrect,
          correctAnswer: statement.correct,
          explanation: statement.explanation,
        };
      });
      break;

    case 'FILL_BLANKS':
      totalQuestions = config.blanks?.length || 0;
      config.blanks?.forEach((blank: any, index: number) => {
        const userAnswer = answers[index]?.toLowerCase().trim();
        const correctAnswers = blank.acceptedAnswers.map((a: string) => a.toLowerCase().trim());
        const isCorrect = correctAnswers.includes(userAnswer);
        if (isCorrect) correctCount++;
        feedback[index] = {
          correct: isCorrect,
          acceptedAnswers: blank.acceptedAnswers,
        };
      });
      break;

    case 'MATCHING_PAIRS':
      totalQuestions = config.pairs?.length || 0;
      config.pairs?.forEach((pair: any, index: number) => {
        const userMatch = answers[index];
        const isCorrect = userMatch === pair.match;
        if (isCorrect) correctCount++;
        feedback[index] = {
          correct: isCorrect,
          correctMatch: pair.match,
        };
      });
      break;

    case 'SEQUENCE_ORDER':
      totalQuestions = 1;
      const correctSequence = config.correctSequence || [];
      const userSequence = answers.sequence || [];
      const isCorrect = JSON.stringify(correctSequence) === JSON.stringify(userSequence);
      if (isCorrect) correctCount++;
      feedback.sequence = {
        correct: isCorrect,
        correctSequence,
      };
      break;

    case 'CODE_CHALLENGE':
      totalQuestions = 1;
      feedback.requiresReview = true;
      correctCount = 0.5;
      break;

    default:
      totalQuestions = 1;
  }

  const score = totalQuestions > 0 ? (correctCount / totalQuestions) * 10 : 0;
  const passed = score >= 5.0;

  return { score, passed, feedback };
}

testGameExerciseCompletion().catch(console.error);

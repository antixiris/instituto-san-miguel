import { Response } from 'express';
import { AuthRequest } from '../types';
import { PrismaClient, GameExerciseType } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener ejercicio gamificado de una lección
export const getGameExerciseByLesson = async (req: AuthRequest, res: Response) => {
  try {
    const { lessonId } = req.params;

    const gameExercise = await prisma.gameExercise.findUnique({
      where: { lessonId },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            moduleId: true,
          },
        },
      },
    });

    if (!gameExercise) {
      return res.status(404).json({
        success: false,
        error: 'No se encontró ejercicio gamificado para esta lección',
      });
    }

    // Parse config JSON
    const exerciseData = {
      ...gameExercise,
      config: JSON.parse(gameExercise.config),
    };

    res.json({
      success: true,
      data: exerciseData,
    });
  } catch (error) {
    console.error('Error fetching game exercise:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el ejercicio gamificado',
    });
  }
};

// Crear ejercicio gamificado para una lección
export const createGameExercise = async (req: AuthRequest, res: Response) => {
  try {
    const { lessonId } = req.params;
    const { type, title, instructions, config, points, timeLimit, isActive } = req.body;
    const userId = req.user?.id;

    // Validar que el usuario es ADMIN o PROFESOR
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'ADMIN' && user.role !== 'PROFESOR')) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para crear ejercicios',
      });
    }

    // Verificar que la lección existe
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        error: 'Lección no encontrada',
      });
    }

    // Si es profesor, verificar que es el instructor del curso
    if (user.role === 'PROFESOR' && lesson.module.course.instructorId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Solo el instructor del curso puede crear ejercicios',
      });
    }

    // Verificar que no existe ya un ejercicio gamificado para esta lección
    const existingExercise = await prisma.gameExercise.findUnique({
      where: { lessonId },
    });

    if (existingExercise) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un ejercicio gamificado para esta lección',
      });
    }

    // Crear el ejercicio
    const gameExercise = await prisma.gameExercise.create({
      data: {
        lessonId,
        type: type as GameExerciseType,
        title,
        instructions,
        config: JSON.stringify(config),
        points: points || 10,
        timeLimit,
        isActive: isActive !== undefined ? isActive : true,
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: {
        ...gameExercise,
        config: JSON.parse(gameExercise.config),
      },
    });
  } catch (error) {
    console.error('Error creating game exercise:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear el ejercicio gamificado',
    });
  }
};

// Actualizar ejercicio gamificado
export const updateGameExercise = async (req: AuthRequest, res: Response) => {
  try {
    const { exerciseId } = req.params;
    const { type, title, instructions, config, points, timeLimit, isActive } = req.body;
    const userId = req.user?.id;

    // Validar permisos
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'ADMIN' && user.role !== 'PROFESOR')) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para editar ejercicios',
      });
    }

    // Obtener ejercicio con información del curso
    const exercise = await prisma.gameExercise.findUnique({
      where: { id: exerciseId },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true,
              },
            },
          },
        },
      },
    });

    if (!exercise) {
      return res.status(404).json({
        success: false,
        error: 'Ejercicio no encontrado',
      });
    }

    // Si es profesor, verificar que es el instructor
    if (user.role === 'PROFESOR' && exercise.lesson.module.course.instructorId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Solo el instructor del curso puede editar este ejercicio',
      });
    }

    // Actualizar ejercicio
    const updatedExercise = await prisma.gameExercise.update({
      where: { id: exerciseId },
      data: {
        ...(type && { type: type as GameExerciseType }),
        ...(title && { title }),
        ...(instructions && { instructions }),
        ...(config && { config: JSON.stringify(config) }),
        ...(points !== undefined && { points }),
        ...(timeLimit !== undefined && { timeLimit }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: {
        ...updatedExercise,
        config: JSON.parse(updatedExercise.config),
      },
    });
  } catch (error) {
    console.error('Error updating game exercise:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el ejercicio',
    });
  }
};

// Eliminar ejercicio gamificado
export const deleteGameExercise = async (req: AuthRequest, res: Response) => {
  try {
    const { exerciseId } = req.params;
    const userId = req.user?.id;

    // Validar permisos
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'ADMIN' && user.role !== 'PROFESOR')) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para eliminar ejercicios',
      });
    }

    // Obtener ejercicio
    const exercise = await prisma.gameExercise.findUnique({
      where: { id: exerciseId },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true,
              },
            },
          },
        },
      },
    });

    if (!exercise) {
      return res.status(404).json({
        success: false,
        error: 'Ejercicio no encontrado',
      });
    }

    // Si es profesor, verificar que es el instructor
    if (user.role === 'PROFESOR' && exercise.lesson.module.course.instructorId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Solo el instructor del curso puede eliminar este ejercicio',
      });
    }

    // Eliminar ejercicio (esto también eliminará las submissions por CASCADE)
    await prisma.gameExercise.delete({
      where: { id: exerciseId },
    });

    res.json({
      success: true,
      message: 'Ejercicio eliminado correctamente',
    });
  } catch (error) {
    console.error('Error deleting game exercise:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el ejercicio',
    });
  }
};

// Enviar respuestas a un ejercicio gamificado
export const submitGameExercise = async (req: AuthRequest, res: Response) => {
  try {
    const { exerciseId } = req.params;
    const { answers, timeSpent } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Usuario no autenticado',
      });
    }

    // Obtener el ejercicio
    const exercise = await prisma.gameExercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      return res.status(404).json({
        success: false,
        error: 'Ejercicio no encontrado',
      });
    }

    if (!exercise.isActive) {
      return res.status(400).json({
        success: false,
        error: 'Este ejercicio no está activo',
      });
    }

    // Calcular número de intento
    const previousAttempts = await prisma.gameExerciseSubmission.count({
      where: {
        exerciseId,
        userId,
      },
    });

    const attempt = previousAttempts + 1;

    // Evaluar respuestas y calcular puntuación
    const config = JSON.parse(exercise.config);
    const evaluationResult = evaluateGameExercise(exercise.type, config, answers);

    // Crear la submission
    const submission = await prisma.gameExerciseSubmission.create({
      data: {
        exerciseId,
        userId,
        answers: JSON.stringify(answers),
        score: evaluationResult.score,
        totalPoints: exercise.points,
        passed: evaluationResult.passed,
        timeSpent,
        attempt,
      },
    });

    // Crear registro de calificación
    const lesson = await prisma.lesson.findUnique({
      where: { id: exercise.lessonId },
      include: {
        module: true,
      },
    });

    if (lesson) {
      await prisma.gradeRecord.create({
        data: {
          userId,
          courseId: lesson.module.courseId,
          moduleId: lesson.moduleId,
          lessonId: lesson.id,
          type: 'GAME_EXERCISE',
          score: evaluationResult.score,
          weight: 1.0,
          submissionId: submission.id,
        },
      });
    }

    res.json({
      success: true,
      data: {
        ...submission,
        answers: JSON.parse(submission.answers),
        feedback: evaluationResult.feedback,
      },
    });
  } catch (error) {
    console.error('Error submitting game exercise:', error);
    res.status(500).json({
      success: false,
      error: 'Error al enviar el ejercicio',
    });
  }
};

// Obtener submissions de un ejercicio (para el estudiante)
export const getMySubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const { exerciseId } = req.params;
    const userId = req.user?.id;

    const submissions = await prisma.gameExerciseSubmission.findMany({
      where: {
        exerciseId,
        userId,
      },
      orderBy: {
        completedAt: 'desc',
      },
    });

    const submissionsWithParsedAnswers = submissions.map(sub => ({
      ...sub,
      answers: JSON.parse(sub.answers),
    }));

    res.json({
      success: true,
      data: submissionsWithParsedAnswers,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los envíos',
    });
  }
};

// Obtener todas las submissions de un ejercicio (para instructor/admin)
export const getAllSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const { exerciseId } = req.params;
    const userId = req.user?.id;

    // Validar permisos
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'ADMIN' && user.role !== 'PROFESOR')) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para ver todas las submissions',
      });
    }

    const submissions = await prisma.gameExerciseSubmission.findMany({
      where: { exerciseId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        completedAt: 'desc',
      },
    });

    const submissionsWithParsedAnswers = submissions.map(sub => ({
      ...sub,
      answers: JSON.parse(sub.answers),
    }));

    res.json({
      success: true,
      data: submissionsWithParsedAnswers,
    });
  } catch (error) {
    console.error('Error fetching all submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los envíos',
    });
  }
};

// Función auxiliar para evaluar ejercicios según su tipo
function evaluateGameExercise(
  type: GameExerciseType,
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
      totalQuestions = 1; // Una sola pregunta de ordenamiento
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
      // Para código, simplemente guardamos la respuesta para revisión manual
      // o evaluación automática futura
      totalQuestions = 1;
      feedback.requiresReview = true;
      // Por ahora, dar puntos por intentar
      correctCount = 0.5;
      break;

    default:
      totalQuestions = 1;
  }

  const score = totalQuestions > 0 ? (correctCount / totalQuestions) * 10 : 0;
  const passed = score >= 5.0;

  return { score, passed, feedback };
}

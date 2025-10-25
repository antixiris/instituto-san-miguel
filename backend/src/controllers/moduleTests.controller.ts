import { Response } from 'express';
import { AuthRequest } from '../types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener test de un módulo
export const getModuleTest = async (req: AuthRequest, res: Response) => {
  try {
    const { moduleId } = req.params;

    const moduleTest = await prisma.moduleTest.findUnique({
      where: { moduleId },
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
        module: {
          select: {
            id: true,
            title: true,
            courseId: true,
          },
        },
      },
    });

    if (!moduleTest) {
      return res.status(404).json({
        success: false,
        error: 'No se encontró test para este módulo',
      });
    }

    // Parse JSON fields
    const testData = {
      ...moduleTest,
      questions: moduleTest.questions.map(q => ({
        ...q,
        options: JSON.parse(q.options),
        correctAnswer: JSON.parse(q.correctAnswer),
      })),
    };

    res.json({
      success: true,
      data: testData,
    });
  } catch (error) {
    console.error('Error fetching module test:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el test del módulo',
    });
  }
};

// Obtener test sin respuestas correctas (para estudiantes)
export const getModuleTestForStudent = async (req: AuthRequest, res: Response) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user?.id;

    const moduleTest = await prisma.moduleTest.findUnique({
      where: { moduleId },
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            question: true,
            options: true,
            order: true,
            points: true,
            // NO incluir correctAnswer ni explanation
          },
        },
        module: {
          select: {
            id: true,
            title: true,
            courseId: true,
          },
        },
      },
    });

    if (!moduleTest) {
      return res.status(404).json({
        success: false,
        error: 'No se encontró test para este módulo',
      });
    }

    if (!moduleTest.isActive) {
      return res.status(400).json({
        success: false,
        error: 'Este test no está activo',
      });
    }

    // Obtener información de intentos previos
    const submissions = await prisma.moduleTestSubmission.findMany({
      where: {
        testId: moduleTest.id,
        userId,
      },
      orderBy: {
        attempt: 'asc',
      },
      select: {
        id: true,
        score: true,
        passed: true,
        attempt: true,
        isFirstAttempt: true,
        completedAt: true,
      },
    });

    // Parse options JSON
    const testData = {
      ...moduleTest,
      questions: moduleTest.questions.map(q => ({
        ...q,
        options: JSON.parse(q.options),
      })),
      previousSubmissions: submissions,
      attemptCount: submissions.length,
    };

    res.json({
      success: true,
      data: testData,
    });
  } catch (error) {
    console.error('Error fetching module test for student:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el test',
    });
  }
};

// Crear test para un módulo
export const createModuleTest = async (req: AuthRequest, res: Response) => {
  try {
    const { moduleId } = req.params;
    const { title, description, passingScore, timeLimit, questions, isActive } = req.body;
    const userId = req.user?.id;

    // Validar permisos
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'ADMIN' && user.role !== 'PROFESOR')) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para crear tests',
      });
    }

    // Verificar que el módulo existe
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        course: true,
      },
    });

    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Módulo no encontrado',
      });
    }

    // Si es profesor, verificar que es el instructor
    if (user.role === 'PROFESOR' && module.course.instructorId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Solo el instructor del curso puede crear tests',
      });
    }

    // Verificar que no existe ya un test para este módulo
    const existingTest = await prisma.moduleTest.findUnique({
      where: { moduleId },
    });

    if (existingTest) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un test para este módulo',
      });
    }

    // Validar que hay exactamente 10 preguntas
    if (!questions || questions.length !== 10) {
      return res.status(400).json({
        success: false,
        error: 'El test debe tener exactamente 10 preguntas',
      });
    }

    // Validar que la suma de puntos es 10
    const totalPoints = questions.reduce((sum: number, q: any) => sum + (q.points || 1), 0);
    if (totalPoints !== 10) {
      return res.status(400).json({
        success: false,
        error: 'La suma de puntos de todas las preguntas debe ser 10',
      });
    }

    // Crear el test con sus preguntas
    const moduleTest = await prisma.moduleTest.create({
      data: {
        moduleId,
        title,
        description,
        passingScore: passingScore || 5.0,
        timeLimit,
        isActive: isActive !== undefined ? isActive : true,
        questions: {
          create: questions.map((q: any, index: number) => ({
            question: q.question,
            options: JSON.stringify(q.options),
            correctAnswer: JSON.stringify(q.correctAnswer),
            explanation: q.explanation,
            order: index,
            points: q.points || 1.0,
          })),
        },
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: {
        ...moduleTest,
        questions: moduleTest.questions.map(q => ({
          ...q,
          options: JSON.parse(q.options),
          correctAnswer: JSON.parse(q.correctAnswer),
        })),
      },
    });
  } catch (error) {
    console.error('Error creating module test:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear el test del módulo',
    });
  }
};

// Actualizar test de módulo
export const updateModuleTest = async (req: AuthRequest, res: Response) => {
  try {
    const { testId } = req.params;
    const { title, description, passingScore, timeLimit, isActive, questions } = req.body;
    const userId = req.user?.id;

    // Validar permisos
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'ADMIN' && user.role !== 'PROFESOR')) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para editar tests',
      });
    }

    // Obtener test con información del curso
    const test = await prisma.moduleTest.findUnique({
      where: { id: testId },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!test) {
      return res.status(404).json({
        success: false,
        error: 'Test no encontrado',
      });
    }

    // Si es profesor, verificar que es el instructor
    if (user.role === 'PROFESOR' && test.module.course.instructorId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Solo el instructor del curso puede editar este test',
      });
    }

    // Si se actualizan las preguntas, validar
    if (questions) {
      if (questions.length !== 10) {
        return res.status(400).json({
          success: false,
          error: 'El test debe tener exactamente 10 preguntas',
        });
      }

      const totalPoints = questions.reduce((sum: number, q: any) => sum + (q.points || 1), 0);
      if (totalPoints !== 10) {
        return res.status(400).json({
          success: false,
          error: 'La suma de puntos debe ser 10',
        });
      }

      // Eliminar preguntas antiguas y crear nuevas
      await prisma.moduleTestQuestion.deleteMany({
        where: { testId },
      });

      await prisma.moduleTestQuestion.createMany({
        data: questions.map((q: any, index: number) => ({
          testId,
          question: q.question,
          options: JSON.stringify(q.options),
          correctAnswer: JSON.stringify(q.correctAnswer),
          explanation: q.explanation,
          order: index,
          points: q.points || 1.0,
        })),
      });
    }

    // Actualizar test
    const updatedTest = await prisma.moduleTest.update({
      where: { id: testId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(passingScore !== undefined && { passingScore }),
        ...(timeLimit !== undefined && { timeLimit }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    res.json({
      success: true,
      data: {
        ...updatedTest,
        questions: updatedTest.questions.map(q => ({
          ...q,
          options: JSON.parse(q.options),
          correctAnswer: JSON.parse(q.correctAnswer),
        })),
      },
    });
  } catch (error) {
    console.error('Error updating module test:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el test',
    });
  }
};

// Eliminar test de módulo
export const deleteModuleTest = async (req: AuthRequest, res: Response) => {
  try {
    const { testId } = req.params;
    const userId = req.user?.id;

    // Validar permisos
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'ADMIN' && user.role !== 'PROFESOR')) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para eliminar tests',
      });
    }

    // Obtener test
    const test = await prisma.moduleTest.findUnique({
      where: { id: testId },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!test) {
      return res.status(404).json({
        success: false,
        error: 'Test no encontrado',
      });
    }

    // Si es profesor, verificar que es el instructor
    if (user.role === 'PROFESOR' && test.module.course.instructorId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Solo el instructor del curso puede eliminar este test',
      });
    }

    // Eliminar test (CASCADE eliminará preguntas y submissions)
    await prisma.moduleTest.delete({
      where: { id: testId },
    });

    res.json({
      success: true,
      message: 'Test eliminado correctamente',
    });
  } catch (error) {
    console.error('Error deleting module test:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el test',
    });
  }
};

// Enviar respuestas al test
export const submitModuleTest = async (req: AuthRequest, res: Response) => {
  try {
    const { testId } = req.params;
    const { answers, startedAt, timeSpent } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Usuario no autenticado',
      });
    }

    // Obtener el test con preguntas
    const test = await prisma.moduleTest.findUnique({
      where: { id: testId },
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
        module: true,
      },
    });

    if (!test) {
      return res.status(404).json({
        success: false,
        error: 'Test no encontrado',
      });
    }

    if (!test.isActive) {
      return res.status(400).json({
        success: false,
        error: 'Este test no está activo',
      });
    }

    // Calcular número de intento
    const previousAttempts = await prisma.moduleTestSubmission.count({
      where: {
        testId,
        userId,
      },
    });

    const attempt = previousAttempts + 1;
    const isFirstAttempt = attempt === 1;

    // Evaluar respuestas
    let totalScore = 0;
    const feedback: any = {};

    test.questions.forEach((question, index) => {
      const userAnswer = answers[question.id] || answers[index];
      const correctAnswer = JSON.parse(question.correctAnswer);

      // Comparar respuestas (pueden ser arrays para múltiples opciones)
      let isCorrect = false;
      if (Array.isArray(correctAnswer) && Array.isArray(userAnswer)) {
        isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(correctAnswer.sort());
      } else {
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
      }

      if (isCorrect) {
        totalScore += question.points;
      }

      feedback[question.id] = {
        correct: isCorrect,
        correctAnswer,
        explanation: question.explanation,
        pointsEarned: isCorrect ? question.points : 0,
      };
    });

    const passed = totalScore >= test.passingScore;

    // Crear submission
    const submission = await prisma.moduleTestSubmission.create({
      data: {
        testId,
        userId,
        answers: JSON.stringify(answers),
        score: totalScore,
        passed,
        attempt,
        isFirstAttempt,
        startedAt: startedAt ? new Date(startedAt) : new Date(),
        completedAt: new Date(),
        timeSpent,
      },
    });

    // Si es el primer intento, crear registro de calificación
    if (isFirstAttempt) {
      await prisma.gradeRecord.create({
        data: {
          userId,
          courseId: test.module.courseId,
          moduleId: test.moduleId,
          type: 'MODULE_TEST',
          score: totalScore,
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
        feedback,
        isFirstAttempt,
        countsForGrade: isFirstAttempt,
      },
    });
  } catch (error) {
    console.error('Error submitting module test:', error);
    res.status(500).json({
      success: false,
      error: 'Error al enviar el test',
    });
  }
};

// Obtener mis submissions de un test
export const getMyTestSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const { testId } = req.params;
    const userId = req.user?.id;

    const submissions = await prisma.moduleTestSubmission.findMany({
      where: {
        testId,
        userId,
      },
      orderBy: {
        attempt: 'asc',
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
    console.error('Error fetching test submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los envíos',
    });
  }
};

// Obtener todas las submissions de un test (para instructor/admin)
export const getAllTestSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const { testId } = req.params;
    const userId = req.user?.id;

    // Validar permisos
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'ADMIN' && user.role !== 'PROFESOR')) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para ver todas las submissions',
      });
    }

    const submissions = await prisma.moduleTestSubmission.findMany({
      where: { testId },
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
      orderBy: [
        { userId: 'asc' },
        { attempt: 'asc' },
      ],
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
    console.error('Error fetching all test submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los envíos',
    });
  }
};

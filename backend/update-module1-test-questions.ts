import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const questions = [
  {
    order: 1,
    question: '¿Cuál es la principal ventaja de Claude Code frente a otros asistentes de IA?',
    options: [
      'Genera código más rápido',
      'Comprende el contexto completo del proyecto sin explicaciones repetitivas',
      'Es más barato',
      'Funciona sin conexión a internet'
    ],
    correctAnswer: [1],
    explanation: 'Claude Code destaca por su capacidad de mantener el contexto completo del proyecto, permitiendo conversaciones naturales sin necesidad de repetir información.',
    points: 1.0
  },
  {
    order: 2,
    question: 'Según los casos de éxito mencionados, ¿en qué porcentaje redujo Sofía García su tiempo de desarrollo?',
    options: [
      '50%',
      '60%',
      '70%',
      '80%'
    ],
    correctAnswer: [2],
    explanation: 'Sofía García, desarrolladora junior, logró reducir su tiempo de desarrollo en un 70% utilizando Claude Code.',
    points: 1.0
  },
  {
    order: 3,
    question: '¿Cuántos desarrolladores utilizó la startup TechFlow para alcanzar una valoración de €10M?',
    options: [
      '1 desarrollador',
      '2 desarrolladores',
      '5 desarrolladores',
      '10 desarrolladores'
    ],
    correctAnswer: [1],
    explanation: 'TechFlow logró construir su plataforma SaaS completa con solo 2 desarrolladores más Claude Code, alcanzando €10M de valoración.',
    points: 1.0
  },
  {
    order: 4,
    question: '¿Qué capacidad de Claude Code se menciona como fundamental para el desarrollo?',
    options: [
      'Escribir código en múltiples lenguajes',
      'Encontrar bugs y sugerir optimizaciones',
      'Crear interfaces gráficas automáticamente',
      'Gestionar bases de datos'
    ],
    correctAnswer: [1],
    explanation: 'Entre las capacidades clave de Claude Code está encontrar bugs que podrías pasar por alto y sugerir optimizaciones que multiplican la productividad.',
    points: 1.0
  },
  {
    order: 5,
    question: '¿Cuánto tiempo tardó TechFlow en desarrollar su plataforma con Claude Code comparado con el tiempo estimado tradicional?',
    options: [
      '4 meses vs 12 meses',
      '4 meses vs 18 meses',
      '6 meses vs 18 meses',
      '3 meses vs 12 meses'
    ],
    correctAnswer: [1],
    explanation: 'TechFlow completó el desarrollo en 4 meses, cuando tradicionalmente se estimaban 18 meses.',
    points: 1.0
  },
  {
    order: 6,
    question: 'Según el curso, ¿qué representa Claude Code en el paradigma de la programación?',
    options: [
      'Una herramienta de autocompletado avanzada',
      'Un cambio de paradigma completo en el desarrollo',
      'Un editor de código mejorado',
      'Un depurador inteligente'
    ],
    correctAnswer: [1],
    explanation: 'Claude Code representa un cambio de paradigma completo, redefiniendo cómo se desarrolla software, no solo una herramienta más.',
    points: 1.0
  },
  {
    order: 7,
    question: '¿De cuánto a cuánto aumentó Laura Martínez sus ingresos anuales como freelancer usando Claude Code?',
    options: [
      'De €25k a €75k',
      'De €30k a €90k',
      'De €35k a €105k',
      'De €40k a €120k'
    ],
    correctAnswer: [2],
    explanation: 'Laura Martínez pasó de €35k a €105k anuales, triplicando sus ingresos gracias a poder completar más proyectos con mejor calidad.',
    points: 1.0
  },
  {
    order: 8,
    question: '¿Qué porcentaje de aumento tuvieron las ofertas de empleo que requieren experiencia con IA en 2025 vs 2023?',
    options: [
      '240%',
      '290%',
      '340%',
      '400%'
    ],
    correctAnswer: [2],
    explanation: 'Las ofertas de empleo que requieren experiencia con IA aumentaron un 340% en 2025 comparado con 2023.',
    points: 1.0
  },
  {
    order: 9,
    question: 'Según el modelo "Antes vs Después", ¿qué velocidad de desarrollo se alcanza con Claude Code?',
    options: [
      '2x-3x más rápido',
      '3x-5x más rápido',
      '5x-10x más rápido',
      '10x-20x más rápido'
    ],
    correctAnswer: [2],
    explanation: 'El curso indica que con Claude Code se alcanza una velocidad de desarrollo de 5x a 10x más rápido que el desarrollo tradicional.',
    points: 1.0
  },
  {
    order: 10,
    question: '¿Cuál es el rango salarial promedio mencionado para desarrolladores con experiencia en Claude Code/IA?',
    options: [
      '€45k - €75k',
      '€55k - €85k',
      '€65k - €95k',
      '€75k - €105k'
    ],
    correctAnswer: [2],
    explanation: 'El salario promedio para desarrolladores junior a mid-level con experiencia en Claude Code/IA se encuentra entre €65k y €95k.',
    points: 1.0
  }
];

async function updateTestQuestions() {
  try {
    // Buscar el test del módulo 1 del curso correcto
    const moduleTest = await prisma.moduleTest.findFirst({
      where: {
        module: {
          course: {
            slug: 'especialista-claude-code'
          },
          order: 1  // Módulo 1
        }
      },
      include: {
        questions: true,
        module: {
          include: {
            course: {
              select: {
                title: true,
                slug: true
              }
            }
          }
        }
      }
    });

    if (!moduleTest) {
      console.error('❌ No se encontró el test del módulo 1');
      return;
    }

    console.log(`📝 Test encontrado: ${moduleTest.title}`);
    console.log(`   Curso: ${moduleTest.module.course.title}`);
    console.log(`   Preguntas actuales: ${moduleTest.questions.length}\n`);

    // Eliminar preguntas existentes
    await prisma.moduleTestQuestion.deleteMany({
      where: {
        testId: moduleTest.id
      }
    });

    console.log('🗑️  Preguntas antiguas eliminadas\n');

    // Crear nuevas preguntas
    for (const q of questions) {
      await prisma.moduleTestQuestion.create({
        data: {
          testId: moduleTest.id,
          question: q.question,
          options: JSON.stringify(q.options),
          correctAnswer: JSON.stringify(q.correctAnswer),
          explanation: q.explanation,
          order: q.order,
          points: q.points
        }
      });
      console.log(`✅ Pregunta ${q.order} creada`);
    }

    console.log(`\n🎉 ${questions.length} preguntas nuevas creadas exitosamente`);

    // Verificar
    const updatedTest = await prisma.moduleTest.findUnique({
      where: { id: moduleTest.id },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    });

    console.log('\n📊 Verificación:');
    updatedTest?.questions.forEach((q, i) => {
      const opts = JSON.parse(q.options as string);
      console.log(`\n${i + 1}. ${q.question}`);
      console.log(`   Opciones: ${opts.length}`);
      console.log(`   Respuesta correcta: ${JSON.parse(q.correctAnswer as string)}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateTestQuestions();

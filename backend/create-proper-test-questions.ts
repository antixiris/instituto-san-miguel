import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 2 preguntas por cada una de las 5 lecciones del Módulo 1
const questions = [
  // LECCIÓN 1: Qué es Claude Code y por qué usarlo
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

  // LECCIÓN 2: Instalación y configuración del entorno
  {
    order: 3,
    question: '¿Cuál es la versión mínima de Node.js requerida para instalar Claude Code?',
    options: [
      'Node.js 12.0',
      'Node.js 14.0',
      'Node.js 16.0',
      'Node.js 18.0'
    ],
    correctAnswer: [2],
    explanation: 'Claude Code requiere Node.js versión 16.0 o superior para funcionar correctamente.',
    points: 1.0
  },
  {
    order: 4,
    question: '¿Cuánta RAM se recomienda tener como mínimo para trabajar con Claude Code?',
    options: [
      '2 GB',
      '4 GB (recomendado 8 GB)',
      '8 GB (recomendado 16 GB)',
      '16 GB'
    ],
    correctAnswer: [1],
    explanation: 'Los requisitos mínimos especifican 4 GB de RAM, aunque se recomiendan 8 GB para mejor rendimiento.',
    points: 1.0
  },

  // LECCIÓN 3: Primeros pasos: Tu primer proyecto con Claude
  {
    order: 5,
    question: '¿Cuál es el primer comando que se debe ejecutar para iniciar Claude Code?',
    options: [
      'claude start',
      'claude init',
      'claude begin',
      'claude run'
    ],
    correctAnswer: [1],
    explanation: 'El comando "claude init" es el primer paso para inicializar un nuevo proyecto con Claude Code.',
    points: 1.0
  },
  {
    order: 6,
    question: 'Al crear tu primer proyecto, ¿qué tipo de información debes proporcionar a Claude Code?',
    options: [
      'Solo el nombre del proyecto',
      'Nombre, tecnologías y objetivos del proyecto',
      'Solo las tecnologías a utilizar',
      'El presupuesto del proyecto'
    ],
    correctAnswer: [1],
    explanation: 'Para obtener mejores resultados, debes proporcionar contexto completo: nombre, tecnologías que usarás y objetivos del proyecto.',
    points: 1.0
  },

  // LECCIÓN 4: Interfaz y comandos básicos
  {
    order: 7,
    question: '¿Cuál es el comando para solicitar ayuda en Claude Code?',
    options: [
      '/help',
      'claude --help',
      'help',
      '/ayuda'
    ],
    correctAnswer: [0],
    explanation: 'El comando /help te muestra todos los comandos disponibles y cómo usarlos en Claude Code.',
    points: 1.0
  },
  {
    order: 8,
    question: '¿Qué panel de la interfaz muestra el historial de conversaciones?',
    options: [
      'Panel lateral izquierdo',
      'Panel lateral derecho',
      'Panel superior',
      'Panel inferior'
    ],
    correctAnswer: [0],
    explanation: 'El panel lateral izquierdo muestra el historial de conversaciones y proyectos anteriores.',
    points: 1.0
  },

  // LECCIÓN 5: Configuración de preferencias y ajustes
  {
    order: 9,
    question: '¿Qué archivo de configuración utiliza Claude Code para guardar tus preferencias?',
    options: [
      'config.json',
      '.clauderc',
      'settings.yml',
      'preferences.txt'
    ],
    correctAnswer: [1],
    explanation: 'Claude Code utiliza el archivo .clauderc para almacenar todas tus configuraciones y preferencias personalizadas.',
    points: 1.0
  },
  {
    order: 10,
    question: '¿Cuál es una de las mejores prácticas recomendadas desde el inicio?',
    options: [
      'Trabajar siempre en modo oscuro',
      'Definir convenciones de código claras en la configuración',
      'Usar solo JavaScript',
      'Evitar comentarios en el código'
    ],
    correctAnswer: [1],
    explanation: 'Una de las mejores prácticas fundamentales es definir convenciones de código claras desde el inicio para que Claude Code genere código consistente.',
    points: 1.0
  }
];

async function updateTestQuestions() {
  try {
    const moduleTest = await prisma.moduleTest.findFirst({
      where: {
        module: {
          course: {
            slug: 'especialista-claude-code'
          },
          order: 1
        }
      },
      include: {
        module: {
          include: {
            course: {
              select: { title: true }
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
    console.log(`   Curso: ${moduleTest.module.course.title}\n`);

    // Eliminar preguntas existentes
    await prisma.moduleTestQuestion.deleteMany({
      where: { testId: moduleTest.id }
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
    console.log('\n📊 Distribución:');
    console.log('   Lección 1: Preguntas 1-2');
    console.log('   Lección 2: Preguntas 3-4');
    console.log('   Lección 3: Preguntas 5-6');
    console.log('   Lección 4: Preguntas 7-8');
    console.log('   Lección 5: Preguntas 9-10');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateTestQuestions();

import { PrismaClient, GameExerciseType } from '@prisma/client';
import { getLessonContent } from './lesson-contents';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando población del curso "Especialista en Desarrollo con Claude Code"...');

  // Buscar o crear usuario instructor
  const instructor = await prisma.user.upsert({
    where: { email: 'raul@institutosanmiguel.com' },
    update: {},
    create: {
      email: 'raul@institutosanmiguel.com',
      firstName: 'Raúl',
      lastName: 'Alonso',
      password: '$2a$10$YourHashedPasswordHere', // Usar bcrypt en producción
      role: 'PROFESOR',
    },
  });

  console.log(`✓ Instructor: ${instructor.firstName} ${instructor.lastName}`);

  // Buscar o crear categoría de Programación
  const category = await prisma.category.upsert({
    where: { slug: 'programacion' },
    update: {},
    create: {
      name: 'Programación',
      slug: 'programacion',
      description: 'Cursos de desarrollo de software y programación',
      icon: '💻',
      color: '#3B82F6',
      order: 1,
    },
  });

  // Buscar o crear el curso
  const course = await prisma.course.upsert({
    where: { slug: 'especialista-claude-code' },
    update: {},
    create: {
      slug: 'especialista-claude-code',
      title: 'Especialista en Desarrollo con Claude Code',
      description: 'Domina el desarrollo de software con Claude Code, la herramienta de IA que revoluciona la programación moderna. Aprende a programar de forma profesional con la asistencia de inteligencia artificial, revolucionando tu productividad y llevando tus habilidades al siguiente nivel.',
      shortDescription: 'Aprende a programar de forma profesional con la asistencia de Claude Code, revolucionando tu productividad.',
      instructorId: instructor.id,
      categoryId: category.id,
      level: 'INTERMEDIATE',
      duration: 40,
      price: 199,
      thumbnail: '/courses/claude-code.jpg',
      published: true,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });

  console.log(`✓ Curso creado: ${course.title}`);

  // Estructura del curso: 8 módulos con 44 lecciones en total
  const courseStructure = [
    {
      title: 'Módulo 1: Introducción a Claude Code',
      description: 'Fundamentos y configuración inicial de Claude Code',
      lessons: [
        'Qué es Claude Code y por qué usarlo',
        'Instalación y configuración del entorno',
        'Primeros pasos: Tu primer proyecto con Claude',
        'Interfaz y comandos básicos',
        'Configuración de preferencias y ajustes',
      ],
    },
    {
      title: 'Módulo 2: Desarrollo Básico con Claude',
      description: 'Aprende a programar con la asistencia de Claude',
      lessons: [
        'Escribir código con Claude: mejores prácticas',
        'Refactorización asistida por IA',
        'Debugging y resolución de errores',
        'Generación de tests unitarios',
        'Documentación automática de código',
        'Ejercicio práctico: API REST básica',
      ],
    },
    {
      title: 'Módulo 3: Técnicas Avanzadas de Prompting',
      description: 'Domina el arte de comunicarte con Claude',
      lessons: [
        'Prompting efectivo para desarrollo',
        'Contexto y especificación de requisitos',
        'Iteración y refinamiento de código',
        'Manejo de proyectos complejos',
        'Patrones de diseño con Claude',
      ],
    },
    {
      title: 'Módulo 4: Desarrollo Frontend con Claude',
      description: 'Crea interfaces de usuario modernas',
      lessons: [
        'React + TypeScript con Claude',
        'Componentes reutilizables',
        'Estado y hooks en React',
        'Integración con APIs',
        'Diseño responsive con Tailwind CSS',
        'Proyecto: Dashboard interactivo',
      ],
    },
    {
      title: 'Módulo 5: Desarrollo Backend con Claude',
      description: 'Construye backends robustos y escalables',
      lessons: [
        'Node.js y Express con Claude',
        'Base de datos con Prisma ORM',
        'Autenticación y autorización JWT',
        'API RESTful: mejores prácticas',
        'Manejo de errores y validación',
        'Testing de backend',
      ],
    },
    {
      title: 'Módulo 6: Full Stack con Claude',
      description: 'Integra frontend y backend en proyectos completos',
      lessons: [
        'Arquitectura de aplicaciones full stack',
        'Comunicación cliente-servidor',
        'State management avanzado',
        'Deployment y CI/CD',
        'Monitoreo y logging',
        'Proyecto: E-commerce completo',
      ],
    },
    {
      title: 'Módulo 7: Productividad y Workflows',
      description: 'Optimiza tu flujo de trabajo con Claude',
      lessons: [
        'Git y control de versiones con Claude',
        'Code review asistido por IA',
        'Automatización de tareas repetitivas',
        'Scripts y herramientas CLI',
        'Integración con IDEs y editores',
        'Mejores prácticas de equipo',
      ],
    },
    {
      title: 'Módulo 8: Proyecto Final',
      description: 'Aplica todo lo aprendido en un proyecto real',
      lessons: [
        'Planificación del proyecto final',
        'Arquitectura y diseño del sistema',
        'Desarrollo iterativo con Claude',
        'Testing y quality assurance',
        'Deployment en producción',
        'Presentación y documentación del proyecto',
      ],
    },
  ];

  // Crear módulos, lecciones, ejercicios y tests
  for (let moduleIndex = 0; moduleIndex < courseStructure.length; moduleIndex++) {
    const moduleData = courseStructure[moduleIndex];

    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: moduleData.title,
        description: moduleData.description,
        order: moduleIndex + 1,
      },
    });

    console.log(`  ✓ ${module.title}`);

    // Crear lecciones del módulo
    for (let lessonIndex = 0; lessonIndex < moduleData.lessons.length; lessonIndex++) {
      const lessonTitle = moduleData.lessons[lessonIndex];

      const lesson = await prisma.lesson.create({
        data: {
          moduleId: module.id,
          title: lessonTitle,
          type: 'VIDEO',
          description: `Lección completa sobre ${lessonTitle.toLowerCase()} con ejemplos prácticos, código y ejercicios interactivos.`,
          content: getLessonContent(moduleIndex, lessonIndex, lessonTitle),
          videoUrl: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
          videoDuration: (15 + Math.floor(Math.random() * 20)) * 60, // En segundos
          order: lessonIndex + 1,
          isPublished: true,
        },
      });

      // Crear ejercicio gamificado para cada lección
      const exerciseType = getExerciseTypeForLesson(moduleIndex, lessonIndex);
      const exerciseConfig = generateExerciseConfig(exerciseType, lessonTitle, moduleIndex);

      await prisma.gameExercise.create({
        data: {
          lessonId: lesson.id,
          type: exerciseType,
          title: `Ejercicio: ${lessonTitle}`,
          instructions: getExerciseInstructions(exerciseType, lessonTitle),
          config: JSON.stringify(exerciseConfig),
          points: 10,
          timeLimit: 300,
          isActive: true,
        },
      });

      console.log(`    - Lección ${lessonIndex + 1}: ${lessonTitle}`);
    }

    // Crear test de módulo con 10 preguntas
    const moduleTest = await prisma.moduleTest.create({
      data: {
        moduleId: module.id,
        title: `Test de ${moduleData.title}`,
        description: `Responde las siguientes 10 preguntas sobre los contenidos del ${moduleData.title}. Tienes 10 minutos para completar el test. Solo tu primer intento contará para la nota final.`,
        timeLimit: 600,
        passingScore: 5.0,
        isActive: true,
      },
    });

    // Crear 10 preguntas para el test
    const questions = generateModuleTestQuestions(moduleData.title, moduleIndex);
    for (let q = 0; q < questions.length; q++) {
      await prisma.moduleTestQuestion.create({
        data: {
          testId: moduleTest.id,
          question: questions[q].question,
          options: JSON.stringify(questions[q].options),
          correctAnswer: JSON.stringify(questions[q].correctAnswer),
          explanation: questions[q].explanation,
          order: q + 1,
        },
      });
    }

    console.log(`    ✓ Test del módulo creado con 10 preguntas`);
  }

  console.log('\n✅ ¡Curso "Especialista en Desarrollo con Claude Code" poblado exitosamente!');
  console.log(`   - ${courseStructure.length} módulos`);
  console.log(`   - ${courseStructure.reduce((sum, m) => sum + m.lessons.length, 0)} lecciones`);
  console.log(`   - ${courseStructure.reduce((sum, m) => sum + m.lessons.length, 0)} ejercicios gamificados`);
  console.log(`   - ${courseStructure.length} tests de módulo`);
}

// Funciones auxiliares para generar contenido

function getExerciseTypeForLesson(moduleIndex: number, lessonIndex: number): GameExerciseType {
  const types: GameExerciseType[] = [
    'MULTIPLE_CHOICE',
    'TRUE_FALSE',
    'FILL_BLANKS',
    'MATCHING_PAIRS',
    'SEQUENCE_ORDER',
    'CODE_CHALLENGE',
  ];

  // Distribuir tipos de ejercicios de manera variada
  const index = (moduleIndex * 7 + lessonIndex) % types.length;
  return types[index];
}

function getExerciseInstructions(type: GameExerciseType, lessonTitle: string): string {
  const instructions: Record<GameExerciseType, string> = {
    MULTIPLE_CHOICE: `Selecciona la respuesta correcta para cada pregunta sobre ${lessonTitle}.`,
    TRUE_FALSE: `Indica si las siguientes afirmaciones sobre ${lessonTitle} son verdaderas o falsas.`,
    FILL_BLANKS: `Completa los espacios en blanco con los conceptos clave de ${lessonTitle}.`,
    MATCHING_PAIRS: `Relaciona los conceptos con sus definiciones correctas.`,
    SEQUENCE_ORDER: `Ordena los pasos o conceptos en el orden correcto.`,
    CODE_CHALLENGE: `Completa el desafío de código aplicando lo aprendido en ${lessonTitle}.`,
  };

  return instructions[type];
}

function generateExerciseConfig(type: GameExerciseType, lessonTitle: string, moduleIndex: number): any {
  switch (type) {
    case 'MULTIPLE_CHOICE':
      return {
        questions: [
          {
            question: `¿Cuál es el concepto principal de ${lessonTitle}?`,
            options: [
              'Opción correcta relacionada con el tema',
              'Opción incorrecta pero plausible',
              'Otra opción incorrecta',
              'Opción claramente incorrecta',
            ],
            correctAnswer: 0,
            explanation: 'Esta es la respuesta correcta porque se alinea con los principios fundamentales explicados en la lección.',
          },
        ],
      };

    case 'TRUE_FALSE':
      return {
        statements: [
          {
            statement: `${lessonTitle} es fundamental para el desarrollo moderno`,
            correct: true,
            explanation: 'Correcto, este concepto es esencial en el desarrollo actual.',
          },
          {
            statement: 'Claude Code no puede ayudar con este tema',
            correct: false,
            explanation: 'Falso, Claude Code es muy útil para este tipo de tareas.',
          },
        ],
      };

    case 'FILL_BLANKS':
      return {
        text: `El concepto de ___ es fundamental en ${lessonTitle}, y se implementa mediante ___.`,
        blanks: [
          { position: 0, acceptedAnswers: ['concepto', 'principio'] },
          { position: 1, acceptedAnswers: ['práctica', 'implementación'] },
        ],
      };

    case 'MATCHING_PAIRS':
      return {
        pairs: [
          { item: 'Concepto A', match: 'Definición A' },
          { item: 'Concepto B', match: 'Definición B' },
          { item: 'Concepto C', match: 'Definición C' },
        ],
      };

    case 'SEQUENCE_ORDER':
      return {
        items: [
          'Primer paso del proceso',
          'Segundo paso del proceso',
          'Tercer paso del proceso',
          'Cuarto paso final',
        ],
        correctSequence: [0, 1, 2, 3],
      };

    case 'CODE_CHALLENGE':
      return {
        prompt: `Implementa una función que demuestre el concepto de ${lessonTitle}`,
        language: 'javascript',
        starterCode: `function ejercicio() {\n  // Tu código aquí\n  \n  return resultado;\n}`,
        testCases: [],
      };

    default:
      return {};
  }
}

function generateModuleTestQuestions(moduleTitle: string, moduleIndex: number): any[] {
  const questions = [];

  for (let i = 0; i < 10; i++) {
    questions.push({
      question: `Pregunta ${i + 1}: ¿Cuál de las siguientes afirmaciones sobre ${moduleTitle} es correcta?`,
      options: [
        `Respuesta correcta que refleja el contenido del ${moduleTitle}`,
        'Respuesta incorrecta pero relacionada con el tema',
        'Otra respuesta incorrecta con concepto similar',
        'Respuesta claramente incorrecta',
      ],
      correctAnswer: 0,
      explanation: `La opción correcta es la primera porque se alinea con los conceptos explicados en el ${moduleTitle}.`,
    });
  }

  // Añadir algunas preguntas de respuesta múltiple
  questions[3] = {
    question: `¿Cuáles de las siguientes son características clave de ${moduleTitle}? (Selecciona todas las correctas)`,
    options: [
      'Característica fundamental 1',
      'Característica fundamental 2',
      'Característica incorrecta',
      'Otra característica incorrecta',
    ],
    correctAnswer: [0, 1],
    explanation: 'Las dos primeras opciones son características fundamentales explicadas en el módulo.',
  };

  questions[7] = {
    question: 'En el contexto de Claude Code, ¿cuáles herramientas son esenciales? (Selecciona todas)',
    options: [
      'Prompting efectivo',
      'Iteración de código',
      'Programación manual sin asistencia',
      'Ignorar las sugerencias de la IA',
    ],
    correctAnswer: [0, 1],
    explanation: 'Las primeras dos opciones son prácticas esenciales cuando trabajas con Claude Code.',
  };

  return questions;
}

main()
  .catch((e) => {
    console.error('❌ Error al poblar el curso:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

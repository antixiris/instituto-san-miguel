const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateModule2Test() {
  try {
    // Encontrar el módulo 2
    const modules = await prisma.module.findMany({
      where: {
        course: { slug: 'especialista-claude-code' }
      },
      include: {
        moduleTest: {
          include: { questions: true }
        }
      },
      orderBy: { order: 'asc' }
    });

    const module2 = modules.find(m => m.order === 2);

    if (!module2 || !module2.moduleTest) {
      console.error('No se encontró el test del módulo 2');
      return;
    }

    console.log('Test encontrado:', module2.moduleTest.id);
    console.log('Eliminando preguntas antiguas...');

    // Eliminar todas las preguntas antiguas
    await prisma.moduleTestQuestion.deleteMany({
      where: { testId: module2.moduleTest.id }
    });

    console.log('Creando nuevas preguntas...');

    // Crear las nuevas preguntas
    const questions = [
      {
        order: 1,
        question: '¿Cuál es la mejor práctica al escribir prompts para Claude Code?',
        type: 'SINGLE',
        options: [
          'Ser específico, proporcionar contexto y dividir tareas complejas en pasos más simples',
          'Usar prompts muy generales para que Claude tenga libertad creativa',
          'Escribir todo en mayúsculas para enfatizar la importancia',
          'Solicitar todo el código de una vez sin iterar'
        ],
        correctAnswer: [0],
        explanation: 'Los prompts efectivos son específicos, proporcionan contexto claro y dividen tareas complejas en pasos manejables.'
      },
      {
        order: 2,
        question: '¿Qué ventaja principal ofrece Claude Code en la refactorización de código?',
        type: 'SINGLE',
        options: [
          'Puede analizar el código existente, sugerir mejoras y aplicar patrones de diseño modernos manteniendo la funcionalidad',
          'Reescribe todo el código desde cero sin considerar la lógica original',
          'Solo funciona con lenguajes de programación antiguos',
          'Elimina automáticamente todo el código que considera innecesario'
        ],
        correctAnswer: [0],
        explanation: 'Claude Code puede analizar código existente, identificar áreas de mejora y sugerir refactorizaciones que apliquen buenas prácticas y patrones modernos sin romper la funcionalidad.'
      },
      {
        order: 3,
        question: 'Al debugging con Claude Code, ¿cuál es el enfoque más efectivo?',
        type: 'SINGLE',
        options: [
          'Proporcionar el mensaje de error completo, el código relevante y explicar qué se esperaba que sucediera',
          'Solo copiar el mensaje de error sin contexto adicional',
          'Reiniciar el IDE y esperar que el error desaparezca',
          'Borrar todo el código y empezar de nuevo'
        ],
        correctAnswer: [0],
        explanation: 'Para debugging efectivo, es crucial proporcionar contexto completo: el error, el código relacionado y el comportamiento esperado vs el actual.'
      },
      {
        order: 4,
        question: '¿Cuáles son beneficios de generar tests unitarios con Claude Code? (Selecciona todas las correctas)',
        type: 'MULTIPLE',
        options: [
          'Genera tests que cubren casos edge y escenarios de error',
          'Sigue las convenciones del framework de testing usado',
          'Elimina la necesidad de entender qué están probando los tests',
          'Garantiza 100% de cobertura sin revisar la lógica'
        ],
        correctAnswer: [0, 1],
        explanation: 'Claude Code puede generar tests comprehensivos que siguen las convenciones del framework, pero siempre se debe revisar y entender los tests generados.'
      },
      {
        order: 5,
        question: '¿Qué puede hacer Claude Code en cuanto a documentación de código?',
        type: 'SINGLE',
        options: [
          'Generar comentarios JSDoc, README, y documentación de API basándose en el código existente',
          'Solo puede comentar una línea a la vez',
          'Requiere que toda la documentación esté escrita manualmente primero',
          'No puede generar documentación, solo código'
        ],
        correctAnswer: [0],
        explanation: 'Claude Code puede analizar código y generar documentación completa en varios formatos incluyendo JSDoc, READMEs y documentación de APIs.'
      },
      {
        order: 6,
        question: 'Al crear una API REST con Claude Code, ¿qué elementos puede ayudar a implementar?',
        type: 'MULTIPLE',
        options: [
          'Rutas y controladores con validación de datos',
          'Middleware de autenticación y manejo de errores',
          'Modelos de base de datos y migraciones',
          'Instalación automática del sistema operativo'
        ],
        correctAnswer: [0, 1, 2],
        explanation: 'Claude Code puede asistir en todos los aspectos del desarrollo de una API REST: rutas, controladores, validación, autenticación, modelos y manejo de errores.'
      },
      {
        order: 7,
        question: '¿Cuál es una característica importante de trabajar iterativamente con Claude Code?',
        type: 'SINGLE',
        options: [
          'Revisar el código generado, probarlo, y refinar el prompt basándose en los resultados',
          'Aceptar siempre la primera versión del código sin revisión',
          'Esperar semanas antes de hacer modificaciones',
          'No comunicar problemas encontrados en el código generado'
        ],
        correctAnswer: [0],
        explanation: 'El desarrollo iterativo con Claude Code implica revisar, probar y refinar continuamente, proporcionando feedback para mejorar los resultados.'
      },
      {
        order: 8,
        question: '¿Qué tipo de patrones de código puede identificar y sugerir Claude Code durante la refactorización?',
        type: 'MULTIPLE',
        options: [
          'Patrones de diseño como Singleton, Factory, Observer',
          'Principios SOLID y Clean Code',
          'Optimizaciones de rendimiento y uso de memoria',
          'Patrones de clima y predicción meteorológica'
        ],
        correctAnswer: [0, 1, 2],
        explanation: 'Claude Code puede identificar y sugerir implementación de patrones de diseño, principios SOLID, Clean Code y optimizaciones de rendimiento.'
      },
      {
        order: 9,
        question: 'Al generar tests unitarios, ¿qué aspectos es importante que Claude Code cubra?',
        type: 'MULTIPLE',
        options: [
          'Casos de éxito (happy paths)',
          'Casos de error y excepciones',
          'Validación de inputs y outputs',
          'Tests que siempre pasen sin importar el código'
        ],
        correctAnswer: [0, 1, 2],
        explanation: 'Tests comprehensivos deben cubrir casos de éxito, manejo de errores, y validación de datos de entrada y salida.'
      },
      {
        order: 10,
        question: '¿Cuál es el enfoque correcto al usar Claude Code para debugging de errores complejos?',
        type: 'SINGLE',
        options: [
          'Dividir el problema en partes más pequeñas, aislar el error y proporcionar contexto del flujo de ejecución',
          'Copiar todo el proyecto completo sin indicar dónde está el error',
          'Esperar que Claude adivine el problema sin información',
          'Solo mostrar el código que funciona correctamente'
        ],
        correctAnswer: [0],
        explanation: 'Para debugging complejo, es efectivo dividir el problema, aislar el componente problemático y proporcionar contexto del flujo de ejecución y estado de la aplicación.'
      }
    ];

    // Crear todas las preguntas
    for (const q of questions) {
      await prisma.moduleTestQuestion.create({
        data: {
          testId: module2.moduleTest.id,
          order: q.order,
          question: q.question,
          type: q.type, // SINGLE o MULTIPLE
          options: JSON.stringify(q.options),
          correctAnswer: JSON.stringify(q.correctAnswer),
          explanation: q.explanation,
          points: 10 // 10 puntos por pregunta = 100 puntos total
        }
      });
    }

    console.log('\n✅ Test actualizado exitosamente');
    console.log('Total de preguntas:', questions.length);
    console.log('Puntos totales:', questions.length * 10);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateModule2Test();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateModule3Test() {
  console.log('🎬 Actualizando test del Módulo 3 con preguntas reales...\n');

  // Obtener el módulo 3
  const course = await prisma.course.findFirst({
    where: { slug: 'especialista-claude-code' },
    include: {
      modules: {
        where: { order: 3 },
        include: {
          moduleTest: {
            include: {
              questions: true
            }
          }
        }
      }
    }
  });

  if (!course || !course.modules[0]) {
    console.log('❌ No se encontró el módulo 3');
    return;
  }

  const module3 = course.modules[0];
  const test = module3.moduleTest;

  if (!test) {
    console.log('❌ No se encontró el test del módulo 3');
    return;
  }

  console.log('📦 Módulo:', module3.title);
  console.log('📝 Test:', test.title);
  console.log('❓ Preguntas actuales:', test.questions.length);

  // Eliminar preguntas antiguas
  console.log('\n🗑️  Eliminando preguntas antiguas...');
  await prisma.moduleTestQuestion.deleteMany({
    where: { testId: test.id }
  });

  // Crear preguntas reales basadas en el contenido del módulo 3
  const questions = [
    // Lección 1: Prompting efectivo
    {
      question: '¿Cuál es la característica principal de un prompt efectivo?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Ser lo más corto posible',
        'Ser claro, específico y proporcionar contexto completo',
        'Usar lenguaje técnico avanzado',
        'Incluir múltiples tareas en un solo prompt'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'Un prompt efectivo debe ser claro, específico y proporcionar contexto completo. Es como la diferencia entre pedir "un café" y pedir "un café americano, grande, sin azúcar" - la especificidad asegura que recibas exactamente lo que necesitas.',
      points: 10,
      order: 1
    },
    {
      question: 'Según la lección sobre prompting, ¿qué analogía se usa para explicar la importancia de pedir bien?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Un arquitecto pidiendo materiales',
        'Un arquitecto explicando cómo construir una casa',
        'Un chef siguiendo una receta',
        'Un estudiante haciendo un examen'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'La lección usa la analogía del arquitecto que le pide al constructor que construya "una casa bonita" vs dar especificaciones completas (dos pisos, tres habitaciones, estilo moderno, etc.). Esta comparación ilustra cómo la especificidad mejora los resultados.',
      points: 10,
      order: 2
    },

    // Lección 2: Contexto y especificación
    {
      question: '¿Por qué es importante dar contexto a Claude al solicitar código?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Para que el código sea más largo y complejo',
        'Para que Claude entienda el propósito, usuarios y conexiones con otras partes del sistema',
        'Para impresionar con conocimientos técnicos',
        'No es importante, solo importa describir la funcionalidad'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'El contexto es fundamental porque transforma un pedido vago en una solución perfecta. Como ir al médico - no basta con decir "me duele", necesitas explicar dónde, desde cuándo, qué estabas haciendo, etc. Esta información adicional permite un diagnóstico correcto.',
      points: 10,
      order: 3
    },
    {
      question: '¿Cuáles elementos deben incluirse al proporcionar contexto completo? (Selecciona todas las correctas)',
      type: 'MULTIPLE',
      options: JSON.stringify([
        'Para qué se usará el código',
        'Quién lo usará',
        'Cómo se conecta con otras partes',
        'Solo la funcionalidad básica'
      ]),
      correctAnswer: JSON.stringify([0, 1, 2]),
      explanation: 'Un contexto completo incluye: para qué se usará, quién lo usará, y cómo se conecta con otras partes del sistema. Dar solo la funcionalidad básica sin contexto es insuficiente - la lección compara esto con la diferencia entre dos estudiantes pidiendo "guardar datos de usuarios" con y sin contexto.',
      points: 10,
      order: 4
    },

    // Lección 3: Iteración y refinamiento
    {
      question: '¿Qué significa "iterar" en el desarrollo de código con Claude?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Escribir código perfecto en el primer intento',
        'Mejorar el código progresivamente en ciclos de refinamiento',
        'Copiar y pegar código de internet',
        'Reescribir todo desde cero cada vez'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'Iterar es el proceso de mejorar progresivamente. Los programadores profesionales NO escriben código perfecto a la primera - lo hacen funcionar primero, luego lo mejoran. Con Claude es fácil: "Esto está bien, pero mejora esta parte". Es como escribir un ensayo que corriges 3 o 4 veces.',
      points: 10,
      order: 5
    },
    {
      question: '¿Cuáles son ventajas de iterar en lugar de buscar perfección inmediata? (Selecciona todas las correctas)',
      type: 'MULTIPLE',
      options: JSON.stringify([
        'Empiezas con algo que funciona aunque sea simple',
        'Puedes probar y ajustar progresivamente',
        'Mantienes lo que funciona mientras mejoras lo demás',
        'Es más rápido llegar a la solución perfecta de golpe'
      ]),
      correctAnswer: JSON.stringify([0, 1, 2]),
      explanation: 'La iteración permite: empezar con algo funcional y simple, probar y ajustar progresivamente, y mantener lo que funciona. La lección usa la analogía de aprender a cocinar - no intentas un platillo de chef con 20 ingredientes al principio, empiezas simple y vas mejorando.',
      points: 10,
      order: 6
    },

    // Lección 4: Proyectos complejos
    {
      question: 'Según la lección, ¿cómo se debe abordar un proyecto complejo?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Intentar hacerlo todo de una vez',
        'Dividirlo en tareas pequeñas y manejables (bocados del elefante)',
        'Esperar a tener todo planificado perfectamente',
        'Pedir ayuda solo cuando estés bloqueado'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'La lección usa el dicho "¿Cómo te comes un elefante? De a un bocado a la vez". Los proyectos grandes se dividen en partes pequeñas y manejables. Nadie hace proyectos grandes de golpe - el secreto es dividir el elefante en bocados del tamaño correcto.',
      points: 10,
      order: 7
    },
    {
      question: '¿Qué habilidades son clave para manejar proyectos complejos con Claude? (Selecciona todas las correctas)',
      type: 'MULTIPLE',
      options: JSON.stringify([
        'Descomponer proyectos grandes en pasos pequeños',
        'Priorizar funcionalidades (qué hacer primero)',
        'Mantener el contexto en conversaciones largas',
        'Memorizar todo el código generado'
      ]),
      correctAnswer: JSON.stringify([0, 1, 2]),
      explanation: 'Las habilidades clave son: descomponer proyectos en pasos pequeños, priorizar funcionalidades, y mantener el contexto. No necesitas memorizar el código - lo importante es saber dividir el trabajo y organizar el proyecto efectivamente.',
      points: 10,
      order: 8
    },

    // Lección 5: Patrones de diseño
    {
      question: '¿Qué son los patrones de diseño en programación?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Diseños gráficos para interfaces',
        'Soluciones probadas para problemas comunes que se repiten',
        'Plantillas de código para copiar y pegar',
        'Reglas estrictas que siempre hay que seguir'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'Los patrones de diseño son soluciones probadas para problemas comunes. La lección usa la analogía de las ruedas de bicicleta - no inventas una forma nueva, usas ruedas redondas porque funcionan. Son como recetas de cocina: procesos probados para situaciones comunes.',
      points: 10,
      order: 9
    },
    {
      question: '¿Cuál es la ventaja de usar patrones de diseño con Claude Code?',
      type: 'SINGLE',
      options: JSON.stringify([
        'No necesitas memorizarlos, solo saber que existen y cuándo pedirlos',
        'El código será más complicado e impresionante',
        'Reemplaza la necesidad de aprender a programar',
        'Garantiza que el código nunca tendrá errores'
      ]),
      correctAnswer: JSON.stringify([0]),
      explanation: 'La belleza de trabajar con Claude es que no necesitas memorizar patrones - solo necesitas saber que existen, cuándo usarlos, y cómo pedirle a Claude que los implemente. Claude puede generar patrones adaptados a tu nivel de experiencia.',
      points: 10,
      order: 10
    }
  ];

  // Insertar nuevas preguntas
  console.log('\n✨ Creando preguntas reales basadas en el contenido...\n');

  for (const questionData of questions) {
    await prisma.moduleTestQuestion.create({
      data: {
        testId: test.id,
        ...questionData
      }
    });

    console.log(`✅ Pregunta ${questionData.order}: ${questionData.question.substring(0, 60)}...`);
    console.log(`   Tipo: ${questionData.type}`);
  }

  console.log('\n═══════════════════════════════════════════');
  console.log('✅ TEST MÓDULO 3 ACTUALIZADO');
  console.log('═══════════════════════════════════════════');
  console.log(`📊 Total preguntas: ${questions.length}`);
  console.log(`📝 Distribución:`);
  console.log(`   - SINGLE: ${questions.filter(q => q.type === 'SINGLE').length}`);
  console.log(`   - MULTIPLE: ${questions.filter(q => q.type === 'MULTIPLE').length}`);
  console.log(`💯 Puntuación total: 100 puntos`);
  console.log('═══════════════════════════════════════════');

  await prisma.$disconnect();
}

updateModule3Test()
  .then(() => {
    console.log('\n🎉 Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

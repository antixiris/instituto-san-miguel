const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateModule6Test() {
  console.log('🎬 Actualizando test del Módulo 6 con preguntas reales...\n');

  // Obtener el módulo 6
  const course = await prisma.course.findFirst({
    where: { slug: 'especialista-claude-code' },
    include: {
      modules: {
        where: { order: 6 },
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
    console.log('❌ No se encontró el módulo 6');
    return;
  }

  const module6 = course.modules[0];
  const test = module6.moduleTest;

  if (!test) {
    console.log('❌ No se encontró el test del módulo 6');
    return;
  }

  console.log('📦 Módulo:', module6.title);
  console.log('📝 Test:', test.title);
  console.log('❓ Preguntas actuales:', test.questions.length);

  // Eliminar preguntas antiguas
  console.log('\n🗑️  Eliminando preguntas antiguas...');
  await prisma.moduleTestQuestion.deleteMany({
    where: { testId: test.id }
  });

  // Crear preguntas reales basadas en el contenido refactorizado del módulo 6
  const questions = [
    // Lección 1: Node.js y Express
    {
      question: '¿Qué es Express y cuál es su analogía según la lección?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Un lenguaje de programación nuevo para backend',
        'Un framework (conjunto de herramientas) que facilita crear servidores web con Node.js',
        'Una base de datos NoSQL',
        'Un editor de código para JavaScript'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'Express es un framework (conjunto de herramientas) que hace súper fácil crear servidores web con Node.js. La analogía: Node.js es el idioma que hablas (JavaScript), y Express es el libro de frases útiles.',
      points: 10,
      order: 1
    },
    {
      question: 'En el workflow "Blog API", ¿qué funcionalidades principales se implementaron?',
      type: 'MULTIPLE',
      options: JSON.stringify([
        'CRUD completo para posts y comments',
        'Búsqueda con filtros y paginación',
        'Estadísticas (total posts/comments, top authors)',
        'Sistema de pagos con Stripe'
      ]),
      correctAnswer: JSON.stringify([0, 1, 2]),
      explanation: 'El Blog API incluye: CRUD de posts/comments, búsqueda con filtros y paginación, y estadísticas. Sistema de pagos no fue parte de ese workflow, es contenido de módulos más avanzados.',
      points: 10,
      order: 2
    },

    // Lección 2: Prisma ORM
    {
      question: '¿Qué es Prisma y cuál es su ventaja principal?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Una base de datos SQL',
        'Un ORM (Object-Relational Mapper) que traduce código JavaScript a SQL con tipado TypeScript',
        'Un framework de frontend',
        'Una herramienta de testing'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'Prisma es un ORM (Object-Relational Mapper) que traduce código JavaScript/TypeScript a SQL. Su ventaja principal es el tipado automático: TypeScript sabe exactamente qué campos tiene cada modelo.',
      points: 10,
      order: 3
    },
    {
      question: '¿Qué error común se previene al usar "include" y "select" correctamente en Prisma?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Errores de sintaxis SQL',
        'Over-fetching (traer más datos de los necesarios)',
        'Problemas de autenticación',
        'Bugs de CSS en el frontend'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'Usar "include" y "select" correctamente previene el over-fetching (traer más datos de los necesarios). Por ejemplo, si solo necesitas email y nombre, no traigas 20 campos innecesarios. Esto mejora performance y seguridad.',
      points: 10,
      order: 4
    },

    // Lección 3: JWT Authentication
    {
      question: '¿Qué son los Access Tokens y Refresh Tokens en el sistema de autenticación?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Dos nombres para la misma cosa',
        'Access Token dura poco (15min), Refresh Token dura más (7 días) y renueva el Access',
        'Solo se usa Refresh Token',
        'Son tipos de cookies HTTP'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'Access Token dura poco (ej: 15 minutos) para acceder a recursos protegidos. Refresh Token dura más (ej: 7 días) y se usa para obtener nuevos Access Tokens sin pedir login nuevamente. Esto balancea seguridad y UX.',
      points: 10,
      order: 5
    },
    {
      question: '¿Qué incluye el sistema RBAC (Role-Based Access Control) creado en la lección?',
      type: 'MULTIPLE',
      options: JSON.stringify([
        'Roles diferentes (admin, editor, user)',
        'Middleware requireRole(["admin"]) para proteger rutas',
        'Permisos granulares por recurso',
        'Diseño CSS responsive'
      ]),
      correctAnswer: JSON.stringify([0, 1, 2]),
      explanation: 'RBAC incluye: roles diferentes (admin, editor, user), middleware requireRole para proteger rutas, y permisos granulares por recurso. CSS responsive no es parte de autenticación/autorización.',
      points: 10,
      order: 6
    },

    // Lección 4: REST API Best Practices
    {
      question: '¿Qué es la paginación cursor-based y cuándo es mejor que offset?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Es lo mismo que offset',
        'Usa un cursor (ID del último item) para traer siguientes resultados, mejor para datos que cambian frecuentemente',
        'Solo funciona con MongoDB',
        'Es más lenta que offset siempre'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'Paginación cursor-based usa un cursor (ej: ID del último item visto) para traer siguientes resultados. Es mejor que offset cuando los datos cambian frecuentemente, porque offset puede saltar o duplicar items.',
      points: 10,
      order: 7
    },
    {
      question: '¿Por qué es importante el versionado de API (/api/v1, /api/v2)?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Solo para que se vea más profesional',
        'Permite hacer breaking changes sin romper clientes que usan la versión antigua',
        'Es obligatorio por ley',
        'Hace la API más rápida'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'El versionado permite hacer breaking changes (cambios que rompen compatibilidad) sin afectar a clientes que usan la versión antigua. Por ejemplo: v1 devuelve "fullName", v2 devuelve "firstName" + "lastName" por separado.',
      points: 10,
      order: 8
    },

    // Lección 5: Error Handling & Validation
    {
      question: '¿Qué ventaja tiene crear clases custom de errores (ValidationError, AuthError, etc.)?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Solo para escribir más código',
        'Permite identificar el tipo de error y dar respuestas HTTP correctas (400, 401, 404, etc.)',
        'Hace el código más lento',
        'No tiene ventajas reales'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'Clases custom de errores permiten identificar el tipo exacto de error y dar la respuesta HTTP correcta: ValidationError → 400, AuthError → 401, NotFoundError → 404. Esto mejora la experiencia del cliente (frontend).',
      points: 10,
      order: 9
    },
    {
      question: '¿Qué herramientas se usan para validación y logging en el workflow enterprise?',
      type: 'MULTIPLE',
      options: JSON.stringify([
        'Zod para validación de schemas',
        'Winston para logging estructurado',
        'Sentry para tracking de errores en producción',
        'React para el frontend'
      ]),
      correctAnswer: JSON.stringify([0, 1, 2]),
      explanation: 'Se usan: Zod (validación de schemas TypeScript), Winston (logging estructurado con niveles y transports), y Sentry (tracking de errores en producción con stack traces). React no es herramienta de backend.',
      points: 10,
      order: 10
    }
  ];

  // Insertar nuevas preguntas
  console.log('\n✨ Creando preguntas reales basadas en el contenido refactorizado...\n');

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
  console.log('✅ TEST MÓDULO 6 ACTUALIZADO');
  console.log('═══════════════════════════════════════════');
  console.log(`📊 Total preguntas: ${questions.length}`);
  console.log(`📝 Distribución:`);
  console.log(`   - SINGLE: ${questions.filter(q => q.type === 'SINGLE').length}`);
  console.log(`   - MULTIPLE: ${questions.filter(q => q.type === 'MULTIPLE').length}`);
  console.log(`💯 Puntuación total: 100 puntos`);
  console.log('═══════════════════════════════════════════');

  await prisma.$disconnect();
}

updateModule6Test()
  .then(() => {
    console.log('\n🎉 Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

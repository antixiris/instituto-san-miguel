const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateModule4Test() {
  console.log('🎬 Actualizando test del Módulo 4 con preguntas reales...\n');

  // Obtener el módulo 4
  const course = await prisma.course.findFirst({
    where: { slug: 'especialista-claude-code' },
    include: {
      modules: {
        where: { order: 4 },
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
    console.log('❌ No se encontró el módulo 4');
    return;
  }

  const module4 = course.modules[0];
  const test = module4.moduleTest;

  if (!test) {
    console.log('❌ No se encontró el test del módulo 4');
    return;
  }

  console.log('📦 Módulo:', module4.title);
  console.log('📝 Test:', test.title);
  console.log('❓ Preguntas actuales:', test.questions.length);

  // Eliminar preguntas antiguas
  console.log('\n🗑️  Eliminando preguntas antiguas...');
  await prisma.moduleTestQuestion.deleteMany({
    where: { testId: test.id }
  });

  // Crear preguntas reales basadas en el contenido refactorizado del módulo 4
  const questions = [
    // Lección 1: React + TypeScript
    {
      question: '¿Cuál es la principal ventaja de usar TypeScript con React según el contenido del módulo?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Hace el código más rápido en ejecución',
        'Detecta errores de tipos ANTES de ejecutar el código',
        'Reduce el tamaño del bundle final',
        'Permite usar CSS dentro de JavaScript'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'La principal ventaja de TypeScript es detectar errores de tipos ANTES de ejecutar el código. Como explicamos en la lección, TypeScript es como un corrector ortográfico que marca errores mientras escribes, evitando bugs antes de que ocurran.',
      points: 10,
      order: 1
    },
    {
      question: '¿Qué prompt usarías con Claude Code para crear un proyecto React + TypeScript desde cero?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Crear app React',
        'Necesito crear un proyecto nuevo de React con TypeScript usando Vite con configuración estricta',
        'npm create vite',
        'Hacer proyecto web'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'El prompt efectivo debe ser específico y dar contexto completo. "Necesito crear un proyecto nuevo de React con TypeScript usando Vite con configuración estricta" es claro, especifica la herramienta (Vite) y los requisitos (TypeScript estricto).',
      points: 10,
      order: 2
    },

    // Lección 2: Componentes Reutilizables
    {
      question: '¿Cuál es la característica clave de un componente VERDADERAMENTE reutilizable?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Que sea muy pequeño (menos de 10 líneas)',
        'Que tenga props tipadas con TypeScript e interface clara',
        'Que use muchos useState',
        'Que esté en una carpeta llamada "components"'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'Un componente reutilizable debe tener props tipadas con TypeScript e interface clara. Esto asegura que otros desarrolladores (o tú en el futuro) sepan exactamente qué props acepta y cómo usarlo correctamente.',
      points: 10,
      order: 3
    },
    {
      question: '¿Qué componentes se crearon en el workflow "Component Library" de la lección? (Selecciona todos los correctos)',
      type: 'MULTIPLE',
      options: JSON.stringify([
        'Button con variants (primary, secondary, danger)',
        'Card con header, content y footer',
        'Input con validation',
        'Modal con animaciones 3D'
      ]),
      correctAnswer: JSON.stringify([0, 1, 2]),
      explanation: 'En el workflow de Component Library creamos Button (variants primary, secondary, danger), Card (header, content, footer) e Input (con validation). Modal con animaciones 3D no fue parte de ese workflow.',
      points: 10,
      order: 4
    },

    // Lección 3: Estado y Hooks
    {
      question: '¿Qué hace el hook useEffect y cuándo se ejecuta?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Solo ejecuta código cuando el componente se monta',
        'Ejecuta código como "efecto secundario" cuando cambian dependencias específicas',
        'Reemplaza completamente a useState',
        'Solo sirve para hacer fetch de APIs'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'useEffect ejecuta código como "efecto secundario" cuando cambian las dependencias que le especificas en el array de dependencias. Puede ejecutarse al montar, al actualizar o al desmontar el componente.',
      points: 10,
      order: 5
    },
    {
      question: '¿Qué custom hooks se crearon en el Task Manager workflow? (Selecciona todos)',
      type: 'MULTIPLE',
      options: JSON.stringify([
        'useForm (manejo de formularios)',
        'useLocalStorage (persistencia de datos)',
        'useTaskManager (lógica completa de tareas)',
        'useFetch (llamadas HTTP)'
      ]),
      correctAnswer: JSON.stringify([0, 1, 2]),
      explanation: 'En el Task Manager workflow creamos tres custom hooks: useForm (manejo de formularios), useLocalStorage (persistencia en localStorage) y useTaskManager (lógica completa de gestión de tareas). useFetch no fue parte de ese workflow específico.',
      points: 10,
      order: 6
    },

    // Lección 4: Integración con APIs
    {
      question: '¿Cuál es el error MÁS COMÚN al hacer fetch de APIs en React que Claude Code ayuda a prevenir?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Usar axios en lugar de fetch nativo',
        'No manejar los estados de loading y error',
        'Hacer fetch con POST en lugar de GET',
        'No usar TypeScript'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'El error más común es NO manejar los estados de loading y error. Claude Code automáticamente genera código que incluye estados para loading (cargando), error (falló) y data (éxito), mejorando la experiencia del usuario.',
      points: 10,
      order: 7
    },
    {
      question: '¿Qué incluye el custom hook "useApi" que se creó en el workflow?',
      type: 'MULTIPLE',
      options: JSON.stringify([
        'Estado de loading (cargando)',
        'Estado de error',
        'Función de refetch (recargar)',
        'Conexión automática a base de datos'
      ]),
      correctAnswer: JSON.stringify([0, 1, 2]),
      explanation: 'El hook useApi incluye: estado de loading, estado de error, y función refetch para recargar datos. No incluye conexión directa a base de datos (eso es trabajo del backend).',
      points: 10,
      order: 8
    },

    // Lección 5: Tailwind CSS
    {
      question: '¿Cuál es la filosofía principal de Tailwind CSS?',
      type: 'SINGLE',
      options: JSON.stringify([
        'Escribir todo el CSS en archivos .css separados',
        'Usar clases utility pequeñas directamente en el HTML',
        'No usar CSS, solo JavaScript',
        'Copiar y pegar componentes de Bootstrap'
      ]),
      correctAnswer: JSON.stringify([1]),
      explanation: 'Tailwind CSS usa clases utility pequeñas directamente en el HTML/JSX. En lugar de escribir CSS custom, usas clases como "bg-blue-500", "p-4", "flex", etc. Esto acelera el desarrollo y mantiene consistencia.',
      points: 10,
      order: 9
    },
    {
      question: 'En el workflow del Admin Dashboard, ¿qué componentes principales se crearon con Tailwind?',
      type: 'MULTIPLE',
      options: JSON.stringify([
        'Sidebar colapsable (drawer en mobile)',
        'Topbar sticky con search y notificaciones',
        'Cards de estadísticas con iconos',
        'Sistema de autenticación OAuth'
      ]),
      correctAnswer: JSON.stringify([0, 1, 2]),
      explanation: 'En el Dashboard creamos: Sidebar colapsable (drawer en mobile con overlay), Topbar sticky (search, notificaciones, perfil) y Cards de estadísticas con iconos. OAuth es del módulo de Backend, no de Tailwind.',
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
  console.log('✅ TEST MÓDULO 4 ACTUALIZADO');
  console.log('═══════════════════════════════════════════');
  console.log(`📊 Total preguntas: ${questions.length}`);
  console.log(`📝 Distribución:`);
  console.log(`   - SINGLE: ${questions.filter(q => q.type === 'SINGLE').length}`);
  console.log(`   - MULTIPLE: ${questions.filter(q => q.type === 'MULTIPLE').length}`);
  console.log(`💯 Puntuación total: 100 puntos`);
  console.log('═══════════════════════════════════════════');

  await prisma.$disconnect();
}

updateModule4Test()
  .then(() => {
    console.log('\n🎉 Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

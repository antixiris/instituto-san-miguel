import { PrismaClient, GameExerciseType } from '@prisma/client';
import { moduleOneData } from '../seed-modulo1-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando implementación del Módulo 1...\n');

  const courseTitle = 'Especialista en desarrollo de software con Claude Code';
  const courseDescription = 'Curso profesional que te llevará desde principiante absoluto hasta experto en Claude Code, la herramienta CLI oficial de Anthropic que revoluciona el desarrollo de software con IA.';

  console.log('📚 Curso:', courseTitle);
  console.log('⏱️  Duración: 45 horas\n');

  // 1. ELIMINAR CURSO ANTERIOR
  console.log('🗑️  Eliminando curso anterior...');

  const existingCourse = await prisma.course.findFirst({
    where: {
      OR: [
        { slug: 'especialista-desarrollo-claude-code' },
        { title: { contains: 'Claude Code' } }
      ]
    }
  });

  if (existingCourse) {
    console.log('   Encontrado curso anterior:', existingCourse.title);

    // Eliminar en cascada (gracias a las relaciones en Prisma)
    await prisma.course.delete({
      where: { id: existingCourse.id }
    });

    console.log('   ✅ Curso anterior eliminado\n');
  } else {
    console.log('   ℹ️  No se encontró curso anterior\n');
  }

  // 2. OBTENER INSTRUCTOR (Raúl Alonso)
  console.log('👨‍🏫 Buscando instructor...');

  const instructor = await prisma.user.findFirst({
    where: {
      role: 'PROFESOR',
      firstName: 'Raúl'
    }
  });

  if (!instructor) {
    throw new Error('No se encontró el instructor Raúl Alonso');
  }

  console.log('   ✅ Instructor encontrado:', instructor.firstName, instructor.lastName, '\n');

  // 3. CREAR NUEVO CURSO
  console.log('📖 Creando nuevo curso...');

  const course = await prisma.course.create({
    data: {
      title: courseTitle,
      slug: 'especialista-desarrollo-claude-code',
      description: courseDescription,
      shortDescription: 'Aprende Claude Code desde cero hasta nivel experto',
      level: 'BEGINNER',
      status: 'PUBLISHED',
      price: 0,
      duration: 45,
      prerequisites: JSON.stringify(['Conocimientos básicos de programación', 'Uso de terminal']),
      learningGoals: JSON.stringify([
        'Dominar Claude Code',
        'Desarrollar software con IA',
        'Automatizar tareas repetitivas',
        'Mejorar productividad'
      ]),
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      featured: true,
      published: true,
      instructorId: instructor.id,
      categoryId: null, // Categoria opcional
    }
  });

  console.log('   ✅ Curso creado con ID:', course.id, '\n');

  // 4. CREAR MÓDULO 1
  console.log(`📦 Creando ${moduleOneData.title}...`);

  const module = await prisma.module.create({
    data: {
      courseId: course.id,
      title: moduleOneData.title,
      description: moduleOneData.description,
      order: 0,
      isPublished: true,
    }
  });

  console.log('   ✅ Módulo creado con ID:', module.id);
  console.log(`   📝 ${moduleOneData.lessons.length} lecciones a crear\n`);

  // 5. CREAR LECCIONES Y EJERCICIOS
  for (const lessonData of moduleOneData.lessons) {
    console.log(`   📄 Creando Lección ${lessonData.number}: ${lessonData.title}...`);

    const lesson = await prisma.lesson.create({
      data: {
        moduleId: module.id,
        title: lessonData.title,
        description: lessonData.description,
        content: lessonData.content,
        type: 'TEXT',
        videoUrl: null,
        videoDuration: lessonData.durationMinutes * 60, // Convertir minutos a segundos
        order: lessonData.number - 1,
        isPublished: true,
        isFree: lessonData.number === 1, // Primera lección gratis
      }
    });

    // Crear ejercicio gamificado
    const exerciseData = lessonData.exercise;

    const exercise = await prisma.gameExercise.create({
      data: {
        lessonId: lesson.id,
        type: exerciseData.type as GameExerciseType,
        title: exerciseData.title,
        instructions: exerciseData.instructions,
        config: JSON.stringify(exerciseData.config),
        points: exerciseData.points,
        timeLimit: exerciseData.timeLimit,
        isActive: true,
      }
    });

    console.log(`      ✅ Lección y ejercicio creados (${exerciseData.type})`);
  }

  // 6. CREAR TEST DE MÓDULO
  console.log(`\n   📝 Creando test del módulo...`);

  const testData = moduleOneData.moduleTest;

  const moduleTest = await prisma.moduleTest.create({
    data: {
      moduleId: module.id,
      title: testData.title,
      description: testData.description,
      passingScore: testData.passingScore,
      timeLimit: testData.timeLimit * 60, // Convertir minutos a segundos
      isActive: true,
    }
  });

  // Crear preguntas del test
  for (let i = 0; i < testData.questions.length; i++) {
    const questionData = testData.questions[i];

    await prisma.moduleTestQuestion.create({
      data: {
        testId: moduleTest.id,
        question: questionData.question,
        options: JSON.stringify(questionData.options),
        correctAnswer: JSON.stringify(questionData.correctAnswer),
        explanation: questionData.explanation,
        order: i,
        points: questionData.points,
      }
    });
  }

  console.log(`      ✅ Test creado con ${testData.questions.length} preguntas`);

  // RESUMEN FINAL
  console.log('\n' + '='.repeat(60));
  console.log('✨ IMPLEMENTACIÓN COMPLETADA EXITOSAMENTE ✨');
  console.log('='.repeat(60));
  console.log(`
📊 Resumen:
   • Curso: ${course.title}
   • Módulos: 1
   • Lecciones: ${moduleOneData.lessons.length}
   • Ejercicios gamificados: ${moduleOneData.lessons.length}
   • Tests de módulo: 1
   • Preguntas de test: ${testData.questions.length}

🌐 Accede al curso en:
   http://localhost:5174/cursos/${course.slug}

👨‍🎓 Para inscribirte como estudiante:
   1. Inicia sesión con un usuario ESTUDIANTE
   2. Ve al catálogo de cursos
   3. Inscríbete en el curso
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/**
 * Seed para el Módulo 5: Model Context Protocol (MCP)
 *
 * Este script agrega el Módulo 5 completo al curso existente:
 * - 8 Lecciones con contenido en Markdown
 * - 6 Ejercicios gamificados
 * - 1 Test final con 20 preguntas
 */

import { PrismaClient, GameExerciseType } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando implementación del Módulo 5: MCP...\n');

  // 1. BUSCAR CURSO CORRECTO
  console.log('📚 Buscando curso "Especialista en Desarrollo con Claude Code"...');

  const course = await prisma.course.findFirst({
    where: {
      OR: [
        { slug: 'especialista-claude-code' },
        { title: 'Especialista en Desarrollo con Claude Code' }
      ]
    },
    include: {
      modules: true
    }
  });

  if (!course) {
    throw new Error('❌ No se encontró el curso. Ejecuta primero el seed principal.');
  }

  console.log(`   ✅ Curso encontrado: ${course.title}`);
  console.log(`   📦 Módulos actuales: ${course.modules.length}\n`);

  // 2. VERIFICAR SI YA EXISTE EL MÓDULO 5
  const existingModule5 = course.modules.find(m => m.title.includes('Módulo 5') || m.title.includes('MCP'));

  if (existingModule5) {
    console.log('⚠️  El Módulo 5 ya existe. Eliminando...');
    await prisma.module.delete({ where: { id: existingModule5.id } });
    console.log('   ✅ Módulo anterior eliminado\n');
  }

  // 3. CREAR MÓDULO 5
  console.log('📦 Creando Módulo 5: Model Context Protocol (MCP)...');

  const module = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Módulo 5: Model Context Protocol (MCP)',
      description: 'Domina el Model Context Protocol (MCP), el estándar para conectar aplicaciones de IA con sistemas externos. Aprende a crear servidores y clientes MCP, integrar servicios externos y construir workflows automatizados.',
      order: 4, // Módulos 1-4 ya existen, este es el 5to (order 4, base 0)
      isPublished: true,
    }
  });

  console.log(`   ✅ Módulo creado con ID: ${module.id}\n`);

  // 4. CREAR LECCIONES (leyendo archivos Markdown)
  console.log('📄 Creando 8 lecciones...\n');

  const lessonsPath = path.join(__dirname, '../content/lessons/modulo5-mcp');

  const lessonFiles = [
    { file: 'lesson-5-1.md', number: 1, title: 'Introducción al Model Context Protocol', duration: 90 },
    { file: 'lesson-5-2.md', number: 2, title: 'Arquitectura y Componentes de MCP', duration: 120 },
    { file: 'lesson-5-3.md', number: 3, title: 'Configuración de MCP en Claude Code', duration: 120 },
    { file: 'lesson-5-4.md', number: 4, title: 'Catálogo de Servidores MCP Disponibles', duration: 120 },
    { file: 'lesson-5-5.md', number: 5, title: 'Creando tu Primer Servidor MCP', duration: 180 },
    { file: 'lesson-5-6.md', number: 6, title: 'Creando Clientes MCP Personalizados', duration: 120 },
    { file: 'lesson-5-7.md', number: 7, title: 'Integración Avanzada MCP + Claude Code', duration: 120 },
    { file: 'lesson-5-8.md', number: 8, title: 'Proyecto Final: Sistema ProjectHub con MCP', duration: 180 }
  ];

  const createdLessons = [];

  for (const lessonInfo of lessonFiles) {
    const filePath = path.join(lessonsPath, lessonInfo.file);

    if (!fs.existsSync(filePath)) {
      console.warn(`   ⚠️  Archivo no encontrado: ${lessonInfo.file}`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    console.log(`   📝 Lección ${lessonInfo.number}: ${lessonInfo.title}...`);

    const lesson = await prisma.lesson.create({
      data: {
        moduleId: module.id,
        title: lessonInfo.title,
        description: `Lección ${lessonInfo.number} del Módulo 5: MCP`,
        content: content, // Markdown completo
        type: 'TEXT',
        videoUrl: null,
        videoDuration: lessonInfo.duration * 60, // Convertir minutos a segundos
        order: lessonInfo.number - 1,
        isPublished: true,
        isFree: lessonInfo.number === 1, // Primera lección gratis
      }
    });

    createdLessons.push(lesson);
    console.log(`      ✅ Lección creada (ID: ${lesson.id})`);
  }

  console.log(`\n   ✅ ${createdLessons.length} lecciones creadas\n`);

  // 5. CREAR EJERCICIOS GAMIFICADOS
  console.log('🎮 Creando 6 ejercicios gamificados...\n');

  const exercisesPath = path.join(__dirname, '../exercises/modulo5-exercises.json');

  if (!fs.existsSync(exercisesPath)) {
    throw new Error(`❌ No se encontró el archivo de ejercicios: ${exercisesPath}`);
  }

  const exercisesData = JSON.parse(fs.readFileSync(exercisesPath, 'utf-8'));

  for (const exerciseData of exercisesData.exercises) {
    // Encontrar la lección correspondiente
    const lessonId = exerciseData.lessonId; // Ej: "5.1", "5.2"
    const lessonNumber = parseInt(lessonId.split('.')[1]);
    const lesson = createdLessons[lessonNumber - 1];

    if (!lesson) {
      console.warn(`   ⚠️  No se encontró lección para ejercicio ${exerciseData.id}`);
      continue;
    }

    console.log(`   🎯 ${exerciseData.title}...`);

    await prisma.gameExercise.create({
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

    console.log(`      ✅ Ejercicio creado (${exerciseData.type}, ${exerciseData.points} pts)`);
  }

  console.log(`\n   ✅ ${exercisesData.exercises.length} ejercicios creados\n`);

  // 6. CREAR TEST DE MÓDULO
  console.log('📝 Creando test final del Módulo 5...\n');

  const testPath = path.join(__dirname, '../tests/modulo5-test.json');

  if (!fs.existsSync(testPath)) {
    throw new Error(`❌ No se encontró el archivo de test: ${testPath}`);
  }

  const testData = JSON.parse(fs.readFileSync(testPath, 'utf-8'));

  const moduleTest = await prisma.moduleTest.create({
    data: {
      moduleId: module.id,
      title: testData.title,
      description: testData.description,
      passingScore: testData.passingScore,
      timeLimit: testData.timeLimit, // Ya está en segundos
      isActive: true,
    }
  });

  console.log(`   📋 Test creado: ${testData.title}`);

  // Crear preguntas del test
  for (let i = 0; i < testData.questions.length; i++) {
    const questionData = testData.questions[i];

    await prisma.moduleTestQuestion.create({
      data: {
        testId: moduleTest.id,
        question: questionData.question,
        options: JSON.stringify(questionData.options),
        correctAnswer: String(questionData.correctAnswer),
        explanation: questionData.explanation,
        order: i,
        points: questionData.points,
      }
    });
  }

  console.log(`   ✅ ${testData.questions.length} preguntas creadas`);
  console.log(`   ⏱️  Tiempo límite: ${testData.timeLimit / 60} minutos`);
  console.log(`   📊 Nota mínima: ${testData.passingScore}/10\n`);

  // 7. ACTUALIZAR DURACIÓN DEL CURSO
  const totalDuration = lessonFiles.reduce((acc, l) => acc + l.duration, 0) / 60; // En horas
  const currentDuration = course.duration || 45; // Default 45 horas si no está definido
  const newCourseDuration = currentDuration + totalDuration;

  await prisma.course.update({
    where: { id: course.id },
    data: { duration: Math.ceil(newCourseDuration) }
  });

  console.log(`   📚 Duración del curso actualizada: ${currentDuration}h → ${Math.ceil(newCourseDuration)}h\n`);

  // RESUMEN FINAL
  console.log('='.repeat(70));
  console.log('✨ MÓDULO 5 IMPLEMENTADO EXITOSAMENTE ✨');
  console.log('='.repeat(70));
  console.log(`
📊 Resumen del Módulo 5:
   • Título: ${module.title}
   • Lecciones: ${createdLessons.length}
   • Ejercicios gamificados: ${exercisesData.exercises.length}
   • Preguntas del test: ${testData.questions.length}
   • Duración total: ${totalDuration.toFixed(1)} horas

📚 Curso actualizado:
   • Nombre: ${course.title}
   • Módulos totales: ${course.modules.length + 1}
   • Duración total: ${Math.ceil(newCourseDuration)} horas

🎯 Contenido del Módulo 5:
   1. Introducción al MCP (90 min)
   2. Arquitectura y Componentes (120 min)
   3. Configuración en Claude Code (120 min)
   4. Catálogo de Servidores (120 min)
   5. Crear Servidor MCP (180 min)
   6. Crear Cliente MCP (120 min)
   7. Integración Avanzada (120 min)
   8. Proyecto Final (180 min)

🌐 Accede al módulo en:
   http://localhost:5174/cursos/${course.slug}/modulos/${module.id}

🚀 Próximos pasos:
   1. Reinicia el servidor backend si está corriendo
   2. Verifica el módulo en el frontend
   3. Prueba las lecciones y ejercicios
   4. Realiza el test final
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

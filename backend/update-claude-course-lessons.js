const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Function to load lesson content from JSON file
function loadModuleContent(moduleNumber) {
  const filePath = path.join(__dirname, 'lessons-content', `module${moduleNumber}-demo.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Error leyendo module${moduleNumber}-demo.json:`, error.message);
    return null;
  }
}

// Function to update lessons for a specific module
async function updateModuleLessons(courseId, moduleOrder) {
  console.log(`\n🚀 Actualizando Módulo ${moduleOrder}...`);

  try {
    // Load content
    const contentData = loadModuleContent(moduleOrder);

    if (!contentData) {
      console.log(`⚠️  Sin archivo de contenido para Módulo ${moduleOrder}`);
      return { success: false, updated: 0, error: 'Sin archivo de contenido' };
    }

    // Find the module within the specific course
    const module = await prisma.module.findFirst({
      where: {
        courseId: courseId,
        order: moduleOrder
      },
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!module) {
      console.error(`❌ No se encontró el Módulo ${moduleOrder} en este curso`);
      return { success: false, updated: 0, error: 'Módulo no encontrado' };
    }

    console.log(`📚 Módulo: ${module.title}`);
    console.log(`   Lecciones en DB: ${module.lessons.length}`);
    console.log(`   Lecciones con contenido nuevo: ${contentData.lessons.length}`);

    let updated = 0;
    const errors = [];

    // Update each lesson
    for (let i = 0; i < module.lessons.length && i < contentData.lessons.length; i++) {
      const lesson = module.lessons[i];
      const lessonData = contentData.lessons[i];

      if (lessonData && lessonData.content) {
        try {
          console.log(`   ✏️  Actualizando: ${lesson.title}`);

          await prisma.lesson.update({
            where: { id: lesson.id },
            data: {
              content: lessonData.content,
              type: 'TEXT'
            }
          });

          updated++;
          console.log(`   ✅ Actualizada`);
        } catch (error) {
          console.error(`   ❌ Error: ${error.message}`);
          errors.push({ lesson: lesson.title, error: error.message });
        }
      }
    }

    console.log(`\n✅ Módulo ${moduleOrder}: ${updated}/${module.lessons.length} lecciones actualizadas`);

    return { success: true, updated, total: module.lessons.length, errors: errors.length };

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return { success: false, updated: 0, error: error.message };
  }
}

// Main execution function
async function updateAllLessons() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  ACTUALIZACIÓN DE LECCIONES');
  console.log('  Curso: Especialista en Desarrollo con Claude Code');
  console.log('═══════════════════════════════════════════════════════════\n');

  const startTime = Date.now();

  try {
    // Find the Claude Code course
    const course = await prisma.course.findFirst({
      where: {
        title: {
          contains: 'Claude Code'
        }
      }
    });

    if (!course) {
      console.error('❌ No se encontró el curso de Claude Code');
      return;
    }

    console.log(`✅ Curso encontrado: ${course.title}`);
    console.log(`   ID: ${course.id}\n`);

    const results = {
      totalLessonsUpdated: 0,
      modulesProcessed: 0,
      modulesSuccessful: 0,
      modulesFailed: 0,
      modules: []
    };

    // Módulos a actualizar (excluyendo 1 y 5 que ya tienen buen contenido)
    const modulesToUpdate = [2, 3, 4, 6, 7, 8, 9];

    console.log(`📋 Módulos a actualizar: ${modulesToUpdate.join(', ')}\n`);

    for (const moduleNumber of modulesToUpdate) {
      const result = await updateModuleLessons(course.id, moduleNumber);

      results.modules.push({ module: moduleNumber, ...result });
      results.modulesProcessed++;

      if (result.success) {
        results.modulesSuccessful++;
        results.totalLessonsUpdated += result.updated;
      } else {
        results.modulesFailed++;
      }
    }

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('                     RESUMEN FINAL');
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log(`⏱️  Tiempo: ${duration} segundos`);
    console.log(`📊 Módulos procesados: ${results.modulesProcessed}`);
    console.log(`✅ Exitosos: ${results.modulesSuccessful}`);
    console.log(`❌ Con errores: ${results.modulesFailed}`);
    console.log(`📝 Lecciones actualizadas: ${results.totalLessonsUpdated}\n`);

    console.log('Detalle:');
    console.log('─'.repeat(60));

    results.modules.forEach(({ module, updated, total, success, error }) => {
      const status = success ? '✅' : '❌';
      const info = total ? `${updated}/${total}` : '0';
      console.log(`${status} Módulo ${module}: ${info} lecciones ${error ? `(${error})` : ''}`);
    });

    console.log('\n═══════════════════════════════════════════════════════════');

    if (results.totalLessonsUpdated > 0) {
      console.log('\n🎉 ¡Actualización completada!');
      console.log('\n📌 Próximos pasos:');
      console.log('   1. Verifica el contenido en la plataforma web');
      console.log('   2. Crea archivos JSON para módulos 3, 4, 6, 7, 8, 9');
      console.log('   3. Ejecuta este script nuevamente para actualizar todos\n');
    }

  } catch (error) {
    console.error('\n❌ Error fatal:', error);
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Conexión cerrada\n');
  }
}

// Execute
updateAllLessons().catch(console.error);

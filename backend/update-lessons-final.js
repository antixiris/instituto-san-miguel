const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Function to load lesson content from JSON file
function loadModuleContent(moduleNumber) {
  const filePath = path.join(__dirname, 'lessons-content', `module${moduleNumber}-demo.json`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Archivo no encontrado: module${moduleNumber}-demo.json`);
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
async function updateModuleLessons(moduleOrder) {
  console.log(`\n🚀 Actualizando Módulo ${moduleOrder}...`);

  try {
    // Load content
    const contentData = loadModuleContent(moduleOrder);

    if (!contentData) {
      return { success: false, updated: 0, error: 'No se pudo cargar el contenido' };
    }

    // Find the module
    const module = await prisma.module.findFirst({
      where: { order: moduleOrder },
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!module) {
      console.error(`❌ No se encontró el Módulo ${moduleOrder} en la base de datos`);
      return { success: false, updated: 0, error: 'Módulo no encontrado' };
    }

    console.log(`📚 Módulo encontrado: ${module.title}`);
    console.log(`   Lecciones en DB: ${module.lessons.length}`);
    console.log(`   Lecciones con contenido: ${contentData.lessons.length}`);

    let updated = 0;
    const errors = [];

    // Update each lesson
    for (let i = 0; i < module.lessons.length; i++) {
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
          console.log(`   ✅ Actualizada: ${lesson.title}`);
        } catch (error) {
          console.error(`   ❌ Error actualizando ${lesson.title}:`, error.message);
          errors.push({ lesson: lesson.title, error: error.message });
        }
      } else {
        console.log(`   ⏭️  Sin contenido para: ${lesson.title}`);
      }
    }

    console.log(`\n✅ Módulo ${moduleOrder}: ${updated}/${module.lessons.length} lecciones actualizadas`);

    if (errors.length > 0) {
      console.log(`⚠️  Errores encontrados: ${errors.length}`);
      errors.forEach(({ lesson, error }) => {
        console.log(`   - ${lesson}: ${error}`);
      });
    }

    return { success: true, updated, total: module.lessons.length, errors: errors.length };

  } catch (error) {
    console.error(`❌ Error actualizando Módulo ${moduleOrder}:`, error.message);
    return { success: false, updated: 0, error: error.message };
  }
}

// Main execution function
async function updateAllLessons() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  ACTUALIZACIÓN DE LECCIONES - INSTITUTO SAN MIGUEL  ');
  console.log('  Curso: Especialista en Desarrollo con Claude Code');
  console.log('═══════════════════════════════════════════════════════════\n');

  const startTime = Date.now();
  const results = {
    totalLessonsUpdated: 0,
    modulesProcessed: 0,
    modulesSuccessful: 0,
    modulesFailed: 0,
    modules: []
  };

  try {
    // Módulos a actualizar (excluyendo 1 y 5 que ya tienen buen contenido)
    const modulesToUpdate = [2, 3, 4, 6, 7, 8, 9];

    console.log(`📋 Módulos a actualizar: ${modulesToUpdate.join(', ')}\n`);

    for (const moduleNumber of modulesToUpdate) {
      const result = await updateModuleLessons(moduleNumber);

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

    console.log(`⏱️  Tiempo total: ${duration} segundos`);
    console.log(`📊 Módulos procesados: ${results.modulesProcessed}`);
    console.log(`✅ Módulos exitosos: ${results.modulesSuccessful}`);
    console.log(`❌ Módulos con errores: ${results.modulesFailed}`);
    console.log(`📝 Total de lecciones actualizadas: ${results.totalLessonsUpdated}\n`);

    console.log('Detalle por módulo:');
    console.log('─'.repeat(60));

    results.modules.forEach(({ module, updated, total, success, error }) => {
      const status = success ? '✅' : '❌';
      const info = total ? `${updated}/${total}` : updated;
      console.log(`${status} Módulo ${module}: ${info} lecciones ${error ? `(${error})` : ''}`);
    });

    console.log('\n═══════════════════════════════════════════════════════════');

    if (results.totalLessonsUpdated > 0) {
      console.log('\n🎉 ¡Actualización completada con éxito!');
      console.log('\n📌 Próximos pasos:');
      console.log('   1. Verifica el contenido en la plataforma web');
      console.log('   2. Revisa que no haya placeholders genéricos');
      console.log('   3. Completa el contenido de los módulos restantes\n');
    } else {
      console.log('\n⚠️  No se actualizó ninguna lección. Revisa los errores arriba.\n');
    }

  } catch (error) {
    console.error('\n❌ Error fatal durante la actualización:', error);
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Conexión a base de datos cerrada\n');
  }
}

// Execute
updateAllLessons().catch(console.error);

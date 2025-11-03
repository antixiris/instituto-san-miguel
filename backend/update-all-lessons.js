const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import lesson content from modular files
const module2Content = require('./lessons-content/module2-complete');

// Function to update lessons for a specific module
async function updateModuleLessons(moduleOrder, lessonsData) {
  console.log(`\n🚀 Actualizando Módulo ${moduleOrder}...`);

  try {
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
      console.error(`❌ No se encontró el Módulo ${moduleOrder}`);
      return { success: false, updated: 0 };
    }

    console.log(`📚 Módulo: ${module.title}`);
    console.log(`   Lecciones: ${module.lessons.length}`);

    let updated = 0;

    // Update each lesson
    for (let i = 0; i < module.lessons.length; i++) {
      const lesson = module.lessons[i];
      const lessonData = lessonsData.lessons[i];

      if (lessonData && lessonData.content) {
        console.log(`   ✏️  Actualizando: ${lesson.title}`);

        await prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            content: lessonData.content,
            type: 'TEXT' // Ensure all lessons are TEXT type
          }
        });

        updated++;
        console.log(`   ✅ Actualizada: ${lesson.title}`);
      } else {
        console.log(`   ⚠️  Sin contenido para: ${lesson.title}`);
      }
    }

    console.log(`\n✅ Módulo ${moduleOrder} completado: ${updated}/${module.lessons.length} lecciones actualizadas`);
    return { success: true, updated };

  } catch (error) {
    console.error(`❌ Error actualizando Módulo ${moduleOrder}:`, error.message);
    return { success: false, updated: 0, error: error.message };
  }
}

// Main execution function
async function updateAllLessons() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  ACTUALIZACIÓN MASIVA DE LECCIONES - INSTITUTO SAN MIGUEL  ');
  console.log('═══════════════════════════════════════════════════════════\n');

  const results = {
    total: 0,
    successful: 0,
    failed: 0,
    modules: []
  };

  try {
    // Update Module 2
    const module2Result = await updateModuleLessons(2, module2Content);
    results.modules.push({ module: 2, ...module2Result });
    results.total += module2Result.updated;
    if (module2Result.success) results.successful++;
    else results.failed++;

    // TODO: Add other modules when their content files are created
    // const module3Result = await updateModuleLessons(3, module3Content);
    // const module4Result = await updateModuleLessons(4, module4Content);
    // etc...

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('                     RESUMEN FINAL');
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log(`Total de lecciones actualizadas: ${results.total}`);
    console.log(`Módulos exitosos: ${results.successful}`);
    console.log(`Módulos con errores: ${results.failed}\n`);

    results.modules.forEach(({ module, updated, success, error }) => {
      const status = success ? '✅' : '❌';
      console.log(`${status} Módulo ${module}: ${updated} lecciones ${error ? `(Error: ${error})` : ''}`);
    });

    console.log('\n═══════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ Error fatal durante la actualización:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute
updateAllLessons().catch(console.error);

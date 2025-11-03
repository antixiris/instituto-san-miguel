const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixDuplicates() {
  try {
    console.log('🔍 Buscando módulos duplicados...\n');

    // Obtener todos los módulos
    const allModules = await prisma.module.findMany({
      include: {
        course: {
          select: { title: true }
        }
      },
      orderBy: [
        { courseId: 'asc' },
        { order: 'asc' },
        { createdAt: 'asc' }
      ]
    });

    console.log(`Total de módulos en la base de datos: ${allModules.length}\n`);

    // Agrupar módulos por clave única: courseId + order + title
    const moduleGroups = {};

    allModules.forEach(module => {
      const key = `${module.courseId}_${module.order}_${module.title}`;
      if (!moduleGroups[key]) {
        moduleGroups[key] = [];
      }
      moduleGroups[key].push(module);
    });

    // Identificar duplicados
    let duplicatesFound = 0;
    const modulesToDelete = [];

    for (const [key, modules] of Object.entries(moduleGroups)) {
      if (modules.length > 1) {
        duplicatesFound++;
        console.log(`\n📌 Duplicado encontrado: ${modules[0].title} (Curso: ${modules[0].course.title})`);
        console.log(`   Cantidad de copias: ${modules.length}`);

        // Mantener el primero (más antiguo) y marcar los demás para eliminación
        const [keep, ...toDelete] = modules;
        console.log(`   ✓ Manteniendo: ${keep.id} (creado: ${keep.createdAt})`);

        toDelete.forEach(mod => {
          console.log(`   ✗ Eliminando: ${mod.id} (creado: ${mod.createdAt})`);
          modulesToDelete.push(mod.id);
        });
      }
    }

    console.log(`\n\n📊 Resumen:`);
    console.log(`   Total de módulos: ${allModules.length}`);
    console.log(`   Grupos únicos: ${Object.keys(moduleGroups).length}`);
    console.log(`   Duplicados encontrados: ${duplicatesFound}`);
    console.log(`   Módulos a eliminar: ${modulesToDelete.length}\n`);

    if (modulesToDelete.length > 0) {
      console.log('🗑️  Eliminando módulos duplicados...\n');

      // Primero, obtener las lecciones de los módulos duplicados
      const lessonsFromDuplicates = await prisma.lesson.findMany({
        where: {
          moduleId: { in: modulesToDelete }
        },
        select: { id: true, title: true, moduleId: true }
      });

      console.log(`   Lecciones en módulos duplicados: ${lessonsFromDuplicates.length}`);

      // Eliminar las lecciones de los módulos duplicados
      if (lessonsFromDuplicates.length > 0) {
        await prisma.lesson.deleteMany({
          where: {
            moduleId: { in: modulesToDelete }
          }
        });
        console.log(`   ✓ Lecciones eliminadas`);
      }

      // Eliminar tests de módulos duplicados si existen
      await prisma.moduleTest.deleteMany({
        where: {
          moduleId: { in: modulesToDelete }
        }
      });

      // Ahora eliminar los módulos duplicados
      const deleteResult = await prisma.module.deleteMany({
        where: {
          id: { in: modulesToDelete }
        }
      });

      console.log(`   ✓ ${deleteResult.count} módulos duplicados eliminados`);
    }

    // Verificar resultado final
    const finalCount = await prisma.module.count();
    console.log(`\n✅ Proceso completado!`);
    console.log(`   Módulos restantes en la base de datos: ${finalCount}\n`);

    // Mostrar lista final de módulos por curso
    console.log('📚 Módulos finales por curso:\n');

    const courses = await prisma.course.findMany({
      include: {
        modules: {
          orderBy: { order: 'asc' },
          select: { id: true, title: true, order: true }
        }
      },
      orderBy: { title: 'asc' }
    });

    courses.forEach(course => {
      console.log(`${course.title}:`);
      course.modules.forEach(mod => {
        console.log(`  - Módulo ${mod.order}: ${mod.title}`);
      });
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixDuplicates();

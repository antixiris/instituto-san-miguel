const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkLessons() {
  try {
    console.log('🔍 Consultando lecciones actuales...\n');

    // Obtener módulos 2, 3, 4, 6, 7, 8, 9
    const modulesToUpdate = [2, 3, 4, 6, 7, 8, 9];

    for (const moduleOrder of modulesToUpdate) {
      const module = await prisma.module.findFirst({
        where: { order: moduleOrder },
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          }
        }
      });

      if (module) {
        console.log(`\n📚 MÓDULO ${moduleOrder}: ${module.title}`);
        console.log(`   ID: ${module.id}`);
        console.log(`   Lecciones: ${module.lessons.length}`);

        module.lessons.forEach((lesson, idx) => {
          console.log(`\n   ${idx + 1}. ${lesson.title}`);
          console.log(`      ID: ${lesson.id}`);
          console.log(`      Tipo: ${lesson.type}`);
          console.log(`      Contenido: ${lesson.content ? lesson.content.substring(0, 100) + '...' : 'Sin contenido'}`);
        });
      }
    }

    console.log('\n✅ Consulta completada');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkLessons();

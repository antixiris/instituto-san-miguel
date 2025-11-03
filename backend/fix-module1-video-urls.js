const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixModule1VideoUrls() {
  console.log('🔧 Corrigiendo URLs de videos del Módulo 1...\n');

  const course = await prisma.course.findFirst({
    where: { slug: 'especialista-claude-code' },
    include: {
      modules: {
        where: { order: 1 },
        include: {
          lessons: {
            where: { type: 'VIDEO' },
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  if (!course || !course.modules[0]) {
    console.log('❌ No se encontró el módulo 1');
    return;
  }

  const module = course.modules[0];
  let updated = 0;

  for (const lesson of module.lessons) {
    // Normalizar a URL relativa (sin localhost)
    let newUrl = lesson.videoUrl;

    if (lesson.videoUrl.includes('localhost:3001')) {
      newUrl = lesson.videoUrl.replace('http://localhost:3001', '');

      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { videoUrl: newUrl }
      });

      console.log(`✅ Lección ${lesson.order}: ${lesson.title}`);
      console.log(`   Antes: ${lesson.videoUrl}`);
      console.log(`   Después: ${newUrl}\n`);
      updated++;
    } else if (lesson.videoUrl.startsWith('/videos')) {
      console.log(`✅ Lección ${lesson.order}: ${lesson.title}`);
      console.log(`   Ya tiene URL relativa: ${lesson.videoUrl}\n`);
    }
  }

  console.log('═══════════════════════════════════════════');
  console.log('✅ CORRECCIÓN COMPLETADA');
  console.log('═══════════════════════════════════════════');
  console.log(`🎬 Videos actualizados: ${updated}`);
  console.log('═══════════════════════════════════════════');

  await prisma.$disconnect();
}

fixModule1VideoUrls()
  .then(() => {
    console.log('\n🎉 Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

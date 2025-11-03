const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateModule3Videos() {
  console.log('🎬 Actualizando videos del Módulo 3...\n');

  // Obtener el módulo 3
  const course = await prisma.course.findFirst({
    where: { slug: 'especialista-claude-code' },
    include: {
      modules: {
        where: { order: 3 },
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  if (!course || !course.modules[0]) {
    console.log('❌ No se encontró el módulo 3');
    return;
  }

  const module = course.modules[0];
  console.log('📦 Módulo encontrado:', module.title, '\n');

  // Mapeo de lecciones y videos
  const videoMapping = [
    { order: 1, videoUrl: '/videos/Prompting_Efectivo.mp4', duration: 1620 }, // 27 min
    { order: 2, videoUrl: '/videos/El_Poder_del_Contexto.mp4', duration: 2160 }, // 36 min
    { order: 3, videoUrl: '/videos/El_Arte_de_Mejorar_el_Código.mp4', duration: 1680 }, // 28 min
    { order: 4, videoUrl: '/videos/Manejo_de_Proyectos_Complejos.mp4', duration: 1680 }, // 28 min
    { order: 5, videoUrl: '/videos/Patrones_de_Diseño_Esenciales.mp4', duration: 2340 } // 39 min
  ];

  let updated = 0;

  for (const mapping of videoMapping) {
    const lesson = module.lessons.find(l => l.order === mapping.order);

    if (lesson) {
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: {
          type: 'VIDEO',
          videoUrl: mapping.videoUrl,
          videoDuration: mapping.duration
        }
      });

      console.log(`✅ Lección ${mapping.order}: ${lesson.title}`);
      console.log(`   Video: ${mapping.videoUrl}`);
      console.log(`   Duración: ${Math.round(mapping.duration / 60)} minutos\n`);
      updated++;
    }
  }

  console.log('═══════════════════════════════════════════');
  console.log('✅ ACTUALIZACIÓN COMPLETADA');
  console.log('═══════════════════════════════════════════');
  console.log(`🎬 Videos incrustados: ${updated}`);
  console.log('═══════════════════════════════════════════');

  await prisma.$disconnect();
}

updateModule3Videos()
  .then(() => {
    console.log('\n🎉 Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

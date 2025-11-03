const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function syncLessonContentToDb() {
  console.log('🚀 Sincronizando contenido de lecciones con la base de datos...\n');

  // Obtener el curso
  const course = await prisma.course.findFirst({
    where: {
      slug: 'especialista-claude-code'
    },
    include: {
      modules: {
        include: {
          lessons: true
        },
        orderBy: {
          order: 'asc'
        }
      }
    }
  });

  if (!course) {
    console.log('❌ No se encontró el curso');
    return;
  }

  const contentDir = path.join(__dirname, '..', 'contenidos-curso');
  let lessonsUpdated = 0;

  for (const module of course.modules) {
    console.log(`\n📦 Procesando ${module.title}...\n`);

    for (const lesson of module.lessons) {
      // Construir el nombre del archivo (mod3leccion1.md, mod4leccion2.md, etc.)
      const fileName = `mod${module.order}leccion${lesson.order}.md`;
      const filePath = path.join(contentDir, fileName);

      // Verificar si existe el archivo
      if (fs.existsSync(filePath)) {
        // Leer el contenido del archivo
        const newContent = fs.readFileSync(filePath, 'utf-8');

        // Actualizar el contenido en la base de datos
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { content: newContent }
        });

        console.log(`✅ ${fileName} → Lección "${lesson.title}" actualizada`);
        lessonsUpdated++;
      } else {
        console.log(`⚠️  ${fileName} no encontrado (Lección: "${lesson.title}")`);
      }
    }
  }

  console.log('\n═══════════════════════════════════════════');
  console.log('✅ SINCRONIZACIÓN COMPLETADA');
  console.log('═══════════════════════════════════════════');
  console.log(`📝 Lecciones actualizadas: ${lessonsUpdated}`);
  console.log('═══════════════════════════════════════════\n');
}

syncLessonContentToDb()
  .then(() => {
    console.log('🎉 Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

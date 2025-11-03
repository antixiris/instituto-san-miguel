const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function refineLessonsFormat() {
  console.log('🚀 Iniciando refinamiento de lecciones...\n');

  // ==========================================
  // PARTE 1: Reformatear h1 en archivos markdown (módulos 3+)
  // ==========================================
  console.log('📄 PARTE 1: Reformateando h1 en archivos markdown...\n');

  const contentDir = path.join(__dirname, '..', 'contenidos-curso');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

  let markdownFilesProcessed = 0;

  for (const file of files) {
    // Extraer número de módulo del nombre del archivo (mod3leccion1.md -> 3)
    const moduleMatch = file.match(/mod(\d+)leccion/);
    if (!moduleMatch) continue;

    const moduleNumber = parseInt(moduleMatch[1]);

    // Solo procesar módulos 3 en adelante
    if (moduleNumber < 3) continue;

    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Verificar si la primera línea es un h1
    if (lines[0].startsWith('# ')) {
      // Extraer el texto del h1 (sin el '# ')
      const h1Text = lines[0].substring(2).trim();

      // Reemplazar con formato <p><strong><em>
      lines[0] = `<p><strong><em>${h1Text}</em></strong></p>`;

      // Guardar el archivo modificado
      const newContent = lines.join('\n');
      fs.writeFileSync(filePath, newContent, 'utf-8');

      console.log(`✅ ${file}: h1 reformateado`);
      markdownFilesProcessed++;
    }
  }

  console.log(`\n✨ ${markdownFilesProcessed} archivos markdown procesados\n`);

  // ==========================================
  // PARTE 2: Eliminar etiquetas "video"/"lectura" de títulos en BD
  // ==========================================
  console.log('🗃️  PARTE 2: Eliminando etiquetas de títulos en base de datos...\n');

  // Obtener todas las lecciones del curso "Especialista en Desarrollo con Claude Code"
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

  let dbLessonsUpdated = 0;

  for (const module of course.modules) {
    // Solo procesar módulos 2 en adelante (module.order >= 2)
    if (module.order < 2) continue;

    for (const lesson of module.lessons) {
      const originalTitle = lesson.title;

      // Eliminar prefijos como "video:", "Video:", "lectura:", "Lectura:", etc.
      const cleanedTitle = originalTitle
        .replace(/^(video|lectura):\s*/i, '')
        .replace(/^(video|lectura)\s+/i, '')
        .replace(/^\[(video|lectura)\]\s*/i, '')
        .replace(/^(VIDEO|LECTURA):\s*/i, '')
        .replace(/^(VIDEO|LECTURA)\s+/i, '')
        .trim();

      // Si el título cambió, actualizarlo en la BD
      if (cleanedTitle !== originalTitle) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { title: cleanedTitle }
        });

        console.log(`✅ Módulo ${module.order}, Lección ${lesson.order}:`);
        console.log(`   Antes: "${originalTitle}"`);
        console.log(`   Después: "${cleanedTitle}"`);
        dbLessonsUpdated++;
      }
    }
  }

  console.log(`\n✨ ${dbLessonsUpdated} títulos de lecciones actualizados en BD\n`);

  // ==========================================
  // RESUMEN FINAL
  // ==========================================
  console.log('═══════════════════════════════════════════');
  console.log('✅ REFINAMIENTO COMPLETADO');
  console.log('═══════════════════════════════════════════');
  console.log(`📄 Archivos markdown reformateados: ${markdownFilesProcessed}`);
  console.log(`🗃️  Títulos en BD actualizados: ${dbLessonsUpdated}`);
  console.log('═══════════════════════════════════════════\n');
}

refineLessonsFormat()
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

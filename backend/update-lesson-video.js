const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateLesson4WithVideo() {
  try {
    // Buscar módulo 1 del curso "Especialista en Desarrollo con Claude Code"
    const module = await prisma.module.findFirst({
      where: {
        order: 1,
        course: {
          title: 'Especialista en Desarrollo con Claude Code'
        }
      },
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!module) {
      console.error('No se encontró el módulo 1');
      return;
    }

    console.log('Módulo encontrado:', module.title);
    console.log('Lecciones:', module.lessons.length);

    // Buscar lección 4 (order = 4)
    const lesson4 = module.lessons.find(l => l.order === 4);

    if (!lesson4) {
      console.error('No se encontró la lección 4');
      console.log('Lecciones disponibles:', module.lessons.map(l => ({ order: l.order, title: l.title })));
      return;
    }

    console.log('\nLección 4 encontrada:', lesson4.title);

    // Crear el tag de vídeo para insertar al inicio
    const videoTag = `<video controls width="100%" style="max-width: 800px; margin: 20px 0;">
  <source src="/api/videos/Navegando_Claude_Code.mp4" type="video/mp4">
  Tu navegador no soporta la reproducción de videos HTML5.
</video>

`;

    // Preparar el nuevo contenido con el vídeo al inicio
    const newContent = videoTag + (lesson4.content || '');

    // Actualizar la lección
    const updated = await prisma.lesson.update({
      where: { id: lesson4.id },
      data: { content: newContent }
    });

    console.log('\n✓ Lección actualizada exitosamente');
    console.log('ID:', updated.id);
    console.log('Título:', updated.title);
    console.log('Longitud del contenido:', updated.content.length, 'caracteres');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateLesson4WithVideo();

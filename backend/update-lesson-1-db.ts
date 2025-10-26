import { PrismaClient } from '@prisma/client';
import { getLessonContent } from './prisma/lesson-contents';

const prisma = new PrismaClient();

async function updateLesson1() {
  try {
    console.log('🔄 Actualizando contenido de la Lección 1 en la base de datos...');

    // Obtener el nuevo contenido
    const newContent = getLessonContent(0, 0, 'Qué es Claude Code y por qué usarlo');

    // Buscar la lección 1
    const lesson = await prisma.lesson.findFirst({
      where: {
        title: 'Qué es Claude Code y por qué usarlo',
      },
    });

    if (!lesson) {
      console.error('❌ Lección 1 no encontrada en la base de datos');
      return;
    }

    console.log(`📝 Lección encontrada: ${lesson.title}`);
    console.log(`📊 Contenido actual: ${lesson.content?.length || 0} caracteres`);
    console.log(`📊 Contenido nuevo: ${newContent.length} caracteres`);

    // Actualizar el contenido
    const updated = await prisma.lesson.update({
      where: {
        id: lesson.id,
      },
      data: {
        content: newContent,
      },
    });

    console.log(`✅ ¡Lección 1 actualizada exitosamente!`);
    console.log(`📊 Nuevo contenido: ${updated.content?.length || 0} caracteres`);
    console.log('');
    console.log('🎉 Ahora puedes ver el nuevo contenido motivacional en la plataforma');

  } catch (error) {
    console.error('❌ Error al actualizar la lección:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateLesson1();

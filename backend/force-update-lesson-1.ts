import { PrismaClient } from '@prisma/client';
import { getLessonContent } from './prisma/lesson-contents';

const prisma = new PrismaClient();

async function forceUpdateLesson1() {
  try {
    console.log('🔄 Forzando actualización de Lección 1...\n');

    // Obtener el nuevo contenido
    const newContent = getLessonContent(0, 0, 'Qué es Claude Code y por qué usarlo');
    console.log(`📝 Contenido a insertar: ${newContent.length} caracteres`);
    console.log(`✅ Contiene contenido motivacional: ${newContent.includes('Bienvenido a la Revolución')}\n`);

    // Actualizar usando Prisma
    const updated = await prisma.lesson.updateMany({
      where: {
        title: 'Qué es Claude Code y por qué usarlo',
      },
      data: {
        content: newContent,
      },
    });

    console.log(`✅ Lecciones actualizadas: ${updated.count}\n`);

    // Verificar inmediatamente
    const lesson = await prisma.lesson.findFirst({
      where: {
        title: 'Qué es Claude Code y por qué usarlo',
      },
    });

    if (lesson && lesson.content) {
      console.log('🔍 Verificación inmediata:');
      console.log(`   - Longitud: ${lesson.content.length} caracteres`);
      console.log(`   - Apertura motivacional: ${lesson.content.includes('Has tomado la mejor decisión') ? '✅' : '❌'}`);
      console.log(`   - Sofía García: ${lesson.content.includes('Sofía García') ? '✅' : '❌'}`);
      console.log(`   - Datos salariales: ${lesson.content.includes('€65k - €95k') ? '✅' : '❌'}`);
      console.log('\n✅ ¡Actualización exitosa! Recarga la página en el navegador.');
    } else {
      console.error('❌ No se pudo verificar la actualización');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

forceUpdateLesson1();

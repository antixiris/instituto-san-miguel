import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyLesson1() {
  try {
    const lesson = await prisma.lesson.findFirst({
      where: {
        title: 'Qué es Claude Code y por qué usarlo',
      },
    });

    if (!lesson || !lesson.content) {
      console.error('❌ Lección no encontrada');
      return;
    }

    console.log('📖 Verificando contenido de Lección 1:');
    console.log('');
    console.log('Primeras 500 caracteres:');
    console.log(lesson.content.substring(0, 500));
    console.log('');
    console.log('---');
    console.log('');

    // Verificar si contiene el contenido motivacional
    const hasMotivationalContent = lesson.content.includes('Has tomado la mejor decisión de tu carrera');
    const hasCases = lesson.content.includes('Sofía García');
    const hasMarketData = lesson.content.includes('€65k - €95k');

    console.log('✅ Verificación del contenido:');
    console.log(`   - Apertura motivacional: ${hasMotivationalContent ? '✅ SÍ' : '❌ NO'}`);
    console.log(`   - Casos de éxito (Sofía García): ${hasCases ? '✅ SÍ' : '❌ NO'}`);
    console.log(`   - Datos del mercado (salarios): ${hasMarketData ? '✅ SÍ' : '❌ NO'}`);
    console.log('');
    console.log(`📊 Longitud total: ${lesson.content.length} caracteres`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyLesson1();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  try {
    // Get module 2
    const modules = await prisma.module.findMany({
      where: { course: { slug: 'especialista-claude-code' } },
      include: { 
        moduleTest: { include: { questions: true } },
        lessons: { orderBy: { order: 'asc' } }
      },
      orderBy: { order: 'asc' }
    });

    const mod2 = modules.find(m => m.order === 2);
    
    console.log('📚 MÓDULO 2:', mod2.title);
    console.log('\n=== TEST DE EVALUACIÓN ===');
    if (mod2.moduleTest) {
      console.log('✅ Test ID:', mod2.moduleTest.id);
      console.log('✅ Número de preguntas:', mod2.moduleTest.questions.length);
      console.log('✅ Puntos totales:', mod2.moduleTest.questions.reduce((sum, q) => sum + q.points, 0));
      
      const singleCount = mod2.moduleTest.questions.filter(q => q.type === 'SINGLE').length;
      const multipleCount = mod2.moduleTest.questions.filter(q => q.type === 'MULTIPLE').length;
      console.log('   - Preguntas SINGLE:', singleCount);
      console.log('   - Preguntas MULTIPLE:', multipleCount);
    }

    console.log('\n=== LECCIONES CON VIDEO ===');
    const lesson4 = mod2.lessons.find(l => l.order === 4);
    const lesson5 = mod2.lessons.find(l => l.order === 5);
    
    console.log('\nLección 4:', lesson4.title);
    console.log('  Tipo:', lesson4.type);
    console.log('  Video:', lesson4.videoUrl ? '✅ ' + lesson4.videoUrl : '❌ No configurado');
    
    console.log('\nLección 5:', lesson5.title);
    console.log('  Tipo:', lesson5.type);
    console.log('  Video:', lesson5.videoUrl ? '✅ ' + lesson5.videoUrl : '❌ No configurado');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verify();

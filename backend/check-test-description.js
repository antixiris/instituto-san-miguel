const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const modules = await prisma.module.findMany({
      where: { course: { slug: 'especialista-claude-code' } },
      include: { moduleTest: true },
      orderBy: { order: 'asc' }
    });

    const mod2 = modules.find(m => m.order === 2);
    
    if (mod2 && mod2.moduleTest) {
      console.log('Test del Módulo 2:');
      console.log('ID:', mod2.moduleTest.id);
      console.log('Título:', mod2.moduleTest.title);
      console.log('Descripción:', mod2.moduleTest.description);
      console.log('Tiempo límite:', mod2.moduleTest.timeLimit, 'minutos');
      console.log('Nota aprobatoria:', mod2.moduleTest.passingScore);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

check();

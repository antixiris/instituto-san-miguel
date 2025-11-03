const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const modules = await prisma.module.findMany({
      where: { course: { slug: 'especialista-claude-code' } },
      include: { moduleTest: { include: { questions: true } } },
      orderBy: { order: 'asc' }
    });

    const mod2 = modules.find(m => m.order === 2);
    
    if (mod2.moduleTest && mod2.moduleTest.questions.length > 0) {
      console.log('Primera pregunta completa:');
      const q = mod2.moduleTest.questions[0];
      console.log(JSON.stringify(q, null, 2));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

check();

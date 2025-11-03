const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkModule1() {
  try {
    const module = await prisma.module.findFirst({
      where: { order: 1 },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          take: 1
        }
      }
    });

    if (module && module.lessons.length > 0) {
      const lesson = module.lessons[0];
      console.log('📖 EJEMPLO DE LECCIÓN DEL MÓDULO 1:\n');
      console.log(`Título: ${lesson.title}\n`);
      console.log('Contenido:\n');
      console.log(lesson.content);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkModule1();

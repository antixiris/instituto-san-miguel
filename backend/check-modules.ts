import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkModules() {
  const modules = await prisma.module.findMany({
    where: {
      course: {
        slug: 'especialista-desarrollo-claude-code'
      }
    },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          title: true,
          order: true
        }
      },
      moduleTest: {
        select: {
          id: true,
          title: true
        }
      }
    },
    orderBy: { order: 'asc' }
  });

  console.log('=== MÓDULOS Y TESTS ===\n');

  modules.forEach(module => {
    console.log(`Módulo ${module.order}: ${module.title}`);
    console.log(`  ID: ${module.id}`);
    console.log(`  Test ID: ${module.moduleTest?.id || 'NO TIENE TEST'}`);
    console.log(`  Test: ${module.moduleTest ? module.moduleTest.title : 'NO TIENE TEST'}`);
    console.log(`  Lecciones: ${module.lessons.length}`);
    if (module.lessons.length > 0) {
      console.log(`  Última lección: ${module.lessons[module.lessons.length - 1].title}`);
    }
    console.log('');
  });

  await prisma.$disconnect();
}

checkModules().catch(console.error);

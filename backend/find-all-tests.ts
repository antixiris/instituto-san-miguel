import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findAllTests() {
  try {
    const tests = await prisma.moduleTest.findMany({
      include: {
        module: {
          include: {
            course: {
              select: {
                title: true,
                slug: true
              }
            }
          }
        }
      }
    });

    console.log(`\n📋 Total de tests en la BD: ${tests.length}\n`);

    tests.forEach((test, index) => {
      console.log(`${index + 1}. ${test.title}`);
      console.log(`   ID: ${test.id}`);
      console.log(`   Curso: ${test.module.course.title}`);
      console.log(`   Slug: ${test.module.course.slug}`);
      console.log(`   Módulo orden: ${test.module.order}`);
      console.log(`   Tiempo límite: ${test.timeLimit} minutos`);
      console.log(`   Nota mínima: ${test.passingScore}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findAllTests();

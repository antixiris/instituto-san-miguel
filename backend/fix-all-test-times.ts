import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixAllTestTimes() {
  try {
    console.log('🔧 Actualizando tiempo de todos los tests...\n');

    // Actualizar todos los tests del curso "especialista-claude-code"
    const result = await prisma.moduleTest.updateMany({
      where: {
        module: {
          course: {
            slug: 'especialista-claude-code'
          }
        }
      },
      data: {
        timeLimit: 60
      }
    });

    console.log(`✅ ${result.count} tests actualizados a 60 minutos\n`);

    // Verificar
    const tests = await prisma.moduleTest.findMany({
      where: {
        module: {
          course: {
            slug: 'especialista-claude-code'
          }
        }
      },
      include: {
        module: {
          select: {
            title: true,
            order: true
          }
        }
      },
      orderBy: {
        module: {
          order: 'asc'
        }
      }
    });

    console.log('📊 Estado final:');
    tests.forEach(test => {
      console.log(`  Módulo ${test.module.order}: ${test.title}`);
      console.log(`    Tiempo límite: ${test.timeLimit} minutos`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAllTestTimes();

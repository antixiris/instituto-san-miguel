import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkTestTime() {
  try {
    // Buscar el test del módulo 1 del curso correcto
    const moduleTest = await prisma.moduleTest.findFirst({
      where: {
        module: {
          course: {
            slug: 'especialista-claude-code'
          },
          order: 0
        }
      },
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

    if (!moduleTest) {
      console.log('❌ No se encontró el test del módulo 1');
      return;
    }

    console.log('\n📊 Test encontrado:');
    console.log('  ID:', moduleTest.id);
    console.log('  Título:', moduleTest.title);
    console.log('  Curso:', moduleTest.module.course.title);
    console.log('  Tiempo límite actual:', moduleTest.timeLimit, 'minutos');
    console.log('  Nota mínima:', moduleTest.passingScore);

    if (moduleTest.timeLimit !== 60) {
      console.log('\n🔧 Actualizando tiempo límite a 60 minutos...');

      await prisma.moduleTest.update({
        where: { id: moduleTest.id },
        data: {
          timeLimit: 60
        }
      });

      console.log('✅ Tiempo límite actualizado a 60 minutos');
    } else {
      console.log('\n✅ El tiempo límite ya está en 60 minutos');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTestTime();

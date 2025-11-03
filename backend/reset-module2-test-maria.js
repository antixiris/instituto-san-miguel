const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetTest() {
  try {
    // Buscar a María González
    const maria = await prisma.user.findFirst({
      where: {
        email: 'estudiante@institutosanmiguel.com'
      }
    });

    if (!maria) {
      console.log('No se encontró a María González');
      return;
    }

    console.log('✅ Usuario encontrado:', maria.firstName, maria.lastName);
    console.log('   Email:', maria.email);
    console.log('   ID:', maria.id);

    // Buscar el test del módulo 2
    const modules = await prisma.module.findMany({
      where: { course: { slug: 'especialista-claude-code' } },
      include: { moduleTest: true },
      orderBy: { order: 'asc' }
    });

    const mod2 = modules.find(m => m.order === 2);
    
    if (!mod2 || !mod2.moduleTest) {
      console.log('No se encontró el test del módulo 2');
      return;
    }

    console.log('\n✅ Test encontrado:', mod2.moduleTest.title);
    console.log('   Test ID:', mod2.moduleTest.id);

    // Buscar envíos anteriores
    const submissions = await prisma.moduleTestSubmission.findMany({
      where: {
        userId: maria.id,
        testId: mod2.moduleTest.id
      }
    });

    console.log('\n📊 Envíos anteriores encontrados:', submissions.length);

    if (submissions.length > 0) {
      submissions.forEach((sub, index) => {
        console.log('\n   Envío', index + 1);
        console.log('   - ID:', sub.id);
        console.log('   - Nota:', sub.score, '/10');
        console.log('   - Aprobado:', sub.passed ? 'Sí' : 'No');
        console.log('   - Fecha:', sub.submittedAt);
      });

      // Eliminar todos los envíos
      console.log('\n🗑️  Eliminando envíos anteriores...');
      const deleteResult = await prisma.moduleTestSubmission.deleteMany({
        where: {
          userId: maria.id,
          testId: mod2.moduleTest.id
        }
      });

      console.log('\n✅', deleteResult.count, 'envío(s) eliminado(s) exitosamente');
      console.log('\n🎯 María González puede ahora realizar el test nuevamente');
      console.log('\nEl test mostrará las nuevas funcionalidades:');
      console.log('  ✅ Checkboxes cuadrados para preguntas de selección múltiple');
      console.log('  ✅ Radio buttons circulares para preguntas de respuesta única');
      console.log('  ✅ Badges informativos sobre el tipo de pregunta');
      console.log('  ✅ Mensaje: "Selección múltiple (puede haber más de una respuesta correcta)"');
      console.log('  ✅ Indicador visual diferente según tipo de pregunta');
    } else {
      console.log('\n✅ No hay envíos previos.');
      console.log('María puede realizar el test directamente con las nuevas funcionalidades.');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetTest();

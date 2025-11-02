const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetComplete() {
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

    console.log('✅ Usuario:', maria.firstName, maria.lastName);
    console.log('   ID:', maria.id);

    // Buscar el módulo 2
    const modules = await prisma.module.findMany({
      where: { course: { slug: 'especialista-claude-code' } },
      include: { moduleTest: true },
      orderBy: { order: 'asc' }
    });

    const mod2 = modules.find(m => m.order === 2);
    
    if (!mod2) {
      console.log('No se encontró el módulo 2');
      return;
    }

    console.log('\n✅ Módulo 2:', mod2.title);
    console.log('   Módulo ID:', mod2.id);
    console.log('   Test ID:', mod2.moduleTest ? mod2.moduleTest.id : 'N/A');

    // 1. Buscar calificaciones (GradeRecord)
    const gradeRecords = await prisma.gradeRecord.findMany({
      where: {
        userId: maria.id,
        moduleId: mod2.id
      }
    });

    console.log('\n📊 Calificaciones (GradeRecord) encontradas:', gradeRecords.length);
    
    if (gradeRecords.length > 0) {
      gradeRecords.forEach((grade, index) => {
        console.log('\n   Calificación', index + 1);
        console.log('   - ID:', grade.id);
        console.log('   - Tipo:', grade.type);
        console.log('   - Nota:', grade.score);
        console.log('   - Fecha:', grade.achievedAt);
      });

      // Eliminar calificaciones
      console.log('\n🗑️  Eliminando calificaciones...');
      const deleteGrades = await prisma.gradeRecord.deleteMany({
        where: {
          userId: maria.id,
          moduleId: mod2.id
        }
      });

      console.log('✅', deleteGrades.count, 'calificación(es) eliminada(s)');
    }

    // 2. Buscar envíos del test
    if (mod2.moduleTest) {
      const testSubmissions = await prisma.moduleTestSubmission.findMany({
        where: {
          userId: maria.id,
          testId: mod2.moduleTest.id
        }
      });

      console.log('\n📝 Envíos del test encontrados:', testSubmissions.length);

      if (testSubmissions.length > 0) {
        testSubmissions.forEach((sub, index) => {
          console.log('\n   Envío', index + 1);
          console.log('   - ID:', sub.id);
          console.log('   - Nota:', sub.score);
          console.log('   - Aprobado:', sub.passed ? 'Sí' : 'No');
        });

        // Eliminar envíos
        console.log('\n🗑️  Eliminando envíos del test...');
        const deleteSubmissions = await prisma.moduleTestSubmission.deleteMany({
          where: {
            userId: maria.id,
            testId: mod2.moduleTest.id
          }
        });

        console.log('✅', deleteSubmissions.count, 'envío(s) eliminado(s)');
      }
    }

    console.log('\n🎯 ¡RESETEO COMPLETO!');
    console.log('\nMaría González ahora puede:');
    console.log('  ✅ Acceder al test del módulo 2 como si fuera la primera vez');
    console.log('  ✅ Ver el test sin el modo "revisión"');
    console.log('  ✅ Realizar el test con las nuevas funcionalidades:');
    console.log('     - Checkboxes para preguntas múltiples');
    console.log('     - Radio buttons para preguntas únicas');
    console.log('     - Badges informativos');
    console.log('     - Indicadores visuales claros');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetComplete();

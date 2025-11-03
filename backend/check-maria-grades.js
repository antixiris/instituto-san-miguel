const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkGrades() {
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
      orderBy: { order: 'asc' }
    });

    const mod2 = modules.find(m => m.order === 2);
    
    if (!mod2) {
      console.log('No se encontró el módulo 2');
      return;
    }

    console.log('\n✅ Módulo 2:', mod2.title);
    console.log('   ID:', mod2.id);

    // Buscar todas las calificaciones de módulos de María
    const moduleGrades = await prisma.moduleGrade.findMany({
      where: {
        userId: maria.id
      },
      include: {
        module: true
      }
    });

    console.log('\n📊 Calificaciones de módulos encontradas:', moduleGrades.length);
    
    if (moduleGrades.length > 0) {
      moduleGrades.forEach((grade, index) => {
        console.log('\nCalificación', index + 1);
        console.log('  ID:', grade.id);
        console.log('  Módulo:', grade.module.title);
        console.log('  Nota:', grade.grade);
        console.log('  Aprobado:', grade.passed ? 'Sí' : 'No');
        console.log('  Fecha:', grade.completedAt);
      });

      // Buscar específicamente la del módulo 2
      const mod2Grade = moduleGrades.find(g => g.moduleId === mod2.id);
      if (mod2Grade) {
        console.log('\n🎯 ENCONTRADA CALIFICACIÓN DEL MÓDULO 2');
        console.log('   Esta es la que impide volver a hacer el test');
        console.log('   ID:', mod2Grade.id);
        console.log('   Nota:', mod2Grade.grade);
      }
    } else {
      console.log('\n✅ No hay calificaciones de módulos registradas');
    }

    // Buscar envíos del test
    const testSubmissions = await prisma.moduleTestSubmission.findMany({
      where: {
        userId: maria.id
      },
      include: {
        test: {
          include: {
            module: true
          }
        }
      }
    });

    console.log('\n📝 Envíos de tests encontrados:', testSubmissions.length);
    if (testSubmissions.length > 0) {
      testSubmissions.forEach((sub, index) => {
        console.log('\nEnvío', index + 1);
        console.log('  Módulo:', sub.test.module.title);
        console.log('  Nota:', sub.score);
        console.log('  Aprobado:', sub.passed ? 'Sí' : 'No');
      });
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkGrades();

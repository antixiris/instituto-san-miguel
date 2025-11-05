const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Importar la función de verificación de achievements
const { checkAllAchievements } = require('./dist/services/gamificationService');

async function syncMariaAchievements() {
  console.log('🏆 Sincronizando logros de María...\n');

  // Obtener María
  const maria = await prisma.user.findUnique({
    where: { email: 'estudiante@institutosanmiguel.com' }
  });

  if (!maria) {
    console.error('❌ No se encontró a María');
    return;
  }

  console.log(`👤 Usuario: ${maria.firstName} ${maria.lastName}`);
  console.log(`📧 Email: ${maria.email}\n`);

  // Verificar achievements antes
  const achievementsBefore = await prisma.userAchievement.findMany({
    where: { userId: maria.id },
    include: {
      achievement: true
    }
  });

  console.log(`📊 Logros antes de sincronizar: ${achievementsBefore.length}\n`);

  // Ejecutar verificación automática de TODOS los achievements
  console.log('🔄 Verificando todos los achievements...\n');

  try {
    const newlyUnlocked = await checkAllAchievements(maria.id);

    console.log(`✅ Verificación completada!\n`);
    console.log(`🎉 Nuevos logros desbloqueados: ${newlyUnlocked.length}\n`);

    if (newlyUnlocked.length > 0) {
      console.log('═══════════════════════════════════════════');
      console.log('🏆 LOGROS RECIÉN DESBLOQUEADOS:');
      console.log('═══════════════════════════════════════════\n');

      newlyUnlocked.forEach((achievement, index) => {
        console.log(`${index + 1}. ${achievement.icon} ${achievement.name}`);
        console.log(`   ${achievement.description}`);
        console.log(`   Tipo: ${achievement.type} | +${achievement.points} XP\n`);
      });
    }

    // Verificar achievements después
    const achievementsAfter = await prisma.userAchievement.findMany({
      where: { userId: maria.id },
      include: {
        achievement: true
      },
      orderBy: {
        earnedAt: 'desc'
      }
    });

    console.log('═══════════════════════════════════════════');
    console.log('📊 RESUMEN FINAL:');
    console.log('═══════════════════════════════════════════\n');
    console.log(`Total de logros desbloqueados: ${achievementsAfter.length}\n`);

    if (achievementsAfter.length > 0) {
      // Agrupar por tipo
      const byType = achievementsAfter.reduce((acc, ua) => {
        const type = ua.achievement.type;
        if (!acc[type]) acc[type] = [];
        acc[type].push(ua);
        return acc;
      }, {});

      console.log('Por tipo:');
      Object.entries(byType).forEach(([type, achievements]) => {
        console.log(`  ${type}: ${achievements.length}`);
      });

      console.log('\n🎖️  Todos los logros desbloqueados:');
      achievementsAfter.forEach((ua, index) => {
        console.log(`  ${index + 1}. ${ua.achievement.icon} ${ua.achievement.name} (+${ua.achievement.points} XP)`);
      });

      // Calcular XP total de achievements
      const totalAchievementXP = achievementsAfter.reduce((sum, ua) => sum + ua.achievement.points, 0);
      console.log(`\n💰 XP total de logros: ${totalAchievementXP} XP`);
    }

  } catch (error) {
    console.error('❌ Error durante la sincronización:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }

  console.log('\n✅ Sincronización completada con éxito!\n');
}

syncMariaAchievements().catch(console.error);

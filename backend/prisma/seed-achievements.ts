import { PrismaClient, AchievementType } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAchievements() {
  console.log('🎯 Iniciando seed de Achievements...\n');

  // Eliminar achievements existentes
  console.log('🗑️  Limpiando achievements existentes...');
  await prisma.achievement.deleteMany();
  console.log('✅ Achievements eliminados\n');

  // ===============================================
  // FASE 1: 15 ACHIEVEMENTS ESENCIALES
  // ===============================================

  const achievements = [
    // ========== PROGRESO (5 achievements) ==========
    {
      name: '🎬 Primer Paso',
      description: '¡Tu viaje con Claude Code comienza aquí!',
      icon: '🌟',
      type: AchievementType.PROGRESS,
      criteria: JSON.stringify({ type: 'lesson_completed', lessonOrder: 1, moduleOrder: 1 }),
      points: 10,
    },
    {
      name: '📚 Aprendiz Constante',
      description: 'Completaste tu primer módulo completo',
      icon: '📖',
      type: AchievementType.PROGRESS,
      criteria: JSON.stringify({ type: 'module_completed', moduleOrder: 1 }),
      points: 30,
    },
    {
      name: '🚀 A Medio Camino',
      description: '¡Alcanzaste el 50% del curso!',
      icon: '⚡',
      type: AchievementType.PROGRESS,
      criteria: JSON.stringify({ type: 'course_progress', percentage: 50 }),
      points: 50,
    },
    {
      name: '🏆 Casi Allí',
      description: 'Completaste el 80% del curso. ¡El final está cerca!',
      icon: '🎯',
      type: AchievementType.PROGRESS,
      criteria: JSON.stringify({ type: 'course_progress', percentage: 80 }),
      points: 75,
    },
    {
      name: '💎 Maestro Claude Code',
      description: '¡Completaste el 100% del curso! Eres un maestro',
      icon: '👑',
      type: AchievementType.PROGRESS,
      criteria: JSON.stringify({ type: 'course_completed' }),
      points: 300,
    },

    // ========== EXCELENCIA (3 achievements) ==========
    {
      name: '🎯 Primera Victoria',
      description: 'Aprobaste tu primer test de módulo',
      icon: '✅',
      type: AchievementType.EXCELLENCE,
      criteria: JSON.stringify({ type: 'test_passed', count: 1 }),
      points: 20,
    },
    {
      name: '💯 Perfección',
      description: 'Sacaste 10/10 en un test de módulo',
      icon: '⭐',
      type: AchievementType.EXCELLENCE,
      criteria: JSON.stringify({ type: 'perfect_score', score: 10 }),
      points: 50,
    },
    {
      name: '🏅 Maestro de Tests',
      description: 'Aprobaste todos los tests del curso',
      icon: '🎓',
      type: AchievementType.EXCELLENCE,
      criteria: JSON.stringify({ type: 'all_tests_passed' }),
      points: 100,
    },

    // ========== CONSISTENCIA (4 achievements) ==========
    {
      name: '🔥 Primera Racha',
      description: '3 días consecutivos estudiando. ¡Sigue así!',
      icon: '🌱',
      type: AchievementType.CONSISTENCY,
      criteria: JSON.stringify({ type: 'streak', days: 3 }),
      points: 15,
    },
    {
      name: '⚡ Imparable',
      description: '7 días consecutivos de estudio',
      icon: '💪',
      type: AchievementType.CONSISTENCY,
      criteria: JSON.stringify({ type: 'streak', days: 7 }),
      points: 30,
    },
    {
      name: '🌟 Disciplina Férrea',
      description: '14 días consecutivos. ¡Increíble dedicación!',
      icon: '🔱',
      type: AchievementType.CONSISTENCY,
      criteria: JSON.stringify({ type: 'streak', days: 14 }),
      points: 75,
    },
    {
      name: '👑 Dedicación Absoluta',
      description: '30 días consecutivos. Eres una leyenda',
      icon: '🏆',
      type: AchievementType.CONSISTENCY,
      criteria: JSON.stringify({ type: 'streak', days: 30 }),
      points: 250,
    },

    // ========== ESPECIALIZACIÓN (2 achievements) ==========
    {
      name: '🎨 Maestro Frontend',
      description: 'Dominaste el Módulo 4: React + TypeScript',
      icon: '⚛️',
      type: AchievementType.SPECIALIZATION,
      criteria: JSON.stringify({ type: 'module_mastery', moduleOrder: 4, testScore: 9 }),
      points: 40,
    },
    {
      name: '⚙️ Maestro Backend',
      description: 'Dominaste el Módulo 6: Node.js + APIs',
      icon: '🔧',
      type: AchievementType.SPECIALIZATION,
      criteria: JSON.stringify({ type: 'module_mastery', moduleOrder: 6, testScore: 9 }),
      points: 40,
    },

    // ========== HIDDEN (1 achievement) ==========
    {
      name: '🦄 Explorador Curioso',
      description: '¿Cómo encontraste esto? ¡Bien hecho!',
      icon: '🎁',
      type: AchievementType.HIDDEN,
      criteria: JSON.stringify({ type: 'easter_egg', code: 'claude_rocks' }),
      points: 25,
    },
  ];

  // Insertar achievements
  console.log('✨ Creando achievements...\n');

  for (const achievement of achievements) {
    await prisma.achievement.create({
      data: achievement,
    });
    console.log(`✅ ${achievement.icon} ${achievement.name} - ${achievement.points} XP`);
  }

  console.log('\n═══════════════════════════════════════════');
  console.log('✅ SEED DE ACHIEVEMENTS COMPLETADO');
  console.log('═══════════════════════════════════════════');
  console.log(`📊 Total achievements creados: ${achievements.length}`);
  console.log('\nDistribución por tipo:');
  console.log(`  🎯 Progreso: ${achievements.filter(a => a.type === AchievementType.PROGRESS).length}`);
  console.log(`  ⭐ Excelencia: ${achievements.filter(a => a.type === AchievementType.EXCELLENCE).length}`);
  console.log(`  🔥 Consistencia: ${achievements.filter(a => a.type === AchievementType.CONSISTENCY).length}`);
  console.log(`  🎓 Especialización: ${achievements.filter(a => a.type === AchievementType.SPECIALIZATION).length}`);
  console.log(`  🎁 Ocultos: ${achievements.filter(a => a.type === AchievementType.HIDDEN).length}`);
  console.log(`\n💯 Total XP disponible en achievements: ${achievements.reduce((sum, a) => sum + a.points, 0)} XP`);
  console.log('═══════════════════════════════════════════\n');

  await prisma.$disconnect();
}

seedAchievements()
  .then(() => {
    console.log('🎉 Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

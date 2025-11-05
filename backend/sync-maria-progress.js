const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function syncMariaProgress() {
  console.log('🔄 Sincronizando progreso histórico de María...\n');

  // Obtener María
  const maria = await prisma.user.findUnique({
    where: { email: 'estudiante@institutosanmiguel.com' },
    include: {
      progressRecords: {
        where: { completed: true },
        orderBy: { completedAt: 'asc' }
      },
      moduleTestSubmissions: {
        where: { passed: true },
        orderBy: { completedAt: 'asc' }
      },
      userProgress: true
    }
  });

  if (!maria) {
    console.error('❌ No se encontró a María');
    return;
  }

  console.log('📊 Progreso encontrado:');
  console.log(`   - ${maria.progressRecords.length} lecciones completadas`);
  console.log(`   - ${maria.moduleTestSubmissions.length} tests aprobados`);

  // Agrupar tests por testId para contar solo únicos
  const uniqueTests = new Map();
  maria.moduleTestSubmissions.forEach(submission => {
    if (!uniqueTests.has(submission.testId) ||
        submission.completedAt < uniqueTests.get(submission.testId).completedAt) {
      uniqueTests.set(submission.testId, submission);
    }
  });

  console.log(`   - ${uniqueTests.size} tests únicos aprobados\n`);

  // Calcular XP
  const lessonsXP = maria.progressRecords.length * 50; // 50 XP por lección
  const testsXP = uniqueTests.size * 100; // 100 XP por test
  const totalXP = lessonsXP + testsXP;

  console.log('💰 Calculando XP:');
  console.log(`   - Lecciones: ${maria.progressRecords.length} × 50 XP = ${lessonsXP} XP`);
  console.log(`   - Tests: ${uniqueTests.size} × 100 XP = ${testsXP} XP`);
  console.log(`   - Total: ${totalXP} XP\n`);

  // Calcular nivel
  const LEVELS = [
    { level: 1, minXP: 0, maxXP: 499 },
    { level: 2, minXP: 500, maxXP: 1499 },
    { level: 3, minXP: 1500, maxXP: 2999 },
    { level: 4, minXP: 3000, maxXP: 4999 },
    { level: 5, minXP: 5000, maxXP: 7999 },
    { level: 6, minXP: 8000, maxXP: 11999 },
    { level: 7, minXP: 12000, maxXP: Infinity }
  ];

  const currentLevelInfo = LEVELS.find(l => totalXP >= l.minXP && totalXP <= l.maxXP);
  const currentLevel = currentLevelInfo?.level || 1;

  console.log(`🎖️  Nivel calculado: ${currentLevel}\n`);

  // Calcular racha (todos los días consecutivos con actividad)
  const activityDates = [
    ...maria.progressRecords.map(p => p.completedAt),
    ...Array.from(uniqueTests.values()).map(t => t.completedAt)
  ].sort((a, b) => b - a); // Más reciente primero

  let currentStreak = 0;
  let longestStreak = 0;
  let lastDate = null;

  const uniqueDates = [...new Set(activityDates.map(d => {
    const date = new Date(d);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }))].sort().reverse();

  console.log('📅 Fechas de actividad únicas:', uniqueDates.length);

  for (let i = 0; i < uniqueDates.length; i++) {
    const currentDate = new Date(uniqueDates[i]);

    if (i === 0) {
      // Primera fecha (más reciente)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const activityDate = new Date(currentDate);
      activityDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((today - activityDate) / (1000 * 60 * 60 * 24));

      if (diffDays <= 1) {
        // Actividad hoy o ayer, la racha está activa
        currentStreak = 1;
        longestStreak = 1;
      }
      lastDate = currentDate;
    } else {
      // Verificar si es consecutiva
      const prevDate = new Date(uniqueDates[i - 1]);
      const diffDays = Math.floor((prevDate - currentDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else if (currentStreak > 0) {
        // La racha se rompió pero seguimos buscando la más larga
        const tempStreak = 1;
        // Aquí podríamos implementar búsqueda de la racha más larga histórica
      }
    }
  }

  console.log(`🔥 Racha actual: ${currentStreak} días`);
  console.log(`🏆 Racha más larga: ${longestStreak} días\n`);

  // Actualizar UserProgress
  const lastActivityDate = activityDates.length > 0 ? activityDates[0] : new Date();

  const updated = await prisma.userProgress.update({
    where: { userId: maria.id },
    data: {
      totalXP,
      currentLevel,
      currentStreak,
      longestStreak,
      lastActivityDate,
      totalLessonsCompleted: maria.progressRecords.length,
      totalExercisesCompleted: 0, // Por ahora no tenemos ejercicios en el sistema
      totalTestsPassed: uniqueTests.size
    }
  });

  console.log('✅ Progreso actualizado:');
  console.log(JSON.stringify(updated, null, 2));

  await prisma.$disconnect();
}

syncMariaProgress().catch(console.error);

import React, { useEffect, useState } from 'react';
import { Trophy, Target, Flame, BookOpen, CheckCircle, Award } from 'lucide-react';
import api from '../../services/api';

interface LevelInfo {
  currentLevel: number;
  currentLevelName: string;
  totalXP: number;
  xpInCurrentLevel: number;
  xpNeededForNextLevel: number;
  progressToNextLevel: number;
  nextLevelName: string;
  isMaxLevel: boolean;
}

interface UserProgress {
  id: string;
  totalXP: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  totalLessonsCompleted: number;
  totalExercisesCompleted: number;
  totalTestsPassed: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: string;
  points: number;
  unlocked?: boolean;
  unlockedAt?: string;
}

interface DashboardData {
  progress: UserProgress;
  level: LevelInfo;
  achievements: {
    unlocked: Array<{ achievement: Achievement; earnedAt: string }>;
    total: Achievement[];
    unlockedCount: number;
    totalCount: number;
    completionPercentage: number;
  };
  stats: {
    lessonsCompleted: number;
    exercisesCompleted: number;
    testsPassed: number;
    currentStreak: number;
    longestStreak: number;
    courseProgress: number;
  };
}

const DashboardProgress: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await api.get('/gamification/dashboard');
      setDashboardData(response.data.data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching dashboard:', err);
      setError(err.response?.data?.error || 'Error al cargar el dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { progress, level, achievements, stats } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Header con Nivel y XP */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold">{level.currentLevelName}</h2>
            <p className="text-blue-100">Nivel {level.currentLevel}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{level.totalXP} XP</div>
            <p className="text-blue-100 text-sm">Total acumulado</p>
          </div>
        </div>

        {/* Barra de Progreso al Siguiente Nivel */}
        {!level.isMaxLevel && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progreso al siguiente nivel</span>
              <span>{Math.round(level.progressToNextLevel)}%</span>
            </div>
            <div className="w-full bg-blue-800 rounded-full h-4 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${level.progressToNextLevel}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-2 text-blue-100">
              <span>{level.xpInCurrentLevel} XP</span>
              <span>
                {level.xpNeededForNextLevel - level.xpInCurrentLevel} XP para {level.nextLevelName}
              </span>
            </div>
          </div>
        )}

        {level.isMaxLevel && (
          <div className="text-center py-2">
            <p className="text-lg font-semibold">🎉 ¡Has alcanzado el nivel máximo!</p>
          </div>
        )}
      </div>

      {/* Estadísticas Clave */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Lecciones Completadas */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.lessonsCompleted}</span>
          </div>
          <p className="text-sm text-gray-600">Lecciones completadas</p>
        </div>

        {/* Ejercicios Completados */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.exercisesCompleted}</span>
          </div>
          <p className="text-sm text-gray-600">Ejercicios completados</p>
        </div>

        {/* Tests Aprobados */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.testsPassed}</span>
          </div>
          <p className="text-sm text-gray-600">Tests aprobados</p>
        </div>

        {/* Racha Actual */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Flame className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.currentStreak}</span>
          </div>
          <p className="text-sm text-gray-600">
            Días consecutivos
            {stats.longestStreak > 0 && (
              <span className="text-xs text-gray-500 block">
                (Mejor: {stats.longestStreak} días)
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Galería de Logros Completa */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Galería de Logros
            </h3>
            <div className="text-sm font-semibold text-gray-900">
              {achievements.unlockedCount} / {achievements.totalCount}
              <span className="text-gray-500 ml-2">
                ({Math.round(achievements.completionPercentage)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Barra de progreso de logros */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${achievements.completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {achievements.unlocked.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="font-medium">Aún no has desbloqueado ningún logro.</p>
              <p className="text-sm mt-1">¡Completa lecciones, ejercicios y tests para empezar tu colección!</p>
            </div>
          ) : (
            <>
              {/* Logros Desbloqueados Recientes */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  ✨ Desbloqueados Recientemente
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {achievements.unlocked.slice(0, 4).map((userAchievement) => (
                    <div
                      key={userAchievement.achievement.id}
                      className="group relative flex items-center gap-3 p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      {/* Icono del logro con efecto */}
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
                        {userAchievement.achievement.icon}
                      </div>

                      {/* Información */}
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-gray-900 truncate">
                          {userAchievement.achievement.name}
                        </h5>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {userAchievement.achievement.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-yellow-600">
                            +{userAchievement.achievement.points} XP
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {new Date(userAchievement.earnedAt).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Badge de tipo */}
                      <div className="absolute top-2 right-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          userAchievement.achievement.type === 'PROGRESS' ? 'bg-blue-100 text-blue-700' :
                          userAchievement.achievement.type === 'EXCELLENCE' ? 'bg-purple-100 text-purple-700' :
                          userAchievement.achievement.type === 'CONSISTENCY' ? 'bg-green-100 text-green-700' :
                          userAchievement.achievement.type === 'SPECIALIZATION' ? 'bg-orange-100 text-orange-700' :
                          'bg-pink-100 text-pink-700'
                        }`}>
                          {userAchievement.achievement.type === 'PROGRESS' && 'Progreso'}
                          {userAchievement.achievement.type === 'EXCELLENCE' && 'Excelencia'}
                          {userAchievement.achievement.type === 'CONSISTENCY' && 'Consistencia'}
                          {userAchievement.achievement.type === 'SPECIALIZATION' && 'Especialización'}
                          {userAchievement.achievement.type === 'HIDDEN' && 'Oculto'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Todos los Logros (grid compacto) */}
              {achievements.total.length > 4 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    🏆 Todos los Logros
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {achievements.total.map((achievement) => {
                      const isUnlocked = achievements.unlocked.some(
                        (ua) => ua.achievement.id === achievement.id
                      );
                      return (
                        <div
                          key={achievement.id}
                          className={`group relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                            isUnlocked
                              ? 'bg-yellow-50 border-yellow-300 hover:shadow-md'
                              : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-80'
                          }`}
                          title={`${achievement.name} - ${achievement.description}`}
                        >
                          <div className="text-center">
                            <div className={`text-3xl mb-2 transition-transform duration-200 group-hover:scale-110 ${
                              !isUnlocked && 'grayscale'
                            }`}>
                              {achievement.icon}
                            </div>
                            <p className={`text-xs font-medium truncate ${
                              isUnlocked ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {achievement.name.replace(/^[^\s]+ /, '')}
                            </p>
                            <p className={`text-xs font-semibold mt-1 ${
                              isUnlocked ? 'text-yellow-600' : 'text-gray-400'
                            }`}>
                              {isUnlocked ? `+${achievement.points}` : '🔒'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Progreso del Curso */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Progreso General del Curso</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Completado</span>
              <span className="font-semibold text-gray-900">
                {Math.round(stats.courseProgress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.courseProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.lessonsCompleted}</div>
              <div className="text-sm text-gray-600">Lecciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.exercisesCompleted}</div>
              <div className="text-sm text-gray-600">Ejercicios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.testsPassed}</div>
              <div className="text-sm text-gray-600">Tests</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProgress;

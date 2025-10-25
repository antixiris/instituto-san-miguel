import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Award,
  BookOpen,
  Target,
  Calendar,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from 'lucide-react';

interface GradesPanelProps {
  courseId: string;
}

interface GradeData {
  courseId: string;
  userId: string;
  finalGrade: number;
  totalGameExercises: number;
  totalModuleTests: number;
  gameExerciseGrades: any[];
  moduleTestGrades: any[];
  gradesByModule: any[];
}

interface ProgressData {
  courseId: string;
  courseTitle: string;
  enrolledAt: string;
  overallProgress: number;
  totalModules: number;
  moduleStats: any[];
  timeline: any[];
}

export default function GradesPanel({ courseId }: GradesPanelProps) {
  const [grades, setGrades] = useState<GradeData | null>(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'timeline'>('overview');

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const [gradesRes, progressRes] = await Promise.all([
        fetch(`http://localhost:3001/api/courses/${courseId}/my-grades`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`http://localhost:3001/api/courses/${courseId}/my-progress`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (gradesRes.ok && progressRes.ok) {
        const gradesData = await gradesRes.json();
        const progressData = await progressRes.json();
        setGrades(gradesData.data);
        setProgress(progressData.data);
      } else {
        setError('No se pudieron cargar las calificaciones');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return 'text-green-600 dark:text-green-400';
    if (grade >= 7) return 'text-blue-600 dark:text-blue-400';
    if (grade >= 5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradeBgColor = (grade: number) => {
    if (grade >= 9) return 'bg-green-100 dark:bg-green-900/20';
    if (grade >= 7) return 'bg-blue-100 dark:bg-blue-900/20';
    if (grade >= 5) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !grades || !progress) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
        {error || 'No se pudieron cargar las calificaciones'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Nota Final</p>
              <p className={`text-3xl font-bold ${getGradeColor(grades.finalGrade)}`}>
                {grades.finalGrade.toFixed(1)}
              </p>
            </div>
            <Award className={`w-12 h-12 ${getGradeColor(grades.finalGrade)}`} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tests Completados</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {grades.totalModuleTests}/{progress.totalModules}
              </p>
            </div>
            <Target className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ejercicios</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {grades.totalGameExercises}
              </p>
            </div>
            <BookOpen className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Progreso</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {Math.round(progress.overallProgress)}%
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Vista General
            </button>
            <button
              onClick={() => setActiveTab('modules')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'modules'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Por Módulo
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'timeline'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Evolución Temporal
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Tests de Módulo */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Tests de Módulo
                </h3>
                {grades.moduleTestGrades.length > 0 ? (
                  <div className="space-y-3">
                    {grades.moduleTestGrades.map((grade: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getGradeBgColor(grade.score)}`}>
                            <span className={`font-bold ${getGradeColor(grade.score)}`}>
                              {grade.score.toFixed(1)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Módulo {index + 1}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(grade.achievedAt)}
                            </p>
                          </div>
                        </div>
                        {grade.score >= 5 ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    Aún no has completado ningún test de módulo
                  </p>
                )}
              </div>

              {/* Ejercicios Gamificados */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Ejercicios Gamificados ({grades.totalGameExercises})
                </h3>
                {grades.totalGameExercises > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Nota promedio:
                      </span>
                      <span className={`font-semibold ${getGradeColor(
                        grades.gameExerciseGrades.reduce((sum: number, g: any) => sum + g.score, 0) /
                          grades.gameExerciseGrades.length
                      )}`}>
                        {(
                          grades.gameExerciseGrades.reduce((sum: number, g: any) => sum + g.score, 0) /
                          grades.gameExerciseGrades.length
                        ).toFixed(1)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{
                          width: `${
                            ((grades.gameExerciseGrades.reduce((sum: number, g: any) => sum + g.score, 0) /
                              grades.gameExerciseGrades.length) /
                              10) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    Aún no has completado ningún ejercicio gamificado
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Modules Tab */}
          {activeTab === 'modules' && (
            <div className="space-y-4">
              {progress.moduleStats.map((module: any) => (
                <div
                  key={module.moduleId}
                  className="p-5 bg-gray-50 dark:bg-gray-900/30 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {module.moduleTitle}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Módulo {module.moduleOrder}
                      </p>
                    </div>
                    {module.testScore !== null && (
                      <div className={`px-4 py-2 rounded-lg ${getGradeBgColor(module.testScore)}`}>
                        <span className={`font-bold text-lg ${getGradeColor(module.testScore)}`}>
                          {module.testScore.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Lecciones</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {module.completedLessons}/{module.totalLessons}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Ejercicios</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {module.exerciseCount}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Progreso</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {Math.round(module.completionPercentage)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                        style={{ width: `${module.completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  {module.testCompleted && (
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Test completado
                        {module.averageExerciseScore !== null &&
                          ` - Promedio ejercicios: ${module.averageExerciseScore.toFixed(1)}`}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {progress.timeline.length > 0 ? (
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

                  {/* Timeline items */}
                  <div className="space-y-6">
                    {progress.timeline
                      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((item: any, index: number) => (
                        <div key={index} className="relative flex items-start gap-4 pl-16">
                          {/* Timeline dot */}
                          <div
                            className={`absolute left-6 w-5 h-5 rounded-full border-4 ${
                              item.type === 'MODULE_TEST'
                                ? 'bg-blue-500 border-blue-100 dark:border-blue-900'
                                : 'bg-purple-500 border-purple-100 dark:border-purple-900'
                            }`}
                          />

                          {/* Content */}
                          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                    item.type === 'MODULE_TEST'
                                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                  }`}
                                >
                                  {item.type === 'MODULE_TEST' ? 'Test de Módulo' : 'Ejercicio'}
                                </span>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {formatDate(item.date)}
                                </p>
                              </div>
                              <div className={`text-2xl font-bold ${getGradeColor(item.score)}`}>
                                {item.score.toFixed(1)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  Aún no tienes actividad registrada
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

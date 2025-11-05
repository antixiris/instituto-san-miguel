import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileEdit, CheckCircle, XCircle, Clock, Trophy, Target } from 'lucide-react';
import api from '../../../services/api';

interface GameExercise {
  id: string;
  title: string;
  type: string;
  points: number;
  timeLimit?: number;
  isActive: boolean;
  lesson: {
    id: string;
    title: string;
    module: {
      id: string;
      title: string;
      order: number;
    };
  };
  submissions?: Array<{
    id: string;
    score: number;
    passed: boolean;
    completedAt: string;
  }>;
  bestScore?: number;
  attempts?: number;
  completed?: boolean;
}

export default function ExercisesPage() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<GameExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const response = await api.get('/game-exercises/my-exercises');
      setExercises(response.data.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'MULTIPLE_CHOICE':
        return '📝';
      case 'TRUE_FALSE':
        return '✅';
      case 'FILL_BLANKS':
        return '📋';
      case 'MATCHING_PAIRS':
        return '🔗';
      case 'SEQUENCE_ORDER':
        return '🔢';
      case 'CODE_CHALLENGE':
        return '💻';
      default:
        return '📌';
    }
  };

  const getTypeName = (type: string) => {
    const types: Record<string, string> = {
      MULTIPLE_CHOICE: 'Opción Múltiple',
      TRUE_FALSE: 'Verdadero/Falso',
      FILL_BLANKS: 'Completar Espacios',
      MATCHING_PAIRS: 'Emparejar',
      SEQUENCE_ORDER: 'Ordenar Secuencia',
      CODE_CHALLENGE: 'Desafío de Código',
    };
    return types[type] || type;
  };

  const filteredExercises = exercises.filter(ex => {
    if (filter === 'completed') return ex.completed;
    if (filter === 'pending') return !ex.completed;
    return true;
  });

  const stats = {
    total: exercises.length,
    completed: exercises.filter(ex => ex.completed).length,
    pending: exercises.filter(ex => !ex.completed).length,
    totalPoints: exercises.reduce((sum, ex) => sum + (ex.completed ? ex.points : 0), 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Ejercicios Gamificados
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Pon en práctica tus conocimientos y gana puntos XP
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Total</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.total}</p>
              </div>
              <FileEdit className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Completados</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Pendientes</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Puntos XP</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalPoints}</p>
              </div>
              <Trophy className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800'
            }`}
          >
            Todos ({stats.total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-green-600 text-white'
                : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800'
            }`}
          >
            Pendientes ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800'
            }`}
          >
            Completados ({stats.completed})
          </button>
        </div>

        {/* Exercises List */}
        {filteredExercises.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow border border-neutral-200 dark:border-neutral-800 p-12 text-center">
            <FileEdit className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              {filter === 'completed' && 'Aún no has completado ningún ejercicio'}
              {filter === 'pending' && '¡Felicidades! No tienes ejercicios pendientes'}
              {filter === 'all' && 'No hay ejercicios disponibles'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white dark:bg-neutral-900 rounded-lg shadow border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/campus/lecciones/${exercise.lesson.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{getTypeIcon(exercise.type)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                          {exercise.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {exercise.lesson.module.title} • {exercise.lesson.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {getTypeName(exercise.type)}
                      </span>

                      <span className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <Trophy className="w-4 h-4" />
                        {exercise.points} XP
                      </span>

                      {exercise.timeLimit && (
                        <span className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <Clock className="w-4 h-4" />
                          {Math.floor(exercise.timeLimit / 60)} min
                        </span>
                      )}

                      {exercise.attempts && exercise.attempts > 0 && (
                        <span className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                          📝 {exercise.attempts} intento{exercise.attempts > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    {exercise.completed ? (
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">Completado</span>
                        </div>
                        {exercise.bestScore !== undefined && (
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Mejor: {exercise.bestScore.toFixed(1)}/10
                          </span>
                        )}
                      </div>
                    ) : (
                      <button
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/campus/lecciones/${exercise.lesson.id}`);
                        }}
                      >
                        Comenzar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

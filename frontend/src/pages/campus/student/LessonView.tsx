import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Play, CheckCircle, BookOpen } from 'lucide-react';
import MarkdownContent from '../../../components/campus/MarkdownContent';
import GameExercise from '../../../components/campus/GameExercise';
import { useAuthStore } from '../../../store/authStore';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  type: string;
  videoUrl?: string;
  videoDuration?: number;
  order: number;
  isPublished: boolean;
  module: {
    id: string;
    title: string;
    course: {
      id: string;
      title: string;
      slug: string;
    };
  };
  gameExercise?: {
    id: string;
    title: string;
    type: string;
    instructions: string;
    points: number;
    timeLimit?: number;
    isActive: boolean;
  } | null;
}

export default function LessonView() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [showExercise, setShowExercise] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  useEffect(() => {
    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId]);

  const handleAuthError = (response: Response) => {
    if (response.status === 401) {
      alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      logout();
      navigate('/');
      return true;
    }
    return false;
  };

  const fetchLesson = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/lessons/${lessonId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (handleAuthError(response)) {
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setLesson(data.data);
      } else {
        console.error('Error loading lesson:', data.error);
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleExerciseComplete = (score: number, passed: boolean) => {
    setExerciseCompleted(passed);
    setShowExercise(false);
    // Aquí podrías agregar lógica para marcar la lección como completada
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600 dark:text-neutral-400">Lección no encontrada</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-orange-600 hover:text-orange-700"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(`/campus/cursos/${lesson.module.course.slug}`)}
            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al curso
          </button>

          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                {lesson.module.course.title} / {lesson.module.title}
              </p>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                {lesson.title}
              </h1>
              {lesson.description && (
                <p className="text-neutral-600 dark:text-neutral-400">
                  {lesson.description}
                </p>
              )}
              {lesson.videoDuration && (
                <div className="flex items-center gap-2 mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(lesson.videoDuration)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Video */}
        {lesson.videoUrl && (
          <div className="mb-8">
            <div className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-lg">
              {lesson.videoUrl.includes('youtube.com') || lesson.videoUrl.includes('youtu.be') ? (
                <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src={lesson.videoUrl.replace('watch?v=', 'embed/')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              ) : (
                <video controls className="w-full">
                  <source src={lesson.videoUrl} />
                  Tu navegador no soporta el elemento de video.
                </video>
              )}
            </div>
          </div>
        )}

        {/* Lesson Content */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-orange-600" />
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Contenido de la Lección
            </h2>
          </div>

          <MarkdownContent content={lesson.content} />
        </div>

        {/* Exercise Section */}
        {lesson.gameExercise && lesson.gameExercise.isActive && (
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8">
            {!showExercise ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {exerciseCompleted ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <Play className="w-8 h-8 text-orange-600" />
                  )}
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {exerciseCompleted ? 'Ejercicio Completado' : 'Ejercicio Práctico'}
                  </h2>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  {exerciseCompleted
                    ? '¡Excelente trabajo! Has completado el ejercicio de esta lección.'
                    : 'Pon en práctica lo aprendido con un ejercicio gamificado.'}
                </p>

                <button
                  onClick={() => setShowExercise(true)}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {exerciseCompleted ? 'Repetir Ejercicio' : 'Comenzar Ejercicio'}
                </button>
              </div>
            ) : (
              <div>
                <GameExercise
                  exerciseId={lesson.gameExercise.id}
                  lessonId={lesson.id}
                  onComplete={handleExerciseComplete}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

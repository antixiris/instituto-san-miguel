import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Lock, Unlock, Play, FileText, Award, Clock, ChevronLeft, ChevronRight, Trophy, Star, Crown, ThumbsUp, ThumbsDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import confetti from 'canvas-confetti';
import 'highlight.js/styles/github-dark.css';

interface Lesson {
  id: string;
  title: string;
  type: string;
  order: number;
  content?: string;
  videoUrl?: string;
  isFree: boolean;
  isPublished: boolean;
  videoDuration?: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  isPublished: boolean;
  lessons: Lesson[];
  moduleTest?: {
    id: string;
    title: string;
  };
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  level: string;
  duration: number | null;
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
  modules: Module[];
}

export default function CourseLearningPage() {
  const { slug, courseId } = useParams<{ slug?: string; courseId?: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [moduleGrades, setModuleGrades] = useState<Map<string, number>>(new Map());
  const [isContentBlocked, setIsContentBlocked] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [slug, courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = slug
        ? `http://localhost:3001/api/courses/${slug}`
        : `http://localhost:3001/api/courses/${courseId}`;

      const token = localStorage.getItem('token');
      const response = await fetch(endpoint, {
        headers: token ? {
          'Authorization': `Bearer ${token}`,
        } : {},
      });

      if (!response.ok) {
        throw new Error('Error al cargar el curso');
      }

      const data = await response.json();
      setCourse(data.data);

      // Cargar progreso de lecciones completadas y módulos aprobados
      if (token && data.data.id) {
        try {
          const progressResponse = await fetch(
            `http://localhost:3001/api/courses/${data.data.id}/progress`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );

          if (progressResponse.ok) {
            const progressData = await progressResponse.json();
            const completed = new Set<string>();
            const modulesCompleted = new Set<string>();

            progressData.data.modules?.forEach((module: any) => {
              module.lessons?.forEach((lesson: any) => {
                if (lesson.progress?.completed) {
                  completed.add(lesson.id);
                }
              });
            });

            setCompletedLessons(completed);

            // Obtener módulos con tests aprobados
            const gradesResponse = await fetch(
              `http://localhost:3001/api/courses/${data.data.id}/my-grades`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              }
            );

            if (gradesResponse.ok) {
              const gradesData = await gradesResponse.json();
              const grades = new Map<string, number>();

              // Extraer módulos con tests aprobados y sus calificaciones
              gradesData.data.moduleTestGrades?.forEach((grade: any) => {
                if (grade.moduleId) {
                  grades.set(grade.moduleId, grade.score);
                  if (grade.score >= 5.0) {
                    modulesCompleted.add(grade.moduleId);
                  }
                }
              });

              setCompletedModules(modulesCompleted);
              setModuleGrades(grades);
            }
          }
        } catch (progressErr) {
          console.error('Error loading progress:', progressErr);
        }
      }

      if (data.data.modules?.[0]?.lessons?.[0]) {
        await fetchLessonContent(data.data.modules[0].lessons[0].id);
      }
    } catch (err: any) {
      console.error('Error fetching course:', err);
      setError(err.message || 'Error al cargar el curso');
    } finally {
      setLoading(false);
    }
  };

  const fetchLessonContent = async (lessonId: string) => {
    try {
      // Verificar si la lección está bloqueada
      if (isLessonBlocked(lessonId)) {
        setIsContentBlocked(true);
        setSelectedLesson(null);
        return;
      }

      setIsContentBlocked(false);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/lessons/${lessonId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar la lección');
      }

      const data = await response.json();
      setSelectedLesson(data.data);

      // Hacer scroll al inicio del contenido
      const contentElement = document.querySelector('.flex-1.overflow-y-auto');
      if (contentElement) {
        contentElement.scrollTop = 0;
      }
    } catch (err: any) {
      console.error('Error fetching lesson:', err);
    }
  };

  // Función para verificar si una lección está bloqueada
  const isLessonBlocked = (lessonId: string): boolean => {
    if (!course) return false;

    // Encontrar el módulo de la lección
    for (let i = 0; i < course.modules.length; i++) {
      const module = course.modules[i];
      const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);

      if (lessonIndex !== -1) {
        // Si es el primer módulo, nunca está bloqueado
        if (i === 0) return false;

        // Para módulos posteriores, verificar si el módulo anterior fue aprobado
        const previousModule = course.modules[i - 1];
        return !completedModules.has(previousModule.id);
      }
    }

    return false;
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return <Play className="w-4 h-4" />;
      case 'TEXT':
        return <FileText className="w-4 h-4" />;
      case 'QUIZ':
        return <Award className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getLevelLabel = (level: string) => {
    const labels: { [key: string]: string } = {
      BEGINNER: 'Principiante',
      INTERMEDIATE: 'Intermedio',
      ADVANCED: 'Avanzado',
      EXPERT: 'Experto',
    };
    return labels[level] || level;
  };

  // Función para obtener el icono y color según la calificación
  const getGradeDisplay = (score: number) => {
    if (score >= 9) {
      return {
        icon: <Crown className="w-4 h-4" />,
        color: 'text-yellow-600 dark:text-yellow-500',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
      };
    } else if (score >= 7) {
      return {
        icon: <Trophy className="w-4 h-4" />,
        color: 'text-green-600 dark:text-green-500',
        bgColor: 'bg-green-50 dark:bg-green-900/20'
      };
    } else if (score >= 5) {
      return {
        icon: <ThumbsUp className="w-4 h-4" />,
        color: 'text-blue-600 dark:text-blue-500',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20'
      };
    } else {
      return {
        icon: <ThumbsDown className="w-4 h-4" />,
        color: 'text-red-600 dark:text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-900/20'
      };
    }
  };

  // Función para obtener todas las lecciones en orden lineal
  const getAllLessonsInOrder = (): Lesson[] => {
    if (!course) return [];
    const allLessons: Lesson[] = [];
    course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        allLessons.push(lesson);
      });
    });
    return allLessons;
  };

  // Función para obtener la lección anterior
  const getPreviousLesson = (): Lesson | null => {
    const allLessons = getAllLessonsInOrder();
    const currentIndex = allLessons.findIndex(l => l.id === selectedLesson?.id);
    if (currentIndex > 0) {
      return allLessons[currentIndex - 1];
    }
    return null;
  };

  // Función para verificar si la lección actual es la última del módulo
  const isLastLessonOfModule = (): { isLast: boolean; moduleTestId?: string; moduleId?: string } => {
    if (!course || !selectedLesson) return { isLast: false };

    for (const module of course.modules) {
      const lessonIndex = module.lessons.findIndex(l => l.id === selectedLesson.id);
      if (lessonIndex !== -1) {
        const isLast = lessonIndex === module.lessons.length - 1;
        return {
          isLast,
          moduleTestId: isLast ? module.moduleTest?.id : undefined,
          moduleId: isLast ? module.id : undefined
        };
      }
    }
    return { isLast: false };
  };

  // Función para obtener la siguiente lección
  const getNextLesson = (): Lesson | null => {
    const allLessons = getAllLessonsInOrder();
    const currentIndex = allLessons.findIndex(l => l.id === selectedLesson?.id);
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1];
    }
    return null;
  };

  // Función para lanzar confetti
  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#EA580C', '#FB923C', '#FDBA74', '#FED7AA'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#EA580C', '#FB923C', '#FDBA74', '#FED7AA'],
      });
    }, 250);
  };

  // Función para marcar lección como completada
  const markLessonAsCompleted = async () => {
    if (!selectedLesson) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/lessons/${selectedLesson.id}/progress`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true,
          timeSpent: 0,
          lastPosition: 0,
        }),
      });

      if (response.ok) {
        setCompletedLessons(prev => new Set(prev).add(selectedLesson.id));

        // Verificar si es la última lección del módulo
        const { isLast } = isLastLessonOfModule();

        // Si NO es la última lección, mostrar celebración y navegar
        if (!isLast) {
          setShowCelebration(true);
          triggerConfetti();

          setTimeout(() => {
            setShowCelebration(false);
            const nextLesson = getNextLesson();
            if (nextLesson) {
              fetchLessonContent(nextLesson.id);
            }
          }, 2000);
        }
        // Si ES la última lección, solo marcar como completada, no navegar
        // El botón cambiará a "Test de evaluación"
      } else {
        const errorData = await response.json();
        console.error('Error marking lesson as completed:', errorData);
      }
    } catch (err) {
      console.error('Error marking lesson as completed:', err);
    }
  };

  // Función para ir al test del módulo
  const goToModuleTest = () => {
    const { moduleId } = isLastLessonOfModule();
    if (moduleId) {
      navigate(`/campus/module/${moduleId}/test`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 dark:text-red-400 mb-4">
          {error || 'Curso no encontrado'}
        </div>
        <button
          onClick={() => navigate('/campus/mis-cursos')}
          className="px-4 py-2 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 transition-colors"
        >
          Volver a Mis Cursos
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[calc(100vh-8rem)] bg-white dark:bg-gray-950 relative">
      {/* Modal de Celebración */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 max-w-md mx-4 text-center transform animate-bounce">
            <div className="mb-6">
              <Trophy className="w-24 h-24 mx-auto text-orange-600 dark:text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ¡Lección Completada!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              Excelente trabajo
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-6">
              Continuando a la siguiente lección...
            </p>
          </div>
        </div>
      )}

      {/* Sidebar - Módulos y Lecciones */}
      <div className="lg:w-80 flex-shrink-0 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-hidden">

        {/* Header del curso */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-3 leading-tight">
            {course.title}
          </h2>
          <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded">
              {getLevelLabel(course.level)}
            </span>
            {course.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{course.duration}h</span>
              </div>
            )}
          </div>
        </div>

        {/* Lista de Módulos y Lecciones */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 16rem)' }}>
          {course.modules.map((module, moduleIndex) => (
            <div key={module.id} className="border-b border-gray-100 dark:border-gray-900">

              {/* Header de módulo */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Módulo {moduleIndex + 1}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                    {module.title}
                  </p>
                  {moduleGrades.has(module.id) && (
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${getGradeDisplay(moduleGrades.get(module.id)!).bgColor}`}>
                      <span className={getGradeDisplay(moduleGrades.get(module.id)!).color}>
                        {getGradeDisplay(moduleGrades.get(module.id)!).icon}
                      </span>
                      <span className={`text-xs font-bold ${getGradeDisplay(moduleGrades.get(module.id)!).color}`}>
                        {moduleGrades.get(module.id)!.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Lecciones */}
              <div>
                {module.lessons.map((lesson, lessonIndex) => {
                  const blocked = isLessonBlocked(lesson.id);
                  const isCompleted = completedLessons.has(lesson.id);
                  const isSelected = selectedLesson?.id === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => fetchLessonContent(lesson.id)}
                      disabled={blocked}
                      className={`
                        w-full p-4 text-left transition-colors duration-150
                        ${blocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-900/50'}
                        ${
                          isSelected
                            ? 'bg-gray-100 dark:bg-gray-900 border-l-2 border-gray-900 dark:border-gray-100'
                            : 'border-l-2 border-transparent'
                        }
                      `}
                    >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 ${
                        isSelected
                          ? 'text-gray-900 dark:text-gray-100'
                          : 'text-gray-400 dark:text-gray-600'
                      }`}>
                        {blocked ? (
                          <Lock className="w-4 h-4" />
                        ) : isCompleted ? (
                          <Unlock className="w-4 h-4 text-green-600" />
                        ) : (
                          getLessonIcon(lesson.type)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-500 tabular-nums">
                            {moduleIndex + 1}.{lessonIndex + 1}
                          </span>
                          {!lesson.isFree && (
                            blocked ? (
                              <Lock className="w-3 h-3 text-gray-400 dark:text-gray-600" />
                            ) : (
                              <Unlock className="w-3 h-3 text-green-600 dark:text-green-500" />
                            )
                          )}
                        </div>
                        <p className={`text-sm leading-relaxed ${
                          selectedLesson?.id === lesson.id
                            ? 'text-gray-900 dark:text-gray-100 font-medium'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {lesson.title}
                        </p>
                        {lesson.videoDuration && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 tabular-nums">
                            {Math.round(lesson.videoDuration / 60)} min
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área de Contenido Principal */}
      <div className="flex-1 bg-white dark:bg-gray-950 overflow-hidden">
        {isContentBlocked ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <Lock className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Contenido bloqueado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Debes completar y aprobar el test de evaluación del módulo anterior para acceder a este contenido.
              </p>
            </div>
          </div>
        ) : selectedLesson ? (
          <div className="h-full flex flex-col">

            {/* Contenido de la Lección - DISEÑO MEDIUM-STYLE */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-[680px] mx-auto px-6 sm:px-12 lg:px-16 py-16">

                {/* Badge de tipo de lección - minimalista */}
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 font-medium">
                    {selectedLesson.type === 'VIDEO' ? 'Video' : selectedLesson.type === 'TEXT' ? 'Lectura' : 'Cuestionario'}
                  </span>
                </div>

                {/* Título de la lección - tipografía Medium */}
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-12 leading-tight tracking-tight"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  {selectedLesson.title}
                </h1>

                {/* Video Player */}
                {selectedLesson.type === 'VIDEO' && selectedLesson.videoUrl && (
                  <div className="mb-12 rounded-lg overflow-hidden shadow-lg bg-black">
                    <video
                      key={selectedLesson.id}
                      controls
                      className="w-full"
                      controlsList="nodownload"
                      preload="metadata"
                    >
                      <source src={selectedLesson.videoUrl} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
                )}

                {selectedLesson.content ? (
                  /* CONTENIDO MARKDOWN - ESTILO MEDIUM */
                  <div className="medium-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    >
                      {selectedLesson.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      El contenido de esta lección estará disponible próximamente.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer con Navegación - minimalista */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-950">
              <div className="max-w-[680px] mx-auto flex justify-between items-center gap-4">

                <button
                  onClick={() => {
                    const prevLesson = getPreviousLesson();
                    if (prevLesson) {
                      fetchLessonContent(prevLesson.id);
                    }
                  }}
                  disabled={!getPreviousLesson()}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                    getPreviousLesson()
                      ? 'text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 cursor-pointer'
                      : 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

{(() => {
                  const { isLast, moduleTestId, moduleId } = isLastLessonOfModule();
                  const isCompleted = completedLessons.has(selectedLesson?.id || '');
                  const hasGrade = moduleId && moduleGrades.has(moduleId);

                  // Si es la última lección del módulo y está completada, mostrar botón de test
                  if (isLast && isCompleted && moduleTestId) {
                    return (
                      <button
                        onClick={goToModuleTest}
                        className={`flex items-center gap-2 px-6 py-2 text-white text-sm font-medium transition-colors ${
                          hasGrade
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        <Award className="w-4 h-4" />
                        <span>{hasGrade ? 'Revisar test' : 'Test de evaluación'}</span>
                      </button>
                    );
                  }

                  // Botón normal de completar
                  return (
                    <button
                      onClick={markLessonAsCompleted}
                      disabled={isCompleted}
                      className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-colors ${
                        isCompleted
                          ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          : 'bg-orange-600 dark:bg-orange-600 hover:bg-orange-700 dark:hover:bg-orange-700 text-white cursor-pointer'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{isCompleted ? 'Completada' : 'Completar'}</span>
                    </button>
                  );
                })()}

<button
                  onClick={() => {
                    const nextLesson = getNextLesson();
                    if (nextLesson && !isLastLessonOfModule().isLast) {
                      fetchLessonContent(nextLesson.id);
                    }
                  }}
                  disabled={!getNextLesson() || isLastLessonOfModule().isLast}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                    getNextLesson() && !isLastLessonOfModule().isLast
                      ? 'text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 cursor-pointer'
                      : 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Selecciona una lección
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Elige una lección del menú lateral para comenzar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

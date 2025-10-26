import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp, CheckCircle } from 'lucide-react';

interface EnrolledCourse {
  id: string;
  enrolledAt: string;
  progress: number;
  status: string;
  course: {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string | null;
    level: string;
    duration: number | null;
    instructor: {
      firstName: string;
      lastName: string;
    };
    modules: Array<{
      id: string;
      title: string;
    }>;
  };
}

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/enrollments/my-courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCourses(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      BEGINNER: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      INTERMEDIATE: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      ADVANCED: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      EXPERT: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    };
    return colors[level] || colors.BEGINNER;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Mis Cursos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Continúa tu aprendizaje donde lo dejaste
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No estás inscrito en ningún curso
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explora nuestro catálogo y comienza tu viaje de aprendizaje
          </p>
          <button
            onClick={() => navigate('/cursos')}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
          >
            Explorar Cursos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((enrollment) => (
            <div
              key={enrollment.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/campus/cursos/${enrollment.course.slug}`)}
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-orange-400 to-orange-600">
                {enrollment.course.thumbnail ? (
                  <img
                    src={enrollment.course.thumbnail}
                    alt={enrollment.course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="w-16 h-16 text-white opacity-50" />
                  </div>
                )}

                {/* Progress Badge */}
                {enrollment.progress > 0 && (
                  <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center gap-1.5">
                    {enrollment.progress === 100 ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-semibold text-green-600">
                          Completado
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">
                          {Math.round(enrollment.progress)}%
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Level Badge */}
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-3 ${getLevelColor(enrollment.course.level)}`}>
                  {getLevelLabel(enrollment.course.level)}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {enrollment.course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {enrollment.course.description}
                </p>

                {/* Instructor */}
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  <span className="font-medium">Instructor:</span>{' '}
                  {enrollment.course.instructor.firstName} {enrollment.course.instructor.lastName}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>{enrollment.course.modules.length} módulos</span>
                  </div>
                  {enrollment.course.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{enrollment.course.duration}h</span>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progreso</span>
                    <span>{Math.round(enrollment.progress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/campus/cursos/${enrollment.course.slug}`);
                  }}
                  className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors text-sm"
                >
                  {enrollment.progress === 0 ? 'Comenzar' : enrollment.progress === 100 ? 'Revisar' : 'Continuar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

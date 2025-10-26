import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { BookOpen, Award, TrendingUp, Clock, ArrowRight } from 'lucide-react';

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

export default function DashboardPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

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

  const activeCourses = courses.filter(e => e.status === 'ACTIVE' && e.progress < 100).length;
  const completedCourses = courses.filter(e => e.status === 'COMPLETED' || e.progress === 100).length;
  const averageProgress = courses.length > 0
    ? Math.round(courses.reduce((sum, e) => sum + e.progress, 0) / courses.length)
    : 0;

  const getLevelLabel = (level: string) => {
    const labels: { [key: string]: string } = {
      BEGINNER: 'Principiante',
      INTERMEDIATE: 'Intermedio',
      ADVANCED: 'Avanzado',
      EXPERT: 'Experto',
    };
    return labels[level] || level;
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bienvenido, {user?.firstName}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Continúa tu camino de aprendizaje</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-orange-600">{activeCourses}</div>
              <div className="text-gray-600 dark:text-gray-400 mt-1">Cursos Activos</div>
            </div>
            <BookOpen className="w-12 h-12 text-orange-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">{completedCourses}</div>
              <div className="text-gray-600 dark:text-gray-400 mt-1">Cursos Completados</div>
            </div>
            <Award className="w-12 h-12 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-purple-600">{averageProgress}%</div>
              <div className="text-gray-600 dark:text-gray-400 mt-1">Progreso Promedio</div>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Cursos Recientes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Mis Cursos</h2>
          {courses.length > 0 && (
            <button
              onClick={() => navigate('/campus/mis-cursos')}
              className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aún no estás inscrito en ningún curso.
              </p>
              <button
                onClick={() => navigate('/cursos')}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
              >
                Explorar Cursos
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {courses.slice(0, 3).map((enrollment) => (
                <div
                  key={enrollment.id}
                  onClick={() => navigate(`/campus/cursos/${enrollment.course.slug}`)}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-md transition-all cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
                    {enrollment.course.thumbnail ? (
                      <img
                        src={enrollment.course.thumbnail}
                        alt={enrollment.course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-white opacity-50" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getLevelColor(enrollment.course.level)}`}>
                        {getLevelLabel(enrollment.course.level)}
                      </span>
                      {enrollment.course.duration && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {enrollment.course.duration}h
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                      {enrollment.course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {enrollment.course.instructor.firstName} {enrollment.course.instructor.lastName}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {Math.round(enrollment.progress)}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {enrollment.progress === 0 ? 'Sin empezar' : enrollment.progress === 100 ? 'Completado' : 'En progreso'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

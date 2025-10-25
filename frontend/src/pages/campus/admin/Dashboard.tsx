// Dashboard del Administrador
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import StatsCard from '../../../components/campus/StatsCard';

interface GlobalStats {
  users: {
    total: number;
    active: number;
    inactive: number;
    students: number;
    professors: number;
    newLast30Days: number;
  };
  courses: {
    total: number;
    published: number;
    draft: number;
    newLast30Days: number;
  };
  enrollments: {
    total: number;
    active: number;
    completed: number;
    newLast30Days: number;
  };
  articles: {
    total: number;
    published: number;
    draft: number;
    newLast30Days: number;
  };
  tickets: {
    total: number;
    open: number;
    closed: number;
  };
  content: {
    lessons: number;
    quizzes: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlobalStats();
  }, []);

  const fetchGlobalStats = async () => {
    try {
      // TODO: Implementar llamada al API
      // const response = await fetch('/api/analytics/global');
      // const data = await response.json();
      // setStats(data.data);

      // Datos de ejemplo por ahora
      setStats({
        users: {
          total: 1248,
          active: 1156,
          inactive: 92,
          students: 1102,
          professors: 42,
          newLast30Days: 86,
        },
        courses: {
          total: 127,
          published: 98,
          draft: 29,
          newLast30Days: 8,
        },
        enrollments: {
          total: 3456,
          active: 2891,
          completed: 445,
          newLast30Days: 234,
        },
        articles: {
          total: 245,
          published: 198,
          draft: 47,
          newLast30Days: 12,
        },
        tickets: {
          total: 567,
          open: 89,
          closed: 478,
        },
        content: {
          lessons: 1879,
          quizzes: 456,
        },
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-white dark:bg-gray-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">
            Error al cargar las estadísticas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Panel de Administración
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Vista general de la plataforma Instituto San Miguel
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Métricas Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Usuarios"
            value={stats.users.total}
            icon={Users}
            trend={{
              value: stats.users.newLast30Days,
              isPositive: true,
              label: 'nuevos (30d)',
            }}
            color="blue"
          />
          <StatsCard
            title="Total Cursos"
            value={stats.courses.total}
            icon={BookOpen}
            trend={{
              value: stats.courses.newLast30Days,
              isPositive: true,
              label: 'nuevos (30d)',
            }}
            color="green"
          />
          <StatsCard
            title="Matrículas"
            value={stats.enrollments.total}
            icon={GraduationCap}
            trend={{
              value: stats.enrollments.newLast30Days,
              isPositive: true,
              label: 'nuevas (30d)',
            }}
            color="purple"
          />
          <StatsCard
            title="Artículos"
            value={stats.articles.total}
            icon={FileText}
            trend={{
              value: stats.articles.newLast30Days,
              isPositive: true,
              label: 'nuevos (30d)',
            }}
            color="orange"
          />
        </div>
      </div>

      {/* Estadísticas de usuarios */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Usuarios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Usuarios Activos"
            value={stats.users.active}
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            title="Estudiantes"
            value={stats.users.students}
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Profesores"
            value={stats.users.professors}
            icon={GraduationCap}
            color="purple"
          />
          <StatsCard
            title="Inactivos"
            value={stats.users.inactive}
            icon={AlertCircle}
            color="red"
          />
        </div>
      </div>

      {/* Estadísticas de contenido */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Contenido
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Cursos Publicados"
            value={stats.courses.published}
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            title="Borradores"
            value={stats.courses.draft}
            icon={Clock}
            color="yellow"
          />
          <StatsCard
            title="Lecciones"
            value={stats.content.lessons}
            icon={BookOpen}
            color="blue"
          />
          <StatsCard
            title="Cuestionarios"
            value={stats.content.quizzes}
            icon={FileText}
            color="purple"
          />
        </div>
      </div>

      {/* Estadísticas de engagement */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Engagement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Matrículas Activas"
            value={stats.enrollments.active}
            icon={TrendingUp}
            color="blue"
          />
          <StatsCard
            title="Cursos Completados"
            value={stats.enrollments.completed}
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            title="Tickets Abiertos"
            value={stats.tickets.open}
            icon={MessageSquare}
            color="orange"
          />
          <StatsCard
            title="Tickets Cerrados"
            value={stats.tickets.closed}
            icon={CheckCircle}
            color="green"
          />
        </div>
      </div>

      {/* Acciones rápidas */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/campus/admin/usuarios"
            className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow text-left group"
          >
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Gestionar Usuarios
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Ver y editar usuarios
            </p>
          </Link>

          <Link
            to="/campus/admin/cursos"
            className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow text-left group"
          >
            <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
              Gestionar Cursos
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Ver y editar cursos
            </p>
          </Link>

          <Link
            to="/campus/admin/articulos"
            className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow text-left group"
          >
            <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
              Gestionar Artículos
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Ver y editar artículos
            </p>
          </Link>

          <Link
            to="/campus/admin/tickets"
            className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow text-left group"
          >
            <MessageSquare className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
              Ver Tickets
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Gestionar consultas
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

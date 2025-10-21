import { useAuthStore } from '../../store/authStore';
import { BookOpen, Award, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Bienvenido, {user?.firstName}!</h1>
        <p className="text-gray-600">Continúa tu camino de aprendizaje</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card card-body">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary-600">0</div>
              <div className="text-gray-600">Cursos Activos</div>
            </div>
            <BookOpen className="w-12 h-12 text-primary-600 opacity-20" />
          </div>
        </div>

        <div className="card card-body">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-gray-600">Cursos Completados</div>
            </div>
            <Award className="w-12 h-12 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="card card-body">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-purple-600">0%</div>
              <div className="text-gray-600">Progreso Promedio</div>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-600 opacity-20" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="text-xl font-semibold mb-4">Mis Cursos</h2>
          <p className="text-gray-600">Aún no estás inscrito en ningún curso.</p>
        </div>
      </div>
    </div>
  );
}

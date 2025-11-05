import React, { useEffect } from 'react';
import DashboardProgress from '../../components/gamification/DashboardProgress';

const GamificationDashboard: React.FC = () => {
  useEffect(() => {
    document.title = 'Mi Progreso - Instituto San Miguel';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tu Progreso</h1>
          <p className="text-gray-600 mt-2">
            Revisa tus logros, nivel y estadísticas de aprendizaje
          </p>
        </div>

        {/* Dashboard Component */}
        <DashboardProgress />
      </div>
    </div>
  );
};

export default GamificationDashboard;

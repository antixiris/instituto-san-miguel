import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    user: state.user
  }));

  // Debug logging
  console.log('🔒 ProtectedRoute check:', {
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    hasToken: !!localStorage.getItem('token')
  });

  // Mientras está cargando, mostrar un spinner
  if (isLoading) {
    console.log('⏳ Showing loading spinner');
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('❌ Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('✅ Authenticated, rendering protected content');
  return <>{children}</>;
}

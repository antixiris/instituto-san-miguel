import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import './utils/authDebug';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import CampusLayout from './layouts/CampusLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import CoursesPage from './pages/public/CoursesPage';
import CourseDetailPage from './pages/public/CourseDetailPage';
import NotebookPage from './pages/public/NotebookPage';
import ArticleDetailPage from './pages/public/ArticleDetailPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Campus Pages
import DashboardPage from './pages/campus/DashboardPage';
import MyCoursesPage from './pages/campus/MyCoursesPage';
import CourseLearningPage from './pages/campus/CourseLearningPage';
import ModuleTestPage from './pages/campus/ModuleTestPage';
import ProfilePage from './pages/campus/ProfilePage';
import GamificationDashboard from './pages/student/GamificationDashboard';
import ExercisesPage from './pages/campus/student/ExercisesPage';
import LessonView from './pages/campus/student/LessonView';

// Admin Pages
import AdminDashboard from './pages/campus/admin/Dashboard';
import CoursesManagement from './pages/campus/admin/CoursesManagement';
import CourseContentManagement from './pages/campus/admin/CourseContentManagement';
import UsersManagement from './pages/campus/admin/UsersManagement';
import ArticlesManagement from './pages/campus/admin/ArticlesManagement';
import TicketsManagement from './pages/campus/admin/TicketsManagement';
import Statistics from './pages/campus/admin/Statistics';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    // Interceptar cambios en localStorage para debug
    const originalRemoveItem = Storage.prototype.removeItem;
    const originalClear = Storage.prototype.clear;
    const originalSetItem = Storage.prototype.setItem;

    Storage.prototype.removeItem = function(key: string) {
      if (key === 'token' || key === 'user' || key === 'refreshToken') {
        console.log('⚠️ localStorage.removeItem called for:', key);
        console.trace('Stack trace:');
      }
      return originalRemoveItem.apply(this, [key]);
    };

    Storage.prototype.clear = function() {
      console.log('🗑️ localStorage.clear() called');
      console.trace('Stack trace:');
      return originalClear.apply(this);
    };

    Storage.prototype.setItem = function(key: string, value: string) {
      if (key === 'token' || key === 'user' || key === 'refreshToken') {
        console.log('💾 localStorage.setItem called for:', key, 'value length:', value?.length);
      }
      return originalSetItem.apply(this, [key, value]);
    };

    // Listener para cambios de storage desde otras pestañas
    const handleStorageChange = (e: StorageEvent) => {
      console.log('🔄 Storage event detected:', {
        key: e.key,
        oldValue: e.oldValue?.substring(0, 50),
        newValue: e.newValue?.substring(0, 50),
        url: e.url
      });
    };

    window.addEventListener('storage', handleStorageChange);

    loadUser();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadUser]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/cursos/:slug" element={<CourseDetailPage />} />
        <Route path="/notebook" element={<NotebookPage />} />
        <Route path="/notebook/:slug" element={<ArticleDetailPage />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Route>

      {/* Campus Routes (Protected) */}
      <Route
        element={
          <ProtectedRoute>
            <CampusLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard por defecto */}
        <Route path="/campus" element={<DashboardPage />} />

        {/* Rutas de Admin */}
        <Route path="/campus/admin" element={<AdminDashboard />} />
        <Route path="/campus/admin/cursos" element={<CoursesManagement />} />
        <Route path="/campus/admin/cursos/:courseId/contenidos" element={<CourseContentManagement />} />
        <Route path="/campus/admin/usuarios" element={<UsersManagement />} />
        <Route path="/campus/admin/articulos" element={<ArticlesManagement />} />
        <Route path="/campus/admin/tickets" element={<TicketsManagement />} />
        <Route path="/campus/admin/estadisticas" element={<Statistics />} />

        {/* Rutas generales del campus */}
        <Route path="/campus/mis-cursos" element={<MyCoursesPage />} />
        <Route path="/campus/curso/:courseId" element={<CourseLearningPage />} />
        <Route path="/campus/cursos/:slug" element={<CourseLearningPage />} />
        <Route path="/campus/lecciones/:lessonId" element={<LessonView />} />
        <Route path="/campus/module/:moduleId/test" element={<ModuleTestPage />} />
        <Route path="/campus/mi-progreso" element={<GamificationDashboard />} />
        <Route path="/campus/ejercicios" element={<ExercisesPage />} />
        <Route path="/campus/perfil" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';

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
import ProfilePage from './pages/campus/ProfilePage';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
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
        <Route path="/campus" element={<DashboardPage />} />
        <Route path="/campus/mis-cursos" element={<MyCoursesPage />} />
        <Route path="/campus/curso/:courseId" element={<CourseLearningPage />} />
        <Route path="/campus/perfil" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;

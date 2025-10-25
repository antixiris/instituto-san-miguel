import { Menu, Bell, Moon, Sun, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { getRoleColor } from '../../config/navigation';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface CampusNavbarProps {
  onMenuClick: () => void;
}

export default function CampusNavbar({ onMenuClick }: CampusNavbarProps) {
  const { user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Menu button móvil */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
        </button>

        {/* Título */}
        <div className="hidden lg:block">
          <h1 className="font-display text-xl font-bold text-orange-600 dark:text-orange-500">
            Campus Virtual
          </h1>
          {user?.role && (
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {user.role === 'ADMIN' && 'Panel de Administración'}
              {user.role === 'INSTRUCTOR' && 'Panel de Profesor'}
              {user.role === 'STUDENT' && 'Área de Estudiante'}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-600" />
            )}
          </button>

          {/* Notificaciones */}
          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg relative transition-colors">
            <Bell className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            {/* Badge de notificaciones pendientes */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Avatar + Info del usuario con menú desplegable */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 pl-2 border-l border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg pr-2 py-1 transition-colors"
            >
              <div className={clsx(
                'w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm',
                user?.role && `bg-${getRoleColor(user.role)}`
              )}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {user?.role === 'ADMIN' && 'Administrador'}
                  {user?.role === 'INSTRUCTOR' && 'Profesor'}
                  {user?.role === 'STUDENT' && 'Alumno'}
                </p>
              </div>
              <ChevronDown className={clsx(
                'w-4 h-4 text-neutral-600 dark:text-neutral-400 transition-transform duration-200',
                isUserMenuOpen && 'rotate-180'
              )} />
            </button>

            {/* Menú desplegable */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-50">
                <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {user?.email}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigate('/campus/perfil');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Mi Perfil
                </button>

                <div className="border-t border-neutral-200 dark:border-neutral-700 my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

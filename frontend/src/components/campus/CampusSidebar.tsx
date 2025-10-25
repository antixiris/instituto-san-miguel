import { Link, useLocation } from 'react-router-dom';
import { X, GraduationCap } from 'lucide-react';
import clsx from 'clsx';
import { useAuthStore } from '../../store/authStore';
import { getNavigationByRole, getRoleColor } from '../../config/navigation';

interface CampusSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CampusSidebar({ isOpen, onClose }: CampusSidebarProps) {
  const location = useLocation();
  const { user } = useAuthStore();

  // Obtener navegación según el rol del usuario
  const navigationGroups = user?.role ? getNavigationByRole(user.role) : [];

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 z-50 transition-transform lg:translate-x-0 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 mb-8 group">
            <GraduationCap className={clsx(
              'w-8 h-8 transition-colors',
              user?.role && `text-${getRoleColor(user.role)}`
            )} />
            <span className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100">
              Instituto San Miguel
            </span>
          </Link>

          {/* Badge de Rol */}
          {user?.role && (
            <div className="mb-6">
              <div className={clsx(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                `bg-${getRoleColor(user.role, 'bg')} text-${getRoleColor(user.role, 'text')}`
              )}>
                {user.role === 'ADMIN' && 'Administrador'}
                {user.role === 'INSTRUCTOR' && 'Profesor'}
                {user.role === 'STUDENT' && 'Alumno'}
              </div>
            </div>
          )}

          {/* Navegación por grupos */}
          <nav className="space-y-6">
            {navigationGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {/* Label del grupo */}
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 px-4">
                  {group.label}
                </div>

                {/* Items del grupo */}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.to;

                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={onClose}
                        className={clsx(
                          'flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200',
                          isActive
                            ? `bg-${getRoleColor(user?.role || 'STUDENT', 'bg')} text-${getRoleColor(user?.role || 'STUDENT', 'primary')} dark:bg-${getRoleColor(user?.role || 'STUDENT', 'primary')} dark:bg-opacity-10 font-medium`
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className={clsx(
                            'w-5 h-5',
                            isActive && 'animate-pulse'
                          )} />
                          <span>{item.label}</span>
                        </div>

                        {/* Badge opcional (para contadores) */}
                        {item.badge && item.badge > 0 && (
                          <span className={clsx(
                            'px-2 py-0.5 text-xs font-semibold rounded-full',
                            `bg-${getRoleColor(user?.role || 'STUDENT', 'primary')} text-white`
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

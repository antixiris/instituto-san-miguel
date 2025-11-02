import { Link, useLocation } from 'react-router-dom';
import { X, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useAuthStore } from '../../store/authStore';
import { getNavigationByRole, getRoleColor } from '../../config/navigation';

interface CampusSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function CampusSidebar({ isOpen, onClose, collapsed = false, onToggleCollapse }: CampusSidebarProps) {
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
          'fixed top-16 left-0 bottom-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 z-50 transition-all duration-300 lg:translate-x-0 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'lg:w-16 w-64' : 'w-64'
        )}
      >
        <div className={clsx('transition-all duration-300', collapsed ? 'p-2' : 'p-6')}>
          {/* Logo */}
          <Link to="/" className={clsx(
            'flex items-center mb-8 group transition-all',
            collapsed ? 'justify-center space-x-0' : 'space-x-2'
          )}>
            <GraduationCap className={clsx(
              'w-8 h-8 transition-colors flex-shrink-0',
              user?.role && `text-${getRoleColor(user.role)}`
            )} />
            {!collapsed && (
              <span className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                Instituto San Miguel
              </span>
            )}
          </Link>

          {/* Badge de Rol */}
          {user?.role && !collapsed && (
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

          {/* Botón de colapsar/expandir (solo desktop) */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className={clsx(
                'hidden lg:flex items-center w-full mb-6 py-2 rounded-lg transition-all duration-200',
                'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800',
                collapsed ? 'justify-center px-2' : 'justify-start px-4'
              )}
              title={collapsed ? 'Expandir menú' : 'Contraer menú'}
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <>
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  <span className="text-sm">Contraer</span>
                </>
              )}
            </button>
          )}

          {/* Navegación por grupos */}
          <nav className="space-y-6">
            {navigationGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {/* Label del grupo */}
                {!collapsed && (
                  <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 px-4">
                    {group.label}
                  </div>
                )}

                {/* Items del grupo */}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.to;

                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={onClose}
                        title={collapsed ? item.label : undefined}
                        className={clsx(
                          'flex items-center transition-all duration-200 rounded-lg',
                          collapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-4 py-2.5',
                          isActive
                            ? `bg-${getRoleColor(user?.role || 'STUDENT', 'bg')} text-${getRoleColor(user?.role || 'STUDENT', 'primary')} dark:bg-${getRoleColor(user?.role || 'STUDENT', 'primary')} dark:bg-opacity-10 font-medium`
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        )}
                      >
                        <div className={clsx(
                          'flex items-center',
                          collapsed ? 'space-x-0' : 'space-x-3'
                        )}>
                          <item.icon className={clsx(
                            'w-5 h-5 flex-shrink-0',
                            isActive && 'animate-pulse'
                          )} />
                          {!collapsed && <span>{item.label}</span>}
                        </div>

                        {/* Badge opcional (para contadores) */}
                        {!collapsed && item.badge && item.badge > 0 && (
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

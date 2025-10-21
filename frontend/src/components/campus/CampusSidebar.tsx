import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, User, X, GraduationCap } from 'lucide-react';
import clsx from 'clsx';

interface CampusSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CampusSidebar({ isOpen, onClose }: CampusSidebarProps) {
  const location = useLocation();

  const navItems = [
    { to: '/campus', icon: Home, label: 'Dashboard' },
    { to: '/campus/mis-cursos', icon: BookOpen, label: 'Mis Cursos' },
    { to: '/campus/perfil', icon: User, label: 'Mi Perfil' },
  ];

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
          'fixed top-16 left-0 bottom-0 w-64 bg-white border-r z-50 transition-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-2 mb-8">
            <GraduationCap className="w-8 h-8 text-primary-600" />
            <span className="font-display font-bold text-lg">Instituto San Miguel</span>
          </Link>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={clsx(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  location.pathname === item.to
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

import { Menu, Bell, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface CampusNavbarProps {
  onMenuClick: () => void;
}

export default function CampusNavbar({ onMenuClick }: CampusNavbarProps) {
  const { user } = useAuthStore();

  return (
    <nav className="bg-white border-b sticky top-0 z-40">
      <div className="px-4 h-16 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden lg:block font-display text-xl font-bold text-primary-600">
          Campus Virtual
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-sm">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <span className="hidden sm:block font-medium">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

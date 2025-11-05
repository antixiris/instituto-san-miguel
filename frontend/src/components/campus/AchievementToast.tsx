import { useEffect, useState } from 'react';
import { X, Trophy } from 'lucide-react';
import clsx from 'clsx';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  type: 'PROGRESS' | 'EXCELLENCE' | 'CONSISTENCY' | 'SPECIALIZATION' | 'HIDDEN';
}

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementToast({ achievement, onClose }: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (achievement) {
      // Mostrar con animación
      setIsVisible(true);
      setIsExiting(false);

      // Auto-cerrar después de 5 segundos
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [achievement]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!achievement || !isVisible) return null;

  const typeColors = {
    PROGRESS: 'from-blue-500 to-blue-600',
    EXCELLENCE: 'from-yellow-500 to-yellow-600',
    CONSISTENCY: 'from-green-500 to-green-600',
    SPECIALIZATION: 'from-purple-500 to-purple-600',
    HIDDEN: 'from-pink-500 to-pink-600',
  };

  const gradientClass = typeColors[achievement.type] || typeColors.PROGRESS;

  return (
    <div className="fixed top-20 right-4 z-[9999] pointer-events-none">
      <div
        className={clsx(
          'pointer-events-auto bg-white dark:bg-neutral-800 rounded-xl shadow-2xl overflow-hidden max-w-sm transition-all duration-300 transform',
          isExiting
            ? 'translate-x-full opacity-0'
            : 'translate-x-0 opacity-100 animate-bounce-in'
        )}
      >
        {/* Header con gradiente */}
        <div className={clsx('bg-gradient-to-r p-4 text-white', gradientClass)}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">¡Logro Desbloqueado!</h3>
                <p className="text-sm opacity-90">+{achievement.points} XP</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            {/* Icono del logro */}
            <div className="text-4xl flex-shrink-0 animate-bounce-slow">
              {achievement.icon}
            </div>

            {/* Detalles */}
            <div className="flex-1">
              <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                {achievement.name}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {achievement.description}
              </p>
            </div>
          </div>
        </div>

        {/* Barra de progreso de cierre automático */}
        <div className="h-1 bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
          <div
            className={clsx(
              'h-full bg-gradient-to-r',
              gradientClass,
              'animate-progress-bar'
            )}
          />
        </div>
      </div>

      <style>{`
        @keyframes bounce-in {
          0% {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translateX(-10px) scale(1.05);
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(5deg);
          }
        }

        @keyframes progress-bar {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-progress-bar {
          animation: progress-bar 5s linear forwards;
        }
      `}</style>
    </div>
  );
}

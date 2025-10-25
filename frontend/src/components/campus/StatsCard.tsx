import { type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive?: boolean;
    label?: string;
  };
  color?: 'orange' | 'blue' | 'green' | 'purple' | 'red' | 'yellow';
  subtitle?: string;
  loading?: boolean;
}

const colorVariants = {
  orange: {
    icon: 'text-orange-600 dark:text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    trend: 'text-orange-600 dark:text-orange-400',
  },
  blue: {
    icon: 'text-blue-600 dark:text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    trend: 'text-blue-600 dark:text-blue-400',
  },
  green: {
    icon: 'text-green-600 dark:text-green-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    trend: 'text-green-600 dark:text-green-400',
  },
  purple: {
    icon: 'text-purple-600 dark:text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    trend: 'text-purple-600 dark:text-purple-400',
  },
  red: {
    icon: 'text-red-600 dark:text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    trend: 'text-red-600 dark:text-red-400',
  },
  yellow: {
    icon: 'text-yellow-600 dark:text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    trend: 'text-yellow-600 dark:text-yellow-400',
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'orange',
  subtitle,
  loading = false,
}: StatsCardProps) {
  const colors = colorVariants[color];

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24"></div>
          <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
        </div>
        <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-32 mb-2"></div>
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-20"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {title}
        </h3>
        <div className={clsx('w-12 h-12 rounded-lg flex items-center justify-center', colors.bg)}>
          <Icon className={clsx('w-6 h-6', colors.icon)} />
        </div>
      </div>

      <div>
        <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
          {value}
        </div>

        {(subtitle || trend) && (
          <div className="flex items-center space-x-2 text-sm">
            {trend && (
              <span
                className={clsx(
                  'font-medium',
                  trend.isPositive !== false ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )}
              >
                {trend.isPositive !== false ? '+' : ''}
                {trend.value}%
                {trend.label && ` ${trend.label}`}
              </span>
            )}
            {subtitle && (
              <span className="text-neutral-600 dark:text-neutral-400">{subtitle}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

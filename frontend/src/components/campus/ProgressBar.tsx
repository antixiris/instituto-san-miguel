import clsx from 'clsx';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'orange' | 'blue' | 'green' | 'purple' | 'red';
  animated?: boolean;
}

const colorVariants = {
  orange: 'bg-orange-600 dark:bg-orange-500',
  blue: 'bg-blue-600 dark:bg-blue-500',
  green: 'bg-green-600 dark:bg-green-500',
  purple: 'bg-purple-600 dark:bg-purple-500',
  red: 'bg-red-600 dark:bg-red-500',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export default function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = false,
  size = 'md',
  color = 'orange',
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={clsx(
          'w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
      >
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500 ease-out',
            colorVariants[color],
            animated && 'animate-[shimmer_2s_ease-in-out_infinite]'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {value !== max && (
        <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          {value} de {max}
        </div>
      )}
    </div>
  );
}

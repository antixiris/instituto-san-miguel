import clsx from 'clsx';

type Status =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'completed'
  | 'published'
  | 'draft'
  | 'archived'
  | 'open'
  | 'closed'
  | 'answered'
  | 'high'
  | 'medium'
  | 'low'
  | 'urgent';

type Variant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

interface StatusBadgeProps {
  status?: Status;
  variant?: Variant;
  text?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  active: {
    label: 'Activo',
    className: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  },
  inactive: {
    label: 'Inactivo',
    className: 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-400 border-gray-200 dark:border-neutral-700',
  },
  pending: {
    label: 'Pendiente',
    className: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  },
  completed: {
    label: 'Completado',
    className: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  },
  published: {
    label: 'Publicado',
    className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  },
  draft: {
    label: 'Borrador',
    className: 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-400 border-gray-200 dark:border-neutral-700',
  },
  archived: {
    label: 'Archivado',
    className: 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-500 border-gray-200 dark:border-neutral-700',
  },
  open: {
    label: 'Abierto',
    className: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  },
  closed: {
    label: 'Cerrado',
    className: 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-400 border-gray-200 dark:border-neutral-700',
  },
  answered: {
    label: 'Respondido',
    className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  },
  high: {
    label: 'Alta',
    className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  },
  medium: {
    label: 'Media',
    className: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  },
  low: {
    label: 'Baja',
    className: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  },
  urgent: {
    label: 'Urgente',
    className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 animate-pulse',
  },
};

const variantConfig: Record<Variant, { className: string }> = {
  success: {
    className: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  },
  warning: {
    className: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  },
  error: {
    className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  },
  info: {
    className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  },
  neutral: {
    className: 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-400 border-gray-200 dark:border-neutral-700',
  },
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

export default function StatusBadge({
  status,
  variant,
  text,
  label,
  size = 'md'
}: StatusBadgeProps) {
  let className = '';
  let displayText = text || label || '';

  if (status) {
    const config = statusConfig[status];
    className = config.className;
    displayText = text || label || config.label;
  } else if (variant) {
    const config = variantConfig[variant];
    className = config.className;
    displayText = text || label || '';
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium border',
        className,
        sizeClasses[size]
      )}
    >
      {displayText}
    </span>
  );
}

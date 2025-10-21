import React from 'react';
import clsx from 'clsx';

/**
 * Badge Component - Minimal Design System
 *
 * Variants:
 * - neutral: Gray (standard, neutral)
 * - accent: Orange accent (highlight, important)
 * - semantic: Blue semantic (information, knowledge)
 * - success: Green (completed, success)
 */

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'accent' | 'semantic' | 'success';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'neutral', leftIcon, rightIcon, className, ...props }, ref) => {
    const variantClasses = {
      neutral: 'badge-neutral',
      accent: 'badge-accent',
      semantic: 'badge-semantic',
      success: 'bg-success-50 text-success-700 border border-success-200',
    };

    const badgeClasses = clsx('badge', variantClasses[variant], className);

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * Card Component - Minimal Design System
 *
 * Variants:
 * - base: Basic card with subtle border
 * - hover: Interactive card with hover effects
 *
 * Includes: CardHeader, CardBody, CardFooter for semantic structure
 */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'hover';
  animate?: boolean;
  as?: 'div' | 'article' | 'section';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'base', animate = true, as: Component = 'div', className, ...props }, ref) => {
    const variantClasses = {
      base: 'card',
      hover: 'card-hover',
    };

    const cardClasses = clsx(variantClasses[variant], className);

    if (animate && variant !== 'base') {
      return (
        <motion.div
          ref={ref}
          className={cardClasses}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onClick={props.onClick}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <Component ref={ref} className={cardClasses} {...props}>
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

// Card Header
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, title, subtitle, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('card-header', className)} {...props}>
        {title || subtitle ? (
          <div>
            {title && <h3 className="text-xl font-bold text-neutral-900">{title}</h3>}
            {subtitle && <p className="text-sm text-neutral-600 mt-1">{subtitle}</p>}
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Body
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('card-body', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

// Card Footer
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('card-footer', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;

import React from 'react';
import { cn } from '../../utils/cn';

export const Progress = React.forwardRef(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    color = 'default',
    showLabel = false,
    label,
    size = 'md',
    ...props 
  }, ref) => {
    const percentage = Math.min((value / max) * 100, 100);

    const colors = {
      default: 'bg-primary-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      danger: 'bg-red-600',
    };

    const sizes = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    };

    const labelSizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    return (
      <div className="w-full" ref={ref} {...props}>
        <div className="flex items-center justify-between">
          {label && (
            <span className={cn('font-medium text-gray-700', labelSizes[size])}>
              {label}
            </span>
          )}
          {showLabel && (
            <span className={cn('text-gray-500', labelSizes[size])}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
        <div className={cn('mt-1 w-full overflow-hidden rounded-full bg-gray-200', sizes[size])}>
          <div
            className={cn(
              'transition-all duration-500 ease-in-out',
              colors[color],
              sizes[size]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export default Progress;
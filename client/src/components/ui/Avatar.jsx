import React from 'react';
import { cn } from '../../utils/cn';

export const Avatar = React.forwardRef(
  ({ className, name, size = 'md', src, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
    };

    const getInitials = (name) => {
      if (!name) return 'U';
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-medium',
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={name} className="h-full w-full rounded-full object-cover" />
        ) : (
          getInitials(name)
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
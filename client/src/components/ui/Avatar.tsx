import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = 'Avatar', size = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-full overflow-hidden bg-gray-200 flex items-center justify-center',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-600 font-semibold">A</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
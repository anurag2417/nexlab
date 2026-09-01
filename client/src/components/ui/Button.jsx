import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-moss focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-moss to-forest text-white hover:shadow-lg hover:shadow-moss/30',
        sage: 'bg-gradient-to-r from-sage to-sage-dark text-white hover:shadow-lg hover:shadow-sage/30',
        outline: 'border-2 border-sage text-sage hover:bg-sage hover:text-white',
        ghost: 'bg-transparent text-deepForest hover:bg-cream/30',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        secondary: 'bg-forest text-white hover:bg-forest-dark',
      },
      size: {
        sm: 'h-9 px-3 py-2 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 py-3 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export const Button = React.forwardRef(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
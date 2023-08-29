'use client';

import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'text-base leading-6 font-normal active:scale-95 transition ease-in-out duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white rounded-full shadow text-red-600 hover:bg-white/90',

        outline:
          'border-none  bg-transparent text-white  hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none shadow-sm active:scale-[0.99]';

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold shadow-emerald-500/20 focus:ring-emerald-400',
      secondary:
        'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 focus:ring-slate-400',
      outline:
        'bg-transparent border border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-800/50 focus:ring-slate-400',
      ghost:
        'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-slate-100 focus:ring-slate-400',
      danger:
        'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20 focus:ring-rose-500',
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[34px]',
      md: 'px-4 py-2.5 text-sm gap-2 min-h-[42px]',
      lg: 'px-6 py-3 text-base gap-2.5 min-h-[50px]',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

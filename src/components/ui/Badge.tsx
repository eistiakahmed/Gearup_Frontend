import React from 'react';
import { cn } from '@/lib/cn';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'customer'
  | 'provider'
  | 'admin'
  | 'placed'
  | 'confirmed'
  | 'paid'
  | 'picked_up'
  | 'returned'
  | 'cancelled';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    secondary: 'bg-slate-200/60 text-slate-800 border-slate-300',
    customer: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    provider: 'bg-amber-50 text-amber-700 border-amber-200',
    admin: 'bg-purple-50 text-purple-700 border-purple-200',
    placed: 'bg-amber-50 text-amber-800 border-amber-200',
    confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    paid: 'bg-purple-50 text-purple-700 border-purple-200',
    picked_up: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    returned: 'bg-slate-100 text-slate-600 border-slate-200',
    cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

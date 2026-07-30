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
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    primary: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    secondary: 'bg-slate-700/50 text-slate-200 border-slate-600',
    customer: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    provider: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    admin: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    placed: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
    confirmed: 'bg-blue-500/15 text-blue-400 border-blue-500/40',
    paid: 'bg-purple-500/15 text-purple-400 border-purple-500/40',
    picked_up: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
    returned: 'bg-slate-500/15 text-slate-400 border-slate-500/40',
    cancelled: 'bg-rose-500/15 text-rose-400 border-rose-500/40',
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

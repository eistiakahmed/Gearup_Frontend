'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export type AlertVariant = 'error' | 'success' | 'warning' | 'info';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
}

export function Alert({
  variant = 'info',
  title,
  children,
  className,
  onClose,
  ...props
}: AlertProps) {
  const variantStyles: Record<AlertVariant, { container: string; icon: React.ReactNode }> = {
    error: {
      container: 'bg-rose-950/40 border-rose-800/60 text-rose-200',
      icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    },
    success: {
      container: 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    },
    warning: {
      container: 'bg-amber-950/40 border-amber-800/60 text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    },
    info: {
      container: 'bg-sky-950/40 border-sky-800/60 text-sky-200',
      icon: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
    },
  };

  const current = variantStyles[variant];

  return (
    <div
      role="alert"
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md text-sm transition-all duration-200',
        current.container,
        className
      )}
      {...props}
    >
      {current.icon}
      <div className="flex-1 min-w-0">
        {title && <h5 className="font-semibold mb-0.5 leading-tight">{title}</h5>}
        <div className="text-xs sm:text-sm opacity-90 leading-relaxed">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 -mr-1 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-all shrink-0"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

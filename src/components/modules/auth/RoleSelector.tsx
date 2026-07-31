'use client';

import React from 'react';
import { UserRole } from '@/types/auth';
import { cn } from '@/lib/cn';
import { ShoppingBag, Store, ShieldCheck } from 'lucide-react';

export interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}

export const ROLE_OPTIONS: RoleOption[] = [
  {
    role: UserRole.CUSTOMER,
    title: 'Customer',
    description: 'Rent sports & outdoor equipment instantly from trusted local providers.',
    icon: <ShoppingBag className="w-6 h-6" />,
    badge: 'Rent Gear',
  },
  {
    role: UserRole.PROVIDER,
    title: 'Gear Provider',
    description: 'List your equipment, set rental rates, and manage incoming orders.',
    icon: <Store className="w-6 h-6" />,
    badge: 'Rent Out',
  },
  {
    role: UserRole.ADMIN,
    title: 'Platform Admin',
    description: 'Manage platform users, inspect listings, and moderate rentals.',
    icon: <ShieldCheck className="w-6 h-6" />,
    badge: 'Moderate',
  },
];

export interface RoleSelectorProps {
  selectedRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export function RoleSelector({ selectedRole, onSelectRole }: RoleSelectorProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
        Account Type <span className="text-rose-500">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {ROLE_OPTIONS.map((opt) => {
          const isSelected = selectedRole === opt.role;
          return (
            <button
              key={opt.role}
              type="button"
              onClick={() => onSelectRole(opt.role)}
              className={cn(
                'relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 shadow-sm',
                isSelected
                  ? 'bg-emerald-50 border-emerald-600 text-slate-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              )}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  )}
                >
                  {opt.icon}
                </div>
                <span
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border',
                    isSelected
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-slate-200/60 text-slate-600 border-slate-300'
                  )}
                >
                  {opt.badge}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">{opt.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{opt.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

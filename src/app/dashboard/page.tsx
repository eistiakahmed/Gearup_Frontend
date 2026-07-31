'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth';

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user?.role === UserRole.PROVIDER) {
        router.replace('/dashboard/provider');
      } else if (user?.role === UserRole.ADMIN) {
        router.replace('/dashboard/admin');
      } else {
        router.replace('/dashboard/customer');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-slate-500 gap-3">
      <div className="w-8 h-8 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin" />
      <p className="text-sm font-medium">Redirecting to your workspace dashboard...</p>
    </div>
  );
}

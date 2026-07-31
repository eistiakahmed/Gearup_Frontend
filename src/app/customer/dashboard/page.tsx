'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomerDashboardAliasPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/customer');
  }, [router]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-slate-500 gap-3">
      <div className="w-8 h-8 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin" />
      <p className="text-sm font-medium">Redirecting to Customer Dashboard...</p>
    </div>
  );
}

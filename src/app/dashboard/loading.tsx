import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 animate-pulse">
        <div className="h-32 w-full bg-slate-200 rounded-3xl border border-slate-200" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-28 bg-slate-200 rounded-2xl border border-slate-200" />
          <div className="h-28 bg-slate-200 rounded-2xl border border-slate-200" />
          <div className="h-28 bg-slate-200 rounded-2xl border border-slate-200" />
          <div className="h-28 bg-slate-200 rounded-2xl border border-slate-200" />
        </div>
        <div className="h-96 w-full bg-slate-200 rounded-2xl border border-slate-200" />
      </div>
    </div>
  );
}

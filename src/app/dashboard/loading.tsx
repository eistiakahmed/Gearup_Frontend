import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 animate-pulse">
        <div className="h-32 w-full bg-slate-900/80 rounded-3xl border border-slate-800" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800" />
          <div className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800" />
          <div className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800" />
          <div className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800" />
        </div>
        <div className="h-96 w-full bg-slate-900/80 rounded-2xl border border-slate-800" />
      </div>
    </div>
  );
}

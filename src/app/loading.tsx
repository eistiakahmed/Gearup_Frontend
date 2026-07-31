import React from 'react';
import { Dumbbell } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="p-4 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200">
          <Dumbbell className="w-10 h-10 animate-spin" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-lg font-bold text-slate-900">Loading GearUp...</h3>
          <p className="text-xs text-slate-500">Fetching latest sports equipment & rental data</p>
        </div>
      </div>
    </div>
  );
}

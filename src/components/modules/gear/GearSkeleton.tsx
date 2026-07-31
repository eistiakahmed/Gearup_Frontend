import React from 'react';
import { Card } from '@/components/ui/Card';

export interface GearSkeletonProps {
  count?: number;
}

export function GearSkeleton({ count = 6 }: GearSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <Card key={idx} className="flex flex-col h-96 overflow-hidden animate-pulse border-slate-200 bg-white">
          <div className="w-full h-48 bg-slate-200" />
          <div className="p-5 flex flex-col gap-3 flex-1">
            <div className="h-3 w-1/3 bg-slate-200 rounded-md" />
            <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
            <div className="h-3 w-full bg-slate-100 rounded-md" />
            <div className="h-3 w-4/5 bg-slate-100 rounded-md" />
            <div className="mt-auto pt-3 border-t border-slate-200 flex items-center justify-between">
              <div className="h-6 w-16 bg-slate-200 rounded-md" />
              <div className="h-8 w-24 bg-slate-200 rounded-xl" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

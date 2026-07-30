import React from 'react';
import { GearItem } from '@/types/gear';
import { GearCard } from './GearCard';
import { Dumbbell, SearchX } from 'lucide-react';

export interface GearGridProps {
  items: GearItem[];
  onResetFilters?: () => void;
}

export function GearGrid({ items, onResetFilters }: GearGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800/80 w-full min-h-[350px]">
        <div className="p-4 rounded-2xl bg-slate-800/60 text-slate-400 mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-1">No Gear Items Found</h3>
        <p className="text-slate-400 text-sm max-w-md mb-6">
          We couldn&apos;t find any equipment matching your active search or filter criteria. Try adjusting your filters.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {items.map((gear) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
}

'use client';

import React from 'react';
import { GearQueryFilters, GearCategory } from '@/types/gear';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search, Filter, RotateCcw, DollarSign, SlidersHorizontal } from 'lucide-react';

export interface GearFilterSidebarProps {
  filters: GearQueryFilters;
  categories: GearCategory[];
  onFilterChange: (updated: Partial<GearQueryFilters>) => void;
  onClearFilters: () => void;
}

export function GearFilterSidebar({
  filters,
  categories,
  onFilterChange,
  onClearFilters,
}: GearFilterSidebarProps) {
  return (
    <div className="flex flex-col gap-6 p-5 rounded-2xl bg-white border border-slate-200 shadow-md shadow-slate-200/50 w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">Filter Equipment</h3>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className="text-xs text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Search Bar */}
      <Input
        label="Search Gear"
        placeholder="e.g. Kayak, Mountain Bike, Tent"
        leftIcon={<Search className="w-4 h-4" />}
        value={filters.search || ''}
        onChange={(e) => onFilterChange({ search: e.target.value })}
      />

      {/* Category Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
          Category
        </label>
        <select
          value={filters.category || ''}
          onChange={(e) => onFilterChange({ category: e.target.value || undefined })}
          className="w-full bg-white text-slate-900 text-sm rounded-xl border border-slate-300 p-2.5 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center justify-between">
          <span>Max Daily Rate ($)</span>
          {filters.maxPrice && (
            <span className="text-emerald-600 font-bold">${filters.maxPrice}</span>
          )}
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min $"
            min={0}
            value={filters.minPrice ?? ''}
            onChange={(e) =>
              onFilterChange({
                minPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
          <span className="text-slate-400 font-bold">-</span>
          <Input
            type="number"
            placeholder="Max $"
            min={0}
            value={filters.maxPrice ?? ''}
            onChange={(e) =>
              onFilterChange({
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </div>
      </div>

      {/* Sort By Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
          Sort By
        </label>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.sortBy || 'createdAt'}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="w-full bg-white text-slate-900 text-xs rounded-xl border border-slate-300 p-2.5 outline-none focus:border-emerald-600 shadow-sm"
          >
            <option value="createdAt">Date Added</option>
            <option value="price">Daily Rate</option>
            <option value="name">Gear Name</option>
          </select>

          <select
            value={filters.sortOrder || 'desc'}
            onChange={(e) => onFilterChange({ sortOrder: e.target.value as any })}
            className="w-full bg-white text-slate-900 text-xs rounded-xl border border-slate-300 p-2.5 outline-none focus:border-emerald-600 shadow-sm"
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
}

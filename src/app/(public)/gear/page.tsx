'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/common/PublicLayout';
import { useGearCatalog, useCategories } from '@/hooks/useGear';
import { GearQueryFilters } from '@/types/gear';
import { GearFilterSidebar } from '@/components/modules/gear/GearFilterSidebar';
import { GearGrid } from '@/components/modules/gear/GearGrid';
import { GearSkeleton } from '@/components/modules/gear/GearSkeleton';
import { Pagination } from '@/components/ui/Pagination';
import { Alert } from '@/components/ui/Alert';
import { Compass, Filter, SlidersHorizontal } from 'lucide-react';

export default function BrowseGearPage() {
  const [filters, setFilters] = useState<GearQueryFilters>({
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { items, meta, isLoading, error } = useGearCatalog(filters);
  const { categories } = useCategories();

  const handleFilterChange = (updated: Partial<GearQueryFilters>) => {
    setFilters((prev) => ({ ...prev, ...updated, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: 12,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col gap-2 z-10">
              <div className="flex items-center gap-2 text-emerald-100 font-bold text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4" /> Equipment Catalog
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Browse Sports & Outdoor Gear
              </h1>
              <p className="text-emerald-100 text-sm max-w-xl">
                Explore kayaks, tents, mountain bikes, gym equipment and more available for instant rental.
              </p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-800 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors w-full md:w-auto shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>{isMobileFilterOpen ? 'Hide Filters' : 'Filter Gear'}</span>
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <Alert variant="error" title="Failed to load gear catalog">
              {error.message || 'Unable to connect to backend server.'}
            </Alert>
          )}

          {/* Main Grid & Sidebar Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-24">
              <GearFilterSidebar
                filters={filters}
                categories={categories}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </aside>

            {/* Mobile Filter Collapsible */}
            {isMobileFilterOpen && (
              <div className="lg:hidden col-span-1">
                <GearFilterSidebar
                  filters={filters}
                  categories={categories}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            )}

            {/* Main Catalog View */}
            <main className="lg:col-span-9 flex flex-col gap-6">
              {/* Results Header & Control Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Showing <span className="font-bold text-slate-900">{items.length}</span> of{' '}
                    <span className="font-bold text-slate-900">{meta.total || items.length}</span> items
                  </p>
                  {filters.category && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                      Category Active
                    </span>
                  )}
                </div>

                {/* Top Right Controls: Sort By & Limit */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* Sort Selector */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="hidden sm:inline font-medium">Sort:</span>
                    <select
                      value={`${filters.sortBy || 'createdAt'}-${filters.sortOrder || 'desc'}`}
                      onChange={(e) => {
                        const [sortBy, sortOrder] = e.target.value.split('-');
                        handleFilterChange({
                          sortBy: sortBy as GearQueryFilters['sortBy'],
                          sortOrder: sortOrder as 'asc' | 'desc',
                        });
                      }}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    >
                      <option value="createdAt-desc">Newest First</option>
                      <option value="dailyRate-asc">Price: Low to High</option>
                      <option value="dailyRate-desc">Price: High to Low</option>
                      <option value="name-asc">Name: A-Z</option>
                    </select>
                  </div>

                  {/* Limit Selector */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="hidden sm:inline font-medium">Show:</span>
                    <select
                      value={filters.limit || 12}
                      onChange={(e) => {
                        handleFilterChange({
                          limit: Number(e.target.value),
                          page: 1,
                        });
                      }}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    >
                      <option value={12}>12 / page</option>
                      <option value={24}>24 / page</option>
                      <option value={48}>48 / page</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid or Skeleton */}
              {isLoading ? (
                <GearSkeleton count={6} />
              ) : (
                <>
                  <GearGrid items={items} onResetFilters={handleClearFilters} />
                  <Pagination
                    currentPage={filters.page || 1}
                    totalPages={meta.totalPages || Math.ceil((meta.total || items.length) / (filters.limit || 12))}
                    totalItems={meta.total || items.length}
                    itemsPerPage={filters.limit || 12}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

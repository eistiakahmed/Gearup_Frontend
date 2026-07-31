'use client';

import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { Button } from '@/components/ui/Button';
import { useGearCatalog } from '@/hooks/useGear';
import { GearGrid } from '@/components/modules/gear/GearGrid';
import { GearSkeleton } from '@/components/modules/gear/GearSkeleton';
import { Dumbbell, ArrowRight, ShieldCheck, Zap, Compass, RefreshCw, Flame } from 'lucide-react';

export default function Home() {
  const { items, isLoading } = useGearCatalog({ limit: 6, sortBy: 'createdAt', sortOrder: 'desc' });

  return (
    <PublicLayout>
      <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 lg:p-12 overflow-hidden bg-slate-50 text-slate-900">
        {/* Dynamic Background Glow Elements */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none" />

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8 z-10 py-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-semibold shadow-sm">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Instant Sports & Outdoor Equipment Rentals</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Rent Premium Sports Gear <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
              Whenever & Wherever
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-slate-600 text-base sm:text-lg leading-relaxed">
            GearUp connects sports enthusiasts with local equipment providers. Browse kayaks, camping gear, mountain bikes, and gym equipment with instant rental date scheduling.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
            <Link href="/gear" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="w-5 h-5" />}>
                Browse Equipment Catalog
              </Button>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" fullWidth leftIcon={<Dumbbell className="w-5 h-5" />}>
                Become a Provider
              </Button>
            </Link>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mt-12 text-left">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md shadow-slate-200/50 flex flex-col gap-2">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 w-fit">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Wide Gear Selection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter by category, price, brand, and date availability to find exact equipment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md shadow-slate-200/50 flex flex-col gap-2">
              <div className="p-2.5 rounded-xl bg-teal-100 text-teal-700 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Secure Payments</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Powered by Stripe Checkout with transparent rental rates and zero hidden fees.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md shadow-slate-200/50 flex flex-col gap-2">
              <div className="p-2.5 rounded-xl bg-cyan-100 text-cyan-700 w-fit">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Real-Time Order Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track rental status badges from Placed, Confirmed, Paid, Picked Up to Returned.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Gear Section */}
        <div className="w-full max-w-7xl mx-auto py-16 border-t border-slate-200 z-10 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                <Flame className="w-4 h-4 text-emerald-600" /> Featured Equipment
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Latest Additions Available for Rent
              </h2>
            </div>

            <Link href="/gear">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Gear
              </Button>
            </Link>
          </div>

          {/* Grid or Skeleton */}
          {isLoading ? (
            <GearSkeleton count={6} />
          ) : (
            <GearGrid items={items} />
          )}
        </div>
      </div>
    </PublicLayout>
  );
}

import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Dumbbell, ArrowRight, ShieldCheck, Zap, Compass, RefreshCw } from 'lucide-react';

export default function Home() {
  return (
    <PublicLayout>
      <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 lg:p-12 overflow-hidden bg-slate-950 text-slate-100">
        {/* Dynamic Background Glow Elements */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8 z-10 py-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Instant Sports & Outdoor Equipment Rentals</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-100 leading-[1.1]">
            Rent Premium Sports Gear <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Whenever & Wherever
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-slate-400 text-base sm:text-lg leading-relaxed">
            GearUp connects sports enthusiasts with local equipment providers. Browse kayaks, camping gear, mountain bikes, and gym equipment with instant rental date scheduling.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
            <Link href="/gear" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="w-5 h-5" />}>
                Browse Equipment Catalog
              </Button>
            </Link>
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" fullWidth leftIcon={<Dumbbell className="w-5 h-5" />}>
                Become a Provider
              </Button>
            </Link>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mt-12 text-left">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col gap-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">Wide Gear Selection</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filter by category, price, brand, and date availability to find exact equipment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col gap-2">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">Secure Payments</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Powered by Stripe Checkout with transparent rental rates and zero hidden fees.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col gap-2">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">Real-Time Order Tracking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track rental status badges from Placed, Confirmed, Paid, Picked Up to Returned.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}


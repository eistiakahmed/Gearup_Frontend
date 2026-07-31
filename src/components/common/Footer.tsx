import React from 'react';
import Link from 'next/link';
import { Dumbbell, ShieldCheck, Zap, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-600 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="p-2 rounded-xl bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                GearUp
              </span>
            </Link>
            <p className="text-slate-600 leading-relaxed max-w-sm text-xs sm:text-sm">
              Rent premium sports and outdoor gear instantly from verified local providers, or list your own equipment to start earning today.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Quality
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-teal-700">
                <Zap className="w-4 h-4 text-teal-600" /> Instant Checkout
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Platform
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-700 transition-colors text-slate-600">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/gear" className="hover:text-emerald-700 transition-colors text-slate-600">
                  Browse Gear Catalog
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-emerald-700 transition-colors text-slate-600">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-emerald-700 transition-colors text-slate-600">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Role Portals */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Portals
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <Link href="/dashboard/customer" className="hover:text-emerald-700 transition-colors text-slate-600">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/provider" className="hover:text-emerald-700 transition-colors text-slate-600">
                  Provider Workspace
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-emerald-700 transition-colors text-slate-600">
                  Admin Moderation
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Equipment Categories
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <Link href="/gear?category=Camping" className="hover:text-emerald-700 transition-colors text-slate-600">
                  Camping & Hiking
                </Link>
              </li>
              <li>
                <Link href="/gear?category=Cycling" className="hover:text-emerald-700 transition-colors text-slate-600">
                  Bikes & Cycling
                </Link>
              </li>
              <li>
                <Link href="/gear?category=WaterSports" className="hover:text-emerald-700 transition-colors text-slate-600">
                  Water Sports & Kayaks
                </Link>
              </li>
              <li>
                <Link href="/gear?category=Fitness" className="hover:text-emerald-700 transition-colors text-slate-600">
                  Fitness & Gym Gear
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GearUp Rental Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" /> for Sports Enthusiasts
          </div>
        </div>
      </div>
    </footer>
  );
}

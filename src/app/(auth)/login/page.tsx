import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/modules/auth/LoginForm';
import { Card, CardContent } from '@/components/ui/Card';
import { Dumbbell, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Sign In | GearUp Sports Rental',
  description: 'Sign in to your GearUp account to manage sports gear rentals or provider inventory.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden bg-slate-50 text-slate-900">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Side: Brand Hero Section */}
        <div className="lg:col-span-5 flex flex-col gap-8 pr-0 lg:pr-6">
          <Link href="/" className="inline-flex items-center gap-3 group w-fit">
            <div className="p-3 rounded-2xl bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                GearUp <span className="text-emerald-600 font-extrabold">🏋️</span>
              </span>
              <p className="text-xs text-slate-500 font-medium">Rent Sports & Outdoor Gear</p>
            </div>
          </Link>

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Welcome Back to <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
                GearUp
              </span>
            </h1>
            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              Sign in to manage your active gear rentals, track orders, or access your provider & admin dashboards.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Secure Cookie Sessions</h4>
                <p className="text-xs text-slate-600">HTTP-only authentication cookies for seamless browsing security.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="p-2 rounded-lg bg-teal-100 text-teal-700 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Instant Role Dashboard Access</h4>
                <p className="text-xs text-slate-600">Auto-routes to Customer, Provider, or Admin workspace.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form Card */}
        <div className="lg:col-span-7">
          <Card className="p-2 sm:p-4 bg-white border-slate-200 shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Sign in to your account</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Enter your credentials below to access your account.
                </p>
              </div>

              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Metadata from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/components/modules/auth/RegisterForm';
import { Card, CardContent } from '@/components/ui/Card';
import { Dumbbell, ShieldCheck, Zap, Award } from 'lucide-react';

export const metadata = {
  title: 'Create Account | GearUp Sports Rental',
  description: 'Join GearUp to rent premium sports and outdoor equipment or list your gear as a provider.',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden bg-slate-950 text-slate-100">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Side: Brand Hero Section */}
        <div className="lg:col-span-5 flex flex-col gap-8 pr-0 lg:pr-6">
          <Link href="/" className="inline-flex items-center gap-3 group w-fit">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                GearUp <span className="text-emerald-400 font-extrabold">🏋️</span>
              </span>
              <p className="text-xs text-slate-400 font-medium">Rent Sports & Outdoor Gear</p>
            </div>
          </Link>

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-100 leading-[1.15]">
              Get Started with <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                GearUp Today
              </span>
            </h1>
            <p className="mt-4 text-slate-400 text-base leading-relaxed">
              Whether you are looking to rent top-tier outdoor equipment or list your own gear to earn extra income, GearUp provides a safe, seamless platform for sports enthusiasts.
            </p>
          </div>

          {/* Value Props */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Instant Booking & Payments</h4>
                <p className="text-xs text-slate-400">Select rental dates with ease and pay securely via Stripe.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Verified Providers & Equipment</h4>
                <p className="text-xs text-slate-400">Every gear listing undergoes platform inspection for quality.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Multi-Role Platform</h4>
                <p className="text-xs text-slate-400">Tailored dashboards for Customers, Providers, and Admins.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form Card */}
        <div className="lg:col-span-7">
          <Card className="p-2 sm:p-4 border-slate-800/90 shadow-2xl">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-100">Create your account</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Choose your role and fill in your details to register.
                </p>
              </div>

              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

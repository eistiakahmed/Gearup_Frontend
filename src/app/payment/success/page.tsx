import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ShoppingBag, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Payment Successful | GearUp Sports Rental',
  description: 'Your rental order payment has been confirmed successfully.',
};

export default function PaymentSuccessPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
        {/* Dynamic Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />

        <div className="w-full max-w-xl z-10">
          <Card className="p-6 sm:p-8 text-center border-slate-800 shadow-2xl">
            <CardContent className="flex flex-col items-center gap-6 p-0">
              {/* Success Animated Icon */}
              <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Payment Confirmed
                </span>
                <h1 className="text-3xl font-black text-slate-100 tracking-tight">
                  Thank You for Your Order!
                </h1>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Your rental payment was processed successfully via Stripe. Your order status is now updated to <strong className="text-emerald-300 font-semibold">PAID</strong>.
                </p>
              </div>

              {/* Status Notice */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 w-full text-left text-xs sm:text-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Next Steps for Gear Pickup</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Your gear provider will prepare your equipment. You can track pickup updates and view equipment contact details directly in your customer dashboard.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
                <Link href="/dashboard/customer" className="w-full">
                  <Button variant="primary" size="lg" fullWidth leftIcon={<ShoppingBag className="w-5 h-5" />}>
                    View My Customer Dashboard
                  </Button>
                </Link>
                <Link href="/gear" className="w-full">
                  <Button variant="outline" size="lg" fullWidth leftIcon={<Compass className="w-5 h-5" />}>
                    Browse More Gear
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}

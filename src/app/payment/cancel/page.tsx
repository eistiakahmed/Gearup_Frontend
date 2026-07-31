import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { XCircle, RefreshCw, ShoppingBag, Compass } from 'lucide-react';

export const metadata = {
  title: 'Payment Cancelled | GearUp Sports Rental',
  description: 'Your payment session was cancelled. No charges were made.',
};

export default function PaymentCancelPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
        {/* Dynamic Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-500/10 blur-[140px] pointer-events-none" />

        <div className="w-full max-w-xl z-10">
          <Card className="p-6 sm:p-8 text-center border-slate-800 shadow-2xl">
            <CardContent className="flex flex-col items-center gap-6 p-0">
              {/* Cancel Icon */}
              <div className="p-4 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                <XCircle className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  Payment Cancelled
                </span>
                <h1 className="text-3xl font-black text-slate-100 tracking-tight">
                  Checkout Was Interrupted
                </h1>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Your payment transaction was cancelled. No charges were deducted from your account. You can retry checkout anytime from your order history.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full mt-2">
                <Link href="/dashboard/customer" className="w-full sm:flex-1">
                  <Button variant="primary" size="lg" fullWidth leftIcon={<ShoppingBag className="w-5 h-5" />}>
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/gear" className="w-full sm:flex-1">
                  <Button variant="outline" size="lg" fullWidth leftIcon={<Compass className="w-5 h-5" />}>
                    Browse Catalog
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

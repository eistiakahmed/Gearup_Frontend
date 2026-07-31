'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { usePayment } from '@/hooks/usePayment';
import { PaymentMethod } from '@/types/payment';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { PublicLayout } from '@/components/common/PublicLayout';
import { CreditCard, ShieldCheck, ArrowRight, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

export default function PaymentCheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: orderId } = use(params);
  const { initiatePayment, isInitiatingPayment } = usePayment();

  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleProceedPayment = async () => {
    setPaymentError(null);

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
      const successUrl = `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`;
      const cancelUrl = `${origin}/payment/cancel?order_id=${orderId}`;

      const response = await initiatePayment({
        orderId,
        method: PaymentMethod.STRIPE,
        currency: 'USD',
        successUrl,
        cancelUrl,
      });

      const checkoutUrl =
        (response?.data as any)?.paymentUrl ||
        response?.data?.checkoutUrl ||
        (response?.data as any)?.providerResponse?.sessionUrl;

      if (response && response.success && checkoutUrl) {
        // Redirect browser to Stripe Hosted Checkout
        window.location.href = checkoutUrl;
      } else {
        setPaymentError(
          response?.message || 'Payment session creation failed. Please check if payment is already pending.'
        );
      }
    } catch (err: any) {
      console.error('Payment checkout error:', err);
      let errMsg = 'Unable to connect to Stripe gateway. Please try again.';

      if (err?.data?.message) {
        errMsg = err.data.message;
      } else if (err?.message) {
        errMsg = err.message;
      }

      setPaymentError(errMsg);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <Link href="/dashboard/customer">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Customer Dashboard
            </Button>
          </Link>

          {paymentError && (
            <Alert variant="error" title="Checkout Error" onClose={() => setPaymentError(null)}>
              {paymentError}
            </Alert>
          )}

          <Card className="p-4 sm:p-6 border-slate-800 shadow-2xl">
            <CardHeader className="border-b border-slate-800/80 pb-6 mb-6">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                <CreditCard className="w-4 h-4" /> Secure Payment Checkout
              </div>
              <CardTitle className="text-2xl font-black">Complete Your Rental Payment</CardTitle>
              <CardDescription>
                Review your order details below and proceed to Stripe Hosted Checkout to finalize payment.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              {/* Order Info Summary Box */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Order Reference</span>
                  <span className="font-mono font-bold text-slate-200">{orderId}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Payment Gateway</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Stripe Checkout
                  </span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-100">Status</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    Awaiting Payment
                  </span>
                </div>
              </div>

              {/* Payment Method Selector Card */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Selected Payment Provider
                </label>
                <div className="p-4 rounded-xl border border-emerald-500 bg-emerald-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">Stripe Secure Checkout</h4>
                      <p className="text-xs text-slate-400">Supports Credit/Debit Cards, Apple Pay & Google Pay</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-Bit SSL Encrypted. Your financial credentials are never stored on GearUp servers.</span>
              </div>

              {/* Submit Checkout Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isInitiatingPayment}
                onClick={handleProceedPayment}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Proceed to Stripe Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}

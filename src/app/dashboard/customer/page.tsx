'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { useCustomerRentals } from '@/hooks/useRentals';
import { usePaymentHistory } from '@/hooks/usePayment';
import { RentalOrderStatus, RentalOrder } from '@/types/rental';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ReviewModal } from '@/components/modules/rentals/ReviewModal';
import {
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  Clock,
  DollarSign,
  Star,
  ArrowRight,
  ShieldCheck,
  Package,
  PackageCheck,
} from 'lucide-react';


export default function CustomerDashboardPage() {
  const { orders, isLoading: isOrdersLoading, mutate: mutateOrders } = useCustomerRentals();
  const { payments, isLoading: isPaymentsLoading } = usePaymentHistory();

  const [reviewModalData, setReviewModalData] = useState<{
    isOpen: boolean;
    gearId: string;
    orderId: string;
    gearName: string;
  }>({
    isOpen: false,
    gearId: '',
    orderId: '',
    gearName: '',
  });

  // Calculate Metrics
  const totalOrders = orders.length;
  const activeRentals = orders.filter(
    (o) => o.status === RentalOrderStatus.PAID || o.status === RentalOrderStatus.PICKED_UP
  ).length;
  const completedRentals = orders.filter((o) => o.status === RentalOrderStatus.RETURNED).length;
  const totalSpent = orders
    .filter((o) => o.status !== RentalOrderStatus.CANCELLED)
    .reduce((acc, o) => acc + (Number(o.totalAmount) || 0), 0);


  const getOrderStatusBadgeVariant = (status: RentalOrderStatus) => {
    switch (status) {
      case RentalOrderStatus.PLACED:
        return 'placed';
      case RentalOrderStatus.CONFIRMED:
        return 'confirmed';
      case RentalOrderStatus.PAID:
        return 'paid';
      case RentalOrderStatus.PICKED_UP:
        return 'picked_up';
      case RentalOrderStatus.RETURNED:
        return 'returned';
      case RentalOrderStatus.CANCELLED:
        return 'cancelled';
      default:
        return 'default';
    }
  };

  const handleOpenReview = (order: RentalOrder) => {
    const gearItem = order.items && order.items.length > 0 ? order.items[0].gear : null;
    const gearId = gearItem?.id || (order.items && order.items.length > 0 ? order.items[0].gearId : '');
    const gearName = gearItem?.name || 'Sports Equipment';

    setReviewModalData({
      isOpen: true,
      gearId,
      orderId: order.id,
      gearName,
    });
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col gap-1 z-10">
              <div className="flex items-center gap-2 text-emerald-100 font-bold text-xs uppercase tracking-wider">
                <ShoppingBag className="w-4 h-4" /> Customer Dashboard
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                My Rental Orders & History
              </h1>
              <p className="text-emerald-100 text-sm max-w-xl">
                Track active rentals, make payments for confirmed orders, and review equipment after returning.
              </p>
            </div>

            <Link href="/gear">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Browse Gear Catalog
              </Button>
            </Link>
          </div>

          {/* Overview Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Orders
                </span>
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">{totalOrders}</p>
            </Card>

            <Card className="p-5 border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Active Rentals
                </span>
                <div className="p-2 rounded-lg bg-cyan-100 text-cyan-700">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">{activeRentals}</p>
            </Card>

            <Card className="p-5 border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Completed Rentals
                </span>
                <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">{completedRentals}</p>
            </Card>

            <Card className="p-5 border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Spent
                </span>
                <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">${Number(totalSpent || 0).toFixed(2)}</p>
            </Card>
          </div>

          {/* Rental Orders History Table */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" /> My Rental Orders
              </h2>
              <span className="text-xs text-slate-500">Real-time SWR Status</span>
            </div>

            <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
              {isOrdersLoading ? (
                <div className="p-12 text-center text-slate-500 animate-pulse">
                  Loading rental orders...
                </div>
              ) : orders.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  No rental orders found yet.{' '}
                  <Link href="/gear" className="text-emerald-700 underline ml-1 font-semibold">
                    Browse Equipment to Rent
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-4">Order Ref</th>
                        <th className="p-4">Equipment</th>
                        <th className="p-4">Rental Dates</th>
                        <th className="p-4">Total Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((order) => {
                        const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;
                        const gearName = firstItem?.gear?.name || 'Equipment Rental';
                        const startDateStr = new Date(order.startDate).toLocaleDateString();
                        const endDateStr = new Date(order.endDate).toLocaleDateString();

                        return (
                          <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-mono font-bold text-slate-700 text-xs">
                              {order.id.slice(0, 8)}...
                            </td>
                            <td className="p-4 font-semibold text-slate-900">{gearName}</td>
                            <td className="p-4 text-slate-600">
                              {startDateStr} - {endDateStr} ({order.totalDays || 1}d)
                            </td>
                            <td className="p-4 font-bold text-emerald-700">
                              ${Number(order.totalAmount || 0).toFixed(2)}
                            </td>
                            <td className="p-4">
                              <Badge variant={getOrderStatusBadgeVariant(order.status)}>
                                {order.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-right">
                              {/* 1. PLACED or CONFIRMED (Unpaid) -> Pay Now */}
                              {(order.status === RentalOrderStatus.PLACED || order.status === RentalOrderStatus.CONFIRMED) && (
                                <Link href={`/dashboard/customer/orders/${order.id}/pay`}>
                                  <Button variant="primary" size="sm" rightIcon={<CreditCard className="w-3.5 h-3.5" />}>
                                    Pay Now
                                  </Button>
                                </Link>
                              )}

                              {/* 2. PAID -> Awaiting Pickup */}
                              {order.status === RentalOrderStatus.PAID && (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  disabled
                                  leftIcon={<Clock className="w-3.5 h-3.5 text-purple-600 animate-pulse" />}
                                  className="bg-purple-50 text-purple-800 border border-purple-200 font-medium opacity-100 disabled:opacity-100 cursor-default"
                                >
                                  Awaiting Pickup
                                </Button>
                              )}

                              {/* 3. PICKED_UP -> Active Rental */}
                              {order.status === RentalOrderStatus.PICKED_UP && (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  disabled
                                  leftIcon={<PackageCheck className="w-3.5 h-3.5 text-emerald-600" />}
                                  className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium opacity-100 disabled:opacity-100 cursor-default"
                                >
                                  Active Rental
                                </Button>
                              )}

                              {/* 4. RETURNED -> Leave Review */}
                              {order.status === RentalOrderStatus.RETURNED && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOpenReview(order)}
                                  leftIcon={<Star className="w-3.5 h-3.5 text-amber-500" />}
                                >
                                  Leave Review
                                </Button>
                              )}

                              {/* 5. CANCELLED -> - */}
                              {order.status === RentalOrderStatus.CANCELLED && (
                                <span className="text-xs text-slate-400 font-mono">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>

          {/* Payment History Table */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-teal-600" /> Payment History
            </h2>

            <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
              {isPaymentsLoading ? (
                <div className="p-12 text-center text-slate-500 animate-pulse">
                  Loading payment history...
                </div>
              ) : payments.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  No payment records found yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-4">Payment ID</th>
                        <th className="p-4">Order Ref</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Method</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {payments.map((pm) => (
                        <tr key={pm.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-mono text-slate-500 text-xs">{pm.id.slice(0, 8)}...</td>
                          <td className="p-4 font-mono text-slate-700 text-xs">{pm.orderId.slice(0, 8)}...</td>
                          <td className="p-4 font-bold text-slate-900">${Number(pm.amount || 0).toFixed(2)}</td>

                          <td className="p-4 font-semibold text-emerald-700">{pm.method}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                pm.status === 'COMPLETED'
                                  ? 'picked_up'
                                  : pm.status === 'PENDING'
                                  ? 'placed'
                                  : 'cancelled'
                              }
                            >
                              {pm.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-slate-500 text-xs">
                            {new Date(pm.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Review Modal Dialog */}
      <ReviewModal
        isOpen={reviewModalData.isOpen}
        gearId={reviewModalData.gearId}
        orderId={reviewModalData.orderId}
        gearName={reviewModalData.gearName}
        onClose={() => setReviewModalData((prev) => ({ ...prev, isOpen: false }))}
        onSuccess={() => mutateOrders()}
      />
    </PublicLayout>
  );
}

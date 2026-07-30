'use client';

import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { useAdminRentals } from '@/hooks/useAdmin';
import { RentalOrderStatus } from '@/types/rental';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ShoppingBag, ArrowLeft, User as UserIcon, Store } from 'lucide-react';

export default function AdminOrderModerationPage() {
  const { orders, isLoading } = useAdminRentals();

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

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/admin">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back to Admin Dashboard
              </Button>
            </Link>
          </div>

          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800/80 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col gap-1 z-10">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <ShoppingBag className="w-4 h-4" /> Order Monitoring
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
                All Platform Rental Orders ({orders.length})
              </h1>
              <p className="text-slate-400 text-sm max-w-xl">
                Monitor customer orders across all providers, check payment statuses, and track rental fulfillments.
              </p>
            </div>
          </div>

          {/* Data Table */}
          <Card className="overflow-hidden border-slate-800">
            {isLoading ? (
              <div className="p-12 text-center text-slate-400 animate-pulse">
                Loading platform rental orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                No rental orders found in the system.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Order Ref</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Provider</th>
                      <th className="p-4">Equipment Item</th>
                      <th className="p-4">Rental Period</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {orders.map((order) => {
                      const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;
                      const gearName = firstItem?.gear?.name || 'Equipment Item';
                      const customerName = order.customer?.name || 'Customer';
                      const providerName = order.provider?.name || 'Provider';
                      const startDateStr = new Date(order.startDate).toLocaleDateString();
                      const endDateStr = new Date(order.endDate).toLocaleDateString();

                      return (
                        <tr key={order.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-slate-300 text-xs">
                            {order.id.slice(0, 8)}...
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                              <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                              <span>{customerName}</span>
                            </div>
                          </td>
                          <td className="p-4 text-slate-300">
                            <div className="flex items-center gap-1.5">
                              <Store className="w-3.5 h-3.5 text-amber-400" />
                              <span>{providerName}</span>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-slate-100">{gearName}</td>
                          <td className="p-4 text-slate-300 text-xs">
                            {startDateStr} - {endDateStr} ({order.totalDays || 1}d)
                          </td>
                          <td className="p-4 font-bold text-emerald-400">
                            ${order.totalAmount.toFixed(2)}
                          </td>
                          <td className="p-4">
                            <Badge variant={getOrderStatusBadgeVariant(order.status)}>
                              {order.status}
                            </Badge>
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
      </div>
    </PublicLayout>
  );
}

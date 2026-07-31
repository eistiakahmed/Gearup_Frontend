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
      <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/admin">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back to Admin Dashboard
              </Button>
            </Link>
          </div>

          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col gap-1 z-10">
              <div className="flex items-center gap-2 text-emerald-100 font-bold text-xs uppercase tracking-wider">
                <ShoppingBag className="w-4 h-4" /> Order Monitoring
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                All Platform Rental Orders ({orders.length})
              </h1>
              <p className="text-emerald-100 text-sm max-w-xl">
                Monitor customer orders across all providers, check payment statuses, and track rental fulfillments.
              </p>
            </div>
          </div>

          {/* Data Table */}
          <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
            {isLoading ? (
              <div className="p-12 text-center text-slate-500 animate-pulse">
                Loading platform rental orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                No rental orders found in the system.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider border-b border-slate-200">
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
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((order) => {
                      const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;
                      const gearName = firstItem?.gear?.name || 'Equipment Item';
                      const customerName = order.customer?.name || 'Customer';
                      const providerName = order.provider?.name || 'Provider';
                      const startDateStr = new Date(order.startDate).toLocaleDateString();
                      const endDateStr = new Date(order.endDate).toLocaleDateString();

                      return (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-mono font-bold text-slate-700 text-xs">
                            {order.id.slice(0, 8)}...
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                              <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{customerName}</span>
                            </div>
                          </td>
                          <td className="p-4 text-slate-700">
                            <div className="flex items-center gap-1.5">
                              <Store className="w-3.5 h-3.5 text-amber-600" />
                              <span>{providerName}</span>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-slate-900">{gearName}</td>
                          <td className="p-4 text-slate-600 text-xs">
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

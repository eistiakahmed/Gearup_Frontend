'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { useProviderOrders, useUpdateOrderStatus } from '@/hooks/useProvider';
import { RentalOrderStatus, RentalOrder } from '@/types/rental';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import {
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  PackageCheck,
  RotateCcw,
  Clock,
  User as UserIcon,
} from 'lucide-react';

export default function ProviderOrdersPage() {
  const { orders, isLoading, mutate: mutateOrders } = useProviderOrders();
  const { updateStatus, isUpdatingStatus } = useUpdateOrderStatus();

  const [actionError, setActionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleUpdateStatus = async (orderId: string, newStatus: RentalOrderStatus) => {
    setActionError(null);
    setSuccessMsg(null);

    try {
      const response = await updateStatus({ orderId, status: newStatus });
      if (response && response.success) {
        setSuccessMsg(`Order updated to ${newStatus} successfully!`);
        mutateOrders();
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err: any) {
      console.error('Status update error:', err);
      setActionError(
        err?.message || err?.data?.message || 'Failed to update order status. Please try again.'
      );
    }
  };

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
            <Link href="/dashboard/provider">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back to Provider Workspace
              </Button>
            </Link>
          </div>

          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/40 border border-slate-800/80 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col gap-1 z-10">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <ShoppingBag className="w-4 h-4" /> Order Management
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
                Incoming Customer Orders ({orders.length})
              </h1>
              <p className="text-slate-400 text-sm max-w-xl">
                Review rental requests, confirm availability, and mark equipment as Picked Up or Returned.
              </p>
            </div>
          </div>

          {actionError && (
            <Alert variant="error" title="Action Failed" onClose={() => setActionError(null)}>
              {actionError}
            </Alert>
          )}

          {successMsg && (
            <Alert variant="success" title="Order Updated">
              {successMsg}
            </Alert>
          )}

          {/* Incoming Orders Table */}
          <Card className="overflow-hidden border-slate-800">
            {isLoading ? (
              <div className="p-12 text-center text-slate-400 animate-pulse">
                Loading incoming customer orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                No incoming customer orders yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Order Ref</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Equipment Item</th>
                      <th className="p-4">Rental Period</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {orders.map((order) => {
                      const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;
                      const gearName = firstItem?.gear?.name || 'Equipment Item';
                      const customerName = order.customer?.name || 'Customer';
                      const startDateStr = new Date(order.startDate).toLocaleDateString();
                      const endDateStr = new Date(order.endDate).toLocaleDateString();

                      return (
                        <tr key={order.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-slate-300 text-xs">
                            {order.id.slice(0, 8)}...
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <UserIcon className="w-4 h-4 text-amber-400 shrink-0" />
                              <span className="font-semibold text-slate-100">{customerName}</span>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-slate-200">{gearName}</td>
                          <td className="p-4 text-slate-300">
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
                          <td className="p-4 text-right">
                            {order.status === RentalOrderStatus.PLACED && (
                              <Button
                                variant="primary"
                                size="sm"
                                isLoading={isUpdatingStatus}
                                onClick={() => handleUpdateStatus(order.id, RentalOrderStatus.CONFIRMED)}
                                leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                              >
                                Confirm Order
                              </Button>
                            )}

                            {order.status === RentalOrderStatus.PAID && (
                              <Button
                                variant="primary"
                                size="sm"
                                isLoading={isUpdatingStatus}
                                onClick={() => handleUpdateStatus(order.id, RentalOrderStatus.PICKED_UP)}
                                leftIcon={<PackageCheck className="w-3.5 h-3.5" />}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white"
                              >
                                Mark Picked Up
                              </Button>
                            )}

                            {order.status === RentalOrderStatus.PICKED_UP && (
                              <Button
                                variant="secondary"
                                size="sm"
                                isLoading={isUpdatingStatus}
                                onClick={() => handleUpdateStatus(order.id, RentalOrderStatus.RETURNED)}
                                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                              >
                                Mark Returned
                              </Button>
                            )}

                            {order.status !== RentalOrderStatus.PLACED &&
                              order.status !== RentalOrderStatus.PAID &&
                              order.status !== RentalOrderStatus.PICKED_UP && (
                                <span className="text-xs text-slate-500 font-mono">-</span>
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
      </div>
    </PublicLayout>
  );
}

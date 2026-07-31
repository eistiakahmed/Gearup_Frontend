'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { useProviderGear, useProviderOrders } from '@/hooks/useProvider';
import { toggleProviderGearStatus, deleteProviderGear } from '@/services/provider.service';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import {
  Store,
  Plus,
  Package,
  Clock,
  CheckCircle2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ShoppingBag,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

export default function ProviderDashboardPage() {
  const { gearItems, isLoading: isGearLoading, mutate: mutateGear } = useProviderGear();
  const { orders, isLoading: isOrdersLoading } = useProviderOrders();

  const [actionError, setActionError] = useState<string | null>(null);

  // Metrics
  const totalListedGear = gearItems.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'PLACED').length;
  const incomingOrdersCount = orders.filter((o) => o.status !== 'CANCELLED').length;
  const activeRentalsCount = orders.filter(
    (o) => o.status === 'PAID' || o.status === 'PICKED_UP'
  ).length;

  const totalRevenue = orders
    .filter((o) => o.status !== 'CANCELLED')
    .reduce((acc, o) => acc + (Number(o.totalAmount) || 0), 0);



  const handleToggleStatus = async (id: string, currentAvailable: boolean) => {
    setActionError(null);
    try {
      await toggleProviderGearStatus(id, !currentAvailable);
      mutateGear();
    } catch (err: any) {
      console.error('Toggle status error:', err);
      setActionError(err?.message || 'Failed to update availability status.');
    }
  };

  const handleDeleteGear = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this equipment from your inventory?')) {
      return;
    }
    setActionError(null);
    try {
      await deleteProviderGear(id);
      mutateGear();
    } catch (err: any) {
      console.error('Delete gear error:', err);
      setActionError(err?.message || 'Failed to delete gear item.');
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/40 border border-slate-800/80 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col gap-1 z-10">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Store className="w-4 h-4" /> Provider Workspace
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
                Gear Inventory & Performance
              </h1>
              <p className="text-slate-400 text-sm max-w-xl">
                Manage your listed rental equipment, add new gear, and monitor incoming customer orders.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/dashboard/provider/orders">
                <Button variant="outline" size="md" leftIcon={<ShoppingBag className="w-4 h-4" />}>
                  Incoming Orders ({incomingOrdersCount})

                </Button>
              </Link>
              <Link href="/dashboard/provider/gear/new">
                <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
                  Add New Gear
                </Button>
              </Link>
            </div>
          </div>

          {actionError && (
            <Alert variant="error" title="Inventory Action Error" onClose={() => setActionError(null)}>
              {actionError}
            </Alert>
          )}

          {/* Metrics Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 border-slate-800/80 bg-slate-900/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Listed Equipment
                </span>
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-100 mt-2">{totalListedGear}</p>
            </Card>

            <Card className="p-5 border-slate-800/80 bg-slate-900/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Pending Orders
                </span>
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-100 mt-2">{pendingOrdersCount}</p>
            </Card>

            <Card className="p-5 border-slate-800/80 bg-slate-900/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Active Rentals
                </span>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-100 mt-2">{activeRentalsCount}</p>
            </Card>

            <Card className="p-5 border-slate-800/80 bg-slate-900/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Platform Revenue
                </span>
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-100 mt-2">${Number(totalRevenue || 0).toFixed(2)}</p>
            </Card>
          </div>

          {/* Inventory Data Table */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-400" /> Listed Inventory ({gearItems.length})
              </h2>

              <Link href="/dashboard/provider/gear/new">
                <Button variant="outline" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Add Equipment
                </Button>
              </Link>
            </div>

            <Card className="overflow-hidden border-slate-800">
              {isGearLoading ? (
                <div className="p-12 text-center text-slate-400 animate-pulse">
                  Loading provider inventory...
                </div>
              ) : gearItems.length === 0 ? (
                <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3">
                  <p>You haven&apos;t added any equipment to your rental shop yet.</p>
                  <Link href="/dashboard/provider/gear/new">
                    <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                      List Your First Gear
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-4">Equipment</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Daily Rate</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Availability</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {gearItems.map((item) => {
                        const img =
                          item.images && item.images.length > 0
                            ? item.images[0]
                            : 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=200&q=80';

                        return (
                          <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                                  <Image src={img} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-slate-100">{item.name}</span>
                                  <span className="text-xs text-amber-400 font-medium uppercase">
                                    {item.brand}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-slate-300">
                              <Badge variant="primary">{item.category?.name || 'General'}</Badge>
                            </td>
                            <td className="p-4 font-bold text-emerald-400">
                              ${Number(item.dailyRate || 0).toFixed(2)} / d
                            </td>

                            <td className="p-4 text-slate-200 font-semibold">{item.stockQuantity}</td>
                            <td className="p-4">
                              <button
                                type="button"
                                onClick={() => handleToggleStatus(item.id, item.isAvailable)}
                                className="flex items-center gap-1.5 focus:outline-none"
                              >
                                {item.isAvailable ? (
                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300">
                                    <ToggleRight className="w-6 h-6 text-emerald-400" /> Active
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-400">
                                    <ToggleLeft className="w-6 h-6 text-slate-600" /> Off-list
                                  </span>
                                )}
                              </button>
                            </td>
                            <td className="p-4 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteGear(item.id)}
                                className="text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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
      </div>
    </PublicLayout>
  );
}

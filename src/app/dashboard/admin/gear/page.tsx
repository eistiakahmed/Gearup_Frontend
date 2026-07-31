'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { useAdminGear } from '@/hooks/useAdmin';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Package, ArrowLeft, CheckCircle2, XCircle, Store } from 'lucide-react';

export default function AdminGearModerationPage() {
  const { gearItems, isLoading } = useAdminGear();

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
              <div className="flex items-center gap-2 text-amber-200 font-bold text-xs uppercase tracking-wider">
                <Package className="w-4 h-4" /> Content Moderation
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                All Platform Equipment Listings ({gearItems.length})
              </h1>
              <p className="text-emerald-100 text-sm max-w-xl">
                Inspect equipment listings uploaded across all providers to ensure quality and compliance.
              </p>
            </div>
          </div>

          {/* Data Table */}
          <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
            {isLoading ? (
              <div className="p-12 text-center text-slate-500 animate-pulse">
                Loading platform equipment listings...
              </div>
            ) : gearItems.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                No equipment listings found in the system.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4">Equipment Title</th>
                      <th className="p-4">Provider</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Daily Rate</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {gearItems.map((item) => {
                      const primaryImg =
                        item.images && item.images.length > 0
                          ? item.images[0]
                          : 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=200&q=80';

                      return (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                <Image src={primaryImg} alt={item.name} fill className="object-cover" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-900">{item.name}</span>
                                <span className="text-xs text-amber-700 font-medium uppercase">
                                  {item.brand}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-slate-700">
                            <div className="flex items-center gap-1">
                              <Store className="w-3.5 h-3.5 text-slate-500" />
                              <span>{item.provider?.name || 'Verified Provider'}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="primary">{item.category?.name || 'General'}</Badge>
                          </td>
                          <td className="p-4 font-bold text-emerald-700">${Number(item.dailyRate || 0).toFixed(2)} / d</td>

                          <td className="p-4 text-slate-900 font-semibold">{item.stockQuantity}</td>
                          <td className="p-4">
                            {item.isAvailable ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Listed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
                                <XCircle className="w-3.5 h-3.5" /> Unlisted
                              </span>
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

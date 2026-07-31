'use client';

import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { useAdminStats } from '@/hooks/useAdmin';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  ShieldCheck,
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Activity,
  AlertTriangle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { stats, isLoading } = useAdminStats();

  const totalUsers = stats?.users?.total || 0;
  const totalGear = stats?.gear?.total || 0;
  const totalRentals = stats?.orders?.total || 0;
  const totalRevenue = stats?.revenue?.total || 0;
  const activeUsers = stats?.users?.active || 0;
  const totalProviders = stats?.users?.providers || 0;
  const totalCustomers = stats?.users?.customers || 0;
  const completedPayments = stats?.payments?.completed || 0;


  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col gap-1 z-10">
              <div className="flex items-center gap-2 text-cyan-200 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Admin Moderation Workspace
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Platform Health & Moderation Overview
              </h1>
              <p className="text-emerald-100 text-sm max-w-xl">
                Oversee platform users, manage roles and suspensions, inspect gear listings, and monitor rental orders.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/dashboard/admin/users">
                <Button variant="primary" size="md" leftIcon={<Users className="w-4 h-4" />}>
                  Manage Platform Users
                </Button>
              </Link>
            </div>
          </div>

          {/* System Metrics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Platform Users
                </span>
                <div className="p-2 rounded-lg bg-cyan-100 text-cyan-700">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">
                {isLoading ? '...' : totalUsers}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {totalProviders} providers · {totalCustomers} customers · {activeUsers} active
              </p>
            </Card>

            <Card className="p-5 border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Equipment Listings
                </span>
                <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">
                {isLoading ? '...' : totalGear}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {stats?.gear?.available || 0} available · {stats?.gear?.unavailable || 0} unavailable
              </p>
            </Card>

            <Card className="p-5 border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Rental Orders
                </span>
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">
                {isLoading ? '...' : totalRentals}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {completedPayments} payments completed
              </p>
            </Card>

            <Card className="p-5 border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Gross Revenue
                </span>
                <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">
                {isLoading ? '...' : `$${Number(totalRevenue || 0).toFixed(2)}`}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                From {completedPayments} completed payments
              </p>
            </Card>
          </div>

          {/* Quick Navigation & Moderation Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col justify-between gap-4 group hover:border-emerald-500 transition-all">
              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-2xl bg-cyan-100 text-cyan-700 w-fit">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">User Moderation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Search all platform accounts, filter by role (Customer, Provider, Admin), and suspend or activate users.
                </p>
              </div>
              <Link href="/dashboard/admin/users">
                <Button variant="outline" size="sm" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Manage Users
                </Button>
              </Link>
            </Card>

            <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col justify-between gap-4 group hover:border-emerald-500 transition-all">
              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-2xl bg-amber-100 text-amber-700 w-fit">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Equipment Catalog Moderation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Inspect all sports equipment uploaded across providers, monitor daily rates, stock levels, and flags.
                </p>
              </div>
              <Link href="/dashboard/admin/gear">
                <Button variant="outline" size="sm" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Moderate Equipment
                </Button>
              </Link>
            </Card>

            <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col justify-between gap-4 group hover:border-emerald-500 transition-all">
              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-700 w-fit">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Rental Orders Monitoring</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Monitor all customer rental orders, track payment statuses, pickup dates, and order disputes.
                </p>
              </div>
              <Link href="/dashboard/admin/orders">
                <Button variant="outline" size="sm" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Monitor Orders
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

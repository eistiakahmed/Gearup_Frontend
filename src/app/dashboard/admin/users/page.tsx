'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/common/PublicLayout';
import { useAdminUsers, useUpdateUserStatus } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { AdminUserFilters } from '@/types/admin';
import { UserRole } from '@/types/auth';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import {
  Users,
  Search,
  ArrowLeft,
  ShieldCheck,
  UserCheck,
  UserX,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';

export default function UserManagementPage() {
  const { user: currentUser } = useAuth();
  const [filters, setFilters] = useState<AdminUserFilters>({});

  const { users, isLoading, mutate: mutateUsers } = useAdminUsers(filters);
  const { updateStatus, isUpdatingUserStatus } = useUpdateUserStatus();

  const [actionError, setActionError] = useState<string | null>(null);

  const handleToggleUserStatus = async (userId: string, currentActive: boolean) => {
    setActionError(null);
    try {
      const response = await updateStatus({ userId, isActive: !currentActive });
      if (response && response.success) {
        mutateUsers();
      }
    } catch (err: any) {
      console.error('Toggle user status error:', err);
      setActionError(
        err?.message || err?.data?.message || 'Failed to update user status. Please try again.'
      );
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'primary';
      case UserRole.PROVIDER:
        return 'confirmed';
      case UserRole.CUSTOMER:
      default:
        return 'paid';
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
              <div className="flex items-center gap-2 text-cyan-200 font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4" /> User Account Moderation
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Platform User Management ({users.length})
              </h1>
              <p className="text-emerald-100 text-sm max-w-xl">
                Filter platform members by role, inspect contact details, and suspend or restore user account access.
              </p>
            </div>
          </div>

          {actionError && (
            <Alert variant="error" title="Action Error" onClose={() => setActionError(null)}>
              {actionError}
            </Alert>
          )}

          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="sm:col-span-2">
              <Input
                placeholder="Search user by name or email..."
                leftIcon={<Search className="w-4 h-4 text-emerald-600" />}
                value={filters.search || ''}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              />
            </div>

            <div>
              <select
                value={filters.role || ''}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    role: e.target.value ? (e.target.value as UserRole) : undefined,
                  }))
                }
                className="w-full bg-white text-slate-900 text-sm rounded-xl border border-slate-300 p-2.5 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
              >
                <option value="">All Roles (Customers, Providers, Admins)</option>
                <option value={UserRole.CUSTOMER}>Customers Only</option>
                <option value={UserRole.PROVIDER}>Providers Only</option>
                <option value={UserRole.ADMIN}>Admins Only</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
            {isLoading ? (
              <div className="p-12 text-center text-slate-500 animate-pulse">
                Loading platform users...
              </div>
            ) : users.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                No users found matching your active search or filter.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4">User Details</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Joined Date</th>
                      <th className="p-4">Account Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{u.name}</span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Mail className="w-3 h-3 text-emerald-600" /> {u.email}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant={getRoleBadgeVariant(u.role)}>{u.role}</Badge>
                        </td>
                        <td className="p-4 text-slate-700">
                          {u.phoneNumber ? (
                            <span className="flex items-center gap-1 text-xs">
                              <Phone className="w-3 h-3 text-slate-500" /> {u.phoneNumber}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs">N/A</span>
                          )}
                        </td>
                        <td className="p-4 text-slate-500 text-xs">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          {u.isActive !== false ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <UserCheck className="w-3.5 h-3.5" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                              <UserX className="w-3.5 h-3.5" /> Suspended
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {currentUser?.id === u.id ? (
                            <span className="text-xs text-slate-400 italic">Cannot suspend yourself</span>
                          ) : (
                            <Button
                              variant={u.isActive !== false ? 'secondary' : 'primary'}
                              size="sm"
                              isLoading={isUpdatingUserStatus}
                              onClick={() => handleToggleUserStatus(u.id, u.isActive !== false)}
                            >
                              {u.isActive !== false ? 'Suspend User' : 'Activate Account'}
                            </Button>
                          )}
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
    </PublicLayout>
  );
}

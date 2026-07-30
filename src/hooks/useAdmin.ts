'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  fetchAdminDashboardStats,
  fetchAdminUsers,
  fetchAdminGear,
  fetchAdminRentals,
  updateUserStatus,
} from '@/services/admin.service';
import { AdminUserFilters, AdminUserRecord, AdminDashboardStats } from '@/types/admin';
import { GearItem } from '@/types/gear';
import { RentalOrder } from '@/types/rental';
import { ApiResponse } from '@/types/auth';

/**
 * Hook to fetch admin platform dashboard statistics
 */
export function useAdminStats() {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<AdminDashboardStats>>(
    '/admin/dashboard',
    fetchAdminDashboardStats,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    stats: data?.data || null,
    error,
    isLoading,
    mutate,
  };
}

/**
 * Hook to fetch all users with filtering
 */
export function useAdminUsers(filters: AdminUserFilters = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    ['/admin/users', filters],
    () => fetchAdminUsers(filters),
    {
      revalidateOnFocus: false,
    }
  );

  let users: AdminUserRecord[] = [];
  if (data?.data) {
    if (Array.isArray(data.data)) {
      users = data.data;
    } else if ((data.data as any).items) {
      users = (data.data as any).items;
    }
  }

  return {
    users,
    rawResponse: data,
    error,
    isLoading,
    mutate,
  };
}

/**
 * Hook to fetch all platform gear listings for admin moderation
 */
export function useAdminGear() {
  const { data, error, isLoading, mutate } = useSWR('/admin/gear', fetchAdminGear, {
    revalidateOnFocus: false,
  });

  let gearItems: GearItem[] = [];
  if (data?.data) {
    if (Array.isArray(data.data)) {
      gearItems = data.data;
    } else if ((data.data as any).items) {
      gearItems = (data.data as any).items;
    }
  }

  return {
    gearItems,
    rawResponse: data,
    error,
    isLoading,
    mutate,
  };
}

/**
 * Hook to fetch all platform rental orders for admin moderation
 */
export function useAdminRentals() {
  const { data, error, isLoading, mutate } = useSWR('/admin/rentals', fetchAdminRentals, {
    revalidateOnFocus: false,
  });

  let orders: RentalOrder[] = [];
  if (data?.data) {
    if (Array.isArray(data.data)) {
      orders = data.data;
    } else if ((data.data as any).items) {
      orders = (data.data as any).items;
    }
  }

  return {
    orders,
    rawResponse: data,
    error,
    isLoading,
    mutate,
  };
}

/**
 * Mutation hook to suspend or activate a user account
 */
export function useUpdateUserStatus() {
  const { trigger: updateUserStatusTrigger, isMutating: isUpdatingUserStatus } = useSWRMutation(
    '/admin/users/status',
    async (_url: string, { arg }: { arg: { userId: string; isActive: boolean } }) => {
      return updateUserStatus(arg.userId, arg.isActive);
    }
  );

  return {
    updateStatus: updateUserStatusTrigger,
    isUpdatingUserStatus,
  };
}

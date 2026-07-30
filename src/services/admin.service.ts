import { apiClient } from '@/lib/api-client';
import { AdminDashboardStats, AdminUserRecord, AdminUserFilters } from '@/types/admin';
import { GearItem } from '@/types/gear';
import { RentalOrder } from '@/types/rental';
import { ApiResponse } from '@/types/auth';

/**
 * Fetch platform admin dashboard stats (GET /api/admin/dashboard)
 */
export async function fetchAdminDashboardStats(): Promise<ApiResponse<AdminDashboardStats>> {
  return apiClient<ApiResponse<AdminDashboardStats>>('/admin/dashboard', {
    method: 'GET',
  });
}

/**
 * Fetch all platform users with search and role filters (GET /api/admin/users)
 */
export async function fetchAdminUsers(
  filters: AdminUserFilters = {}
): Promise<ApiResponse<{ items: AdminUserRecord[]; meta?: any } | AdminUserRecord[]>> {
  const queryParams = new URLSearchParams();
  if (filters.search?.trim()) queryParams.set('search', filters.search.trim());
  if (filters.role) queryParams.set('role', filters.role);
  if (filters.page) queryParams.set('page', filters.page.toString());
  if (filters.limit) queryParams.set('limit', filters.limit.toString());

  const queryString = queryParams.toString();
  const endpoint = `/admin/users${queryString ? `?${queryString}` : ''}`;

  return apiClient(endpoint, {
    method: 'GET',
  });
}

/**
 * Update user status (activate/suspend) (PATCH /api/admin/users/:id/status or /api/admin/users/:id)
 */
export async function updateUserStatus(
  userId: string,
  isActive: boolean
): Promise<ApiResponse<AdminUserRecord>> {
  return apiClient<ApiResponse<AdminUserRecord>>(`/admin/users/${userId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  });
}

/**
 * Fetch all platform gear listings (GET /api/admin/gear)
 */
export async function fetchAdminGear(): Promise<
  ApiResponse<{ items: GearItem[]; meta?: any } | GearItem[]>
> {
  return apiClient('/admin/gear', {
    method: 'GET',
  });
}

/**
 * Fetch all platform rental orders (GET /api/admin/rentals)
 */
export async function fetchAdminRentals(): Promise<
  ApiResponse<{ items: RentalOrder[]; meta?: any } | RentalOrder[]>
> {
  return apiClient('/admin/rentals', {
    method: 'GET',
  });
}

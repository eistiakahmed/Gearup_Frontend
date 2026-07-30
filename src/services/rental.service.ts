import { apiClient } from '@/lib/api-client';
import {
  CreateRentalPayload,
  RentalOrder,
  RentalQueryFilters,
  UpdateOrderStatusPayload,
} from '@/types/rental';
import { ApiResponse } from '@/types/auth';

/**
 * Place a new rental order (POST /api/rentals)
 */
export async function createRentalOrder(
  payload: CreateRentalPayload
): Promise<ApiResponse<RentalOrder>> {
  return apiClient<ApiResponse<RentalOrder>>('/rentals', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Fetch rental orders for the authenticated customer (GET /api/rentals)
 */
export async function fetchCustomerRentals(
  filters: RentalQueryFilters = {}
): Promise<ApiResponse<{ items: RentalOrder[]; meta?: any } | RentalOrder[]>> {
  const queryParams = new URLSearchParams();
  if (filters.status) queryParams.set('status', filters.status);
  if (filters.page) queryParams.set('page', filters.page.toString());
  if (filters.limit) queryParams.set('limit', filters.limit.toString());
  if (filters.sortBy) queryParams.set('sortBy', filters.sortBy);
  if (filters.sortOrder) queryParams.set('sortOrder', filters.sortOrder);

  const queryString = queryParams.toString();
  const endpoint = `/rentals${queryString ? `?${queryString}` : ''}`;

  return apiClient(endpoint, {
    method: 'GET',
  });
}

/**
 * Fetch incoming orders for provider (GET /api/provider/orders)
 */
export async function fetchProviderOrders(
  filters: RentalQueryFilters = {}
): Promise<ApiResponse<{ items: RentalOrder[]; meta?: any } | RentalOrder[]>> {
  const queryParams = new URLSearchParams();
  if (filters.status) queryParams.set('status', filters.status);
  if (filters.page) queryParams.set('page', filters.page.toString());
  if (filters.limit) queryParams.set('limit', filters.limit.toString());

  const queryString = queryParams.toString();
  const endpoint = `/provider/orders${queryString ? `?${queryString}` : ''}`;

  return apiClient(endpoint, {
    method: 'GET',
  });
}

/**
 * Update rental order status (PATCH /api/provider/orders/:id or /api/rentals/:id/status)
 */
export async function updateOrderStatus(
  orderId: string,
  payload: UpdateOrderStatusPayload
): Promise<ApiResponse<RentalOrder>> {
  return apiClient<ApiResponse<RentalOrder>>(`/provider/orders/${orderId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

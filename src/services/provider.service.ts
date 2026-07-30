import { apiClient } from '@/lib/api-client';
import { GearItem } from '@/types/gear';
import { RentalOrder, RentalOrderStatus } from '@/types/rental';
import { ApiResponse } from '@/types/auth';

export interface CreateGearPayload {
  name: string;
  description: string;
  brand: string;
  model?: string;
  categoryId: string;
  dailyRate: number;
  weeklyRate?: number;
  monthlyRate?: number;
  depositAmount?: number;
  images: string[];
  stockQuantity: number;
  location?: string;
  isAvailable?: boolean;
}

/**
 * Fetch provider's listed gear (GET /api/provider/gear)
 */
export async function fetchProviderGear(): Promise<
  ApiResponse<{ items: GearItem[]; meta?: any } | GearItem[]>
> {
  return apiClient('/provider/gear', {
    method: 'GET',
  });
}

/**
 * Add new gear to inventory (POST /api/provider/gear)
 */
export async function createProviderGear(
  payload: CreateGearPayload
): Promise<ApiResponse<GearItem>> {
  return apiClient<ApiResponse<GearItem>>('/provider/gear', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Update gear item (PUT /api/provider/gear/:id)
 */
export async function updateProviderGear(
  id: string,
  payload: Partial<CreateGearPayload>
): Promise<ApiResponse<GearItem>> {
  return apiClient<ApiResponse<GearItem>>(`/provider/gear/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

/**
 * Delete gear item from inventory (DELETE /api/provider/gear/:id)
 */
export async function deleteProviderGear(id: string): Promise<ApiResponse<null>> {
  return apiClient<ApiResponse<null>>(`/provider/gear/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Toggle gear availability status (PATCH /api/provider/gear/:id/status)
 */
export async function toggleProviderGearStatus(
  id: string,
  isAvailable: boolean
): Promise<ApiResponse<GearItem>> {
  return apiClient<ApiResponse<GearItem>>(`/provider/gear/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isAvailable }),
  });
}

/**
 * Fetch provider's incoming orders (GET /api/provider/orders)
 */
export async function fetchProviderOrders(): Promise<
  ApiResponse<{ items: RentalOrder[]; meta?: any } | RentalOrder[]>
> {
  return apiClient('/provider/orders', {
    method: 'GET',
  });
}

/**
 * Update rental order status (PATCH /api/provider/orders/:id)
 */
export async function updateProviderOrderStatus(
  orderId: string,
  status: RentalOrderStatus,
  notes?: string
): Promise<ApiResponse<RentalOrder>> {
  return apiClient<ApiResponse<RentalOrder>>(`/provider/orders/${orderId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, ...(notes ? { notes } : {}) }),
  });
}

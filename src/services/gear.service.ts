import { apiClient } from '@/lib/api-client';
import {
  GearItem,
  GearCategory,
  GearQueryFilters,
  GearPaginatedResponse,
} from '@/types/gear';
import { ApiResponse } from '@/types/auth';

/**
 * Fetch list of gear items with query filters
 */
export async function fetchGearCatalog(
  filters: GearQueryFilters = {}
): Promise<ApiResponse<GearPaginatedResponse | GearItem[]>> {
  const queryParams = new URLSearchParams();

  if (filters.search?.trim()) queryParams.set('search', filters.search.trim());
  if (filters.category) queryParams.set('category', filters.category);
  if (filters.minPrice !== undefined && filters.minPrice > 0)
    queryParams.set('minPrice', filters.minPrice.toString());
  if (filters.maxPrice !== undefined && filters.maxPrice > 0)
    queryParams.set('maxPrice', filters.maxPrice.toString());
  if (filters.brand?.trim()) queryParams.set('brand', filters.brand.trim());
  if (filters.isAvailable !== undefined)
    queryParams.set('isAvailable', filters.isAvailable.toString());
  if (filters.sortBy) queryParams.set('sortBy', filters.sortBy);
  if (filters.sortOrder) queryParams.set('sortOrder', filters.sortOrder);
  if (filters.page) queryParams.set('page', filters.page.toString());
  if (filters.limit) queryParams.set('limit', filters.limit.toString());

  const queryString = queryParams.toString();
  const endpoint = `/gear${queryString ? `?${queryString}` : ''}`;

  return apiClient<ApiResponse<GearPaginatedResponse | GearItem[]>>(endpoint, {
    method: 'GET',
  });
}

/**
 * Fetch all gear categories
 */
export async function fetchCategories(): Promise<ApiResponse<GearCategory[]>> {
  return apiClient<ApiResponse<GearCategory[]>>('/categories/all', {
    method: 'GET',
  });
}

/**
 * Fetch a single gear item by ID
 */
export async function fetchGearById(id: string): Promise<ApiResponse<GearItem>> {
  return apiClient<ApiResponse<GearItem>>(`/gear/${id}`, {
    method: 'GET',
  });
}

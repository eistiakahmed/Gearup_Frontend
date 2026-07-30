'use client';

import useSWR from 'swr';
import {
  fetchGearCatalog,
  fetchCategories,
  fetchGearById,
} from '@/services/gear.service';
import {
  GearQueryFilters,
  GearPaginatedResponse,
  GearItem,
  GearCategory,
} from '@/types/gear';
import { ApiResponse } from '@/types/auth';

/**
 * Hook to fetch gear catalog with reactive SWR caching and filtering
 */
export function useGearCatalog(filters: GearQueryFilters = {}) {
  // Construct SWR key based on filters object
  const swrKey = ['/gear', filters];

  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<GearPaginatedResponse | GearItem[]>
  >(swrKey, () => fetchGearCatalog(filters), {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  // Normalize items array whether backend returns paginated object or flat array
  let items: GearItem[] = [];
  let meta = { total: 0, page: 1, limit: 12, totalPages: 1 };

  if (data?.data) {
    if (Array.isArray(data.data)) {
      items = data.data;
      meta.total = items.length;
    } else if (data.data.items) {
      items = data.data.items;
      meta = data.data.meta;
    }
  }

  return {
    items,
    meta,
    rawResponse: data,
    error,
    isLoading,
    mutate,
  };
}

/**
 * Hook to fetch all categories
 */
export function useCategories() {
  const { data, error, isLoading } = useSWR<ApiResponse<GearCategory[]>>(
    '/categories/all',
    fetchCategories,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    categories: data?.data || [],
    error,
    isLoading,
  };
}

/**
 * Hook to fetch single gear item details
 */
export function useGearDetails(id: string) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<GearItem>>(
    id ? `/gear/${id}` : null,
    () => fetchGearById(id),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    gear: data?.data || null,
    error,
    isLoading,
    mutate,
  };
}

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
    const rawData = data.data as any;
    const rawMeta = (data as any).meta || (data as any).pagination || (rawData as any).pagination || (rawData as any).meta || {};

    if (Array.isArray(rawData)) {
      items = rawData;
    } else if (rawData.gearItems || rawData.items) {
      items = rawData.gearItems || rawData.items || [];
    }

    const totalCount = rawMeta.total !== undefined ? Number(rawMeta.total) : items.length;
    const limitVal = Number(rawMeta.limit || filters.limit || 12);
    const pageVal = Number(rawMeta.page || filters.page || 1);
    const calculatedPages = Math.ceil(totalCount / limitVal);

    meta = {
      page: pageVal,
      limit: limitVal,
      total: totalCount,
      totalPages: Number(rawMeta.totalPages) || (calculatedPages > 0 ? calculatedPages : 1),
    };
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

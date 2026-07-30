'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  createRentalOrder,
  fetchCustomerRentals,
  fetchProviderOrders,
  updateOrderStatus,
} from '@/services/rental.service';
import {
  CreateRentalPayload,
  RentalOrder,
  RentalQueryFilters,
  UpdateOrderStatusPayload,
} from '@/types/rental';
import { ApiResponse } from '@/types/auth';

/**
 * Custom hook for rental order placement mutation
 */
export function useRentals() {
  const { trigger: createOrderTrigger, isMutating: isCreatingOrder } = useSWRMutation(
    '/rentals',
    async (_url: string, { arg }: { arg: CreateRentalPayload }) => {
      return createRentalOrder(arg);
    }
  );

  return {
    createOrder: createOrderTrigger,
    isCreatingOrder,
  };
}

/**
 * Hook to fetch customer's rental orders with SWR
 */
export function useCustomerRentals(filters: RentalQueryFilters = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    ['/rentals', filters],
    () => fetchCustomerRentals(filters),
    {
      revalidateOnFocus: false,
    }
  );

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
 * Hook to fetch provider's incoming orders with SWR
 */
export function useProviderOrders(filters: RentalQueryFilters = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    ['/provider/orders', filters],
    () => fetchProviderOrders(filters),
    {
      revalidateOnFocus: false,
    }
  );

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

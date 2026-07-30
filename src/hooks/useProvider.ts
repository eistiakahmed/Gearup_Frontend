'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  fetchProviderGear,
  fetchProviderOrders,
  createProviderGear,
  deleteProviderGear,
  toggleProviderGearStatus,
  updateProviderOrderStatus,
  CreateGearPayload,
} from '@/services/provider.service';
import { GearItem } from '@/types/gear';
import { RentalOrder, RentalOrderStatus } from '@/types/rental';

/**
 * Hook to fetch provider gear inventory with SWR
 */
export function useProviderGear() {
  const { data, error, isLoading, mutate } = useSWR(
    '/provider/gear',
    fetchProviderGear,
    {
      revalidateOnFocus: false,
    }
  );

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
 * Hook to fetch provider incoming orders with SWR
 */
export function useProviderOrders() {
  const { data, error, isLoading, mutate } = useSWR(
    '/provider/orders',
    fetchProviderOrders,
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
 * Mutation hook to create new gear item
 */
export function useCreateGear() {
  const { trigger: createGearTrigger, isMutating: isCreatingGear } = useSWRMutation(
    '/provider/gear',
    async (_url: string, { arg }: { arg: CreateGearPayload }) => {
      return createProviderGear(arg);
    }
  );

  return {
    createGear: createGearTrigger,
    isCreatingGear,
  };
}

/**
 * Mutation hook to update order status
 */
export function useUpdateOrderStatus() {
  const { trigger: updateStatusTrigger, isMutating: isUpdatingStatus } = useSWRMutation(
    '/provider/orders/update-status',
    async (_url: string, { arg }: { arg: { orderId: string; status: RentalOrderStatus; notes?: string } }) => {
      return updateProviderOrderStatus(arg.orderId, arg.status, arg.notes);
    }
  );

  return {
    updateStatus: updateStatusTrigger,
    isUpdatingStatus,
  };
}

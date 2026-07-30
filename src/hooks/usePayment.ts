'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  createPaymentSession,
  fetchUserPayments,
  fetchPaymentById,
} from '@/services/payment.service';
import { CreatePaymentPayload, PaymentRecord } from '@/types/payment';

/**
 * Hook for initiating payment session mutation
 */
export function usePayment() {
  const { trigger: initiatePaymentTrigger, isMutating: isInitiatingPayment } =
    useSWRMutation(
      '/payments/create',
      async (_url: string, { arg }: { arg: CreatePaymentPayload }) => {
        return createPaymentSession(arg);
      }
    );

  return {
    initiatePayment: initiatePaymentTrigger,
    isInitiatingPayment,
  };
}

/**
 * Hook to fetch user payment history
 */
export function usePaymentHistory() {
  const { data, error, isLoading, mutate } = useSWR(
    '/payments',
    fetchUserPayments,
    {
      revalidateOnFocus: false,
    }
  );

  let payments: PaymentRecord[] = [];
  if (data?.data) {
    if (Array.isArray(data.data)) {
      payments = data.data;
    } else if ((data.data as any).items) {
      payments = (data.data as any).items;
    }
  }

  return {
    payments,
    rawResponse: data,
    error,
    isLoading,
    mutate,
  };
}

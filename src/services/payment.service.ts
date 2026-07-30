import { apiClient } from '@/lib/api-client';
import {
  CreatePaymentPayload,
  PaymentResponseData,
  PaymentRecord,
} from '@/types/payment';
import { ApiResponse } from '@/types/auth';

/**
 * Initiate payment checkout session (POST /api/payments/create)
 */
export async function createPaymentSession(
  payload: CreatePaymentPayload
): Promise<ApiResponse<PaymentResponseData>> {
  return apiClient<ApiResponse<PaymentResponseData>>('/payments/create', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Fetch authenticated customer payment history (GET /api/payments)
 */
export async function fetchUserPayments(): Promise<
  ApiResponse<{ items: PaymentRecord[]; meta?: any } | PaymentRecord[]>
> {
  return apiClient('/payments', {
    method: 'GET',
  });
}

/**
 * Fetch payment by ID (GET /api/payments/:id)
 */
export async function fetchPaymentById(
  paymentId: string
): Promise<ApiResponse<PaymentRecord>> {
  return apiClient<ApiResponse<PaymentRecord>>(`/payments/${paymentId}`, {
    method: 'GET',
  });
}

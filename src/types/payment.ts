export enum PaymentMethod {
  STRIPE = 'STRIPE',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface CreatePaymentPayload {
  orderId: string;
  method: PaymentMethod | string;
  currency?: string;
  successUrl?: string;
  cancelUrl?: string;
  failUrl?: string;
}

export interface PaymentResponseData {
  paymentId: string;
  checkoutUrl?: string;
  clientSecret?: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  customerId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string | null;
  createdAt: string;
  updatedAt: string;
}

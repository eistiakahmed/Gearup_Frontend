import { GearItem } from './gear';
import { User } from './auth';

export enum RentalOrderStatus {
  PLACED = 'PLACED',
  CONFIRMED = 'CONFIRMED',
  PAID = 'PAID',
  PICKED_UP = 'PICKED_UP',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED',
}

export interface RentalItemInput {
  gearId: string;
  quantity: number;
}

export interface CreateRentalPayload {
  items: RentalItemInput[];
  startDate: string; // ISO 8601 string
  endDate: string; // ISO 8601 string
  pickupAddress?: string;
  returnAddress?: string;
  notes?: string;
}

export interface RentalOrderItem {
  id: string;
  rentalId: string;
  gearId: string;
  gear?: GearItem;
  quantity: number;
  dailyRate: number;
  totalPrice: number;
}

export interface RentalOrder {
  id: string;
  customerId: string;
  customer?: User;
  providerId: string;
  provider?: User;
  items: RentalOrderItem[];
  status: RentalOrderStatus;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
  pickupAddress?: string | null;
  returnAddress?: string | null;
  notes?: string | null;
  paymentId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RentalQueryFilters {
  status?: RentalOrderStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'startDate' | 'totalAmount' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface UpdateOrderStatusPayload {
  status: RentalOrderStatus;
  notes?: string;
}

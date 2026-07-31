import { UserRole } from './auth';

export interface AdminDashboardStats {
  users: {
    total: number;
    providers: number;
    customers: number;
    active: number;
  };
  gear: {
    total: number;
    available: number;
    unavailable: number;
  };
  orders: {
    total: number;
    byStatus: Record<string, number>;
  };
  payments: {
    total: number;
    completed: number;
    pending: number;
  };
  revenue: {
    total: number;
  };
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string | null;
  address?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserFilters {
  search?: string;
  role?: UserRole;
  page?: number;
  limit?: number;
}

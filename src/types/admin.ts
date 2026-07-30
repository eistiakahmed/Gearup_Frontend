import { UserRole } from './auth';

export interface AdminDashboardStats {
  totalUsers: number;
  totalGear: number;
  totalRentals: number;
  totalRevenue: number;
  usersByRole?: {
    CUSTOMER: number;
    PROVIDER: number;
    ADMIN: number;
  };
  ordersByStatus?: Record<string, number>;
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

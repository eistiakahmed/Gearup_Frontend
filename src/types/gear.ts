export interface GearCategory {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    gearItems: number;
  };
}

export interface GearProviderInfo {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
}

export interface GearItem {
  id: string;
  name: string;
  description: string;
  brand: string;
  model?: string | null;
  serialNumber?: string | null;
  categoryId: string;
  category?: GearCategory;
  providerId: string;
  provider?: GearProviderInfo;
  dailyRate: number;
  weeklyRate?: number | null;
  monthlyRate?: number | null;
  depositAmount?: number | null;
  specifications?: Record<string, any> | null;
  images: string[];
  isAvailable: boolean;
  stockQuantity: number;
  currentStock?: number;
  location?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GearQueryFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  isAvailable?: boolean;
  sortBy?: 'price' | 'name' | 'createdAt' | 'popularity' | 'dailyRate';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface GearPaginatedResponse {
  items: GearItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

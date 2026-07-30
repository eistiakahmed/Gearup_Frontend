export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phoneNumber?: string | null;
  address?: string | null;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequestPayload {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | Array<{ field?: string; message: string }>;
}

export interface AuthSuccessData {
  user: User;
  tokens?: {
    accessToken: string;
  };
}

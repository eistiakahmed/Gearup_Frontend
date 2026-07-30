import { apiClient } from '@/lib/api-client';
import {
  RegisterRequestPayload,
  LoginRequestPayload,
  ApiResponse,
  AuthSuccessData,
  User,
} from '@/types/auth';

/**
 * Register a new user (Customer, Provider, or Admin)
 */
export async function registerUser(
  payload: RegisterRequestPayload
): Promise<ApiResponse<AuthSuccessData>> {
  return apiClient<ApiResponse<AuthSuccessData>>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Authenticate user with credentials
 */
export async function loginUser(
  payload: LoginRequestPayload
): Promise<ApiResponse<AuthSuccessData>> {
  return apiClient<ApiResponse<AuthSuccessData>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Fetch profile of authenticated user
 */
export async function fetchCurrentUser(): Promise<ApiResponse<User>> {
  return apiClient<ApiResponse<User>>('/auth/me', {
    method: 'GET',
  });
}

/**
 * Logout authenticated user and clear cookie
 */
export async function logoutUser(): Promise<ApiResponse<null>> {
  return apiClient<ApiResponse<null>>('/auth/logout', {
    method: 'POST',
  });
}

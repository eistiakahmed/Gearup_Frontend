import { ApiResponse } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Custom fetch client that includes credentials (cookies) by default
 * and handles JSON parsing and error wrapping.
 */
export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Bearer Token fallback for cross-site cookie restrictions
  if (typeof window !== 'undefined') {
    const savedToken = localStorage.getItem('token') || localStorage.getItem('accessToken');
    if (savedToken && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${savedToken}`;
    }
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Ensure HTTP-only cookies are sent/received
  };

  const response = await fetch(url, config);
  let data: any;

  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    const errorMessage =
      data?.message || data?.error || `HTTP Error ${response.status}: ${response.statusText}`;
    throw new ApiError(errorMessage, response.status, data);
  }

  return data as T;
}

/**
 * Standard fetcher for SWR
 */
export const defaultFetcher = <T = any>(url: string): Promise<T> => apiClient<T>(url);

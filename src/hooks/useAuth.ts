'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import {

  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
} from '@/services/auth.service';
import {
  RegisterRequestPayload,
  LoginRequestPayload,
  User,
  ApiResponse,
} from '@/types/auth';

/**
 * Custom authentication hook with SWR integration
 */
export function useAuth() {
  const router = useRouter();

  // Client-side fetch current user profile via SWR
  const {
    data: currentUserResponse,
    error: userError,
    isLoading: isUserLoading,
    mutate: mutateUser,
  } = useSWR<ApiResponse<User>>('/auth/me', fetchCurrentUser, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  const user = currentUserResponse?.data || null;

  // SWR Mutation for Registration
  const { trigger: registerTrigger, isMutating: isRegistering } = useSWRMutation(
    '/auth/register',
    async (_url: string, { arg }: { arg: RegisterRequestPayload }) => {
      const response = await registerUser(arg);
      const token = (response.data as any)?.token || (response as any)?.token;
      if (token && typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        document.cookie = `accessToken=${token}; path=/; max-age=604800; SameSite=Lax`;
      }
      // Revalidate user state after registration
      await mutateUser();
      return response;
    }
  );

  // SWR Mutation for Login
  const { trigger: loginTrigger, isMutating: isLoggingIn } = useSWRMutation(
    '/auth/login',
    async (_url: string, { arg }: { arg: LoginRequestPayload }) => {
      const response = await loginUser(arg);
      const token = (response.data as any)?.token || (response as any)?.token;
      if (token && typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        document.cookie = `accessToken=${token}; path=/; max-age=604800; SameSite=Lax`;
      }
      await mutateUser();
      return response;
    }
  );

  // Logout action — clears state instantly then calls API in background
  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    // 1. Immediately clear user state → UI updates instantly
    await mutateUser(undefined, false);
    // 2. Redirect to login right away (no waiting for API)
    router.push('/login');
    // 3. Call API in background to clear server cookie
    logoutUser().catch((err) => console.error('Logout API error:', err));
  };


  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading: isUserLoading,
    userError,
    register: registerTrigger,
    isRegistering,
    login: loginTrigger,
    isLoggingIn,
    logout,
    mutateUser,
  };
}

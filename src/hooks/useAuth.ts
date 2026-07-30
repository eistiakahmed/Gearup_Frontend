'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
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
      await mutateUser();
      return response;
    }
  );

  // Logout action
  const logout = async () => {
    try {
      await logoutUser();
      await mutateUser(undefined, false);
    } catch (err) {
      console.error('Logout error:', err);
    }
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

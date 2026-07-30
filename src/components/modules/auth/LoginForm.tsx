'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LoginRequestPayload, UserRole } from '@/types/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const { login, isLoggingIn } = useAuth();

  const [formData, setFormData] = useState<LoginRequestPayload>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (apiError) setApiError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;

    try {
      const response = await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response && response.success) {
        setSuccessMessage('Login successful! Redirecting to dashboard...');

        const loggedUser = response.data?.user;
        const role = loggedUser?.role;

        setTimeout(() => {
          if (role === UserRole.PROVIDER) {
            router.push('/dashboard/provider');
          } else if (role === UserRole.ADMIN) {
            router.push('/dashboard/admin');
          } else {
            router.push('/dashboard/customer');
          }
        }, 1000);
      }
    } catch (err: any) {
      console.error('Login submit error:', err);
      let errorMessage = 'Login failed. Please check your credentials and try again.';

      const rawError = err?.data?.error || err?.message;
      if (rawError) {
        if (typeof rawError === 'string' && rawError.startsWith('[')) {
          try {
            const parsed = JSON.parse(rawError);
            if (Array.isArray(parsed) && parsed.length > 0) {
              errorMessage = parsed.map((item: any) => item.message || item.field).join('. ');
            }
          } catch {
            errorMessage = rawError;
          }
        } else if (typeof rawError === 'string') {
          errorMessage = rawError;
        }
      } else if (err?.data?.message) {
        errorMessage = err.data.message;
      }

      setApiError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      {apiError && (
        <Alert variant="error" title="Authentication Error" onClose={() => setApiError(null)}>
          {apiError}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" title="Welcome Back!">
          {successMessage}
        </Alert>
      )}

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="name@example.com"
        required
        leftIcon={<Mail className="w-4 h-4" />}
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        required
        leftIcon={<Lock className="w-4 h-4" />}
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoggingIn}
        rightIcon={<ArrowRight className="w-5 h-5" />}
        className="mt-2"
      >
        Sign In to GearUp
      </Button>

      <div className="text-center text-sm text-slate-400 mt-2">
        Don&apos;t have an account yet?{' '}
        <Link
          href="/auth/register"
          className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4"
        >
          Create an account here
        </Link>
      </div>
    </form>
  );
}

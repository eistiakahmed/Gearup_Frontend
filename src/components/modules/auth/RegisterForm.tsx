'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { UserRole, RegisterRequestPayload } from '@/types/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { RoleSelector } from './RoleSelector';
import { Mail, Lock, User as UserIcon, Phone, MapPin, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const { register, isRegistering } = useAuth();

  const [formData, setFormData] = useState<RegisterRequestPayload>({
    name: '',
    email: '',
    password: '',
    role: UserRole.CUSTOMER,
    phoneNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Password validation criteria
  const passwordCriteria = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error on type
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (apiError) setApiError(null);
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2 || formData.name.trim().length > 100) {
      newErrors.name = 'Name must be between 2 and 100 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!Object.values(passwordCriteria).every(Boolean)) {
      newErrors.password = 'Password must meet all complexity requirements below';
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
      const payload: RegisterRequestPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        ...(formData.phoneNumber?.trim() ? { phoneNumber: formData.phoneNumber.trim() } : {}),
        ...(formData.address?.trim() ? { address: formData.address.trim() } : {}),
      };

      const response = await register(payload);

      if (response && response.success) {
        setSuccessMessage('Account registered successfully! Redirecting...');
        
        setTimeout(() => {
          if (formData.role === UserRole.PROVIDER) {
            router.push('/dashboard/provider');
          } else if (formData.role === UserRole.ADMIN) {
            router.push('/dashboard/admin');
          } else {
            router.push('/dashboard/customer');
          }
        }, 1200);
      }
    } catch (err: any) {
      console.error('Registration submit error:', err);
      let errorMessage = 'Registration failed. Please check your details and try again.';

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      {apiError && (
        <Alert variant="error" title="Registration Error" onClose={() => setApiError(null)}>
          {apiError}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" title="Success">
          {successMessage}
        </Alert>
      )}

      {/* Role Selector Cards */}
      <RoleSelector selectedRole={formData.role} onSelectRole={handleRoleChange} />

      {/* Basic Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="name"
          placeholder="e.g. Alex Morgan"
          required
          leftIcon={<UserIcon className="w-4 h-4" />}
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
        />

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
      </div>

      {/* Password with Requirement Tracker */}
      <div className="flex flex-col gap-2">
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          required
          leftIcon={<Lock className="w-4 h-4" />}
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
        />

        {/* Password Strength Checklist */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex flex-col gap-2 mt-1">
          <span className="font-semibold text-slate-300">Password must contain:</span>
          <div className="grid grid-cols-2 gap-2 text-slate-400">
            <span className="flex items-center gap-1.5">
              {passwordCriteria.length ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              At least 8 characters
            </span>
            <span className="flex items-center gap-1.5">
              {passwordCriteria.uppercase ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              One uppercase letter
            </span>
            <span className="flex items-center gap-1.5">
              {passwordCriteria.lowercase ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              One lowercase letter
            </span>
            <span className="flex items-center gap-1.5">
              {passwordCriteria.number ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              One number
            </span>
          </div>
        </div>
      </div>

      {/* Optional Contact Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone Number (Optional)"
          name="phoneNumber"
          type="tel"
          placeholder="+1 (555) 000-0000"
          leftIcon={<Phone className="w-4 h-4" />}
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />

        <Input
          label="Address (Optional)"
          name="address"
          placeholder="City, State, Zip"
          leftIcon={<MapPin className="w-4 h-4" />}
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isRegistering}
        rightIcon={<ArrowRight className="w-5 h-5" />}
        className="mt-2"
      >
        Create GearUp Account
      </Button>

      {/* Already registered link */}
      <div className="text-center text-sm text-slate-400 mt-1">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4"
        >
          Sign in here
        </Link>
      </div>
    </form>
  );
}

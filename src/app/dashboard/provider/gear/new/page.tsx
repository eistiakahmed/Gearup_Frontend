'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PublicLayout } from '@/components/common/PublicLayout';
import { useCategories } from '@/hooks/useGear';
import { useCreateGear } from '@/hooks/useProvider';
import { CreateGearPayload } from '@/services/provider.service';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Dumbbell, ArrowLeft, Plus, Image as ImageIcon, Tag, DollarSign, MapPin, Layers } from 'lucide-react';

export default function AddGearPage() {
  const router = useRouter();
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const { createGear, isCreatingGear } = useCreateGear();

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    brand: string;
    model: string;
    categoryId: string;
    dailyRate: string;
    imageUrl: string;
    stockQuantity: string;
    location: string;
  }>({
    name: '',
    description: '',
    brand: '',
    model: '',
    categoryId: '',
    dailyRate: '',
    imageUrl: '',
    stockQuantity: '1',
    location: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

    if (!formData.name.trim()) newErrors.name = 'Equipment name is required';
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }
    if (!formData.brand.trim()) newErrors.brand = 'Brand name is required';
    if (!formData.categoryId) newErrors.categoryId = 'Please select a category';
    if (!formData.dailyRate || Number(formData.dailyRate) <= 0) {
      newErrors.dailyRate = 'Please enter a valid positive daily rate';
    }
    if (!formData.imageUrl.trim() || !formData.imageUrl.trim().startsWith('http')) {
      newErrors.imageUrl = 'Please enter a valid image URL starting with http/https';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMsg(null);

    if (!validateForm()) return;

    try {
      const payload: CreateGearPayload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        brand: formData.brand.trim(),
        ...(formData.model.trim() ? { model: formData.model.trim() } : {}),
        categoryId: formData.categoryId,
        dailyRate: Number(formData.dailyRate),
        images: [formData.imageUrl.trim()],
        stockQuantity: Number(formData.stockQuantity) || 1,
        ...(formData.location.trim() ? { location: formData.location.trim() } : {}),
        isAvailable: true,
      };

      const response = await createGear(payload);

      if (response && response.success) {
        setSuccessMsg('Equipment listing created successfully! Redirecting...');
        setTimeout(() => {
          router.push('/dashboard/provider');
        }, 1200);
      }
    } catch (err: any) {
      console.error('Create gear error:', err);
      let errorMessage = 'Failed to create gear listing. Please check your details and try again.';

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
    <PublicLayout>
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <Link href="/dashboard/provider">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Provider Dashboard
            </Button>
          </Link>

          {apiError && (
            <Alert variant="error" title="Listing Error" onClose={() => setApiError(null)}>
              {apiError}
            </Alert>
          )}

          {successMsg && (
            <Alert variant="success" title="Success!">
              {successMsg}
            </Alert>
          )}

          <Card className="p-4 sm:p-8 border-slate-800 shadow-2xl">
            <CardHeader className="border-b border-slate-800 pb-6 mb-6">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Dumbbell className="w-4 h-4" /> Inventory Management
              </div>
              <CardTitle className="text-2xl font-black">List New Sports Equipment</CardTitle>
              <CardDescription>
                Provide accurate details and an image URL to start renting out your equipment on GearUp.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Gear Name & Brand */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Equipment Name"
                    name="name"
                    placeholder="e.g. Inflatable Tandem Kayak"
                    required
                    leftIcon={<Tag className="w-4 h-4" />}
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                  />

                  <Input
                    label="Brand"
                    name="brand"
                    placeholder="e.g. Intex, Trek, Coleman"
                    required
                    leftIcon={<Layers className="w-4 h-4" />}
                    value={formData.brand}
                    onChange={handleInputChange}
                    error={errors.brand}
                  />
                </div>

                {/* Category & Daily Rate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Category <span className="text-rose-400">*</span>
                    </label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl border border-slate-800 p-2.5 outline-none focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {errors.categoryId && (
                      <p className="text-xs text-rose-400 font-medium">{errors.categoryId}</p>
                    )}
                  </div>

                  <Input
                    label="Daily Rate ($)"
                    name="dailyRate"
                    type="number"
                    step="0.01"
                    min={0}
                    placeholder="25.00"
                    required
                    leftIcon={<DollarSign className="w-4 h-4 text-emerald-400" />}
                    value={formData.dailyRate}
                    onChange={handleInputChange}
                    error={errors.dailyRate}
                  />
                </div>

                {/* Description Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Description <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Describe equipment condition, included accessories, specifications..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 text-slate-100 placeholder:text-slate-500 text-sm rounded-xl border border-slate-800 p-3.5 outline-none focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  {errors.description && (
                    <p className="text-xs text-rose-400 font-medium">{errors.description}</p>
                  )}
                </div>

                {/* Image URL & Stock Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <Input
                      label="Image URL"
                      name="imageUrl"
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      required
                      leftIcon={<ImageIcon className="w-4 h-4" />}
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      error={errors.imageUrl}
                    />
                  </div>

                  <Input
                    label="Stock Quantity"
                    name="stockQuantity"
                    type="number"
                    min={1}
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Location & Model */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Pickup Location (Optional)"
                    name="location"
                    placeholder="e.g. Austin, TX"
                    leftIcon={<MapPin className="w-4 h-4" />}
                    value={formData.location}
                    onChange={handleInputChange}
                  />

                  <Input
                    label="Model / Edition (Optional)"
                    name="model"
                    placeholder="e.g. Explorer K2"
                    value={formData.model}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isCreatingGear}
                  leftIcon={<Plus className="w-5 h-5" />}
                  className="mt-2"
                >
                  Create Gear Listing
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}

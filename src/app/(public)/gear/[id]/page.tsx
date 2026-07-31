'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PublicLayout } from '@/components/common/PublicLayout';
import { useGearDetails } from '@/hooks/useGear';
import { useAuth } from '@/hooks/useAuth';
import { useRentals } from '@/hooks/useRentals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { DateRangePicker } from '@/components/modules/rentals/DateRangePicker';
import {
  Dumbbell,
  MapPin,
  CheckCircle2,
  XCircle,
  User as UserIcon,
  ShieldCheck,
  ArrowLeft,
  Tag,
  Info,
  Clock,
} from 'lucide-react';

export default function GearDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { gear, isLoading, error } = useGearDetails(id);
  const { user, isAuthenticated } = useAuth();
  const { createOrder, isCreatingOrder } = useRentals();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-center">
          <div className="flex flex-col items-center gap-4 text-slate-600 animate-pulse">
            <Dumbbell className="w-12 h-12 text-emerald-600 animate-spin" />
            <p className="text-sm font-semibold">Loading gear details...</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error || !gear) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-slate-50 p-8 max-w-4xl mx-auto flex flex-col gap-6">
          <Link href="/gear">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Catalog
            </Button>
          </Link>
          <Alert variant="error" title="Gear Not Found">
            The requested equipment could not be loaded or no longer exists.
          </Alert>
        </div>
      </PublicLayout>
    );
  }

  const fallbackImage =
    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80';

  const currentImage =
    gear.images && gear.images.length > 0 && !imageErrorMap[selectedImageIndex]
      ? gear.images[selectedImageIndex]
      : fallbackImage;

  const handleRentalSubmit = async (rentalData: {
    startDate: string;
    endDate: string;
    quantity: number;
    notes?: string;
  }) => {
    setOrderError(null);
    setOrderSuccess(null);

    if (!isAuthenticated) {
      router.push(`/login?redirect=/gear/${gear.id}`);
      return;
    }

    try {
      const response = await createOrder({
        items: [
          {
            gearId: gear.id,
            quantity: rentalData.quantity,
          },
        ],
        startDate: rentalData.startDate,
        endDate: rentalData.endDate,
        ...(rentalData.notes ? { notes: rentalData.notes } : {}),
      });

      if (response && response.success) {
        setOrderSuccess('Rental order placed successfully! Redirecting to your orders...');
        setTimeout(() => {
          router.push('/dashboard/customer');
        }, 1200);
      }
    } catch (err: any) {
      console.error('Order creation error:', err);
      setOrderError(
        err?.message || err?.data?.message || 'Failed to place rental order. Please try again.'
      );
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between">
            <Link href="/gear">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back to Equipment Catalog
              </Button>
            </Link>
          </div>

          {orderError && (
            <Alert variant="error" title="Order Submission Error" onClose={() => setOrderError(null)}>
              {orderError}
            </Alert>
          )}

          {orderSuccess && (
            <Alert variant="success" title="Success!">
              {orderSuccess}
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Image Gallery & Specifications */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Image Gallery Main View */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg">
                  <Image
                    src={currentImage}
                    alt={gear.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                    onError={() =>
                      setImageErrorMap((prev) => ({ ...prev, [selectedImageIndex]: true }))
                    }
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {gear.category?.name && <Badge variant="primary">{gear.category.name}</Badge>}
                  </div>
                </div>

                {/* Thumbnails */}
                {gear.images && gear.images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {gear.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          selectedImageIndex === idx
                            ? 'border-emerald-600 scale-105 shadow-md'
                            : 'border-slate-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description & Specifications Card */}
              <Card className="p-6 bg-white border-slate-200">
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">About this Equipment</h3>
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                      {gear.description}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  {gear.specifications && Object.keys(gear.specifications).length > 0 && (
                    <div className="border-t border-slate-200 pt-6">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Technical Specifications
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                        {Object.entries(gear.specifications).map(([key, val]) => (
                          <div
                            key={key}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                          >
                            <span className="text-slate-500 font-medium capitalize">{key}</span>
                            <span className="text-slate-900 font-semibold">{String(val)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Provider Info Card */}
                  <div className="border-t border-slate-200 pt-6 flex flex-col gap-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Rented by Verified Provider
                    </h4>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
                          <UserIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-900">
                            {gear.provider?.name || 'Local Shop Provider'}
                          </h5>
                          <p className="text-xs text-slate-500">Verified Rental Partner</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                        <ShieldCheck className="w-4 h-4" /> Verified
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Gear Overview & Booking Sidebar */}
            <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
              <Card className="p-6 bg-white border-slate-200 shadow-xl">
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      {gear.brand} {gear.model ? `• ${gear.model}` : ''}
                    </span>
                    {gear.isAvailable ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({gear.stockQuantity})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                        <XCircle className="w-3.5 h-3.5" /> Out of Stock
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {gear.name}
                  </h1>

                  {gear.location && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>{gear.location}</span>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Daily Rental Rate</span>
                      <span className="text-2xl font-black text-slate-900">${gear.dailyRate}</span>
                      <span className="text-xs text-slate-500"> / day</span>
                    </div>
                    {gear.weeklyRate && (
                      <div className="text-right border-l border-slate-200 pl-4">
                        <span className="text-xs text-slate-500 block">Weekly Rate</span>
                        <span className="text-sm font-bold text-emerald-700">${gear.weeklyRate}</span>
                        <span className="text-[10px] text-slate-500"> / week</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* DateRangePicker Booking Component */}
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" /> Select Rental Dates & Confirm Order
                  </h3>

                  <DateRangePicker
                    gear={gear}
                    onSubmitRental={handleRentalSubmit}
                    isSubmitting={isCreatingOrder}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

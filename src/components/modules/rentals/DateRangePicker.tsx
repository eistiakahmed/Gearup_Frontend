'use client';

import React, { useState, useEffect } from 'react';
import { GearItem } from '@/types/gear';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Calendar, DollarSign, Clock, ShieldCheck, ArrowRight, Minus, Plus } from 'lucide-react';

export interface DateRangePickerProps {
  gear: GearItem;
  onSubmitRental: (data: {
    startDate: string;
    endDate: string;
    quantity: number;
    notes?: string;
  }) => Promise<void>;
  isSubmitting?: boolean;
}

export function DateRangePicker({ gear, onSubmitRental, isSubmitting = false }: DateRangePickerProps) {
  // Format YYYY-MM-DD helper
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const todayStr = formatDate(new Date());
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDate(tomorrow);

  const [startDate, setStartDate] = useState<string>(todayStr);
  const [endDate, setEndDate] = useState<string>(tomorrowStr);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [dateError, setDateError] = useState<string | null>(null);

  // Calculate rental duration in days
  const computeTotalDays = (): number => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const totalDays = computeTotalDays();
  const totalPrice = gear.dailyRate * (totalDays > 0 ? totalDays : 1) * quantity;

  useEffect(() => {
    if (!startDate || !endDate) {
      setDateError('Please select both start and end dates.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      setDateError('Start date cannot be in the past.');
      return;
    }

    if (end <= start) {
      setDateError('End date must be after the start date.');
      return;
    }

    const maxEnd = new Date(start);
    maxEnd.setDate(maxEnd.getDate() + 30);
    if (end > maxEnd) {
      setDateError('Maximum rental period is 30 days.');
      return;
    }

    setDateError(null);
  }, [startDate, endDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateError || totalDays <= 0) return;

    const startIso = new Date(startDate).toISOString();
    const endIso = new Date(endDate).toISOString();

    onSubmitRental({
      startDate: startIso,
      endDate: endIso,
      quantity,
      ...(notes.trim() ? { notes: notes.trim() } : {}),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      {dateError && (
        <Alert variant="warning" title="Date Selection Issue">
          {dateError}
        </Alert>
      )}

      {/* Date Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Start Date"
          type="date"
          min={todayStr}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          leftIcon={<Calendar className="w-4 h-4 text-emerald-600" />}
          required
        />

        <Input
          label="End Date"
          type="date"
          min={startDate || todayStr}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          leftIcon={<Calendar className="w-4 h-4 text-emerald-600" />}
          required
        />
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
            Quantity
          </span>
          <span className="text-xs text-slate-500">Available: {gear.stockQuantity}</span>
        </div>

        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="text-slate-500 hover:text-slate-900 disabled:opacity-30 p-1"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-bold text-slate-900 min-w-[20px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(gear.stockQuantity || 1, q + 1))}
            disabled={quantity >= (gear.stockQuantity || 1)}
            className="text-slate-500 hover:text-slate-900 disabled:opacity-30 p-1"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Price Summary Breakdown */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5 text-xs sm:text-sm">
        <div className="flex items-center justify-between text-slate-600">
          <span>Daily Rate</span>
          <span className="font-semibold text-slate-900">${gear.dailyRate} / day</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>Rental Duration</span>
          <span className="font-semibold text-slate-900">{totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>Quantity</span>
          <span className="font-semibold text-slate-900">{quantity} item(s)</span>
        </div>
        <div className="border-t border-slate-200 pt-2.5 flex items-center justify-between text-base font-bold">
          <span className="text-slate-900">Total Rental Cost</span>
          <span className="text-emerald-700 font-black text-xl">${Number(totalPrice || 0).toFixed(2)}</span>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
        disabled={Boolean(dateError) || totalDays <= 0 || !gear.isAvailable}
        rightIcon={<ArrowRight className="w-5 h-5" />}
      >
        {gear.isAvailable ? 'Confirm & Place Rental Order' : 'Currently Unavailable'}
      </Button>
    </form>
  );
}

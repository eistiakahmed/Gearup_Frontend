'use client';

import React, { useState } from 'react';
import { useCreateReview } from '@/hooks/useReview';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Star, X, MessageSquare, Send } from 'lucide-react';

export interface ReviewModalProps {
  gearId: string;
  orderId: string;
  gearName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ReviewModal({
  gearId,
  orderId,
  gearName,
  isOpen,
  onClose,
  onSuccess,
}: ReviewModalProps) {
  const { submitReview, isSubmittingReview } = useCreateReview();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (comment.trim() && comment.trim().length < 10) {
      setErrorMsg('Comment must be at least 10 characters long.');
      return;
    }

    try {
      const response = await submitReview({
        gearId,
        orderId,
        rating,
        ...(comment.trim() ? { comment: comment.trim() } : {}),
      });

      if (response && response.success) {
        setSuccessMsg('Thank you! Your review has been submitted successfully.');
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      console.error('Review submit error:', err);
      setErrorMsg(
        err?.message || err?.data?.message || 'Failed to submit review. Please try again.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Leave Feedback
            </span>
            <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{gearName}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <Alert variant="error" title="Review Submission Issue" onClose={() => setErrorMsg(null)}>
            {errorMsg}
          </Alert>
        )}

        {successMsg && (
          <Alert variant="success" title="Success!">
            {successMsg}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Star Rating Picker */}
          <div className="flex flex-col items-center gap-2 py-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-600">Rate Your Experience</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-amber-500 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        active ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-bold text-slate-800">
              {rating === 5
                ? 'Excellent (5/5)'
                : rating === 4
                ? 'Very Good (4/5)'
                : rating === 3
                ? 'Good (3/5)'
                : rating === 2
                ? 'Fair (2/5)'
                : 'Poor (1/5)'}
            </span>
          </div>

          {/* Comment Textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span>Review Comment (Optional)</span>
            </label>
            <textarea
              rows={4}
              placeholder="Tell others about the equipment condition, pickup experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-sm rounded-xl border border-slate-300 p-3.5 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="ghost" size="md" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              isLoading={isSubmittingReview}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

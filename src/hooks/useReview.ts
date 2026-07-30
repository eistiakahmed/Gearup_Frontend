'use client';

import useSWRMutation from 'swr/mutation';
import { createReview } from '@/services/review.service';
import { CreateReviewPayload } from '@/types/review';

/**
 * Hook for review submission mutation
 */
export function useCreateReview() {
  const { trigger: submitReviewTrigger, isMutating: isSubmittingReview } =
    useSWRMutation(
      '/reviews',
      async (_url: string, { arg }: { arg: CreateReviewPayload }) => {
        return createReview(arg);
      }
    );

  return {
    submitReview: submitReviewTrigger,
    isSubmittingReview,
  };
}

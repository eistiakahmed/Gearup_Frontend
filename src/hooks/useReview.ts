import useSWR from 'swr';
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

/**
 * Hook for fetching recent customer reviews for homepage
 */
export function useRecentReviews(limit: number = 6) {
  const { data, error, isLoading, mutate } = useSWR(`/reviews/recent?limit=${limit}`);

  const reviews = Array.isArray(data?.data) ? data.data : [];

  return {
    reviews,
    isLoading,
    error,
    mutate,
  };
}

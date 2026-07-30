import { apiClient } from '@/lib/api-client';
import { CreateReviewPayload, ReviewRecord } from '@/types/review';
import { ApiResponse } from '@/types/auth';

/**
 * Create a new review for returned gear (POST /api/reviews)
 */
export async function createReview(
  payload: CreateReviewPayload
): Promise<ApiResponse<ReviewRecord>> {
  return apiClient<ApiResponse<ReviewRecord>>('/reviews', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

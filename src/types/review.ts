export interface CreateReviewPayload {
  gearId: string;
  orderId: string;
  rating: number; // 1 to 5
  comment?: string;
}

export interface ReviewRecord {
  id: string;
  gearId: string;
  orderId: string;
  userId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
}

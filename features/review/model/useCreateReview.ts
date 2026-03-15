import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW_MUTATION } from '../api/createReview.mutation';

interface ReviewStepInput {
  type: string;
  content: string;
}

interface CreateReviewInput {
  steps: ReviewStepInput[];
  date: string;
}

interface CreateReviewDTO {
  id: string;
  reviewType: string;
  steps: ReviewStepInput[];
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateReviewResponse {
  createReview: CreateReviewDTO;
}

export function useCreateReview() {
  const [mutate, { loading, error }] = useMutation<
    CreateReviewResponse,
    { input: CreateReviewInput }
  >(CREATE_REVIEW_MUTATION);

  const createReview = (input: CreateReviewInput) =>
    mutate({ variables: { input } });

  return { createReview, loading, error };
}

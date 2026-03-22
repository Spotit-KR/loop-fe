import { useQuery } from '@apollo/client/react';
import { MY_REVIEWS_QUERY } from '../api';
import type { Review, ReviewDTO, ReviewFilter } from './types';

interface MyReviewsResponse {
  myReviews: ReviewDTO[];
}

export function useMyReviews(filter: ReviewFilter) {
  const { data, loading, error } = useQuery<MyReviewsResponse>(
    MY_REVIEWS_QUERY,
    { variables: { filter }, fetchPolicy: 'cache-and-network' }
  );

  const myReviews: Review[] =
    data?.myReviews.map((dto) => ({
      id: dto.id,
      reviewType: dto.reviewType as Review['reviewType'],
      steps: dto.steps,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    })) ?? [];

  return { myReviews, loading, error };
}

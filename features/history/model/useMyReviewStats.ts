import { useQuery } from '@apollo/client/react';
import { MY_REVIEW_STATS_QUERY } from '../api';

interface MyReviewStatsResponse {
  myReviewStats: {
    totalCount: number;
    consecutiveDays: number;
  };
}

export function useMyReviewStats() {
  const { data, loading, error } = useQuery<MyReviewStatsResponse>(
    MY_REVIEW_STATS_QUERY
  );

  return {
    totalCount: data?.myReviewStats.totalCount ?? 0,
    consecutiveDays: data?.myReviewStats.consecutiveDays ?? 0,
    loading,
    error,
  };
}

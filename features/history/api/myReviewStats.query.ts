import { gql } from '@apollo/client';

export const MY_REVIEW_STATS_QUERY = gql`
  query myReviewStats {
    myReviewStats {
      totalCount
      consecutiveDays
    }
  }
`;

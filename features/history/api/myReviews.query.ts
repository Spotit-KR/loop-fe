import { gql } from '@apollo/client';

export const MY_REVIEWS_QUERY = gql`
  query myReviews($filter: ReviewFilter!) {
    myReviews(filter: $filter) {
      id
      reviewType
      steps {
        type
        content
      }
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
`;

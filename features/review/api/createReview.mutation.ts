import { gql } from '@apollo/client';

export const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
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

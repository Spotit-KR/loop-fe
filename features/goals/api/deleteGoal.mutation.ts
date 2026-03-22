import { gql } from '@apollo/client';

export const DELETE_GOAL_MUTATION = gql`
  mutation deleteGoal($id: ID!) {
    deleteGoal(id: $id)
  }
`;

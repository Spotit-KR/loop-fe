import { gql } from '@apollo/client';

export const REMOVE_DAILY_GOAL_MUTATION = gql`
  mutation removeDailyGoal($input: RemoveDailyGoalInput!) {
    removeDailyGoal(input: $input)
  }
`;

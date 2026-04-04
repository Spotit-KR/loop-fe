import { gql } from '@apollo/client';

export const ADD_DAILY_GOAL_MUTATION = gql`
  mutation addDailyGoal($input: AddDailyGoalInput!) {
    addDailyGoal(input: $input) {
      id
      title
      createdAt
      updatedAt
      totalTaskCount
      completedTaskCount
      achievementRate
    }
  }
`;

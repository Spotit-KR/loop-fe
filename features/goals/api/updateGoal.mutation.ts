import { gql } from '@apollo/client';

export const UPDATE_GOAL_MUTATION = gql`
  mutation updateGoal($input: UpdateGoalInput!) {
    updateGoal(input: $input) {
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

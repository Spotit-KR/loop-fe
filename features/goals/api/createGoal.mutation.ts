import { gql } from '@apollo/client';

export const CREATE_GOAL_MUTATION = gql`
  mutation createGoal($input: CreateGoalInput!) {
    createGoal(input: $input) {
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

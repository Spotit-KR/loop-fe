import { gql } from '@apollo/client';

export const MY_GOALS_QUERY = gql`
  query myGoals {
    myGoals {
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

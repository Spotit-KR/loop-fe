import { gql } from '@apollo/client';

export const TASK_QEURY = gql`
  query myTasks($filter: TaskFilter!) {
    myTasks(filter: $filter) {
      id
      title
      status
      goalId
      taskDate
      createdAt
      updatedAt
    }
  }
`;

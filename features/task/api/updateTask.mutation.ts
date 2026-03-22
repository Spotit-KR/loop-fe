import { gql } from '@apollo/client';

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
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

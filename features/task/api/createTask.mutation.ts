import { gql } from '@apollo/client';

export const CREATE_TASK_MUTATION = gql`
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
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

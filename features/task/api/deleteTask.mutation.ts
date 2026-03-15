import { gql } from '@apollo/client';

export const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

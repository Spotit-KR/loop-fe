import { useMutation } from '@apollo/client/react';
import { DELETE_TASK_MUTATION } from '../api/deleteTask.mutation';

interface DeleteTaskResponse {
  deleteTask: boolean;
}

export function useDeleteTask() {
  const [mutate, { loading, error }] = useMutation<
    DeleteTaskResponse,
    { id: string }
  >(DELETE_TASK_MUTATION);

  const deleteTask = (id: string) => mutate({ variables: { id } });

  return { deleteTask, loading, error };
}

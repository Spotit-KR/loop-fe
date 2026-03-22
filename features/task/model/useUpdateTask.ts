import { useMutation } from '@apollo/client/react';
import { UPDATE_TASK_MUTATION } from '../api/updateTask.mutation';
import { MY_GOALS_QUERY } from 'features/goals/api/myGoals.query';
import type { TaskDTO, TaskStatus } from 'entities/task/type';

export interface UpdateTaskInput {
  id: string;
  title?: string;
  status?: TaskStatus;
}

interface UpdateTaskResponse {
  updateTask: TaskDTO;
}

export function useUpdateTask() {
  const [mutate, { loading, error }] = useMutation<
    UpdateTaskResponse,
    { input: UpdateTaskInput }
  >(UPDATE_TASK_MUTATION);

  const updateTask = (input: UpdateTaskInput) =>
    mutate({
      variables: { input },
      refetchQueries: [{ query: MY_GOALS_QUERY }],
    });

  return { updateTask, loading, error };
}

import { useMutation } from '@apollo/client/react';
import { CREATE_TASK_MUTATION } from '../api/createTask.mutation';
import { TASK_QEURY } from '../api/task.query';
import { MY_GOALS_QUERY } from 'features/goals/api/myGoals.query';
import type { TaskDTO } from 'entities/task/type';

interface CreateTaskInput {
  goalId: string;
  title: string;
  date: string; // yyyy-mm-dd
}

interface CreateTaskResponse {
  createTask: TaskDTO;
}

export function useCreateTask() {
  const [mutate, { loading, error }] = useMutation<
    CreateTaskResponse,
    { input: CreateTaskInput }
  >(CREATE_TASK_MUTATION);

  const createTask = (input: CreateTaskInput) =>
    mutate({
      variables: { input },
      refetchQueries: [
        { query: MY_GOALS_QUERY },
        {
          query: TASK_QEURY,
          variables: {
            filter: {
              startDate: input.date,
              endDate: input.date,
            },
          },
        },
      ],
    });

  return { createTask, loading, error };
}

import { useMutation } from '@apollo/client/react';
import { CREATE_TASK_MUTATION } from '../api/createTask.mutation';
import type { TaskDTO } from 'entities/task/type';

interface CreateTaskInput {
  goalId: string;
  title: string;
  taskDate: string; // yyyy-mm-dd
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
    mutate({ variables: { input } });

  return { createTask, loading, error };
}

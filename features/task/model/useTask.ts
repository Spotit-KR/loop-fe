import { useQuery } from '@apollo/client/react';
import { TASK_QEURY } from '../api/task.query';
import type { TaskDTO, TaskFilter } from 'entities/task/type';

interface MyTasksResponse {
  myTasks: TaskDTO[];
}

export function useTask(filter: TaskFilter) {
  const { data, loading, error, refetch } = useQuery<MyTasksResponse>(
    TASK_QEURY,
    {
      variables: { filter },
    }
  );

  const myTasks =
    data?.myTasks?.map((dto) => ({
      id: dto.id,
      title: dto.title,
      status: dto.status,
      goalId: dto.goalId,
      taskDate: new Date(dto.taskDate),
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    })) ?? [];

  return { myTasks, loading, error, refetch };
}

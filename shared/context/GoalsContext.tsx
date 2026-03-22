import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from 'react';
import { useMyGoals } from 'features/goals/model/useMyGoals';
import { useCreateGoal } from 'features/goals/model/useCreateGoal';
import { useUpdateGoal } from 'features/goals/model/useUpdateGoal';
import { useCreateTask } from 'features/task/model/useCreateTask';
import { useDeleteTask } from 'features/task/model/useDeleteTask';
import { useUpdateTask } from 'features/task/model/useUpdateTask';

export interface TodoTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoGoal {
  id: string;
  title: string;
  completedTaskCount: number;
  totalTaskCount: number;
  achievementRate: number;
  tasks: TodoTask[];
}

interface GoalsContextValue {
  goals: TodoGoal[];
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
  addGoal: (title: string) => void;
  updateGoal: (goalId: string, title: string) => void;
  addTask: (goalId: string, title: string, taskDate: string) => void;
  toggleTask: (goalId: string, taskId: string) => void;
  deleteTask: (goalId: string, taskId: string) => void;
  updateTask: (goalId: string, taskId: string, newTitle: string) => Promise<void>;
  deleteGoal: (goalId: string) => void;
}

const GoalsContext = createContext<GoalsContextValue | null>(null);

export function GoalsProvider({ children }: { children: ReactNode }) {
  const { myGoals, loading, error, refetch } = useMyGoals();
  const { createGoal: createGoalMutation } = useCreateGoal();
  const { updateGoal: updateGoalMutation } = useUpdateGoal();
  const { createTask: createTaskMutation } = useCreateTask();
  const { deleteTask: deleteTaskMutation } = useDeleteTask();
  const { updateTask: updateTaskMutation } = useUpdateTask();

  const goals: TodoGoal[] = myGoals.map((g) => ({
    id: String(g.id),
    title: g.title,
    completedTaskCount: g.completedTaskCount,
    totalTaskCount: g.totalTaskCount,
    achievementRate: g.achievementRate,
    tasks: [],
  }));

  const addGoal = useCallback(
    async (title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;

      try {
        await createGoalMutation({ title: trimmed });
        await refetch();
      } catch {
        // 에러는 useCreateGoal에서 처리 가능
      }
    },
    [createGoalMutation, refetch]
  );

  const updateGoal = useCallback(
    async (goalId: string, title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;

      try {
        await updateGoalMutation({ id: goalId, title: trimmed });
        await refetch();
      } catch {
        // 에러는 useUpdateGoal에서 처리 가능
      }
    },
    [updateGoalMutation, refetch]
  );

  const addTask = useCallback(
    async (goalId: string, title: string, taskDate: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;

      await createTaskMutation({
        goalId,
        title: trimmed,
        date: taskDate,
      });
    },
    [createTaskMutation]
  );

  const toggleTask = useCallback(
    (_goalId: string, _taskId: string) => {
      // TODO: updateTask mutation 연동 필요
      refetch();
    },
    [refetch]
  );

  const deleteTask = useCallback(
    async (_goalId: string, taskId: string) => {
      try {
        await deleteTaskMutation(taskId);
      } catch {
        // 에러는 useDeleteTask에서 처리 가능
      }
    },
    [deleteTaskMutation]
  );

  const updateTask = useCallback(
    async (_goalId: string, taskId: string, newTitle: string) => {
      const trimmed = newTitle.trim();
      if (!trimmed) return;

      await updateTaskMutation({ id: taskId, title: trimmed });
      await refetch();
    },
    [updateTaskMutation, refetch]
  );

  const deleteGoal = useCallback(
    (_goalId: string) => {
      // TODO: deleteGoal mutation 연동 필요
      refetch();
    },
    [refetch]
  );

  const value: GoalsContextValue = {
    goals,
    loading,
    error,
    refetch,
    addGoal,
    updateGoal,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    deleteGoal,
  };

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error('useGoals must be used within GoalsProvider');
  }
  return context;
}

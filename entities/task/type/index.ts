type TaskStatus = 'TODO' | 'DONE';

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  goalId: number;
  taskDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskFilter {
  goalId?: string;
  startDate?: string; // yyyy-mm-dd
  endDate?: string; // yyyy-mm-dd
}

interface TaskDTO {
  id: number;
  title: string;
  status: TaskStatus;
  goalId: number;
  taskDate: string;
  createdAt: string;
  updatedAt: string;
}
export type { Task, TaskStatus, TaskFilter, TaskDTO };

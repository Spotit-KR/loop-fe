type TaskStatus = 'TODO' | 'DONE';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  goalId: string;
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
  id: string;
  title: string;
  status: TaskStatus;
  goalId: string;
  taskDate: string;
  createdAt: string;
  updatedAt: string;
}
export type { Task, TaskStatus, TaskFilter, TaskDTO };

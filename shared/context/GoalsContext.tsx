import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

export interface TodoTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoGoal {
  id: string;
  title: string;
  completed: number;
  total: number;
  tasks: TodoTask[];
}

interface GoalsContextValue {
  goals: TodoGoal[];
  addGoal: (title: string) => void;
  addTask: (goalId: string, title: string) => void;
  toggleTask: (goalId: string, taskId: string) => void;
  deleteTask: (goalId: string, taskId: string) => void;
  updateTask: (goalId: string, taskId: string, newTitle: string) => void;
  deleteGoal: (goalId: string) => void;
}

const GoalsContext = createContext<GoalsContextValue | null>(null);

export function GoalsProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<TodoGoal[]>([]);

  const addGoal = useCallback((title: string) => {
    const newGoal: TodoGoal = {
      id: Date.now().toString(),
      title,
      completed: 0,
      total: 0,
      tasks: [],
    };
    setGoals((prev) => [...prev, newGoal]);
  }, []);

  const addTask = useCallback((goalId: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: TodoTask = {
      id: Date.now().toString(),
      title: trimmed,
      completed: false,
    };

    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              tasks: [...goal.tasks, newTask],
              total: goal.tasks.length + 1,
            }
          : goal
      )
    );
  }, []);

  const toggleTask = useCallback((goalId: string, taskId: string) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;
        const updatedTasks = goal.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        const completedCount = updatedTasks.filter((t) => t.completed).length;
        return {
          ...goal,
          tasks: updatedTasks,
          completed: completedCount,
        };
      })
    );
  }, []);

  const deleteTask = useCallback((goalId: string, taskId: string) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;
        const filtered = goal.tasks.filter((t) => t.id !== taskId);
        const completedCount = filtered.filter((t) => t.completed).length;
        return {
          ...goal,
          tasks: filtered,
          total: filtered.length,
          completed: completedCount,
        };
      })
    );
  }, []);

  const updateTask = useCallback(
    (goalId: string, taskId: string, newTitle: string) => {
      const trimmed = newTitle.trim();
      if (!trimmed) return;

      setGoals((prev) =>
        prev.map((goal) => {
          if (goal.id !== goalId) return goal;
          return {
            ...goal,
            tasks: goal.tasks.map((t) =>
              t.id === taskId ? { ...t, title: trimmed } : t
            ),
          };
        })
      );
    },
    []
  );

  const deleteGoal = useCallback((goalId: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  }, []);

  const value: GoalsContextValue = {
    goals,
    addGoal,
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

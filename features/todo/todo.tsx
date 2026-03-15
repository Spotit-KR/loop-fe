import { useMemo, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from 'shared/ui/components/button';
import { useGoals } from 'shared/context/GoalsContext';
import { useTask } from 'features/task/model/useTask';
import { formatDateToYYYYMMDD } from 'shared/utils';
import { AddGoalModal } from 'features/goals/ui/AddGoalModal';
import { TodoHeader } from 'features/todo/TodoHeader';
import { TodoItem } from 'features/todo/TodoItem';

export const Todo = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const {
    goals,
    addGoal: handleAddTodo,
    addTask: handleAddTask,
    toggleTask: handleToggleTask,
    deleteTask: handleDeleteTask,
    updateTask: handleUpdateTask,
    deleteGoal: handleDeleteTodo,
  } = useGoals();

  const dateStr = formatDateToYYYYMMDD(selectedDate);
  const { myTasks, refetch: refetchTasks } = useTask({
    startDate: dateStr,
    endDate: dateStr,
  });

  const todos = useMemo(() => {
    return goals.map((goal) => {
      const goalTasks = myTasks.filter((t) => t.goalId === goal.id);
      const completedCount = goalTasks.filter((t) => t.status === 'DONE').length;
      return {
        id: goal.id,
        title: goal.title,
        completed: completedCount,
        total: goalTasks.length,
        tasks: goalTasks.map((t) => ({
          id: t.id,
          title: t.title,
          completed: t.status === 'DONE',
        })),
      };
    });
  }, [goals, myTasks]);

  const handlePrevDate = () => {
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 1);
      return next;
    });
  };

  const handleNextDate = () => {
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 1);
      return next;
    });
  };

  const [taskInputs, setTaskInputs] = useState<Record<string, string>>({});
  const [editingTask, setEditingTask] = useState<{
    goalId: string;
    taskId: string;
  } | null>(null);
  const [editingTaskInput, setEditingTaskInput] = useState('');

  const handleAddTaskWithReset = async (goalId: string, title: string) => {
    await handleAddTask(goalId, title, dateStr);
    refetchTasks();
    setTaskInputs((prev) => ({ ...prev, [goalId]: '' }));
  };

  const handleToggleTaskWrapper = (goalId: string, taskId: string) => {
    handleToggleTask(goalId, taskId);
  };

  const handleDeleteTaskWrapper = async (
    goalId: string,
    taskId: string
  ) => {
    await handleDeleteTask(goalId, taskId);
    refetchTasks();
  };

  const handleTaskInputKeyDown = (
    goalId: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const value = taskInputs[goalId] ?? '';
    handleAddTaskWithReset(goalId, value);
  };
  const handleTaskInputChange = (goalId: string, value: string) => {
    setTaskInputs((prev) => ({ ...prev, [goalId]: value }));
  };

  const handleDeleteTodoWrapper = (id: string) => {
    handleDeleteTodo(id);
  };

  const handleStartEdit = (goalId: string, taskId: string, title: string) => {
    setEditingTask({ goalId, taskId });
    setEditingTaskInput(title);
  };

  const handleUpdateTaskWrapper = (
    goalId: string,
    taskId: string,
    newTitle: string
  ) => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      setEditingTask(null);
      return;
    }
    handleUpdateTask(goalId, taskId, trimmed);
    setEditingTask(null);
  };

  const handleEditInputKeyDown = (
    goalId: string,
    taskId: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUpdateTaskWrapper(goalId, taskId, editingTaskInput);
    }
    if (e.key === 'Escape') {
      setEditingTask(null);
    }
  };

  if (todos.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl pt-8">
          <TodoHeader
            selectedDate={selectedDate}
            onPrevDate={handlePrevDate}
            onNextDate={handleNextDate}
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
            <Send className="h-8 w-8 text-gray-600" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              아직 목표가 없어요
            </h2>
            <p className="text-sm text-gray-500 pb-10">
              할 일을 적으려면 목표를 먼저 생성하세요
            </p>
          </div>

          <Button
            type="button"
            onClick={() => setIsAddGoalOpen(true)}
            className="rounded-xl bg-main1 px-10 py-7 text-base font-medium text-white hover:bg-main1/90"
            aria-label="첫 목표 만들기"
          >
            첫 목표 만들기
          </Button>
        </div>
        <AddGoalModal
          open={isAddGoalOpen}
          onOpenChange={setIsAddGoalOpen}
          onAddGoal={handleAddTodo}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl pt-8">
        <TodoHeader
          selectedDate={selectedDate}
          onPrevDate={handlePrevDate}
          onNextDate={handleNextDate}
        />
      </div>
      <div className="w-full max-w-2xl flex-1 space-y-4 pt-6">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            taskInput={taskInputs[todo.id] ?? ''}
            onTaskInputChange={(value) => handleTaskInputChange(todo.id, value)}
            onTaskInputKeyDown={(e) => handleTaskInputKeyDown(todo.id, e)}
            editingTask={editingTask}
            editingTaskInput={editingTaskInput}
            onEditingTaskInputChange={setEditingTaskInput}
            onStartEdit={(taskId, title) =>
              handleStartEdit(todo.id, taskId, title)
            }
            onUpdateTask={(taskId, newTitle) =>
              handleUpdateTaskWrapper(todo.id, taskId, newTitle)
            }
            onEditInputKeyDown={(taskId, e) =>
              handleEditInputKeyDown(todo.id, taskId, e)
            }
            onToggleTask={(taskId) =>
              handleToggleTaskWrapper(todo.id, taskId)
            }
            onDeleteTask={(taskId) =>
              handleDeleteTaskWrapper(todo.id, taskId)
            }
            onDeleteTodo={() => handleDeleteTodoWrapper(todo.id)}
          />
        ))}
        <div className="flex items-center justify-center">
          <p className="mt-5 text-lg text-sub2">
            다른 목표를 만들고 싶다면 목표에서 추가할 수 있어요 →
          </p>
        </div>
      </div>
    </div>
  );
};

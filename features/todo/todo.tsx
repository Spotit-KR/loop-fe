import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from 'shared/ui/components/button';
import { AddGoalModal } from 'features/goals/ui/AddGoalModal';
import { TodoHeader } from 'features/todo/TodoHeader';
import {
  TodoItem,
  type TodoGoal,
  type TodoTask,
} from 'features/todo/TodoItem';

export const Todo = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [todos, setTodos] = useState<TodoGoal[]>([]);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

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

  const handleAddTodo = (title: string) => {
    const newTodo: TodoGoal = {
      id: Date.now().toString(),
      title,
      completed: 0,
      total: 0,
      tasks: [],
    };
    setTodos([...todos, newTodo]);
  };

  const [taskInputs, setTaskInputs] = useState<Record<string, string>>({});
  const [editingTask, setEditingTask] = useState<{
    goalId: string;
    taskId: string;
  } | null>(null);
  const [editingTaskInput, setEditingTaskInput] = useState('');

  const handleAddTask = (goalId: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: TodoTask = {
      id: Date.now().toString(),
      title: trimmed,
      completed: false,
    };

    setTodos(
      todos.map((todo) =>
        todo.id === goalId
          ? {
              ...todo,
              tasks: [...todo.tasks, newTask],
              total: todo.tasks.length + 1,
            }
          : todo
      )
    );
    setTaskInputs((prev) => ({ ...prev, [goalId]: '' }));
  };

  const handleToggleTask = (goalId: string, taskId: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== goalId) return todo;
        const updatedTasks = todo.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        const completedCount = updatedTasks.filter((t) => t.completed).length;
        return {
          ...todo,
          tasks: updatedTasks,
          completed: completedCount,
        };
      })
    );
  };

  const handleDeleteTask = (goalId: string, taskId: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== goalId) return todo;
        const filtered = todo.tasks.filter((t) => t.id !== taskId);
        const completedCount = filtered.filter((t) => t.completed).length;
        return {
          ...todo,
          tasks: filtered,
          total: filtered.length,
          completed: completedCount,
        };
      })
    );
  };

  const handleTaskInputKeyDown = (
    goalId: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const value = taskInputs[goalId] ?? '';
    handleAddTask(goalId, value);
  };
  const handleTaskInputChange = (goalId: string, value: string) => {
    setTaskInputs((prev) => ({ ...prev, [goalId]: value }));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleStartEdit = (goalId: string, taskId: string, title: string) => {
    setEditingTask({ goalId, taskId });
    setEditingTaskInput(title);
  };

  const handleUpdateTask = (
    goalId: string,
    taskId: string,
    newTitle: string
  ) => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      setEditingTask(null);
      return;
    }

    setTodos(
      todos.map((todo) => {
        if (todo.id !== goalId) return todo;
        return {
          ...todo,
          tasks: todo.tasks.map((t) =>
            t.id === taskId ? { ...t, title: trimmed } : t
          ),
        };
      })
    );
    setEditingTask(null);
  };

  const handleEditInputKeyDown = (
    goalId: string,
    taskId: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUpdateTask(goalId, taskId, editingTaskInput);
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
              handleUpdateTask(todo.id, taskId, newTitle)
            }
            onEditInputKeyDown={(taskId, e) =>
              handleEditInputKeyDown(todo.id, taskId, e)
            }
            onToggleTask={(taskId) => handleToggleTask(todo.id, taskId)}
            onDeleteTask={(taskId) => handleDeleteTask(todo.id, taskId)}
            onDeleteTodo={() => handleDeleteTodo(todo.id)}
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

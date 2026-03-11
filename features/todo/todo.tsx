import { useState } from 'react';
import {
  Send,
  MoreVertical,
  Trash2,
  Plus,
  Circle,
  CheckCircle2,
} from 'lucide-react';
import { AddTodo } from 'features/todo/ui/modal/addTodoModal';
import { Button } from 'shared/ui/components/button';
import { Input } from 'shared/ui/components/input';

interface TodoTask {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoItem {
  id: string;
  title: string;
  completed: number;
  total: number;
  tasks: TodoTask[];
}

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const handleAddTodo = (title: string) => {
    const newTodo: TodoItem = {
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4 text-center">
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

          <AddTodo onAddTodo={handleAddTodo} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {todo.title}
                    <span className="text-sm font-normal text-gray-400">
                      {todo.completed}/{todo.total}
                    </span>
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="더보기"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>

                <div className="mt-3">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${todo.total > 0 ? (todo.completed / todo.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {todo.tasks.length === 0 ? (
                    <p className="text-lg text-blue-500">
                      첫 할 일을 적어보세요!
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {todo.tasks.map((task) => (
                        <li
                          key={task.id}
                          className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 ${
                            task.completed ? 'bg-blue-50' : ''
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => handleToggleTask(todo.id, task.id)}
                            className="shrink-0 rounded p-0 hover:opacity-80"
                            aria-label={
                              task.completed
                                ? `${task.title} 완료 해제`
                                : `${task.title} 완료`
                            }
                            aria-pressed={task.completed}
                          >
                            {task.completed ? (
                              <CheckCircle2
                                className="h-5 w-5 shrink-0 text-main1"
                                aria-hidden
                              />
                            ) : (
                              <Circle
                                className="h-5 w-5 shrink-0 text-gray-400"
                                aria-hidden
                              />
                            )}
                          </button>
                          <div className="flex min-w-0 flex-1">
                            {editingTask?.goalId === todo.id &&
                            editingTask?.taskId === task.id ? (
                              <Input
                                type="text"
                                autoFocus
                                value={editingTaskInput}
                                onChange={(e) =>
                                  setEditingTaskInput(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  handleEditInputKeyDown(todo.id, task.id, e)
                                }
                                onBlur={() =>
                                  handleUpdateTask(
                                    todo.id,
                                    task.id,
                                    editingTaskInput
                                  )
                                }
                                className="h-auto border-none px-0 py-0 text-base focus-visible:ring-0"
                                aria-label="할 일 수정"
                              />
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  handleStartEdit(todo.id, task.id, task.title)
                                }
                                className="min-w-0 flex-1 text-left"
                              >
                                <span
                                  className={`text-base ${
                                    task.completed
                                      ? 'text-main1 font-medium'
                                      : 'text-sub2'
                                  }`}
                                >
                                  {task.title}
                                </span>
                              </button>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDeleteTask(todo.id, task.id)}
                            aria-label={`${task.title} 삭제`}
                          >
                            <Trash2 className="h-4 w-4 text-gray-400" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-1 items-center gap-2 pt-5">
                    <Plus className="h-4 w-4 shrink-0 text-sub2" />
                    <Input
                      type="text"
                      placeholder="할 일을 입력하세요"
                      value={taskInputs[todo.id] ?? ''}
                      onChange={(e) =>
                        handleTaskInputChange(todo.id, e.target.value)
                      }
                      onKeyDown={(e) => handleTaskInputKeyDown(todo.id, e)}
                      className="border-none text-lg text-sub2 placeholder:text-sub2 focus-visible:border focus-visible:border-gray-300 focus-visible:ring-0"
                      aria-label="할 일 입력"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                    aria-label="삭제"
                  >
                    <Trash2 className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
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

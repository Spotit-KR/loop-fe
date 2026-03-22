import { MoreVertical, Trash2, Plus, Circle, CheckCircle2 } from 'lucide-react';
import { Button } from 'shared/ui/components/button';
import { Input } from 'shared/ui/components/input';

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

interface TodoItemProps {
  todo: TodoGoal;
  taskInput: string;
  onTaskInputChange: (value: string) => void;
  onTaskInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  editingTask: { goalId: string; taskId: string } | null;
  editingTaskInput: string;
  onEditingTaskInputChange: (value: string) => void;
  onStartEdit: (taskId: string, title: string) => void;
  onUpdateTask: (taskId: string, newTitle: string) => void | Promise<void>;
  onEditInputKeyDown: (
    taskId: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteTodo: () => void;
}

export const TodoItem = ({
  todo,
  taskInput,
  onTaskInputChange,
  onTaskInputKeyDown,
  editingTask,
  editingTaskInput,
  onEditingTaskInputChange,
  onStartEdit,
  onUpdateTask,
  onEditInputKeyDown,
  onToggleTask,
  onDeleteTask,
  onDeleteTodo,
}: TodoItemProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {todo.title}
              <span className="ml-2 text-sm font-normal text-gray-400">
                {todo.completed} / {todo.total}
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
              <p className="text-lg text-blue-500">첫 할 일을 적어보세요!</p>
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
                      onClick={() => onToggleTask(task.id)}
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
                            onEditingTaskInputChange(e.target.value)
                          }
                          onKeyDown={(e) =>
                            onEditInputKeyDown(task.id, e)
                          }
                          onBlur={() =>
                            onUpdateTask(task.id, editingTaskInput)
                          }
                          className="h-auto border-none px-0 py-0 text-base md:text-base focus-visible:ring-0"
                          aria-label="할 일 수정"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            onStartEdit(task.id, task.title)
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
                      onClick={() => onDeleteTask(task.id)}
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
                value={taskInput}
                onChange={(e) => onTaskInputChange(e.target.value)}
                onKeyDown={onTaskInputKeyDown}
                className="border-none text-base md:text-base text-sub2 placeholder:text-sub2 focus-visible:border focus-visible:border-gray-300 focus-visible:ring-0"
                aria-label="할 일 입력"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onDeleteTodo}
              aria-label="삭제"
            >
              <Trash2 className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Send, MoreVertical, Trash2, Plus } from "lucide-react";
import { AddTodo } from "./ui/modal/addTodo";
import { Separator } from "~/components/ui/separator";

interface TodoItem {
  id: string;
  title: string;
  completed: number;
  total: number;
}

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const handleAddTodo = (title: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title,
      completed: 0,
      total: 0,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
              첫 업로드 작으시면 목표를 먼저 생성하세요
            </p>
          </div>

          <AddTodo onAddTodo={handleAddTodo} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
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
                    {todo.title}{" "}
                    <span className="text-sm font-normal text-gray-400">
                      {todo.completed}/{todo.total}
                    </span>
                  </h3>
                  <button
                    type="button"
                    className="rounded-md p-1 hover:bg-gray-100"
                    aria-label="더보기"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
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

                <div className="mt-4">
                  <p className="text-sm font-medium text-blue-500">
                    첫 할 일을 적어보세요!
                  </p>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">할 일을 입력하세요</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="rounded-md p-1 hover:bg-gray-100"
                    aria-label="삭제"
                  >
                    <Trash2 className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

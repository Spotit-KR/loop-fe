import { useMemo, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from 'shared/ui/components/button';
import { Input } from 'shared/ui/components/input';
import { useGoals } from 'shared/context/GoalsContext';
import { useMyGoals } from 'features/goals/model/useMyGoals';
import { useTask } from 'features/task/model/useTask';
import { formatDateToYYYYMMDD } from 'shared/utils';
import { AddGoalModal } from 'features/goals/ui/AddGoalModal';
import { TodoHeader } from 'features/todo/TodoHeader';
import { TodoItem } from 'features/todo/TodoItem';
import { useMyReviews } from 'features/history';
import { TodayReview } from 'entities/review';
import { ReviewStartModal } from 'features/review';

export const Todo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const dateString = selectedDate.toISOString().split('T')[0];

  const { myReviews } = useMyReviews({ date: dateString });
  const todayReview = myReviews[0] ?? null;
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  // History 페이지(useMyReviews)와 동일하게 페이지에서 직접 myGoals 쿼리 호출
  const {
    myGoals,
    loading: goalsLoading,
    refetch: refetchGoals,
  } = useMyGoals();
  const {
    addGoal: handleAddTodo,
    addTask: handleAddTask,
    toggleTask: handleToggleTask,
    deleteTask: handleDeleteTask,
    updateTask: handleUpdateTask,
    deleteGoal: handleDeleteTodo,
  } = useGoals();

  const goals = useMemo(
    () =>
      myGoals.map((g) => ({
        id: String(g.id),
        title: g.title,
        completedTaskCount: g.completedTaskCount,
        totalTaskCount: g.totalTaskCount,
        achievementRate: g.achievementRate,
      })),
    [myGoals]
  );

  const dateStr = formatDateToYYYYMMDD(selectedDate);
  const { myTasks, refetch: refetchTasks } = useTask({
    startDate: dateStr,
    endDate: dateStr,
  });

  // 해당 날짜에 task가 있는 goal만 표시. task가 없으면 전체 goal 표시(할 일 추가 가능)
  const { todos, hiddenGoalIds } = useMemo(() => {
    const goalsWithTasksOnDate = goals.filter((goal) =>
      myTasks.some((t) => String(t.goalId) === goal.id)
    );
    const goalsToShow =
      goalsWithTasksOnDate.length > 0 ? goalsWithTasksOnDate : goals;
    const hiddenGoalIds = goals
      .filter((g) => !goalsToShow.some((s) => s.id === g.id))
      .map((g) => g.id);

    const todosResult = goalsToShow.map((goal) => {
      const goalTasks = myTasks.filter((t) => String(t.goalId) === goal.id);
      const completedCount = goalTasks.filter(
        (t) => t.status === 'DONE'
      ).length;
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

    return { todos: todosResult, hiddenGoalIds };
  }, [goals, myTasks]);

  const hiddenGoals = useMemo(
    () => goals.filter((g) => hiddenGoalIds.includes(g.id)),
    [goals, hiddenGoalIds]
  );

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
  const [isAddOtherGoalsOpen, setIsAddOtherGoalsOpen] = useState(false);
  const isSubmittingRef = useRef(false);
  const [editingTask, setEditingTask] = useState<{
    goalId: string;
    taskId: string;
  } | null>(null);
  const [editingTaskInput, setEditingTaskInput] = useState('');

  const handleAddTaskWithReset = async (goalId: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    try {
      await handleAddTask(goalId, trimmed, dateStr);
      refetchTasks();
      refetchGoals();
      setTaskInputs((prev) => ({ ...prev, [goalId]: '' }));
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleToggleTaskWrapper = (goalId: string, taskId: string) => {
    handleToggleTask(goalId, taskId);
  };

  const handleDeleteTaskWrapper = async (goalId: string, taskId: string) => {
    await handleDeleteTask(goalId, taskId);
    refetchTasks();
  };

  const handleTaskInputKeyDown = (
    goalId: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
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

  const handleUpdateTaskWrapper = async (
    goalId: string,
    taskId: string,
    newTitle: string
  ) => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      setEditingTask(null);
      return;
    }
    try {
      await handleUpdateTask(goalId, taskId, trimmed);
      await refetchTasks();
      setEditingTask(null);
    } catch {
      // 실패 시 편집 상태 유지
    }
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

  if (goalsLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl pt-8">
          <TodoHeader
            selectedDate={selectedDate}
            onPrevDate={handlePrevDate}
            onNextDate={handleNextDate}
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="text-sub2">목표를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (goals.length === 0) {
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
          onAddGoal={async (title) => {
            await handleAddTodo(title);
            refetchGoals();
          }}
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
            onToggleTask={(taskId) => handleToggleTaskWrapper(todo.id, taskId)}
            onDeleteTask={(taskId) => handleDeleteTaskWrapper(todo.id, taskId)}
            onDeleteTodo={() => handleDeleteTodoWrapper(todo.id)}
          />
        ))}
        {hiddenGoals.length > 0 && (
          <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
            <button
              type="button"
              onClick={() => setIsAddOtherGoalsOpen((prev) => !prev)}
              className="flex w-full items-center justify-between text-left text-base text-sub2 hover:text-main2"
              aria-expanded={isAddOtherGoalsOpen}
              aria-label={
                isAddOtherGoalsOpen
                  ? '다른 목표에 할 일 추가 접기'
                  : '다른 목표에 할 일 추가 펼치기'
              }
            >
              <span>다른 목표에 할 일 추가</span>
              <span className="text-xl" aria-hidden>
                {isAddOtherGoalsOpen ? '−' : '+'}
              </span>
            </button>
            {isAddOtherGoalsOpen && (
              <div className="mt-4 space-y-3">
                {hiddenGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2"
                  >
                    <span className="shrink-0 text-sm text-sub2">
                      {goal.title}
                    </span>
                    <Input
                      type="text"
                      placeholder="할 일 입력"
                      value={taskInputs[goal.id] ?? ''}
                      onChange={(e) =>
                        handleTaskInputChange(goal.id, e.target.value)
                      }
                      onKeyDown={(e) => handleTaskInputKeyDown(goal.id, e)}
                      className="flex-1 border-none text-base md:text-base focus-visible:ring-0"
                      aria-label={`${goal.title}에 할 일 추가`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="flex items-center justify-center">
          <p className="mt-5 text-lg text-sub2">
            다른 목표를 만들고 싶다면 목표에서 추가할 수 있어요 →
          </p>
        </div>
        <div className="w-full">
          {todayReview ? (
            <TodayReview steps={todayReview.steps} />
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full max-w-215 mt-30 py-4 bg-main1 text-white rounded-[10px] text-[20px] font-medium cursor-pointer"
              >
                오늘 하루 회고로 마무리하기
              </button>
            </div>
          )}
        </div>
        {isModalOpen && (
          <ReviewStartModal
            onClose={() => setIsModalOpen(false)}
            date={dateStr}
          />
        )}
      </div>
    </div>
  );
};

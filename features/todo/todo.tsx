import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Send } from 'lucide-react';
import { Button } from 'shared/ui/components/button';
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

function sortByCreatedAtAsc<T extends { id: string; createdAt: Date }>(
  list: T[]
): T[] {
  return [...list].sort((a, b) => {
    const byTime = a.createdAt.getTime() - b.createdAt.getTime();
    if (byTime !== 0) return byTime;
    return a.id.localeCompare(b.id);
  });
}

export const Todo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  const { myReviews } = useMyReviews({
    date: formatDateToYYYYMMDD(selectedDate),
  });
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
        createdAt: g.createdAt,
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
    const goalsToShowRaw =
      goalsWithTasksOnDate.length > 0 ? goalsWithTasksOnDate : goals;
    const goalsToShow = sortByCreatedAtAsc(goalsToShowRaw);
    const hiddenGoalIds = goals
      .filter((g) => !goalsToShow.some((s) => s.id === g.id))
      .map((g) => g.id);

    const todosResult = goalsToShow.map((goal) => {
      const goalTasks = sortByCreatedAtAsc(
        myTasks.filter((t) => String(t.goalId) === goal.id)
      );
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
    () => sortByCreatedAtAsc(goals.filter((g) => hiddenGoalIds.includes(g.id))),
    [goals, hiddenGoalIds]
  );

  const [expandedHiddenGoalIds, setExpandedHiddenGoalIds] = useState<
    Set<string>
  >(() => new Set());

  useEffect(() => {
    const hiddenIds = new Set(hiddenGoals.map((g) => g.id));
    setExpandedHiddenGoalIds((prev) => {
      const next = new Set(
        [...prev].filter((id) => hiddenIds.has(id))
      );
      if (next.size === prev.size && [...prev].every((id) => next.has(id))) {
        return prev;
      }
      return next;
    });
  }, [hiddenGoals]);

  const allTasksDone = useMemo(
    () =>
      todos.length > 0 &&
      todos.every((t) => t.total > 0 && t.completed === t.total),
    [todos]
  );

  const canStartReview = useMemo(() => {
    const nowKST = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
    );
    const todayKST = new Date(nowKST);
    todayKST.setHours(0, 0, 0, 0);

    const selectedDateOnly = new Date(selectedDate);
    selectedDateOnly.setHours(0, 0, 0, 0);

    const diffDays = Math.round(
      (todayKST.getTime() - selectedDateOnly.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return false; // 미래
    if (diffDays > 3) return false; // 3일 초과 과거
    if (diffDays > 0) return true;  // 1~3일 전 과거

    // 오늘: 모든 할일 완료 또는 밤 1시(01:00) 이후
    const isAfter1amKST = nowKST.getHours() >= 1;
    return allTasksDone || isAfter1amKST;
  }, [selectedDate, allTasksDone]);

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

  const handleToggleTaskWrapper = async (goalId: string, taskId: string) => {
    const task = myTasks.find((t) => t.id === taskId);
    if (!task) return;

    const nextStatus = task.status === 'DONE' ? 'TODO' : 'DONE';
    try {
      await handleToggleTask(goalId, taskId, nextStatus);
      await refetchTasks();
      await refetchGoals();
    } catch {
      // 토글 실패 시 UI는 refetch 전 상태 유지
    }
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

  const handleDeleteTodoWrapper = async (id: string) => {
    try {
      await handleDeleteTodo(id);
      await refetchTasks();
      await refetchGoals();
    } catch {
      // 삭제 실패 시 UI 유지
    }
  };

  const handleClickExpandHiddenGoal = (goalId: string) => {
    setExpandedHiddenGoalIds((prev) => {
      const next = new Set(prev);
      next.add(goalId);
      return next;
    });
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
        {hiddenGoals.length > 0 ? (
          <div className="space-y-4">
            {hiddenGoals.some((g) => expandedHiddenGoalIds.has(g.id)) ? (
              <div className="flex w-full min-w-0 flex-col gap-4">
                {hiddenGoals
                  .filter((g) => expandedHiddenGoalIds.has(g.id))
                  .map((goal) => (
                    <TodoItem
                      key={goal.id}
                      todo={{
                        id: goal.id,
                        title: goal.title,
                        completed: 0,
                        total: 0,
                        tasks: [],
                      }}
                      taskInput={taskInputs[goal.id] ?? ''}
                      onTaskInputChange={(value) =>
                        handleTaskInputChange(goal.id, value)
                      }
                      onTaskInputKeyDown={(e) =>
                        handleTaskInputKeyDown(goal.id, e)
                      }
                      editingTask={editingTask}
                      editingTaskInput={editingTaskInput}
                      onEditingTaskInputChange={setEditingTaskInput}
                      onStartEdit={(taskId, title) =>
                        handleStartEdit(goal.id, taskId, title)
                      }
                      onUpdateTask={(taskId, newTitle) =>
                        handleUpdateTaskWrapper(goal.id, taskId, newTitle)
                      }
                      onEditInputKeyDown={(taskId, e) =>
                        handleEditInputKeyDown(goal.id, taskId, e)
                      }
                      onToggleTask={(taskId) =>
                        handleToggleTaskWrapper(goal.id, taskId)
                      }
                      onDeleteTask={(taskId) =>
                        handleDeleteTaskWrapper(goal.id, taskId)
                      }
                      onDeleteTodo={() => handleDeleteTodoWrapper(goal.id)}
                      hideFirstTaskHint
                    />
                  ))}
              </div>
            ) : null}
            {hiddenGoals.some((g) => !expandedHiddenGoalIds.has(g.id)) ? (
              <div className="flex flex-wrap justify-start gap-2 sm:gap-3">
                {hiddenGoals
                  .filter((g) => !expandedHiddenGoalIds.has(g.id))
                  .map((goal) => (
                    <div
                      key={goal.id}
                      className="min-w-0 max-w-full shrink"
                    >
                      <button
                        type="button"
                        onClick={() => handleClickExpandHiddenGoal(goal.id)}
                        aria-expanded={false}
                        aria-label={`${goal.title}, 할 일 입력 펼치기`}
                        className="inline-flex max-w-full min-w-0 rounded-[15px] bg-sub3 px-4 py-3 text-left text-sm text-gray-600 transition-colors hover:bg-gray-300/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 sm:px-6"
                      >
                        <span className="line-clamp-2 wrap-break-word">
                          {goal.title}
                        </span>
                      </button>
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="flex items-center justify-center">
          <Link
            to="/goals"
            className="mt-5 cursor-pointer text-lg text-sub2 underline-offset-4 transition-colors "
            aria-label="목표 관리 페이지로 이동하여 다른 목표 추가하기"
          >
            다른 목표를 만들고 싶다면 목표에서 추가할 수 있어요 →
          </Link>
        </div>
        <div className="w-full">
          {todayReview ? (
            <TodayReview steps={todayReview.steps} />
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => canStartReview && setIsModalOpen(true)}
                disabled={!canStartReview}
                className={`w-full max-w-215 mt-30 py-4 rounded-[10px] text-[20px] font-medium transition-colors ${
                  canStartReview
                    ? 'bg-main1 text-white cursor-pointer'
                    : 'bg-sub3 text-sub2 cursor-not-allowed'
                }`}
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

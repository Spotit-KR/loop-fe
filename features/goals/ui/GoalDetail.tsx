import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Menu } from '@base-ui/react/menu';
import { CheckCircle2, Circle, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from 'shared/ui/components/button';
import { BackArrowIcon } from 'shared/ui';
import { useGoals } from 'shared/context/GoalsContext';
import { useTask } from 'features/task/model/useTask';
import { EditGoalModal } from 'features/goals/ui/EditGoalModal';
import { DeleteGoalModal } from 'features/goals/ui/DeleteGoalModal';
import {
  formatMonthWeekLabel,
  formatMonthWeekLabelFromKey,
  getMonthWeekKey,
  getPreviousMonthWeekKey,
} from 'features/goals/lib/monthWeekLabel';
import { cn } from 'shared/lib/utils';

interface GoalDetailProps {
  goalId: string;
  onBack: () => void;
}

export function GoalDetail({ goalId, onBack }: GoalDetailProps) {
  const navigate = useNavigate();
  const { goals, updateGoal, deleteGoal, refetch: refetchGoals } = useGoals();
  const { myTasks, refetch: refetchTasks } = useTask({ goalId });
  const goal = goals.find((g) => g.id === goalId);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  /** 가장 최근 할 일이 속한 주차 + 그 직전 주차만 (최대 2개) — goal 유무와 무관하게 훅 순서 유지 */
  const twoWeekSections = useMemo(() => {
    if (myTasks.length === 0) return [];

    const map = new Map<string, typeof myTasks>();
    for (const task of myTasks) {
      const key = getMonthWeekKey(task.taskDate);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(task);
    }
    for (const list of map.values()) {
      list.sort((a, b) => {
        const byDate = a.taskDate.getTime() - b.taskDate.getTime();
        if (byDate !== 0) return byDate;
        return a.createdAt.getTime() - b.createdAt.getTime();
      });
    }

    const maxDate = myTasks.reduce(
      (max, t) => (t.taskDate > max ? t.taskDate : max),
      myTasks[0].taskDate
    );
    const recentKey = getMonthWeekKey(maxDate);
    const prevKey = getPreviousMonthWeekKey(recentKey);

    return [
      { weekKey: recentKey, tasks: map.get(recentKey) ?? [] },
      { weekKey: prevKey, tasks: map.get(prevKey) ?? [] },
    ];
  }, [myTasks]);

  if (!goal) {
    return null;
  }

  const achievementRateRounded = Math.round(goal.achievementRate);

  const handleSaveGoal = async (title: string) => {
    await updateGoal(goalId, title);
  };

  const handleOpenEdit = () => {
    setIsEditOpen(true);
  };

  const handleOpenDelete = () => {
    setIsDeleteOpen(true);
  };

  /** TodoItem `onDeleteTodo` → `handleDeleteTodoWrapper`와 동일한 순서: 목표 삭제 후 태스크·목표 쿼리 갱신 */
  const handleConfirmDelete = async () => {
    await deleteGoal(goalId);
    await refetchTasks();
    await refetchGoals();
    navigate('/goals');
  };

  return (
    <div className="flex min-h-full flex-col bg-gray-50 p-10 ">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8">
          <button
            type="button"
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-main2 hover:text-main1"
            aria-label="목표 관리로 돌아가기"
          >
            <BackArrowIcon className="h-5 w-5" />
            <span className="text-base font-medium">목표 관리</span>
          </button>
          <div className="flex items-start justify-between gap-4">
            <h1 className="min-w-0 flex-1 text-2xl font-bold text-main2">
              {goal.title}
            </h1>
            <Menu.Root modal={false}>
              <Menu.Trigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="목표 옵션"
                    aria-haspopup="menu"
                  />
                }
              >
                <MoreVertical className="h-5 w-5 text-sub2" aria-hidden />
              </Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner
                  className="z-50 outline-none"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                  positionMethod="fixed"
                >
                  <Menu.Popup
                    className={cn(
                      'min-w-[160px] origin-(--transform-origin) rounded-xl bg-white p-1 shadow-lg ring-1 ring-gray-200 outline-none',
                      'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
                      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95'
                    )}
                  >
                    <Menu.Item
                      className={cn(
                        'flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-main2 outline-none',
                        'data-highlighted:bg-gray-50'
                      )}
                      onClick={handleOpenEdit}
                    >
                      <Pencil className="h-4 w-4 shrink-0" aria-hidden />
                      수정
                    </Menu.Item>
                    <Menu.Item
                      className={cn(
                        'flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 outline-none',
                        'data-highlighted:bg-red-50'
                      )}
                      onClick={handleOpenDelete}
                    >
                      <Trash2 className="h-4 w-4 shrink-0" aria-hidden />
                      삭제
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
          </div>
        </header>

        <EditGoalModal
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          initialTitle={goal.title}
          onSave={handleSaveGoal}
        />

        <DeleteGoalModal
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={handleConfirmDelete}
        />

        <div className="flex max-w-2xl flex-col gap-6">
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center justify-around gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-main2">
                  {goal.completedTaskCount}
                </span>
                <span className="mt-1 text-sm text-sub2">완료한 액션</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-main2">
                  {goal.totalTaskCount}
                </span>
                <span className="mt-1 text-sm text-sub2">총 액션</span>
              </div>
            </div>
            <div className="my-4 border-t border-sub3" />
            <p className="text-center text-sm text-sub2">
              달성률 {achievementRateRounded}%
            </p>
          </div>

          {myTasks.length === 0 ? (
            <p className="text-center text-sm text-sub2">아직 할 일이 없어요</p>
          ) : (
            <div className="flex flex-col">
              {twoWeekSections.map(({ weekKey, tasks: weekTasks }, groupIndex) => {
                const weekLabel =
                  weekTasks.length > 0
                    ? formatMonthWeekLabel(weekTasks[0].taskDate)
                    : formatMonthWeekLabelFromKey(weekKey);

                return (
                  <section
                    key={weekKey}
                    aria-label={`${weekLabel} 할 일`}
                  >
                    {groupIndex > 0 ? (
                      <div
                        className="my-5 border-t border-gray-200"
                        aria-hidden
                      />
                    ) : null}
                    <div className="flex gap-4 sm:gap-6">
                      <div className="w-18 shrink-0 pt-0.5 text-sm font-medium text-sub2 sm:w-24">
                        {weekLabel}
                      </div>
                      <ul className="min-w-0 flex-1 space-y-3">
                        {weekTasks.length === 0 ? (
                          <li className="text-sm text-sub2">
                            이 주차에 등록된 할 일이 없어요
                          </li>
                        ) : (
                          weekTasks.map((task) => {
                            const done = task.status === 'DONE';
                            return (
                              <li
                                key={task.id}
                                className="flex items-start gap-2.5"
                              >
                                {done ? (
                                  <CheckCircle2
                                    className="mt-0.5 h-5 w-5 shrink-0 text-main1"
                                    aria-hidden
                                  />
                                ) : (
                                  <Circle
                                    className="mt-0.5 h-5 w-5 shrink-0 text-gray-400"
                                    aria-hidden
                                  />
                                )}
                                <span
                                  className={cn(
                                    'text-base leading-snug',
                                    done
                                      ? 'font-medium text-main1'
                                      : 'text-main2'
                                  )}
                                >
                                  {task.title}
                                </span>
                              </li>
                            );
                          })
                        )}
                      </ul>
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

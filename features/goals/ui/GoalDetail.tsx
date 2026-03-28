import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Menu } from '@base-ui/react/menu';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from 'shared/ui/components/button';
import { BackArrowIcon } from 'shared/ui';
import { useGoals } from 'shared/context/GoalsContext';
import { useTask } from 'features/task/model/useTask';
import { EditGoalModal } from 'features/goals/ui/EditGoalModal';
import { DeleteGoalModal } from 'features/goals/ui/DeleteGoalModal';
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

  if (!goal) {
    return null;
  }

  const achievementRate = goal.achievementRate;

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
              달성률 {achievementRate}%
            </p>
          </div>

          {myTasks.length === 0 ? (
            <p className="text-center text-sm text-sub2">아직 할 일이 없어요</p>
          ) : (
            <ul className="space-y-2">
              {myTasks.map((task) => (
                <li
                  key={task.id}
                  className={`rounded-lg px-4 py-3 ${
                    task.status === 'DONE' ? 'bg-main1/10' : 'bg-white'
                  } ring-1 ring-gray-200`}
                >
                  <span
                    className={
                      task.status === 'DONE'
                        ? 'text-sub2 line-through'
                        : 'text-main2'
                    }
                  >
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

import { MoreVertical } from 'lucide-react';
import { Button } from 'shared/ui/components/button';
import { BackArrowIcon } from 'shared/ui';
import { useGoals } from 'shared/context/GoalsContext';

interface GoalDetailProps {
  goalId: string;
  onBack: () => void;
}

export function GoalDetail({ goalId, onBack }: GoalDetailProps) {
  const { goals } = useGoals();
  const goal = goals.find((g) => g.id === goalId);

  if (!goal) {
    return null;
  }

  const achievementRate =
    goal.total > 0 ? Math.round((goal.completed / goal.total) * 100) : 0;

  return (
    <div className="flex min-h-full flex-col bg-gray-50 p-10">
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
          <h1 className="text-2xl font-bold text-main2">{goal.title}</h1>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="목표 옵션"
          >
            <MoreVertical className="h-5 w-5 text-sub2" />
          </Button>
        </div>
      </header>

      <div className="flex max-w-2xl flex-col gap-6">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="flex items-center justify-around gap-4">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-main2">
                {goal.completed}
              </span>
              <span className="mt-1 text-sm text-sub2">완료한 액션</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-main2">{goal.total}</span>
              <span className="mt-1 text-sm text-sub2">총 액션</span>
            </div>
          </div>
          <div className="my-4 border-t border-sub3" />
          <p className="text-center text-sm text-sub2">
            달성률 {achievementRate}%
          </p>
        </div>

        {goal.tasks.length === 0 ? (
          <p className="text-center text-sm text-sub2">
            아직 할 일이 없어요
          </p>
        ) : (
          <ul className="space-y-2">
            {goal.tasks.map((task) => (
              <li
                key={task.id}
                className={`rounded-lg px-4 py-3 ${
                  task.completed ? 'bg-main1/10' : 'bg-white'
                } ring-1 ring-gray-200`}
              >
                <span
                  className={
                    task.completed ? 'text-sub2 line-through' : 'text-main2'
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
  );
}

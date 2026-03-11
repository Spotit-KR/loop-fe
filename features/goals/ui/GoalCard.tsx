import { ChevronRight } from 'lucide-react';

export interface GoalCardProps {
  goal: {
    id: string;
    title: string;
    completed: number;
    total: number;
  };
}

export function GoalCard({ goal }: GoalCardProps) {
  const progressPercent =
    goal.total > 0 ? (goal.completed / goal.total) * 100 : 0;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-main2">{goal.title}</h3>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-sub3">
              <div
                className="h-full bg-main1 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="shrink-0 text-sm text-sub2">
              {goal.completed} / {goal.total}
            </span>
          </div>
        </div>
        <ChevronRight
          className="h-5 w-5 shrink-0 text-sub2"
          aria-hidden
        />
      </div>
    </div>
  );
}

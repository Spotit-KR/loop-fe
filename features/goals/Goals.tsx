import { useState } from 'react';
import { Plus, Send } from 'lucide-react';
import { Button } from 'shared/ui/components/button';
import { useGoals } from 'shared/context/GoalsContext';
import { GoalsHeader } from 'features/goals/ui/GoalsHeader';
import { AddGoalModal } from 'features/goals/ui/AddGoalModal';
import { GoalCard } from 'features/goals/ui/GoalCard';

export interface Goal {
  id: string;
  title: string;
  completedTaskCount: number;
  totalTaskCount: number;
  achievementRate?: number;
}

export function Goals() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { goals, addGoal, loading, error } = useGoals();

  const handleAddGoalClick = () => {
    setIsAddModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center bg-gray-50 p-10">
        <p className="text-sub2">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center bg-gray-50 p-10">
        <p className="text-red-500">목표를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="flex min-h-full flex-col bg-gray-50 p-10">
        <div className="mb-8">
          <GoalsHeader onAddGoalClick={handleAddGoalClick} />
        </div>
        <AddGoalModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onAddGoal={addGoal}
        />
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
            <Send className="h-8 w-8 text-gray-600" aria-hidden />
          </div>

          <div className="mt-6 space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              아직 목표가 없어요
            </h2>
            <p className="text-sm text-gray-500">
              할 일을 적으려면 목표를 먼저 생성하세요
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-gray-50 p-10">
      <div className="mb-8">
        <GoalsHeader onAddGoalClick={handleAddGoalClick} />
      </div>
      <AddGoalModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddGoal={addGoal}
      />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}

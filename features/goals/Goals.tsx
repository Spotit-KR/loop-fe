import { useState } from 'react';
import { Plus, Send } from 'lucide-react';
import { Button } from 'shared/ui/components/button';
import { GoalsHeader } from 'features/goals/GoalsHeader';
import { AddGoalModal } from 'features/goals/ui/AddGoalModal';

export interface Goal {
  id: string;
  title: string;
}

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddGoal = (title: string) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title,
    };
    setGoals([...goals, newGoal]);
  };

  const handleAddGoalClick = () => {
    setIsAddModalOpen(true);
  };

  if (goals.length === 0) {
    return (
      <div className="flex min-h-full flex-col bg-gray-50 p-10">
        <div className="mb-8">
          <GoalsHeader onAddGoalClick={handleAddGoalClick} />
        </div>
        <AddGoalModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onAddGoal={handleAddGoal}
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
        onAddGoal={handleAddGoal}
      />
      <div className="flex-1">{/* TODO: 목표 목록 렌더링 */}</div>
    </div>
  );
}

import { Plus } from 'lucide-react';
import { Button } from 'shared/ui/components/button';

interface GoalsHeaderProps {
  onAddGoalClick: () => void;
}

export function GoalsHeader({ onAddGoalClick }: GoalsHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-main2">목표</h1>
      <Button
        type="button"
        onClick={onAddGoalClick}
        className="h-13 rounded-lg bg-main1 px-6 py-3 text-base font-medium text-white hover:bg-main1/90"
        aria-label="새 목표 추가"
      >
        <Plus className="mr-2 h-5 w-5 shrink-0" aria-hidden />새 목표
      </Button>
    </header>
  );
}

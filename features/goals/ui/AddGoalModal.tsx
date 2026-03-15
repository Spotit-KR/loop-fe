import { useState, useEffect } from 'react';
import { Button } from 'shared/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'shared/ui/components/dialog';
import { Input } from 'shared/ui/components/input';

interface AddGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (title: string) => void | Promise<void>;
}

export function AddGoalModal({
  open,
  onOpenChange,
  onAddGoal,
}: AddGoalModalProps) {
  const [goalText, setGoalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setGoalText('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalText.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddGoal(goalText);
      setGoalText('');
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setGoalText('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            새 목표 만들기
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <Input
              id="goal-input"
              name="goal"
              placeholder="목표를 입력하세요 ex) OOO여기"
              value={goalText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setGoalText(e.target.value)
              }
              className="h-16 w-full px-5 py-4"
              autoFocus
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="h-12 flex-1 px-6 py-3"
                />
              }
            >
              취소
            </DialogClose>
            <Button
              type="submit"
              className="h-12 flex-1 bg-main1 px-6 py-3 hover:bg-main1/90"
              disabled={!goalText.trim() || isSubmitting}
            >
              {isSubmitting ? '만드는 중...' : '만들기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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

interface EditGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTitle: string;
  onSave: (title: string) => void | Promise<void>;
}

export function EditGoalModal({
  open,
  onOpenChange,
  initialTitle,
  onSave,
}: EditGoalModalProps) {
  const [goalText, setGoalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setGoalText(initialTitle);
    }
  }, [open, initialTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalText.trim()) return;

    setIsSubmitting(true);
    try {
      await onSave(goalText);
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
          <DialogTitle className="text-xl font-semibold">목표 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <Input
              id="edit-goal-input"
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
              {isSubmitting ? '수정 중...' : '수정하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

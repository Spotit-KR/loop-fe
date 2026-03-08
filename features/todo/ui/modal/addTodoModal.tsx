import { useState } from 'react';
import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Input } from 'components/ui/input';

interface AddTodoProps {
  onAddTodo: (title: string) => void;
}

export function AddTodo({ onAddTodo }: AddTodoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [goalText, setGoalText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalText.trim()) return;

    onAddTodo(goalText);
    setGoalText('');
    setIsOpen(false);
  };

  const handleCancel = () => {
    setGoalText('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button className="rounded-xl bg-blue-500 px-10 py-7 text-base font-medium text-white hover:bg-blue-600" />
        }
      >
        첫 목표 만들기
      </DialogTrigger>
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
              className="w-full h-16 px-5 py-4"
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
                  className="flex-1 h-12 px-6 py-3"
                />
              }
            >
              취소
            </DialogClose>
            <Button
              type="submit"
              className="flex-1 h-12 bg-blue-500 px-6 py-3 hover:bg-blue-600"
              disabled={!goalText.trim()}
            >
              만들기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

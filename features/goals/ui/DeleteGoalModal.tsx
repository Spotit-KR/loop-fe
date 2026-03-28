import { useState } from 'react';
import { Button } from 'shared/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'shared/ui/components/dialog';

interface DeleteGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
}

export function DeleteGoalModal({
  open,
  onOpenChange,
  onConfirm,
}: DeleteGoalModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenChange = (next: boolean) => {
    if (!isDeleting) {
      onOpenChange(next);
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (!isDeleting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg" showCloseButton={!isDeleting}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">목표 삭제</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-lg font-bold text-main2">
            정말로 삭제하실 건가요?
          </p>
          <p className="mt-3 text-center text-sm text-sub2">
            삭제하면 이 목표에 있던 모든 할일이 함께 사라져요.
          </p>
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <DialogClose
            render={
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="h-12 flex-1 px-6 py-3"
                disabled={isDeleting}
              />
            }
          >
            취소
          </DialogClose>
          <Button
            type="button"
            className="h-12 flex-1 bg-red-500 px-6 py-3 text-white hover:bg-red-500/90"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? '삭제 중...' : '삭제하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

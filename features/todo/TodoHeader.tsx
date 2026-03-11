import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'] as const;

const formatDateTitle = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = DAY_NAMES[date.getDay()];
  return `${month}월 ${day}일 ${dayName}요일`;
};

interface TodoHeaderProps {
  selectedDate: Date;
  onPrevDate: () => void;
  onNextDate: () => void;
}

export const TodoHeader = ({
  selectedDate,
  onPrevDate,
  onNextDate,
}: TodoHeaderProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrevDate}
        className="rounded p-2 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
        aria-label="이전 날짜"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" aria-hidden />
      </button>
      <h1 className="min-w-[200px] text-center text-xl font-semibold text-gray-900">
        {formatDateTitle(selectedDate)}
      </h1>
      <button
        type="button"
        onClick={onNextDate}
        className="rounded p-2 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
        aria-label="다음 날짜"
      >
        <ChevronRight className="h-6 w-6 text-gray-600" aria-hidden />
      </button>
    </div>
  );
};

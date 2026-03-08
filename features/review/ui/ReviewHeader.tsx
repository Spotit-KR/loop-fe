import { BackArrowIcon } from 'shared/ui';

interface ReviewHeaderProps {
  displayDate: string;
  onBack: () => void;
}

export function ReviewHeader({ displayDate, onBack }: ReviewHeaderProps) {
  return (
    <header className="h-[105px] bg-white border-b border-sub3 flex items-center px-[92px] gap-12 shrink-0">
      <button
        onClick={onBack}
        className="flex items-center justify-center w-4.5 h-8.75 cursor-pointer text-main2"
        aria-label="뒤로가기"
      >
        <BackArrowIcon className="w-full h-full" />
      </button>
      <h1 className="text-[25px] font-semibold text-main2">
        {displayDate} 회고
      </h1>
    </header>
  );
}

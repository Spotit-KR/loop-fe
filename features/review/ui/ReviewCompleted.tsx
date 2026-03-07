import { useNavigate } from 'react-router';
import { ReviewCompleteIcon } from 'shared/ui';

export function ReviewCompleted() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
      <ReviewCompleteIcon className="w-[50px] h-[50px] text-main1" />
      <p className="text-[30px] font-semibold text-main2">
        회고를 마쳤어요! 오늘도 수고했어요!!
      </p>
      <p className="text-[20px] text-sub1">
        내일은 오늘의 다짐을 꼭 실천해보세요
      </p>
      <button
        onClick={() => navigate('/')}
        className="w-67.75 h-17.25 bg-main1 rounded-[20px] text-[20px] font-medium text-white cursor-pointer"
      >
        오늘의 보드로 돌아가기
      </button>
    </div>
  );
}

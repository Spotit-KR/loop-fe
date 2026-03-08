import { useNavigate } from 'react-router';
import { Modal } from 'shared/ui';
import { formatMonthDay } from 'shared/utils';

interface ReviewStartModalProps {
  onClose: () => void;
  date: string; // "YYYY-MM-DD"
}

export function ReviewStartModal({ onClose, date }: ReviewStartModalProps) {
  const navigate = useNavigate();

  const displayDate = formatMonthDay(date);

  const handleGoReview = () => {
    navigate(`/review?type=day&date=${date}`);
  };

  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-[20px] w-[570px] px-[26px] py-[34px] flex flex-col gap-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h2 className="text-[25px] font-bold text-main2">
            {displayDate} 회고하기
          </h2>
          <button
            onClick={onClose}
            className="text-[25px] text-main2 leading-none cursor-pointer"
          >
            X
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="flex gap-4">
          <div className="flex-1 h-[161px] rounded-[10px] border border-green bg-green/15 flex flex-col items-center justify-center gap-2">
            <span className="text-[35px] font-semibold text-green">80%</span>
            <span className="text-[20px] text-sub2">달성률</span>
          </div>
          <div className="flex-1 h-[161px] rounded-[10px] border border-main1 bg-main1/10 flex flex-col items-center justify-center gap-2">
            <span className="text-[35px] font-semibold text-main1">8</span>
            <span className="text-[20px] text-sub2">완료</span>
          </div>
          <div className="flex-1 h-[161px] rounded-[10px] border border-red bg-red/15 flex flex-col items-center justify-center gap-2">
            <span className="text-[35px] font-semibold text-red">2</span>
            <span className="text-[20px] text-sub2">미완료</span>
          </div>
        </div>

        {/* 안내 문구 */}
        <p className="text-[15px] text-sub1 text-center">
          완료하지 않은 일이 남았습니다. 그래도 회고로 넘어갈까요?
        </p>

        {/* CTA */}
        <button
          onClick={handleGoReview}
          className="w-full h-13.5 bg-main1 rounded-[10px] text-[20px] font-medium text-white cursor-pointer"
        >
          회고하러 가기
        </button>
      </div>
    </Modal>
  );
}

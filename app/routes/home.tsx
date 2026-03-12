import { useState } from 'react';
import type { Route } from './+types/home';
import { ReviewStartModal } from 'features/review';
import { useMyReviews } from 'features/history';
import { TodayReview } from 'entities/review';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'LOOP' }];
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const dateStr = date.toISOString().split('T')[0];

  const { myReviews } = useMyReviews({ date: dateStr });
  const todayReview = myReviews[0] ?? null;

  console.log(todayReview, myReviews);
  return (
    <div className="flex flex-col h-full">
      <div className="w-full px-30">
        {todayReview ? (
          <TodayReview steps={todayReview.steps} />
        ) : (
          <div className="p-8 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full max-w-215 px-8 py-4 bg-main1 text-white rounded-[10px] text-[20px] font-medium cursor-pointer"
            >
              오늘 하루 회고로 마무리하기
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <ReviewStartModal
          onClose={() => setIsModalOpen(false)}
          date={dateStr}
        />
      )}
    </div>
  );
}

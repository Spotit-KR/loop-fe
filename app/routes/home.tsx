import { useState } from 'react';
import type { Route } from './+types/home';
import { ReviewStartModal } from 'features/review';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'LOOP' }];
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1" />
      <div className="p-8 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-main1 text-white rounded-[10px] text-[20px] font-medium cursor-pointer"
        >
          오늘 하루 회고로 마무리하기
        </button>
      </div>
      {isModalOpen && (
        <ReviewStartModal
          onClose={() => setIsModalOpen(false)}
          date="2026-02-20"
        />
      )}
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { formatMonthDay } from 'shared/utils';
import { ReviewHeader, ReviewCompleted, ReviewProgress } from 'features/review';

// /review?type=day&date={date}
// date format: YYYY-MM-DD
export default function Review() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date') ?? '2026-02-20';

  const displayDate = formatMonthDay(date);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <ReviewHeader displayDate={displayDate} onBack={() => navigate(-1)} />
      {isCompleted ? (
        <ReviewCompleted />
      ) : (
        <ReviewProgress onComplete={() => setIsCompleted(true)} />
      )}
    </div>
  );
}

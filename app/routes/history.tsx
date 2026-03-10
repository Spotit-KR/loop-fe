import { useMyReviewStats, useMyReviews, type Review } from 'features/history';
import { HistoryIcon } from 'shared/ui';
import { formatFullDate } from 'shared/utils';

function StatCard() {
  const { totalCount, consecutiveDays, loading, error } = useMyReviewStats();

  return (
    <div className="flex rounded-2xl border border-sub3 shadow-sm overflow-hidden min-w-[70%]">
      <div className="flex-1 flex flex-col items-center py-6 gap-1">
        <span className="text-4xl font-bold text-main1">{totalCount}</span>
        <span className="text-sm text-sub1">총 회고</span>
      </div>
      <div className="w-px bg-sub3" />
      <div className="flex-1 flex flex-col items-center py-6 gap-1">
        <span className="text-4xl font-bold text-main2">{consecutiveDays}</span>
        <span className="text-sm text-sub1">연속 회고일수</span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-3 text-sub2 min-w-[70%] min-h-[500px]">
      <HistoryIcon className="w-12 h-12" />
      <p className="text-lg font-semibold text-main2">
        아직 진행한 회고가 없어요
      </p>
      <p className="text-sm">
        오늘의 보드에서 하루를 마무리하며 회고를 시작하세요
      </p>
    </div>
  );
}

function KptSection({
  label,
  items,
  color,
}: {
  label: string;
  items: string[];
  color: string;
}) {
  return (
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-semibold mb-2 ${color}`}>{label}</p>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex gap-1.5 text-sm text-main2">
            <span className="shrink-0 mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HistoryItem({ entry, isLast }: { entry: Review; isLast: boolean }) {
  const dateStr = entry.startDate.toISOString().slice(0, 10);
  const keep = entry.steps
    .filter((s) => s.type === 'KEEP')
    .map((s) => s.content);
  const problem = entry.steps
    .filter((s) => s.type === 'PROBLEM')
    .map((s) => s.content);
  const tryItems = entry.steps
    .filter((s) => s.type === 'TRY')
    .map((s) => s.content);

  return (
    <div className="flex gap-4">
      {/* timeline */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-main1 border-2 border-main1 shrink-0 mt-1" />
        {!isLast && <div className="flex-1 w-px bg-sub3 mt-1" />}
      </div>

      {/* content */}
      <div className={`flex-1 ${!isLast ? 'pb-6' : ''}`}>
        <p className="font-bold text-main2 mb-3">{formatFullDate(dateStr)}</p>
        <div className="rounded-2xl border border-sub3 p-5 flex gap-6">
          <KptSection
            label="KEEP : 유지할 점"
            items={keep}
            color="text-green"
          />
          <KptSection
            label="PROBLEM : 개선할 점"
            items={problem}
            color="text-red"
          />
          <KptSection
            label="TRY : 앞으로의 다짐"
            items={tryItems}
            color="text-main1"
          />
        </div>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const { myReviews } = useMyReviews({});

  return (
    <div className="flex flex-col h-full p-10 gap-6">
      <h1 className="text-2xl font-bold text-main2">회고 히스토리</h1>
      <div className="px-10 flex flex-col jusitfy-center items-center gap-y-3">
        <StatCard />
        {myReviews.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col mt-2 ">
            {myReviews.map((entry, i) => (
              <HistoryItem
                key={entry.id}
                entry={entry}
                isLast={i === myReviews.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

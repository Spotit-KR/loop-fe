import { ReviewBookIcon } from 'shared/ui';

interface ReviewStepOutput {
  type: string;
  content: string;
}

function KptCard({
  label,
  items,
  borderColor,
  textColor,
}: {
  label: string;
  items: string[];
  borderColor: string;
  textColor: string;
}) {
  return (
    <div className={`flex-1 border ${borderColor} rounded-[10px] p-4`}>
      <p className={`text-[15px] font-semibold mb-3 ${textColor}`}>{label}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-1.5 text-[13px] text-main2">
            <span className="shrink-0 mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TodayReview({ steps }: { steps: ReviewStepOutput[] }) {
  const keep = steps.filter((s) => s.type === 'KEEP').map((s) => s.content);
  const problem = steps
    .filter((s) => s.type === 'PROBLEM')
    .map((s) => s.content);
  const tryItems = steps.filter((s) => s.type === 'TRY').map((s) => s.content);

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-4">
        <ReviewBookIcon />
        <h2 className="text-[20px] font-bold text-main1">오늘의 회고</h2>
      </div>
      <div className="flex gap-4">
        <KptCard
          label="KEEP : 유지할 점"
          items={keep}
          borderColor="border-main1"
          textColor="text-green"
        />
        <KptCard
          label="PROBLEM : 개선할 점"
          items={problem}
          borderColor="border-main1"
          textColor="text-red"
        />
        <KptCard
          label="TRY : 앞으로의 다짐"
          items={tryItems}
          borderColor="border-main1"
          textColor="text-main1"
        />
      </div>
    </div>
  );
}

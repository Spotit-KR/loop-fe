import { colorMap } from 'features/review/constants';
import type { Step } from 'features/review/constants';

interface GuidePanelProps {
  steps: Step[];
  stepIndex: number;
}

export function GuidePanel({ steps, stepIndex }: GuidePanelProps) {
  return (
    <aside className="w-84.25 shrink-0 pt-4">
      <h2 className="text-[25px] font-semibold text-main2 mb-4">가이드라인</h2>
      <div className="border border-main1 rounded-[10px] bg-white p-6 flex flex-col gap-6">
        {steps.map((step, i) => {
          const { bar, label } = colorMap[step.color];
          return (
            <div key={step.key}>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`w-5.5 h-5.5 rounded-full shrink-0 ${i === stepIndex ? bar : 'bg-sub2'}`}
                />
                <span
                  className={`text-[25px] font-semibold ${i === stepIndex ? label : 'text-main2'}`}
                >
                  {step.key}
                </span>
              </div>
              {i === stepIndex && (
                <ul className="ml-8.5 space-y-1">
                  {step.guide.questions.map((q) => (
                    <li
                      key={q}
                      className="text-[15px] text-sub2 list-disc ml-4"
                    >
                      {q}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

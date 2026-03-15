import type { Step } from 'features/review/constants';

interface GuidePanelProps {
  steps: Step[];
  stepIndex: number;
}

export function GuidePanel({ steps, stepIndex }: GuidePanelProps) {
  return (
    <aside className="w-84.25 shrink-0 pt-4">
      <h2 className="text-[25px] font-semibold text-main2 mb-4">가이드라인</h2>
      <div className="border border-main1 rounded-[10px] bg-white p-6">
        {steps.map((step, i) => {
          const isActive = i === stepIndex;
          const isCompleted = i < stepIndex;
          const isLast = i === steps.length - 1;

          return (
            <div key={step.key} className="flex gap-4">
              {/* Circle + vertical dotted line */}
              <div className="flex flex-col items-center">
                <span
                  className={`w-5.5 h-5.5 rounded-full shrink-0 ${
                    isActive || isCompleted ? 'bg-main1' : 'bg-sub3'
                  }`}
                />
                {!isLast && (
                  <div className="w-0 flex-1 border-l-2 border-solid border-sub3 mt-1" />
                )}
              </div>

              {/* Label + questions */}
              <div className={!isLast ? 'pb-6' : ''}>
                <span
                  className={`text-[25px] font-semibold leading-tight ${
                    isActive
                      ? 'text-main2'
                      : isCompleted
                        ? 'text-sub1'
                        : 'text-sub2'
                  }`}
                >
                  {step.key}
                </span>
                {isActive && (
                  <ul className="mt-2 space-y-1">
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
            </div>
          );
        })}
      </div>
    </aside>
  );
}

import { colorMap } from 'features/review/constants';
import type { Step } from 'features/review/constants';

interface ProgressBarProps {
  steps: Step[];
  stepIndex: number;
}

export function ProgressBar({ steps, stepIndex }: ProgressBarProps) {
  return (
    <div className="px-54.5 pt-6 pb-2 shrink-0 min-w-325">
      <div className="flex gap-2">
        {steps.map((step, i) => {
          const { bar, label } = colorMap[step.color];
          return (
            <div key={step.key} className="flex-1">
              <div
                className={`h-2.5 rounded-[10px] ${i <= stepIndex ? bar : 'bg-sub2'}`}
              />
              <p
                className={`text-[20px] font-medium mt-2 ${i === stepIndex ? label : 'text-sub2'}`}
              >
                {step.key}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

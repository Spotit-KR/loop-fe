import { useState } from 'react';
import { UserIcon } from 'shared/ui';
import { STEPS } from 'features/review/constants';
import { ProgressBar } from './ProgressBar';
import { ActionPanel } from './ActionPanel';
import { WritePanel } from './WritePanel';
import { GuidePanel } from './GuidePanel';

interface ReviewProgressProps {
  onComplete: () => void;
}

export function ReviewProgress({ onComplete }: ReviewProgressProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(() => STEPS.map(() => ''));

  const currentStep = STEPS[stepIndex];
  const canGoNext = answers[stepIndex].trim() !== '';

  const handleNext = () => {
    if (stepIndex < STEPS.length - 1) setStepIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex((prev) => prev - 1);
  };

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[stepIndex] = value;
      return next;
    });
  };

  return (
    <>
      <ProgressBar steps={STEPS} stepIndex={stepIndex} />
      <div className="flex-1 flex gap-8 px-54.5 pb-6 overflow-hidden">
        <ActionPanel />
        <WritePanel
          currentStep={currentStep}
          stepIndex={stepIndex}
          stepsLength={STEPS.length}
          answer={answers[stepIndex]}
          canGoNext={canGoNext}
          onAnswerChange={handleAnswerChange}
          onPrev={handlePrev}
          onNext={handleNext}
          onFinish={onComplete}
        />
        <GuidePanel steps={STEPS} stepIndex={stepIndex} />
      </div>
      <footer className="h-15.5 border-t border-sub3 px-7.75 flex items-center gap-4 shrink-0">
        <span className="w-7.25 h-7.25 rounded-full bg-sub3 flex items-center justify-center">
          <UserIcon className="w-4 h-4 text-sub2" />
        </span>
        <span className="text-[20px] font-medium text-main2">회고짱짱님</span>
      </footer>
    </>
  );
}

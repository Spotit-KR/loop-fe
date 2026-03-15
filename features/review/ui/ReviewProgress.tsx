import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { UserIcon } from 'shared/ui';
import { STEPS } from 'features/review/constants';
import { useCreateReview } from '../model/useCreateReview';
import { ProgressBar } from './ProgressBar';
import { ActionPanel } from './ActionPanel';
import { WritePanel } from './WritePanel';
import { GuidePanel } from './GuidePanel';

interface ReviewProgressProps {
  onComplete: () => void;
}

export function ReviewProgress({ onComplete }: ReviewProgressProps) {
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date') ?? '';

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(() => STEPS.map(() => ''));

  const { createReview } = useCreateReview();

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

  const handleFinish = async () => {
    const steps = STEPS.map((step, i) => ({
      type: step.key,
      content: answers[i],
    }));
    await createReview({ steps, date });
    onComplete();
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
          onFinish={handleFinish}
        />
        <GuidePanel steps={STEPS} stepIndex={stepIndex} />
      </div>
    </>
  );
}

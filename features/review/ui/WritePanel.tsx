import type { Step } from 'features/review/constants';

interface WritePanelProps {
  currentStep: Step;
  stepIndex: number;
  stepsLength: number;
  answer: string;
  canGoNext: boolean;
  onAnswerChange: (value: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export function WritePanel({
  currentStep,
  stepIndex,
  stepsLength,
  answer,
  canGoNext,
  onAnswerChange,
  onPrev,
  onNext,
  onFinish,
}: WritePanelProps) {
  const isLastStep = stepIndex === stepsLength - 1;

  return (
    <section className="flex-1 flex flex-col gap-4 pt-4 min-w-0">
      <h2 className="text-[25px] font-semibold text-main2">
        {currentStep.title}
      </h2>
      <textarea
        className="flex-1 w-full rounded-[10px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] bg-white p-6 text-[20px] text-sub2 resize-none outline-none max-h-75 overflow-y-auto"
        placeholder={`${currentStep.key}에 대해 자유롭게 작성해주세요.`}
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
      />
      <div className="flex gap-3">
        {stepIndex > 0 && (
          <button
            onClick={onPrev}
            className="flex-1 h-13.5 border border-main1 rounded-[10px] text-[20px] font-medium text-main1 cursor-pointer"
          >
            이전
          </button>
        )}
        <button
          onClick={isLastStep ? onFinish : onNext}
          disabled={!canGoNext}
          className="flex-1 h-13.5 bg-main1 rounded-[10px] text-[20px] font-medium text-white cursor-pointer disabled:opacity-40"
        >
          {isLastStep ? '회고 마치기' : '다음'}
        </button>
      </div>
    </section>
  );
}

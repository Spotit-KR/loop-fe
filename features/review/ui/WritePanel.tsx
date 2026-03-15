import { useRef, useEffect } from 'react';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [stepIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return;

    const textarea = textareaRef.current!;
    const { value, selectionStart, selectionEnd } = textarea;

    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
    const currentLine = value.substring(lineStart, selectionStart);

    const unorderedMatch = currentLine.match(/^(\s*)([-*]) /);
    const orderedMatch = currentLine.match(/^(\s*)(\d+)\. /);

    if (!unorderedMatch && !orderedMatch) return;

    const isEmptyItem = unorderedMatch
      ? unorderedMatch[0] === currentLine
      : orderedMatch![0] === currentLine;

    // 중간 항목(내용 있음, 커서가 끝이 아님)에서 Enter → 리스트 미연장, 기본 줄바꿈 허용
    if (!isEmptyItem && selectionEnd !== value.length) return;

    e.preventDefault();

    let newValue: string;
    let newCursor: number;

    if (isEmptyItem) {
      // 빈 항목에서 Enter → 리스트 종료, 접두사 제거
      newValue = value.substring(0, lineStart) + value.substring(selectionStart);
      newCursor = lineStart;
    } else if (unorderedMatch) {
      const [, indent, bullet] = unorderedMatch;
      const insertion = `\n${indent}${bullet} `;
      newValue = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
      newCursor = selectionStart + insertion.length;
    } else {
      const [, indent, numStr] = orderedMatch!;
      const insertion = `\n${indent}${parseInt(numStr) + 1}. `;
      newValue = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
      newCursor = selectionStart + insertion.length;
    }

    onAnswerChange(newValue);
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = newCursor;
        textareaRef.current.selectionEnd = newCursor;
      }
    });
  };

  return (
    <section className="flex-1 flex flex-col gap-4 pt-4 min-w-0">
      <h2 className="text-[25px] font-semibold text-main2">
        {currentStep.title}
      </h2>
      <textarea
        ref={textareaRef}
        className="flex-1 w-full rounded-[10px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] bg-white p-6 text-[20px] text-sub2 resize-none outline-none max-h-75 overflow-y-auto focus:ring-2 focus:ring-main1"
        placeholder={currentStep.placeholder}
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        onKeyDown={handleKeyDown}
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

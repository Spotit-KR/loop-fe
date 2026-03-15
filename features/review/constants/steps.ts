import type { StepColor } from './colorMap';

export interface Step {
  key: string;
  color: StepColor;
  title: string;
  placeholder: string;
  guide: { questions: string[] };
}

export const STEPS: Step[] = [
  {
    key: 'KEEP',
    color: 'green',
    title: 'KEEP : 유지할 점',
    placeholder:
      '오늘 ...을 해서 기분이 좋았다. 그래서 다음 테스크를 더 활기차게 진행할 수 있었다.\n이 행동이 긍정적인 반응을 불러일으켜서 유지하고 싶다.',
    guide: {
      questions: [
        '오늘 한 일 중 잘한 것은?',
        '계속 이어가고 싶은 행동은?',
        '효과가 좋았던 방법이 있나요?',
      ],
    },
  },
  {
    key: 'PROBLEM',
    color: 'red',
    title: 'PROBLEM : 문제점',
    placeholder: '...을 하는데 예상보다 시간을 오래 쏟아부었다.',
    guide: {
      questions: [
        '오늘 잘 안 됐던 것은?',
        '반복되는 문제가 있었나요?',
        '방해가 된 요소는 무엇인가요?',
      ],
    },
  },
  {
    key: 'TRY',
    color: 'main1',
    title: 'TRY : 시도할 것',
    placeholder: '앞으로 매일 ...을 트래킹해야겠다.',
    guide: {
      questions: [
        '다음에 다르게 할 행동은?',
        'PROBLEM을 해결할 방법은?',
        '내일 실험해볼 것은?',
      ],
    },
  },
];

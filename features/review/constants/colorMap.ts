export const colorMap = {
  green: { bar: 'bg-green', label: 'text-green' },
  red: { bar: 'bg-red', label: 'text-red' },
  main1: { bar: 'bg-main1', label: 'text-main1' },
} as const;

export type StepColor = keyof typeof colorMap;

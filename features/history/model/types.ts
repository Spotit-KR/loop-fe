export type ReviewType = 'DAILY';

export type StepType = 'KEEP' | 'PROBLEM' | 'TRY';

export type ReviewStepOutput = {
  type: StepType;
  content: string;
};

export type ReviewFilter = {
  reviewType?: ReviewType;
  stepType?: StepType;
  date?: string;
  startDate?: string;
  endDate?: string;
};

/** API 응답 DTO */
export interface ReviewDTO {
  id: number;
  reviewType: string;
  steps: ReviewStepOutput[];
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

/** 도메인 모델 */
export type Review = {
  id: number;
  reviewType: ReviewType;
  steps: ReviewStepOutput[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

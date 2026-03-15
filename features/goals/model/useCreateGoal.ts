import { useMutation } from '@apollo/client/react';
import { CREATE_GOAL_MUTATION } from '../api/createGoal.mutation';

interface CreateGoalInput {
  title: string;
}

interface CreateGoalDTO {
  id: string | number;
  title: string;
  createdAt: string;
  updatedAt: string;
  totalTaskCount: number;
  completedTaskCount: number;
  achievementRate: number;
}

interface CreateGoalResponse {
  createGoal: CreateGoalDTO;
}

export function useCreateGoal() {
  const [mutate, { loading, error }] = useMutation<
    CreateGoalResponse,
    { input: CreateGoalInput }
  >(CREATE_GOAL_MUTATION);

  const createGoal = (input: CreateGoalInput) =>
    mutate({ variables: { input } });

  return { createGoal, loading, error };
}

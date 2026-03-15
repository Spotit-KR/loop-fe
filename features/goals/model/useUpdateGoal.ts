import { useMutation } from '@apollo/client/react';
import { UPDATE_GOAL_MUTATION } from '../api/updateGoal.mutation';
import type { MyGoalDTO } from 'entities/goal/type';

interface UpdateGoalInput {
  id: string;
  title: string;
}

interface UpdateGoalResponse {
  updateGoal: MyGoalDTO;
}

export function useUpdateGoal() {
  const [mutate, { loading, error }] = useMutation<
    UpdateGoalResponse,
    { input: UpdateGoalInput }
  >(UPDATE_GOAL_MUTATION);

  const updateGoal = (input: UpdateGoalInput) =>
    mutate({ variables: { input } });

  return { updateGoal, loading, error };
}

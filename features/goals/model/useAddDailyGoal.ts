import { useMutation } from '@apollo/client/react';
import { ADD_DAILY_GOAL_MUTATION } from '../api/addDailyGoal.mutation';
import { MY_GOALS_QUERY } from '../api/myGoals.query';
import type { MyGoalDTO } from 'entities/goal/type';

interface AddDailyGoalInput {
  goalId: string;
  date: string;
}

interface AddDailyGoalResponse {
  addDailyGoal: MyGoalDTO;
}

export function useAddDailyGoal() {
  const [mutate, { loading, error }] = useMutation<
    AddDailyGoalResponse,
    { input: AddDailyGoalInput }
  >(ADD_DAILY_GOAL_MUTATION);

  const addDailyGoal = async (goalId: string, date: string) => {
    const result = await mutate({
      variables: { input: { goalId, date } },
      refetchQueries: [{ query: MY_GOALS_QUERY }],
      awaitRefetchQueries: true,
    });
    if (result.error) {
      throw new Error(result.error.message);
    }
    if (!result.data?.addDailyGoal) {
      throw new Error('목표 배치에 실패했습니다.');
    }
    return result;
  };

  return { addDailyGoal, loading, error };
}

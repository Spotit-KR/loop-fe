import { useMutation } from '@apollo/client/react';
import { REMOVE_DAILY_GOAL_MUTATION } from '../api/removeDailyGoal.mutation';
import { MY_GOALS_QUERY } from '../api/myGoals.query';

interface RemoveDailyGoalInput {
  goalId: string;
  date: string;
}

interface RemoveDailyGoalResponse {
  removeDailyGoal: boolean;
}

export function useRemoveDailyGoal() {
  const [mutate, { loading, error }] = useMutation<
    RemoveDailyGoalResponse,
    { input: RemoveDailyGoalInput }
  >(REMOVE_DAILY_GOAL_MUTATION);

  const removeDailyGoal = async (goalId: string, date: string) => {
    try {
      const result = await mutate({
        variables: { input: { goalId, date } },
        refetchQueries: [{ query: MY_GOALS_QUERY }],
        awaitRefetchQueries: true,
      });
      if (result.error) {
        throw new Error(result.error.message);
      }
      if (result.data?.removeDailyGoal !== true) {
        throw new Error('목표 삭제에 실패했습니다.');
      }
      return result;
    } catch (err) {
      if (err instanceof Error && err.message.includes('DailyGoal not found')) {
        throw new Error('해당 날짜에 목표가 배치되지 않았습니다.');
      }
      throw err;
    }
  };

  return { removeDailyGoal, loading, error };
}

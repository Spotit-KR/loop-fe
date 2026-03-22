import { useMutation } from '@apollo/client/react';
import { DELETE_GOAL_MUTATION } from '../api/deleteGoal.mutation';
import { MY_GOALS_QUERY } from '../api/myGoals.query';

interface DeleteGoalResponse {
  deleteGoal: boolean;
}

export function useDeleteGoal() {
  const [mutate, { loading, error }] = useMutation<
    DeleteGoalResponse,
    { id: string }
  >(DELETE_GOAL_MUTATION);

  const deleteGoal = async (id: string) => {
    const result = await mutate({
      variables: { id },
      refetchQueries: [{ query: MY_GOALS_QUERY }],
      awaitRefetchQueries: true,
    });
    if (result.error) {
      throw new Error(result.error.message);
    }
    if (result.data?.deleteGoal !== true) {
      throw new Error('목표 삭제에 실패했습니다.');
    }
    return result;
  };

  return { deleteGoal, loading, error };
}

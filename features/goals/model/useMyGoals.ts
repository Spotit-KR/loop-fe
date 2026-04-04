import { useQuery } from '@apollo/client/react';
import { MY_GOALS_QUERY } from '../api/myGoals.query';
import type { MyGoalDTO } from 'entities/goal/type';

interface MyGoalsResponse {
  myGoals: MyGoalDTO[];
}

interface GoalFilter {
  id?: string;
  ids?: string[];
  title?: string;
  assignedDate?: string;
}

interface MyGoalsVariables {
  filter?: GoalFilter;
}

export interface MyGoal {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  totalTaskCount: number;
  completedTaskCount: number;
  achievementRate: number;
}

export function useMyGoals(variables?: MyGoalsVariables) {
  const { data, loading, error, refetch } = useQuery<
    MyGoalsResponse,
    MyGoalsVariables
  >(MY_GOALS_QUERY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const myGoals: MyGoal[] =
    data?.myGoals?.map((dto) => ({
      id: dto.id,
      title: dto.title,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      totalTaskCount: dto.totalTaskCount,
      completedTaskCount: dto.completedTaskCount,
      achievementRate: dto.achievementRate,
    })) ?? [];

  return { myGoals, loading, error, refetch };
}

import { useQuery } from '@apollo/client/react';
import { MY_GOALS_QUERY } from '../api/myGoals.query';
import type { MyGoalDTO } from 'entities/goal/type';

interface MyGoalsResponse {
  myGoals: MyGoalDTO[];
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

export function useMyGoals() {
  const { data, loading, error, refetch } = useQuery<MyGoalsResponse>(
    MY_GOALS_QUERY,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

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

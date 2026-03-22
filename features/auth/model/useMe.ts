import { useQuery } from '@apollo/client/react';
import { tokenStorage } from 'shared/utils';
import { ME_QUERY } from '../api/me.query';
import type { MeQueryResult } from '../api/me.query';

export function useMe() {
  const isLoggedIn = !!tokenStorage.get();

  const { data } = useQuery<MeQueryResult>(ME_QUERY, {
    skip: !isLoggedIn,
  });

  return {
    nickname: data?.me.nickname ?? '',
    loginId: data?.me.loginId ?? '',
  };
}

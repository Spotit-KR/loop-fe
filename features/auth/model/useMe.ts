import { tokenStorage } from 'shared/utils';

interface TokenPayload {
  nickname: string;
  loginId: string;
}

export function useMe() {
  const payload = tokenStorage.parse<TokenPayload>();
  return {
    nickname: payload?.nickname ?? '',
    loginId: payload?.loginId ?? '',
  };
}

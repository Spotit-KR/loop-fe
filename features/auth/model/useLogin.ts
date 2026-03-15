import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LOGIN_MUTATION } from '../api';
import { tokenStorage } from 'shared/utils';

interface LoginInput {
  loginId: string;
  password: string;
}

interface LoginResponse {
  login: { accessToken: string };
}

function parseLoginError(
  graphqlErrors: readonly {
    message: string;
    extensions?: { classification?: string };
  }[]
): string {
  const first = graphqlErrors[0];
  if (!first) return '로그인 중 오류가 발생했습니다.';

  if (first.extensions?.classification == 'NOT_FOUND') {
    return '등록되지 않은 아이디입니다.';
  }
  if (first.extensions?.classification == 'UNAUTHENTICATED') {
    return '비밀번호가 올바르지 않습니다.';
  }
  return '로그인 중 오류가 발생했습니다.';
}

export function useLogin() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mutate, { loading }] = useMutation<
    LoginResponse,
    { input: LoginInput }
  >(LOGIN_MUTATION);

  const login = async (input: LoginInput) => {
    setErrorMessage(null);
    try {
      const result = await mutate({ variables: { input } });
      if (result.data?.login.accessToken) {
        tokenStorage.set(result.data.login.accessToken);
        navigate('/');
      }
    } catch (e: unknown) {
      const errors =
        (e as { errors?: { message: string; extensions?: { classification?: string } }[] }).errors ?? [];
      setErrorMessage(parseLoginError(errors));
    }
  };

  return { login, loading, errorMessage };
}

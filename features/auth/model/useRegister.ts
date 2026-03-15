import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { REGISTER_MUTATION } from '../api/register.mutation';
import { tokenStorage } from '../../../shared/utils/token';

interface RegisterInput {
  nickname: string;
  loginId: string;
  password: string;
}

interface RegisterResponse {
  register: { accessToken: string };
}

function parseRegisterError(
  errors: { message: string; extensions?: { classification?: string } }[]
): string {
  const first = errors[0];
  if (!first) return '회원가입 중 오류가 발생했습니다.';

  if (first.extensions?.classification === 'FAILED_PRECONDITION') {
    return '이미 사용 중인 아이디입니다.';
  }
  return '회원가입 중 오류가 발생했습니다.';
}

export function useRegister() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mutate, { loading }] = useMutation<
    RegisterResponse,
    { input: RegisterInput }
  >(REGISTER_MUTATION);

  const register = async (input: RegisterInput) => {
    setErrorMessage(null);
    try {
      const result = await mutate({ variables: { input } });
      if (result.data?.register.accessToken) {
        tokenStorage.set(result.data.register.accessToken);
        navigate('/');
      }
    } catch (e: unknown) {
      const errors =
        (e as { errors?: { message: string; extensions?: { classification?: string } }[] }).errors ?? [];
      setErrorMessage(parseRegisterError(errors));
    }
  };

  return { register, loading, errorMessage };
}

import { useMutation } from '@apollo/client/react';
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

export function useRegister() {
  const navigate = useNavigate();
  const [mutate, { loading, error }] = useMutation<
    RegisterResponse,
    RegisterInput
  >(REGISTER_MUTATION, {
    onCompleted(data) {
      tokenStorage.set(data.register.accessToken);
      navigate('/');
    },
  });

  const register = (input: RegisterInput) =>
    mutate({ variables: { ...input } });

  return { register, loading, error };
}

import { useMutation } from '@apollo/client/react';
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

export function useLogin() {
  const navigate = useNavigate();
  const [mutate, { loading, error }] = useMutation<LoginResponse, LoginInput>(
    LOGIN_MUTATION,
    {
      onCompleted(data) {
        tokenStorage.set(data.login.accessToken);
        navigate('/');
      },
    }
  );

  const login = (input: LoginInput) => mutate({ variables: { ...input } });

  return { login, loading, error };
}

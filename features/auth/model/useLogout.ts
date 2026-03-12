import { useNavigate } from 'react-router';
import { tokenStorage } from 'shared/utils';

export function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    tokenStorage.remove();
    navigate('/auth/login');
  };

  return { logout };
}

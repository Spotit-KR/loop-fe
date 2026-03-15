import { Navigate, Outlet } from 'react-router';
import { tokenStorage } from 'shared/utils';

export default function PublicLayout() {
  if (tokenStorage.get()) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

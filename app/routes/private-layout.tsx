import { Navigate, Outlet } from 'react-router';
import { tokenStorage } from 'shared/utils';

export default function PrivateLayout() {
  if (!tokenStorage.get()) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
}

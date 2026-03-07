import { Outlet } from 'react-router';
import { Sidebar } from 'widgets/sidebar';

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

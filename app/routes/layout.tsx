import { Outlet } from 'react-router';
import { GoalsProvider } from 'shared/context/GoalsContext';
import { Sidebar } from 'widgets/sidebar';

export default function MainLayout() {
  return (
    <GoalsProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </GoalsProvider>
  );
}

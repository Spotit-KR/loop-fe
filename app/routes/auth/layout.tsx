import { Outlet } from 'react-router';
import { LoopLogoIcon } from 'shared/ui';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-[500px] bg-white border border-sub3 rounded-2xl px-12 py-14 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <LoopLogoIcon size={40} />
            <span className="text-2xl font-semibold text-main1">Loop</span>
          </div>
          <p className="text-sm text-sub1">한 일을 돌아보며 하루를 회고로 마무리하세요</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

import { useMe, useLogout } from 'features/auth';

export default function MyPage() {
  const { nickname, loginId } = useMe();
  const { logout } = useLogout();

  return (
    <div className="px-30 py-10 ">
      <h1 className="text-[32px] font-bold text-main2 mb-8 ">
        안녕하세요, {nickname}님!
      </h1>
      <div className="flex items-center justify-center">
        <div className="flex justify-between max-w-155 bg-white rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] px-8 py-5 w-full">
          <div className="flex items-center gap-6">
            <span className="text-[20px] font-bold text-main2">{nickname}</span>
            <span className="text-[16px] text-sub1">{loginId}</span>
          </div>
          <button
            onClick={logout}
            className="text-[16px] text-sub1 hover:text-red cursor-pointer"
          >
            로그아웃하기
          </button>
        </div>
      </div>
    </div>
  );
}

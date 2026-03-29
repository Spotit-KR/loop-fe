import { NavLink } from 'react-router';
import { LoopLogoIcon, UserIcon } from 'shared/ui';
import { useMe } from 'features/auth';
import { tokenStorage } from 'shared/utils';

const navItems = [
  {
    to: '/',
    label: '오늘의 할일',
    icon: (
      <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.14286 0C7.88504 0 8.48214 0.606055 8.48214 1.35938V3.625H16.5179V1.35938C16.5179 0.606055 17.115 0 17.8571 0C18.5993 0 19.1964 0.606055 19.1964 1.35938V3.625H21.4286C23.3984 3.625 25 5.25059 25 7.25V25.375C25 27.3744 23.3984 29 21.4286 29H3.57143C1.60156 29 0 27.3744 0 25.375V7.25C0 5.25059 1.60156 3.625 3.57143 3.625H5.80357V1.35938C5.80357 0.606055 6.40067 0 7.14286 0ZM22.3214 10.875H2.67857V25.375C2.67857 25.8734 3.08036 26.2812 3.57143 26.2812H21.4286C21.9196 26.2812 22.3214 25.8734 22.3214 25.375V10.875ZM18.3594 16.8223L12.1094 23.166C11.5848 23.6984 10.7366 23.6984 10.2176 23.166L6.64621 19.541C6.12165 19.0086 6.12165 18.1477 6.64621 17.6209C7.17076 17.0941 8.01897 17.0885 8.53795 17.6209L11.1607 20.283L16.4621 14.9021C16.9866 14.3697 17.8348 14.3697 18.3538 14.9021C18.8728 15.4346 18.8783 16.2955 18.3538 16.8223H18.3594Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    to: '/goals',
    label: '목표 관리',
    icon: (
      <svg
        width="25"
        height="29"
        viewBox="0 0 512 512"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
      </svg>
    ),
  },
  {
    to: '/history',
    label: '회고 히스토리',
    icon: (
      <svg
        width="25"
        height="29"
        viewBox="0 0 512 512"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M48 106.7L48 56c0-13.3-10.7-24-24-24S0 42.7 0 56L0 168c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-55.3 0c37-57.3 101.2-95.2 174.5-92.8C372.5 54.1 455.4 141 448 242.9 440.5 346.5 354.4 424 248 424c-43.4 0-83.2-14.2-115.3-38.1c-10.7-7.9-25.7-5.7-33.7 5.1s-5.7 25.7 5.1 33.7C145.3 453.5 194.3 472 248 472c128.4 0 232.4-100.7 240-227.8C495.9 112.7 394.6 4.2 266.6 .1C183.2-2.6 108.7 38.1 64 101.4l0-58.1L48 106.7zM248 136c-13.3 0-24 10.7-24 24l0 96c0 6.4 2.5 12.5 7 17l56 56c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-49-49 0-86.1c0-13.3-10.7-24-24-24z" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const { nickname } = useMe();
  const isLoggedIn = !!tokenStorage.get();

  return (
    <aside className="w-[288px] shrink-0 h-screen bg-white border-r border-sub3 flex flex-col">
      <div className="flex items-center gap-3 px-7.25 h-33">
        <LoopLogoIcon size={40} />
        <span className="text-2xl font-semibold text-main1">Loop</span>
      </div>
      <nav className="flex-1">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-7.25 h-15.5 px-7.25 transition-colors ${
                isActive
                  ? 'bg-main1/20 text-main1'
                  : 'text-main2 hover:bg-main1/10'
              }`
            }
          >
            <span className="w-6.25 flex items-center justify-center shrink-0">
              {icon}
            </span>
            <span className="text-[20px] font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      <NavLink
        to={isLoggedIn ? '/mypage' : '/auth/login'}
        className={({ isActive }) =>
          `flex items-center gap-7.25 h-15.5 px-7.25 transition-colors ${
            isActive
              ? 'bg-main1/20 text-main1'
              : 'text-main2 hover:bg-main1/10'
          }`
        }
      >
        <UserIcon className="w-6.25 h-6.25 shrink-0" />
        <span className="text-[20px] font-medium">
          {isLoggedIn ? `${nickname}님` : '로그인하기'}
        </span>
      </NavLink>
    </aside>
  );
}

import { NavLink } from 'react-router';
import { LoopLogoIcon } from 'shared/ui';

const navItems = [
  {
    to: '/',
    label: '오늘의 할일',
    icon: (
      <svg
        width="25"
        height="29"
        viewBox="0 0 448 512"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16L48 192zm245.7 105.7l-120 120c-9.4 9.4-24.6 9.4-33.9 0l-56-56c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L157 373.1l103-103c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
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
  return (
    <aside className="w-[288px] shrink-0 h-screen bg-white border-r border-sub3">
      <div className="flex items-center gap-3 px-7.25 h-33">
        <LoopLogoIcon size={40} />
        <span className="text-2xl font-semibold text-main1">Loop</span>
      </div>
      <nav>
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-[29px] h-[62px] px-[29px] transition-colors ${
                isActive
                  ? 'bg-main1/20 text-main1'
                  : 'text-main2 hover:bg-main1/10'
              }`
            }
          >
            <span className="w-[25px] flex items-center justify-center shrink-0">
              {icon}
            </span>
            <span className="text-[20px] font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { LoopLogoIcon } from 'shared/ui';

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function FloatingCard({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 min-w-[190px]">
      <div className="text-sub1">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-main2">{title}</p>
        <p className="text-xs text-sub2">{subtitle}</p>
      </div>
    </div>
  );
}

function LoopDiagram() {
  // SVG is 460x460, circle cx=230,cy=230,r=190
  // Container is 560x520, SVG offset: left=50 top=30
  // Screen circle center: (280, 260)
  const cx = 230, cy = 230, r = 190;

  return (
    // overflow-visible so cards can spill outside
    <div className="relative w-140 h-130" style={{ overflow: 'visible' }}>
      {/* Fixed-size square SVG — circle stays circular */}
      <svg
        width="460"
        height="460"
        viewBox="0 0 460 460"
        style={{ position: 'absolute', top: 30, left: 50 }}
      >
        {/* Light inner fill */}
        <circle cx={cx} cy={cy} r={r - 14} fill="#F0F4FF" />

        {/* "Loop" text */}
        <text
          x={cx}
          y={cy + 13}
          textAnchor="middle"
          style={{ fill: '#4984eb', fontSize: '34px', fontWeight: 700 }}
        >
          Loop
        </text>

        {/* Blue ring — full 360° */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#4984eb"
          strokeWidth="26"
        />
      </svg>

      {/*
        Ring edge screen coords (SVG offset left=50, top=30):
        Action Step (40°): (280+190·sin40, 260-190·cos40) ≈ (402, 115) → right=0, top=87
        Improve     (270°): (280-190, 260) = (90, 260)               → left=0, top=232
        Retro       (135°): (280+190·sin135, 260-190·cos135) ≈ (414, 394) → right=0, bottom=98
      */}

      {/* Action Step — top right, 1 o'clock */}
      <div style={{ position: 'absolute', top: 87, right: 0 }}>
        <FloatingCard icon={<CalendarIcon />} title="Action Step" subtitle="오늘의 보드" />
      </div>

      {/* Improve — left center, 9 o'clock */}
      <div style={{ position: 'absolute', top: 232, left: 0 }}>
        <FloatingCard icon={<TrendingIcon />} title="Improve" subtitle="내일의 개선으로의 연결" />
      </div>

      {/* Retro — bottom right, 4-5 o'clock */}
      <div style={{ position: 'absolute', bottom: 98, right: 0 }}>
        <FloatingCard icon={<BookIcon />} title="Retro" subtitle="데일리 KPT 회고" />
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center gap-10">
      {/* Header */}
      <header className="px-10 py-5 flex items-center gap-2 absolute top-1 left-0 w-full">
        <LoopLogoIcon size={36} />
        <span className="text-xl font-bold text-main1">Loop</span>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center px-16 gap-8">
        {/* Left — text + buttons */}
        <div className="flex-1 flex flex-col gap-7 max-w-xl">
          <h1 className="text-4xl font-bold text-main2 leading-snug">
            오늘 한 일을 <span className="text-main1">회고</span>와 함께
            돌아보며 <br /> 하루를 마무리하세요
          </h1>
          <p className="text-sub1 leading-relaxed text-base">
            루프는 오늘의 액션스텝과 KPT 회고를 하나로 연결합니다
            <br />
            어제의 성찰이 오늘의 다짐이 되어 하루하루 성장하는 나를 발견해보세요
          </p>
          <div className="flex gap-4">
            <Link
              to="/auth/join"
              className="px-8 py-4 bg-main1 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center text-sm"
            >
              무료로 시작하기
            </Link>
            <Link
              to="/auth/login"
              className="px-8 py-4 border border-main1 text-main1 font-medium rounded-lg hover:bg-blue-50 transition-colors text-center text-sm"
            >
              기존 계정으로 로그인
            </Link>
          </div>
        </div>

        {/* Right — diagram */}
        <div className="flex items-center justify-center shrink-0">
          <LoopDiagram />
        </div>
      </main>
    </div>
  );
}

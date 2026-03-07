import { Link } from 'react-router';

export default function AuthNotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-5xl font-bold text-main1">404</span>
        <p className="text-base text-main2 font-medium">페이지를 찾을 수 없습니다</p>
        <p className="text-sm text-sub1">요청하신 페이지가 존재하지 않습니다.</p>
      </div>
      <Link
        to="/"
        className="px-6 py-2.5 bg-main1 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}

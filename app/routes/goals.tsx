import { Goals } from 'features/goals';

export function meta() {
  return [
    { title: '목표 관리 - Loop' },
    { name: 'description', content: '목표 관리 페이지' },
  ];
}

export default function GoalsPage() {
  return <Goals />;
}

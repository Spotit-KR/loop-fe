import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { GoalDetail } from 'features/goals/ui/GoalDetail';

export function meta() {
  return [
    { title: '목표 상세 - Loop' },
    { name: 'description', content: '목표 상세 페이지' },
  ];
}

export default function GoalDetailPage() {
  const { goalId } = useParams<{ goalId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!goalId) {
      navigate('/goals', { replace: true });
    }
  }, [goalId, navigate]);

  const handleBack = () => {
    navigate('/goals');
  };

  if (!goalId) {
    return null;
  }

  return <GoalDetail goalId={goalId} onBack={handleBack} />;
}

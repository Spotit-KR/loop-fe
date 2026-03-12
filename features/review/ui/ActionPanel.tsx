import { useSearchParams } from 'react-router';
import { CheckIcon } from 'shared/ui';
import { useTask } from 'features/task/model/useTask';

export function ActionPanel() {
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date') ?? '';

  const { myTasks } = useTask({ startDate: date, endDate: date });

  const completed = myTasks.filter((t) => t.status === 'DONE');
  const incomplete = myTasks.filter((t) => t.status === 'TODO');

  return (
    <aside className="w-50 shrink-0 overflow-y-auto pt-4">
      <h2 className="text-[25px] font-semibold text-main2 mb-4">오늘 액션</h2>
      <p className="text-[20px] text-sub2 mb-2">완료</p>
      <ul className="mb-4 space-y-2">
        {completed?.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <span className="w-3.75 h-3.75 rounded-full border-2 border-main1 bg-main1 shrink-0 flex items-center justify-center">
              <CheckIcon className="w-2.5 h-2.5" />
            </span>
            <span className="text-[15px] text-main1">{task.title}</span>
          </li>
        ))}
      </ul>
      <p className="text-[20px] text-sub2 mb-2">미완료</p>
      <ul className="space-y-2">
        {incomplete?.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <span className="w-3.75 h-3.75 rounded-full border-2 border-sub2 shrink-0" />
            <span className="text-[15px] text-sub2">{task.title}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

import { Todo } from 'features/todo/Todo';

export function meta() {
  return [
    { title: 'Todo - Loop' },
    { name: 'description', content: 'Todo page' },
  ];
}

export default function TodoPage() {
  return <Todo />;
}

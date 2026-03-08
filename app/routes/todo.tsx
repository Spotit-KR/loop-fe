import { Todo } from "../todo/todo";

export function meta() {
  return [
    { title: "Todo - Loop" },
    { name: "description", content: "Todo page" },
  ];
}

export default function TodoPage() {
  return <Todo />;
}

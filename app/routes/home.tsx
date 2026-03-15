import { useState } from 'react';
import type { Route } from './+types/home';
import { ReviewStartModal } from 'features/review';
import { useMyReviews } from 'features/history';
import { TodayReview } from 'entities/review';
import { Todo } from 'features/todo/todo';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'LOOP' }];
}
export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <Todo />
    </div>
  );
}

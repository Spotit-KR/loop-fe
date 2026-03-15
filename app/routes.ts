import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/private-layout.tsx', [
    layout('routes/layout.tsx', [
      index('routes/home.tsx'),
      route('history', 'routes/history.tsx'),
      route('todo', 'routes/todo.tsx'),
      route('goals', 'routes/goals.tsx'),
      route('goals/:goalId', 'routes/goals/goalId.tsx'),
      route('mypage', 'routes/mypage.tsx'),
    ]),
    route('review', 'routes/review.tsx'),
  ]),
  layout('routes/public-layout.tsx', [
    route('landing', 'routes/landing.tsx'),
    route('auth', 'routes/auth/layout.tsx', [
      index('routes/auth/index.tsx'),
      route('login', 'routes/auth/login.tsx'),
      route('join', 'routes/auth/join.tsx'),
    ]),
  ]),
] satisfies RouteConfig;

import { useState } from 'react';
import { Link } from 'react-router';
import { Input, Button } from 'shared/ui';
import { useLogin } from '../model/useLogin';

export function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { login, errorMessage } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id !== undefined && password !== undefined) {
      login({ loginId: id, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Input
          id="login-id"
          label="아이디"
          type="text"
          placeholder="아이디를 입력하세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <Input
          id="login-password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && (
        <div className="rounded-lg bg-red/10 px-4 py-3 text-sm text-red flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 5a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1zm0 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </div>
      )}
      <Button type="submit">로그인하기</Button>
      <p className="text-center text-sm text-sub1">
        계정이 없으신가요?{' '}
        <Link
          to="/auth/join"
          className="text-main1 font-medium hover:underline"
        >
          회원가입
        </Link>
      </p>
    </form>
  );
}

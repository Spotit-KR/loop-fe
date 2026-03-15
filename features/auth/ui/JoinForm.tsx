import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { Input, Button } from 'shared/ui';
import { useRegister } from '../model/useRegister';

interface PasswordCondition {
  label: string;
  met: boolean;
}

function PasswordConditionItem({ label, met }: PasswordCondition) {
  return (
    <li
      className={`text-xs flex items-center gap-1.5 ${met ? 'text-green' : 'text-sub2'}`}
    >
      <span>{met ? '✓' : 'X'}</span>
      <span>{label}</span>
    </li>
  );
}

export function JoinForm() {
  const [nickname, setNickname] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading, errorMessage } = useRegister();

  const conditions: PasswordCondition[] = [
    { label: '8자 이상', met: password.length >= 8 },
    { label: '영문(대소문자) 포함', met: /[a-zA-Z]/.test(password) },
    { label: '숫자포함', met: /[0-9]/.test(password) },
  ];

  const isPasswordValid = conditions.every((c) => c.met);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPasswordValid) return;
    register({ nickname, loginId, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Input
          id="join-nickname"
          label="닉네임"
          type="text"
          placeholder="표시할 이름을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <Input
          id="join-id"
          label="아이디"
          type="text"
          placeholder="아이디를 입력하세요"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          required
        />
        <div className="flex flex-col gap-2">
          <Input
            id="join-password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {password.length > 0 && (
            <ul className="flex flex-col gap-1 pl-1">
              {conditions.map((c) => (
                <PasswordConditionItem
                  key={c.label}
                  label={c.label}
                  met={c.met}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
      {errorMessage && (
        <div className="rounded-lg bg-red/10 px-4 py-3 text-sm text-red flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 5a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1zm0 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </div>
      )}
      <Button type="submit" disabled={loading || (password.length > 0 && !isPasswordValid)}>
        {loading ? '처리 중...' : '가입하기'}
      </Button>
      <p className="text-center text-sm text-sub1">
        이미 계정이 있으신가요?{' '}
        <Link
          to="/auth/login"
          className="text-main1 font-medium hover:underline"
        >
          로그인
        </Link>
      </p>
    </form>
  );
}

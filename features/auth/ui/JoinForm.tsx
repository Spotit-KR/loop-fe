import { useState } from 'react';
import { Link } from 'react-router';
import { Input, Button } from 'shared/ui';

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
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const conditions: PasswordCondition[] = [
    { label: '8자 이상', met: password.length >= 8 },
    { label: '영문(대소문자) 포함', met: /[a-zA-Z]/.test(password) },
    { label: '숫자포함', met: /[0-9]/.test(password) },
  ];

  const isPasswordValid = conditions.every((c) => c.met);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) return;
    // TODO: 회원가입 API 연동
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
          value={id}
          onChange={(e) => setId(e.target.value)}
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
      <Button type="submit" disabled={password.length > 0 && !isPasswordValid}>
        가입하기
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

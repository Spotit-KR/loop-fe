## 프로젝트 디렉토리 구조

```
root
├── app/                    # 전역 설정 (app.css, 라우팅)
├── widgets/                # 결합된 UI 블록
│   └── header/
├── features/               # 사용자 액션 위주
│   └── auth-by-email/
│   └── add-to-cart/
├── entities/               # 비즈니스 데이터 모델
│   └── product/
│       ├── ui/
│       ├── model/
│       └── api/
└── shared/                 # 공용 UI 및 유틸
    ├── ui/                 # Button, Input 등
    └── api/                # Axios 인스턴스 등
```

### ⚠️ 중요 규칙 (Strict Rules)

- Public API: 각 슬라이스는 반드시 index.ts를 통해 외부로 노출할 요소만 export해야 합니다. 내부 구현 파일(예: entities/user/ui/UserCard.tsx)을 직접 참조하는 것은 금지됩니다.

- 단방향 흐름: 상위 계층은 하위 계층을 가져올 수 있지만, 반대는 불가능합니다.
  - features는 entities를 가져올 수 있음 (O)
  - entities는 features를 가져올 수 없음 (X)

- 슬라이스 간 참조 금지: 같은 계층에 있는 슬라이스끼리는 서로를 참조할 수 없습니다. 필요한 경우 상위 계층에서 조합해야 합니다.

### 라우팅 시스템

해당 프로젝트는 React Router v7(7.12.0)을 프레임워크 모드로 사용합니다.

```
app/
├── root.tsx          # 앱 전체 레이아웃 (HTML shell)
├── routes.ts         # 라우트 설정 파일 (진입점)
└── routes/
    └── home.tsx      # 실제 라우트 컴포넌트
```

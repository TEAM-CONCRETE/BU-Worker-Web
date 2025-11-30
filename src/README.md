# 프로젝트 디렉토리 구조

이 문서는 프로젝트의 디렉토리 구조와 각 디렉토리의 역할을 설명합니다.

## 📁 디렉토리 구조

```
src/
├── app/                    # Next.js 15 App Router (라우팅, 레이아웃, 페이지)
├── components/             # 재사용 가능한 React 컴포넌트
│   ├── ui/                # 기본 UI 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   └── features/          # 기능별/도메인별 컴포넌트
├── lib/                   # 라이브러리 및 외부 모듈 래퍼
│   └── api/               # API 클라이언트 및 함수
├── utils/                 # 유틸리티 함수 및 헬퍼
├── types/                 # TypeScript 타입 정의
├── hooks/                 # Custom React Hooks
├── constants/             # 상수 정의
└── fonts/                 # 폰트 파일
```

## 📂 각 디렉토리 설명

### `app/`

Next.js 15 App Router의 핵심 디렉토리입니다.

- 라우팅: 폴더 구조 기반 라우팅
- 레이아웃: `layout.tsx`로 공통 레이아웃 정의
- 페이지: `page.tsx`로 페이지 컴포넌트 정의
- 메타데이터, 로딩, 에러 처리 등

### `components/ui/`

기본 UI 컴포넌트를 포함합니다.

- Button, Input, Card, Modal, Select 등
- 재사용 가능한 범용 컴포넌트
- 스타일링은 Tailwind CSS 사용

**예시:**

- `Button.tsx`
- `Input.tsx`
- `Card.tsx`
- `Modal.tsx`

### `components/common/`

프로젝트 전반에서 사용되는 공통 컴포넌트입니다.

- Header, Footer, Navigation 등
- 레이아웃 관련 컴포넌트
- 프로젝트 특화 공통 컴포넌트

**예시:**

- `Header.tsx`
- `Footer.tsx`
- `Layout.tsx`
- `Navigation.tsx`

### `components/features/`

기능별/도메인별 컴포넌트를 포함합니다.

- 특정 기능에 특화된 컴포넌트
- 얼굴인식, 인증, 대시보드 등 기능별 그룹화
- 필요시 하위 디렉토리로 세분화 가능

**예시:**

- `features/face-recognition/`
- `features/auth/`
- `features/dashboard/`

### `lib/`

라이브러리 및 외부 모듈 래퍼를 포함합니다.

- API 클라이언트 설정
- 외부 라이브러리 통합
- 복잡한 모듈 및 설정

### `lib/api/`

API 클라이언트 설정 및 API 호출 함수를 포함합니다.

- API 클라이언트 설정 (axios, fetch 등)
- API 엔드포인트별 함수
- API 타입 정의 (types와 연계)

**예시:**

- `client.ts` - API 클라이언트 설정
- `auth.ts` - 인증 관련 API
- `user.ts` - 사용자 관련 API

### `utils/`

유틸리티 함수 및 헬퍼 함수를 포함합니다.

- 날짜 포맷팅, 문자열 처리, 유효성 검사 등
- 재사용 가능한 순수 함수
- 작은 규모의 헬퍼 함수

**예시:**

- `formatDate.ts` - 날짜 포맷팅
- `validateEmail.ts` - 이메일 유효성 검사
- `debounce.ts` - 디바운스 함수
- `truncate.ts` - 문자열 자르기

### `types/`

TypeScript 타입 정의 및 인터페이스를 포함합니다.

- 공통 타입 정의
- API 응답 타입
- 컴포넌트 Props 타입 등

**예시:**

- `user.ts` - 사용자 관련 타입
- `api.ts` - API 응답 타입
- `common.ts` - 공통 타입

### `hooks/`

Custom React Hooks를 포함합니다.

- 재사용 가능한 로직을 Hook으로 추출
- 상태 관리, 사이드 이펙트 처리 등

**예시:**

- `useAuth.ts` - 인증 관련 Hook
- `useApi.ts` - API 호출 Hook
- `useLocalStorage.ts` - 로컬 스토리지 Hook

### `constants/`

프로젝트 전역 상수 정의를 포함합니다.

- API 엔드포인트 URL
- 설정값, 메시지 등
- 환경별 상수

**예시:**

- `api.ts` - API 엔드포인트
- `config.ts` - 설정 상수
- `messages.ts` - 메시지 상수

## 🎯 디렉토리 구조 원칙

1. **관심사의 분리 (Separation of Concerns)**
   - 각 디렉토리는 명확한 역할을 가집니다
   - 관련된 파일들을 논리적으로 그룹화합니다

2. **확장 가능성**
   - 새로운 기능 추가 시 기존 구조를 유지하면서 확장 가능
   - 기능별/도메인별 구조로 확장 용이

3. **재사용성**
   - 공통 컴포넌트와 유틸리티는 재사용 가능하도록 설계
   - 특정 기능에 종속되지 않는 범용 컴포넌트 분리

4. **Next.js 15 App Router 준수**
   - App Router의 규칙과 모범 사례를 따릅니다
   - `app/` 디렉토리는 Next.js 규칙에 따라 관리

## 📝 파일 네이밍 컨벤션

- **컴포넌트**: PascalCase (예: `Button.tsx`, `UserProfile.tsx`)
- **유틸리티/함수**: camelCase (예: `formatDate.ts`, `validateEmail.ts`)
- **타입**: camelCase (예: `user.ts`, `api.ts`)
- **상수**: camelCase (예: `api.ts`, `config.ts`)
- **Hook**: camelCase with `use` prefix (예: `useAuth.ts`, `useApi.ts`)

## 🔄 향후 확장 계획

프로젝트가 성장함에 따라 다음 구조를 추가할 수 있습니다:

- `src/store/` - 상태 관리 (Zustand, Redux 등)
- `src/styles/` - 전역 스타일 및 테마
- `src/config/` - 환경 설정 및 설정 파일

## 📌 `lib/` vs `utils/` 구분

- **`lib/`**: 더 큰 모듈, API 클라이언트, 외부 라이브러리 래퍼
- **`utils/`**: 작은 유틸리티 함수, 순수 함수, 헬퍼 함수

예를 들어:

- `lib/api/client.ts` ✅ (API 클라이언트 설정)
- `utils/formatDate.ts` ✅ (날짜 포맷팅 함수)
- `utils/validateEmail.ts` ✅ (이메일 검증 함수)

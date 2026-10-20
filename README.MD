# 나누리아이티 공식 웹사이트

나누리아이티(NanuriIT) 기업 홈페이지 프로젝트입니다.

## Tech Stack

| 구분 | 기술 | 버전 |
|------|------|------|
| Framework | Next.js (App Router) | 16.2.3 |
| Language | TypeScript | 5.x |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | 12.x |
| 3D | Three.js + React Three Fiber | 0.183.x |
| Runtime | Node.js | 22.x |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (폰트, 테마, 메타데이터)
│   ├── page.tsx                # 메인 페이지
│   ├── about/page.tsx          # 회사소개
│   ├── contact/page.tsx        # 도입 상담
│   └── services/               # 사업영역
│       ├── ai-ax/              # AI · AX 서비스
│       ├── financial-si/       # 금융 SI
│       ├── ibims/              # IB 시스템(IBIMS)
│       ├── proprietary/        # 고유자산
│       ├── sto/                # 토큰증권(STO)
│       ├── accounting/         # 회계 서비스
│       └── channel/            # 채널 서비스
├── components/
│   ├── Header.tsx              # 공통 헤더 (네비게이션)
│   ├── Footer.tsx              # 공통 푸터
│   ├── HeroSection.tsx         # 메인 히어로 섹션
│   ├── ContactCTA.tsx          # 도입 상담 CTA
│   ├── about/                  # 회사소개 컴포넌트
│   ├── contact/                # 도입 상담 폼/정보
│   ├── services/               # 사업영역 컴포넌트
│   ├── three/                  # Three.js 3D 배경
│   └── ui/                     # 공통 UI 컴포넌트
├── contexts/
│   └── ThemeContext.tsx         # 다크/라이트 테마 관리
└── lib/
    └── seo.ts                  # 페이지별 canonical·공유 미리보기(OG) 설정
```

새 페이지를 추가하면 `metadata`에 `...pageSeo({ path: "/경로" })`를 넣어 주세요. 넣지 않으면 canonical·og:url이 비어 검색엔진이 페이지를 잘못 인식할 수 있습니다. 공유 이미지(1200×630)는 `public/og/`에 있습니다.

## Design System

- **테마**: 다크(기본) / 라이트 전환 지원, CSS 변수 기반
- **Glass Morphism**: `backdrop-blur` + 반투명 배경 + 보더
- **색상**: Cyan(`#00d4ff`) / Indigo(`#6366f1`) 메인 액센트
- **폰트**: Noto Sans KR(본문), Outfit(헤딩), Space Mono(코드/라벨)
- **3D 배경**: 파티클 네트워크 + 메시 그라데이션 (다크 모드)

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 (포트 3300)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start
```

## Pages

| 경로 | 설명 |
|------|------|
| `/` | 메인 페이지 (히어로, 통계, 사업영역, 솔루션, 구축사례, 고객사, 기술스택) |
| `/about` | 회사소개 (미션, CEO 메시지, 비전, 연혁, 위치) |
| `/contact` | 도입 상담 (문의 폼 + 회사 기본정보 + 지도) |
| `/services/ai-ax` | AI · AX 서비스 (도입 조건, AI 에이전트 개발 방식, 모델 검증, FAQ) |
| `/services/financial-si` | 금융 SI |
| `/services/ibims` | IB 시스템(IBIMS) |
| `/services/proprietary` | 고유자산 |
| `/services/sto` | 토큰증권(STO) |
| `/services/accounting` | 회계 서비스 |
| `/services/channel` | 채널 서비스 |
| `/esg` | ESG 경영 |
| `/esg/ethics` | 윤리경영 정책 |
| `/esg/ethics/report` | 윤리 위반 신고 |
| `/privacy` | 개인정보처리방침 |

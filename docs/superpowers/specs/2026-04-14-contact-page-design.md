# /contact 도입 상담 페이지 설계

## 개요

나누리아이티 웹사이트에 도입 상담 전용 페이지(`/contact`)를 추가한다.
문의 폼(회사명, 담당자명, 연락처, 관심 서비스, 메시지)과 회사 기본정보(전화, 이메일, 주소, 지도)를 2-column glass 레이아웃으로 배치한다.
이메일 전송은 UI만 먼저 구축하고 추후 API Route로 연동할 수 있도록 구조화한다.

## 파일 구조

```
src/app/contact/page.tsx          # 페이지 컴포넌트 + metadata
src/components/contact/
  ContactForm.tsx                 # 폼 glass 패널 (왼쪽)
  ContactInfo.tsx                 # 회사 정보 + 지도 패널 (오른쪽)
```

## 페이지 레이아웃

### 데스크톱 (>= 768px)

```
Header (기존)
─────────────────────────────────────
 타이틀 영역: "도입 상담" + 서브텍스트
─────────────────────────────────────
 ContactForm (좌)  │  ContactInfo (우)
  · 회사명          │  전화 카드
  · 담당자명         │  이메일 카드
  · 연락처          │  주소 카드
  · 관심 서비스      │
  · 메시지          │  Google Map embed
  · [도입 상담 신청하기] │
─────────────────────────────────────
Footer (기존)
```

2-column: `grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8`

### 모바일 (< 768px)

단일 컬럼으로 전환: 폼 → 정보 카드(세로 스택) → 지도 순서.

## 컴포넌트 상세

### 1. `src/app/contact/page.tsx`

- `export const metadata`: title "도입 상담", description 포함
- Header, main(pt-16), Footer 구조 (기존 페이지 패턴 동일)
- 타이틀 섹션: mono 라벨("CONTACT US") + h1("도입 상담") + 서브텍스트
- 2-column grid에 ContactForm, ContactInfo 배치
- framer-motion 진입 애니메이션 (기존 item/container 패턴)

### 2. `ContactForm.tsx`

glass 패널 안에 폼 필드 배치.

| 필드 | name | type | required | 비고 |
|------|------|------|----------|------|
| 회사명 | company | text | true | |
| 담당자명 | name | text | true | |
| 연락처 | phone | tel | true | |
| 관심 서비스 | service | select | true | 옵션: 금융 SI, IB 시스템(IBIMS), 고유자산, 토큰증권(STO), 회계 서비스, 채널 서비스, 기타 |
| 메시지 | message | textarea | false | placeholder: "문의하실 내용을 입력해주세요" |

- 각 input focus: `outline-none ring-2 ring-cyan-500/30` + border-color cyan
- 스타일: glass 배경, rounded-2xl, 기존 CSS 변수 사용
- 제출 버튼: primary gradient, "도입 상담 신청하기 →"
- 제출 동작: 현재는 `mailto:mie.shin@nanuriit.kr`로 fallback (subject/body에 폼 데이터 인코딩). 추후 API Route 연동 시 fetch로 교체.
- 제출 후 간단한 "문의가 접수되었습니다" 상태 표시

### 3. `ContactInfo.tsx`

회사 기본정보 카드 3개 + Google Map embed.

연락처 정보:
- 전화: 02.6969.0319
- 이메일: mie.shin@nanuriit.kr
- 주소: 서울특별시 영등포구 선유로49길 23, 1016호 (양평동 4가, 아이에스비즈타워2차)

카드 스타일: Location.tsx 패턴과 동일 (glass rounded-2xl, icon + label + value).
지도: Google Maps embed iframe, grayscale 필터 적용, rounded-2xl.

## 기존 버튼 변경

| 파일 | 현재 텍스트 | 변경 텍스트 | 현재 href | 변경 href |
|------|-----------|-----------|----------|----------|
| Header.tsx (데스크톱 pill) | 도입 문의 | 도입 상담 | /#contact | /contact |
| Header.tsx (모바일 하단) | 도입 문의 | 도입 상담 | /#contact | /contact |
| ContactCTA.tsx (메인 CTA) | 도입 문의하기 | 도입 상담 | mailto:help@nanuriit.kr | /contact |
| services/ibims - IbimsWorkflow.tsx | IBIMS 도입 문의 | 유지 | /#contact | /contact |
| services/financial-si - SiLoanSystem.tsx | 도입 문의하기 | 유지 | /#contact | /contact |
| services/proprietary - PropWorkflow.tsx | 도입 문의하기 | 유지 | /#contact | /contact |
| services/sto - StoWorkflow.tsx | 도입 문의하기 | 유지 | /#contact | /contact |
| services/accounting - AcctWorkflow.tsx | 도입 문의하기 | 유지 | /#contact | /contact |
| services/channel - ChannelFunctions.tsx | 도입 문의하기 | 유지 | /#contact | /contact |

변경하지 않는 것:
- HeroSection "도입 상담 시작" → /#contact 유지 (메인 페이지 내 스크롤)
- ContactCTA 전화 버튼 → tel: 유지
- Footer "도입 문의" 링크 → /#contact 유지

## 스타일링

- 기존 glass, gradient-text, CSS 변수 패턴 준수
- 다크/라이트 테마 모두 대응 (CSS 변수 자동 전환)
- framer-motion: item/container 패턴 (opacity + y 애니메이션, staggerChildren)
- 폼 input: glass 배경보다 약간 어두운 배경 (`rgba(0,0,0,0.2)` 다크 / `rgba(0,0,0,0.05)` 라이트)

## 이메일 연동 (추후)

현재는 mailto fallback. 추후 연동 시:
1. `src/app/api/contact/route.ts` API Route 생성
2. Resend 또는 Nodemailer로 mie.shin@nanuriit.kr에 이메일 발송
3. ContactForm의 handleSubmit을 fetch POST로 교체

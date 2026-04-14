# 🚀 나누리아이티 홈페이지 3D 미래지향 재구축 — Claude Code 마스터 프롬프트 V2

> **V2 핵심 차별점**: Three.js 3D 파티클 네트워크 + WebGL 메시 그라디언트 + 와이어프레임 지오메트리 배경
> Stripe, Linear, Vercel 등 글로벌 탑티어 기업의 3D 백그라운드 패턴을 적용한 버전

---

## 사용법

```bash
# 1. 프로젝트 폴더 생성 후 진입
mkdir nanuriit-3d && cd nanuriit-3d

# 2. Claude Code 실행 후 아래 프롬프트 전체를 붙여넣기
claude
```

---

## 프롬프트 (아래 전체를 복사하여 Claude Code에 입력)

```
당신은 시니어 풀스택 웹 개발자이자 WebGL/3D 전문 크리에이티브 개발자입니다.
"나누리아이티(Nanuri IT)" 회사의 홈페이지를 Three.js 3D 배경 + Liquid Glass UI로 완전히 재구축합니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 PHASE 0: 기술 스택 & 프로젝트 구조
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[기술 스택]
- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS 4
- Three.js (3D 파티클 네트워크, 와이어프레임 지오메트리, 퍼스펙티브 그리드)
- React Three Fiber (@react-three/fiber) + Drei (@react-three/drei)
- Custom GLSL Shaders (파티클 글로우, 메시 그라디언트)
- Framer Motion (UI 애니메이션, 스크롤 트리거)
- Lucide Icons

[초기화 명령]
npx create-next-app@latest . --typescript --tailwind --app --eslint
npm install three @react-three/fiber @react-three/drei framer-motion lucide-react
npm install -D @types/three

[폴더 구조]
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # 메인 홈
│   ├── about/page.tsx              # 회사소개
│   ├── services/
│   │   ├── page.tsx                # 사업영역 개요
│   │   ├── financial-si/page.tsx   # 금융 SI
│   │   ├── ib-system/page.tsx      # IB 시스템 (IBIMS)
│   │   ├── proprietary/page.tsx    # 고유자산
│   │   ├── sto/page.tsx            # 토큰증권
│   │   ├── accounting/page.tsx     # 회계 서비스
│   │   └── channel/page.tsx        # 채널 서비스
│   ├── contact/page.tsx            # 도입문의
│   └── globals.css
├── components/
│   ├── three/                      # ★ 3D 전용 컴포넌트 (핵심)
│   │   ├── SceneContainer.tsx      # R3F Canvas 래퍼 (전역 3D 배경)
│   │   ├── ParticleNetwork.tsx     # 3D 파티클 + 연결선 시스템
│   │   ├── PerspectiveGrid.tsx     # 물결치는 3D 바닥 그리드
│   │   ├── FloatingGeometry.tsx    # 와이어프레임 Icosahedron + TorusKnot
│   │   ├── MeshGradient.tsx        # Stripe 스타일 WebGL 메시 그라디언트
│   │   └── shaders/
│   │       ├── particleVertex.glsl
│   │       ├── particleFragment.glsl
│   │       ├── gridVertex.glsl
│   │       ├── gridFragment.glsl
│   │       └── gradientFragment.glsl
│   ├── layout/
│   │   ├── Navbar.tsx              # 글래스모피즘 내비게이션
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Metrics.tsx             # 핵심 지표 카운터
│   │   ├── Services.tsx            # 6대 사업영역 카드
│   │   ├── Solutions.tsx           # IBIMS 쇼케이스
│   │   ├── Clients.tsx             # 고객사 pill 그리드
│   │   ├── Certifications.tsx      # 인증 & 파트너십
│   │   └── CTA.tsx
│   ├── about/
│   │   ├── Mission.tsx
│   │   ├── History.tsx             # 연혁 타임라인
│   │   └── Location.tsx
│   └── ui/
│       ├── GlassCard.tsx
│       ├── SectionLabel.tsx
│       ├── AnimatedCounter.tsx
│       ├── GradientText.tsx
│       ├── ScrollReveal.tsx
│       └── CursorGlow.tsx          # 마우스 따라다니는 글로우
├── lib/
│   ├── constants.ts                # 회사 데이터 (연혁, 서비스, 고객사 등)
│   └── utils.ts
└── public/
    └── images/


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 PHASE 1: 회사 정보 데이터 — 실제 콘텐츠 기반
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[회사 기본정보]
- 회사명: 주식회사 나누리아이티 (Nanuri IT Co., Ltd.)
- 설립: 2013년
- 대표: 신미선
- 주소: (07208) 서울특별시 영등포구 선유로49길 23, 1016호 (양평동4가, 아이에스비즈타워2차)
- TEL: 02-6959-0319
- EMAIL: help@nanuriit.kr
- 웹사이트: https://www.nanuriit.kr

[슬로건 & 미션]
- 메인 슬로건: "금융 IT의 미래를 선도하는 전문 파트너"
- 서브: "풍부한 금융권 개발 경험과 전문성을 바탕으로 금융 IT 서비스를 제공합니다"
- 미션: "신뢰와 혁신으로 금융의 미래를 설계하는 IT 파트너"
- 비전: "더 나은 금융 혁신을 위한 기술 개발"
- 영문 비전: "We Create new finance with Creative ideas and innovation"

[핵심 수치]
- 수행 프로젝트: 69건+
- 주요 파트너: 15개사+
- 전년 대비 매출 증가율: 100%
- 프로젝트 수주: 100건+

[6대 사업영역] — lib/constants.ts에 타입 안전하게 정의
1. 금융 SI (System Integration)
   - 아이콘: ⚡ / 컬러: cyan
   - 설명: 계좌/출납/뱅킹, 청약/권리, 주문/체결/결제 시스템
   - 부가: 유가증권관리, 금융상품, 영업관리, 고객관리, 여신 시스템
   - 태그: Banking · Trading · Settlement

2. IB 시스템 (IBIMS - IB통합관리시스템)
   - 아이콘: 🏦 / 컬러: indigo
   - 핵심: "초기 Deal 소싱단계에서 사전영업부터 성과관리 운영까지"
   - 부가: 투자은행 업무 일체의 영업활동 지원 솔루션
   - 태그: Deal Sourcing · Performance
   - 특이사항: 한국저작권위원회 등록 완료 (2025)

3. 고유자산 (Proprietary Trading System)
   - 아이콘: 📈 / 컬러: emerald
   - 설명: 고유자산 효율적 관리 및 성장 지원
   - 부가: 리스크 관리 강화, 거래 전략 수립/관리
   - 태그: Risk Mgmt · Strategy

4. 토큰증권 (STO - Security Token Offering)
   - 아이콘: 🔗 / 컬러: rose
   - 설명: 다수 분산원장(메인넷) 연결 문제 해결
   - 부가: 기존 증권시스템과 연계된 통합 서비스 환경, 적은 비용/빠른 구축
   - 태그: Blockchain · DLT · Token

5. 회계 서비스 (Accounting Service)
   - 아이콘: 📊 / 컬러: amber
   - 설명: 30년 경력 이상 업계 전문가 구성
   - 부가: 금융 회계 시스템 구축, 운영, 컨설팅
   - 태그: IFRS · Consulting

6. 채널 서비스 (Channel Service)
   - 아이콘: 📱 / 컬러: cyan
   - 설명: MTS, HTS, WTS 등 맞춤 개발
   - 부가: 은행, 증권사, 저축은행 등 금융기관 대상
   - 태그: MTS · HTS · WTS

[주요 고객사 — 20개, 반드시 전부 포함]
하나증권, 하나은행, 한국투자증권, KB증권, KB국민은행,
메리츠증권, 신한투자증권, 우리투자증권, 현대차증권,
미래에셋증권, 제주은행, 수출입은행, NH농협생명,
주택도시보증공사(HUG), 건설공제조합, DB손해보험,
흥국생명, 삼성SDS, LG CNS, SK주식회사

[인증 & 파트너십 — 6개 하이라이트]
1. 2026 | 우수협력사 선정 | 하나금융TI
2. 2025 | Inno-Biz 인증 | 중소벤처기업부
3. 2025 | IBIMS 저작권 등록 | 한국저작권위원회
4. 2024 | 여성기업 인증 | 서울지방중소벤처기업청
5. 2022 | T4 기술역량 우수기업 | 한국평가데이터
6. 2022 | 기업연구개발전담부서 | 과학기술정보통신부

[연혁 — 주요 마일스톤]
2013: 법인 설립
2020: IB통합관리시스템 패키지 개발, 다수 금융기관 프로젝트 시작
2021: 발행어음 시스템 구축, 헬스케어 협력사 체결
2022: 기업연구개발전담부서 인증, T4 인증, 소수단위 거래 시스템
2023: 하나증권 STO 시스템 구축, 유한대학교 산학협력
2024: HUG 차세대 시스템, 여성기업 인증, 삼성SDS 파트너
2025: Inno-Biz 인증, IBIMS/AIFSA 저작권 등록, 차세대/고도화 대규모 수행
2026: 하나금융TI 우수협력사, LG CNS/SK/삼성SDS 파트너십 확대


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 PHASE 2: 3D 배경 시스템 — 핵심 구현 명세
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

★ 이 프로젝트의 가장 중요한 차별화 요소.
★ 3개의 독립 레이어가 합성되어 전체 배경을 구성함.
★ SceneContainer.tsx를 layout.tsx에 고정(fixed)으로 배치하여 모든 페이지에서 동일한 3D 배경 공유.

═══ Layer 1: Three.js 3D 파티클 네트워크 (ParticleNetwork.tsx) ═══
- React Three Fiber의 Canvas 안에 구현
- 파티클 수: 150~200개 (모바일: 80개로 감소)
- 3D 공간 분포: X/Y ±40, Z ±24 범위에서 무작위 배치
- 각 파티클은 독립적인 velocity 벡터를 가지며 경계에서 반사
- 커스텀 GLSL 셰이더 적용:
  - vertexShader: 시점 거리에 따라 pointSize 동적 조절 (멀수록 작게)
  - fragmentShader: radial glow (exp(-d*6.0)), 시안↔인디고 컬러 시프팅
  - blending: AdditiveBlending, transparent, depthWrite: false
- 연결선(Connection Lines):
  - 매 프레임 파티클 간 거리 계산
  - 거리 < 12 유닛인 쌍은 LineSegments로 연결
  - 라인 컬러: 시안(#00d4ff), opacity: 0.06, AdditiveBlending
  - LineBasicMaterial 사용
- 마우스 인터랙션:
  - mousemove 이벤트로 normalized position (-1 ~ 1) 추적
  - 카메라 position.x/y를 마우스 위치에 연동 (lerp 계수 0.04)
  - 카메라는 항상 원점(0,0,0)을 lookAt → 자연스러운 패럴랙스

═══ Layer 2: 3D 오브젝트 (FloatingGeometry.tsx) ═══
- IcosahedronGeometry(radius: 6, detail: 1)
  - wireframe: true, color: #6366f1(인디고), opacity: 0.08
  - position: (20, 8, -15), 천천히 X/Y축 회전
  - Y축 sine 기반 부유 모션 (amplitude: 3)
- TorusKnotGeometry(radius: 4, tube: 0.6, segments: 80, radialSegments: 12)
  - wireframe: true, color: #10b981(에메랄드), opacity: 0.06
  - position: (-22, -5, -18), X/Z축 회전
  - Y축 cosine 기반 부유 모션 (amplitude: 2)

═══ Layer 3: 3D 퍼스펙티브 그리드 (PerspectiveGrid.tsx) ═══
- PlaneGeometry(200, 200, 40, 40)
  - rotation.x: -π * 0.42 (원근감 있는 기울기)
  - position: y=-22, z=-20
- 커스텀 셰이더:
  - vertexShader: UV + time 기반 sine/cosine 파동 (z축 displacement)
  - fragmentShader: fract(uv * 40) 기반 그리드 라인 렌더링
  - 라인 컬러: rgba(0, 212, 255, 0.08), 거리에 따라 페이드아웃
  - 카메라 거리 기반 smoothstep 페이드

═══ Layer 4: WebGL 메시 그라디언트 (MeshGradient.tsx) ═══
- 별도의 <canvas>에 raw WebGL로 렌더링 (R3F 밖에서)
- fullscreen quad에 fragment shader 적용
- 셰이더 로직:
  - 3개의 sinusoidal color field (r, g, b) — 시간에 따라 위상 변화
  - 4가지 컬러 포인트: cyan(0,0.83,1), indigo(0.39,0.4,0.95), emerald(0.06,0.73,0.5), dark(0.02,0.02,0.06)
  - mix() 함수로 레이어드 블렌딩
  - vignette: 중심에서 멀어질수록 어두워짐
  - 전체 opacity: 0.5, mix-blend-mode: screen (위의 Three.js와 합성)
- CSS: position: fixed, z-index: -2 (Three.js canvas는 z-index: -3)

═══ 성능 최적화 규칙 ═══
- 파티클 연결선 계산: 프레임마다 전체를 계산하되, 실제 drawRange 제한
- renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) — Retina 제한
- 모바일 감지 시 파티클 수 80으로 감소, 연결선 maxDist 줄임
- WebGL context lost 이벤트 핸들링
- React Three Fiber의 frameloop="demand" 고려 (스크롤 밖일 때)
- useFrame 훅 안에서 requestAnimationFrame 중복 호출하지 않기


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 PHASE 3: 디자인 시스템
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[컨셉: "Calm Futurism × Financial Trust"]
금융 IT의 신뢰감 + 3D 기술력의 미래지향성.
Apple Liquid Glass 영감 + Stripe 메시 그라디언트 + Awwwards 3D 파티클.

[컬러 시스템] — Tailwind 커스텀 테마로 확장 등록
- 다크 배경: #04040c (bg), #08081a (surface)
- primary (cyan): #00d4ff — 기술 혁신, 파티클 컬러
- secondary (indigo): #6366f1 — 금융 신뢰
- accent-emerald: #10b981 — 성장/안정
- accent-rose: #f43f5e — 포인트/경고
- accent-amber: #f59e0b — 회계/데이터
- 텍스트: #eeeef2 (primary), rgba(238,238,242,0.5) (muted)
- Glass: bg rgba(255,255,255,0.04), border rgba(255,255,255,0.08)

[타이포그래피]
- 한글: Pretendard (CDN woff2 or next/font/local)
  https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css
- 영문 디스플레이: Outfit (Google Fonts, next/font/google)
- 모노: Space Mono 또는 JetBrains Mono
- 히어로: clamp(3rem, 7.5vw, 7rem), weight 900, tracking -0.04em
- 섹션 제목: clamp(2rem, 4.5vw, 3.5rem), weight 800
- 본문: 1rem~1.05rem, weight 400, leading 1.75

[Liquid Glass 컴포넌트 — GlassCard.tsx]
- bg: rgba(255,255,255,0.04)
- backdrop-filter: blur(40px) saturate(1.5)
- border: 1px solid rgba(255,255,255,0.08)
- border-radius: 24px
- 상단 하이라이트: ::before pseudo로 gradient(90deg, transparent→white(0.14)→transparent)
- 내부 그라디언트: ::after pseudo로 gradient(135deg, rgba(255,255,255,0.03)→transparent)
- hover: bg→rgba(255,255,255,0.1), translateY(-4px), box-shadow glow
- transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)

[노이즈 텍스처]
- body::after에 fixed SVG feTurbulence overlay (opacity: 0.035)
- pointer-events: none, z-index: 10000

[커서 글로우 — CursorGlow.tsx]
- fixed div, 400x400px, border-radius: 50%
- radial-gradient(circle, rgba(0,212,255,0.07), transparent 70%)
- mousemove 이벤트로 위치 추적 (transform: translate(-50%,-50%))
- transition: left/top 0.12s ease-out
- mix-blend-mode: screen
- 모바일에서는 숨김

[애니메이션 가이드]
- 스크롤 리빌: Framer Motion whileInView={{ opacity:1, y:0 }}
  - initial={{ opacity:0, y:36 }}, transition: { duration:0.7, ease:[0.16,1,0.3,1] }}
  - staggerChildren: 0.08
- 카운터: InView 트리거 → setInterval로 0에서 target까지 50프레임
- 히어로 그라디언트 텍스트: background-size:200%, 6s 주기 shift
- 히어로 배지 pulse dot: scale 1→1.6, opacity 1→0.3, 2s 주기
- 서비스 카드 hover: translateY(-6px) + service-tag fadeIn
- CTA 배경: conic-gradient 25s 회전 (opacity 0.04)
- 마키: translateX(0→-50%), 35s linear infinite


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 PHASE 4: 페이지별 상세 구현 명세
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

═══ 4-1. 메인 홈페이지 (/) — 8개 섹션 ═══

[1. Navbar] — components/layout/Navbar.tsx
- Fixed top, z-index: 9000
- 초기 상태: 배경 투명
- 스크롤 > 80px 시: glassmorphism 배경 + 하단 border + padding 축소
- 좌측: "나누리아이티" 텍스트 로고 (gradient: cyan→indigo)
- 중앙: 회사소개 | 사업영역(드롭다운 6개 서브메뉴) | Contact Us
  - 드롭다운: glass 패널, hover 시 3D rotateX 열림 (Stripe 네비 참고)
- 우측: "도입 문의" pill 버튼 (gradient bg)
- 모바일 (< 768px): 중앙 링크 숨김, 햄버거 아이콘 → fullscreen glass 오버레이 메뉴
- 네비게이션 링크: uppercase, tracking 0.04em, 하단 underline hover 애니메이션

[2. Hero] — components/home/Hero.tsx
- 풀스크린 (min-h-screen), flex-center, text-center
- z-index: 2 (3D 배경 위에 올라옴)
- 배지: "● 2026 금융 IT 혁신 파트너" (glass pill, cyan pulse dot)
- 메인 타이틀 (h1, 3줄 block):
  1줄: "금융의 미래를" — 일반 white
  2줄: "기술로 설계합니다" — gradient-text (cyan→indigo→emerald, animated)
  3줄: "NANURI IT" — outline stroke (rgba white 0.25), 작은 크기 (0.55em)
- 서브카피: "수십 년간 금융권에서 쌓아온 경험과 전문성으로~" (text-muted, max-w-580px)
- CTA 2개:
  - [도입 상담 시작 →] — primary gradient, hover glow + translateY(-3px)
  - [사업영역 보기] — ghost border, hover cyan border+text
- 스크롤 인디케이터: "Scroll" 텍스트(mono) + 1px 시안 라인 (pulse 애니메이션)
- 모든 요소는 staggered fadeUp (0 → 0.1s → 0.2s → 0.3s → 0.5s)

[3. Metrics] — components/home/Metrics.tsx
- 히어로 바로 아래, 위로 -50px 오버랩
- max-w-1100px, 4칸 그리드 (2칸 @mobile)
- 칸 사이: 1px gap (glass-border 색상으로 구분선 효과)
- 각 카드: 배경 rgba(4,4,12,0.7) + backdrop-blur
- 숫자: Outfit 800, 2.8rem, 시안 accent
- 라벨: Space Mono, 0.72rem, uppercase, muted
- 카운터 값: 69+ / 15+ / 100% / 100+
- InView 진입 시 카운트업 애니메이션

[4. Services] — components/home/Services.tsx
- 섹션라벨: "— Our Services"
- 타이틀: "금융 IT의 모든 것을 담다"
- 설명: "증권, 은행 등 금융 산업의 핵심 서비스들을 제공하고 있습니다."
- 3×2 그리드 (2칸 @tablet, 1칸 @mobile), gap 16px
- 각 카드 (GlassCard):
  - 아이콘: 52px rounded-14 colored bg pill + blur glow ::after
  - 한글명 (h3, Outfit 700, 1.2rem)
  - 영문명 (mono, 0.7rem, cyan, uppercase)
  - 설명 (body, 0.9rem, muted)
  - 태그 (mono, 0.68rem, cyan) — 평상시 숨김, hover 시 fadeIn + translateY

[5. Solutions] — components/home/Solutions.tsx (IBIMS 쇼케이스)
- 2칸 그리드 (좌: 비주얼, 우: 텍스트) — 1칸 @mobile
- 좌측 비주얼:
  - glass 테두리의 4:3 컨테이너
  - 내부: 36px 간격 그리드 라인 애니메이션 (driftX/Y 36px, 20s)
  - 3개의 floating 데이터 카드 (glass, backdrop-blur):
    - "Deal Pipeline" +247% (cyan) + progress bar 78%
    - "운용 효율" 98.7% (indigo) + progress bar 64%
    - "시스템 안정성" A++ (emerald) + progress bar 91%
  - 각 카드는 서로 다른 delay의 float 애니메이션 (7s ease-in-out)
- 우측 텍스트:
  - 라벨: "— Core Solution"
  - 타이틀: "IB통합관리시스템 IBIMS"
  - 설명: "투자은행 업무와 관련한 일체의 영업활동을 지원하는 토탈 솔루션"
  - 체크리스트 4개 (시안 check 아이콘 pill + 텍스트):
    1. 초기 Deal 소싱부터 성과관리 운영까지 End-to-End 지원
    2. 한국저작권위원회 정식 저작권 등록 완료
    3. 주요 증권사 도입 및 운영 검증 완료
    4. 맞춤형 확장 및 기존 시스템 연계 용이

[6. Clients] — components/home/Clients.tsx
- 라벨: "— Trusted By"
- 타이틀: "주요 고객사"
- 설명: "나누리아이티는 다양한 금융기관의 프로젝트를 성공적으로 수행하고 있습니다."
- 고객사 20개를 glass pill 태그로 나열 (flex-wrap)
- pill: rounded-full, glass-bg, glass-border, backdrop-blur
- hover: cyan 배경 틴트 + cyan border + cyan text

[7. Certifications] — components/home/Certifications.tsx
- 라벨: "— Certifications"
- 타이틀: "인증 & 파트너십"
- 3×2 glass 카드 그리드 (2칸 @tablet, 1칸 @mobile)
- 각 카드: 연도(mono, cyan) + 인증명(bold) + 기관명(muted)

[8. CTA] — components/home/CTA.tsx
- 중앙 정렬, glass 패널 (max-w-860px, padding 80px)
- 배경: conic-gradient 회전 애니메이션 (opacity 0.04)
- 타이틀: "고객의 가치를 실현하는 금융 솔루션"
- 설명: "나누리아이티와 함께 맞춤형 금융 솔루션을 문의하세요"
- CTA 2개: [도입 문의하기 →] + [02-6959-0319]

[기술 마키] — Hero와 CTA 사이에 배치
- 좌우 fade-out gradient mask
- 14개 항목 × 2세트(무한 루프): 금융 SI, IBIMS, STO 플랫폼, ...
- 35s linear infinite translateX

[Footer] — components/layout/Footer.tsx
- 4칸 그리드: 브랜드소개 | 서비스 | 회사 | 연락처
- 하단: 카피라이트 + 대표/사업자 정보
- border-top: glass-border


═══ 4-2. 회사소개 페이지 (/about) ═══

[히어로]
- 반높이 (60vh), glass 오버레이 배경
- 타이틀: "신뢰와 혁신으로 금융의 미래를 설계합니다"
- 서브: 대표 인사말 요약

[미션 & 비전 — Mission.tsx]
- 미션 3개 glass 카드: 고객 가치 실현 / 끊임없는 성장 / 지속가능한 파트너
- 비전 영역: 큰 인용문 스타일
- 대표 메시지: 신미선 대표 (blockquote glass)

[연혁 — History.tsx]
- 세로 타임라인: 중앙 1px 시안 라인
- 좌우 교대 레이아웃 (모바일: 한쪽 정렬)
- 2013 → 2026 역순 (최신이 위)
- 스크롤에 따라 라인 progressively reveal (Framer Motion scaleY)
- 각 연도: 시안 dot marker + 연도 배지 + 주요 항목 3~5개

[오시는 길 — Location.tsx]
- 카카오맵 iframe embed (또는 정적 지도 이미지)
- 주소, 전화, 이메일 glass 카드
- 네이버 지도 외부 링크 버튼


═══ 4-3. 사업영역 상세 6개 페이지 (/services/*) ═══

공통 레이아웃:
- 히어로: 서비스명(한글+영문) + 한 줄 설명 + 아이콘
- 상세 설명: glass 카드 기반 콘텐츠
- 관련 프로젝트 사례: lib/constants.ts 연혁 데이터에서 필터링
- CTA: "도입 문의하기" 섹션


═══ 4-4. 도입문의 페이지 (/contact) ═══

- 2칸 레이아웃 (1칸 @mobile)
- 좌측: glass 패널 안에 폼
  - 필드: 이름, 회사명, 이메일, 전화번호, 관심 서비스(select), 문의내용(textarea)
  - 각 필드 focus 시: cyan border glow (ring-cyan-500/30)
  - 제출 버튼: primary gradient
- 우측: 연락처 glass 카드 + 약식 지도
- 폼 액션: 일단 UI만 구현 (추후 API Route 연동 가능하도록 구조화)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 PHASE 5: 성능 · SEO · 접근성
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[성능]
- Three.js Canvas: layout.tsx에 한 번만 마운트 (페이지 전환 시 재생성 방지)
- R3F Canvas에 dpr={[1, 2]} (Retina 제한)
- 모바일 감지 후 파티클 수 줄임 (window.innerWidth < 768)
- next/font로 폰트 최적화 (Pretendard: local, Outfit/Space Mono: google)
- next/image로 이미지 최적화 (현재는 이미지 최소화, 텍스트 중심)
- Framer Motion: LazyMotion + domAnimation으로 번들 최소화
- dynamic import: Three.js 컴포넌트를 next/dynamic SSR: false로 로딩
  → import dynamic from 'next/dynamic'
  → const SceneContainer = dynamic(() => import('@/components/three/SceneContainer'), { ssr: false })

[SEO — 각 페이지 metadata export]
- 홈: "나누리아이티 | 금융 IT 전문 파트너 - 금융 SI, IB시스템, STO"
- 회사소개: "나누리아이티 | 회사소개 - 금융 IT의 미래를 선도하는 전문 파트너"
- 사업영역: "나누리아이티 | 사업영역 - 금융 SI, IB 시스템, 고유자산, STO, 회계, 채널"
- 도입문의: "나누리아이티 | 도입 문의 - 맞춤형 금융 솔루션"
- OpenGraph: title, description, siteName, locale: 'ko_KR'
- sitemap.ts + robots.ts 생성
- JSON-LD: Organization schema

[접근성]
- 모든 인터랙티브 요소에 aria-label
- Three.js canvas에 aria-hidden="true" (장식 요소)
- 글래스 카드 내 텍스트: WCAG AA 명암비 확인 (밝은 텍스트 on dark)
- 키보드 네비게이션: Tab순서, focus-visible 스타일
- prefers-reduced-motion 미디어쿼리:
  - 파티클 속도 0으로 (정지 상태)
  - 모든 CSS/Framer 애니메이션 duration: 0
  - 마키 정지
- 스크린리더: 3D Canvas 영역 스킵


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 PHASE 6: 실행 순서 (10 STEP)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

아래 순서대로 구현하세요.
각 STEP 완료 후 "✅ STEP N 완료"를 출력하고 다음으로 진행.
빌드 에러 발생 시 즉시 수정 후 재빌드.

STEP 1: 프로젝트 초기화
  - create-next-app + 패키지 설치
  - globals.css: CSS 변수, 노이즈 텍스처, 커서 글로우 스타일
  - tailwind.config.ts: 커스텀 컬러/폰트/breakpoint 확장
  - layout.tsx: 폰트 설정 + 기본 구조

STEP 2: 데이터 & 유틸리티
  - lib/constants.ts: 모든 회사 데이터를 TypeScript 타입과 함께 정의
    interface Service, Client, Certification, HistoryEntry 등
  - lib/utils.ts: cn() 클래스 합성 유틸 등

STEP 3: ★ 3D 배경 시스템 (가장 중요)
  - components/three/ 전체 구현
  - SceneContainer.tsx: R3F Canvas + 3개 하위 컴포넌트 합성
  - ParticleNetwork.tsx: GLSL 셰이더 + 연결선
  - PerspectiveGrid.tsx: 물결 그리드
  - FloatingGeometry.tsx: 와이어프레임 2개
  - MeshGradient.tsx: 별도 canvas WebGL 셰이더
  - layout.tsx에 SceneContainer를 fixed 배치 (dynamic import, ssr: false)
  - ⚠️ 이 단계에서 npm run dev로 3D 배경이 정상 렌더링되는지 반드시 확인

STEP 4: UI 공통 컴포넌트
  - GlassCard, SectionLabel, ScrollReveal, AnimatedCounter, GradientText, CursorGlow

STEP 5: Navbar + Footer
  - 글래스 네비게이션 (스크롤 전환, 드롭다운, 모바일 메뉴)
  - 풋터

STEP 6: 메인 홈페이지
  - Hero → Metrics → Services → Solutions → Clients → Certifications → 마키 → CTA
  - 모든 섹션이 스크롤 리빌로 등장

STEP 7: 회사소개 페이지
  - Mission → History Timeline → Location

STEP 8: 도입문의 페이지
  - 폼 UI + 연락처 정보

STEP 9: 사업영역 상세 6개 페이지
  - 공통 레이아웃 + 각 서비스별 콘텐츠

STEP 10: SEO + 빌드 테스트
  - metadata, sitemap.ts, robots.ts, JSON-LD
  - npm run build → 에러 없이 성공 확인
  - "🎉 빌드 완료" 출력


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ 절대 금지 사항
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Inter, Roboto, Arial 등 기본 폰트 사용 금지
2. 보라색+흰색 제네릭 AI 그라디언트 디자인 금지
3. placeholder 텍스트("Lorem ipsum") 사용 금지 — 모든 텍스트는 나누리아이티 실제 데이터
4. 미완성 컴포넌트나 TODO 코멘트 남기기 금지
5. Three.js를 SSR에서 렌더링 시도 금지 — 반드시 dynamic import + ssr: false
6. 외부 이미지 URL 직접 참조 금지
7. R3F Canvas를 페이지 컴포넌트 안에 넣기 금지 — layout.tsx에 한 번만 마운트
8. useEffect 안에서 Three.js 직접 조작 금지 (R3F 패턴 사용)
9. 파티클 셰이더에서 discard 없이 사각형 파티클 렌더링 금지 (원형 glow 필수)
10. 글래스 카드에 backdrop-filter 빠뜨리기 금지

지금 STEP 1부터 시작하세요.
```

---

## 💡 V2 참고: 3D 효과 커스터마이징 가이드

| 조절 항목 | 파일 | 변경 방법 |
|---|---|---|
| 파티클 수 | ParticleNetwork.tsx | `PARTICLE_COUNT` 값 변경 (100~300) |
| 파티클 연결 거리 | ParticleNetwork.tsx | `MAX_DIST` 값 변경 (8~18) |
| 배경 밝기 | MeshGradient.tsx | fragment shader의 `* 0.35` 값 조정 |
| 그리드 밀도 | PerspectiveGrid.tsx | `uv * 40.0`의 40 값 조정 |
| 마우스 반응 감도 | ParticleNetwork.tsx | lerp 계수 `0.04` 조정 (높을수록 빠른 반응) |
| 와이어프레임 밝기 | FloatingGeometry.tsx | `opacity: 0.08` 값 조정 |
| 그라디언트 속도 | MeshGradient.tsx | `u_time * 0.15`의 0.15 조정 |
| 전체 3D 비활성화 | layout.tsx | SceneContainer 주석처리 (폴백: CSS gradient orb) |

---

## 🔧 배포 시 추가 설정

```bash
# Vercel 배포 (권장)
npm i -g vercel
vercel

# 환경 변수 (도입문의 폼 연동 시)
# .env.local
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL=help@nanuriit.kr

# 카카오맵 API (오시는 길)
NEXT_PUBLIC_KAKAO_MAP_KEY=your_key
```

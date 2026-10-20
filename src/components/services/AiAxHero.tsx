"use client";

import { AIAX_ID, Eyebrow, PrimaryButton, RoleGlyph, SecondaryButton } from "./aiax/shared";
import "./aiax/hero.css";

/* ═══════════ 문구 (명세 C1 그대로) ═══════════ */
const HERO = {
  eyebrow: "AI · AX SERVICE",
  h1Line1: "고객께 권하기 전에,",
  h1Before: "저희가 ",
  h1Emph: "먼저",
  h1After: " AI로 만들었습니다",
  lead1: "나누리아이티는 AI로 개발하는 금융 IT 기업입니다.", // 사용자 확정 포지셔닝. 게시 전 재확인(E.6)
  lead2Desktop:
    "사내 업무 시스템을 AI 에이전트 기반으로 직접 개발·운영하며 다듬은 명세·테스트·자동 검증·사람의 승인 체계를, 이제 금융의 규칙 안에서 고객의 개발과 업무에 적용해 나갑니다.",
  lead2Mobile:
    "사내 업무 시스템을 AI 에이전트 기반으로 개발·운영하며 다듬은 방식을, 이제 금융의 규칙 안에서 고객의 개발과 업무에 적용해 나갑니다.",
  sub: "AI가 초안을 쓰고 실행하면, 설계와 승인과 책임은 사람이 맡습니다.",
  primary: { label: "AI 적용 상담하기", href: "/contact" },
  secondary: { label: "개발 방식 보기", href: "#pipeline" },
} as const;

/* ═══════════ 모션 상수 ═══════════
   레일: 점 3개가 1.8s부터 0.6s 간격으로 출발(aiax.css .aiax-rail-mover, 3.6s 1회 통과).
   ◆ 반응 시각 = 출발 + 3.6s × 도착 지점 비율(@keyframes aiax-rail: 33%는 28%, 72%는 65% 프레임). */
const RAIL_DOT_DELAYS_MS = [1800, 2400, 3000] as const;
const RAIL_GATES = [
  { left: "33%", delayMs: 1800 + 0.28 * 3600 }, // 2808ms
  { left: "72%", delayMs: 1800 + 0.65 * 3600 }, // 4140ms
] as const;

/* ═══════════ 보조 컴포넌트 (모듈 최상위) ═══════════ */
function HeroBackdrop() {
  return (
    <>
      {/* 배경 1: 메시 */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="aiax-mesh-1" cx="20%" cy="28%" r="50%">
            <stop offset="0%" style={{ stopColor: "var(--color-accent-cyan)", stopOpacity: 0.32 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-accent-cyan)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="aiax-mesh-2" cx="82%" cy="36%" r="45%">
            <stop offset="0%" style={{ stopColor: "var(--color-accent-indigo)", stopOpacity: 0.16 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-accent-indigo)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="aiax-mesh-3" cx="55%" cy="90%" r="45%">
            <stop offset="0%" style={{ stopColor: "var(--color-accent-indigo)", stopOpacity: 0.26 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-accent-indigo)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <rect width="1200" height="700" fill="url(#aiax-mesh-1)" />
        <rect width="1200" height="700" fill="url(#aiax-mesh-2)" />
        <rect width="1200" height="700" fill="url(#aiax-mesh-3)" />
      </svg>
      {/* 배경 2 */}
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      {/* 블롭: 640px 미만에서는 숨김(장식 · 상시 blur와 무한 이동이 휴대폰 스크롤 비용만 늘림) */}
      <div
        aria-hidden="true"
        className="orb-float absolute top-[12%] left-[6%] hidden sm:block w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(0, 212, 255, 0.06)" }}
      />
      <div
        aria-hidden="true"
        className="orb-float-reverse absolute bottom-[18%] right-[6%] hidden sm:block w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(99, 102, 241, 0.06)" }}
      />
    </>
  );
}

/** 하단 레일(md 이상): 다음 섹션의 "AI가 지나가다 ◆ 사람 승인 지점에서 멈춘다"를 예고합니다. 장식. */
function HeroRail() {
  return (
    <div aria-hidden="true" className="hidden md:block absolute left-0 right-0 bottom-8 h-6 pointer-events-none">
      <div className="aiax-hero-rail-line absolute left-0 right-0 top-1/2 h-px" />
      {RAIL_GATES.map((g) => (
        <span
          key={g.left}
          className="aiax-hero-gate absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2"
          style={{ left: g.left, animationDelay: `${g.delayMs}ms` }}
        >
          <RoleGlyph role="human" size={12} />
        </span>
      ))}
      {RAIL_DOT_DELAYS_MS.map((d) => (
        <div key={d} className="aiax-rail-mover absolute inset-0" style={{ animationDelay: `${d}ms` }}>
          <span
            className="aiax-hero-rail-dot absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--aiax-ai)", animationDelay: `${d}ms` }}
          />
        </div>
      ))}
    </div>
  );
}

/* ═══════════ 섹션 ═══════════ */
export default function AiAxHero() {
  return (
    <section
      id={AIAX_ID.top}
      aria-labelledby="aiax-hero-title"
      // 하단 여백은 레일(md 이상) 자리. 레일이 없는 md 미만에서는 줄입니다.
      className="relative pt-14 pb-12 sm:pt-20 sm:pb-16 md:pt-28 md:pb-32 px-6 overflow-hidden"
    >
      <HeroBackdrop />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
        </div>

        <h1
          id="aiax-hero-title"
          className="mt-4 text-3xl sm:text-4xl md:text-[44px] font-bold text-ink leading-[1.2] tracking-tight animate-fade-in-up-delay-1"
        >
          {HERO.h1Line1}
          <br />
          <span className="relative inline-block">
            {/* sm 이상에서 리빌은 clip-path inset(0)으로 끝나 테두리 상자 밖을 자릅니다.
                "먼저" 밑줄(.aiax-emph 배경, 줄 상자 아래)이 잘리지 않게 상자를 늘리고 같은 만큼 음수 여백으로 되돌립니다. */}
            <span className="aiax-h1-reveal sm:pt-[0.1em] sm:-mt-[0.1em] sm:pb-[0.4em] sm:-mb-[0.4em]">
              <span className="gradient-text">
                {HERO.h1Before}
                <span className="aiax-emph">{HERO.h1Emph}</span>
                {HERO.h1After}
              </span>
            </span>
            <span className="aiax-h1-caret" aria-hidden="true" />
          </span>
        </h1>

        <p className="mt-6 sm:mt-7 text-[17px] text-body leading-relaxed max-w-2xl mx-auto animate-fade-in-up-delay-2">
          <strong className="font-semibold text-ink">{HERO.lead1}</strong>
          <br className="hidden sm:block" />{" "}
          <span className="hidden sm:inline">{HERO.lead2Desktop}</span>
          <span className="sm:hidden">{HERO.lead2Mobile}</span>
        </p>
        <p className="mt-4 text-[15px] text-body leading-relaxed max-w-2xl mx-auto animate-fade-in-up-delay-2">
          {HERO.sub}
        </p>

        <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up-delay-3">
          <PrimaryButton href={HERO.primary.href}>{HERO.primary.label}</PrimaryButton>
          <SecondaryButton href={HERO.secondary.href}>{HERO.secondary.label}</SecondaryButton>
        </div>
      </div>

      <HeroRail />
    </section>
  );
}

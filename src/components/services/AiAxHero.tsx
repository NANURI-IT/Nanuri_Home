"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  AIAX_ID,
  ArrowIcon,
  DISPLAY,
  Eyebrow,
  MONO,
  PrimaryButton,
  RoleGlyph,
  SecondaryButton,
  STATUS_DEFINITION,
  STATUS_LABEL,
  StatusMark,
  type CaseStatus,
} from "./aiax/shared";
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
  // sub(명세 문구 그대로)를 두 문장으로 나눠 둡니다. 640px 이상에서 문장마다 한 줄로 끊어 "공개합니다." 고아 줄을 막습니다.
  subLine1: "AI가 초안을 쓰고 실행하면, 설계와 승인과 책임은 사람이 맡습니다.",
  subLine2: "숫자 대신 작동 방식과 현재 상태를 그대로 공개합니다.",
  primary: { label: "AI 적용 상담하기", href: "/contact" },
  secondary: { label: "개발 방식 보기", href: "#pipeline" },
  ledgerTitle: "INTERNAL PROOF LEDGER",
  ledgerMeta: "기준 2026 · 상태는 사실대로 표기합니다",
  ledgerAria: "사내 적용 사례와 현재 상태",
  chipsLabel: "상황별로 바로 보기",
} as const;

const LEDGER: { kicker: string; title: string; desc: string; status: CaseStatus; href: string }[] = [
  { kicker: "CASE 01", title: "profileManager", desc: "사내 AI 인력운영 플랫폼", status: "live", href: "#assistant" },
  { kicker: "CASE 02", title: "온프레미스 LLM 에이전트", desc: "profileManager의 AI 분석 기능", status: "live", href: "#assistant" },
  { kicker: "CASE 03", title: "IBIMS AI deal 자동추출", desc: "여신서류 문서 AI", status: "poc", href: "#case-idp" },
];

const LEDGER_LEGEND: CaseStatus[] = ["live", "poc"]; // STATUS_LABEL + STATUS_DEFINITION으로 렌더

/* 조작 라벨(본문 문구 아님): 640px 미만에서 범례 정의를 접는 <summary>의 이름 */
const UI = {
  legendToggle: "상태 정의",
} as const;

const SITUATIONS: { label: string; href: string }[] = [
  { label: "AI 개발을 통제된 방식으로 시작하려면", href: "#pipeline" }, // 생산성·적체 해소를 암시하지 않음
  { label: "서류 대조 업무가 많다면", href: "#case-idp" },
  { label: "데이터를 밖으로 보내기 어렵다면", href: "#assistant" },
  { label: "어디서 시작할지 정하기 어렵다면", href: "#track-roadmap" },
];

/* ═══════════ 모션 상수 ═══════════
   레일: 점 3개가 1.8s부터 0.6s 간격으로 출발(aiax.css .aiax-rail-mover, 3.6s 1회 통과).
   ◆ 반응 시각 = 출발 + 3.6s × 도착 지점 비율(@keyframes aiax-rail: 33%는 28%, 72%는 65% 프레임). */
const RAIL_DOT_DELAYS_MS = [1800, 2400, 3000] as const;
const RAIL_GATES = [
  { left: "33%", delayMs: 1800 + 0.28 * 3600 }, // 2808ms
  { left: "72%", delayMs: 1800 + 0.65 * 3600 }, // 4140ms
] as const;

/* 원장 셀이 화면에 들어올 때 상태 라벨을 굴려 넣습니다(같은 줄 셀은 왼쪽부터 차례로). */
const ROLL_STAGGER_MS = 90;

/**
 * 진행적 향상: 마운트 시점에 화면 밖에 있는 셀만 "armed"로 숨겼다가, 들어오면 "play"로 굴려 넣습니다.
 * - 정적 HTML / JS 실패 / 이미 화면 안 / 동작 줄이기: 아무것도 하지 않음(상태 라벨이 그대로 보임).
 * - React가 관리하지 않는 data-roll 속성과 CSS 변수만 바꾸므로 하이드레이션·리렌더와 충돌하지 않습니다.
 */
function useLedgerRoll(listRef: RefObject<HTMLUListElement | null>) {
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const viewH = window.innerHeight || document.documentElement.clientHeight;
    const armed = Array.from(list.querySelectorAll<HTMLElement>(".aiax-hero-cell")).filter((cell) => {
      const r = cell.getBoundingClientRect();
      return r.bottom <= 0 || r.top >= viewH; // 한 픽셀이라도 보이면 건드리지 않음
    });
    if (armed.length === 0) return;
    armed.forEach((cell) => {
      cell.dataset.roll = "armed";
    });

    const io = new IntersectionObserver(
      (entries) => {
        let k = 0;
        for (const entry of entries) {
          const cell = entry.target as HTMLElement;
          if (!entry.isIntersecting || cell.dataset.roll !== "armed") continue;
          cell.style.setProperty("--aiax-hero-roll-delay", `${k * ROLL_STAGGER_MS}ms`);
          cell.dataset.roll = "play";
          io.unobserve(cell);
          k += 1;
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.55 },
    );
    armed.forEach((cell) => io.observe(cell));

    return () => {
      io.disconnect();
      // 재생 전에 정리되면(언마운트·개발 모드 이중 실행) 숨김 상태를 남기지 않습니다.
      armed.forEach((cell) => {
        if (cell.dataset.roll === "armed") delete cell.dataset.roll;
      });
    };
  }, [listRef]);
}

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

function ProofLedger() {
  const listRef = useRef<HTMLUListElement>(null);
  useLedgerRoll(listRef);

  return (
    <div className="glass glass-static rounded-2xl overflow-hidden text-left">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 sm:px-6 py-3 border-b border-line">
        <span className="text-[11px] font-bold tracking-[0.2em] text-body" style={MONO}>
          {HERO.ledgerTitle}
        </span>
        <span className="text-[14px] sm:text-[13px] text-body">{HERO.ledgerMeta}</span>
      </div>

      <ul
        ref={listRef}
        aria-label={HERO.ledgerAria}
        className="metrics-grid grid grid-cols-1 md:grid-cols-3"
        style={{ gap: 1 }}
      >
        {LEDGER.map((c) => (
          <li key={c.kicker} className="aiax-hero-cell">
            {/* 640px 미만: 원장 한 줄(1행 = 번호 | 상태 →, 2·3행 = 이름·설명)로 압축합니다.
                640px 이상: 원래 세로 카드(flex-col). DOM 순서는 같고 배치만 CSS로 바뀝니다. */}
            <a
              href={c.href}
              aria-label={`${c.kicker} ${c.title}, ${c.desc}, 상태 ${STATUS_LABEL[c.status]}`}
              className="metrics-cell aiax-focus-inset group relative grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 px-5 py-4 sm:flex sm:flex-col sm:items-stretch sm:gap-x-0 sm:p-6 transition-colors duration-300"
            >
              <span className="text-[11px] font-bold tracking-[0.16em] text-body" style={MONO}>
                {c.kicker}
              </span>
              <span
                className="col-span-2 mt-1.5 sm:mt-2 card-title font-bold text-ink leading-snug sm:leading-normal"
                style={DISPLAY}
              >
                {c.title}
              </span>
              <span className="col-span-2 mt-0.5 sm:mt-1 card-meta text-body">{c.desc}</span>
              {/* 숫자가 들어갈 자리에 상태(무채색). 640px 이상은 mt-auto로 같은 줄 셀의 상태 높이를 맞춥니다. */}
              <span className="col-start-2 row-start-1 flex items-center gap-2.5 sm:mt-auto sm:pt-5 sm:gap-3">
                <span className="aiax-hero-roll">
                  <span className="aiax-hero-roll-inner text-ink">
                    <StatusMark status={c.status} size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    <span className="text-[17px] sm:text-[19px] md:text-[22px] font-black tracking-tight leading-none whitespace-nowrap">
                      {STATUS_LABEL[c.status]}
                    </span>
                  </span>
                </span>
                <ArrowIcon className="ml-auto w-4 h-4 shrink-0 text-navy transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* 범례: 640px 이상은 항상 펼침. 그 아래는 상태 라벨이 각 줄에 이미 보이므로 정의만 <details>로 접습니다
          (JS 없이 동작, 서버·클라이언트 초기 상태 동일). 표시되지 않는 쪽은 display:none이라 접근성 트리에 중복되지 않습니다. */}
      <LegendList className="hidden sm:flex flex-wrap gap-x-6 gap-y-2 px-6 py-3 border-t border-line text-[13px] text-body" />
      <details className="aiax-hero-legend sm:hidden border-t border-line">
        <summary className="aiax-focus-inset flex min-h-11 items-center gap-3 px-5 py-2.5 text-[14px] font-semibold text-ink">
          <span aria-hidden="true" className="flex items-center gap-1.5">
            {LEDGER_LEGEND.map((s) => (
              <StatusMark key={s} status={s} size={12} />
            ))}
          </span>
          <span>{UI.legendToggle}</span>
          <svg
            aria-hidden="true"
            className="aiax-hero-legend-chev ml-auto w-4 h-4 shrink-0 text-navy"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </summary>
        <LegendList className="flex flex-col gap-2 px-5 pt-0.5 pb-3.5 text-[14px] text-body" />
      </details>
    </div>
  );
}

function LegendList({ className }: { className: string }) {
  return (
    <dl className={className}>
      {LEDGER_LEGEND.map((s) => (
        // 용어와 정의를 한 줄 흐름으로: 좁은 폭에서 정의가 왼쪽 끝으로 돌아와 감깁니다(들쭉날쭉한 내어쓰기 방지).
        <div key={s} className="min-w-0">
          <dt className="inline font-semibold text-ink whitespace-nowrap">
            <StatusMark status={s} size={11} className="inline-block align-middle -mt-0.5 mr-1.5" />
            {STATUS_LABEL[s]}
          </dt>{" "}
          <dd className="inline">— {STATUS_DEFINITION[s]}</dd>
        </div>
      ))}
    </dl>
  );
}

function SituationChips() {
  return (
    <>
      <p id="aiax-hero-situations" className="text-[14px] sm:text-[13px] font-semibold text-body">
        {HERO.chipsLabel}
      </p>
      <ul aria-labelledby="aiax-hero-situations" className="flex max-w-full flex-wrap justify-center gap-2.5">
        {SITUATIONS.map((s) => (
          <li key={s.href} className="max-w-full">
            <a
              href={s.href}
              className="group inline-flex max-w-full items-center gap-2 px-4 py-2 rounded-full text-[15px] sm:text-[14px] font-semibold text-ink sm:whitespace-nowrap transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                background: "var(--color-glass-bg)",
                border: "1px solid var(--color-glass-border)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="min-w-0">{s.label}</span>
              <ArrowIcon
                direction="down"
                className="w-3.5 h-3.5 shrink-0 text-navy transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
          </li>
        ))}
      </ul>
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
      // 상단 여백은 1440×900 첫 화면에 원장 상태 줄까지 들어오도록 md 이상 96px로 맞춥니다.
      className="relative pt-14 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-28 px-6 overflow-hidden"
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
          {HERO.subLine1}
          <br className="hidden sm:block" />{" "}
          {HERO.subLine2}
        </p>

        <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up-delay-3">
          <PrimaryButton href={HERO.primary.href}>{HERO.primary.label}</PrimaryButton>
          <SecondaryButton href={HERO.secondary.href}>{HERO.secondary.label}</SecondaryButton>
        </div>
      </div>

      {/* 사내 적용 원장. 앵커(#proof-ledger)는 움직이지 않는 바깥 상자에 두고 리빌은 안쪽에서만 합니다
          (transform이 걸린 요소를 앵커로 쓰면 스크롤 목표가 리빌 도중 위치로 계산돼 스티키 바 밑으로 들어감). */}
      <div id={AIAX_ID.ledger} className="relative mt-10 sm:mt-12 max-w-5xl mx-auto scroll-mt-32">
        <div className="animate-fade-in-up-delay-3">
          <ProofLedger />
        </div>
      </div>

      {/* 상황 칩 */}
      <div className="relative mt-8 max-w-5xl mx-auto flex flex-col items-center gap-3 animate-fade-in-up-delay-3">
        <SituationChips />
      </div>

      <HeroRail />
    </section>
  );
}

"use client";

import { useState, useSyncExternalStore, type CSSProperties } from "react";
import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import {
  AIAX_ID,
  DISPLAY,
  EASE,
  ExternalLink,
  MONO,
  SectionHeader,
  VIEWPORT,
  VIEWPORT_GRID,
  cn,
  fadeUpSm,
  stagger,
} from "@/components/services/aiax/shared";
import "./aiax/conditions.css";

/* ═══════════ 문구 (spec C3 그대로) ═══════════ */
const COND = {
  eyebrow: "01 · WHY IT STALLS",
  title: (
    <>
      AI 도입이 멈추는 곳은
      <br className="hidden sm:block" /> 모델보다 조건인 경우가 많습니다
    </>
  ),
  lead: "규제, 데이터의 경계, 낡은 문서. 나누리아이티는 이 세 가지 조건을 설계의 출발점으로 삼습니다.",
  designLabel: "저희의 설계",
  rulesAria: "2026년 시행된 AI 관련 기준",
} as const;

const UI = {
  listAria: "AI 도입 조건 세 가지",
} as const;

const CARDS = [
  {
    tag: "RULE · 규제",
    icon: "rule",
    title: "이제는 어떻게 쓰는지가 중요합니다",
    body: "AI가 관여한 결과는 설명할 수 있어야 하고, 최종 결정과 책임은 사람에게 있습니다.",
    design: "사람이 승인할 지점과 AI의 권한을 먼저 정하고, 그 기록을 남깁니다.",
  },
  {
    tag: "BOUNDARY · 보안",
    icon: "boundary",
    title: "데이터 경로를 설명할 수 있어야 합니다",
    body: "데이터가 어디까지 가는지 설명하지 못하면 내부 검토를 넘기 어렵습니다.",
    design: "사내 AI 에이전트는 사내 GPU 서버에서 운영해 질의 데이터가 밖으로 나가지 않습니다. 귀사에도 설치형을 먼저 검토합니다.",
  },
  {
    tag: "LEGACY · 레거시",
    icon: "legacy",
    title: "문서가 낡으면 AI는 추측으로 코드를 씁니다",
    body: "명세와 실제 동작이 어긋난 시스템에서는 틀린 결과가 빨리 나올 뿐입니다.",
    design: "명세를 먼저 세우고, 테스트로 기대 동작을 고정한 뒤 AI가 구현합니다.",
  },
] as const;

const RULES = [
  {
    date: "2026.01.22",
    name: "인공지능기본법 시행",
    desc: "고영향·생성형 AI 서비스에 이용자 사전 고지 등 투명성 의무가 생겼습니다.",
  },
  {
    date: "2026.06.22",
    name: "금융분야 인공지능 가이드라인 시행",
    desc: "AI를 쓰는 금융회사를 위한 자율규제로, 7대 원칙을 제시했습니다.",
  },
] as const;

// 각주: "출처: " + ExternalLink(SOURCES[0]) + ", " + ExternalLink(SOURCES[1]) + ". 2026년 기준으로 정리했습니다."
const SOURCES = [
  { label: "국가법령정보센터", href: "https://www.law.go.kr/법령/인공지능발전과신뢰기반조성등에관한기본법" },
  { label: "금융위원회 보도자료(2026.6.18)", href: "https://www.fsc.go.kr/no010101/87142" },
] as const;

type CondKind = (typeof CARDS)[number]["icon"];

/* ═══════════ 모션 ═══════════
   - 카드는 각자 화면에 들어올 때 페이드업합니다(1열로 쌓이는 md 미만에서 아래 카드가 화면 밖에서 미리 끝나지 않게).
     custom = 카드 순서 → 3열(lg)에서는 세 카드가 함께 들어오므로 CARD_STEP 간격의 stagger와 같은 리듬이 됩니다.
   - "저희의 설계" 칸과 시안 대시는 framer가 아니라 CSS(conditions.css)로 펼칩니다.
     · 기본(서버 HTML·JS 없음·동작 줄이기·인쇄)은 항상 보입니다.
     · 하이드레이션 뒤에만 카드(잘리지 않은 조상) data-reveal="armed"로 숨기고, 그 카드의 onViewportEnter에서 "shown"으로 바꿉니다.
       잘린(clip-path 100%) 요소 자체를 관찰하지 않으므로 375·768·감소 모션에서 영영 숨는 문제가 생기지 않습니다.
   - 아이콘 선은 카드의 hidden/show 상태를 물려받습니다(자체 관찰자 없음).
     pathLength·r·opacity는 MotionConfig가 건너뛰지 않으므로 useReducedMotion 값은 transition에서만 분기합니다(A3-3). */
const CARD_STEP = 0.08;
const INSTANT: Transition = { duration: 0 };

const CARD_IN: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay: i * CARD_STEP },
  }),
};

/** 설계 칸을 숨겼다 펼칠 수 있는 환경인지. 서버·하이드레이션 중에는 false(항상 보임). */
function subscribeNever() {
  return () => {};
}
const canArmClient = () => typeof IntersectionObserver !== "undefined";
const canArmServer = () => false;

function easeIn(reduce: boolean | null, delay: number, duration: number): Transition {
  return reduce ? INSTANT : { duration, delay, ease: EASE };
}

/** pathLength 0의 둥근 끝점이 점으로 남지 않도록, 그리기 시작 순간에 opacity를 켭니다. */
function drawIn(reduce: boolean | null, delay: number, duration: number): Transition {
  return reduce
    ? INSTANT
    : { pathLength: { duration, delay, ease: EASE }, opacity: { duration: 0.01, delay } };
}

const ICON_DRAW: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1 },
};
/** 경계 안의 데이터 점: 반지름으로 키웁니다(SVG transform-origin 계산을 피함). */
const ICON_DOT: Variants = { hidden: { r: 0 }, show: { r: 4 } };
/** 점에서 한 번 퍼지고 경계에 닿기 전에 사라지는 파문(장식, 1회). */
const ICON_RIPPLE: Variants = {
  hidden: { r: 4, opacity: 0 },
  show: { r: 14, opacity: [0, 0.6, 0] },
};
/** 레거시 층: 뒤 층에서 비켜 나와 제자리에 쌓입니다. custom = 층 순서(1, 2). */
const ICON_LAYER: Variants = {
  hidden: (layer: number) => ({ x: -6 * layer, y: -7 * layer, opacity: 0 }),
  show: { x: 0, y: 0, opacity: 1 },
};
const RULE_LINES = ["M10 16h36", "M10 28h36", "M10 40h20"] as const;

/* ═══════════ 보조 컴포넌트 (모듈 최상위, A10) ═══════════ */
/** 장식 아이콘(md 이상). 자체 관찰자 없이 감싼 카드의 hidden/show 상태를 따릅니다. */
function CondIcon({
  kind,
  delay,
  reduce,
  className,
}: {
  kind: CondKind;
  delay: number;
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      stroke="var(--aiax-ai)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("opacity-80", className)}
    >
      {kind === "rule" && (
        <>
          {RULE_LINES.map((d, j) => (
            <motion.path key={d} d={d} variants={ICON_DRAW} transition={drawIn(reduce, delay + j * 0.12, 0.5)} />
          ))}
          <rect x="34" y="34" width="14" height="14" rx="3" />
          <motion.path d="m37.5 41 2.5 2.5 4.5-5" variants={ICON_DRAW} transition={drawIn(reduce, delay + 0.6, 0.35)} />
        </>
      )}
      {kind === "boundary" && (
        <>
          <rect x="8" y="8" width="40" height="40" rx="9" strokeDasharray="4 4" />
          <motion.circle
            cx="28"
            cy="28"
            strokeWidth="1"
            variants={ICON_RIPPLE}
            transition={
              reduce
                ? INSTANT
                : {
                    r: { duration: 1, delay: delay + 0.35, ease: EASE },
                    opacity: { duration: 1, delay: delay + 0.35, times: [0, 0.2, 1], ease: "easeOut" },
                  }
            }
          />
          <motion.circle cx="28" cy="28" fill="var(--aiax-ai)" stroke="none" variants={ICON_DOT} transition={easeIn(reduce, delay + 0.1, 0.45)} />
        </>
      )}
      {kind === "legacy" && (
        <>
          <rect x="8" y="12" width="28" height="20" rx="3" />
          <motion.g custom={1} variants={ICON_LAYER} transition={easeIn(reduce, delay + 0.05, 0.55)}>
            <rect x="14" y="19" width="28" height="20" rx="3" />
          </motion.g>
          <motion.g custom={2} variants={ICON_LAYER} transition={easeIn(reduce, delay + 0.17, 0.55)}>
            <rect x="20" y="26" width="28" height="20" rx="3" />
          </motion.g>
        </>
      )}
    </svg>
  );
}

/** "저희의 설계" 앞 시안 대시(리빌 때 왼쪽부터 그려짐 — conditions.css). */
function DesignDash() {
  return (
    <span
      aria-hidden="true"
      className="aiax-conditions-dash block shrink-0 h-0.5 w-5 origin-left rounded-full"
      style={{ background: "var(--aiax-ai)" }}
    />
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("ml-auto shrink-0 text-body transition-transform duration-300 motion-reduce:transition-none", open && "rotate-180")}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ═══════════ 섹션 ═══════════
   레이아웃
   - md 미만: 세 카드를 1열로 쌓습니다(카드 3장은 캐러셀 기준인 "풍부한 카드 4장 이상"에 못 미침).
     카드 = 태그 / 제목 / 한 줄 배경 / 저희의 설계(접기 버튼, 기본 닫힘).
   - md(태블릿): 1열 카드 안을 [문제 | 저희의 설계] 두 칸으로 나눠 폭을 쓰고 높이를 줄입니다.
   - lg 이상: 3열 subgrid(문제 | 저희의 설계 윗선 정렬). 규칙 띠는 2열. */
export default function AiAxConditions() {
  const reduce = useReducedMotion();
  const canArm = useSyncExternalStore(subscribeNever, canArmClient, canArmServer);
  const [shown, setShown] = useState<Readonly<Record<number, boolean>>>({});
  const [openDesign, setOpenDesign] = useState<Readonly<Record<number, boolean>>>({});

  const reveal = (i: number) => setShown((prev) => (prev[i] ? prev : { ...prev, [i]: true }));
  const toggleDesign = (i: number) => setOpenDesign((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <section
      id={AIAX_ID.conditions}
      aria-labelledby="aiax-cond-title"
      className="relative py-10 md:py-20 px-6 overflow-hidden scroll-mt-32"
    >
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader eyebrow={COND.eyebrow} title={COND.title} lead={COND.lead} titleId="aiax-cond-title" />

        {/* 조건 카드
            - md 미만: 1열. md: 1열 + 카드 안 2칸. lg: 3열이고 카드마다 subgrid 두 줄(문제 | 저희의 설계)로 세 카드의 설계 칸 윗선을 맞춥니다. */}
        <div
          role="list"
          aria-label={UI.listAria}
          className="mt-6 md:mt-12 grid grid-cols-1 gap-3 md:gap-5 lg:grid-cols-3 lg:gap-y-0"
        >
          {CARDS.map((c, i) => {
            const offset = i * CARD_STEP;
            const open = Boolean(openDesign[i]);
            const designId = `aiax-cond-design-${i}`;
            const panelStyle = {
              background: "var(--color-raised)",
              "--aiax-cond-delay": `${0.25 + offset}s`,
            } as CSSProperties;
            return (
              <motion.div
                key={c.tag}
                role="listitem"
                custom={i}
                variants={CARD_IN}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_GRID}
                onViewportEnter={() => reveal(i)}
                data-reveal={canArm ? (shown[i] ? "shown" : "armed") : undefined}
                className="aiax-conditions-item md:h-full lg:row-span-2 lg:grid lg:grid-rows-subgrid"
              >
                <article
                  aria-labelledby={`aiax-cond-${i}`}
                  className="glass glass-static rounded-2xl overflow-hidden flex flex-col h-full md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:row-span-2 lg:grid-cols-1 lg:grid-rows-subgrid"
                >
                  {/* 문제: 태그 + 제목 + 한 줄 배경 */}
                  <div className="relative p-5 sm:p-6 md:p-7 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 md:block">
                    <span
                      className="col-start-1 row-start-1 block text-[11px] font-bold tracking-[0.16em] text-body"
                      style={MONO}
                    >
                      {c.tag}
                    </span>
                    <CondIcon
                      kind={c.icon}
                      delay={0.3 + offset}
                      reduce={reduce}
                      className="hidden md:block absolute top-7 right-7 w-14 h-14"
                    />
                    <h3
                      id={`aiax-cond-${i}`}
                      className="col-span-2 row-start-2 mt-2 md:mt-3 md:pr-16 card-title-lg font-bold text-ink leading-snug"
                    >
                      {c.title}
                    </h3>
                    <p className="col-span-2 row-start-3 mt-2 md:mt-3 card-body text-body">{c.body}</p>
                  </div>

                  {/* 저희의 설계. 리빌은 CSS(.aiax-conditions-panel/-dash)가 카드의 data-reveal을 보고 처리합니다.
                      md 미만은 제목 줄이 접기 버튼(기본 닫힘), md 이상은 제목만 두고 항상 펼칩니다(conditions.css). */}
                  <div
                    className="aiax-conditions-panel px-5 sm:px-6 md:px-7 py-1 md:pt-7 lg:pt-5 md:pb-7 border-t border-line md:border-t-0 md:border-l lg:border-l-0 lg:border-t"
                    style={panelStyle}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={designId}
                      onClick={() => toggleDesign(i)}
                      className="flex w-full min-h-11 items-center gap-2 text-left text-[14px] font-bold text-ink md:hidden"
                    >
                      <DesignDash />
                      {COND.designLabel}
                      <Chevron open={open} />
                    </button>
                    <p className="hidden md:flex items-center gap-2 text-[13px] font-bold text-ink">
                      <DesignDash />
                      {COND.designLabel}
                    </p>
                    <div id={designId} data-open={open} className="aiax-conditions-design">
                      <div>
                        <p className="pb-4 md:pb-0 md:mt-2 card-body text-ink">{c.design}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>

        {/* 2026년 규칙 띠: 날짜는 시안 금지(실적 수치처럼 보이지 않게) → text-ink
            md 미만: 날짜 / 이름 / 설명을 위아래로. md 이상: 날짜 | 이름·설명 가로 배치.
            lg: 설명이 둘 다 한 줄이라 같은 폭(2열). */}
        <motion.ul
          aria-label={COND.rulesAria}
          className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-2.5 md:gap-4"
          variants={stagger(CARD_STEP)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_GRID}
        >
          {RULES.map((r) => {
            return (
              <motion.li
                key={r.date}
                variants={fadeUpSm}
                className="rounded-2xl border border-line p-4 md:p-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 md:flex md:items-baseline md:gap-5"
                style={{ background: "var(--aiax-node-bg)" }}
              >
                <time
                  dateTime={r.date.replace(/\./g, "-")}
                  className="col-start-1 row-start-1 shrink-0 md:min-w-28 text-[18px] md:text-[20px] font-black tracking-tight tabular-nums text-ink"
                  style={DISPLAY}
                >
                  {r.date}
                </time>
                <div className="col-span-2 row-start-2 min-w-0 md:border-l md:border-line md:pl-5">
                  <p className="text-[16px] font-bold text-ink">{r.name}</p>
                  <p className="mt-1 text-[15px] md:text-[14px] text-body leading-relaxed">{r.desc}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.p
          className="mt-4 text-[14px] sm:text-[13px] text-body leading-relaxed"
          variants={fadeUpSm}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          출처:{" "}
          <ExternalLink href={SOURCES[0].href}>{SOURCES[0].label}</ExternalLink>,{" "}
          <ExternalLink href={SOURCES[1].href}>{SOURCES[1].label}</ExternalLink>. 2026년 기준으로 정리했습니다.
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  AIAX_ID,
  ApprovalStamp,
  ArrowIcon,
  EASE,
  MONO,
  RoleGlyph,
  SectionHeader,
  VIEWPORT,
  VIEWPORT_GRID,
  cn,
  fadeUp,
  stagger,
} from "@/components/services/aiax/shared";
import "./aiax/process.css";

/* ═══════════ 문구 (명세 C10 그대로) ═══════════ */
const PROC = {
  eyebrow: "07 · HOW WE ENGAGE",
  title: (<>다음 단계로 넘어갈지는,<br className="hidden sm:block" /> 매 단계 고객이 결재합니다</>),
  lead: "작게 시작해 기준으로 확인하고 넓힙니다. 단계마다 산출물을 드리고, 다음 단계로 갈지는 귀사가 정합니다. 기간과 범위는 진단에서 함께 정합니다.",
  approvalLine: [
    { role: "기안", who: "나누리아이티" },
    { role: "검토", who: "귀사 실무 담당" },
    { role: "승인", who: "귀사", human: true },
  ],
  approvalCaption: "◆ 표시는 귀사 담당자가 결정하는 지점입니다. 다음 단계는 그 결정 이후에 시작합니다.",
  doesLabel: "하는 일",
  outputsLabel: "산출물",
  decisionLabel: "귀사 결재",
  stamp: "결재",
  emphasisStrong: "기준에 못 미치면 멈추는 것도 결과입니다.",
  emphasis: "그 판단 근거를 보고서로 남깁니다.",
};

const STAGES = [
  { no: "01", name: "진단", does: "업무 인터뷰로 AI 적용 후보를 찾고, 데이터와 망 환경을 확인합니다.", outputs: ["적용 후보 목록", "우선순위", "원칙별 점검표"], decision: "우선순위 확정" },
  { no: "02", name: "통제 설계", does: "AI에 줄 권한, 볼 수 있는 데이터, 사람이 승인할 지점을 기능보다 먼저 정합니다.", outputs: ["데이터 경계·권한 설계서", "승인 지점 정의서"], decision: "통제 설계 승인" },
  { no: "03", name: "PoC", does: "성공 기준을 먼저 합의하고, 작은 범위에서 귀사 환경에 맞춰 검증합니다.", outputs: ["성공 기준서", "기준 대비 결과 보고"], decision: "구축 진행 여부" },
  { no: "04", name: "구축", does: "검증된 범위를 명세·테스트·자동 검증·사람 승인 방식으로 구축합니다.", outputs: ["명세", "테스트", "변경 이력"], decision: "운영 반영" },
  { no: "05", name: "운영·개선", does: "처리 로그와 실패 사례를 기록해 규칙을 보완하고, 모델을 바꿀 때는 다시 검증합니다.", outputs: ["운영 기록", "재검증 결과", "재발 방지 규칙"], decision: "모델·범위 변경" },
] as const;

type Stage = (typeof STAGES)[number];

/** 캡션 앞의 ◆는 텍스트 글자 대신 역할 글리프(앰버 ◆)로 그립니다(A4: 역할 글리프는 RoleGlyph로만). */
const CAPTION_BODY = PROC.approvalCaption.replace(/^◆\s*/, "");
/**
 * 캡션은 두 문장을 한 줄씩 둡니다(문구는 그대로, 줄바꿈 위치만 고정). 결재란 폭에 따라 아무 데서나 꺾여
 * "이후에 시작합니다."만 둘째 줄에 남던 문제를 없앱니다. 두 문장 모두 320px 화면 폭에서도 한 줄에 들어갑니다.
 */
const CAPTION_SPLIT = CAPTION_BODY.indexOf(". ") + 1;
const CAPTION_LINES = [CAPTION_BODY.slice(0, CAPTION_SPLIT), CAPTION_BODY.slice(CAPTION_SPLIT).trim()] as const;

/**
 * JS 없이 열었을 때(정적 HTML) 등장 모션의 초기 상태(opacity 0)가 남아 내용이 안 보이는 일이 없도록, 이 섹션 안에서만 풀어 둡니다.
 * noscript 안의 style은 스크립트가 꺼진 브라우저에서만 적용되고, React는 noscript 내용을 하이드레이션하지 않습니다.
 */
const NOSCRIPT_CSS = `<style>#${AIAX_ID.process} [style*="opacity:0"]{opacity:1!important;transform:none!important}</style>`;

/* ═══════════ 모션 ═══════════ */
/** 결재란 범례: 섹션 머리(SectionHeader)보다 한 박자 늦게 들어옵니다. */
const legendIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay: 0.12 } },
};

/**
 * 도장 타이밍(명세: 화면에 들어오면 왼쪽부터 STAMP_GAP 간격, 첫 도장은 STAMP_FIRST 뒤).
 * 같은 순간에 화면에 들어온 결재 칸끼리만 순번을 매깁니다. 데스크톱(5열)에서는 다섯 칸이 함께 들어와
 * 왼쪽부터 차례로 찍히고, 세로로 쌓인 태블릿과 가로 캐러셀인 모바일에서는 칸마다 화면에 들어오는 순간
 * (모바일은 카드를 넘겨 보이는 순간) STAMP_FIRST 뒤에 찍힙니다
 * (마지막 단계가 화면에 들어오고도 앞 네 칸의 간격만큼 기다리는 일이 없도록).
 */
const STAMP_FIRST = 0.3;
const STAMP_GAP = 0.35;
const STAMP_BATCH_MS = 160;
/** 다음 단계로 가는 화살표는 앞 단계 도장이 찍힌 뒤에 나타납니다(lg 이상). */
const ARROW_AFTER = 0.25;
const ARROW_HIDDEN = { opacity: 0, x: -6 };
const ARROW_SHOWN = { opacity: 1, x: 0 };

/* ═══════════ 모바일 캐러셀 ═══════════ */
/**
 * md 미만에서만 단계 목록이 가로 스크롤 트랙이 됩니다(process.css). 트랙에 키보드 포커스를 줄지만 이 값으로 정합니다.
 * 서버 스냅샷은 false라서 하이드레이션 첫 렌더는 서버와 같고, 그 뒤 클라이언트 값으로 다시 렌더합니다.
 */
const CAROUSEL_MQ = "(max-width: 767px)";
function subscribeCarousel(onChange: () => void) {
  const mql = window.matchMedia(CAROUSEL_MQ);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getCarousel = () => window.matchMedia(CAROUSEL_MQ).matches;
const getCarouselServer = () => false;

/** 트랙의 스냅 여백(scroll-padding-left, 1.5rem). */
function snapPad(track: HTMLElement) {
  return parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
}

/* ═══════════ 모바일 단계 바로 가기 ═══════════ */
/**
 * md 미만에서 캐러셀 위에 다섯 단계 이름을 항상 보여 줍니다(전체 흐름 + 현재 위치).
 * 단계 사이의 ◆는 "다음 단계 전에 귀사가 결정한다"는 범례와 같은 뜻의 장식입니다.
 */
function StageStepper({
  active,
  trackId,
  onSelect,
}: {
  active: number;
  trackId: string;
  onSelect: (i: number) => void;
}) {
  const last = STAGES.length - 1;
  return (
    <div role="group" aria-label="단계 바로 가기" className="md:hidden relative mt-8 grid grid-cols-5">
      {/* 연결선: 첫 칸 가운데(10%)부터 마지막 칸 가운데(90%)까지, 번호 원 중심 높이(18px) */}
      <span
        aria-hidden="true"
        className="absolute left-[10%] right-[10%] top-[18px] h-px"
        style={{ background: "var(--aiax-track)" }}
      />
      <span
        aria-hidden="true"
        className="aiax-process-fill absolute left-[10%] right-[10%] top-[18px] h-px"
        style={{ transform: `scaleX(${active / last})` }}
      />
      {STAGES.slice(1).map((s, k) => (
        <span
          key={s.no}
          aria-hidden="true"
          className="absolute top-[18px] flex -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(k + 1) * (100 / STAGES.length)}%` }}
        >
          <RoleGlyph role="human" size={8} />
        </span>
      ))}
      {STAGES.map((s, i) => {
        const current = i === active;
        return (
          <button
            key={s.no}
            type="button"
            aria-controls={trackId}
            aria-current={current ? "step" : undefined}
            data-state={current ? "current" : i < active ? "done" : "todo"}
            onClick={() => onSelect(i)}
            className="aiax-process-step relative flex flex-col items-center gap-1.5 rounded-lg pt-1 pb-1.5 min-w-0"
          >
            <span
              aria-hidden="true"
              className="aiax-process-dot grid place-items-center w-7 h-7 rounded-full text-[11px] font-bold"
              style={MONO}
            >
              {s.no}
            </span>
            <span
              className={cn(
                "text-[12px] leading-tight whitespace-nowrap",
                current ? "font-bold text-ink" : "font-semibold text-body",
              )}
            >
              {s.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════ 결재란 범례 ═══════════ */
function ApprovalLegend() {
  return (
    // lg: 머리 줄이 단계 카드와 같은 5열 격자라, 범례는 04–05 카드 두 열 폭에 정확히 맞습니다(왼쪽 끝 = 04 카드 왼쪽).
    <motion.div
      className="w-full sm:w-fit lg:w-full lg:col-span-2"
      variants={legendIn}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <div
        aria-hidden="true"
        className="grid grid-cols-3 w-full sm:w-fit lg:w-full rounded-xl overflow-hidden border border-line text-center"
      >
        {PROC.approvalLine.map((c) => (
          <div
            key={c.role}
            className="flex flex-col border-l first:border-l-0 border-line"
            style={c.human ? { background: "var(--aiax-tint-human)" } : { background: "var(--aiax-node-bg)" }}
          >
            {/* 앰버 틴트 칸의 역할명: 라이트에서 본문색은 4.33:1이라 process.css에서 한 단계 진하게 덮어씁니다. */}
            <div
              className={cn(
                "px-2 sm:px-4 py-1.5 text-[12px] font-semibold text-body border-b border-line",
                c.human && "aiax-process-legend-human",
              )}
            >
              {c.role}
            </div>
            <div className="flex-1 px-2 sm:px-4 py-2.5 flex items-center justify-center gap-1.5 text-[14px] font-bold text-ink">
              {c.human && <RoleGlyph role="human" size={10} />}
              {c.who}
            </div>
          </div>
        ))}
      </div>
      <p className="sr-only">결재선: 기안 나누리아이티, 검토 귀사 실무 담당, 승인 귀사.</p>
      {/* sm 이상: w-0 + min-w-full 로 캡션 폭을 결재란 폭에 맞춥니다(캡션이 범례 상자를 넓히지 않음). */}
      <p className="mt-3 flex gap-1.5 text-[14px] sm:text-[13px] leading-relaxed text-body sm:w-0 sm:min-w-full">
        <RoleGlyph role="human" size={10} className="mt-[0.43em]" />
        <span>
          <span className="sr-only">◆ </span>
          {CAPTION_LINES[0]}
          <br /> {CAPTION_LINES[1]}
        </span>
      </p>
    </motion.div>
  );
}

/* ═══════════ 단계 카드 ═══════════ */
function StageCard({
  stage: s,
  index: i,
  stampDelay,
  reduce,
  onDecisionEnter,
}: {
  stage: Stage;
  index: number;
  stampDelay: number | null; // null = 아직 화면에 들어오지 않음
  reduce: boolean;
  onDecisionEnter: (i: number) => void;
}) {
  const stamped = stampDelay !== null;
  return (
    <motion.li variants={fadeUp} className="relative lg:row-span-3 lg:grid lg:grid-rows-subgrid">
      {/* md 미만: 가로 캐러셀의 한 장(세로 1열, 높이는 가장 긴 카드에 맞춤)
          · md–lg: 카드 한 장이 표의 한 행(단계·하는 일 | 산출물 | 귀사 결재). 세로로 쌓던 산출물과 결재를 옆 칸으로 옮겨
            태블릿에서 카드마다 약 80px, 섹션 전체로 약 400px 줄입니다.
          · lg: 5열, subgrid로 다섯 카드의 설명·산출물·결재 줄을 맞춤 */}
      <div className="glass glass-static rounded-2xl p-4 md:p-5 h-full flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-x-6 lg:row-span-3 lg:grid-cols-1 lg:grid-rows-subgrid lg:gap-x-0">
        <div>
          {/* lg 미만은 번호와 단계명을 한 줄에(세로 길이 절약), lg는 번호 위·단계명 아래 */}
          <div className="flex items-baseline gap-2.5 lg:block">
            <span aria-hidden="true" className="block text-[13px] font-bold tracking-[0.16em] text-body" style={MONO}>
              {s.no}
            </span>
            <h3 className="lg:mt-1 text-[19px] font-bold text-ink">{s.name}</h3>
          </div>
          <p className="mt-2 md:mt-3 card-body text-body">
            <span className="sr-only">{PROC.doesLabel}: </span>
            {s.does}
          </p>
        </div>

        <dl className="mt-3 md:mt-0 lg:mt-4 flex-1 flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-x-5 lg:row-span-2 lg:grid-cols-1 lg:grid-rows-subgrid lg:gap-x-0">
          {/* pb: 가장 긴 카드에서도 산출물 목록과 결재 구분선 사이 최소 간격(md–lg는 결재가 옆 칸이라 필요 없음) */}
          <div className="pb-3 md:pb-0 lg:pb-4">
            <dt className="text-[12px] font-bold text-body">{PROC.outputsLabel}</dt>
            <dd className="mt-1.5">
              <ul role="list" className="space-y-1">
                {s.outputs.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-[14px] leading-normal text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-[9.5px] w-3 h-0.5 shrink-0 rounded-full"
                      style={{ background: "var(--aiax-ai)" }}
                    />
                    {o}
                  </li>
                ))}
              </ul>
            </dd>
          </div>

          {/* md–lg: 위 구분선 대신 왼쪽 세로 구분선(행 높이만큼 늘어남) · lg: 다시 위 구분선 */}
          <motion.div
            className="mt-auto pt-3 border-t border-line md:mt-0 md:pt-0 md:pl-5 md:border-t-0 md:border-l lg:mt-auto lg:pt-4 lg:pl-0 lg:border-t lg:border-l-0"
            viewport={VIEWPORT}
            onViewportEnter={() => onDecisionEnter(i)}
          >
            <dt className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-body whitespace-nowrap">
                <RoleGlyph role="human" size={10} />
                {PROC.decisionLabel}
              </span>
              <ApprovalStamp label={PROC.stamp} show={stamped} delay={stampDelay ?? 0} className="shrink-0" />
            </dt>
            <dd className="mt-1 md:mt-1.5 text-[15px] font-bold text-ink">{s.decision}</dd>
          </motion.div>
        </dl>
      </div>

      {i < STAGES.length - 1 && (
        <motion.span
          aria-hidden="true"
          // gap-4 한가운데에 둡니다: w-6 원을 -right-5 로 놓으면 양쪽 카드 테두리에 같은 폭만큼 걸칩니다.
          className="hidden lg:flex absolute top-1/2 -right-5 z-10 w-6 h-6 -translate-y-1/2 items-center justify-center rounded-full border border-line"
          style={{ background: "var(--aiax-frame-bg)" }}
          initial={false}
          animate={stamped ? ARROW_SHOWN : ARROW_HIDDEN}
          transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE, delay: (stampDelay ?? 0) + ARROW_AFTER }}
        >
          <ArrowIcon className="w-3 h-3 text-navy" />
        </motion.span>
      )}
    </motion.li>
  );
}

/* ═══════════ 섹션 ═══════════ */
export default function AiAxProcess() {
  const reduce = useReducedMotion() ?? false;
  const [stampDelays, setStampDelays] = useState<ReadonlyArray<number | null>>(() => STAGES.map(() => null));
  const batch = useRef({ at: Number.NEGATIVE_INFINITY, rank: 0 });

  // 이벤트 핸들러(onViewportEnter)에서만 호출됩니다. once 뷰포트도 다시 들어오면 콜백이 불리므로 이미 찍힌 칸은 무시합니다.
  const onDecisionEnter = (i: number) => {
    if (stampDelays[i] !== null) return;
    const now = performance.now();
    const b = batch.current;
    b.rank = now - b.at < STAMP_BATCH_MS ? b.rank + 1 : 0;
    b.at = now;
    const delay = STAMP_FIRST + b.rank * STAMP_GAP;
    setStampDelays((prev) => (prev[i] !== null ? prev : prev.map((d, j) => (j === i ? delay : d))));
  };

  /* ── 모바일 캐러셀: 현재 카드 추적 · 바로 가기 ── */
  const trackId = useId();
  const trackRef = useRef<HTMLOListElement>(null);
  const rafRef = useRef(0);
  const [active, setActive] = useState(0);
  const carousel = useSyncExternalStore(subscribeCarousel, getCarousel, getCarouselServer);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // 스크롤 이벤트에서만 호출됩니다(프레임당 1회). 스냅 시작선에 가장 가까운 카드가 현재 단계입니다.
  const syncActive = () => {
    rafRef.current = 0;
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;
    const items = Array.from(track.children);
    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) {
      setActive(items.length - 1); // 끝까지 넘기면 마지막 카드는 시작선에 닿지 못하므로
      return;
    }
    const start = track.getBoundingClientRect().left + snapPad(track);
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    items.forEach((el, i) => {
      const d = Math.abs(el.getBoundingClientRect().left - start);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };
  const onTrackScroll = () => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(syncActive);
  };
  // 가로로만 움직입니다(scrollIntoView처럼 페이지를 세로로 끌지 않음).
  const goTo = (i: number) => {
    const track = trackRef.current;
    const item = track?.children[i];
    if (!track || !item) return;
    const left = item.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft - snapPad(track);
    track.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      id={AIAX_ID.process}
      aria-labelledby="aiax-proc-title"
      className="relative py-14 md:py-24 px-6 overflow-x-clip scroll-mt-32"
    >
      <noscript dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
      <div className="relative max-w-6xl mx-auto">
        {/* lg: 단계 목록과 같은 5열·같은 열 간격(gap-x-4). 머리글 3열 + 결재란 범례 2열, 범례 아래끝 = 리드 아래끝 */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-5 lg:gap-x-4 lg:items-end">
          <SectionHeader
            eyebrow={PROC.eyebrow}
            title={PROC.title}
            lead={PROC.lead}
            titleId="aiax-proc-title"
            className="lg:col-span-3"
          />
          <ApprovalLegend />
        </div>

        <StageStepper active={active} trackId={trackId} onSelect={goTo} />

        {/* md 미만: 가로 스냅 캐러셀(process.css). 포커스하면 ←/→로 넘깁니다(트랙 밖으로 나가는 조작 요소 없음).
            위치 표시는 위의 단계 바로 가기가 맡으므로 기본 스크롤바는 숨깁니다(aiax-noscrollbar + process.css).
            md–lg: 표 행처럼 낮은 카드의 세로 목록 / lg: 5열. */}
        <motion.ol
          ref={trackRef}
          id={trackId}
          role="list"
          aria-label="진행 단계"
          tabIndex={carousel ? 0 : undefined}
          onScroll={onTrackScroll}
          className="aiax-process-track aiax-noscrollbar aiax-focus-inset relative mt-3 gap-3 md:mt-10 md:grid md:grid-cols-1 md:gap-4 lg:grid-cols-5 lg:gap-y-0"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_GRID}
        >
          {STAGES.map((s, i) => (
            <StageCard
              key={s.no}
              stage={s}
              index={i}
              stampDelay={stampDelays[i]}
              reduce={reduce}
              onDecisionEnter={onDecisionEnter}
            />
          ))}
        </motion.ol>

        <motion.div
          className="mt-6 md:mt-8 rounded-2xl px-5 py-4 md:px-8 md:py-6 aiax-gate-band"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <p className="text-[18px] md:text-[20px] font-bold text-ink text-balance">{PROC.emphasisStrong}</p>
          <p className="mt-1 card-body text-ink">{PROC.emphasis}</p>
        </motion.div>
      </div>
    </section>
  );
}

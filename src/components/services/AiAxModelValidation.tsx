"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  fadeUpSm,
  stagger,
} from "@/components/services/aiax/shared";
import { MV_RAIL, useOverflowX, useRailIndex } from "@/components/services/aiax/modelvalidation-rail";
import "./aiax/modelvalidation.css";

const VAL_TITLE = (
  <>
    모델은 공개 허브에서 받되,<br className="hidden sm:block" /> 쓰기 전에 직접 검증합니다
  </>
);

const VAL = {
  eyebrow: "03 · MODEL VALIDATION",
  lead: "사내 GPU 서버에서 운영하는 개발 지원 LLM은 공개 모델 허브에서 모델을 내려받습니다. 공개된 모델이라도 검증 없이 쓰지 않습니다. 리비전을 고정하고, 용도에 맞는 라이선스인지 확인한 뒤, 저희 장비와 실제 사용 조건에서 다시 재고 비교합니다. 채택 여부는 사람이 판정합니다.",
  flowTitle: "모델이 들어와 운영되기까지",
  flowAria: "사내 GPU 서버 안의 검증 단계",
  humanStepSr: "담당자 판단 단계", // FlowNode sr-only(◆ 글리프의 뜻)
  gateStepSr: "자동 처리 단계", // FlowNode sr-only(■ 글리프의 뜻)
  outsideLabel: "사외 · 공개 모델 허브",
  insideLabel: "사내 GPU 서버",
  inLabel: "모델 파일 · 고정한 리비전",
  inSub: "허브에서 사내 서버로 받는 방향",
  outLabel: "서빙 엔진은 서비스 중 허브에 접속하지 않음",
  outSub: "받아 둔 사본만 읽기 전용",
  loop: "리비전을 바꾸면 다시 확인한 뒤에 씁니다",
  closing: "귀사 환경에서 모델을 고를 때도 같은 절차를 적용하고, 채택 기준과 판정 기록을 산출물로 남기도록 지원합니다.",
} as const;

type FlowKind = "gate" | "human";
type FlowStep = { no: string; kind: FlowKind; title: string; sub: string; stamp?: string };

/** 01 — 사내 GPU 서버 점선 밖(허브 쪽)에서 일어나는 단계. 허브 로고가 이 카드 안에 들어갑니다. */
const DOWNLOAD: FlowStep = { no: "01", kind: "gate", title: "고정 리비전 내려받기", sub: "리비전 고정 · 실행 환경은 정식 릴리스만" };

/** 02–07 — 사내 GPU 서버 점선 안의 단계(6칸: lg 3×2, md 2×3으로 빈칸 없이).
    "읽기 전용 사본"은 경계 화살표 설명(받아 둔 사본만 읽기 전용)이 이미 말하므로 따로 칸을 두지 않습니다. */
const FLOW: FlowStep[] = [
  { no: "02", kind: "human", title: "라이선스·사전 검토", sub: "용도별 라이선스 · 장비 적재 · 모델 카드의 측정 조건" },
  { no: "03", kind: "gate", title: "기능 점검", sub: "한국어 응답 · 도구 호출 · 코드 생성, 어느 항목이든 실패하면 중단" },
  { no: "04", kind: "gate", title: "실사용 조건 측정", sub: "긴 문맥 · 새 대화의 첫 응답 · 동시 사용" },
  { no: "05", kind: "gate", title: "실무형 과제 채점", sub: "테스트로 자동 채점 · 끝내기까지의 단계와 시간" },
  { no: "06", kind: "human", title: "채택 판정", sub: "측정·채점 결과와 채택 기준을 대조", stamp: "채택 판정" },
  { no: "07", kind: "gate", title: "운영 점검", sub: "자동 기동 · 상태 점검 · 자동 재기동" },
];

const FLOW_RAIL_ID = "aiax-val-flow"; // 단계 점의 aria-controls 대상
const FLOW_DOTS_LABEL = "검증 단계 위치";

/** 라이트 테마에서 틴트 면(앰버) 위 보조 글자를 AA로 올리는 클래스(modelvalidation.css). */
const ON_TINT = "aiax-modelvalidation-ontint";

/* lg 이상: 1행 왼→오(02–04), 2행 오→왼(05–07). 클래스 문자열이 소스에 그대로 있어야 Tailwind가 생성합니다. */
const SNAKE = [
  "lg:col-start-1 lg:row-start-1", "lg:col-start-2 lg:row-start-1", "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2", "lg:col-start-2 lg:row-start-2", "lg:col-start-1 lg:row-start-2",
] as const;

/* ═══════════ 보조 컴포넌트 ═══════════ */

function LoopIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function StepHead({ s, onTint }: { s: FlowStep; onTint?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("text-[11px] font-bold tracking-[0.16em] text-body", onTint && ON_TINT)} style={MONO}>
        {s.no}
      </span>
      <RoleGlyph role={s.kind} size={12} />
      <span className="sr-only">{s.kind === "human" ? VAL.humanStepSr : VAL.gateStepSr}</span>
    </div>
  );
}

/** 01 고정 리비전 내려받기 — 점선(사내 GPU 서버) 밖, 허브 로고를 품은 카드 */
function DownloadCard() {
  const s = DOWNLOAD;
  return (
    <div
      className="w-full max-w-md mx-auto xl:max-w-none xl:mx-0 xl:mt-10 rounded-2xl border border-line p-4 sm:p-5"
      style={{ background: "var(--aiax-node-bg)" }}
    >
      <p className="text-[13px] sm:text-[12px] font-bold text-body">{VAL.outsideLabel}</p>
      <div className="mt-3 flex items-center gap-4 xl:flex-col xl:items-start xl:gap-3">
        {/* 특정 허브의 로고 대신 범용 내려받기 아이콘. 라벨 "사외 · 공개 모델 허브"가 뜻을 알립니다. */}
        <span
          aria-hidden="true"
          className="grid place-items-center w-11 h-11 shrink-0 rounded-xl text-ink"
          style={{ background: "var(--color-raised)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3.5v10.5" />
            <path d="m7.5 9.5 4.5 4.5 4.5-4.5" />
            <path d="M4 15.5v2.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5" />
          </svg>
        </span>
        <div className="min-w-0">
          <StepHead s={s} />
          <p className="mt-1.5 text-[16px] sm:text-[15px] font-bold text-ink leading-snug">{s.title}</p>
          <p className="mt-1 text-[14px] sm:text-[13px] text-body leading-relaxed">{s.sub}</p>
        </div>
      </div>
    </div>
  );
}

function BoundaryArrows() {
  const reduce = useReducedMotion();
  const draw = reduce ? { duration: 0 } : { duration: 0.6, ease: EASE };
  const travel = reduce ? { duration: 0 } : { duration: 1.1, ease: EASE, delay: 0.5 };
  const label =
    "min-w-0 sm:max-w-[160px] xl:max-w-none text-[13px] xl:text-[12px] font-semibold text-ink leading-snug";
  // sm 미만: 두 방향을 2열로 나란히(위쪽 정렬, 짧은 화살표) 두어 높이를 줄입니다. sm 이상은 기존 배치 그대로.
  const group = "flex items-start gap-2 sm:items-center sm:gap-3 xl:flex-col xl:gap-2 xl:text-center";
  const vArrow = "xl:hidden shrink-0 w-5 h-12 sm:w-6 sm:h-14";
  return (
    <div className="grid grid-cols-2 items-start gap-3 px-1 sm:flex sm:items-center sm:justify-center sm:gap-10 sm:px-0 xl:flex-col xl:gap-7 py-1 xl:py-0 xl:pt-16 xl:px-3">
      {/* 들어오는 방향: 시안 실선(정적 밑선 + 그려지는 선) + 점이 건너옴 */}
      <div className={group}>
        <svg aria-hidden="true" className={vArrow} width="24" height="56" viewBox="0 0 24 56" fill="none">
          <path d="M12 4 V46" stroke="var(--aiax-ai)" strokeWidth={2} strokeOpacity={0.3} />
          <motion.path
            d="M12 4 V46"
            stroke="var(--aiax-ai)"
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VIEWPORT}
            transition={draw}
          />
          <path d="M6 40 L12 50 L18 40" stroke="var(--aiax-ai)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <motion.circle
            cx={12}
            r={3.5}
            fill="var(--aiax-ai)"
            initial={{ cy: 4, opacity: 0 }}
            whileInView={{ cy: [4, 44], opacity: [0, 1, 1, 0] }}
            viewport={VIEWPORT}
            transition={travel}
          />
        </svg>
        <svg aria-hidden="true" className="hidden xl:block" width="104" height="24" viewBox="0 0 104 24" fill="none">
          <path d="M4 12 H94" stroke="var(--aiax-ai)" strokeWidth={2} strokeOpacity={0.3} />
          <motion.path
            d="M4 12 H94"
            stroke="var(--aiax-ai)"
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VIEWPORT}
            transition={draw}
          />
          <path d="M88 6 L98 12 L88 18" stroke="var(--aiax-ai)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <motion.circle
            cy={12}
            r={3.5}
            fill="var(--aiax-ai)"
            initial={{ cx: 4, opacity: 0 }}
            whileInView={{ cx: [4, 92], opacity: [0, 1, 1, 0] }}
            viewport={VIEWPORT}
            transition={travel}
          />
        </svg>
        <p className={label}>
          {VAL.inLabel}
          <span className="block font-normal text-body">{VAL.inSub}</span>
        </p>
      </div>
      {/* 허브 쪽 방향: 점선 + ✕ (서빙 엔진의 오프라인 동작, 정적) */}
      <div className={group}>
        <svg aria-hidden="true" className={vArrow} width="24" height="56" viewBox="0 0 24 56" fill="none">
          <path d="M12 52 V12" stroke="var(--aiax-muted-line)" strokeWidth={1.5} strokeDasharray="3 4" />
          <path d="M6 18 L12 8 L18 18" stroke="var(--aiax-muted-line)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 25 L17 35 M17 25 L7 35" stroke="var(--aiax-block)" strokeWidth={2} strokeLinecap="round" />
        </svg>
        <svg aria-hidden="true" className="hidden xl:block" width="104" height="24" viewBox="0 0 104 24" fill="none">
          <path d="M100 12 H10" stroke="var(--aiax-muted-line)" strokeWidth={1.5} strokeDasharray="3 4" />
          <path d="M16 6 L6 12 L16 18" stroke="var(--aiax-muted-line)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M47 7 L57 17 M57 7 L47 17" stroke="var(--aiax-block)" strokeWidth={2} strokeLinecap="round" />
        </svg>
        <p className={label}>
          {VAL.outLabel}
          <span className="block font-normal text-body">{VAL.outSub}</span>
        </p>
      </div>
    </div>
  );
}

function FlowNode({ s, i }: { s: FlowStep; i: number }) {
  const gate = Boolean(s.stamp); // 07 채택 판정만 사람 승인 면. 02는 ◆ 글리프만.
  return (
    <motion.li
      variants={fadeUpSm}
      // md 미만: 레일 카드(폭 % → 다음 단계가 살짝 보임). md: 2열 격자. lg: 3열 두 줄 뱀 모양(SNAKE).
      className={cn("relative w-[80%] shrink-0 snap-start sm:w-[44%] md:w-auto", SNAKE[i])}
    >
      <div
        className={cn("h-full rounded-2xl p-4", gate ? "aiax-gate-band" : "border border-line")}
        style={gate ? undefined : { background: "var(--aiax-node-bg)" }}
      >
        {/* 07(앰버 면) 위 보조 글자는 라이트에서 ON_TINT로 AA를 맞춥니다. */}
        <StepHead s={s} onTint={gate} />
        <p className="mt-2 text-[16px] sm:text-[15px] font-bold text-ink leading-snug">{s.title}</p>
        <p className={cn("mt-1 text-[14px] sm:text-[13px] text-body leading-relaxed", gate && ON_TINT)}>{s.sub}</p>
        {s.stamp && (
          <div className="mt-3">
            <ApprovalStamp label={s.stamp} delay={0.9} />
          </div>
        )}
      </div>
      {/* 연결 화살표: 장식, lg 이상에서만(레일·2열 격자에서는 단계 번호가 순서를 알려 줍니다) */}
      {i < 2 && (
        <span aria-hidden="true" className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 text-navy">
          <ArrowIcon className="w-4 h-4" />
        </span>
      )}
      {i === 2 && (
        <span aria-hidden="true" className="hidden lg:flex absolute left-1/2 -bottom-8 -translate-x-1/2 text-navy">
          <ArrowIcon direction="down" className="w-4 h-4" />
        </span>
      )}
      {i >= 3 && i < FLOW.length - 1 && (
        <span aria-hidden="true" className="hidden lg:flex absolute top-1/2 -left-6 -translate-y-1/2 text-navy">
          <ArrowIcon className="w-4 h-4 rotate-180" />
        </span>
      )}
    </motion.li>
  );
}

/** 검증 단계 레일의 위치 점(md 미만). 누르면 그 단계로 넘깁니다. 점 하나의 누름 영역은 24px. */
function FlowDots({ active, railId, onSelect }: { active: number; railId: string; onSelect: (i: number) => void }) {
  return (
    <div role="group" aria-label={FLOW_DOTS_LABEL} className="md:hidden -mt-2 flex items-center justify-center gap-0.5">
      {FLOW.map((s, i) => (
        <button
          key={s.no}
          type="button"
          aria-label={`${s.no} ${s.title}`}
          aria-controls={railId}
          aria-current={i === active ? "step" : undefined}
          onClick={() => onSelect(i)}
          className="aiax-modelvalidation-dot grid place-items-center w-6 h-6 rounded-full"
        >
          <span aria-hidden="true" className="aiax-modelvalidation-dot-mark" />
        </button>
      ))}
    </div>
  );
}

/* ═══════════ 섹션 ═══════════ */
export default function AiAxModelValidation() {
  // md 미만 레일: 실제로 넘칠 때만 키보드 탭 정지(첫 렌더는 서버와 같은 false) + 단계 점 위치
  const [flowRef, flowScrollable] = useOverflowX<HTMLOListElement>();
  const flowRail = useRailIndex(flowRef);

  return (
    <section
      id={AIAX_ID.llmValidation}
      aria-labelledby="aiax-val-title"
      // aiax-modelvalidation-nojs: 스크립트가 꺼져 있으면 등장 전 상태(opacity 0)로 남는 정보 요소를 보이게 합니다(CSS).
      className="aiax-modelvalidation-nojs relative py-14 md:py-24 px-6 overflow-hidden scroll-mt-32"
    >
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader eyebrow={VAL.eyebrow} title={VAL_TITLE} lead={VAL.lead} titleId="aiax-val-title" />

        {/* 01은 점선 밖(허브 쪽), 02–07은 사내 GPU 서버 점선 안 */}
        <div className="mt-10 md:mt-12">
          <h3 className="text-[18px] sm:text-[20px] font-bold text-ink">{VAL.flowTitle}</h3>
          <div className="mt-4 md:mt-6 grid grid-cols-1 xl:grid-cols-[200px_128px_minmax(0,1fr)] gap-3 md:gap-4 xl:gap-0 items-start">
            <DownloadCard />
            <BoundaryArrows />
            <div className="rounded-3xl border-2 border-dashed p-4 sm:p-6" style={{ borderColor: "var(--aiax-muted-line)" }}>
              <p className="text-[13px] sm:text-[12px] font-bold text-ink">{VAL.insideLabel}</p>
              {/* md 미만: 가로 레일(상자 안쪽 테두리까지 번져 넘김, 다음 단계가 살짝 보임, 스크롤바 대신 단계 점).
                  안에 조작 요소가 없어 넘칠 때만 tabIndex=0으로 키보드 스크롤을 엽니다. DOM 순서 = 단계 순서 02→07. */}
              <motion.ol
                ref={flowRef}
                id={FLOW_RAIL_ID}
                aria-label={VAL.flowAria}
                tabIndex={flowScrollable ? 0 : undefined}
                className={cn(
                  MV_RAIL,
                  "aiax-focus-inset mt-3 -mx-4 px-4 scroll-px-4 pt-1 pb-4 sm:-mx-6 sm:px-6 sm:scroll-px-6", // pb-4: 등장 시 y 이동이 잘리지 않게
                  "md:mt-4 md:mx-0 md:p-0 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12",
                )}
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_GRID}
              >
                {FLOW.map((s, i) => (
                  <FlowNode key={s.no} s={s} i={i} />
                ))}
              </motion.ol>
              <FlowDots active={flowRail.active} railId={FLOW_RAIL_ID} onSelect={flowRail.goTo} />
              <p className="mt-1 md:mt-5 flex items-center gap-1.5 text-[13px] text-body">
                <LoopIcon />
                {VAL.loop}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 md:mt-10 max-w-3xl text-[15px] text-body leading-relaxed">{VAL.closing}</p>
      </div>
    </section>
  );
}

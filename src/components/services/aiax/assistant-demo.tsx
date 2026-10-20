"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DemoFrame, EASE, cn } from "./shared";
import "./assistant.css";

/* ═══════════ profileManager AI 어시스턴트 · 동작 재현 ═══════════
   04 · AI ASSISTANT 섹션 안에 놓이는 대화 재현입니다(서비스 근거 칩 CASE 01 profileManager가 이 섹션으로 연결).
   실제 화면 구성(인사말 · 추천 질문 · 입력창 · Think · 조건 칩 · 인력 카드 · 근거 펼침)을 따르고,
   실무에서 들어오는 긴 요청 문장에서 조건을 뽑아 찾는 모습을 보여 줍니다.
   기관·업체·제품·고객사 이름은 일반 표현으로 바꿨고, 인물·값은 모두 가상입니다.
   처리 시간, 내부 문서 경로, 학력 같은 항목은 공개 화면에 넣지 않습니다. */

const ASSIST = {
  frameTitle: "AI 어시스턴트 · 동작 재현",
  source: "profileManager AI 어시스턴트",
  greeting: "담당자 님, 무엇이 궁금하세요?",
  suggestions: ["IB 경험 초급 한 명", "차세대 프로젝트 진행 상황 알려줘", "다음 달 투입 가능한 PM 있어?"],
  question:
    "○○기관에 외부 업체가 만든 신용평가 시스템이 있는데, 그 안의 심사 규칙이 상용 룰엔진으로 구현돼 있습니다. 이 규칙을 다른 룰엔진으로 옮기려고 공수를 산정 중이라, 해당 룰엔진을 다뤄 봤거나 신용평가 모델링 경험이 있는 인력을 두 명 찾고 있어요.",
  placeholder: "인력·프로젝트, 무엇이든 물어보세요",
  maxLen: 500,
  think: "Think",
  steps: ["질문 해석 · 조건 추출", "인력 검색 · 키워드 + 의미 검색", "투입 가능 여부 확인"],
  stepsLabel: "3단계",
  conditions: [
    { k: "업무", v: "신용평가" },
    { k: "기술", v: "룰엔진" },
    { k: "역할", v: "신용평가 모델링" },
  ],
  count: "2명",
  addCondition: "조건",
  summary:
    "‘신용평가’, ‘룰엔진’, ‘신용평가 모델링’으로 찾은 인력 중 상위 2명입니다. 같은 뜻의 ‘모형 개발’도 함께 찾았습니다. 두 조건을 모두 갖춘 인력은 #1입니다.",
  summaryBasis: "근거: 인력 검색 결과 · 투입 일정 조회",
  detail: "상세",
  evidence: "근거",
  note: "화면의 기관·인물·값은 모두 가상이며 실제 인력 현황이 아닙니다. 실제 화면은 조건에 맞는 인력을 최대 5명까지 보여 줍니다.",
  replay: "처음부터 다시",
} as const;

type Card = {
  id: string;
  rank: string;
  name: string;
  meta: string;
  when: string;
  score: number;
  hits: string;
  basis: { label: string; value: string }[];
};

/** 가상 인력 카드 2장(실제 화면은 최대 5장). 값은 모두 시연용입니다. */
const CARDS: Card[] = [
  {
    id: "a",
    rank: "#1",
    name: "후보 A",
    meta: "고급 · 정직원 · 4.5년",
    when: "즉시",
    score: 96,
    hits: "룰엔진(3건) · 신용평가(2건)",
    basis: [
      { label: "IT 경력", value: "9.5년" },
      { label: "자격증", value: "정보처리기사, SQLD" },
      { label: "최근 프로젝트", value: "○○카드 심사 규칙 룰엔진 전환 (8개월), ○○저축은행 신용평가 시스템 구축 (12개월)" },
    ],
  },
  {
    id: "b",
    rank: "#2",
    name: "후보 B",
    meta: "중급 · 프리랜서 · 2년",
    when: "다음 달",
    score: 88,
    hits: "모형 개발(2건, 같은 뜻) · 신용평가(1건)",
    basis: [
      { label: "IT 경력", value: "6년" },
      { label: "자격증", value: "ADsP" },
      { label: "최근 프로젝트", value: "○○캐피탈 신용평가 모형 개발 (10개월), ○○은행 여신 심사 모형 고도화 (6개월)" },
    ],
  },
];

/* ── 재현 일정 ──
   질문을 단어 단위로 입력 → 전송 → 처리 단계 3개 → 조건 칩 → 요약 → 카드 2장 → #1 근거 펼침.
   phase: 0 입력 전·입력 중 · 1 전송 · 2–4 처리 단계 · 5 조건 · 6 요약 · 7–8 카드 · 9 근거 펼침(완료) */
const WORDS = ASSIST.question.split(" ");
const TYPE_START = 600;
const TYPE_EVERY = 70;
const SENT_AT = TYPE_START + WORDS.length * TYPE_EVERY + 450;
const PHASE_AT = [SENT_AT, SENT_AT + 600, SENT_AT + 1100, SENT_AT + 1600, SENT_AT + 2200, SENT_AT + 2600, SENT_AT + 3000, SENT_AT + 3350, SENT_AT + 4300];
const FINAL = PHASE_AT.length;
const P = { sent: 1, stepsFrom: 2, answer: 5, summary: 6, cardsFrom: 7, autoBasis: 9 } as const;

const ITEM_IN = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35, ease: EASE } };
const REVEAL = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.35, ease: EASE },
};

function Sparkle({ className }: { className?: string }) {
  const gid = `aiax-assist-spark-${useId().replace(/:/g, "")}`; // 아이콘마다 고유 id(같은 창이 여러 번 쓰여도 중복 없음)
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("shrink-0", className)}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d="M12 2c.6 4.6 2.9 7.4 8 8-5.1.6-7.4 3.4-8 8-.6-4.6-2.9-7.4-8-8 5.1-.6 7.4-3.4 8-8Z" fill={`url(#${gid})`} />
    </svg>
  );
}

function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className={cn("w-3 h-3 transition-transform duration-300", open && "rotate-90", className)}>
      <path d="M4.5 2.5 8 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 인력 카드: 순위 · 이름 · 등급/고용/연차 · 투입 가능 · 점수 막대 · 검색 적중 · 상세/근거. 근거는 눌러서 펼칩니다. */
function PersonCard({ c, open, onToggle, scoreReady }: { c: Card; open: boolean; onToggle: () => void; scoreReady: boolean }) {
  const basisId = `aiax-assist-basis-${c.id}`;
  return (
    <motion.article className="aiax-assist-card rounded-2xl border border-line p-4 sm:p-5" {...ITEM_IN}>
      <div className="flex items-start justify-between gap-3">
        <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <span className="text-[16px] font-extrabold text-[var(--aiax-human)]">{c.rank}</span>
          <span className="text-[16px] font-bold text-ink">{c.name}</span>
          <span className="text-[13px] text-body">{c.meta}</span>
        </p>
        <span className="inline-flex items-center gap-1 shrink-0 text-[13px] font-semibold text-[var(--aiax-gate)]">
          <svg viewBox="0 0 12 12" aria-hidden="true" className="w-3 h-3">
            <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M3.7 6.1 5.3 7.6 8.4 4.4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {c.when}
        </span>
      </div>

      {/* 점수 막대(가상 값) */}
      <div className="mt-3 flex items-center gap-3">
        <p className="w-10 shrink-0 text-right leading-none tabular-nums">
          <span className="block text-[18px] font-semibold text-ink">{c.score}</span>
          <span className="block mt-1 text-[11px] text-body">/100</span>
        </p>
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-raised)" }}>
          <motion.div
            className="aiax-assist-bar h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: scoreReady ? `${c.score}%` : 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[13px]">
        <p className="text-body">
          <span className="font-semibold text-ink">검색 적중</span> {c.hits}
        </p>
        <span className="font-semibold tabular-nums text-[var(--aiax-human)]">+{c.score}</span>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <span className="inline-flex items-center h-8 px-3 rounded-lg border border-line text-[13px] font-semibold text-ink">
          {ASSIST.detail}
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={basisId}
          className={cn(
            "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border text-[13px] font-semibold text-ink cursor-pointer transition-colors duration-200",
            open ? "border-[var(--aiax-human)] bg-[var(--aiax-tint-human)]" : "border-line hover:bg-[var(--color-raised)]",
          )}
        >
          <svg viewBox="0 0 12 12" aria-hidden="true" className={cn("w-3 h-3 transition-transform duration-300", open && "rotate-180")}>
            <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {ASSIST.evidence}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={basisId} className="overflow-hidden" {...REVEAL}>
            <dl className="mt-3 pt-3 border-t border-line space-y-2.5">
              {c.basis.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE, delay: 0.12 + i * 0.08 }}
                >
                  <dt className="text-[12px] text-body">{b.label}</dt>
                  <dd className="mt-0.5 text-[14px] sm:text-[13px] text-ink leading-relaxed">{b.value}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function AssistantScreen({
  phase,
  typed,
  openIds,
  onToggleBasis,
  stepsOpen,
  onToggleSteps,
}: {
  phase: number;
  typed: number;
  openIds: ReadonlySet<string>;
  onToggleBasis: (id: string) => void;
  stepsOpen: boolean;
  onToggleSteps: () => void;
}) {
  const sent = phase >= P.sent;
  const answered = phase >= P.answer;
  const draft = sent ? "" : WORDS.slice(0, typed).join(" ");
  const showSteps = !answered || stepsOpen;
  return (
    <div className="aiax-assist-app px-4 sm:px-8 pt-6 pb-5 sm:pt-8 sm:pb-6">
      <div className="min-h-[260px] sm:min-h-[300px] flex flex-col">
        <AnimatePresence mode="wait" initial={false}>
          {!sent ? (
            /* ① 빈 화면: 인사말 + 추천 질문 */
            <motion.div
              key="empty"
              className="flex-1 flex flex-col items-center justify-center text-center"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
            >
              <p className="flex items-center gap-2 text-[19px] sm:text-[22px] font-bold text-ink">
                <Sparkle className="w-5 h-5 sm:w-6 sm:h-6" />
                {ASSIST.greeting}
              </p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {ASSIST.suggestions.map((q) => (
                  <li key={q} className="aiax-assist-chip rounded-full px-3.5 py-1.5 text-[14px] sm:text-[13px] text-ink">
                    {q}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            /* ② 대화: 긴 요청 → 처리 단계 → 조건 칩 · 요약 → 인력 카드(근거 펼침) */
            <motion.div key="chat" className="flex-1 flex flex-col gap-4" {...ITEM_IN}>
              <div className="flex justify-end">
                <p className="aiax-assist-bubble max-w-[92%] sm:max-w-[82%] rounded-2xl rounded-br-md px-4 py-3 text-[15px] sm:text-[14px] text-ink leading-relaxed">
                  {ASSIST.question}
                </p>
              </div>

              <div className="flex gap-3">
                <Sparkle className="w-5 h-5 mt-0.5" />
                <div className="min-w-0 flex-1">
                  {/* 처리 단계: 처리 중에는 펼쳐 보이고, 답이 나오면 "› 3단계"로 접힙니다(다시 펼칠 수 있음). */}
                  {answered && (
                    <button
                      type="button"
                      onClick={onToggleSteps}
                      aria-expanded={stepsOpen}
                      className="inline-flex items-center gap-1.5 text-[13px] text-body cursor-pointer hover:text-ink"
                      style={{ fontFamily: "var(--font-space-mono), monospace" }}
                    >
                      <Chevron open={stepsOpen} />
                      {ASSIST.stepsLabel}
                    </button>
                  )}
                  <AnimatePresence initial={false}>
                    {showSteps && (
                      <motion.ol className="overflow-hidden" aria-label="처리 단계" {...REVEAL}>
                        <div className={cn("flex flex-col gap-1.5", answered && "pt-2")}>
                          {ASSIST.steps.map((st, i) =>
                            phase >= P.stepsFrom + i ? (
                              <motion.li key={st} className="flex items-center gap-2 text-[13px] text-body" {...ITEM_IN}>
                                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--aiax-ai)" }} />
                                {st}
                              </motion.li>
                            ) : null,
                          )}
                        </div>
                      </motion.ol>
                    )}
                  </AnimatePresence>

                  {answered && (
                    <motion.ul className="mt-3 flex flex-wrap gap-2" aria-label="추출한 조건" {...ITEM_IN}>
                      {ASSIST.conditions.map((c) => (
                        <li key={c.k} className="aiax-assist-cond inline-flex items-center gap-1.5 rounded-full pl-3 pr-2.5 py-1.5 text-[13px] text-ink">
                          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--aiax-human-fill)" }} />
                          <span className="text-body">{c.k}</span>
                          <span className="font-semibold">{c.v}</span>
                          <span aria-hidden="true" className="text-body">✕</span>
                        </li>
                      ))}
                      <li className="aiax-assist-cond inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold text-ink">
                        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--aiax-human-fill)" }} />
                        {ASSIST.count}
                      </li>
                      <li className="inline-flex items-center gap-1 rounded-full border border-dashed border-line px-3 py-1.5 text-[13px] text-body">
                        + {ASSIST.addCondition}
                      </li>
                    </motion.ul>
                  )}

                  {phase >= P.summary && (
                    <motion.div {...ITEM_IN}>
                      <p className="mt-3 text-[15px] sm:text-[14px] text-ink leading-relaxed">{ASSIST.summary}</p>
                      <p className="mt-1.5 text-[12px] text-body">{ASSIST.summaryBasis}</p>
                    </motion.div>
                  )}

                  <div className="mt-3 flex flex-col gap-3">
                    {CARDS.map((c, i) =>
                      phase >= P.cardsFrom + i ? (
                        <PersonCard
                          key={c.id}
                          c={c}
                          open={openIds.has(c.id)}
                          onToggle={() => onToggleBasis(c.id)}
                          scoreReady={phase >= P.cardsFrom + i}
                        />
                      ) : null,
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 입력창(장식): 실제 화면과 같은 배치. 입력 중에는 마지막 줄이 보이도록 아래쪽에 맞춥니다. */}
      <div aria-hidden="true" className="aiax-assist-input mt-5 rounded-2xl p-px">
        <div className="flex items-end gap-3 rounded-[15px] pl-4 pr-2 py-2" style={{ background: "var(--aiax-node-bg)" }}>
          <div className="flex-1 min-w-0 self-center max-h-[4.5em] overflow-hidden flex flex-col justify-end text-[14px] leading-[1.5]">
            {draft ? (
              <span className="text-ink">
                {draft}
                <span className="aiax-assist-caret" />
              </span>
            ) : (
              <span className="truncate text-body">{ASSIST.placeholder}</span>
            )}
          </div>
          <span className="hidden sm:inline mb-2.5 text-[11px] text-body tabular-nums">
            {draft.length}/{ASSIST.maxLen}
          </span>
          <span className="aiax-assist-think mb-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold">
            <Sparkle className="w-3 h-3" />
            {ASSIST.think}
          </span>
          <span
            className={cn("grid place-items-center w-9 h-9 rounded-xl transition-colors duration-200", draft ? "aiax-assist-send-on" : "text-body")}
            style={draft ? undefined : { background: "var(--color-raised)" }}
          >
            ↵
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 인라인 재현(섹션 C: 04 · AI ASSISTANT 안). 화면에 들어오면 한 번 재생하고, "처음부터 다시"로 다시 봅니다.
 * 재생은 뷰포트 진입 콜백(이벤트)에서 시작합니다. 동작 줄이기면 완료 상태를 바로 보여 줍니다.
 */
export function AssistantDemo({ skipHref }: { skipHref?: string }) {
  const reduce = useReducedMotion();
  const timers = useRef<number[]>([]);
  const started = useRef(false);
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState(0);
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());
  const [stepsOpen, setStepsOpen] = useState(false);

  const play = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setStepsOpen(false);
    if (reduce) {
      setTyped(WORDS.length);
      setPhase(FINAL);
      setOpenIds(new Set([CARDS[0].id]));
      return;
    }
    setTyped(0);
    setPhase(0);
    setOpenIds(new Set());
    const t = timers.current;
    WORDS.forEach((_, i) => t.push(window.setTimeout(() => setTyped(i + 1), TYPE_START + i * TYPE_EVERY)));
    PHASE_AT.forEach((ms, i) =>
      t.push(
        window.setTimeout(() => {
          setPhase(i + 1);
          if (i + 1 === P.autoBasis) setOpenIds(new Set([CARDS[0].id])); // 마지막: #1의 "근거"를 눌러 펼쳐 보임
        }, ms),
      ),
    );
  };
  const toggleBasis = (id: string) =>
    setOpenIds((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <motion.div
      viewport={{ once: true, amount: 0.35 }}
      onViewportEnter={() => {
        if (started.current) return;
        started.current = true;
        play();
      }}
    >
      <DemoFrame title={ASSIST.frameTitle} source={ASSIST.source} status="live" skipHref={skipHref}>
        <AssistantScreen
          phase={phase}
          typed={typed}
          openIds={openIds}
          onToggleBasis={toggleBasis}
          stepsOpen={stepsOpen}
          onToggleSteps={() => setStepsOpen((v) => !v)}
        />
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 sm:px-6 py-3.5 border-t border-line">
          <p className="flex-1 text-[14px] sm:text-[13px] text-body leading-relaxed">{ASSIST.note}</p>
          <button
            type="button"
            onClick={play}
            className="self-start sm:self-auto inline-flex items-center h-9 px-3.5 rounded-full border border-line text-[13px] font-semibold text-ink whitespace-nowrap cursor-pointer hover:bg-[var(--color-raised)]"
          >
            ↻ {ASSIST.replay}
          </button>
        </div>
      </DemoFrame>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  AIAX_ID,
  ArrowIcon,
  MONO,
  RoleGlyph,
  SectionHeader,
  StatusBadge,
  VIEWPORT_GRID,
  cn,
  fadeUpSm,
  stagger,
  type Role,
} from "./aiax/shared";

/* ═══════════ 문구 ═══════════
   profileManager의 실제 서브에이전트(기획 · 화면 구현 · 백엔드 구현 · 코드리뷰 · 브라우저 검수 · 백엔드 검증)만 씁니다.
   이 섹션은 사내 시스템 profileManager를 만든 방식으로만 설명합니다(회사 전체의 개발 방식으로 일반화하지 않음). */
const PIPE = {
  eyebrow: "02 · HOW WE BUILD",
  title: (
    <>
      역할이 다른 AI 에이전트가 나눠 맡고,
      <br className="hidden sm:block" /> 마지막은 사람이 승인합니다
    </>
  ),
  lead: "사내 업무 시스템 profileManager는 기획부터 구현, 리뷰, 검수까지 역할이 정해진 AI 에이전트들이 나눠 맡아 개발합니다. 반영 여부는 담당자가 결정합니다.",
  listAria: "개발 단계와 맡는 주체",
} as const;

type Step = {
  no: string;
  label: string;
  role: Role;
  members: { name: string; does: string }[];
};

const STEPS: Step[] = [
  {
    no: "01",
    label: "계획",
    role: "ai",
    members: [
      {
        name: "기획 에이전트",
        does: "명세를 읽고 구현 순서와 테스트 목록을 계획서로 정리합니다. 판단이 필요한 쟁점은 담당자에게 넘깁니다.",
      },
    ],
  },
  {
    no: "02",
    label: "구현",
    role: "ai",
    members: [
      { name: "화면 구현 에이전트", does: "명세와 계획서에 따라 화면 코드를 작성합니다." },
      { name: "백엔드 구현 에이전트", does: "먼저 작성된 테스트를 통과하는 코드만 씁니다. 테스트는 고치지 않습니다." },
    ],
  },
  {
    no: "03",
    label: "검증",
    role: "ai",
    members: [
      { name: "코드리뷰 에이전트", does: "명세와 코드를 대조해 어긋난 곳을 짚습니다." },
      { name: "브라우저 검수 에이전트", does: "화면을 직접 열어 검수 포인트를 확인합니다." },
      { name: "백엔드 검증 에이전트", does: "API를 호출해 응답이 명세와 맞는지 확인합니다." },
    ],
  },
  {
    no: "04",
    label: "승인",
    role: "human",
    members: [
      {
        name: "담당자",
        does: "에이전트의 결과와 검증 기록을 직접 검토하고 반영을 승인합니다. 결정과 책임은 사람에게 있습니다.",
      },
    ],
  },
];

/* ═══════════ 섹션 ═══════════ */
export default function AiAxPipeline() {
  return (
    <section
      id={AIAX_ID.pipeline}
      aria-labelledby="aiax-pipe-title"
      className="relative py-14 md:py-24 px-6 overflow-hidden scroll-mt-32"
    >
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          eyebrow={PIPE.eyebrow}
          title={PIPE.title}
          lead={PIPE.lead}
          titleId="aiax-pipe-title"
          aside={<StatusBadge status="live" />}
        />

        {/* 모바일: 위에서 아래로 쌓인 4단계. md: 2열. lg: 4열(단계 사이 화살표). 단계 번호가 순서를 알려 줍니다. */}
        <motion.ol
          aria-label={PIPE.listAria}
          className="mt-10 md:mt-12 grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_GRID}
        >
          {STEPS.map((step, i) => {
            const human = step.role === "human";
            return (
              <motion.li key={step.no} variants={fadeUpSm} className="relative">
                <div
                  className={cn("h-full rounded-2xl p-4 sm:p-5", human ? "aiax-gate-band" : "border border-line")}
                  style={human ? undefined : { background: "var(--aiax-node-bg)" }}
                >
                  <p
                    className="text-[12px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-body"
                    style={MONO}
                  >
                    {step.no} · {step.label}
                  </p>
                  <ul className="mt-3 space-y-3.5">
                    {step.members.map((m) => (
                      <li key={m.name} className="flex gap-2.5">
                        <RoleGlyph role={step.role} size={11} className="mt-[6px]" />
                        <div className="min-w-0">
                          <h3 className="text-[16px] font-bold text-ink leading-snug">{m.name}</h3>
                          <p className="mt-1 text-[15px] sm:text-[14px] text-body leading-relaxed">{m.does}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* 단계 사이 화살표: 장식, lg(4열 한 줄)에서만 */}
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:flex absolute top-1/2 -right-5 -translate-y-1/2 text-navy"
                  >
                    <ArrowIcon className="w-4 h-4" />
                  </span>
                )}
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}

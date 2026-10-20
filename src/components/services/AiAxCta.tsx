"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  AIAX_ID,
  EASE,
  Eyebrow,
  MONO,
  PrimaryButton,
  RoleGlyph,
  SecondaryButton,
  VIEWPORT,
  VIEWPORT_GRID,
  fadeUp,
  fadeUpSm,
  stagger,
} from "@/components/services/aiax/shared";
import "./aiax/cta.css";

/* ═══════════ 문구 (C12, 그대로) ═══════════ */
const CTA = {
  eyebrow: "NEXT STEP",
  /* 의미 단위로 세 줄을 고정합니다: "귀사의 / 규칙 안에서도 작동하는지, / 함께 확인해 보세요".
     모바일 26px에서 둘째 줄은 약 252px이라, 스크롤바가 폭을 차지하는 375px 창(본문 360px, 프레임 안쪽 약 269px)에도 한 줄로 들어갑니다.
     320px처럼 더 좁아져도 '규칙 안에서도'는 nowrap이라 '규칙 / 안에서도'로 갈라지지 않습니다. */
  title: (
    <>
      저희 방식이 귀사의 <br />
      <span className="whitespace-nowrap">규칙 안에서도</span> 작동하는지, <br />
      함께 확인해 보세요
    </>
  ),
  lead: "업무와 데이터, 망 환경을 알려 주시면 AI를 적용할 지점과 사람이 승인할 지점을 함께 정리해 드립니다. 적용할 수 있는 곳과 아직 이른 곳을 솔직하게 말씀드리겠습니다.",
  primary: { label: "AI 적용 상담하기", href: "/contact" },
  secondary: { label: "개발 방식 다시 보기", href: "#pipeline" },
  helper: "상담을 요청하실 때 '문의 분야'에서 'AI · AX 서비스'를 선택해 주세요.",
  brandLine: "AI가 기안하고, 사람이 결재합니다.",
  table: [
    { head: "초안", who: "AI", state: "완료" },
    { head: "검토", who: "나누리아이티", state: "완료" },
    { head: "승인", who: "귀사 담당자", state: "비어 있음" },
  ],
  caption: "이 칸은 언제나 사람의 몫입니다. AI가 채울 수 없는 칸을 먼저 정하는 것, 그것이 저희가 AI를 들이는 방식입니다.",
  tableCaption: "결재란: 초안 AI 완료, 검토 나누리아이티 완료, 승인 귀사 담당자 비어 있음",
  questionsTitle: "상담 전에 정리해 두시면 좋은 네 가지 질문",
  questions: [
    "AI에게 맡기고 싶은 업무는 무엇입니까?",
    "그 업무가 다루는 데이터는 어디에 있고, 어디까지 나갈 수 있습니까?",
    "결과를 최종 확정하는 사람은 누구입니까?",
    "무엇이 확인되면 성공이라고 판단하시겠습니까?",
  ],
};

/* ═══════════ 결재란 칸 ═══════════ */
// 모바일 84px(세 칸 252px, 375px 화면의 프레임 안쪽 폭에 들어감) · md 이상 96px. 글리프 자리는 세 칸 모두 h-7로 고정해 아래 이름 줄의 높이를 맞춥니다.
const CELL = "border border-line w-[84px] h-[84px] md:w-[96px] md:h-[96px] text-center align-middle";
const CELL_GLYPH = "flex h-7 items-center justify-center";
const CELL_LABEL = "mt-1.5 block text-[13px] font-semibold text-ink";

/** 작은따옴표로 묶은 화면 용어('문의 분야'에서, 'AI · AX 서비스'를)는 조사까지 한 덩어리로 줄바꿈합니다. 문구 자체는 바꾸지 않습니다. */
function KeepQuoted({ text }: { text: string }) {
  return (
    <>
      {text.split(/('[^']+'\S*)/).map((part, i) =>
        i % 2 === 1 ? (
          <span key={`${i}-${part}`} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** 배경 장식: 왼쪽(AI, 시안 틴트)에서 오른쪽(사람 승인, 앰버 틴트)으로. 테마 토큰만 씁니다. */
function CtaAmbient() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute -left-44 top-[8%] h-[520px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(closest-side, var(--aiax-tint-ai), transparent)" }}
      />
      <div
        className="absolute -right-44 bottom-[6%] h-[560px] w-[560px] rounded-full"
        style={{ background: "radial-gradient(closest-side, var(--aiax-tint-human), transparent)" }}
      />
    </div>
  );
}

export default function AiAxCta() {
  // reduced-motion 분기는 transition에서만 합니다(A3-3: initial·style·className·구조는 분기하지 않음).
  const reduce = useReducedMotion();
  const [draft, review, approve] = CTA.table;

  return (
    <section
      id={AIAX_ID.cta}
      aria-labelledby="aiax-cta-title"
      className="relative py-12 md:py-28 px-6 overflow-hidden scroll-mt-32"
    >
      <CtaAmbient />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="aiax-gborder aiax-cta-reveal rounded-3xl p-px"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <div className="aiax-frame-inner rounded-[23px] px-5 py-6 sm:p-12 md:p-14">
            <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 sm:gap-10 items-center">
              {/* ── 왼쪽: 제안 ── */}
              <div className="min-w-0">
                <Eyebrow>{CTA.eyebrow}</Eyebrow>
                <h2
                  id="aiax-cta-title"
                  className="mt-3 text-[26px] sm:text-4xl md:text-[40px] font-black tracking-tight leading-tight text-ink text-balance"
                >
                  {CTA.title}
                </h2>
                <p className="mt-4 sm:mt-5 text-[16px] text-body leading-relaxed text-pretty">{CTA.lead}</p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-center gap-3">
                  <PrimaryButton href={CTA.primary.href} className="whitespace-nowrap">
                    {CTA.primary.label}
                  </PrimaryButton>
                  {/* 위쪽 섹션(#pipeline)으로 돌아가는 링크라 화살표를 위로 돌리고, hover 이동도 위로 맞춥니다. */}
                  <SecondaryButton
                    href={CTA.secondary.href}
                    icon="down"
                    className="whitespace-nowrap [&>svg]:rotate-180 [&>svg]:group-hover:-translate-y-0.5"
                  >
                    {CTA.secondary.label}
                  </SecondaryButton>
                </div>
                <p className="mt-3 sm:mt-4 text-[14px] sm:text-[13px] text-body">
                  <KeepQuoted text={CTA.helper} />
                </p>
              </div>

              {/* ── 오른쪽: 결재란 ──
                  모바일(<sm): 세로로 쌓고 가운데 정렬(결재란 폭 252px).
                  태블릿(sm~lg): 브랜드 라인 전폭 + [결재란 | 설명] 2열, 위 텍스트와 같이 왼쪽 정렬. DOM 순서 = 시각 순서.
                  데스크톱(lg+): 오른쪽 열 안에서 세로로 쌓음(기존 그대로). */}
              <div className="min-w-0 sm:grid sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-x-8 lg:block">
                <p className="text-[14px] font-bold text-ink text-center sm:text-left sm:col-span-2">{CTA.brandLine}</p>

                <table className="mt-3 sm:mt-4 mx-auto sm:mx-0 border-collapse">
                  <caption className="sr-only">{CTA.tableCaption}</caption>
                  <thead>
                    <tr>
                      {CTA.table.map((c) => (
                        <th
                          key={c.head}
                          scope="col"
                          className="border border-line px-2 py-1.5 text-[12px] font-semibold text-body"
                          style={{ background: "var(--color-raised)" }}
                        >
                          {c.head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* ① 초안 · AI: 원이 12시 방향부터 그려집니다 */}
                      <td className={CELL}>
                        <span aria-hidden="true" className={CELL_GLYPH}>
                          <svg viewBox="0 0 24 24" className="w-7 h-7">
                            <g transform="rotate(-90 12 12)">
                              <motion.circle
                                cx="12"
                                cy="12"
                                r="8"
                                fill="none"
                                className="aiax-cta-draw"
                                stroke="var(--aiax-ai)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={VIEWPORT}
                                transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
                              />
                            </g>
                            <circle cx="12" cy="12" r="4" fill="var(--aiax-ai)" />
                          </svg>
                        </span>
                        <span className={CELL_LABEL}>{draft.who}</span>
                        <span className="sr-only">{draft.state}</span>
                      </td>

                      {/* ② 검토 · 나누리아이티: ■ 자동 검증 + ◆ 사람 검토 */}
                      <td className={CELL}>
                        <motion.span
                          aria-hidden="true"
                          className={`${CELL_GLYPH} aiax-cta-reveal gap-1`}
                          initial={{ opacity: 0, y: 14 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={VIEWPORT}
                          transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE, delay: 0.85 }}
                        >
                          <RoleGlyph role="gate" size={14} />
                          <RoleGlyph role="human" size={14} />
                        </motion.span>
                        <span className={CELL_LABEL}>{review.who}</span>
                        <span className="sr-only">{review.state}</span>
                      </td>

                      {/* ③ 승인 · 귀사 담당자: 끝까지 비어 있음. 점선 ◆가 두 번 숨쉬고 멈춥니다(4.8초). */}
                      <td className={CELL} style={{ background: "var(--aiax-tint-human)" }}>
                        <motion.span
                          aria-hidden="true"
                          className={CELL_GLYPH}
                          initial={{ opacity: 1 }}
                          whileInView={{ opacity: [1, 0.45, 1, 0.45, 1] }}
                          viewport={VIEWPORT}
                          transition={reduce ? { duration: 0 } : { duration: 4.8, ease: "easeInOut", delay: 1.3 }}
                        >
                          <RoleGlyph role="human" variant="pending" size={22} />
                        </motion.span>
                        <span className={CELL_LABEL}>{approve.who}</span>
                        <span className="sr-only">{approve.state}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* sm~lg에서는 결재란 오른쪽 칸. 둘 다 mt-4라 self-center로 세로 중심이 맞습니다. */}
                <p className="mt-3 sm:mt-4 sm:self-center text-[14px] sm:text-[13px] text-body leading-relaxed max-w-xs sm:max-w-sm lg:max-w-xs mx-auto sm:mx-0 text-center sm:text-left text-pretty">
                  {CTA.caption}
                </p>
              </div>
            </div>

            {/* ── 하단 전폭: 상담 전 질문 ── */}
            <div className="mt-7 pt-6 sm:mt-10 sm:pt-8 border-t border-line">
              <h3 className="text-[17px] font-bold text-ink text-balance">{CTA.questionsTitle}</h3>
              {/* role="list": list-style가 없는 목록을 Safari VoiceOver가 목록으로 읽도록 유지합니다. */}
              <motion.ol
                role="list"
                className="mt-3 sm:mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2.5 sm:gap-y-3"
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_GRID}
              >
                {CTA.questions.map((q, i) => (
                  <motion.li key={q} variants={fadeUpSm} className="aiax-cta-reveal flex items-baseline gap-2.5 sm:gap-3">
                    <span aria-hidden="true" className="shrink-0 text-[12px] font-bold tracking-[0.12em] text-body" style={MONO}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* 모바일 16px/1.6(card-body 17px/1.7보다 한 단계 촘촘), md 이상은 card-body와 같은 15px/1.7. */}
                    <span className="min-w-0 text-[16px] leading-[1.6] md:text-[15px] md:leading-[1.7] text-ink">{q}</span>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { AIAX_FAQ } from "./aiax/faq";
import { AIAX_ID, ArrowIcon, EASE, MONO, SectionHeader, VIEWPORT, cn } from "./aiax/shared";

/* ─────────── 문구 (spec C11, 그대로) ─────────── */
const FAQ = {
  eyebrow: "08 · FAQ",
  title: "자주 묻는 질문",
  lead: "도입을 검토하실 때 가장 먼저 나오는 질문에 답했습니다. 더 구체적인 질문은 상담에서 귀사의 환경을 기준으로 답변드리겠습니다.",
  ask: "질문 남기기",
} as const;

const TITLE_ID = "aiax-faq-title";

/** 섹션 헤더(fadeUp)와 같은 곡선으로 한 박자 늦게 따라 들어오는 "질문 남기기" 링크. */
const askIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay: 0.12 } },
};

/**
 * 행 진입(점진적 향상). 마운트 시점에 화면 아래에 있던 행(details)에만 data-await를 붙였다가, 보이면 뗍니다.
 * - details는 `#faq-*` 앵커 대상이므로 불투명도만 바뀝니다. 앵커 대상 자체가 transform으로 움직이는 중이면
 *   부드러운 스크롤이 움직이는 중의 위치를 목표로 잡아, 첫 이동에서 서브내비 아래로 파고듭니다(r2: 112px 착지).
 * - 16px 떠오르는 움직임은 안쪽 summary가 맡습니다. 자식의 transform은 details의 위치 계산에 영향이 없습니다.
 * - 같은 순간 들어온 행끼리의 간격은 CSS 변수 하나(--aiax-faq-delay)로 details와 summary가 함께 씁니다.
 */
const AWAIT_ATTR = "data-await";
const DELAY_VAR = "--aiax-faq-delay";
const REVEAL_ROOT_MARGIN = "0px 0px -60px 0px"; // 화면 아래 60px 안쪽으로 들어오면
const REVEAL_STAGGER_MS = 70; // 같은 순간 들어온 행끼리의 간격
const REVEAL_EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/** Tailwind `md`(48rem) 미만 = 휴대폰 폭. */
const PHONE_QUERY = "(max-width: 767.98px)";

/**
 * 휴대폰 폭에서는 첫 문항도 접힌 목록으로 시작합니다(질문 11개가 한 흐름으로 보이고, 섹션 높이가 첫 답변만큼 줄어듭니다).
 * - 서버 HTML과 첫 렌더는 스펙대로 첫 문항이 열린 상태라 하이드레이션 불일치가 없고, JS가 없으면 열린 채로 읽힙니다.
 * - 해시로 FAQ에 들어왔거나 목록이 이미 화면 안(또는 위)에 있으면 눈앞의 레이아웃이 밀리지 않도록 건드리지 않습니다.
 * - React state 없이 네이티브 details의 open만 바꿉니다(이 컴포넌트는 다시 렌더할 state가 없어 React가 되돌리지 않습니다).
 */
function collapseFirstOnPhone(list: HTMLElement) {
  if (!window.matchMedia(PHONE_QUERY).matches) return;
  if (window.location.hash.startsWith("#faq")) return;
  if (list.getBoundingClientRect().top <= window.innerHeight) return;
  const first = list.querySelector<HTMLDetailsElement>(":scope > details");
  if (first?.open) first.open = false;
}

/** `faq-*` 문항을 열고 그 details를 돌려줍니다. React state 없이 네이티브 details의 open만 바꿉니다. */
function openFaqItem(rawId: string): HTMLDetailsElement | null {
  let id: string;
  try {
    id = decodeURIComponent(rawId);
  } catch {
    return null; // 잘못된 % 인코딩
  }
  if (!id.startsWith("faq-")) return null;
  const el = document.getElementById(id);
  if (!(el instanceof HTMLDetailsElement)) return null;
  el.open = true;
  return el;
}

/**
 * 페이지 안 링크(C8 "관련 장치: FAQ" 등)로 연 문항의 질문(summary)에 포커스를 옮겨, 스크린 리더가 도착한 질문을 읽게 합니다.
 * - 스크롤은 브라우저의 앵커 이동에 맡깁니다(preventScroll).
 * - 브라우저는 앵커 이동 중에 포커스를 정리하므로(포커스할 수 없는 대상이면 포커스를 비움) 두 프레임 뒤에 옮깁니다.
 * - 그 사이 포커스가 다른 곳으로 갔으면 건드리지 않습니다(비어 있거나 FAQ 링크에 남아 있을 때만).
 * - 포커스 링은 브라우저의 :focus-visible 판단을 따릅니다(키보드로 링크를 눌렀을 때만 보임).
 */
function focusFaqQuestion(details: HTMLDetailsElement) {
  const summary = details.querySelector<HTMLElement>(":scope > summary");
  if (!summary) return;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const active = document.activeElement;
      const settled = !active || active === document.body || active.matches('a[href^="#faq-"]');
      if (settled) summary.focus({ preventScroll: true });
    }),
  );
}

/** 새 탭 열기 등 수정 키가 붙은 클릭은 이 문서에서 앵커 이동이 일어나지 않으므로 건드리지 않습니다. */
function isPlainClick(e: MouseEvent) {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

/**
 * 열고 닫기 표식. + 가 열리면 45° 돌아 ✕ 가 됩니다(회전은 aiax.css `.aiax-faq-plus`).
 * 원은 선·면만 바뀌고(글자색 아님), 열린 문항과 마우스를 올린 문항에서 raised 면이 깔립니다.
 * 위치: summary가 baseline 정렬이므로 원은 self-start, -mt-0.5로 첫 줄(17px × leading-snug ≈ 23.4px)의 가운데에 맞춥니다.
 */
function FaqToggleIcon() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "sm:ml-1 -mt-0.5 inline-flex h-7 w-7 shrink-0 self-start items-center justify-center rounded-full",
        "border border-line text-navy transition-colors duration-300",
        "group-open/faq:bg-raised group-hover/q:bg-raised group-hover/q:border-navy/45",
      )}
    >
      <svg
        aria-hidden="true"
        className="aiax-faq-plus h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </span>
  );
}

export default function AiAxFaq() {
  const listRef = useRef<HTMLDivElement>(null);

  // 휴대폰 폭: 첫 문항 접기. 아래 행 진입 연출이 접힌 뒤의 위치로 화면 밖 행을 고르도록 먼저 실행합니다(효과는 선언 순서대로 실행).
  useEffect(() => {
    if (listRef.current) collapseFirstOnPhone(listRef.current);
  }, []);

  // 해시로 문항 열기: 첫 진입 해시 + hashchange(C8 "관련 장치: FAQ" 링크 등).
  // - 링크 클릭에서도 엽니다. 브라우저가 스크롤 목표를 잡기 전에 열려 있어야 하고, 같은 해시 링크를 다시 누르면
  //   hashchange가 일어나지 않아 접어 둔 문항이 다시 열리지 않기 때문입니다.
  // - 페이지 안 링크로 왔을 때(hashchange, 같은 해시 재클릭)만 질문으로 포커스를 옮깁니다. 첫 진입은 브라우저 기본 동작 그대로입니다.
  useEffect(() => {
    const onHashChange = () => {
      const details = openFaqItem(window.location.hash.slice(1));
      if (details) focusFaqQuestion(details);
    };
    const onClick = (e: MouseEvent) => {
      if (!isPlainClick(e) || !(e.target instanceof Element)) return;
      const link = e.target.closest<HTMLAnchorElement>('a[href^="#faq-"]');
      if (!link) return;
      const details = openFaqItem(link.hash.slice(1));
      if (details && link.hash === window.location.hash) focusFaqQuestion(details);
    };
    openFaqItem(window.location.hash.slice(1));
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // 행 진입 연출: 정적 HTML·JS 비활성·동작 줄이기에서는 아무것도 숨기지 않으므로 FAQ 본문은 항상 읽힙니다.
  // 이미 화면 안(또는 위)에 있는 행은 건드리지 않습니다(해시로 바로 들어온 문항이 깜빡이지 않게).
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fold = window.innerHeight;
    const rows = Array.from(list.querySelectorAll<HTMLDetailsElement>(":scope > details")).filter(
      (el) => el.getBoundingClientRect().top > fold,
    );
    if (rows.length === 0) return;

    rows.forEach((el) => el.setAttribute(AWAIT_ATTR, ""));
    const io = new IntersectionObserver(
      (entries, observer) => {
        let n = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty(DELAY_VAR, `${n * REVEAL_STAGGER_MS}ms`);
          n += 1;
          el.removeAttribute(AWAIT_ATTR);
          observer.unobserve(el);
        }
      },
      { rootMargin: REVEAL_ROOT_MARGIN },
    );
    rows.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      rows.forEach((el) => {
        el.removeAttribute(AWAIT_ATTR);
        el.style.removeProperty(DELAY_VAR);
      });
    };
  }, []);

  return (
    <section
      id={AIAX_ID.faq}
      aria-labelledby={TITLE_ID}
      className="aiax-faq relative py-12 md:py-24 px-6 overflow-x-clip scroll-mt-32"
    >
      {/* 휴대폰 폭은 위아래 여백·머리와 목록 간격을 한 단계씩 줄입니다(py-12, gap-8). md 이상은 스펙 그대로. */}
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-8 md:gap-10 lg:gap-12">
        {/* 왼쪽: 데스크톱에서 질문 목록을 따라 내려오는 머리 */}
        <div className="lg:sticky lg:top-36 self-start">
          <SectionHeader eyebrow={FAQ.eyebrow} title={FAQ.title} lead={FAQ.lead} titleId={TITLE_ID} />
          <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} variants={askIn}>
            {/* 터치 높이 44px. mt-3 + 위아래 여백으로 리드와의 시각 간격은 약 24px(spec mt-6)입니다(휴대폰 폭은 mt-2로 약 20px). */}
            <Link
              href="/contact"
              className="group/ask mt-2 sm:mt-3 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-navy underline-offset-4 hover:underline"
            >
              {FAQ.ask}
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/ask:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* 오른쪽: 네이티브 details 목록. 화면 문구 = JSON-LD 문구(AIAX_FAQ 하나에서). */}
        <div ref={listRef} className="border-t border-line">
          {AIAX_FAQ.map((f, i) => (
            <details
              key={f.id}
              id={f.id}
              open={i === 0}
              className={cn(
                "group/faq border-b border-line scroll-mt-32",
                // 행 진입: 앵커 대상이라 불투명도만 바뀝니다(data-await를 뗄 때). 감소 모션에서는 높이 전환(aiax.css ::details-content)까지 끔
                "transition-opacity duration-[600ms] delay-(--aiax-faq-delay) data-[await]:opacity-0",
                REVEAL_EASE,
                "motion-reduce:transition-none motion-reduce:details-content:transition-none!",
                "print:opacity-100",
              )}
            >
              {/* Q 번호와 질문은 첫 줄 글자선(baseline)에 맞춥니다.
                  답변 들여쓰기 sm:pl-12 = Q 칸 w-9(36) + gap-3(12) → 질문 글자와 같은 세로선.
                  sm:pr-11 = gap-3(12) + ml-1(4) + 아이콘 원 w-7(28) → 답변 오른쪽 끝도 질문과 같은 세로선.
                  휴대폰 폭(sm 미만)은 Q 칸 w-8(12px 모노 4자 + 자간 0.04em ≈ 31px)·gap-2.5·아이콘 여백 0으로 질문 폭을 넓혀
                  줄바꿈을 줄이고, 행 위아래 여백을 py-4로 줄입니다(터치 높이 56px은 min-h로 유지). 답변은 이 폭에서 들여쓰지 않습니다. */}
              <summary
                className={cn(
                  "group/q flex items-baseline gap-2.5 sm:gap-3 py-4 md:py-5 min-h-[56px] rounded-[6px]",
                  // 행 진입의 떠오름(16px)은 summary가 맡습니다(details는 앵커 대상이라 움직이지 않음).
                  "transition-[translate] duration-[600ms] delay-(--aiax-faq-delay) group-data-[await]/faq:translate-y-4",
                  REVEAL_EASE,
                  "motion-reduce:transition-none print:translate-y-0",
                )}
              >
                <span
                  className="w-8 sm:w-9 shrink-0 text-[12px] font-bold tracking-[0.04em] sm:tracking-[0.12em] text-body transition-colors duration-300 group-open/faq:text-navy"
                  style={MONO}
                >
                  Q.{String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="min-w-0 flex-1 text-[17px] font-semibold text-ink leading-snug">{f.q}</h3>
                <FaqToggleIcon />
              </summary>
              {/* 열린 상태가 기본(불투명)이라 JS·전환 미지원에서도 열린 답변은 항상 보입니다.
                  열릴 때 높이 전환을 따라 살짝 내려앉으며 나타나고(@starting-style이 첫 스타일의 출발점), 닫힐 때 함께 사라집니다. */}
              <p
                className={cn(
                  "pb-5 md:pb-6 pl-0 sm:pl-12 sm:pr-11 card-body text-body",
                  "transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  "group-not-open/faq:opacity-0 group-not-open/faq:-translate-y-1.5 starting:opacity-0 starting:-translate-y-1.5",
                )}
              >
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

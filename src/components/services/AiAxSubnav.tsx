"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowIcon, EASE, PRIMARY_STYLE, SUBNAV_ITEMS, cn } from "./aiax/shared";
import { observeSubnavActive } from "./aiax/subnav-band";
import { observeSubnavEdges } from "./aiax/subnav-edges";
import "./aiax/subnav.css";

/* ─────────── 문구 ─────────── */
const SUBNAV = {
  navLabel: "AI · AX 페이지 목차",
  cta: "상담하기",
  ctaHref: "/contact",
} as const;

/** 칩 줄이 넘치지 않는다고 볼 허용 오차(px, 소수점 폭 대비). */
const FIT_EPS = 2;

export default function AiAxSubnav() {
  const [active, setActive] = useState("");
  const listRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();

  // ① 현재 위치 판정(화면 45–50% 띠, 히어로·CTA에서는 해제, 앵커 이동 중에는 목적지 고정) — aiax/subnav-band.ts
  useEffect(() => observeSubnavActive(setActive), []);

  // ② 활성 칩을 칩 줄 가운데로, 가로로만 스크롤합니다(scrollIntoView는 세로로도 움직일 수 있어 쓰지 않음).
  //    칩의 offsetParent는 칩 줄이 아니라 sticky nav이므로 offsetLeft 대신 사각형 차이로 계산합니다.
  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollWidth - list.clientWidth <= FIT_EPS) return;
    let left = 0; // 히어로로 돌아가면(활성 없음) 칩 줄도 처음으로
    if (active) {
      const chip = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (!chip) return;
      const lr = list.getBoundingClientRect();
      const cr = chip.getBoundingClientRect();
      left = list.scrollLeft + (cr.left - lr.left - list.clientLeft) - (list.clientWidth - cr.width) / 2;
    }
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  // ③ 칩 줄 양 끝 페이드는 그쪽으로 더 볼 칩이 있을 때만 — aiax/subnav-edges.ts가 data-subnav-fade를 붙입니다(state 없음).
  useEffect(() => observeSubnavEdges(listRef.current), []);

  return (
    <nav aria-label={SUBNAV.navLabel} className="aiax-subnav aiax-subnav-bar sticky top-16 z-30 border-y border-line">
      {/* 섹션과 같은 격자(px-6 > max-w-6xl): 첫 칩 글자 = 본문 왼쪽 끝, 상담 버튼 오른쪽 끝 = 본문 오른쪽 끝 */}
      <div className="px-6">
        <div className="max-w-6xl mx-auto h-12 flex items-center gap-3">
          {/* 칩 줄은 좌우 여백까지 번져(-ml-6, lg 미만은 -mr-6도) 화면 끝까지 스크롤되고,
              앞쪽은 안쪽 여백 10px + 칩 패딩 14px = 24px로 첫 칩 글자를 본문 격자에 맞춥니다.
              lg 미만의 끝쪽은 여백 대신 칩 간격 4px + 20px 스페이서(::after, aiax/subnav.css) = 24px를 두어,
              끝까지 밀었을 때 마지막 칩(FAQ)의 알약이 화면 끝 16px 페이드 구간 밖, 본문 오른쪽 격자에 놓입니다
              (끝쪽 padding은 브라우저마다 스크롤 범위에 넣는 방식이 달라 스페이서로 고정).
              양 끝 16px 페이드는 더 볼 칩이 남은 쪽에만 그립니다(aiax/subnav.css).
              배경·블러와 페이지 스크롤 여백(포커스가 바 아래에 가려지지 않게)도 aiax/subnav.css에 있습니다. */}
          <motion.ul
            layoutScroll
            ref={listRef}
            className="aiax-subnav-scroll aiax-noscrollbar flex-1 min-w-0 -ml-6 -mr-6 lg:mr-0 flex items-center gap-1 overflow-x-auto overscroll-x-contain scroll-px-6 py-1 pl-[10px] pr-0 lg:pr-[10px]"
          >
            {SUBNAV_ITEMS.map((it) => {
              const isActive = active === it.id;
              return (
                <li key={it.id} className="shrink-0">
                  <a
                    href={`#${it.id}`}
                    data-id={it.id}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "aiax-focus-inset relative inline-flex items-center h-10 sm:h-9 px-3.5 rounded-full text-[14px] sm:text-[13px] font-semibold whitespace-nowrap transition-colors duration-200",
                      isActive ? "text-ink" : "text-body hover:text-ink hover:bg-raised",
                    )}
                    style={isActive ? { backgroundColor: "var(--aiax-tint-ai)" } : undefined}
                  >
                    {it.label}
                    {isActive && (
                      <motion.span
                        layoutId="aiax-subnav-active"
                        aria-hidden="true"
                        className="absolute left-3 right-3 bottom-1 h-0.5 rounded-full"
                        style={{ background: "var(--aiax-ai)" }}
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </motion.ul>
          <Link
            href={SUBNAV.ctaHref}
            className="group hidden lg:inline-flex shrink-0 items-center gap-1.5 h-9 pl-4 pr-3.5 rounded-full text-[13px] font-bold whitespace-nowrap"
            style={{ ...PRIMARY_STYLE, boxShadow: "none" }}
          >
            {SUBNAV.cta}
            <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

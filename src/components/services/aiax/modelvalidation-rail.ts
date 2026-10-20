"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   C6A(모델 검증) 전용 — md 미만 가로 스크롤 스냅 줄(레일)
   - 이 섹션의 레일은 공급 단계(01–08) 하나뿐입니다. 후보·운영 항목은 세로 목록으로 바꿨습니다(레일 남용 방지).
   - 다음 카드가 살짝 보이도록(peek) 카드 폭은 사용처에서 % 로 정합니다.
   - 네이티브 스크롤바는 숨기고(aiax-noscrollbar + modelvalidation.css), 위치는 단계 점으로 알립니다.
   - md 이상에서는 사용처가 grid로 되돌립니다(overflow-visible).
   ═══════════════════════════════════════════════════════════ */

/** 레일 공통 클래스. 끝에 닿아도 페이지·뒤로 가기 제스처로 번지지 않게 합니다. */
export const MV_RAIL =
  "flex gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory aiax-noscrollbar aiax-modelvalidation-rail md:overflow-visible";

/**
 * 요소가 실제로 가로로 넘칠 때만 true.
 * 안에 조작 요소가 없는 레일은 키보드로 스크롤할 수 있도록 tabIndex=0이 필요하지만,
 * 넘치지 않는 폭(md 이상 격자)에서는 쓸모없는 탭 정지가 되므로 넘칠 때만 켭니다.
 * 첫 렌더는 서버·클라이언트 모두 false(하이드레이션 일치), 측정은 ResizeObserver 콜백에서만 합니다
 * (observe 직후 첫 콜백이 한 번 오므로 effect 안에서 동기 setState를 하지 않습니다).
 */
export function useOverflowX<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setOverflow(el.scrollWidth > el.clientWidth + 1));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, overflow];
}

/** 레일 안 항목이 스냅될 때의 scrollLeft(스냅 여백 scroll-padding-left를 뺀 값). */
function snapLeft(track: HTMLElement, item: HTMLElement) {
  const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
  return item.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft - pad;
}

/** 지금 스냅 위치에 가장 가까운 항목(끝까지 넘겼으면 마지막 항목). 넘치지 않으면(md 이상) 0. */
function nearestIndex(track: HTMLElement) {
  const items = Array.from(track.children).filter((c): c is HTMLElement => c instanceof HTMLElement);
  const max = track.scrollWidth - track.clientWidth;
  if (items.length === 0 || max <= 0) return 0;
  if (track.scrollLeft >= max - 2) return items.length - 1;
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  items.forEach((item, i) => {
    const d = Math.abs(snapLeft(track, item) - track.scrollLeft);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

/**
 * 레일 위치: 지금 스냅된 항목(단계 점의 aria-current)과 항목으로 넘기기.
 * 첫 렌더는 0(서버와 같음). 갱신은 스크롤 이벤트 콜백(rAF)에서만 합니다.
 */
export function useRailIndex(ref: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActive(nearestIndex(track)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  const goTo = useCallback(
    (i: number) => {
      const track = ref.current;
      const item = track?.children[i];
      if (!track || !(item instanceof HTMLElement)) return;
      track.scrollTo({ left: snapLeft(track, item), behavior: reduce ? "auto" : "smooth" });
    },
    [ref, reduce],
  );

  return { active, goTo };
}

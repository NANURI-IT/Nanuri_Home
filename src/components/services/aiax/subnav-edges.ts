/* ═══════════════════════════════════════════════════════════
   AI · AX 서브내비(C2) — 칩 줄 양 끝 페이드 판정 (React 없는 순수 DOM 로직)
   - 칩 줄이 가로로 넘칠 때, 그쪽으로 더 볼 칩이 남은 끝에만 페이드를 그리도록
     칩 줄에 data-subnav-fade="none | end | start | both"를 붙입니다(스타일은 aiax/subnav.css).
   - React state를 쓰지 않습니다. 스크롤마다 서브내비 전체를 다시 그리지 않기 위해서이며,
     이 속성은 React가 관리하지 않으므로 다시 그려도 지워지지 않습니다.
   - 서버 HTML에는 속성이 없고(aiax.css 기본 페이드), 하이드레이션 뒤 effect에서만 붙습니다.
   ═══════════════════════════════════════════════════════════ */

export type SubnavFade = "none" | "end" | "start" | "both";

/** 처음/끝에 닿았다고 볼 허용 오차(px, 소수점 scrollLeft 대비). */
const EDGE_EPS = 2;

function fadeOf(list: HTMLElement): SubnavFade {
  const max = list.scrollWidth - list.clientWidth;
  if (max <= EDGE_EPS) return "none";
  const atStart = list.scrollLeft <= EDGE_EPS;
  const atEnd = list.scrollLeft >= max - EDGE_EPS;
  if (atStart) return "end";
  if (atEnd) return "start";
  return "both";
}

/**
 * 칩 줄의 스크롤 위치·크기 변화를 따라 `data-subnav-fade`를 갱신합니다. 정리 함수를 돌려줍니다.
 * 스크롤 이벤트는 프레임당 한 번만 계산합니다.
 */
export function observeSubnavEdges(list: HTMLElement | null): () => void {
  if (!list || typeof window === "undefined") return () => {};

  let frame = 0;
  function update() {
    frame = 0;
    if (!list) return;
    const fade = fadeOf(list);
    if (list.dataset.subnavFade !== fade) list.dataset.subnavFade = fade;
  }
  function schedule() {
    if (frame === 0) frame = window.requestAnimationFrame(update);
  }

  update();
  list.addEventListener("scroll", schedule, { passive: true });

  // 칩 줄 폭(화면 회전·리사이즈)과 칩 폭(웹폰트 로드) 변화 모두 넘침 여부를 바꿉니다.
  let ro: ResizeObserver | null = null;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(schedule);
    ro.observe(list);
    for (const child of Array.from(list.children)) ro.observe(child);
  } else {
    window.addEventListener("resize", schedule);
  }

  return () => {
    list.removeEventListener("scroll", schedule);
    ro?.disconnect();
    window.removeEventListener("resize", schedule);
    if (frame !== 0) window.cancelAnimationFrame(frame);
    delete list.dataset.subnavFade;
  };
}

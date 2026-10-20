/* ═══════════════════════════════════════════════════════════
   AI · AX 서브내비(C2) — 현재 위치 판정 (React 없는 순수 DOM 로직)
   - 화면 세로 45%–50% 띠에 걸린 섹션을 현재 위치로 봅니다.
   - 히어로(aiax-top)나 마지막 CTA(start)가 띠에 걸리면 활성을 해제("")합니다. 둘 다 목차 밖 구간이라
     어느 칩도 현재 위치로 표시하지 않습니다(CTA를 보는 동안 마지막 칩이 켜져 있지 않게).
   - 띠가 비면(푸터, End 키 같은 순간 이동) 띠 아래 경계보다 위에서 시작한 마지막 대상을 현재 위치로 봅니다.
   - 같은 페이지 #앵커를 누르면(서브내비 칩, 원장 셀, 근거 칩 등) 목적지 섹션을 바로 활성으로 알리고,
     스크롤이 멎을 때까지 관찰 결과를 보류합니다. 활성 막대가 지나가는 칩마다 멈칫거리지 않고
     목적지로 한 번에 이동하며, 이동이 끝나면 실제로 띠에 걸린 섹션으로 맞춥니다.
   ═══════════════════════════════════════════════════════════ */

import { AIAX_ID, SUBNAV_ITEMS } from "./shared";

const BAND: IntersectionObserverInit = { rootMargin: "-45% 0px -50% 0px", threshold: 0 };
/** 띠 아래 경계(화면 높이 대비). BAND rootMargin의 아래쪽 -50%와 같은 값입니다. */
const BAND_BOTTOM = 0.5;

/** 띠에 걸리면 활성을 해제하는 대상: 히어로와 마지막 CTA(둘 다 목차 밖 구간). */
const CLEAR_IDS: ReadonlySet<string> = new Set<string>([AIAX_ID.top, AIAX_ID.cta]);
/** 관찰 대상: 히어로 + 목차 항목 + CTA. 배열 순서 = 문서 순서. */
const WATCH_IDS: readonly string[] = [AIAX_ID.top, ...SUBNAV_ITEMS.map((it) => it.id), AIAX_ID.cta];
const WATCH_ORDER: ReadonlyMap<string, number> = new Map(WATCH_IDS.map((id, i) => [id, i] as const));

/** 마지막 scroll 이벤트 뒤 이만큼 조용하면 앵커 이동이 끝난 것으로 봅니다. */
const SCROLL_IDLE_MS = 160;
/** 앵커를 눌렀는데 스크롤이 일어나지 않는 경우(이미 그 위치)의 보류 해제 시간. */
const SCROLL_START_MS = 320;

function toActive(id: string): string {
  return CLEAR_IDS.has(id) ? "" : id;
}

/** 띠에 두 섹션이 함께 걸리면 문서에서 뒤쪽(띠 아래 경계를 넘어온) 섹션을 고릅니다. */
function pickInBand(inBand: ReadonlySet<string>): string | null {
  let pick: string | null = null;
  let rank = -1;
  for (const id of inBand) {
    const r = WATCH_ORDER.get(id) ?? -1;
    if (r > rank) {
      rank = r;
      pick = id;
    }
  }
  return pick;
}

/**
 * 띠가 비었을 때의 현재 위치: 띠 아래 경계보다 위에서 시작한 마지막 관찰 대상(문서 순서).
 * 레이아웃을 읽으므로 띠가 비었을 때만 부릅니다.
 */
function lastStartedAbove(targets: readonly HTMLElement[]): string | null {
  const line = window.innerHeight * BAND_BOTTOM;
  let pick: string | null = null;
  for (const el of targets) {
    if (el.getBoundingClientRect().top <= line) pick = el.id;
  }
  return pick;
}

/** 앵커 목적지를 품은 관찰 대상(섹션)의 id. 없으면(관찰 대상 밖, 예: 푸터) null. */
function watchedAncestor(target: HTMLElement): string | null {
  for (let el: HTMLElement | null = target; el; el = el.parentElement) {
    if (WATCH_ORDER.has(el.id)) return el.id;
  }
  return null;
}

/**
 * 현재 위치를 관찰해 `onChange(id)`로 알립니다(히어로·위치 없음은 ""). 정리 함수를 돌려줍니다.
 * `onChange`는 IntersectionObserver·클릭·타이머 콜백 안에서만 불립니다(effect 본문 동기 호출 없음).
 */
export function observeSubnavActive(onChange: (id: string) => void): () => void {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return () => {};
  const targets = WATCH_IDS.map((id) => document.getElementById(id)).filter(
    (el): el is HTMLElement => el !== null,
  );
  if (targets.length === 0) return () => {};

  const inBand = new Set<string>();
  let held = false;
  let timer: number | undefined;

  /** 띠에 걸린 대상, 띠가 비었으면 띠 위에서 시작한 마지막 대상. */
  function current(): string | null {
    return pickInBand(inBand) ?? lastStartedAbove(targets);
  }
  function commit(id: string | null) {
    if (id !== null) onChange(toActive(id));
  }
  function release() {
    held = false;
    window.removeEventListener("scroll", onScroll);
    commit(current());
  }
  function arm(ms: number) {
    window.clearTimeout(timer);
    timer = window.setTimeout(release, ms);
  }
  function onScroll() {
    arm(SCROLL_IDLE_MS);
  }
  function onClick(e: MouseEvent) {
    // 새 탭 열기·다른 스크립트가 막은 클릭은 이동이 아니므로 건드리지 않습니다.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    const hash = link?.getAttribute("href")?.slice(1);
    if (!hash) return;
    let target: HTMLElement | null = null;
    try {
      target = document.getElementById(decodeURIComponent(hash));
    } catch {
      return;
    }
    if (!target) return;
    commit(watchedAncestor(target));
    if (!held) {
      held = true;
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    arm(SCROLL_START_MS);
  }

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const id = (entry.target as HTMLElement).id;
      if (entry.isIntersecting) inBand.add(id);
      else inBand.delete(id);
    }
    if (!held) commit(current());
  }, BAND);
  targets.forEach((el) => io.observe(el));
  document.addEventListener("click", onClick);

  return () => {
    io.disconnect();
    document.removeEventListener("click", onClick);
    window.removeEventListener("scroll", onScroll);
    window.clearTimeout(timer);
  };
}

"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment, useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";
import {
  AIAX_ID,
  ArrowIcon,
  EASE,
  cn,
  EvidenceChip,
  MONO,
  RoleGlyph,
  STATUS_DEFINITION,
  STATUS_LABEL,
  SectionHeader,
  StatusBadge,
  StatusMark,
  VIEWPORT,
  VIEWPORT_GRID,
  fadeUp,
  fadeUpSm,
  stagger,
  type CaseStatus,
} from "@/components/services/aiax/shared";
import "./aiax/services.css";

/* ═══════════ 문구 (명세 C9 그대로) ═══════════ */
const SVC = {
  eyebrow: "06 · SERVICES",
  title: "서비스는 사내에서 검증한 방식에서 출발합니다",
  lead: "앞의 사례에서 직접 써 본 방식을 귀사의 환경과 규칙에 맞춰 적용합니다. 서비스마다 어떤 상황에 맞는지, 무엇을 받으시는지, 어디서 사람이 승인하는지, 어떤 사례에 근거하는지 함께 밝힙니다.",
  labels: { situation: "이런 상황이라면", does: "하는 일", outputs: "산출물", gate: "사람이 승인하는 지점", evidence: "근거", note: "비고" },
  domainTitle: "AI를 붙일 자리는 업무를 아는 팀이 고릅니다",
  domainBody: "나누리아이티가 구축해 온 금융 업무 영역입니다. 각 영역의 업무 흐름을 알기에, AI가 도울 단계와 사람이 판단해야 할 단계를 구분할 수 있습니다.",
  proposalTitle: "이런 업무에도 AI를 붙일 수 있습니다",
  proposalAi: "AI가 하는 일",
  proposalHuman: "사람이 판단하는 일",
} as const;

const ENTRY = {
  id: "track-roadmap",
  tag: "START HERE · AX ROADMAP",
  title: "처음이라면, 진단부터 시작합니다",
  name: "AX 진단·로드맵",
  situation: "경영진은 AI 계획을 묻는데, 어떤 업무부터 해야 할지 근거가 없습니다.",
  does: "업무 인터뷰로 AI 적용 후보를 찾고, 효과와 위험, 데이터 준비도, 금융분야 인공지능 가이드라인 7대 원칙과의 정합성을 기준으로 우선순위를 정합니다.",
  outputs: ["적용 후보와 우선순위", "원칙별 점검표", "성공 기준이 담긴 PoC 계획서"],
  gate: "우선순위 확정 · PoC 착수 여부",
  evidenceText: "근거는 사례가 아니라 업무 지식입니다. 나누리아이티가 구축해 온 금융 업무 영역을 바탕으로, AI가 도울 단계와 사람이 판단할 단계를 구분합니다.",
};

const SERVICES = [
  {
    key: "dev", kicker: "AI-NATIVE DELIVERY", icon: "branch",
    name: "AI 네이티브 개발 (SI·SM)",
    oneLine: "금융 시스템 구축과 고도화, 유지보수에 명세–테스트–자동 검증–사람 승인 방식을 적용합니다. 귀사 환경에서의 효과는 PoC에서 성공 기준을 정해 확인합니다.",
    situation: "개발·변경 요청은 쌓이는데, 일정과 인력은 그대로입니다.",
    does: "명세 정본화, 테스트 우선 개발, 역할별 에이전트를 활용한 구현과 검증, 자동 품질 게이트 운영",
    outputs: "명세 문서 · 테스트 코드 · 검증 기록 · 변경 이력",
    gate: "명세 확정 · 머지 · 운영 반영",
    evidence: [
      { label: "개발 방식", href: "#pipeline", status: "live" as const },
      { label: "CASE 01 profileManager", href: "#assistant", status: "live" as const },
    ],
    link: { label: "금융 SI 살펴보기", href: "/services/financial-si" },
  },
  {
    key: "enable", kicker: "AI ENGINEERING ENABLEMENT", icon: "checklist",
    name: "AI 개발 체계 도입 지원",
    oneLine: "귀사 개발 조직이 AI 코딩 에이전트를 통제된 방식으로 쓸 수 있도록 규칙과 게이트를 함께 설계합니다.",
    situation: "개발자들은 AI 코딩 도구를 쓰고 싶어 하지만, 무엇을 허용하고 무엇을 막을지 기준이 없습니다.",
    does: "개발 규칙 문서와 표준 컴포넌트 매핑 설계, CI 품질 게이트 구성, 지정한 개인정보 패턴이 감지되면 에이전트의 파일 쓰기와 커밋을 멈추는 보호 장치 설계, 승인 절차 정의, 보안성 검토 대응 지원",
    outputs: "개발 규칙 문서 · 게이트 구성 · 승인 절차서",
    gate: "규칙 제정과 개정 · 예외 허용 · 에이전트 권한 범위",
    evidence: [
      { label: "개발 방식", href: "#pipeline", status: "live" as const },
    ],
  },
  {
    key: "agent", kicker: "ON-PREMISE AI AGENT", icon: "server",
    name: "업무 AI 에이전트 구축",
    oneLine: "귀사 망 안에서 운영하는 LLM 에이전트가 업무 데이터를 근거와 함께 조회하도록 설계합니다.",
    situation: "데이터를 묻고 답을 받고 싶지만, 업무 데이터를 외부로 보내는 구성은 검토하기 어렵습니다.",
    does: "모델 출처·리비전 고정과 용도별 라이선스 검토, 사전 기준에 따른 모델 검증, 업무용 의미 뷰와 읽기 전용 도구 설계, SQL 검증기와 DB 권한의 이중 방어, 장애 시 규칙 기반 모드 구성",
    outputs: "데이터 경계·권한 설계서 · 도구 권한 정책 · 모델 채택 기준과 판정 기록 · 단계별 처리 로그 · 축소 운영 절차",
    gate: "모델 채택 · AI에 열어 줄 데이터 범위 · 역할별 허용 도구",
    evidence: [
      { label: "CASE 01 profileManager", href: "#assistant", status: "live" as const },
      { label: "모델 검증 기록", href: "#llm-validation", status: "record" as const }, // 2차 보강(검토 반영: 분석 에이전트 검증으로 읽히지 않게 "모델")
    ],
  },
  {
    key: "idp", kicker: "DOCUMENT AI", icon: "doc",
    name: "문서 AI(IDP) 구축",
    oneLine: "금융 서류에서 핵심 항목을 추출하고, 원문 근거와 규칙 기반 매핑, 담당자 검토를 한 화면에서 처리하도록 설계합니다.",
    situation: "서류를 읽고, 옮겨 적고, 다시 대조하는 일에 담당자의 하루가 묶여 있습니다.",
    does: "추출 항목 정의, 문서 AI(IDP) 엔진 적용, 근거 하이라이트 화면, 공통코드 매핑 규칙, 검토 필요 처리 흐름 설계",
    outputs: "추출 항목 정의서 · 근거 대조 화면 · 매핑 규칙 · 검토 이력",
    gate: "검토 필요 항목 확정 · 최종 등록",
    evidence: [{ label: "CASE 03 IBIMS AI deal 자동추출", href: "#case-idp", status: "poc" as const }],
    note: "배포 방식은 귀사의 망 정책과 보안성 검토 결과에 맞춰 함께 정합니다.",
    link: { label: "IB 시스템(IBIMS) 살펴보기", href: "/services/ibims" },
  },
] as const;

const DOMAINS = [
  { label: "금융 SI", href: "/services/financial-si" },
  { label: "IB 시스템", href: "/services/ibims" },
  { label: "고유자산", href: "/services/proprietary" },
  { label: "토큰증권", href: "/services/sto" },
  { label: "회계 서비스", href: "/services/accounting" },
  { label: "채널 서비스", href: "/services/channel" },
] as const;

const PROPOSALS = [
  {
    domain: "회계 서비스", title: "증빙에서 전표 후보 만들기",
    body: "증빙 문서에서 거래처·금액·일자를 추출해 전표 후보를 만들 수 있습니다.",
    ai: "항목 추출과 원문 위치 표시 (계정 매핑은 규칙 엔진)",
    human: "계정 확정과 전기 승인",
  },
  {
    domain: "고유자산", title: "포지션·한도 현황 질의",
    body: "포지션과 한도 사용 현황을 자연어로 묻고, 근거와 함께 답을 받을 수 있습니다.",
    ai: "질문을 읽기 전용 조회로 바꾸기 (집계는 검증된 도구로)",
    human: "한도 판단과 조치 결정",
  },
  {
    domain: "채널 서비스", title: "직원용 응대 문안 초안",
    body: "상품·업무 규정 문서에서 관련 조항을 찾아 직원용 응대 문안 초안을 만들 수 있습니다.",
    ai: "조항 검색과 근거를 붙인 초안 작성",
    human: "고객 안내 전 검토 · 고객에게 직접 닿는 기능이면 AI 이용 고지를 함께 설계",
  },
] as const;

/** 근거 칩 표식 범례(이 섹션의 칩이 쓰는 상태만, 칩 순서와 무관하게 상태 정의 순서). */
const EVIDENCE_LEGEND: ReadonlyArray<CaseStatus> = ["live", "poc", "record"];
const EVIDENCE_LEGEND_LABEL = "근거 사례의 상태";

/** lg 미만 펼쳐 보기 버튼 이름(새 UI 문구 — 본문 문구는 그대로 두고, 접힌 정보의 라벨을 그대로 씁니다). */
const MORE = {
  service: `${SVC.labels.does}·${SVC.labels.outputs}`,
  entry: `${SVC.labels.does}·${SVC.labels.outputs}·${SVC.labels.evidence}`,
  open: "보기",
  close: "접기",
} as const;
/** 모바일 가로 레일 안내(스크린 리더 전용)와 위치 점 묶음 이름. 레일은 서비스 카드 4장에만 씁니다. */
const RAIL = {
  hintId: "aiax-svc-rail-hint",
  hint: "가로로 넘기면 다음 카드를 볼 수 있습니다.",
  servicesId: "aiax-svc-rail",
  servicesLabel: "서비스 목록",
  servicesDots: "서비스 카드 바로 가기",
} as const;

/* ═══════════ 타입 ═══════════ */
type Service = (typeof SERVICES)[number];
type IconKind = "route" | Service["icon"];
type Evidence = { readonly label: string; readonly href?: string; readonly status: CaseStatus };

/* ═══════════ 모션 (섹션 전용) ═══════════ */
/** 산출물 막대: 왼쪽에서 자라남(transform이라 MotionConfig가 동작 줄이기에서 자동으로 끔). */
const BAR_GROW: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.55, ease: EASE } },
};
/** 제안 목록 항목: 투명도만(점선 상자 안에서 항목이 위아래로 움직여 테두리를 넘지 않게). */
const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

/* ═══════════ 하이드레이션 여부 ═══════════ */
/**
 * 서버 렌더와 하이드레이션 첫 렌더는 false, 그 뒤 true.
 * 펼쳐 보기는 JS가 동작할 때만 접습니다 — JS가 없으면 버튼 없이 모든 정보가 펼쳐진 채로 보입니다.
 */
const subscribeNoop = () => () => {};
function useHydrated() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

/* ═══════════ 모바일 가로 레일 (md 미만, services.css) ═══════════ */
/**
 * md 미만에서만 카드 목록이 가로 스냅 레일이 됩니다(레이아웃은 CSS가 정하고, 이 값은 접근성 속성에만 씁니다).
 * 서버 스냅샷은 false라서 하이드레이션 첫 렌더는 서버와 같고, 그 뒤 클라이언트 값으로 다시 렌더합니다.
 */
const RAIL_MQ = "(width < 48rem)";
function subscribeRail(onChange: () => void) {
  const mql = window.matchMedia(RAIL_MQ);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getRail = () => window.matchMedia(RAIL_MQ).matches;
const getRailServer = () => false;

/** 레일 안 항목이 스냅될 때의 scrollLeft(스냅 여백 scroll-padding-left를 뺀 값). */
function snapLeft(track: HTMLElement, item: HTMLElement) {
  const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
  return item.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft - pad;
}
/** 지금 스냅 위치에 가장 가까운 항목(끝까지 넘겼으면 마지막 항목). */
function nearestIndex(track: HTMLElement) {
  const items = Array.from(track.children).filter((c): c is HTMLElement => c instanceof HTMLElement);
  const max = track.scrollWidth - track.clientWidth;
  if (items.length === 0 || max <= 0) return 0; // 레일이 아닐 때(md 이상)는 넘길 곳이 없음
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

/** 레일 상태: 지금 보이는 카드(위치 점), 레일 여부(접근성 속성), 카드로 넘기기. 트랙 ref는 호출하는 쪽이 만듭니다. */
function useRail(ref: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const isRail = useSyncExternalStore(subscribeRail, getRail, getRailServer);

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

  const goTo = (i: number) => {
    const track = ref.current;
    const item = track?.children[i];
    if (!track || !(item instanceof HTMLElement)) return;
    track.scrollTo({ left: snapLeft(track, item), behavior: reduce ? "auto" : "smooth" });
  };

  return { active, isRail, goTo };
}

/** 레일 위치 점(md 미만). 누르면 그 카드로 넘깁니다. 점 하나의 누름 영역은 24px. */
function RailDots({
  labels,
  active,
  railId,
  groupLabel,
  onSelect,
}: {
  labels: ReadonlyArray<string>;
  active: number;
  railId: string;
  groupLabel: string;
  onSelect: (i: number) => void;
}) {
  return (
    <div role="group" aria-label={groupLabel} className="md:hidden mt-1 flex items-center justify-center gap-0.5">
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          aria-controls={railId}
          aria-current={i === active ? "true" : undefined}
          onClick={() => onSelect(i)}
          className="aiax-services-dot grid place-items-center w-6 h-6 rounded-full"
        >
          <span aria-hidden="true" className="aiax-services-dot-mark" />
        </button>
      ))}
    </div>
  );
}

/**
 * 펼쳐 보기 버튼(lg 미만 — 모바일과 태블릿). lg 이상에서는 숨김이고 그 폭에서는 모든 정보가 항상 보입니다.
 * 하이드레이션 뒤에만 렌더합니다(JS가 없으면 정보가 펼쳐진 채라 버튼이 필요 없음).
 */
function MoreToggle({
  open,
  onToggle,
  controls,
  label,
  name,
  className,
}: {
  open: boolean;
  onToggle: () => void;
  controls: string;
  label: string;
  name: string;
  className?: string;
}) {
  const text = `${label} ${open ? MORE.close : MORE.open}`;
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      aria-label={`${text}: ${name}`}
      onClick={onToggle}
      className={cn(
        "lg:hidden self-start inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-line text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-[var(--color-raised)]",
        className,
      )}
    >
      {text}
      <ArrowIcon
        direction="down"
        className={cn("w-3.5 h-3.5 text-navy transition-transform duration-300", open && "rotate-180")}
      />
    </button>
  );
}

/* ═══════════ 보조 컴포넌트 (모듈 최상위, A10) ═══════════ */
function ServiceIcon({ kind }: { kind: IconKind }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "route" && (
        <>
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="6" r="2" />
          <path d="M7 18h6a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h6" />
        </>
      )}
      {kind === "branch" && (
        <>
          <circle cx="6" cy="5" r="2" />
          <circle cx="6" cy="19" r="2" />
          <circle cx="18" cy="12" r="2" />
          <path d="M6 7v10M6 10c0 2 3 2 10 2" />
        </>
      )}
      {kind === "checklist" && (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="m8 13 1.5 1.5L12 12M8 18h8" />
        </>
      )}
      {kind === "server" && (
        <>
          <rect x="2.5" y="2.5" width="19" height="19" rx="4" strokeDasharray="3 2.5" />
          <rect x="7" y="7" width="10" height="4" rx="1" />
          <rect x="7" y="13" width="10" height="4" rx="1" />
          <path d="M9.5 9h.01M9.5 15h.01" />
        </>
      )}
      {kind === "doc" && (
        <>
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h5" />
          <path d="M13 2v5h5v3" />
          <circle cx="16.5" cy="16.5" r="3.5" />
          <path d="m19 19 2.5 2.5" />
        </>
      )}
    </svg>
  );
}

/**
 * 진단 카드 전용 route 아이콘: 카드가 화면에 들어오면 출발점에서 경로가 그려지고 도착점이 나타납니다.
 * pathLength는 MotionConfig가 건너뛰지 않으므로, 동작 줄이기에서는 transition만 0으로 분기합니다(A3-3).
 */
function RouteIconDrawn() {
  const reduce = useReducedMotion();
  const draw: Variants = {
    hidden: { pathLength: 0 },
    show: { pathLength: 1, transition: reduce ? { duration: 0 } : { duration: 1.1, ease: EASE, delay: 0.35 } },
  };
  const arrive: Variants = {
    hidden: { opacity: 0, scale: 0.4 },
    show: { opacity: 1, scale: 1, transition: reduce ? { duration: 0 } : { duration: 0.45, ease: EASE, delay: 1.25 } },
  };
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="5" cy="18" r="2" />
      <motion.path d="M7 18h6a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h6" variants={draw} />
      <motion.circle cx="19" cy="6" r="2" variants={arrive} />
    </svg>
  );
}

/** 장식 아이콘 상자. 진단 카드(전폭)는 sm부터, 서비스 카드(레일 · 태블릿 2열)는 폭을 아끼려고 lg부터 보입니다. */
function IconBox({ kind, drawn, from = "sm" }: { kind: IconKind; drawn?: boolean; from?: "sm" | "lg" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "w-11 h-11 rounded-xl hidden items-center justify-center shrink-0",
        from === "sm" ? "sm:flex" : "lg:flex",
      )}
      style={{ background: "var(--aiax-tint-ai)", color: "var(--aiax-ai)" }}
    >
      {drawn && kind === "route" ? <RouteIconDrawn /> : <ServiceIcon kind={kind} />}
    </span>
  );
}

/**
 * " · "로 나열한 항목을 줄바꿈 단위로 묶습니다. 항목마다 inline-block이라 항목 중간에서 끊기지 않고
 * (한 줄보다 긴 항목만 안에서 줄바꿈), 구분점은 앞 항목 끝에 붙어 줄 머리에 "·"가 오지 않습니다.
 * 읽히는 글자는 원문과 같습니다(구분점 앞 공백만 줄바꿈 없는 공백).
 */
function DotItems({ text }: { text: string }) {
  const parts = text.split(" · ");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={part}>
          <span className="inline-block">
            {part}
            {i < parts.length - 1 && " ·"}
          </span>
          {i < parts.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}

/** 상황 인용 — 진단 카드와 서비스 카드 공통 스타일. */
function Situation({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[12px] font-bold text-body">{SVC.labels.situation}</p>
      <blockquote className="mt-1.5 border-l-2 border-line pl-4 text-[17px] sm:text-[16px] font-semibold text-ink leading-relaxed">
        “{text}”
      </blockquote>
    </div>
  );
}

/**
 * 원장형 dl 행 — 좁을 때는 라벨 위·값 아래, `wide` 폭부터 96px 라벨 열.
 * 진단 카드(전폭)는 sm부터, 서비스 카드(레일 · 태블릿 2열에서 폭이 좁음)는 lg부터 라벨 열을 둡니다.
 */
function LedgerRow({ label, wide = "sm", children }: { label: string; wide?: "sm" | "lg"; children: ReactNode }) {
  return (
    <div
      className={cn(
        "grid gap-1 py-3",
        wide === "sm"
          ? "sm:grid-cols-[96px_minmax(0,1fr)] sm:items-baseline sm:gap-4"
          : "lg:grid-cols-[96px_minmax(0,1fr)] lg:items-baseline lg:gap-4",
      )}
    >
      <dt className="text-[13px] font-semibold text-body">{label}</dt>
      <dd className="card-body text-ink min-w-0">{children}</dd>
    </div>
  );
}

/**
 * 산출물 목록 — 진단 카드와 서비스 카드 4장이 같은 모양을 씁니다(항목마다 앞에 시안 막대).
 * lg 미만은 세로 목록, lg 이상은 같은 항목을 한 줄에 이어 놓고 넘치면 다음 줄로(2열 카드의 높이를 아낌).
 * 카드가 화면에 들어오면 막대가 왼쪽에서 자라고 항목이 차례로 나타납니다(부모 variants를 이어받음).
 */
function OutputList({ items }: { items: ReadonlyArray<string> }) {
  return (
    <motion.ul
      className="flex flex-col gap-1.5 lg:flex-row lg:flex-wrap lg:gap-x-4 lg:gap-y-1"
      variants={stagger(0.1, 0.25)}
    >
      {/* 막대는 절대 위치라 항목의 기준선이 글자 첫 줄에서 잡힙니다(원장 행의 라벨과 기준선 정렬). */}
      {items.map((o) => (
        <motion.li key={o} className="relative pl-5 min-w-0 max-w-full" variants={fadeUpSm}>
          <motion.span
            aria-hidden="true"
            className="absolute left-0 top-[0.8em] w-3 h-0.5 rounded-full"
            style={{ background: "var(--aiax-ai)", originX: 0 }}
            variants={BAR_GROW}
          />
          {o}
        </motion.li>
      ))}
    </motion.ul>
  );
}

/** 사람이 승인하는 지점 — 진단 카드와 서비스 카드 4장이 같은 모양(라벨 줄 + 값 줄의 앰버 띠)을 씁니다. */
function GateCallout({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("aiax-gate-band rounded-xl px-4 py-3", className)}>
      <p className="flex items-center gap-1.5 text-[12px] font-bold text-ink">
        <RoleGlyph role="human" size={10} />
        {SVC.labels.gate}
      </p>
      <p className="mt-1 card-body text-ink">
        <DotItems text={text} />
      </p>
    </div>
  );
}

/**
 * 진단 카드(전폭, `#track-roadmap`). 저위험 진입 상품이라 서비스 카드보다 앞에, 그라데이션 테두리로 둡니다.
 * 근거는 사례가 아니라 업무 지식이므로 상태 표식 없이 "근거" 라벨만 붙입니다.
 * lg 미만: 머리 · 상황 · 승인 지점은 항상 보이고, 하는 일 · 산출물 · 근거는 펼쳐 보기로 엽니다.
 * 앵커(`#track-roadmap`)는 움직이지 않는 바깥 div에 둡니다 — 등장 모션(y 이동) 중에 착지 위치를 재면 어긋나므로.
 */
function EntryCard() {
  const titleId = "aiax-svc-entry";
  const moreLedgerId = "aiax-svc-entry-ledger";
  const moreEvidenceId = "aiax-svc-entry-evidence";
  const [open, setOpen] = useState(false);
  const collapsible = useHydrated();
  return (
    <div id={ENTRY.id} className="mt-8 md:mt-12 scroll-mt-32">
      <motion.article
        aria-labelledby={titleId}
        className="aiax-gborder rounded-3xl p-px"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_GRID}
        variants={fadeUp}
      >
        <div
          className="aiax-services-card relative aiax-frame-inner rounded-[23px] overflow-hidden"
          data-open={open ? "" : undefined}
          data-collapsible={collapsible ? "" : undefined}
        >
          {/* 장식: 오른쪽 위에서 옅어지는 점 격자(로드맵 도면 느낌). 정보 없음. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 dot-grid pointer-events-none hidden md:block"
            style={{
              maskImage: "radial-gradient(ellipse 70% 90% at right top, #000, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 90% at right top, #000, transparent 70%)",
            }}
          />
          {/*
            세 영역: A 머리·상황 / B 하는 일·산출물·승인 지점 / C 근거.
            DOM 순서(A→B→C)가 모바일 읽기 순서이고 서비스 카드의 필드 순서와 같습니다.
            lg에서는 A가 왼쪽 위, C가 왼쪽 아래, B가 오른쪽 전체 높이(승인 지점과 근거의 바닥선이 맞음).
          */}
          <div className="relative p-5 sm:p-7 lg:p-10 grid gap-5 lg:gap-8 lg:grid-cols-[1fr_1.1fr] lg:grid-rows-[1fr_auto] lg:gap-x-12">
            {/* A. 무엇을, 왜 */}
            <div className="min-w-0 flex flex-col lg:col-start-1 lg:row-start-1">
              <div className="flex items-start gap-4">
                <IconBox kind="route" drawn />
                <div className="min-w-0">
                  <span className="text-[12px] sm:text-[11px] font-bold tracking-[0.16em] text-body" style={MONO}>
                    {ENTRY.tag}
                  </span>
                  <h3 id={titleId} className="mt-2 text-[22px] md:text-[26px] font-bold text-ink tracking-tight leading-snug">
                    {ENTRY.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] sm:text-[14px] font-semibold text-body">{ENTRY.name}</p>
                </div>
              </div>
              <Situation text={ENTRY.situation} className="mt-5 lg:mt-7" />
              {collapsible && (
                <MoreToggle
                  className="mt-4"
                  open={open}
                  onToggle={() => setOpen((v) => !v)}
                  controls={`${moreLedgerId} ${moreEvidenceId}`}
                  label={MORE.entry}
                  name={ENTRY.name}
                />
              )}
            </div>

            {/* B. 받는 것과 승인 지점 */}
            <div className="flex flex-col gap-4 lg:gap-0 min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <dl id={moreLedgerId} className="aiax-services-more divide-y divide-line border-y border-line">
                <LedgerRow label={SVC.labels.does}>{ENTRY.does}</LedgerRow>
                <LedgerRow label={SVC.labels.outputs}>
                  <OutputList items={ENTRY.outputs} />
                </LedgerRow>
              </dl>
              {/* lg: 왼쪽 아래 "근거"와 바닥선을 맞춥니다(결재란처럼 카드 맨 아래). 서비스 카드와 같은 띠. */}
              <div className="lg:mt-auto lg:pt-6">
                <GateCallout text={ENTRY.gate} />
              </div>
            </div>

            {/* C. 근거 (사례가 아니라 업무 지식 — 상태 표식 없음) */}
            <div id={moreEvidenceId} className="aiax-services-more min-w-0 lg:col-start-1 lg:row-start-2">
              <p className="text-[12px] font-bold text-body">{SVC.labels.evidence}</p>
              <p className="mt-1.5 text-[15px] sm:text-[14px] text-body leading-relaxed">{ENTRY.evidenceText}</p>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/**
 * 서비스 카드. lg(2열)에서는 카드 안 7개 행을 CSS subgrid로 부모 격자 행에 맞춰,
 * 나란한 두 카드의 같은 필드(상황 · 하는 일 · 산출물 · 승인 지점 · 근거)가 같은 높이에서 시작합니다.
 * (모션 래퍼와 article 모두 subgrid여야 행이 이어집니다. lg 미만은 1열 flex.)
 * lg 미만(md 미만 가로 레일의 한 장 · md–lg 2열 격자)에서는 하는 일 · 산출물만 펼쳐 보기로 엽니다
 * (lg에서 버튼은 display:none이라 subgrid 행에 들지 않음).
 */
function ServiceCard({
  s,
  open,
  onToggle,
  collapsible,
}: {
  s: Service;
  open: boolean;
  onToggle: () => void;
  collapsible: boolean;
}) {
  const evidence: ReadonlyArray<Evidence> = s.evidence;
  const note = "note" in s ? s.note : undefined;
  const link = "link" in s ? s.link : undefined;
  const titleId = `aiax-svc-${s.key}`;
  const moreId = `aiax-svc-${s.key}-ledger`;
  return (
    <motion.div
      role="listitem"
      variants={fadeUp}
      className="h-full lg:row-span-7 lg:grid lg:grid-rows-subgrid lg:gap-y-0"
    >
      <article
        aria-labelledby={titleId}
        data-open={open ? "" : undefined}
        data-collapsible={collapsible ? "" : undefined}
        className="aiax-services-card glass glass-static rounded-2xl p-4 sm:p-6 lg:p-7 flex flex-col h-full lg:row-span-7 lg:grid lg:grid-rows-subgrid lg:gap-y-0"
      >
        {/* 1. 머리 */}
        <div className="flex items-start gap-4">
          <IconBox kind={s.icon} from="lg" />
          <div className="min-w-0">
            <span className="text-[12px] sm:text-[11px] font-bold tracking-[0.16em] text-body" style={MONO}>
              {s.kicker}
            </span>
            <h3 id={titleId} className="mt-1 text-[18px] sm:text-[20px] font-bold text-ink leading-snug">
              {s.name}
            </h3>
            {/* md 이상은 card-body(15px/1.7)와 같고, md 미만만 16px(좁은 레일 카드에서 줄 수 절약) */}
            <p className="mt-2 text-[16px] md:text-[15px] leading-[1.7] text-body">{s.oneLine}</p>
          </div>
        </div>

        {/* 2. 상황 인용 */}
        <Situation text={s.situation} className="mt-4 lg:mt-6" />

        {/* (lg 미만) 펼쳐 보기 */}
        {collapsible && (
          <MoreToggle
            className="mt-3"
            open={open}
            onToggle={onToggle}
            controls={moreId}
            label={MORE.service}
            name={s.name}
          />
        )}

        {/* 3–4. 원장형 dl (lg: 두 행을 부모 행에 맞춤) */}
        <dl
          id={moreId}
          className="aiax-services-more mt-3 lg:mt-5 divide-y divide-line border-y border-line lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-y-0"
        >
          <LedgerRow label={SVC.labels.does} wide="lg">
            {s.does}
          </LedgerRow>
          <LedgerRow label={SVC.labels.outputs} wide="lg">
            <OutputList items={s.outputs.split(" · ")} />
          </LedgerRow>
        </dl>

        {/* 5. 사람이 승인하는 지점 */}
        <GateCallout text={s.gate} className="mt-3 lg:mt-5" />

        {/* 6. 근거 */}
        <div className="aiax-services-evid mt-3 lg:mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-bold text-body">{SVC.labels.evidence}</span>
          {evidence.map((e) => (
            <EvidenceChip
              key={e.label}
              href={e.href}
              status={e.status}
              ariaLabel={`${e.href ? "근거 사례 보기" : "근거 사례"}: ${e.label} (${STATUS_LABEL[e.status]})`}
            >
              {e.label}
            </EvidenceChip>
          ))}
        </div>

        {/* 7. 비고 · 관련 사업영역 */}
        <div className="mt-auto flex flex-col items-start">
          {note && (
            <p className="mt-3 text-[14px] sm:text-[13px] text-body leading-relaxed">
              {SVC.labels.note}: {note}
            </p>
          )}
          {link && (
            <Link
              href={link.href}
              className="group mt-3 lg:mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-navy underline-offset-4 decoration-1 hover:underline"
            >
              {link.label}
              <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </article>
    </motion.div>
  );
}

/**
 * 서비스 카드 목록 — md 이상 2열 격자(lg는 subgrid로 필드 정렬, md–lg는 상세를 접은 카드),
 * md 미만 가로 스냅 레일(+ 위치 점, 기본 스크롤바는 숨김 — 위치 표시는 점 하나로).
 */
function ServiceList() {
  const railRef = useRef<HTMLDivElement>(null);
  const { active, isRail, goTo } = useRail(railRef);
  const collapsible = useHydrated();
  const [openKeys, setOpenKeys] = useState<ReadonlyArray<string>>([]);
  const toggle = (key: string) =>
    setOpenKeys((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  return (
    <>
      <motion.div
        ref={railRef}
        id={RAIL.servicesId}
        role="list"
        aria-label={RAIL.servicesLabel}
        aria-describedby={isRail ? RAIL.hintId : undefined}
        data-any-open={openKeys.length > 0 ? "" : undefined}
        className="aiax-services-rail aiax-noscrollbar mt-5 md:mt-6 grid gap-5 md:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_GRID}
        variants={stagger(0.08)}
      >
        {SERVICES.map((s) => (
          <ServiceCard
            key={s.key}
            s={s}
            open={openKeys.includes(s.key)}
            onToggle={() => toggle(s.key)}
            collapsible={collapsible}
          />
        ))}
      </motion.div>
      <RailDots
        labels={SERVICES.map((s) => s.name)}
        active={active}
        railId={RAIL.servicesId}
        groupLabel={RAIL.servicesDots}
        onSelect={goTo}
      />
    </>
  );
}

function EvidenceLegend() {
  const labelId = "aiax-svc-evidence-legend";
  return (
    <motion.div
      className="mt-4 md:mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] sm:text-[13px] text-body"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_GRID}
      variants={fadeUpSm}
    >
      <span id={labelId} className="font-bold">
        {EVIDENCE_LEGEND_LABEL}
      </span>
      <ul aria-labelledby={labelId} className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {EVIDENCE_LEGEND.map((st) => (
          <li key={st} className="inline-flex items-center gap-1.5 whitespace-nowrap text-ink">
            <StatusMark status={st} size={11} />
            <span className="font-semibold">{STATUS_LABEL[st]}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function DomainRow() {
  const titleId = "aiax-svc-domains";
  return (
    <div className="mt-12 md:mt-14">
      <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} variants={fadeUp}>
        <h3 id={titleId} className="text-[20px] font-bold text-ink tracking-tight leading-snug">
          {SVC.domainTitle}
        </h3>
        <p className="mt-2 card-body text-body max-w-3xl">{SVC.domainBody}</p>
      </motion.div>
      <motion.ul
        aria-labelledby={titleId}
        className="mt-4 md:mt-5 flex flex-wrap gap-2 sm:gap-2.5"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_GRID}
        variants={stagger(0.05)}
      >
        {DOMAINS.map((d) => (
          <motion.li key={d.href} variants={fadeUpSm}>
            <Link
              href={d.href}
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[15px] sm:text-[14px] font-semibold text-ink border border-line bg-[var(--color-glass-bg)] transition-colors duration-200 hover:bg-[var(--color-raised)] hover:border-[color:var(--aiax-muted-line)]"
            >
              {d.label}
              <ArrowIcon className="w-3.5 h-3.5 text-body opacity-0 -translate-x-1 transition duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 pointer-coarse:opacity-100 pointer-coarse:translate-x-0" />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

/**
 * 제안 항목 — 점선(테두리·구분선)과 투명 배경으로 "아직 만들지 않음"을 표현합니다.
 * - lg 미만: 점선 상자 하나에 세 항목을 점선으로 나눠 쌓은 목록(가로 레일 없음).
 *   md–lg는 항목 안을 2열(왼쪽 영역·제목·설명 / 오른쪽 AI·사람)로 둡니다.
 * - lg 이상: 점선 카드 3열. 5개 행(머리 · 제목 · 설명 · AI · 사람)을 subgrid로 맞춰 세 카드의 역할 줄이 같은 선에서 시작합니다
 *   (왼쪽 묶음 div는 lg에서 display:contents라 머리 · 제목 · 설명이 각각 subgrid 행이 됩니다).
 */
function ProposalCard({ p }: { p: (typeof PROPOSALS)[number] }) {
  return (
    <article className="h-full p-4 sm:p-5 md:grid md:grid-cols-2 md:gap-x-8 lg:grid-cols-1 lg:row-span-5 lg:grid-rows-subgrid lg:gap-y-0 lg:rounded-2xl lg:border lg:border-dashed lg:border-[color:var(--aiax-muted-line)]">
      <div className="min-w-0 lg:contents">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12px] font-bold text-body">{p.domain}</span>
          <StatusBadge status="proposal" />
        </div>
        <h4 className="mt-2 lg:mt-3 text-[16px] font-bold text-ink leading-snug">{p.title}</h4>
        <p className="mt-1 lg:mt-1.5 text-[15px] sm:text-[14px] text-body leading-relaxed">{p.body}</p>
      </div>
      <dl className="mt-3 border-t border-line pt-3 text-[14px] sm:text-[13px] leading-relaxed md:mt-0 md:border-t-0 md:pt-0 md:border-l md:pl-6 lg:mt-4 lg:border-l-0 lg:pl-0 lg:border-t lg:pt-4 lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-y-0">
        <div>
          <dt className="flex items-center gap-1.5 font-bold text-ink">
            <RoleGlyph role="ai" size={10} />
            {SVC.proposalAi}
          </dt>
          <dd className="mt-0.5 pl-[16px] text-body">{p.ai}</dd>
        </div>
        <div className="mt-2.5 lg:mt-3">
          <dt className="flex items-center gap-1.5 font-bold text-ink">
            <RoleGlyph role="human" size={10} />
            {SVC.proposalHuman}
          </dt>
          <dd className="mt-0.5 pl-[16px] text-body">{p.human}</dd>
        </div>
      </dl>
    </article>
  );
}

function Proposals() {
  const titleId = "aiax-svc-proposals";
  return (
    <div className="mt-10">
      <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} variants={fadeUp}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 id={titleId} className="text-[18px] font-bold text-ink tracking-tight leading-snug">
            {SVC.proposalTitle}
          </h3>
          <StatusBadge status="proposal" />
        </div>
        <p className="mt-2 text-[15px] sm:text-[14px] text-body leading-relaxed">{STATUS_DEFINITION.proposal}</p>
      </motion.div>
      {/* lg 미만: 점선 상자 하나 + 점선 구분선의 세로 목록 / lg 이상: 점선 카드 3열 */}
      <motion.ul
        aria-labelledby={titleId}
        className="mt-4 lg:mt-5 rounded-2xl border border-dashed border-[color:var(--aiax-muted-line)] divide-y divide-dashed divide-[color:var(--aiax-muted-line)] lg:rounded-none lg:border-0 lg:divide-y-0 lg:grid lg:grid-cols-3 lg:gap-4"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_GRID}
        variants={stagger(0.08)}
      >
        {PROPOSALS.map((p) => (
          <motion.li key={p.title} variants={FADE_IN} className="lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:gap-y-0">
            <ProposalCard p={p} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

/* ═══════════ 섹션 ═══════════ */
export default function AiAxServices() {
  return (
    <section
      id={AIAX_ID.services}
      aria-labelledby="aiax-svc-title"
      className="relative py-14 md:py-24 px-6 overflow-hidden scroll-mt-32"
    >
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader eyebrow={SVC.eyebrow} title={SVC.title} lead={SVC.lead} titleId="aiax-svc-title" />
        {/* 레일 안내: 본문 흐름에서는 읽히지 않고(hidden), 레일일 때만 aria-describedby로 연결됩니다. */}
        <p id={RAIL.hintId} hidden>
          {RAIL.hint}
        </p>

        <EntryCard />

        <ServiceList />
        <EvidenceLegend />

        <DomainRow />
        <Proposals />
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  ApprovalStamp,
  ArrowIcon,
  DemoFrame,
  EASE,
  PRIMARY_STYLE,
  RoleGlyph,
  SectionHeader,
  StatusBadge,
  VIEWPORT_GRID,
  cn,
  fadeUp,
  stagger,
  type Role,
} from "./aiax/shared";
import "./aiax/idpdemo.css";

/* ═══════════ 문구 (명세 C7 기준) ═══════════ */
const IDP = {
  eyebrow: "05 · DOCUMENT AI",
  statusPrefix: "CASE 03",
  title: "추출한 값마다 원문 근거를 함께 보여 줍니다",
  lead: "IB 시스템(IBIMS)을 대상으로 진행한 AI deal 자동추출 PoC입니다. 문서 AI(IDP) 엔진이 여신서류 PDF에서 deal 핵심 항목을 읽어 내고, 항목마다 원문의 위치를 함께 받아 화면에 표시합니다. 담당자는 값과 근거를 나란히 보며 바로 대조합니다.",
  frameTitle: "deal 자동추출 · 동작 재현",
  dataLabel: "민감 정보 마스킹", // 배지: "시연용 예시 · 민감 정보 마스킹"
  source: "IBIMS AI deal 자동추출",
  pocNoticeStrong: "PoC 단계입니다.",
  pocNotice: "운영 중인 기능이 아니며, 실제 업무 문서와 규칙에 맞춘 정밀화를 거쳐 적용 범위를 정합니다.",
  // 만기 연도도 가리므로 "등"으로 목록이 전부가 아님을 밝힙니다(● ○ 뜻은 maskedNote).
  maskNoticeStrong: "고객 정보 보호를 위해, 이 시연 화면에서도 차주명·금액·부점·소재지 등은 마스킹해 표시합니다.",
  maskNotice: "PoC의 동작을 가상 데이터로 재현한 화면이며, 마스킹한 자리를 포함해 모든 값이 실제 거래와 무관합니다.",
  filesLabel: "파일",
  files: [
    { name: "예시_대출제안서.pdf", state: "추출 완료 · 검토 필요 있음", active: true },
    { name: "예시_투자설명자료.pdf", state: "대기", active: false },
    { name: "예시_신용평가요약.pdf", state: "대기", active: false },
  ],
  viewerLabel: "원문",
  resultsLabel: "추출 결과",
  cols: ["항목", "추출값", "공통코드 매핑", "상태"],
  mappingNote: "공통코드 매핑은 LLM이 아니라 결정적 규칙 엔진이 수행합니다. 규칙으로 정할 수 없는 값은 추측하지 않고 '검토 필요'로 남깁니다.",
  maskedNote: "● ○ 표기는 공개 화면에서 가린 자리입니다.", // 가림이 엔진 입력이 아니라 공개 화면 표기임을 밝힘(처리 과정 주장 없음)
  evidenceTag: "근거 · 1쪽",
  reviewShort: "담당자가 코드를 정해 주세요.",
  railPrev: "이전 항목",
  railNext: "다음 항목",
  railDots: "추출 항목 바로 가기",
  railGoTo: (label: string) => `${label} 항목 보기`,
  remaining: (n: number) => `검토 필요 ${n}건이 남아 있습니다. 모두 확인해야 확정할 수 있습니다.`,
  allResolved: "검토 필요 항목을 모두 확인했습니다. 확정은 담당자의 권한입니다.",
  confirm: "확정",
  confirmed: "확정됨",
  toast: "확정 기록이 남았습니다 · 담당자 확인 완료 (시연이므로 실제로 저장되지는 않습니다)",
  reset: "초기화",
  logTitle: "처리 기록 (시연)",
  logBase: ["문서 AI · 항목 추출 · 항목별 원문 위치 포함", "규칙 엔진 · 공통코드 매핑 · 검토 필요 2건"],
  logResolve: (label: string, value: string) => `담당자 · ${label} → ${value} 확인`,
  logConfirm: "담당자 · 결과 확정",
  status: { extracted: "추출", mapped: "규칙 매핑", review: "검토 필요", resolved: "담당자 확인" },
  mechanisms: [
    { title: "근거 위치를 함께 받습니다", body: "항목 값과 함께 원문의 페이지와 영역을 받아 문서 위에 표시합니다. 담당자는 원문을 다시 찾지 않고 바로 대조합니다." },
    { title: "매핑은 규칙 엔진이", body: "추출 이후의 공통코드 매핑은 LLM이 아니라 결정적 규칙 엔진이 맡아, 같은 입력에는 늘 같은 결과를 냅니다." },
    { title: "애매하면 사람에게", body: "여러 코드에 해당하거나 매핑되지 않는 값은 '검토 필요'로 표시하고, 담당자가 확인하기 전에는 확정되지 않게 했습니다." },
  ],
  ibimsLink: { label: "IB 시스템(IBIMS) 살펴보기", href: "/services/ibims" },
} as const;

/* ═══════════ 시연용 가상 문서와 추출 데이터 ═══════════
   거래 윤곽이 특정되지 않도록 일반화했습니다: 업종·거래 내용은 "발전 설비" 수준, 만기는 연도를 가림(20●●).
   차주·금액·부점·소재지는 고정 길이 표기로 가립니다. 신용등급에는 "(가상 평가)"를 붙입니다. */
// ev-terms = 주요 조건 4행을 묶은 자리(lg 미만 "주요 조건" 카드 전용)
type EvId = "ev-borrower" | "ev-dealtype" | "ev-currency" | "ev-amount" | "ev-maturity" | "ev-rating" | "ev-industry" | "ev-terms";

// sr = 마스킹 칸을 스크린리더가 읽을 문장. 종이의 모든 값(meta·s1Rows·s2Rows)은 <PaperValue row={…} />로 렌더하고, sr이 있으면 PaperValue가 <Masked />로 그립니다.
const PAPER = {
  title: "대출 제안서",
  sub: "시연용 가상 문서 · 1쪽 · 민감 정보 마스킹",
  meta: [ // 추출 대상 아님(근거 앵커 없음). 제목 아래 작은 dl
    { label: "작성 부점", value: "○○부", sr: "마스킹됨" }, // dt가 항목 이름을 이미 읽으므로 sr은 "마스킹됨"만
    { label: "사업장 소재지", value: "○○ · ○○", sr: "마스킹됨" },
  ],
  s1: "1. 거래 개요",
  s1Rows: [
    { label: "차주", value: "㈜○○○ SPC", ev: "ev-borrower", sr: "차주명 마스킹됨" },
    { label: "거래 내용", value: "발전 설비 운영 자산 인수 및 설비 보강 자금 선순위 대출", ev: "ev-dealtype" },
  ],
  s2: "2. 주요 조건",
  s2Rows: [
    { label: "대출 통화", value: "원화(KRW)", ev: "ev-currency" },
    { label: "대출 총액", value: "KRW ●●●", ev: "ev-amount", sr: "금액 마스킹됨" },
    { label: "만기일", value: "20●●년 6월 30일", ev: "ev-maturity", sr: "연도 마스킹됨, 6월 30일" },
    { label: "차주 신용등급", value: "BBB+ (가상 평가)", ev: "ev-rating" },
    { label: "업종", value: "발전 설비 운영·유지보수", ev: "ev-industry" },
  ],
  s3: "3. 검토 의견",
  skeleton: [92, 78, 64], // 회색 막대 길이(%) — 고정 배열(렌더 중 Math.random 금지). 3줄: 1440×900에서 종이 전체가 스티키 뷰어에 들어감
  footer: "시연을 위해 새로 만든 가상 자료입니다. 민감 정보 자리는 마스킹했으며, 가린 자리를 포함해 실제 거래와 무관합니다.",
  watermark: "SAMPLE",
} as const;

type Field = {
  key: "borrower" | "dealType" | "currency" | "amount" | "maturity" | "rating" | "industry";
  label: string;
  raw: string;
  rawSr?: string;                                 // 있으면 raw는 마스킹 표기(Masked로 렌더)
  ev: EvId;
  mapped: { value: string; rule: string; sr?: string } | null; // null = 자유 입력 또는 매핑 불가. sr 있으면 value도 마스킹 표기
  freeText?: string;                              // 매핑 칸에 표시할 문구
  review?: { reason: string; prompt: string; options: string[] };
};

const FIELDS: Field[] = [
  { key: "borrower", label: "차주", raw: "㈜○○○ SPC", rawSr: "차주명 마스킹됨", ev: "ev-borrower", mapped: null, freeText: "자유 입력 항목" },
  {
    key: "dealType", label: "deal 유형", raw: "운영 자산 인수 및 설비 보강 자금 선순위 대출", ev: "ev-dealtype", mapped: null, freeText: "후보 2개: 인수금융 / 프로젝트 파이낸스",
    review: { reason: "여러 코드에 해당", prompt: "원문 값이 두 코드에 모두 해당합니다. 담당자가 선택해 주세요.", options: ["인수금융", "프로젝트 파이낸스"] },
  },
  { key: "currency", label: "통화", raw: "원화(KRW)", ev: "ev-currency", mapped: { value: "KRW", rule: "통화 허용 목록" } },
  { key: "amount", label: "금액", raw: "KRW ●●●", rawSr: "금액 마스킹됨", ev: "ev-amount", mapped: { value: "●●●", rule: "금액 정규화", sr: "정규화한 금액 마스킹됨" } },
  {
    key: "maturity", label: "만기", raw: "20●●년 6월 30일", rawSr: "연도 마스킹됨, 6월 30일", ev: "ev-maturity",
    mapped: { value: "20●●-06-30", rule: "날짜 정규화", sr: "정규화한 날짜, 연도 마스킹됨, 6월 30일" },
  },
  { key: "rating", label: "신용등급", raw: "BBB+", ev: "ev-rating", mapped: { value: "BBB+", rule: "등급 체계 대조" } },
  {
    key: "industry", label: "업종", raw: "발전 설비 운영·유지보수", ev: "ev-industry", mapped: null, freeText: "대응 코드 없음",
    review: { reason: "매핑 없음", prompt: "공통코드에 대응하는 값이 없습니다. 담당자가 정해 주세요.", options: ["발전업", "전력 설비 운영", "공통코드 추가 요청"] },
  },
];

/* ═══════════ 파생 상수 ═══════════ */
type FieldKey = Field["key"];
type Review = NonNullable<Field["review"]>;
type Tone = "ok" | "review";
/** 라디오 이름 접두어: d = 데스크톱 표(lg 이상), m = 모바일·태블릿 목록(lg 미만) */
type View = "d" | "m";
type Phase = "pending" | "loading" | "shown";
type Resolved = Partial<Record<FieldKey, string>>;
type LogEntry = { role: Role; text: string };
/**
 * ev = 근거 상자를 둘 자리, hidden = 그 자리에서 흐려진 상태(선택 해제),
 * fresh = 보이는 상자 없이 새로 나타남(페이드인), gen = 새로 나타날 때마다 바뀌는 layoutId 세대(숨은 상자에서 미끄러져 오지 않게)
 */
type Selection = { ev: EvId | null; fresh: boolean; hidden: boolean; gen: number };

const FILE_CHIP = "예시_대출제안서.pdf · 추출 완료";
const RESULT_CAPTION = "deal 자동추출 결과(시연용 예시, 민감 정보 마스킹)";
const STAMP_LABEL = "확인";

const ROWS = FIELDS.length;

/* lg 미만 카드 레일: 규칙 엔진이 바로 매핑하는 주요 조건 4개(통화·금액·만기·신용등급)는 한 카드로 묶습니다. */
type RailCard = { key: string; label: string; ev: EvId; fields: ReadonlyArray<Field> };
const TERMS_EV: EvId = "ev-terms";
const TERM_KEYS: ReadonlyArray<FieldKey> = ["currency", "amount", "maturity", "rating"];
const TERM_FIELDS = FIELDS.filter((f) => TERM_KEYS.includes(f.key));
const TERM_EVS: ReadonlyArray<EvId> = TERM_FIELDS.map((f) => f.ev);
const RAIL: ReadonlyArray<RailCard> = FIELDS.flatMap((f): RailCard[] => {
  if (!TERM_KEYS.includes(f.key)) return [{ key: f.key, label: f.label, ev: f.ev, fields: [f] }];
  return f === TERM_FIELDS[0] ? [{ key: "terms", label: "주요 조건", ev: TERMS_EV, fields: TERM_FIELDS }] : [];
});
const NO_SELECTION: Selection = { ev: null, fresh: true, hidden: false, gen: 0 };
const REVIEW_KEYS: ReadonlyArray<FieldKey> = FIELDS.filter((f) => f.review).map((f) => f.key);
const S1_EVS: ReadonlyArray<EvId> = PAPER.s1Rows.map((r) => r.ev);
const LOG_BASE: ReadonlyArray<LogEntry> = [
  { role: "ai", text: IDP.logBase[0] },
  { role: "gate", text: IDP.logBase[1] },
];
const MECH_ROLES: ReadonlyArray<Role> = ["ai", "gate", "human"];
const ROLE_TINT: Record<Role, string> = {
  ai: "var(--aiax-tint-ai)",
  gate: "var(--aiax-tint-gate)",
  human: "var(--aiax-tint-human)",
  block: "var(--aiax-tint-block)",
};
/** 근거 상자·태그 색(종이 위 고정 hex, 태그 흰 글자 대비 #0e7490 5.4:1 · #4338ca 7.9:1) */
const EV_COLOR = {
  ok: { line: "#0891b2", fill: "rgba(8,145,178,0.12)", tag: "#0e7490" },
  review: { line: "#4f46e5", fill: "rgba(79,70,229,0.1)", tag: "#4338ca" },
} as const;

/** 인트로 일정표(명세): 행 i는 i×0.3s에 쉬머, i×0.3+0.3s에 값 표시 + 근거 선택 → 2.4s 선택 해제 → 2.6s 검토 필요 맥동 */
const STEP_MS = 300;
const CLEAR_AT_MS = 2400;
const PULSE_AT_MS = 2600;
/** 긴 데모 프레임: 비율이 아니라 화면 가운데 띠 기준(A3) */
const INTRO_VIEWPORT = { once: true, margin: "-35% 0px -35% 0px" } as const;

/* 결과 표 칸 여백: 첫 칸은 선택 표시 막대(inset 2px)와 띄우고, 마지막 칸은 표 끝에 붙입니다. */
const CELL_PAD = ["pl-2.5 pr-2", "px-2", "px-2", "pl-2 pr-1"] as const;

function sectionTitleOf(ev: EvId): string {
  return S1_EVS.includes(ev) ? PAPER.s1 : PAPER.s2;
}
/** 근거 안내 문장(명세): "근거: 1쪽, {섹션 제목} — {label}" */
function evidenceText(f: Field): string {
  return `근거: 1쪽, ${sectionTitleOf(f.ev)} — ${f.label}`;
}
function pick(s: Selection, ev: EvId): Selection {
  const fresh = s.ev === null || s.hidden;
  return { ev, fresh, hidden: false, gen: fresh && s.ev !== ev ? s.gen + 1 : s.gen };
}
/** 선택 없음으로 되돌리되 layoutId 세대는 올려, 예전 상자 위치에서 미끄러져 오는 일이 없게 합니다. */
function clearPick(s: Selection): Selection {
  return { ...NO_SELECTION, gen: s.gen + 1 };
}
function unpick(s: Selection): Selection {
  return s.hidden ? s : { ...s, hidden: true };
}
function toneOf(f: Field, resolved: Resolved): Tone {
  return f.review && !resolved[f.key] ? "review" : "ok";
}
function cardTone(c: RailCard, resolved: Resolved): Tone {
  return c.fields.some((f) => toneOf(f, resolved) === "review") ? "review" : "ok";
}
/** 레일 카드의 근거 안내. 묶음 카드는 "근거: 1쪽, 2. 주요 조건 — 통화·금액·만기·신용등급" */
function cardEvidenceText(c: RailCard): string {
  return c.fields.length === 1
    ? evidenceText(c.fields[0])
    : `근거: 1쪽, ${sectionTitleOf(c.ev)} — ${c.fields.map((f) => f.label).join("·")}`;
}

/* ═══════════ 마스킹 렌더러 ═══════════ */
const MASK_RUN = /([●○]+)/;
/** ○/● 자리만 칩으로 그리고(예: 20[●●]년), 보이는 표기 전체는 aria-hidden, 뜻은 sr-only 문장으로 줍니다. */
function Masked({ text, sr }: { text: string; sr: string }) {
  return (
    <>
      <span aria-hidden="true">
        {text.split(MASK_RUN).map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} className="aiax-mask">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </span>
      <span className="sr-only">{sr}</span>
    </>
  );
}

// 종이 값 렌더러(모듈 최상위). PAPER는 `as const`라 s1Rows/s2Rows가 모양이 다른 객체의 튜플이 되어,
// `.map((r) => r.sr ? … : …)`처럼 쓰면 일부 원소에 sr이 없어 TS2339로 빌드가 깨집니다. 종이 값은 항상 이 컴포넌트로 넘깁니다.
function PaperValue({ row }: { row: { value: string; sr?: string } }) {
  return row.sr ? <Masked text={row.value} sr={row.sr} /> : <>{row.value}</>;
}

/* ═══════════ 아이콘 (장식) ═══════════ */
function MaskIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-1 shrink-0 text-body">
      <rect x="1" y="3" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="5" cy="7" r="1.2" fill="currentColor" />
      <circle cx="9" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-1 shrink-0 text-body">
      <circle cx="7" cy="7" r="5.9" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 6.2v3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="4.3" r="0.85" fill="currentColor" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-body">
      <path d="M3 1.5h5l3 3v8H3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 1.5v3h3M5 7.5h4M5 9.8h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
      <path d="M2.6 7a4.4 4.4 0 1 0 1.3-3.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3.4 1.6v2.6H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
      <rect x="2.75" y="6.25" width="8.5" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.75 6.25V4.6a2.25 2.25 0 0 1 4.5 0v1.65" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
      <path d="M2.8 7.3l2.7 2.7 5.7-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ═══════════ 안내 띠 (PoC → 마스킹, 항상 표시) ═══════════ */
function IdpNotice() {
  return (
    <div className="border-b border-line">
      <p
        className="flex items-start gap-2 px-5 sm:px-6 py-3 text-[15px] sm:text-[14px] text-ink"
        style={{ background: "var(--aiax-tint-human)" }}
      >
        <RoleGlyph role="human" variant="pending" size={12} className="mt-1" />
        <span>
          <strong className="font-bold">{IDP.pocNoticeStrong}</strong> {IDP.pocNotice}
        </span>
      </p>
      <p className="flex items-start gap-2 px-5 sm:px-6 py-3 border-t border-line text-[15px] sm:text-[14px] text-ink">
        <MaskIcon />
        <span>
          <strong className="font-bold">{IDP.maskNoticeStrong}</strong> {IDP.maskNotice}
        </span>
      </p>
    </div>
  );
}

/* ═══════════ 종이 위 근거 상자 ═══════════ */
function EvidenceMark({
  tone,
  prefix,
  fade,
  hidden,
  gen,
}: {
  tone: Tone;
  prefix: string;
  fade: boolean;
  hidden?: boolean;
  gen: number;
}) {
  const c = EV_COLOR[tone];
  // 같은 layoutId라서 다른 행을 고르면 상자와 태그가 원문 위를 미끄러져 이동합니다(측정 코드 없음).
  // 이전 선택이 없을 때만 페이드인하고, 행을 옮길 때는 불투명한 채로 미끄러집니다. 해제는 그 자리에서 흐려집니다.
  const transition = { opacity: { duration: 0.25 }, layout: { duration: 0.45, ease: EASE } };
  return (
    <>
      <motion.span
        layoutId={`aiax-evidence-box-${prefix}-${gen}`}
        data-ev-mark=""
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-[6px]"
        style={{ border: `2px solid ${c.line}`, background: c.fill }}
        initial={fade ? { opacity: 0 } : false}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={transition}
      />
      {/* 태그는 상자 오른쪽 위 테두리에 둡니다. 왼쪽에 두면 바로 위 행의 글자(예: "BBB+ (가상 평가)")를 가립니다. */}
      <motion.span
        layoutId={`aiax-evidence-tag-${prefix}-${gen}`}
        data-ev-mark=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 right-1 z-[1] whitespace-nowrap rounded-[4px] px-1.5 py-0.5 text-[10px] font-bold leading-[1.4] text-white"
        style={{ background: c.tag }}
        initial={fade ? { opacity: 0 } : false}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={transition}
      >
        {IDP.evidenceTag}
      </motion.span>
    </>
  );
}

/* ═══════════ 종이 (테마와 무관하게 밝음, 다크에서는 한 톤 낮춤 — idpdemo.css) ═══════════ */
const RULE = "var(--idp-rule)";

/** compact = lg 미만 원문 뷰어용(여백·칸 폭 축소). prefix = 근거 상자 layoutId 접두어(데스크톱 "d" · 모바일 "m"이 서로 끌려가지 않게). */
function Paper({
  selected,
  hidden = false,
  tone,
  compact,
  prefix = "d",
  fresh = true,
  gen = 0,
}: {
  selected: EvId | null;
  hidden?: boolean;
  tone: Tone;
  compact?: boolean;
  prefix?: string;
  fresh?: boolean;
  gen?: number;
}) {
  const evidence = (ev: EvId) =>
    selected === ev ? <EvidenceMark tone={tone} prefix={prefix} fade={fresh} hidden={hidden} gen={gen} /> : null;
  const value = (row: { value: string; sr?: string }, ev: EvId) =>
    selected === ev && !hidden ? (
      <mark className="bg-transparent text-inherit">
        <PaperValue row={row} />
      </mark>
    ) : (
      <PaperValue row={row} />
    );
  const s2Row = (r: (typeof PAPER.s2Rows)[number]) => (
    <tr key={r.ev} style={{ borderTop: `1px solid ${RULE}` }}>
      <th
        scope="row"
        className={cn(
          "aiax-idpdemo-muted whitespace-nowrap py-1.5 pr-2 text-left align-top font-normal",
          compact ? "w-[88px]" : "w-[96px]",
        )}
      >
        {r.label}
      </th>
      <td data-ev={r.ev} className="relative px-1.5 py-1.5 align-top">
        {value(r, r.ev)}
        {evidence(r.ev)}
      </td>
    </tr>
  );
  return (
    <div
      className={cn("aiax-paper aiax-idpdemo-paper relative overflow-hidden", compact ? "p-4 pt-5" : "rounded-xl p-6")}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
        <span
          className={cn("font-black tracking-[0.06em]", compact ? "text-[44px]" : "text-[64px]")}
          style={{ transform: "rotate(-24deg)", color: "rgba(27,35,51,0.06)" }}
        >
          {PAPER.watermark}
        </span>
      </span>

      <div className="relative">
        <p className="text-[18px] font-bold leading-snug">{PAPER.title}</p>
        <p className="aiax-idpdemo-muted mt-1 text-[12px]">{PAPER.sub}</p>
        <div aria-hidden="true" className="mt-3 h-px" style={{ background: RULE }} />

        <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1 text-[12px]">
          {PAPER.meta.map((m) => (
            <div key={m.label} className="contents">
              <dt className="aiax-idpdemo-muted">{m.label}</dt>
              <dd>
                <PaperValue row={m} />
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 text-[14px] font-bold">{PAPER.s1}</p>
        {PAPER.s1Rows.map((r) => (
          <div
            key={r.ev}
            data-ev={r.ev}
            className={cn(
              "relative mt-2 grid gap-2 rounded-[6px] px-1.5 py-1 text-[13px] leading-relaxed",
              compact ? "grid-cols-[60px_1fr]" : "grid-cols-[72px_1fr]",
            )}
          >
            <span className="aiax-idpdemo-muted">{r.label}</span>
            <span>{value(r, r.ev)}</span>
            {evidence(r.ev)}
          </div>
        ))}

        <p className="mt-5 text-[14px] font-bold">{PAPER.s2}</p>
        {/* 주요 조건 4행(통화·총액·만기·신용등급)은 따로 감싸, lg 미만 "주요 조건" 카드가 네 행을 상자 하나로 가리킬 수 있게 합니다.
            표를 둘로 나눠도 머리 칸 폭이 같아 보이는 모양은 한 표와 같습니다. */}
        <div data-ev={TERMS_EV} className="relative mt-2">
          <table className="w-full border-collapse text-[13px]">
            <tbody>{PAPER.s2Rows.filter((r) => TERM_EVS.includes(r.ev)).map(s2Row)}</tbody>
          </table>
          {evidence(TERMS_EV)}
        </div>
        <table className="w-full border-collapse text-[13px]" style={{ borderBottom: `1px solid ${RULE}` }}>
          <tbody>{PAPER.s2Rows.filter((r) => !TERM_EVS.includes(r.ev)).map(s2Row)}</tbody>
        </table>

        <p className="mt-5 text-[14px] font-bold">{PAPER.s3}</p>
        <div aria-hidden="true">
          {PAPER.skeleton.map((w, i) => (
            <div key={i} className="mt-2.5 h-2 rounded-full" style={{ width: `${w}%`, background: RULE }} />
          ))}
        </div>

        <p className="aiax-idpdemo-muted mt-6 text-[11px] leading-relaxed">{PAPER.footer}</p>
      </div>
    </div>
  );
}

/* ═══════════ 결과 칸 조각 ═══════════ */
function RawValue({ f }: { f: Field }) {
  return f.rawSr ? <Masked text={f.raw} sr={f.rawSr} /> : <>{f.raw}</>;
}

function MappingValue({ f, chosen, inline }: { f: Field; chosen?: string; inline?: boolean }) {
  if (f.mapped) {
    // inline = lg 미만 카드: 규칙을 같은 줄에 붙여 높이를 줄입니다("KRW  규칙: 통화 허용 목록"). 데스크톱 표 칸에서는 아랫줄.
    return (
      <>
        <span className="font-semibold text-ink">
          {f.mapped.sr ? <Masked text={f.mapped.value} sr={f.mapped.sr} /> : f.mapped.value}
        </span>
        <span className={cn("text-[12px] text-body", inline ? "ml-1.5" : "block")}>규칙: {f.mapped.rule}</span>
      </>
    );
  }
  if (chosen) {
    // 담당자가 고른 코드 + 원래 후보 안내(새 문구 없이 freeText 재사용)
    return (
      <>
        <span className="font-semibold text-ink">{chosen}</span>
        <span className="block text-[12px] text-body">{f.freeText}</span>
      </>
    );
  }
  return <span className="text-[13px] text-body">{f.freeText}</span>;
}

/**
 * 인트로 동안 값 자리를 비우고(공간은 유지) 자리에 막대를 둡니다: 추출 중인 행은 쉬머, 아직 차례가 아닌 행은 옅은 고스트 막대.
 * 그래서 재생 중에도 프레임에 빈 칸만 남는 구간이 없습니다.
 */
function Reveal({ phase, bar = "w-[70%]", children }: { phase: Phase; bar?: string; children: ReactNode }) {
  return (
    <span className="relative block">
      <span
        className={cn(
          "block transition-opacity",
          phase === "shown" ? "opacity-100 duration-300" : "opacity-0 duration-150",
        )}
      >
        {children}
      </span>
      {phase !== "shown" && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-full",
            phase === "loading" ? "aiax-shimmer" : "bg-[var(--color-raised)]",
            bar,
          )}
        />
      )}
    </span>
  );
}

function FieldStatus({ f, chosen, pulse }: { f: Field; chosen?: string; pulse: number }) {
  if (!f.review) {
    const mapped = f.mapped !== null;
    return (
      <span className="inline-flex items-start gap-1.5">
        <RoleGlyph role={mapped ? "gate" : "ai"} size={11} className="mt-[4px]" />
        <span className="text-[13px] font-semibold text-ink whitespace-nowrap">
          {mapped ? IDP.status.mapped : IDP.status.extracted}
        </span>
      </span>
    );
  }
  const done = chosen !== undefined;
  // 두 상태를 같은 칸에 겹쳐 두고 0.25s 교차 페이드(높이 변화 없음). 보이지 않는 쪽은 낭독에서 제외.
  return (
    <span className="grid">
      <motion.span
        aria-hidden={done || undefined}
        className="col-start-1 row-start-1 inline-flex origin-left items-start gap-1.5"
        initial={false}
        animate={{ opacity: done ? 0 : 1, scale: !done && pulse > 0 ? [1, 1.08, 1] : 1 }}
        transition={{ opacity: { duration: 0.25 }, scale: { duration: 0.5, ease: EASE } }}
      >
        <RoleGlyph role="human" variant="pending" size={11} className="mt-[4px]" />
        <span className="min-w-0">
          <span className="block text-[13px] font-semibold text-ink whitespace-nowrap">{IDP.status.review}</span>
          <span className="sr-only"> · </span>
          <span className="block text-[12px] leading-snug text-body">{f.review.reason}</span>
        </span>
      </motion.span>
      <motion.span
        aria-hidden={!done || undefined}
        className="col-start-1 row-start-1 inline-flex items-start gap-1.5"
        initial={false}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <RoleGlyph role="human" size={11} className="mt-[4px]" />
        <span className="min-w-0">
          <span className="block text-[13px] font-semibold text-ink whitespace-nowrap">{IDP.status.resolved}</span>
          <ApprovalStamp label={STAMP_LABEL} show={done} delay={0.08} className="mt-1" />
        </span>
      </motion.span>
    </span>
  );
}

function ReviewFieldset({
  f,
  review,
  view,
  chosen,
  disabled,
  onChoose,
  onPointerDown,
  onKeyDown,
  onBlur,
  className,
}: {
  f: Field;
  review: Review;
  view: View;
  chosen?: string;
  disabled: boolean;
  onChoose: (opt: string) => void;
  onPointerDown?: () => void;
  onKeyDown?: () => void;
  onBlur?: (e: FocusEvent<HTMLFieldSetElement>) => void;
  className?: string;
}) {
  return (
    <fieldset
      className={cn("aiax-gate-band min-w-0 rounded-xl p-3.5 lg:p-4", className)}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      <legend className="sr-only">{f.label} 코드 선택</legend>
      {/* lg 미만 카드는 바로 위 상태 칸이 사유("여러 코드에 해당" 등)를 보여 주므로 짧은 안내만 둡니다. */}
      <p className="text-[14px] leading-relaxed text-ink">{view === "m" ? IDP.reviewShort : review.prompt}</p>
      <div className="mt-2.5 flex flex-wrap gap-2 lg:mt-3">
        {review.options.map((opt) => (
          <label
            key={opt}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-[14px] font-semibold text-ink transition-colors duration-200 hover:bg-[var(--color-raised)] has-[:checked]:border-[var(--aiax-human)] has-[:checked]:bg-[var(--color-raised)] has-[:disabled]:cursor-default has-[:disabled]:opacity-60 lg:h-11"
          >
            <input
              type="radio"
              name={`aiax-${view}-${f.key}`}
              value={opt}
              checked={chosen === opt}
              onChange={() => onChoose(opt)}
              disabled={disabled}
              className="accent-[var(--aiax-human-fill)]"
            />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ColumnLabel({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="text-[12px] font-bold text-body">
      {children}
    </p>
  );
}

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line px-3.5 text-[13px] font-semibold text-ink transition-colors duration-200 hover:bg-[var(--color-raised)]"
    >
      <ResetIcon />
      {IDP.reset}
    </button>
  );
}

function ResultNotes({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="flex items-start gap-2 text-[13px] leading-relaxed text-body">
        <InfoIcon />
        <span>{IDP.mappingNote}</span>
      </p>
      <p className="mt-1.5 flex items-start gap-2 text-[13px] leading-relaxed text-body">
        <MaskIcon />
        <span>{IDP.maskedNote}</span>
      </p>
    </div>
  );
}

/* ═══════════ 섹션 ═══════════ */
export default function AiAxIdpDemo() {
  const reduce = useReducedMotion();

  // 초기 state = 인트로가 끝난 상태(모든 값 표시, 검토 필요 2건 미해결, 선택 없음, 확정 잠김). SSR·JS 실패 시에도 같은 화면.
  const [sel, setSel] = useState<Selection>(NO_SELECTION);
  const [introK, setIntroK] = useState(ROWS); // introK보다 앞 행은 값 표시, introK 행은 추출 중
  const [pulse, setPulse] = useState(0);
  const [resolved, setResolved] = useState<Resolved>({});
  const [confirmed, setConfirmed] = useState(false);
  const [userLog, setUserLog] = useState<ReadonlyArray<LogEntry>>([]);
  const [openReview, setOpenReview] = useState<ReadonlySet<FieldKey>>(() => new Set(REVIEW_KEYS));
  const [mIdx, setMIdx] = useState(0); // lg 미만 카드 레일에서 앞에 놓인 카드(위 원문 뷰어가 이 항목의 근거를 표시)
  const [announce, setAnnounce] = useState("");
  const activeEv = sel.hidden ? null : sel.ev; // 화면에서 실제로 선택된 근거(행 강조·aria-pressed 기준)

  const timers = useRef<number[]>([]);
  const introStarted = useRef(false);
  const interacted = useRef(false);
  const modality = useRef<"pointer" | "key">("key");
  const viewerRef = useRef<HTMLDivElement>(null);
  const mViewerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const mViewerScrolled = useRef(false);
  /** 버튼·점으로 레일을 옮기는 동안의 목표 위치. 도착하거나 사용자가 레일을 직접 만지기 전의 중간 스크롤 이벤트는 앞 카드를 바꾸지 않습니다. */
  const railLock = useRef<number | null>(null);
  const rowButtons = useRef<Partial<Record<FieldKey, HTMLButtonElement | null>>>({});

  useEffect(() => {
    const list = timers.current;
    return () => {
      list.forEach((id) => window.clearTimeout(id));
      list.length = 0;
    };
  }, []);

  // lg 미만: 앞에 놓인 카드가 바뀌면 원문 뷰어 안쪽만 스크롤해 그 항목의 근거를 창 가운데로(페이지는 움직이지 않음).
  // lg 이상에서는 뷰어가 display:none이라 건너뜁니다. 첫 맞춤은 애니메이션 없이.
  // 브라우저의 smooth 스크롤은 쓰지 않습니다: Chrome은 두 요소의 smooth 스크롤이 겹치면 한쪽을 미뤄, 레일이 한 박자 늦게 움직입니다.
  useEffect(() => {
    const viewer = mViewerRef.current;
    const el = viewer?.querySelector<HTMLElement>(`[data-ev="${RAIL[mIdx].ev}"]`);
    if (!viewer || !el || viewer.offsetParent === null) return;
    const v = viewer.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const max = viewer.scrollHeight - viewer.clientHeight;
    const to = Math.min(max, Math.max(0, viewer.scrollTop + (r.top - v.top) - (v.height - r.height) / 2));
    const smooth = mViewerScrolled.current && !reduce;
    mViewerScrolled.current = true;
    if (!smooth) {
      viewer.scrollTop = to;
      return;
    }
    const from = viewer.scrollTop;
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 420);
      viewer.scrollTop = from + (to - from) * (1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [mIdx, reduce]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current.length = 0;
  };

  /** 화면 가운데 띠에 들어왔을 때 1회. 모션 허용 + 사용자 조작 전일 때만 되감아 재생합니다. */
  const introOnce = () => {
    if (introStarted.current || reduce || interacted.current) return;
    introStarted.current = true;
    const at = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms));
    };
    setIntroK(0);
    setSel(clearPick);
    FIELDS.forEach((f, i) => {
      at((i + 1) * STEP_MS, () => {
        setIntroK(i + 1);
        setSel((s) => pick(s, f.ev));
      });
    });
    at(CLEAR_AT_MS, () => setSel(unpick));
    at(PULSE_AT_MS, () => {
      setPulse((p) => p + 1);
      timers.current.length = 0;
    });
  };

  /** 사용자 조작: 남은 인트로 타이머를 즉시 모두 지우고 최종 상태(모든 값 표시)로 둡니다. */
  const interrupt = (): boolean => {
    interacted.current = true;
    if (timers.current.length === 0) return false;
    clearTimers();
    setIntroK(ROWS);
    setSel(unpick); // 인트로가 짚던 근거는 내려놓고 사용자 선택만 남깁니다.
    return true;
  };

  /** 근거가 뷰어 밖이면 뷰어 내부만 스크롤합니다(페이지는 움직이지 않음). */
  const revealInViewer = (ev: EvId) => {
    const viewer = viewerRef.current;
    const el = viewer?.querySelector<HTMLElement>(`[data-ev="${ev}"]`);
    if (!viewer || !el) return;
    const v = viewer.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (r.top >= v.top + 16 && r.bottom <= v.bottom - 8) return;
    viewer.scrollTo({ top: viewer.scrollTop + (r.top - v.top) - 40, behavior: reduce ? "auto" : "smooth" });
  };

  const selectRow = (f: Field) => {
    const wasPlaying = interrupt();
    const current = wasPlaying ? null : activeEv;
    if (current === f.ev) {
      setSel(unpick); // aria-pressed 토글: 다시 누르면 해제
      setAnnounce("");
      return;
    }
    setSel((s) => pick(s, f.ev));
    setAnnounce(evidenceText(f));
    revealInViewer(f.ev);
  };

  const onRowClick = (e: MouseEvent<HTMLTableRowElement>, f: Field) => {
    // 행의 빈 곳을 눌러도 선택(마우스 보조). 조작 요소 위 클릭과 글자 드래그 선택은 제외.
    if ((e.target as HTMLElement).closest("button, a, input, label")) return;
    if (window.getSelection()?.toString()) return;
    selectRow(f);
  };

  const collapseReview = (key: FieldKey) => {
    setOpenReview((s) => {
      if (!s.has(key)) return s;
      const next = new Set(s);
      next.delete(key);
      return next;
    });
  };

  const resolve = (f: Field, opt: string, view: View) => {
    interrupt();
    if (confirmed || resolved[f.key] === opt) return;
    setResolved((r) => ({ ...r, [f.key]: opt }));
    setUserLog((l) => [...l, { role: "human", text: IDP.logResolve(f.label, opt) }]);
    if (view !== "d") return;
    setSel((s) => pick(s, f.ev));
    // 포인터로 고르면 바로 접고 포커스를 행 버튼으로 옮깁니다. 키보드(방향키)로 고를 때는
    // 방향키마다 선택이 바뀌므로, 포커스가 선택지 묶음을 떠날 때 접습니다(onBlur).
    if (modality.current === "pointer") {
      collapseReview(f.key);
      rowButtons.current[f.key]?.focus({ preventScroll: true });
    }
  };

  const remaining = REVIEW_KEYS.filter((k) => !resolved[k]).length;
  const canConfirm = remaining === 0;
  const confirmActive = canConfirm && !confirmed;

  const confirm = () => {
    interrupt();
    if (!confirmActive) return;
    setConfirmed(true);
    setUserLog((l) => [...l, { role: "human", text: IDP.logConfirm }]);
  };

  const reset = () => {
    interrupt();
    setSel(clearPick);
    setIntroK(ROWS);
    setPulse(0);
    setResolved({});
    setConfirmed(false);
    setUserLog([]);
    setOpenReview(new Set(REVIEW_KEYS));
    setAnnounce("");
    // 보이는 쪽만 스크롤합니다(숨은 뷰어의 smooth 스크롤이 보이는 쪽 스크롤을 미루지 않게).
    const viewer = viewerRef.current;
    if (viewer?.offsetParent) viewer.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    setMIdx(0);
    scrollRail(0);
  };

  /** 레일을 left로 옮깁니다. 도착할 때까지 onRailScroll이 중간 위치로 앞 카드를 바꾸지 않게 잠급니다. */
  const scrollRail = (left: number) => {
    const rail = railRef.current;
    if (!rail || rail.offsetParent === null) return;
    const target = Math.min(left, rail.scrollWidth - rail.clientWidth);
    if (Math.abs(rail.scrollLeft - target) < 2) return;
    railLock.current = target;
    rail.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
  };
  const releaseRail = () => {
    railLock.current = null;
  };

  /** 카드 레일: 스크롤 위치에서 앞(왼쪽)에 놓인 카드를 구합니다. 카드 폭·간격이 같으므로 간격 단위로 반올림합니다.
      레일 끝의 빈 칸(::after) 덕분에 마지막 카드도 왼쪽 끝까지 옵니다. 버튼으로 옮긴 뒤 도착하면 goTo가 정한 카드를 그대로 둡니다. */
  const onRailScroll = () => {
    const rail = railRef.current;
    const cards = rail?.children;
    if (!rail || !cards || cards.length < 2) return;
    const lock = railLock.current;
    if (lock !== null) {
      if (Math.abs(rail.scrollLeft - lock) <= 2) railLock.current = null;
      return;
    }
    const stride = (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
    const i = Math.min(cards.length - 1, Math.max(0, Math.round(rail.scrollLeft / stride)));
    setMIdx((prev) => (prev === i ? prev : i));
  };

  /** 버튼·점·카드 탭으로 i번째 카드를 앞으로 가져옵니다. */
  const goTo = (i: number, announceCard?: RailCard) => {
    const rail = railRef.current;
    const cards = rail?.children;
    if (!rail || !cards || i < 0 || i >= cards.length) return;
    interrupt();
    setMIdx(i);
    scrollRail((cards[i] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft);
    if (announceCard) setAnnounce(cardEvidenceText(announceCard));
  };

  const onCardClick = (e: MouseEvent<HTMLLIElement>, i: number) => {
    if ((e.target as HTMLElement).closest("button, a, input, label")) return;
    if (i !== mIdx) goTo(i);
  };

  const mCard = RAIL[mIdx];
  const selField = FIELDS.find((f) => f.ev === sel.ev);
  const paperTone: Tone = selField ? toneOf(selField, resolved) : "ok";
  const phaseOf = (i: number): Phase => (i < introK ? "shown" : i === introK ? "loading" : "pending");
  const heightTransition = reduce ? { duration: 0 } : { duration: 0.3, ease: EASE };
  const log = [...LOG_BASE, ...userLog];
  const statusText = confirmed ? IDP.toast : canConfirm ? IDP.allResolved : IDP.remaining(remaining);

  return (
    <section
      id="case-idp"
      aria-labelledby="aiax-idp-title"
      className="aiax-band aiax-idpdemo relative py-14 md:py-24 px-6 overflow-x-clip scroll-mt-32"
    >
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          eyebrow={IDP.eyebrow}
          title={IDP.title}
          lead={IDP.lead}
          titleId="aiax-idp-title"
          aside={<StatusBadge status="poc" prefix={IDP.statusPrefix} />}
        />

        <div className="mt-8 md:mt-10">
          <DemoFrame
            className="aiax-idpdemo-frame"
            title={IDP.frameTitle}
            dataLabel={IDP.dataLabel}
            source={IDP.source}
            status="poc"
            skipHref="#services"
            notice={<IdpNotice />}
          >
            {/* ① 데스크톱(lg 이상): lg는 원문 | 결과, xl은 파일 | 원문 | 결과. 이 격자가 ②(lg 미만 목록)와 ③(공통 하단 블록)도 감쌉니다.
                lg 이상에서 ③은 결과 열 아래 둘째 줄에 놓이고, 파일·원문 열은 두 줄에 걸친 스티키라
                아래쪽 행(업종 검토)과 확정 버튼을 다룰 때도 근거 하이라이트가 헤더 아래 화면에 남습니다.
                lg 미만에서는 격자가 아니라 블록이며 ①의 세 열은 숨고 ②·③만 보입니다. */}
            <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-4 lg:p-5 xl:grid-cols-[188px_minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="hidden min-w-0 xl:sticky xl:top-[8.5rem] xl:col-start-1 xl:row-[1/span_2] xl:block xl:self-start">
                <div className="mb-3 flex min-h-9 items-center">
                  <ColumnLabel id="aiax-idp-files-label">{IDP.filesLabel}</ColumnLabel>
                </div>
                <ul aria-labelledby="aiax-idp-files-label" className="space-y-1.5">
                  {IDP.files.map((file) => (
                    <li
                      key={file.name}
                      aria-disabled={file.active ? undefined : true}
                      className="rounded-[10px] px-3 py-2.5 text-[13px]"
                      style={file.active ? { background: "var(--color-raised)" } : undefined}
                    >
                      <span className="flex items-center gap-2">
                        <FileIcon />
                        <span
                          className={cn(
                            "min-w-0 [overflow-wrap:anywhere]",
                            file.active ? "font-semibold text-ink" : "text-body",
                          )}
                        >
                          {file.name}
                        </span>
                      </span>
                      {file.active ? (
                        <span className="mt-1 block pl-[22px] text-[12px] text-body">{file.state}</span>
                      ) : (
                        // 대기 상태는 투명도 대신 점선 칩으로(글자 대비 유지)
                        <span className="ml-[22px] mt-1.5 inline-flex rounded-full border border-dashed border-[var(--aiax-muted-line)] px-2 text-[11px] leading-[18px] text-body">
                          {file.state}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden min-w-0 lg:sticky lg:top-[8.5rem] lg:col-start-1 lg:row-[1/span_2] lg:block lg:self-start xl:col-start-2">
                <div className="mb-3 flex min-h-9 flex-wrap items-center gap-x-3 gap-y-2">
                  <ColumnLabel>{IDP.viewerLabel}</ColumnLabel>
                  <p className="xl:hidden inline-flex rounded-full border border-line px-3 py-1 text-[13px] text-ink">
                    {FILE_CHIP}
                  </p>
                </div>
                <motion.div
                  ref={viewerRef}
                  layoutScroll
                  id="aiax-idp-viewer"
                  role="region"
                  aria-label="원문 뷰어"
                  tabIndex={0}
                  className="aiax-idpdemo-viewer overflow-y-auto rounded-xl p-3 [scrollbar-width:thin] [scrollbar-color:var(--aiax-muted-line)_transparent]"
                  style={{ background: "var(--color-raised)" }}
                >
                  <Paper selected={sel.ev} hidden={sel.hidden} tone={paperTone} fresh={sel.fresh} gen={sel.gen} />
                </motion.div>
              </div>

              <motion.div
                className="hidden min-w-0 lg:col-start-2 lg:row-start-1 lg:block xl:col-start-3"
                onViewportEnter={introOnce}
                viewport={INTRO_VIEWPORT}
              >
                <div className="mb-3 flex min-h-9 items-center justify-between gap-3">
                  <ColumnLabel>{IDP.resultsLabel}</ColumnLabel>
                  <ResetButton onClick={reset} />
                </div>
                <ResultNotes />
                <table className="mt-4 w-full border-collapse text-[14px]">
                  <caption className="sr-only">{RESULT_CAPTION}</caption>
                  <thead>
                    <tr>
                      {IDP.cols.map((c, i) => (
                        <th
                          key={c}
                          scope="col"
                          className={cn(
                            "border-b border-line pb-2 text-left align-bottom text-[12px] font-bold text-body",
                            CELL_PAD[i],
                            i === 3 && "w-[7rem]",
                          )}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {FIELDS.map((f, i) => {
                      const phase = phaseOf(i);
                      const isSel = activeEv === f.ev;
                      const pendingReview = toneOf(f, resolved) === "review";
                      const accent = pendingReview ? "var(--aiax-human-fill)" : "var(--aiax-ai)";
                      const tint = pendingReview ? "var(--aiax-tint-human)" : "var(--aiax-tint-ai)";
                      const reviewOpen = openReview.has(f.key);
                      return (
                        <Fragment key={f.key}>
                          <tr
                            className={cn(
                              "cursor-pointer border-t border-line transition-colors duration-200",
                              !isSel && "hover:bg-[var(--color-raised)]",
                            )}
                            style={isSel ? { background: tint } : undefined}
                            onClick={(e) => onRowClick(e, f)}
                          >
                            <th
                              scope="row"
                              className={cn("py-2.5 text-left align-top", CELL_PAD[0])}
                              style={isSel ? { boxShadow: `inset 2px 0 0 ${accent}` } : undefined}
                            >
                              <button
                                ref={(el) => {
                                  rowButtons.current[f.key] = el;
                                }}
                                type="button"
                                aria-pressed={isSel}
                                aria-controls="aiax-idp-viewer"
                                onClick={() => selectRow(f)}
                                className="-my-1 py-1 text-left font-semibold text-ink whitespace-nowrap underline-offset-4 hover:underline"
                              >
                                {f.label}
                              </button>
                            </th>
                            <td className={cn("py-2.5 align-top text-ink", CELL_PAD[1])}>
                              <Reveal phase={phase} bar="w-[78%]">
                                <RawValue f={f} />
                              </Reveal>
                            </td>
                            <td className={cn("py-2.5 align-top", CELL_PAD[2])}>
                              <Reveal phase={phase} bar="w-[58%]">
                                <MappingValue f={f} chosen={resolved[f.key]} />
                              </Reveal>
                            </td>
                            <td className={cn("py-2.5 align-top", CELL_PAD[3])}>
                              <Reveal phase={phase} bar="w-[64%]">
                                <FieldStatus f={f} chosen={resolved[f.key]} pulse={pulse} />
                              </Reveal>
                            </td>
                          </tr>
                          {f.review && (
                            <tr aria-hidden={reviewOpen ? undefined : true}>
                              <td colSpan={4} className="p-0">
                                <AnimatePresence initial={false}>
                                  {reviewOpen && (
                                    <motion.div
                                      key="review"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={heightTransition}
                                      className="overflow-hidden"
                                    >
                                      <div className="pb-3 pl-2.5 pr-1">
                                        <ReviewFieldset
                                          f={f}
                                          review={f.review}
                                          view="d"
                                          chosen={resolved[f.key]}
                                          disabled={confirmed}
                                          onChoose={(opt) => resolve(f, opt, "d")}
                                          onPointerDown={() => {
                                            modality.current = "pointer";
                                          }}
                                          onKeyDown={() => {
                                            modality.current = "key";
                                          }}
                                          onBlur={(e) => {
                                            if (resolved[f.key] && !e.currentTarget.contains(e.relatedTarget as Node | null)) {
                                              collapseReview(f.key);
                                            }
                                          }}
                                        />
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </motion.div>

              {/* ② 모바일·태블릿(lg 미만): 원문 뷰어 + 가로 카드 레일.
                  카드를 넘기면 앞에 놓인 카드의 근거 위치로 원문 뷰어가 스크롤되고, 근거 상자가 행 사이를 미끄러져 옮겨 갑니다.
                  카드는 4장(차주 · deal 유형 · 주요 조건 4개 묶음 · 업종). 검토 필요 선택지는 카드 안에서 바로 고르고,
                  레일 아래 점은 검토 필요 카드를 인디고로 표시합니다. */}
              <div className="lg:hidden p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="inline-flex rounded-full border border-line px-2.5 py-1 text-[12px] text-ink sm:px-3 sm:text-[13px]">
                    {FILE_CHIP}
                  </p>
                  <ResetButton onClick={reset} />
                </div>
                <ResultNotes className="mt-3 md:mt-4" />

                <div className="mt-5 mb-2">
                  <ColumnLabel>{IDP.viewerLabel}</ColumnLabel>
                </div>
                <motion.div
                  ref={mViewerRef}
                  layoutScroll
                  role="region"
                  aria-label="원문 뷰어"
                  tabIndex={0}
                  className="aiax-idpdemo-mviewer h-64 overflow-y-auto rounded-xl border border-line md:h-[22rem] [scrollbar-width:thin] [scrollbar-color:var(--aiax-muted-line)_transparent]"
                >
                  <Paper compact prefix="m" selected={mCard.ev} tone={cardTone(mCard, resolved)} fresh={false} />
                </motion.div>

                <motion.div className="mt-5" onViewportEnter={introOnce} viewport={INTRO_VIEWPORT}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <ColumnLabel id="aiax-idp-rail-label">{IDP.resultsLabel}</ColumnLabel>
                      <span aria-hidden="true" className="text-[12px] tabular-nums text-body">
                        {mIdx + 1} / {RAIL.length}
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {([-1, 1] as const).map((d) => (
                        <button
                          key={d}
                          type="button"
                          aria-label={d < 0 ? IDP.railPrev : IDP.railNext}
                          disabled={d < 0 ? mIdx === 0 : mIdx === RAIL.length - 1}
                          onClick={() => goTo(mIdx + d, RAIL[mIdx + d])}
                          className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors duration-200 hover:bg-[var(--color-raised)] disabled:cursor-default disabled:opacity-40"
                        >
                          <ArrowIcon className={cn("w-3.5 h-3.5", d < 0 && "rotate-180")} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <ul
                    ref={railRef}
                    role="list"
                    aria-labelledby="aiax-idp-rail-label"
                    onScroll={onRailScroll}
                    onPointerDown={releaseRail}
                    onWheel={releaseRail}
                    onKeyDown={releaseRail}
                    className="relative -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 md:-mx-5 md:scroll-px-5 md:px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden after:block after:shrink-0 after:basis-[calc(14%-8px)] sm:after:basis-[calc(40%-8px)] md:after:basis-[calc(54%-8px)]"
                  >
                    {RAIL.map((c, i) => {
                      const active = i === mIdx;
                      const tone = cardTone(c, resolved);
                      const accent = tone === "review" ? "var(--aiax-human-fill)" : "var(--aiax-ai)";
                      const tint = tone === "review" ? "var(--aiax-tint-human)" : "var(--aiax-tint-ai)";
                      const f = c.fields[0];
                      const phase = phaseOf(FIELDS.indexOf(f));
                      return (
                        <li
                          key={c.key}
                          onClick={(e) => onCardClick(e, i)}
                          className={cn(
                            "flex shrink-0 basis-[86%] snap-start flex-col rounded-xl border p-4 transition-colors duration-300 sm:basis-[60%] md:basis-[46%]",
                            !active && "cursor-pointer border-line",
                          )}
                          style={active ? { borderColor: accent, background: tint } : undefined}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-[15px] font-bold leading-6 text-ink">{c.label}</p>
                            <Reveal phase={phase} bar="w-16">
                              <FieldStatus f={f} chosen={resolved[f.key]} pulse={pulse} />
                            </Reveal>
                          </div>
                          {c.fields.length > 1 ? (
                            // 묶음 카드: 1줄 = 항목 | 추출값, 2줄(카드 폭 전체) = → 공통코드 매핑 · 규칙.
                            // 상태는 넷 다 "규칙 매핑"이라 머리에 한 번만 둡니다.
                            <dl className="mt-1.5 divide-y divide-line">
                              {c.fields.map((g) => {
                                const gPhase = phaseOf(FIELDS.indexOf(g));
                                return (
                                  <div key={g.key} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-2 py-2 first:pt-1 last:pb-0">
                                    <dt className="text-[13px] leading-6 text-body">{g.label}</dt>
                                    <dd className="min-w-0 text-[15px] font-semibold leading-6 text-ink">
                                      <Reveal phase={gPhase} bar="w-[72%]">
                                        <RawValue f={g} />
                                      </Reveal>
                                    </dd>
                                    <dd className="col-span-2 min-w-0 text-[13px] leading-5">
                                      <Reveal phase={gPhase} bar="w-[60%]">
                                        <span aria-hidden="true" className="text-body">
                                          →{" "}
                                        </span>
                                        <span className="sr-only">{IDP.cols[2]}: </span>
                                        <MappingValue f={g} inline />
                                      </Reveal>
                                    </dd>
                                  </div>
                                );
                              })}
                            </dl>
                          ) : (
                            <>
                              <p className="mt-1.5 text-[17px] font-semibold leading-snug text-ink">
                                <Reveal phase={phase} bar="w-[72%]">
                                  <RawValue f={f} />
                                </Reveal>
                              </p>
                              {f.review ? (
                                <ReviewFieldset
                                  className="mt-3"
                                  f={f}
                                  review={f.review}
                                  view="m"
                                  chosen={resolved[f.key]}
                                  disabled={confirmed}
                                  onChoose={(opt) => resolve(f, opt, "m")}
                                />
                              ) : (
                                <dl className="mt-2 flex flex-wrap items-baseline gap-x-2 text-[14px] leading-5">
                                  <dt className="text-[12px] text-body">{IDP.cols[2]}</dt>
                                  <dd className="min-w-0">
                                    <Reveal phase={phase} bar="w-24">
                                      <MappingValue f={f} chosen={resolved[f.key]} inline />
                                    </Reveal>
                                  </dd>
                                </dl>
                              )}
                            </>
                          )}
                          <p className="mt-auto flex items-center gap-2 pt-3 text-[12px] leading-snug text-body">
                            <span
                              aria-hidden="true"
                              className="shrink-0 whitespace-nowrap rounded-[4px] px-1.5 py-0.5 text-[10px] font-bold leading-[1.4]"
                              style={{ background: EV_COLOR[tone].tag, color: "#fff" }}
                            >
                              {IDP.evidenceTag}
                            </span>
                            <span aria-hidden="true">{sectionTitleOf(c.ev)}</span>
                            <span className="sr-only">{cardEvidenceText(c)}</span>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                  <div role="group" aria-label={IDP.railDots} className="mt-2 flex justify-center">
                    {RAIL.map((c, i) => {
                      const active = i === mIdx;
                      return (
                        <button
                          key={c.key}
                          type="button"
                          aria-label={IDP.railGoTo(c.label)}
                          aria-current={active || undefined}
                          onClick={() => goTo(i, c)}
                          className="grid h-6 w-6 place-items-center"
                        >
                          <span
                            aria-hidden="true"
                            className={cn("block h-1.5 rounded-full transition-all duration-300", active ? "w-5" : "w-1.5")}
                            style={{
                              background: cardTone(c, resolved) === "review" ? "var(--aiax-human-fill)" : "var(--aiax-ai)",
                              opacity: active ? 1 : 0.45,
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* ③ 공통 하단 블록(①·② 공용, DOM에 하나만 — id 중복 없음): 상태 문장 + 확정, 처리 기록.
                  lg 미만은 목록 아래 전체 폭, lg 이상은 결과 열 아래(스티키 원문 열과 나란히).
                  확정 후에는 상태 문장이 확정 기록 문장으로 바뀌고(라이브 영역 1곳만 알림), 버튼은 "확정됨" 외곽선 모양으로 가라앉습니다. */}
              <div className="px-4 pb-5 md:px-5 lg:col-start-2 lg:row-start-2 lg:p-0 xl:col-start-3">
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                  <p
                    id="aiax-idp-remaining"
                    aria-live="polite"
                    className={cn(
                      "-mx-2 flex min-w-0 flex-1 basis-64 items-start gap-2 rounded-lg px-2 py-1 text-[14px] leading-relaxed text-ink transition-colors duration-300",
                      confirmed && "bg-[var(--aiax-tint-gate)]",
                    )}
                  >
                    <RoleGlyph
                      role={confirmed ? "gate" : "human"}
                      variant={canConfirm ? "solid" : "pending"}
                      size={12}
                      className="mt-[5px]"
                    />
                    <span>{statusText}</span>
                  </p>
                  <button
                    type="button"
                    aria-disabled={!confirmActive}
                    aria-describedby="aiax-idp-remaining"
                    onClick={confirmActive ? confirm : undefined}
                    className={cn(
                      "relative isolate inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border px-6 text-[14px] font-bold transition-[color,border-color,transform] duration-300 sm:w-auto",
                      confirmed
                        ? "cursor-default border-[var(--aiax-gate)] text-ink"
                        : confirmActive
                          ? "cursor-pointer border-transparent hover:-translate-y-0.5"
                          : "cursor-not-allowed border-line text-body",
                    )}
                    style={confirmActive ? { color: "#000" } : undefined}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -inset-px -z-10 rounded-full transition-opacity duration-300"
                      style={{ ...PRIMARY_STYLE, opacity: confirmActive ? 1 : 0 }}
                    />
                    {confirmed ? (
                      <span className="inline-flex" style={{ color: "var(--aiax-gate)" }}>
                        <CheckIcon />
                      </span>
                    ) : canConfirm ? (
                      <RoleGlyph role="human" size={11} color="currentColor" />
                    ) : (
                      <LockIcon />
                    )}
                    {confirmed ? IDP.confirmed : IDP.confirm}
                  </button>
                </div>

                <details className="group mt-4">
                  <summary className="inline-flex min-h-9 cursor-pointer list-none items-center gap-2 text-[13px] font-semibold text-body [&::-webkit-details-marker]:hidden">
                    {IDP.logTitle}
                    <ArrowIcon direction="down" className="w-3.5 h-3.5 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <ul className="mt-2 space-y-1 text-[13px] text-body">
                    {log.map((entry, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <RoleGlyph role={entry.role} size={10} className="mt-[6px]" />
                        <span>{entry.text}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </div>
          </DemoFrame>
        </div>

        {/* 근거 선택 안내(사용자 조작에만 갱신, 인트로 재생 중에는 읽지 않음) */}
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>

        {/* 메커니즘 3가지: lg 미만은 한 장의 패널에 세 줄(가로 캐러셀 없음), lg 이상은 3열 카드.
            두 변형 중 하나만 CSS로 보이며, 숨은 쪽(display:none)은 낭독되지 않습니다. 진입 모션은 .glass 바깥 래퍼에(A5). */}
        <motion.div
          className="aiax-idpdemo-reveal mt-8 lg:hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_GRID}
        >
          <ul role="list" className="glass glass-static rounded-2xl px-4 md:px-6">
            {IDP.mechanisms.map((m, i) => (
              <li key={m.title} className={cn("py-3.5 md:py-4", i > 0 && "border-t border-line")}>
                <h3 className="flex items-center gap-2.5 text-[17px] font-bold leading-snug text-ink">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: ROLE_TINT[MECH_ROLES[i]] }}
                  >
                    <RoleGlyph role={MECH_ROLES[i]} size={12} />
                  </span>
                  {m.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body md:pl-[38px]">{m.body}</p>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.ul
          role="list"
          className="mt-8 hidden lg:grid lg:grid-cols-3 lg:gap-4"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_GRID}
        >
          {IDP.mechanisms.map((m, i) => (
            <motion.li key={m.title} variants={fadeUp} className="aiax-idpdemo-reveal">
              <article className="glass glass-static h-full rounded-2xl p-6">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: ROLE_TINT[MECH_ROLES[i]] }}
                >
                  <RoleGlyph role={MECH_ROLES[i]} size={14} />
                </span>
                <h3 className="card-title mt-4 font-bold leading-snug text-ink">{m.title}</h3>
                <p className="mt-2 card-body text-body">{m.body}</p>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-6">
          <Link
            href={IDP.ibimsLink.href}
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-navy underline-offset-4 hover:underline"
          >
            {IDP.ibimsLink.label}
            <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

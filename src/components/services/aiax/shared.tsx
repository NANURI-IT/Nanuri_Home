"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/* ═══════════ 1. 모션 ═══════════ */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const VIEWPORT = { once: true, margin: "-80px" } as const;
export const VIEWPORT_GRID = { once: true, margin: "-60px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay: 0.1 } },
};
/**
 * 앵커 대상(id가 붙어 #링크로 이동하는 요소)용 등장 변형: 이동 없이 투명도만 바꿉니다.
 * fadeUp처럼 y 이동이 있으면 smooth scroll이 "아직 아래로 밀려 있는" 위치를 목표로 잡아,
 * 등장이 끝난 뒤 요소가 sticky 바(헤더+서브내비) 아래로 들어갑니다(QA r2: #track-roadmap 100px, #faq-* 112px).
 * id를 움직이지 않는 래퍼에 두고 안쪽만 fadeUp으로 움직여도 됩니다.
 */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};
export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return { hidden: {}, show: { transition: { staggerChildren, delayChildren } } };
}
export const STAMP_SPRING = { type: "spring" as const, stiffness: 320, damping: 18 };

/* ═══════════ 2. 앵커 ═══════════ */
export const AIAX_ID = {
  top: "aiax-top",
  conditions: "conditions",
  pipeline: "pipeline",
  llmValidation: "llm-validation",
  cta: "start",
} as const;

export const SUBNAV_ITEMS: ReadonlyArray<{ id: string; label: string }> = [
  { id: AIAX_ID.conditions, label: "조건" },
  { id: AIAX_ID.pipeline, label: "개발 방식" },
  { id: AIAX_ID.llmValidation, label: "모델 검증" },
];

/* ═══════════ 3. 유틸 ═══════════ */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
/** Space Mono에는 한글 글리프가 없으므로 한글은 Pretendard로 폴백합니다. */
export const MONO: CSSProperties = {
  fontFamily: "var(--font-space-mono), 'Pretendard Variable', var(--font-noto-sans-kr), monospace",
};
export const DISPLAY: CSSProperties = {
  fontFamily: "var(--font-outfit), 'Pretendard Variable', sans-serif",
};

/* ═══════════ 4. 타이포 ═══════════ */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn("aiax-eyebrow inline-block text-[12px] sm:text-[11px] font-bold uppercase tracking-[0.2em]", className)}
      style={MONO}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  titleId,
  align = "left",
  aside,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  titleId: string;
  align?: "left" | "center";
  aside?: ReactNode; // eyebrow 옆에 붙는 상태 알약 등
  className?: string;
}) {
  return (
    <motion.div
      className={cn(align === "center" && "text-center", className)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={fadeUp}
    >
      <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", align === "center" && "justify-center")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        {aside}
      </div>
      <h2 id={titleId} className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight leading-snug text-balance">
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-4 text-[16px] text-body leading-relaxed max-w-2xl text-pretty", align === "center" && "mx-auto")}>
          {lead}
        </p>
      )}
    </motion.div>
  );
}

/* ═══════════ 5. 상태 표식 (무채색) ═══════════ */
export type CaseStatus = "live" | "standard" | "poc" | "proposal" | "demo" | "record" | "prep";

export const STATUS_LABEL: Record<CaseStatus, string> = {
  live: "사내 운영 중",
  standard: "사내 개발 표준",
  poc: "PoC",
  proposal: "제안",
  demo: "시연용 예시",
  record: "검증 기록 요약", // 2차 보강: C6A 검증 보드(실제 판정의 요약·익명화)
  prep: "준비 중", // 2차 보강: C6A 내부망 대비
};

export const STATUS_DEFINITION: Record<CaseStatus, string> = {
  live: "나누리아이티 내부 업무에 실제로 쓰고 있습니다.",
  standard: "사내 개발에 쓰도록 정리한 개발 기준입니다.",
  poc: "개념 검증으로 동작을 확인했으며, 운영 전입니다.",
  proposal: "업무 지식과 검증된 방식을 바탕으로 설계해 드릴 수 있습니다. 아직 구축 사례는 없습니다.",
  demo: "가상의 데이터로 동작 원리를 재현한 화면입니다. 실제 고객·사내 데이터가 아닙니다.",
  record: "사내에서 실제로 진행한 검증의 판정과 이유를 요약·익명화했습니다. 모델명과 측정값은 공개하지 않습니다.",
  prep: "준비하고 있거나 사내에서 먼저 시험하고 있으며, 아직 운영 전입니다.",
};

export function StatusMark({ status, size = 12, className }: { status: CaseStatus; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true" className={cn("shrink-0", className)}>
      {status === "live" && (
        <>
          <circle cx="6" cy="6" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="6" r="2" fill="currentColor" />
        </>
      )}
      {status === "standard" && (
        <>
          <rect x="1.25" y="1.25" width="9.5" height="9.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.6 4.6h4.8M3.6 7.4h4.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
      {status === "poc" && (
        <>
          <circle cx="6" cy="6" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 1.25 A4.75 4.75 0 0 0 6 10.75 Z" fill="currentColor" />
        </>
      )}
      {status === "proposal" && (
        <circle cx="6" cy="6" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 1.8" />
      )}
      {status === "demo" && (
        <rect x="1.25" y="1.25" width="9.5" height="9.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2 1.6" />
      )}
      {status === "record" && (
        <>
          <path d="M2.25 1.25h5l2.5 2.5v7h-7.5z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M4 7l1.4 1.4L8 5.8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {status === "prep" && (
        <>
          <circle cx="6" cy="6" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 1.25 A4.75 4.75 0 0 1 10.75 6 L6 6 Z" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

export function StatusBadge({
  status,
  label,
  prefix,
  size = "sm",
  className,
}: {
  status: CaseStatus;
  label?: string; // 기본은 STATUS_LABEL
  prefix?: string; // 예: "CASE 03" (모노)
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "aiax-status inline-flex items-center gap-1.5 rounded-full whitespace-nowrap font-semibold text-ink",
        size === "sm" ? "px-2.5 py-1 text-[13px] sm:text-[12px]" : "px-3 py-1.5 text-[14px] sm:text-[13px]",
        status === "demo" && "aiax-status-demo",
        className,
      )}
    >
      <StatusMark status={status} size={size === "sm" ? 11 : 12} />
      {prefix && (
        <span className="text-[11px] tracking-[0.12em] text-body" style={MONO}>
          {prefix}
        </span>
      )}
      <span>{label ?? STATUS_LABEL[status]}</span>
    </span>
  );
}

/* ═══════════ 6. 역할 글리프 (유채색) ═══════════ */
export type Role = "ai" | "gate" | "human" | "block";

const PAGE_COLOR: Record<Role, string> = {
  ai: "var(--aiax-ai)",
  gate: "var(--aiax-gate)",
  human: "var(--aiax-human-fill)",
  block: "var(--aiax-block)",
};
const CONSOLE_COLOR: Record<Role, string> = {
  ai: "var(--c-ai)",
  gate: "var(--c-gate)",
  human: "var(--c-human)",
  block: "var(--c-block)",
};

export function RoleGlyph({
  role,
  size = 12,
  variant = "solid",
  palette = "page",
  color,
  className,
}: {
  role: Role;
  size?: number;
  variant?: "solid" | "outline" | "pending"; // pending = 점선 외곽(사람 승인 대기)
  palette?: "page" | "console";
  color?: string; // 강제 색 (예: 도장 안 "currentColor")
  className?: string;
}) {
  const c = color ?? (palette === "console" ? CONSOLE_COLOR[role] : PAGE_COLOR[role]);
  const line = !color && palette === "page" && role === "human" ? "var(--aiax-human)" : c;
  const fill = variant === "solid" ? c : "none";
  const stroke = variant === "solid" ? "none" : line;
  const dash = variant === "pending" ? "2 1.6" : undefined;
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true" className={cn("shrink-0", className)}>
      {role === "ai" && (
        <circle cx="6" cy="6" r={variant === "solid" ? 5 : 4.4} fill={fill} stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
      )}
      {role === "gate" && (
        <rect x="1.5" y="1.5" width="9" height="9" rx="2" fill={fill} stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
      )}
      {role === "human" && (
        <path d="M6 0.9 L11.1 6 L6 11.1 L0.9 6 Z" fill={fill} stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" strokeDasharray={dash} />
      )}
      {role === "block" && (
        <path d="M2.6 2.6 L9.4 9.4 M9.4 2.6 L2.6 9.4" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}

/* ═══════════ 7. 사람 승인: 도장 ═══════════ */
export function ApprovalStamp({
  label = "승인",
  show,
  delay = 0,
  size = "sm",
  className,
}: {
  label?: string;
  show?: boolean; // undefined면 화면에 들어올 때 1회 찍힘
  delay?: number;
  size?: "sm" | "md";
  className?: string; // 위치·여백용. 글자 크기·패딩은 size로만 바꿉니다.
}) {
  const reduce = useReducedMotion();
  const visible = { opacity: 1, scale: 1, rotate: -4 };
  const hidden = { opacity: 0, scale: 0.6, rotate: -10 };
  const transition = reduce ? { duration: 0 } : { ...STAMP_SPRING, delay };
  const cls = cn(
    "aiax-stamp inline-flex items-center gap-1 rounded-[5px] font-bold whitespace-nowrap",
    size === "sm" ? "px-2 py-0.5 text-[12px]" : "px-2.5 py-1 text-[13px]",
    className,
  );
  const content = (
    <>
      <RoleGlyph role="human" size={9} color="currentColor" />
      {label}
    </>
  );
  if (show === undefined) {
    return (
      <motion.span aria-hidden="true" className={cls} initial={hidden} whileInView={visible} viewport={VIEWPORT} transition={transition}>
        {content}
      </motion.span>
    );
  }
  return (
    <motion.span aria-hidden="true" className={cls} initial={false} animate={show ? visible : hidden} transition={transition}>
      {content}
    </motion.span>
  );
}

/* ═══════════ 8. 버튼 · 링크 · 아이콘 ═══════════ */
export function ArrowIcon({ direction = "right", className }: { direction?: "right" | "down"; className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === "right" ? <path d="M5 12h14M12 5l7 7-7 7" /> : <path d="M12 5v14M5 12l7 7 7-7" />}
    </svg>
  );
}

/** <button>에 Primary 모양이 필요하면 이 객체를 style로 씁니다(C2 상담 버튼, C7 확정 버튼). 복사하지 않습니다. */
export const PRIMARY_STYLE: CSSProperties = {
  background: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo))",
  color: "#000",
  boxShadow: "0 4px 24px rgba(0, 212, 255, 0.25)",
};
export const SECONDARY_STYLE: CSSProperties = {
  background: "var(--color-glass-bg)",
  border: "1px solid var(--color-glass-border)",
  color: "var(--color-text-primary)",
  backdropFilter: "blur(12px)",
};
/** SecondaryButton 전용: 1px 테두리를 안쪽 링(inset box-shadow)으로 그려, 테두리 없는 PrimaryButton과 높이·폭이 같게 합니다(2px 차이 제거). */
const SECONDARY_BUTTON_STYLE: CSSProperties = {
  ...SECONDARY_STYLE,
  border: "0",
  boxShadow: "inset 0 0 0 1px var(--color-glass-border)",
};

function ButtonBase({
  href,
  children,
  className,
  style,
  icon,
}: {
  href: string;
  children: ReactNode;
  className: string;
  style: CSSProperties;
  icon: "right" | "down";
}) {
  const inner = (
    <>
      {children}
      <ArrowIcon direction={icon} className={cn("w-4 h-4 transition-transform duration-300", icon === "right" ? "group-hover:translate-x-1" : "group-hover:translate-y-0.5")} />
    </>
  );
  return href.startsWith("#") ? (
    <a href={href} className={className} style={style}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className} style={style}>
      {inner}
    </Link>
  );
}

export function PrimaryButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <ButtonBase
      href={href}
      icon="right"
      style={PRIMARY_STYLE}
      className={cn(
        "group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[15px] font-bold transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </ButtonBase>
  );
}

export function SecondaryButton({
  href,
  children,
  icon = "down",
  className,
}: {
  href: string;
  children: ReactNode;
  icon?: "right" | "down";
  className?: string;
}) {
  return (
    <ButtonBase
      href={href}
      icon={icon}
      style={SECONDARY_BUTTON_STYLE}
      className={cn(
        "group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[15px] font-semibold transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </ButtonBase>
  );
}

export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("font-semibold text-navy underline underline-offset-4 decoration-1 hover:text-ink", className)}
    >
      {children}
      <span className="sr-only"> (새 창)</span>
    </a>
  );
}

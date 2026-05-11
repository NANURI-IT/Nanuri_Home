"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ── Inline SVG icon set (stroke-only, modern) ───────────── */
const Icon = {
  Leaf: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 13-9 1 0 2 0 2 .5 0 8-4 16-9 15.5z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  ),
  Recycle: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 19H4.5a1.5 1.5 0 0 1-1.31-2.27L8 9" />
      <path d="m14 5-1 1H7" />
      <path d="M11 4 8 9l5 0" />
      <path d="M17 5h2.5a1.5 1.5 0 0 1 1.31 2.27L16 14" />
      <path d="m20 14-3 5-3-5" />
    </svg>
  ),
  Wind: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  ),
  Droplet: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.7s5 5 5 9.3a5 5 0 0 1-10 0c0-4.3 5-9.3 5-9.3z" />
    </svg>
  ),
  Factory: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21V10l5 3V8l5 3V8l5 3v10z" />
      <path d="M7 17h.01M11 17h.01M15 17h.01M19 17h.01" />
    </svg>
  ),
  Network: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M12 8v4M12 12 6 16M12 12l6 4" />
    </svg>
  ),
  Globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  ),
  Users: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  ShieldCheck: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  HeartHandshake: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-8-5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-8 11-8 11" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Lock: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  Activity: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  Handshake: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 17 7 13l-3 3 4 4 3-3z" />
      <path d="m13 7 4 4 3-3-4-4-3 3z" />
      <path d="m7 13 5-5 4 4-5 5z" />
    </svg>
  ),
  Building: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 6h.01M14 6h.01M9 10h.01M14 10h.01M9 14h.01M14 14h.01" />
      <path d="M10 22v-4h4v4" />
    </svg>
  ),
  MessageCircle: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
    </svg>
  ),
  Scale: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 16h6l-3-7z" />
      <path d="M2 16h6l-3-7z" />
      <path d="M7 21h10M12 3v18M3 7h18" />
    </svg>
  ),
  FileCheck: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  ),
  Ban: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m4.93 4.93 14.14 14.14" />
    </svg>
  ),
  Eye: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  AlertTriangle: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  UserCheck: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="m17 11 2 2 4-4" />
    </svg>
  ),
  BookOpen: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
};

/* ── Pillar data ─────────────── */
type Pillar = {
  id: "e" | "s" | "g";
  letter: string;
  englishLabel: string;
  title: string;
  description: string;
  accent: string;
  accentSoft: string;
  /** Tailwind/CSS color stops for the photo overlay (RGB triplet, no alpha) */
  overlayRgb: string;
  imageSrc: string;
  imageAlt: string;
  imageFocus: string;
  items: { icon: React.ReactNode; text: string }[];
};

const pillars: Pillar[] = [
  {
    id: "e",
    letter: "E",
    englishLabel: "Environment",
    title: "환경경영",
    description:
      "나누리아이티는 시스템 개발, 구축, 운영 및 서비스 제공 과정에서 발생할 수 있는 환경 리스크를 최소화하고, 에너지 절약과 자원 절감 중심의 환경 경영을 실천하고자 합니다.",
    accent: "var(--color-accent-emerald)",
    accentSoft: "rgba(16, 185, 129, 0.12)",
    overlayRgb: "5, 46, 32",
    imageSrc: `${basePath}/images/esg/${encodeURIComponent("환경")}.jpg`,
    imageAlt: "푸른 숲의 항공 사진 — 환경경영을 상징하는 자연 풍경",
    imageFocus: "center",
    items: [
      { icon: Icon.FileCheck, text: "환경 관련 법규 및 요구사항 준수" },
      { icon: Icon.Activity, text: "에너지 사용량 절감 노력" },
      { icon: Icon.Wind, text: "온실가스 배출 저감 활동" },
      { icon: Icon.Recycle, text: "폐기물 발생 최소화 및 재활용 확대" },
      { icon: Icon.Factory, text: "유해물질 및 대기오염물질 관리" },
    ],
  },
  {
    id: "s",
    letter: "S",
    englishLabel: "Social",
    title: "사회책임경영",
    description:
      "나누리아이티는 노동인권, 개인정보 보호, 안전보건, 공정거래를 사회책임경영의 핵심 영역으로 삼고, 구성원과 고객, 협력사, 지역사회가 함께 성장할 수 있는 책임경영을 지향합니다.",
    accent: "var(--color-accent-cyan)",
    accentSoft: "rgba(0, 212, 255, 0.12)",
    overlayRgb: "8, 32, 56",
    imageSrc: `${basePath}/images/esg/${encodeURIComponent("사회")}.jpg`,
    imageAlt: "함께 일하는 사람들의 모습 — 사회책임경영을 상징하는 협업 이미지",
    imageFocus: "center",
    items: [
      { icon: Icon.Users, text: "노동인권 보호 및 차별 금지" },
      { icon: Icon.HeartHandshake, text: "괴롭힘 방지와 인도적 대우 보장" },
      { icon: Icon.Lock, text: "개인정보 보호 및 정보주체 권리 보장" },
      { icon: Icon.ShieldCheck, text: "안전하고 건강한 근무환경 조성" },
      { icon: Icon.Handshake, text: "협력사와의 공정거래 및 상생" },
      { icon: Icon.MessageCircle, text: "고충처리 절차 및 신고자 보호 원칙 운영" },
    ],
  },
  {
    id: "g",
    letter: "G",
    englishLabel: "Governance",
    title: "윤리·준법경영",
    description:
      "나누리아이티는 공정하고 투명한 경영을 위해 윤리경영 원칙을 수립하고, 고객·협력사·임직원 등 모든 이해관계자와의 신뢰를 바탕으로 책임 있는 기업문화를 만들어가고 있습니다.",
    accent: "var(--color-accent-indigo)",
    accentSoft: "rgba(99, 102, 241, 0.12)",
    overlayRgb: "20, 22, 48",
    imageSrc: `${basePath}/images/esg/${encodeURIComponent("윤리")}.jpg`,
    imageAlt: "정연한 건축 구조 — 윤리·준법경영을 상징하는 신뢰의 이미지",
    imageFocus: "center",
    items: [
      { icon: Icon.Scale, text: "공정하고 투명한 업무 수행" },
      { icon: Icon.UserCheck, text: "고객, 협력사, 임직원에 대한 책임 이행" },
      { icon: Icon.Ban, text: "금품·향응 수수 및 부당청탁 금지" },
      { icon: Icon.Eye, text: "이해상충 방지 및 회사 자산 보호" },
      { icon: Icon.AlertTriangle, text: "비윤리 행위 신고체계 운영" },
      { icon: Icon.Lock, text: "신고자 비밀보장 및 보복 금지" },
    ],
  },
];

export default function EsgPillars() {
  return (
    <>
      {pillars.map((p, idx) => (
        <section
          key={p.id}
          id={`esg-${p.id}`}
          className="relative py-12 md:py-20 px-6 overflow-hidden scroll-mt-24"
        >
          <div className="relative max-w-6xl mx-auto">
            {/* Celltrion-style full-bleed hero card */}
            <motion.div
              className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] md:rounded-[44px] shadow-2xl"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={item}
            >
              {/* Background photo */}
              <div className="absolute inset-0">
                <Image
                  src={p.imageSrc}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
                  className="object-cover"
                  style={{ objectPosition: p.imageFocus }}
                  priority={idx === 0}
                />
              </div>

              {/* Dark gradient overlay tinted with pillar color */}
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background: `linear-gradient(125deg, rgba(${p.overlayRgb}, 0.92) 0%, rgba(${p.overlayRgb}, 0.78) 38%, rgba(${p.overlayRgb}, 0.55) 70%, rgba(${p.overlayRgb}, 0.4) 100%)`,
                }}
              />
              {/* Bottom fade for legibility */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
                }}
              />

              {/* Watermark letter */}
              <span
                className="pointer-events-none select-none absolute -bottom-10 sm:-bottom-16 -right-2 sm:-right-4 leading-none"
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(14rem, 32vw, 28rem)",
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.35)",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.06em",
                  opacity: 0.5,
                }}
              >
                {p.letter}
              </span>

              {/* Content */}
              <div className="relative grid md:grid-cols-[auto_1fr] gap-y-6 md:gap-x-12 lg:gap-x-20 p-7 sm:p-10 md:p-14 lg:p-16 min-h-[420px] md:min-h-[460px]">
                {/* Left: Step + huge title */}
                <div className="md:max-w-[280px] flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="text-[11px] sm:text-[12px] tracking-[0.22em] font-bold uppercase"
                      style={{
                        color: p.accent,
                        fontFamily: "var(--font-space-mono), monospace",
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")} · {p.englishLabel}
                    </span>
                    <span
                      className="h-px flex-1 max-w-[60px]"
                      style={{
                        background: `linear-gradient(to right, ${p.accent}, transparent)`,
                      }}
                    />
                  </div>

                  <h2
                    className="font-black tracking-tight leading-[1.05] mt-auto"
                    style={{
                      color: p.accent,
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: "clamp(2.4rem, 5.8vw, 4rem)",
                      textShadow: "0 2px 24px rgba(0,0,0,0.35)",
                    }}
                  >
                    {p.title}
                  </h2>
                </div>

                {/* Right: Description */}
                <div className="md:pt-2 flex flex-col justify-end md:justify-start">
                  <p
                    className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] max-w-2xl"
                    style={{
                      color: "rgba(255, 255, 255, 0.92)",
                      textShadow: "0 1px 12px rgba(0,0,0,0.35)",
                    }}
                  >
                    {p.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Items grid */}
            <motion.ul
              className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {p.items.map((it, i) => (
                <motion.li
                  key={i}
                  variants={item}
                  className="glass glass-static group relative rounded-2xl overflow-hidden p-6"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: p.accentSoft,
                        color: p.accent,
                      }}
                    >
                      {it.icon}
                    </div>
                    <div className="flex-1">
                      <span
                        className="text-[11px] tracking-[0.18em] font-bold"
                        style={{
                          color: p.accent,
                          fontFamily: "var(--font-space-mono), monospace",
                        }}
                      >
                        {p.letter}.{String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-2 card-body text-ink leading-relaxed">
                        {it.text}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      ))}
    </>
  );
}

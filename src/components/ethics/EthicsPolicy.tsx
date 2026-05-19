"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const ETHICS_PDF = `${basePath}/docs/${encodeURIComponent("윤리경영정책")}.pdf`;

const CEO_SIGNATURE = `${basePath}/docs/${encodeURIComponent(
  "대표이사_사인_투명배경"
)}.png`;

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ────────────── Data ────────────── */

const ceoPromises = [
  "모든 이해관계자에게 공정하고 투명한 경영을 실현합니다.",
  "뇌물수수, 부패행위, 부당이익 추구 등 일체의 비윤리적 행태를 금지합니다.",
  "깨끗한 거래 관행을 확립하고 반공정경쟁 행위를 근절합니다.",
  "이해관계자의 권익과 정보를 철저히 보호합니다.",
  "윤리규범 위반 신고자를 보호하고 어떠한 불이익도 가하지 않습니다.",
];

const corePrinciples = [
  {
    title: "정직 (Integrity)",
    desc: "모든 업무 수행 과정에서 정직과 성실을 최우선의 가치로 삼습니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "공정 (Fairness)",
    desc: "모든 이해관계자를 공정하게 대우하고 차별 없는 거래를 실천합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 16h6l-3-7z" />
        <path d="M2 16h6l-3-7z" />
        <path d="M7 21h10M12 3v18M3 7h18" />
      </svg>
    ),
  },
  {
    title: "투명 (Transparency)",
    desc: "회계와 정보 공개에 있어 투명성을 유지하며 신뢰를 구축합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "책임 (Responsibility)",
    desc: "기업 활동의 사회적·법적 책임을 성실히 이행합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 7L9 18l-5-5" />
      </svg>
    ),
  },
  {
    title: "준법 (Compliance)",
    desc: "관련 법규와 사내 규정을 철저히 준수하며 비윤리 행위를 단호히 금지합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
  },
];

const corePolicies = [
  {
    no: "01",
    title: "임직원의 사익편취 금지",
    desc: "임직원은 회사의 자원·정보·지위를 이용하여 개인적 이익을 추구하지 않으며, 회사의 이익과 충돌하는 사적 행위를 금지합니다.",
  },
  {
    no: "02",
    title: "임직원의 뇌물수수 및 청탁 금지",
    desc: "직무와 관련하여 어떠한 형태의 금품, 향응, 편의 제공이나 부당한 청탁을 주고받지 않으며, 「청탁금지법」을 엄정히 준수합니다.",
  },
  {
    no: "03",
    title: "회사·고객의 비밀정보 및 내부정보 보호",
    desc: "고객 정보, 영업 비밀, 미공개 내부정보 등 회사가 보유한 모든 정보를 안전하게 보호하며, 무단 유출·외부 공유를 엄격히 금지합니다.",
  },
  {
    no: "04",
    title: "임직원의 부패행위 금지",
    desc: "임직원의 지위를 이용한 모든 형태의 부패 행위를 금지하며, 공정한 직무 수행과 윤리적 행동 기준을 준수합니다.",
  },
  {
    no: "05",
    title: "임직원의 횡령·배임 금지",
    desc: "회사 자산의 사적 유용, 부당한 의사결정으로 회사에 손해를 끼치는 행위를 일체 금지하며, 발견 시 엄정하게 조치합니다.",
  },
  {
    no: "06",
    title: "미공개 내부정보를 활용한 불공정 행위 금지",
    desc: "직무상 알게 된 미공개 정보를 이용한 주식 거래, 부당이익 취득 등 일체의 불공정 행위를 금지합니다.",
  },
  {
    no: "07",
    title: "임직원의 자금세탁 및 내부자 거래 금지",
    desc: "자금세탁, 내부자 거래 등 금융 관련 부정 행위를 금지하며, 관련 법규를 철저히 준수합니다.",
  },
  {
    no: "08",
    title: "공정거래 및 공정경쟁",
    desc: "「공정거래법」을 준수하여 부당한 공동행위, 거래 거절, 가격 담합 등을 금지하고 자유롭고 공정한 경쟁 질서를 확립합니다.",
  },
  {
    no: "09",
    title: "불법·비윤리적 행위 발생 시 보고 및 내부고발 보호",
    desc: "임직원은 불법·비윤리적 행위 발견 시 즉시 회사에 보고할 책임을 지며, 회사는 신고자에게 어떠한 불이익도 가해지지 않도록 보호합니다.",
  },
];

const stakeholders = [
  {
    label: "고객",
    desc: "고객의 권익을 최우선으로 하며, 정확하고 신뢰할 수 있는 서비스를 제공합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
      </svg>
    ),
  },
  {
    label: "주주",
    desc: "회사 가치 제고를 위해 노력하며, 투명한 정보 공시와 의사소통을 약속합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 4 5-7" />
      </svg>
    ),
  },
  {
    label: "협력사",
    desc: "공정한 거래와 상호 신뢰를 바탕으로 함께 성장하는 동반자 관계를 유지합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 17 7 13l-3 3 4 4 3-3z" />
        <path d="m13 7 4 4 3-3-4-4-3 3z" />
        <path d="m7 13 5-5 4 4-5 5z" />
      </svg>
    ),
  },
  {
    label: "임직원",
    desc: "임직원의 인권을 존중하고, 안전하고 건강하게 일할 수 있는 환경을 조성합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "경쟁사",
    desc: "자유롭고 공정한 시장 질서를 존중하며, 정정당당한 경쟁을 통해 산업 발전에 기여합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: "사회",
    desc: "법규 준수와 사회적 책임 이행을 통해 신뢰받는 기업시민의 역할을 다합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </svg>
    ),
  },
];

const governance = [
  {
    role: "대표이사",
    tag: "Executive",
    duty: "윤리경영의 최종 책임자로서 정책 수립과 실천을 총괄합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 4l3 12h14l3-12-6 7-4-9-4 9-6-7z" />
        <path d="M5 21h14" />
      </svg>
    ),
  },
  {
    role: "경영지원실",
    tag: "Operations",
    duty: "윤리경영 정책 운영, 신고·접수, 교육 및 점검을 담당합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    role: "내부감사인",
    tag: "Audit",
    duty: "윤리경영 정책 준수 여부에 대한 독립적 점검과 감사를 수행합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
        <path d="m8 11 2 2 4-4" />
      </svg>
    ),
  },
  {
    role: "전 임직원",
    tag: "All Employees",
    duty: "윤리경영 정책을 이해하고 자발적으로 준수할 책임을 가집니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function EthicsPolicy() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden">
        <div className="orb-float absolute top-[10%] left-[8%] w-72 h-72 bg-navy/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="orb-float-reverse absolute bottom-[10%] right-[8%] w-80 h-80 bg-gold/[0.04] rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

        <motion.div
          className="relative max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={item}
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{
              color: "var(--color-accent-cyan)",
              fontFamily: "var(--font-space-mono), monospace",
            }}
          >
            Code of Ethics & Anti-Corruption Policy
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-[44px] font-bold text-ink leading-[1.15] tracking-tight">
            <span className="gradient-text">윤리경영</span> 정책
          </h1>
          <p className="mt-6 text-[16px] sm:text-[17px] text-body leading-relaxed max-w-2xl mx-auto">
            나누리아이티는 모든 이해관계자에게 신뢰받는 기업이 되기 위해
            윤리경영을 실천합니다.
          </p>

          {/* PDF open in new tab */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={ETHICS_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[14px] font-bold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo))",
                color: "#000",
                boxShadow: "0 4px 20px rgba(0, 212, 255, 0.25)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M15 13H9M15 17H9M11 9H9" />
              </svg>
              윤리경영 정책 PDF 보기
            </a>
            <Link
              href="/esg/ethics/report"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "var(--color-glass-bg)",
                border: "1px solid var(--color-glass-border)",
                color: "var(--color-text-primary)",
                backdropFilter: "blur(12px)",
              }}
            >
              윤리 신고하기
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ───────── CEO Message ───────── */}
      <section className="py-14 md:py-24 px-6 relative overflow-hidden">
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <div
            className="rounded-2xl p-px overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,255,0.22), rgba(99,102,241,0.18), rgba(16,185,129,0.16))",
            }}
          >
            <div className="glass glass-static rounded-2xl p-8 sm:p-12 md:p-14 relative">
              <span
                className="text-[11px] tracking-[0.2em] font-bold uppercase"
                style={{
                  color: "var(--color-accent-cyan)",
                  fontFamily: "var(--font-space-mono), monospace",
                }}
              >
                CEO Message
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl md:text-[28px] font-bold text-ink tracking-tight leading-snug">
                「 신뢰받는 기업, 깨끗한 나누리아이티 」
              </h2>

              <div className="mt-8 space-y-4 card-body text-body">
                <p>
                  (주)나누리아이티에 따뜻한 관심을 보내주시는 고객, 주주, 협력사, 임직원,
                  그리고 모든 이해관계자 여러분께 깊은 감사의 말씀을 드립니다.
                </p>
                <p>
                  오늘날 기업은 단순한 경제적 성과를 넘어 사회적 책임을 이행하고 윤리적
                  가치를 실현해야 하는 시대를 맞이하고 있습니다. (주)나누리아이티는 정직과
                  신뢰를 기업 경영의 근본으로 삼고, 모든 임직원이 깨끗한 기업문화 속에서
                  준법정신과 공정경쟁의 원칙을 지키며 일할 수 있도록 윤리경영을 핵심
                  경영가치로 천명합니다.
                </p>
                <p>당사는 모든 이해관계자 여러분께 다음과 같이 약속드립니다.</p>
              </div>

              {/* 5 promises */}
              <div className="mt-10">
                <h3
                  className="text-[12px] tracking-[0.18em] font-bold uppercase mb-4"
                  style={{
                    color: "var(--color-accent-cyan)",
                    fontFamily: "var(--font-space-mono), monospace",
                  }}
                >
                  CEO의 5대 약속
                </h3>
                <ul className="space-y-3">
                  {ceoPromises.map((p, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(0, 212, 255, 0.15)", color: "var(--color-accent-cyan)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <p className="card-body text-body">{p}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-10 card-body text-body">
                앞으로도 (주)나누리아이티는 지속가능한 성장을 위한 윤리경영 실천에 최선을
                다할 것이며, 여러분의 변함없는 관심과 지원을 부탁드립니다.
              </p>

              {/* Signature — bottom center */}
              <div className="mt-12 pt-8 border-t flex flex-col items-center gap-3" style={{ borderColor: "var(--color-glass-border)" }}>
                <p className="card-meta text-dim">주식회사 나누리아이티</p>
                <p className="text-[18px] font-bold text-ink">대표이사 신미선</p>
                <div className="relative h-16 w-40">
                  <Image
                    src={CEO_SIGNATURE}
                    alt="나누리아이티 대표이사 신미선 서명"
                    fill
                    sizes="160px"
                    className="object-contain ceo-signature-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ───────── Vision & Core Principles ───────── */}
      <section className="py-14 md:py-24 px-6 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={item}
          >
            <span className="text-xs font-semibold text-navy tracking-widest uppercase">
              Vision & Principles
            </span>
            <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">
              윤리경영 비전 및 5대 핵심 원칙
            </h2>
            <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
              나누리아이티는 정직·공정·투명·책임·준법을 핵심 원칙으로 삼아, 모든 이해관계자에게
              신뢰받는 기업이 되기 위한 윤리경영을 실천합니다.
            </p>
          </motion.div>

          <motion.ul
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {corePrinciples.map((p, i) => (
              <motion.li
                key={p.title}
                variants={item}
                className="glass glass-static rounded-2xl p-6 group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: "rgba(0, 212, 255, 0.12)", color: "var(--color-accent-cyan)" }}
                >
                  {p.icon}
                </div>
                <span
                  className="text-[11px] tracking-[0.16em] font-bold"
                  style={{
                    color: "var(--color-accent-cyan)",
                    fontFamily: "var(--font-space-mono), monospace",
                  }}
                >
                  0{i + 1}
                </span>
                <h3 className="mt-1 text-[17px] font-bold text-ink leading-snug">{p.title}</h3>
                <p className="mt-2 text-[14px] text-body leading-relaxed">{p.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ───────── 9 Core Policies ───────── */}
      <section id="policies" className="py-14 md:py-24 px-6 relative overflow-hidden scroll-mt-24">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={item}
          >
            <span className="text-xs font-semibold text-navy tracking-widest uppercase">
              9 Core Policies
            </span>
            <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">
              9대 윤리경영 정책
            </h2>
            <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
              나누리아이티는 다음 9개 핵심 영역을 윤리경영의 의무 사항으로 정의하고
              전 임직원의 준수를 요구합니다.
            </p>
          </motion.div>

          <motion.ul
            className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {corePolicies.map((p) => (
              <motion.li
                key={p.no}
                variants={item}
                className="glass glass-static rounded-2xl p-6 sm:p-7 group relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="font-black tracking-tight leading-none shrink-0"
                    style={{
                      color: "var(--color-accent-cyan)",
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: "2.4rem",
                      opacity: 0.85,
                    }}
                  >
                    {p.no}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[16px] sm:text-[17px] font-bold text-ink leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-body leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ───────── Stakeholder Commitments ───────── */}
      <section className="py-14 md:py-24 px-6 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={item}
          >
            <span className="text-xs font-semibold text-navy tracking-widest uppercase">
              Stakeholder Commitments
            </span>
            <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">
              이해관계자에 대한 약속
            </h2>
            <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
              나누리아이티는 고객·주주·협력사·임직원·경쟁사·사회 모든 이해관계자에 대한
              책임을 명확히 정의하고 이를 성실히 이행합니다.
            </p>
          </motion.div>

          <motion.ul
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {stakeholders.map((s) => (
              <motion.li
                key={s.label}
                variants={item}
                className="glass glass-static rounded-2xl p-6 flex items-start gap-4"
              >
                <div
                  className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0, 212, 255, 0.12)", color: "var(--color-accent-cyan)" }}
                >
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[16px] font-bold text-ink">{s.label}</h3>
                  <p className="mt-1.5 text-[14px] text-body leading-relaxed">{s.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ───────── Governance ───────── */}
      <section className="py-14 md:py-24 px-6 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={item}
          >
            <span className="text-xs font-semibold text-navy tracking-widest uppercase">
              Governance
            </span>
            <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">
              윤리경영 추진 체계
            </h2>
            <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
              나누리아이티는 명확한 역할과 책임 구조를 통해 윤리경영 정책의 실효성을
              담보합니다.
            </p>
          </motion.div>

          <motion.ul
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {governance.map((g, i) => (
              <motion.li
                key={g.role}
                variants={item}
                className="glass glass-static group relative rounded-2xl p-7 sm:p-8 overflow-hidden"
              >
                {/* Big watermark number */}
                <span
                  className="pointer-events-none select-none absolute -top-3 -right-2 leading-none font-black tracking-tighter"
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "7rem",
                    WebkitTextStroke: "1.5px var(--color-accent-cyan)",
                    WebkitTextFillColor: "transparent",
                    opacity: 0.18,
                    letterSpacing: "-0.06em",
                  }}
                >
                  0{i + 1}
                </span>

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(0, 212, 255, 0.12)",
                      color: "var(--color-accent-cyan)",
                    }}
                  >
                    {g.icon}
                  </div>

                  {/* Tag */}
                  <span
                    className="text-[11px] tracking-[0.18em] font-bold uppercase"
                    style={{
                      color: "var(--color-accent-cyan)",
                      fontFamily: "var(--font-space-mono), monospace",
                    }}
                  >
                    {g.tag}
                  </span>

                  {/* Role */}
                  <h3 className="mt-1 text-[18px] sm:text-[20px] font-bold text-ink leading-snug">
                    {g.role}
                  </h3>

                  {/* Duty */}
                  <p className="mt-3 text-[14px] sm:text-[15px] text-body leading-relaxed">
                    {g.duty}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ───────── Report CTA ───────── */}
      <section className="py-14 md:py-24 px-6 relative overflow-hidden">
        <motion.div
          className="relative max-w-5xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <div
            className="rounded-3xl p-px overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(244,63,94,0.3), rgba(99,102,241,0.2), rgba(0,212,255,0.2))",
            }}
          >
            <div className="glass glass-static rounded-3xl p-8 sm:p-12 md:p-14 relative">
              <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <span
                    className="text-[11px] tracking-[0.18em] font-bold uppercase"
                    style={{
                      color: "var(--color-accent-rose)",
                      fontFamily: "var(--font-space-mono), monospace",
                    }}
                  >
                    Whistleblower Channel
                  </span>
                  <h2 className="mt-3 text-2xl sm:text-[28px] md:text-[32px] font-bold text-ink tracking-tight leading-snug">
                    윤리경영 위반 사항을 발견하셨나요?
                  </h2>
                  <p className="mt-3 text-[15px] text-body leading-relaxed max-w-2xl">
                    뇌물수수, 청탁, 정보 유출, 부패·횡령, 불공정 거래 등 윤리경영 위반 사항은
                    누구나 익명으로 신고하실 수 있습니다. 신고자의 신원과 신고 내용은
                    철저히 보호됩니다.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-body">
                    <span className="inline-flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent-cyan)" }} aria-hidden="true">
                        <path d="m22 6-10 7L2 6" />
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                      </svg>
                      <a href="mailto:info@nanuriit.kr" className="hover:text-ink transition-colors">info@nanuriit.kr</a>
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent-cyan)" }} aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.95.36 1.88.7 2.78a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.83.57 2.78.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <a href="tel:02-6959-0319" className="hover:text-ink transition-colors">02.6959.0319</a>
                    </span>
                  </div>
                </div>

                <Link
                  href="/esg/ethics/report"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[15px] font-bold transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent-rose), var(--color-accent-indigo))",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(244, 63, 94, 0.25)",
                  }}
                >
                  신고 페이지로 이동
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ───────── Footer Meta ───────── */}
      <section className="pb-20 md:pb-28 px-6">
        <motion.div
          className="max-w-4xl mx-auto pt-10 border-t"
          style={{ borderColor: "var(--color-glass-border)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-[13px] text-dim leading-relaxed">
            <span>
              <span className="font-semibold text-body">공시일</span> 2026.05.19
            </span>
            <span>
              <span className="font-semibold text-body">제정·관리</span> 경영지원실 (info@nanuriit.kr)
            </span>
            <span>
              <span className="font-semibold text-body">개정주기</span> 연 1회 정기 검토
            </span>
          </div>

          <div className="mt-6">
            <a
              href={ETHICS_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-semibold transition-colors duration-300 hover:text-[color:var(--color-accent-cyan)]"
              style={{ color: "var(--color-text-primary)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M15 13H9M15 17H9M11 9H9" />
              </svg>
              윤리경영 정책 PDF 보기
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}

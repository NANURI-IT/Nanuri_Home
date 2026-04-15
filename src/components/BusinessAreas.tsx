"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const heroArea = {
  title: "금융 SI",
  english: "Financial System Integration",
  href: "/services/financial-si",
  description:
    "계좌/출납/뱅킹 시스템 및 청약/관리 시스템, 주문/체결/결제 시스템을 제공하며 유가증권관리 및 금융상품, 영업 관리, 고객 관리, 여신 등 시스템을 제공합니다.",
  icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
};

type SubArea = {
  title: string;
  english: string;
  href: string | null;
  description: string;
  icon: React.ReactNode;
  accent: string; // CSS var
  accentRgb: string; // "r,g,b" for rgba use
  tag: string;
};

const subAreas: SubArea[] = [
  {
    title: "IB 시스템",
    english: "IBIMS",
    href: "/services/ibims",
    description:
      "초기 Deal 소싱단계에서의 사전 영업부터 성과관리 운영까지 투자은행 업무와 관련한 일체의 영업활동을 지원하는 솔루션입니다.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
    accent: "var(--color-accent-indigo)",
    accentRgb: "99, 102, 241",
    tag: "Deal Sourcing · Performance",
  },
  {
    title: "고유자산",
    english: "Proprietary Trading",
    href: "/services/proprietary",
    description:
      "고유자산을 효율적으로 관리하고, 성장시킬 수 있도록 지원하며, 리스크 관리를 강화할 수 있습니다. 수익성을 높일 수 있는 최적의 시스템을 통해 거래 전략을 수립하고 관리할 수 있습니다.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>,
    accent: "var(--color-accent-emerald)",
    accentRgb: "16, 185, 129",
    tag: "Risk Mgmt · Strategy",
  },
  {
    title: "토큰증권",
    english: "Security Token Offering",
    href: "/services/sto",
    description:
      "토큰증권 발행 다수 분산원장(메인넷)의 난립, 여러 발행사 및 유통사간 상호 연결 문제를 해결할 수 있습니다. 적은 비용, 빠른 시간 내 기존 증권시스템과 연계된 통합 서비스 환경을 제공합니다.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    accent: "var(--color-accent-rose)",
    accentRgb: "244, 63, 94",
    tag: "Blockchain · DLT · Token",
  },
  {
    title: "회계 서비스",
    english: "Accounting Service",
    href: "/services/accounting",
    description:
      "30년 경력 이상의 업계 전문가들로 구성되어 금융 회계 시스템 구축, 운영 노하우를 바탕으로 회계 전반의 컨설팅, 구축 운영까지 고객이 필요로 하는 모든 서비스를 제공합니다.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1zM8 10h8M8 14h4" /></svg>,
    accent: "var(--color-accent-amber)",
    accentRgb: "245, 158, 11",
    tag: "IFRS · Consulting",
  },
  {
    title: "채널 서비스",
    english: "Channel Service",
    href: "/services/channel",
    description:
      "은행, 증권사, 저축은행 등 금융기관 모바일 및 인터넷 사용자 서비스를 위한 MTS, HTS, WTS 등 환경에 따른 맞춤 개발을 진행합니다.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path d="M12 18h.01" /></svg>,
    accent: "var(--color-accent-cyan)",
    accentRgb: "0, 212, 255",
    tag: "MTS · HTS · WTS",
  },
  {
    title: "퇴직연금",
    english: "Retirement Pension",
    href: null,
    description:
      "퇴직연금 제도 운영에 필요한 가입·운용·지급 관리 시스템을 구축합니다. DC/DB/IRP 등 다양한 퇴직연금 상품을 체계적으로 관리할 수 있는 환경을 제공합니다.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" /><path d="M3 21h18" /><path d="M9 7h6M9 11h6M9 15h4" /></svg>,
    accent: "var(--color-accent-indigo)",
    accentRgb: "99, 102, 241",
    tag: "DB · DC · IRP",
  },
];

export default function BusinessAreas() {
  return (
    <section id="business" className="py-24 px-6 relative overflow-hidden scroll-mt-20">
      <div className="orb-float-slow absolute -top-20 -right-20 w-80 h-80 bg-navy/[0.03] rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Business Areas</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">사업영역</h2>
          <p className="mt-4 text-[15px] text-body max-w-lg mx-auto leading-relaxed">
            증권, 은행 등 금융 산업의 핵심 서비스들을 제공하고 있습니다.
          </p>
        </motion.div>

        {/* Hero: 금융 SI */}
        <motion.div
          className="mt-16 rounded-2xl p-px overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.25), rgba(99,102,241,0.2), rgba(16,185,129,0.2))" }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <Link
            href={heroArea.href}
            className="glass group rounded-2xl relative overflow-hidden block transition-shadow duration-500"
          >
            <div className="orb-float absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-[100px]" />
            <div className="orb-float-reverse absolute bottom-[10%] right-[10%] w-[200px] h-[200px] bg-gold/[0.06] rounded-full blur-[80px]" />

            <div className="relative flex flex-col md:flex-row md:items-center gap-8 p-8 md:p-12">
              <div className="shrink-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.08] border border-white/[0.1] rounded-full mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-40 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                  </span>
                  <span className="text-[11px] font-medium text-body">Core Business</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/[0.08] flex items-center justify-center text-gold">
                  {heroArea.icon}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">{heroArea.title}</h3>
                <p className="mt-1 text-[12px] text-dim tracking-wider font-medium uppercase">{heroArea.english}</p>
                <p className="mt-5 text-[15px] text-body leading-relaxed max-w-2xl">{heroArea.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-gold group-hover:gap-3 transition-all duration-300">
                  자세히 보기
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Sub-area cards */}
        <motion.div
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {subAreas.map((area) => {
            const cardInner = (
              <div className="relative z-10 p-7 h-full flex flex-col">
                {/* Icon box with accent color + blur glow */}
                <div
                  className="relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-400"
                  style={{
                    background: `rgba(${area.accentRgb}, 0.12)`,
                    color: area.accent,
                  }}
                >
                  {area.icon}
                  <span
                    className="absolute -inset-1.5 rounded-2xl opacity-35 -z-10 blur-xl"
                    style={{ background: `rgba(${area.accentRgb}, 0.5)` }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 text-[17px] font-bold text-ink" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
                  {area.title}
                </h3>
                <p
                  className="mt-1 text-[10px] uppercase tracking-[0.1em] font-medium opacity-70"
                  style={{ color: area.accent, fontFamily: "var(--font-space-mono), monospace" }}
                >
                  {area.english}
                </p>
                <p className="mt-4 text-[13px] text-body leading-[1.75] flex-1">
                  {area.description}
                </p>
                {area.href ? (
                  <div className="mt-5 flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                      style={{ color: area.accent, fontFamily: "var(--font-space-mono), monospace" }}
                    >
                      {area.tag}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold group-hover:gap-2.5 transition-all duration-300"
                      style={{ color: area.accent }}
                    >
                      자세히 보기
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] text-dim uppercase tracking-wider">
                    <span className="w-1 h-1 rounded-full bg-dim" />
                    Coming Soon
                  </span>
                )}
              </div>
            );

            const cardClass = "glass group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1";

            return area.href ? (
              <motion.div key={area.title} variants={item}>
                <Link href={area.href} className={`${cardClass} block h-full`}>
                  {cardInner}
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={area.title}
                variants={item}
                className={`${cardClass} cursor-default`}
              >
                {cardInner}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

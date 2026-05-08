"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function EsgHero() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 px-6 overflow-hidden">
      {/* Mesh gradient SVG background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="esg-mesh-1" cx="20%" cy="30%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-emerald)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-accent-emerald)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="esg-mesh-2" cx="80%" cy="40%" r="55%">
            <stop offset="0%" stopColor="var(--color-accent-cyan)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--color-accent-cyan)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="esg-mesh-3" cx="55%" cy="85%" r="45%">
            <stop offset="0%" stopColor="var(--color-accent-indigo)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-accent-indigo)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#esg-mesh-1)" />
        <rect width="1200" height="600" fill="url(#esg-mesh-2)" />
        <rect width="1200" height="600" fill="url(#esg-mesh-3)" />
      </svg>

      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      {/* Floating orbs */}
      <div
        className="orb-float absolute top-[15%] left-[8%] w-72 h-72 rounded-full blur-3xl"
        style={{ background: "rgba(16, 185, 129, 0.06)" }}
        aria-hidden="true"
      />
      <div
        className="orb-float-reverse absolute bottom-[10%] right-[8%] w-80 h-80 rounded-full blur-3xl"
        style={{ background: "rgba(99, 102, 241, 0.06)" }}
        aria-hidden="true"
      />

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
          ESG Management
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl md:text-[44px] font-bold text-ink leading-[1.15] tracking-tight">
          지속가능한 미래를 위한
          <br />
          <span className="gradient-text">ESG 경영</span>
        </h1>

        <p className="mt-6 text-[16px] sm:text-[17px] text-body leading-relaxed max-w-2xl mx-auto">
          나누리아이티는 지속가능한 기업문화를 정착시키기 위해
          <br />
          환경경영, 사회책임경영, 윤리·준법경영에 대한 관리체계를 만들어나갑니다.
        </p>

        <p className="mt-4 text-[15px] text-dim leading-relaxed max-w-2xl mx-auto">
          당사는 환경 리스크 저감, 임직원 인권 보호, 개인정보 보호, 안전보건, 공정거래,
          협력사 상생, 부패방지 및 윤리경영 실천을 주요 관리 영역으로 삼고 있으며,
          고객과 임직원, 협력사, 지역사회로부터 신뢰받는 기업이 되고자 합니다.
        </p>

        {/* E·S·G chip row */}
        <div className="mt-10 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {[
            { letter: "E", label: "Environment", color: "var(--color-accent-emerald)" },
            { letter: "S", label: "Social", color: "var(--color-accent-cyan)" },
            { letter: "G", label: "Governance", color: "var(--color-accent-indigo)" },
          ].map((p) => (
            <a
              key={p.letter}
              href={`#esg-${p.letter.toLowerCase()}`}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "var(--color-glass-bg)",
                border: "1px solid var(--color-glass-border)",
                color: "var(--color-text-primary)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-black"
                style={{
                  background: p.color,
                  color: "#000",
                  fontFamily: "var(--font-outfit), sans-serif",
                }}
              >
                {p.letter}
              </span>
              <span
                className="tracking-[0.05em]"
                style={{ fontFamily: "var(--font-space-mono), monospace" }}
              >
                {p.label}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function AcctHero() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 px-6 overflow-hidden">
      <div className="orb-float absolute top-[10%] right-[8%] w-80 h-80 bg-navy/5 rounded-full blur-3xl" />
      <div className="orb-float-reverse absolute bottom-[10%] left-[5%] w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <motion.div
        className="relative max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={item}
      >
        <span className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6" style={{ color: "var(--color-accent-cyan)", fontFamily: "var(--font-space-mono), monospace" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1zM8 10h8M8 14h4" /></svg>
          Accounting Service
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-ink leading-[1.15] tracking-tight">
          회계 시스템 구축
          <br />
          <span className="gradient-text">금융 회계만을 위한 토탈 서비스</span>
        </h1>

        <p className="mt-6 text-[15px] sm:text-base text-body leading-relaxed max-w-xl mx-auto">
          30년 이상의 금융 회계 전문인력을 바탕으로
          회계시스템 전반의 컨설팅, 구축, 운영까지 고객의 Needs에 맞춘
          모든 서비스를 제공하고 있습니다.
        </p>
      </motion.div>
    </section>
  );
}

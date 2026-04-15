"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function PropHero() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 px-6 overflow-hidden">
      <div className="orb-float absolute top-[10%] right-[5%] w-80 h-80 bg-navy/5 rounded-full blur-3xl" />
      <div className="orb-float-reverse absolute bottom-[15%] left-[8%] w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <motion.div
        className="relative max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={item}
      >
        <span className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6" style={{ color: "var(--color-accent-cyan)", fontFamily: "var(--font-space-mono), monospace" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>
          Proprietary Trading System
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-ink leading-[1.15] tracking-tight">
          고유자산 솔루션
          <br />
          <span className="gradient-text">수익율 상승을 위한 최적의 파트너</span>
        </h1>

        <p className="mt-6 text-[15px] sm:text-base text-body leading-relaxed max-w-xl mx-auto">
          고유자산 솔루션을 통해 투자 결정을 최적화하고 리스크 관리를 강화하세요.
          궁극적으로 수익성을 높일 수 있는 최고의 솔루션을 경험하세요.
        </p>
      </motion.div>
    </section>
  );
}

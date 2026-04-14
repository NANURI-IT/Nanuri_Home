"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function SiHero() {
  return (
    <section className="relative py-28 sm:py-36 px-6 overflow-hidden">
      <div className="orb-float absolute top-[10%] right-[5%] w-80 h-80 bg-navy/5 rounded-full blur-3xl" />
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Financial System Integration
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-ink leading-[1.15] tracking-tight">
          최적의 성능을 위한 시스템 통합
          <br />
          <span className="gradient-text">금융 SI 서비스</span>
        </h1>

        <p className="mt-6 text-[15px] sm:text-base text-body leading-relaxed max-w-2xl mx-auto">
          계정계/정보계 및 영업 관리, 고객 관리, 여신 업무와 같은 금융에 필요한
          모든 서비스를 고객의 요구에 맞게 제공합니다.
          다양한 경험과 노하우를 통해 솔루션을 구축하고 제공합니다.
        </p>
      </motion.div>
    </section>
  );
}

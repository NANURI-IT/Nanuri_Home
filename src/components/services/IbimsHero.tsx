"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function IbimsHero() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 px-6 overflow-hidden">
      <div className="orb-float absolute top-[10%] left-[8%] w-80 h-80 bg-navy/5 rounded-full blur-3xl" />
      <div className="orb-float-reverse absolute bottom-[10%] right-[8%] w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <motion.div
        className="relative max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={item}
      >
        <span className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6" style={{ color: "var(--color-accent-cyan)", fontFamily: "var(--font-space-mono), monospace" }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-50 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          Investment Banking Solution
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold text-ink leading-[1.12] tracking-tight">
          IB통합관리시스템
          <br />
          <span className="gradient-text">IBIMS</span>
        </h1>

        <p className="mt-4 text-[17px] text-dim font-medium">투자은행 업무를 위한 토탈 솔루션</p>

        <p className="mt-6 text-[15px] sm:text-base text-body leading-relaxed max-w-xl mx-auto">
          투자은행 업무와 관련하여 <br />
          <strong className="font-bold text-ink">&ldquo;초기 Deal 소싱에서의 사전영업부터{" "}
          성과관리까지&rdquo;</strong> <br />
          모든 업무 활동을 지원하는 솔루션입니다.
        </p>
      </motion.div>
    </section>
  );
}

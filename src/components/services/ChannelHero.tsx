"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function ChannelHero() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 px-6 overflow-hidden">
      <div className="orb-float absolute top-[10%] right-[5%] w-80 h-80 bg-navy/5 rounded-full blur-3xl" />
      <div className="orb-float-reverse absolute bottom-[10%] left-[8%] w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl" />
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
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <path d="M12 18h.01" />
          </svg>
          Channel Service
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-ink leading-[1.15] tracking-tight">
          채널 서비스
          <br />
          <span className="gradient-text">자유로운 커스터마이징의 멀티 디바이스 대응</span>
        </h1>

        <p className="mt-6 text-[15px] sm:text-base text-body leading-relaxed max-w-xl mx-auto">
          기업 모바일 표준에 필요한 모든 요소와 기능을 갖춘 국내 표준 하이브리드 앱
          개발 플랫폼을 통해 디바이스 맞춤형 금융 서비스 개발이 가능합니다.
        </p>
      </motion.div>
    </section>
  );
}

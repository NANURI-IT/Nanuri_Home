"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function AboutHero() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 px-6 overflow-hidden">
      <div className="orb-float absolute top-[10%] left-[5%] w-80 h-80 bg-navy/5 rounded-full blur-3xl" />
      <div className="orb-float-reverse absolute bottom-[10%] right-[5%] w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <motion.div
        className="relative max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={item}
      >
        <span className="text-xs font-semibold text-navy tracking-widest uppercase">About Us</span>

        <h1 className="mt-4 text-3xl sm:text-4xl md:text-[44px] font-bold text-ink leading-[1.15] tracking-tight">
          금융 IT의 미래를 선도하는
          <br />
          <span className="gradient-text">전문 파트너</span>
        </h1>

        <p className="mt-6 text-[17px] sm:text-[18px] text-body leading-relaxed max-w-xl mx-auto">
          수십 년간 금융권에서 쌓아온 깊은 개발 경험과 전문성을 바탕으로,
          최고의 금융 IT 솔루션을 제공합니다.
        </p>

        <p className="mt-3 text-[16px] text-dim">
          신뢰할 수 있는 전문가와 혁신적인 전문 개발진이 함께합니다.
        </p>
      </motion.div>
    </section>
  );
}

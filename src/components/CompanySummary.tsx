"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const summaryItems = [
  {
    title: "금융·증권 특화",
    description: "증권사, 자산운용사 등 금융권 프로젝트 수행 경험을 보유하고 있습니다.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
      </svg>
    ),
  },
  {
    title: "업무 시스템 구축",
    description: "기업의 핵심 업무 프로세스에 맞춘 시스템을 설계하고 구축합니다.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "운영 중심 설계",
    description: "구축 이후 실제 운영과 유지보수까지 고려한 설계를 지향합니다.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: "신뢰할 수 있는 수행력",
    description: "체계적인 프로젝트 관리와 안정적인 수행 역량을 갖추고 있습니다.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function CompanySummary() {
  return (
    <section id="company" className="py-14 md:py-24 px-6 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">About Us</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">
            나누리아이티가 하는 일
          </h2>
          <p className="mt-4 text-[15px] text-body max-w-lg mx-auto leading-relaxed">
            금융 IT 서비스 전문기업으로서 고객의 비즈니스에 최적화된 시스템을 제공합니다.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {summaryItems.map((cardItem, i) => (
            <motion.div
              key={cardItem.title}
              variants={item}
              className="glass glass-static group relative rounded-2xl overflow-hidden transition-shadow duration-500"
            >
              <div className="relative z-10 p-7">
                <span className="absolute top-5 right-5 card-kicker font-mono text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="hidden sm:flex w-12 h-12 rounded-xl bg-white/[0.08] items-center justify-center text-body group-hover:text-gold group-hover:bg-gold/10 group-hover:shadow-md group-hover:shadow-gold/25 transition-all duration-400">
                  {cardItem.icon}
                </div>
                <h3 className="mt-5 card-body font-semibold text-white">{cardItem.title}</h3>
                <p className="mt-2.5 card-body text-body group-hover:text-ink transition-colors duration-400">
                  {cardItem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

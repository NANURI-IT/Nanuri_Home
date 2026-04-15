"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const trustItems = [
  {
    title: "금융 특화\n프로젝트 수행",
    description: "증권사, 자산운용사 등 금융권 프로젝트를 다수 수행한 경험이 있습니다.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11" /></svg>,
  },
  {
    title: "다양한\n업무 시스템 구축",
    description: "IB, 고유자산, 회계, 채널 등 다양한 업무 영역의 시스템을 구축해왔습니다.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  },
  {
    title: "파트너사\n협업 경험",
    description: "금융 IT 생태계 내 다양한 파트너사와의 협업 경험을 보유하고 있습니다.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  },
];

export default function TrustFactors() {
  return (
    <section className="py-14 md:py-24 px-6 relative overflow-hidden">
      <div className="orb-float-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-navy/[0.02] rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Why Us</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">신뢰할 수 있는 파트너</h2>
          <p className="mt-4 text-[15px] text-body max-w-lg mx-auto leading-relaxed">
            실질적인 경험과 역량으로 신뢰를 쌓아왔습니다.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {trustItems.map((trustItem) => (
            <motion.div
              key={trustItem.title}
              variants={item}
              className="glass glass-static group relative rounded-2xl overflow-hidden transition-shadow duration-500"
            >
              <div className="relative z-10 p-8 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white/[0.08] flex items-center justify-center text-body group-hover:text-gold group-hover:bg-gold/10 group-hover:shadow-md group-hover:shadow-gold/25 transition-all duration-400">
                  {trustItem.icon}
                </div>
                <h3 className="mt-6 text-[16px] font-bold text-ink leading-snug whitespace-pre-line">
                  {trustItem.title}
                </h3>
                <p className="mt-3 text-[13px] text-body group-hover:text-ink leading-relaxed transition-colors duration-400">
                  {trustItem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

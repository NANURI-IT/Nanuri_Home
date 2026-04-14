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

const values = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "고객 가치 실현",
    desc: "풍부한 경험과 전문성을 바탕으로 고객의 니즈를 파악하여 제품이나 서비스를 설계하고, 혁신적인 기술을 도입하여 고객에게 새로운 가치를 실현하고자 합니다.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: "끊임없는 성장과 기술 개발",
    desc: "끊임없는 노력으로 금융 IT를 선도하며, 혁신적인 솔루션과 전문성을 바탕으로 성장을 이끌어 가겠습니다.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "지속 가능한 비즈니스 파트너",
    desc: "고객의 니즈에 최적화된 맞춤형 개발로 효율적이고 안전하게 함께 지속 가능한 성장을 이끌어 가겠습니다.",
  },
];

export default function Mission() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Mission</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">
            신뢰와 혁신으로 금융의 미래를 설계하는
            <br className="hidden sm:block" />
            <span className="gradient-text">IT 파트너</span>
          </h2>
          <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
            기술로 금융을 혁신하고, 가치로 미래를 연결하며, 경험을 바탕으로 변화를 선도합니다.
            정확한 기술, 신뢰받는 솔루션을 제공하며, 금융을 더 안전하게 기술을 더 앞서가는 전문 IT 기업입니다.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={item}
              className="glass gradient-border group relative rounded-2xl overflow-hidden transition-shadow duration-500"
            >
              <div className="relative z-10 p-8 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white/[0.08] flex items-center justify-center text-body group-hover:text-gold group-hover:bg-gold/10 group-hover:shadow-md group-hover:shadow-gold/25 transition-all duration-400">
                  {v.icon}
                </div>
                <h3 className="mt-6 text-[16px] font-bold text-ink leading-snug">{v.title}</h3>
                <p className="mt-3 text-[13px] text-body leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

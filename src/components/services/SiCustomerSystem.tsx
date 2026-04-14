"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const aspects = [
  {
    title: "전사적 고객정보",
    desc: "고객정보를 전사적 통합관리의 체계적인 관리",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11" /></svg>,
  },
  {
    title: "고객정보 통합",
    desc: "고객정보 통합 데이터의 질적 향상",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  },
  {
    title: "고객 Single View",
    desc: "일관된 고객 Single View를 통한 서비스 구현",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  },
  {
    title: "고객정보 보호",
    desc: "고객정보 법률에 의한 보호 및 체계적인 관리",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  },
  {
    title: "고객정보 품질 관리",
    desc: "고객 정보의 변경/갱신을 통한 데이터 질적 향상",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>,
  },
];

export default function SiCustomerSystem() {
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
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Customer Management</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">고객 관리 시스템</h2>
          <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
            고객 정보를 통합 관리하여, 전사적으로 일관된 고객 Single View를 제공하고,
            고객 중심의 서비스 기반 구축 및 고객 정보 보호, 품질 확보가 가능한 통합시스템입니다.
          </p>
        </motion.div>

        {/* Life Cycle Diagram */}
        <motion.div
          className="mt-16 relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          {/* Center hub */}
          <div className="flex justify-center mb-10">
            <div className="w-28 h-28 rounded-full bg-navy/10 border-2 border-navy/20 flex flex-col items-center justify-center">
              <span className="text-[13px] font-bold text-ink">고객정보</span>
              <span className="text-[11px] text-navy font-medium">Life Cycle</span>
            </div>
          </div>

          {/* Surrounding aspects */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {aspects.map((a) => (
              <motion.div
                key={a.title}
                variants={item}
                className="glass group rounded-2xl p-5 transition-all duration-300 text-center"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-raised flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300">
                  {a.icon}
                </div>
                <h3 className="mt-3 text-[13px] font-bold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-[11px] text-body leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const cases = [
  {
    category: "증권",
    title: "증권 차세대 업무 시스템",
    scope: "업무 분석 · 설계 · 개발 · 운영 이관",
    tags: ["금융 SI", "차세대"],
  },
  {
    category: "투자은행",
    title: "투자은행 지원 시스템",
    scope: "IB 딜 관리 · 심사 · 실행 지원 시스템 구축",
    tags: ["IB 시스템", "IBIMS"],
  },
  {
    category: "자산운용",
    title: "회계·정산 시스템",
    scope: "금융 회계 기준 대응 · 정산 자동화",
    tags: ["회계 서비스"],
  },
  {
    category: "디지털금융",
    title: "웹·모바일 채널 시스템",
    scope: "고객 접점 채널 설계 · 개발 · 운영",
    tags: ["채널 서비스"],
  },
];

export default function CaseStudies() {
  return (
    <section id="cases" className="py-14 md:py-24 px-6 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Case Studies</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">구축 사례</h2>
          <p className="mt-4 text-[15px] text-body max-w-lg mx-auto leading-relaxed">
            다양한 금융 산업군에서 실제 운영되는 시스템을 구축해왔습니다.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cases.map((caseItem, i) => (
            <motion.div key={caseItem.title} variants={item}>
              <Link
                href="/about#history"
                className="glass group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 block h-full"
              >
                <div className="relative z-10 p-8">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gold">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {caseItem.category}
                    </span>
                    <span className="text-[11px] font-mono text-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold text-ink">{caseItem.title}</h3>
                  <p className="mt-2 text-[13px] text-body group-hover:text-ink leading-relaxed transition-colors duration-400">
                    {caseItem.scope}
                  </p>
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {caseItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-body bg-white/[0.07] group-hover:text-gold group-hover:bg-gold/10 px-3 py-1 rounded-full transition-colors duration-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold text-gold group-hover:gap-2 transition-all duration-300">
                      연혁 보기
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

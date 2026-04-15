"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const features = [
  {
    title: "재무회계",
    items: [
      "결산 및 잔액 대사 효율화",
      "실시간 회계처리를 위한 자동 분개 규칙 적용",
      "전표 유형별 적요등록으로 신규 금융상품에 대응하는 자동 전표 작성과 대사기능",
      "수기 처리 전표의 자동화로 수기 전표 관리방안 정비",
      "IFRS18, 외화BS에 대응하는 유연하고 확장성 있는 CoA 체계",
      "세무 회계, 예산관리, 고정자산과의 연계 작업 구현",
    ],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>,
  },
  {
    title: "관리회계",
    items: [
      "자금원가, 수익성 분석, 성과관리, 수익/비용의 실질손익 산출",
      "일별 / 월별 손익 산출",
      "판관비 배부 기능의 고도화",
      "성과급 산출 프로세스 구축",
    ],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>,
  },
  {
    title: "자금 관리",
    items: [
      "영업자금, 예적금 관리",
      "외화 거래 내역 및 잔고에 대한 기록 및 관리 가능 시스템 구축",
    ],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  },
];

export default function AcctFeatures() {
  return (
    <section className="py-14 md:py-24 px-6 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Main Function</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">주요 기능</h2>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="glass glass-static group relative rounded-2xl overflow-hidden transition-shadow duration-500"
            >
              <div className="relative z-10 p-8">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.08] flex items-center justify-center text-body group-hover:text-gold group-hover:bg-gold/10 transition-all duration-400">
                  {f.icon}
                </div>
                <h3 className="mt-6 text-[17px] font-bold text-ink">{f.title}</h3>
                <ul className="mt-5 space-y-3">
                  {f.items.map((li) => (
                    <li key={li} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
                      <span className="text-[13px] text-body leading-relaxed">{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

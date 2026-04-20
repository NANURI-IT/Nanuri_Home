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
    title: "고급 데이터 분석",
    desc: [
      "다양한 시장 데이터와 자산 데이터를 통합하여 신속한 인사이트 제공",
      "머신러닝 기반 예측 모델로 시장 움직임을 사전에 예측",
      "효율적인 투자 전략 수립",
    ],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" /></svg>,
  },
  {
    title: "실시간 위험 관리",
    desc: [
      "포트폴리오의 리스크를 실시간 모니터링",
      "주요 리스크 지표에 대한 경고 기능 제공",
      "스트레스 테스트 및 시나리오 분석을 통한 시장 대비 기능",
    ],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  },
  {
    title: "성과 모니터링 및 리포팅",
    desc: [
      "각 투자 전략의 성과를 실시간으로 추적",
      "맞춤형 리포트 생성으로 투자자와 내부 이해관계자 보고서 작성",
      "KPI 대시보드와 통합하여 시각화 제공",
    ],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>,
  },
];

export default function PropFeatures() {
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
          <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
            고유자산(Prop Trading) 업무를 위해 <br/>정확한 데이터 분석, 위험관리,
            실시간 성과 모니터링 등 필수 기능들을 제공합니다.
          </p>
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
                <div className="w-13 h-13 rounded-2xl bg-white/[0.08] flex items-center justify-center text-body group-hover:text-gold group-hover:bg-gold/10 transition-all duration-400 w-[52px] h-[52px]">
                  {f.icon}
                </div>
                <h3 className="mt-6 card-title font-bold text-ink">{f.title}</h3>
                <ul className="mt-5 space-y-3">
                  {f.desc.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
                      <span className="card-body text-body">{d}</span>
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

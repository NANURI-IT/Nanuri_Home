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
    title: "고객 중심의 현장 영업 시스템",
    items: [
      "Web 기반 SFA 시스템을 구축",
      "접근 단계 컨설팅을 위한 고객 속성별 상품 추천 및 판매 Tool 제공",
      "상품 Rule 기반의 가입 설계 시스템 구현",
      "영업활동 프로세스 7단계를 지원하는 활동관리 시스템",
    ],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  },
  {
    title: "사후 관리 프로세스 개선",
    items: [
      "상담원 / 지점별 월마감 / 일마감 업적, 실시간 속보 및 과정 관리",
      "수수료 예측 및 검증이 용이한 시스템 구현",
      "영업규정 변경에 대한 신속/유연한 대응",
      "다양한 판매 채널 확대 및 관리가 용이한 조직관리 체계",
      "단체영업 조직 수수료 관리 구현",
    ],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  },
  {
    title: "마케팅 기획 / 교육관리 시스템",
    items: [
      "지역별, 조직별 실적분석, 역량 분석을 통한 사업 계획 수립",
      "성과지표 정보 제공",
      "1인당 생산성 분석 및 효율지표 정보 제공",
      "각종 영업 행사 및 이벤트 관리 기능",
      "교육 계획 / 결과 및 교육 이력 관리",
    ],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>,
  },
];

export default function SiSalesSystem() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Sales Management</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">영업 관리 시스템</h2>
          <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
            고객 접점 현장 시스템을 개선하고 마케팅, 영업 생산성 향상 등
            활동 관리 프로세스 과학화에 기여하는 현장 중심의 영업 시스템입니다.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="glass gradient-border group relative rounded-2xl overflow-hidden transition-shadow duration-500"
            >
              <div className="relative z-10 p-7">
                <div className="w-11 h-11 rounded-xl bg-white/[0.08] flex items-center justify-center text-body group-hover:text-gold group-hover:bg-gold/10 transition-all duration-400">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-[16px] font-bold text-ink">{feature.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {feature.items.map((li, i) => (
                    <li key={i} className="flex items-start gap-2.5">
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

"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function CeoMessage() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="orb-float-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-navy/[0.02] rounded-full blur-[100px]" />

      <motion.div
        className="relative max-w-3xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={item}
      >
        <div
          className="rounded-2xl p-px overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(99,102,241,0.15), rgba(16,185,129,0.15))" }}
        >
          <div className="glass rounded-2xl p-10 sm:p-14 relative">
            <span className="text-xs font-semibold text-navy tracking-widest uppercase">CEO Message</span>
            <h2 className="mt-4 text-xl sm:text-2xl font-bold text-ink tracking-tight leading-snug">
              지속가능경영과 사회적 책임
            </h2>

            <div className="mt-8 space-y-4 text-[14px] sm:text-[15px] text-body leading-[1.85]">
              <p>
                회사는 사회적 책임을 기업 경영의 중요한 기준으로 삼고 있습니다.
                우리는 준법과 윤리를 바탕으로 환경과 사회에 대한 책임을 성실히 이행하겠습니다.
              </p>
              <p>
                또한 지역사회와의 상생, 나눔과 봉사 실천을 통해 기업의 역할을 다하겠습니다.
                임직원 모두가 책임 있는 행동과 적극적인 참여로 지속가능한 성장을 함께 만들어가겠습니다.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-bold text-ink">신미선</p>
                <p className="text-[12px] text-dim">나누리아이티 대표이사</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

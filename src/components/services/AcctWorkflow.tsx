"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function AcctWorkflow() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Workflow</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">업무 구성도</h2>
          <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
            계정계와 회계시스템이 API / CDC로 연동되며, 재무회계를 중심으로
            관리·세무·자금·고정자산·예산 모듈이 통합 운영됩니다.
          </p>
        </motion.div>

        <motion.div
          className="glass mt-14 rounded-2xl p-5 sm:p-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          <div className="relative w-full bg-white rounded-xl overflow-hidden p-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/acct-workflow.png`}
              alt="회계 시스템 업무 구성도 - 계정계, 회계시스템, 관리회계, 세무회계, 재무회계, 자금관리, 고정자산, 예산관리"
              width={1200}
              height={1500}
              className="w-full h-auto"
              priority={false}
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={item}
        >
          <Link
            href="/contact"
            className="group glow-btn relative inline-flex items-center gap-2 px-8 py-4 bg-gold text-white text-sm font-semibold rounded-xl hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all"
          >
            회계 시스템 문의
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

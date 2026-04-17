"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ZoomableImage from "@/components/ui/ZoomableImage";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function IbimsWorkflow() {
  return (
    <section className="py-14 md:py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Workflow</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">업무 구성도</h2>
          <p className="mt-4 text-[15px] text-body max-w-lg mx-auto leading-relaxed">
            초기 Deal 소싱부터 성과관리까지 End-to-End 프로세스를 지원합니다.
          </p>
        </motion.div>

        <motion.div
          className="glass mt-14 rounded-2xl overflow-hidden p-3 sm:p-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          <ZoomableImage
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/ibims-workflow.webp`}
            alt="IBIMS 업무 구성도 - Deal 소싱부터 성과관리까지 전 과정"
            width={1600}
            height={1200}
          />
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
            IBIMS 도입 문의
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

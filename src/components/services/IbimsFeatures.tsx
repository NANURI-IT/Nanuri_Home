"use client";

import { motion } from "framer-motion";
import ZoomableImage from "@/components/ui/ZoomableImage";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function IbimsFeatures() {
  return (
    <section className="py-14 md:py-24 px-6 relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Special Features</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">
            &ldquo;IBIMS&rdquo; 특장점
          </h2>
          <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
            IB 통합관리시스템에서는 ECM, DCM, PF, PI 등 IB/PI업무를 처리할 수 있으며,
            기업여신, 채권, 수익증권, 상장 주식 등 투자 자산을 관리할 수 있습니다.
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
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/ibims-features.webp`}
            alt="IBIMS 특장점 - IB/PI Deal 관리, Deal 실행 및 투자자산 관리, IB/PI 투자자산 관리"
            width={1600}
            height={900}
          />
        </motion.div>
      </div>
    </section>
  );
}

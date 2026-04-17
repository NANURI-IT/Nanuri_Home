"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const flowStages = [
  {
    header: "고객관리 / 여신상담",
    color: "bg-navy",
    blocks: [
      {
        title: "여신 마케팅",
        items: ["고객정보 관리", "DB마케팅", "상담/자료", "신용분석/관리"],
      },
    ],
  },
  {
    header: "심사 / 승인",
    color: "bg-navy",
    blocks: [
      { title: "승인 신청", items: ["자동승인관리", "본부승인관리", "일괄승인/변경관리", "승인정보관리"] },
      { title: "담보 관리", items: ["감정/평가정보", "담보배분관리", "실화수구역"] },
      { title: "금리 결정", items: ["금리기산", "금리우대"] },
      { title: "한도 관리", items: ["Total Exposure", "Credit Line", "신용공여한도"] },
    ],
  },
  {
    header: "여신 실행",
    color: "bg-navy",
    blocks: [
      { title: "여신 계정", items: ["여신 장부관리", "여신수납관리", "여신만기관리"] },
      { title: "조기 경보", items: ["모니터링 업무", "분리환류 업무"] },
    ],
  },
  {
    header: "사후 관리",
    color: "bg-navy",
    blocks: [
      { title: "사후 관리", items: ["조기기채관리", "감제부실인정리", "특수채권관리"] },
      { title: "부도/연체정보", items: ["연체 정보", "부도 정보", "회수 정보"] },
      { title: "자산 건전성 분류", items: ["자산건전성분류", "대손충당금산출"] },
    ],
  },
];

export default function SiLoanSystem() {
  return (
    <section className="py-14 md:py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Loan System</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">여신 시스템</h2>
          <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
            여신 마케팅 기능부터 신청/심사/승인, 계정 업무, 담보관리, 금리 결정, 한도 관리 등
            모든 여신 업무 Process를 포함합니다.
          </p>
        </motion.div>

        {/* Flowchart */}
        <motion.div
          className="glass mt-14 rounded-2xl overflow-hidden p-6 sm:p-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          {/* Flow grid — each column contains header + its blocks */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {flowStages.map((stage, i) => (
              <div key={stage.header} className="flex flex-col gap-3">
                {/* Stage header */}
                <div className="flex items-center gap-2">
                  <span className="flex-1 text-center px-4 py-2 bg-navy text-white card-title font-bold rounded-lg">
                    {stage.header}
                  </span>
                  {i < flowStages.length - 1 && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-dim shrink-0 hidden lg:block">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </div>

                {/* Blocks for this stage */}
                {stage.blocks.map((block) => (
                  <motion.div
                    key={block.title}
                    variants={item}
                    className="rounded-xl border border-line/80 bg-surface p-4 hover:border-navy/20 hover:shadow-md transition-all duration-300"
                  >
                    <h4 className="card-title font-bold text-navy border-b border-line pb-2 mb-3">
                      {block.title}
                    </h4>
                    <ul className="space-y-2">
                      {block.items.map((li) => (
                        <li key={li} className="flex items-start gap-2.5">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          <span className="card-body text-body">{li}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
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
            도입 문의하기
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function EsgEthicsCta() {
  return (
    <section className="py-14 md:py-20 px-6 relative overflow-hidden">
      <motion.div
        className="relative max-w-6xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={item}
      >
        <div className="text-center mb-10">
          <span
            className="text-[11px] tracking-[0.2em] font-bold uppercase"
            style={{
              color: "var(--color-accent-indigo)",
              fontFamily: "var(--font-space-mono), monospace",
            }}
          >
            Deep Dive · Code of Ethics
          </span>
          <h2 className="mt-3 text-2xl md:text-[28px] font-bold text-ink tracking-tight">
            윤리·준법경영 정책 자세히 보기
          </h2>
          <p className="mt-3 text-[14px] text-body max-w-2xl mx-auto leading-relaxed">
            나누리아이티는 9대 핵심 영역의 윤리경영 정책을 명문화하여 공시하고 있습니다.
            정책 전문과 신고 채널은 아래 페이지에서 확인하실 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Policy card */}
          <Link
            href="/esg/ethics"
            className="glass glass-static group rounded-2xl p-7 sm:p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: "rgba(99, 102, 241, 0.14)",
                  color: "var(--color-accent-indigo)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="m9 15 2 2 4-4" />
                </svg>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-dim transition-all duration-300 group-hover:translate-x-1"
                style={{ color: "var(--color-accent-indigo)" }}
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <span
              className="text-[11px] tracking-[0.16em] font-bold"
              style={{
                color: "var(--color-accent-indigo)",
                fontFamily: "var(--font-space-mono), monospace",
              }}
            >
              POLICY
            </span>
            <h3 className="mt-2 text-[18px] sm:text-[20px] font-bold text-ink leading-snug">
              윤리경영 정책 공시
            </h3>
            <p className="mt-3 text-[14px] text-body leading-relaxed">
              CEO 메시지, 9대 핵심 영역, 이해관계자 약속, 추진 체계 등 윤리경영 정책의
              전문을 확인하고 PDF로 다운로드할 수 있습니다.
            </p>
          </Link>

          {/* Report card */}
          <Link
            href="/esg/ethics/report"
            className="glass glass-static group rounded-2xl p-7 sm:p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: "rgba(244, 63, 94, 0.14)",
                  color: "var(--color-accent-rose)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 group-hover:translate-x-1"
                style={{ color: "var(--color-accent-rose)" }}
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <span
              className="text-[11px] tracking-[0.16em] font-bold"
              style={{
                color: "var(--color-accent-rose)",
                fontFamily: "var(--font-space-mono), monospace",
              }}
            >
              REPORT
            </span>
            <h3 className="mt-2 text-[18px] sm:text-[20px] font-bold text-ink leading-snug">
              윤리경영 위반 신고
            </h3>
            <p className="mt-3 text-[14px] text-body leading-relaxed">
              뇌물·청탁, 부패·횡령, 정보 유출, 불공정 거래 등 윤리경영 위반 사항을
              익명으로 신고하실 수 있습니다. 신고자 신원은 철저히 보호됩니다.
            </p>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

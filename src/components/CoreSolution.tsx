"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 } },
};

const checklist = [
  "초기 Deal 소싱부터 성과관리 운영까지 End-to-End 지원",
  "한국저작권위원회 정식 저작권 등록 완료",
  "주요 증권사 도입 및 운영 검증 완료",
  "맞춤형 확장 및 기존 시스템 연계 용이",
];

export default function CoreSolution() {
  return (
    <section id="solution" className="py-14 md:py-24 px-6 relative overflow-hidden scroll-mt-20">
      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 md:gap-16 items-center">
          {/* Left: visual showcase with floating cards (hidden on mobile) */}
          <motion.div
            className="glass glass-static relative rounded-2xl overflow-hidden min-h-[480px] hidden md:block"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={slideLeft}
          >
            {/* Animated grid */}
            <div
              className="absolute inset-0 grid-drift pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />

            {/* Card 1 — Deal Pipeline (cyan) — top left */}
            <div
              className="float-card float-card-1 glass w-[180px]"
              style={{ position: "absolute", top: 32, left: 32 }}
            >
              <div className="p-4">
                <div
                  className="text-[10px] tracking-[0.12em] uppercase text-dim"
                  style={{ fontFamily: "var(--font-space-mono), monospace" }}
                >
                  Deal Pipeline
                </div>
                <div
                  className="mt-1 text-2xl font-black tracking-tight"
                  style={{ color: "var(--color-accent-cyan)", fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  +247%
                </div>
                <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full bar-grow"
                    style={{ width: "78%", background: "var(--color-accent-cyan)" }}
                  />
                </div>
              </div>
            </div>

            {/* Card 2 — 시스템 안정성 (emerald) — center (wrapper handles centering, inner has animation) */}
            <div
              style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 180 }}
            >
            <div
              className="float-card float-card-3 glass w-full"
            >
              <div className="p-4">
                <div
                  className="text-[10px] tracking-[0.12em] uppercase text-dim"
                  style={{ fontFamily: "var(--font-space-mono), monospace" }}
                >
                  시스템 안정성
                </div>
                <div
                  className="mt-1 text-2xl font-black tracking-tight"
                  style={{ color: "var(--color-accent-emerald)", fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  A++
                </div>
                <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full bar-grow"
                    style={{ width: "91%", background: "var(--color-accent-emerald)" }}
                  />
                </div>
              </div>
            </div>
            </div>

            {/* Card 3 — 운용 효율 (indigo) — bottom right */}
            <div
              className="float-card float-card-2 glass w-[180px]"
              style={{ position: "absolute", bottom: 32, right: 32 }}
            >
              <div className="p-4">
                <div
                  className="text-[10px] tracking-[0.12em] uppercase text-dim"
                  style={{ fontFamily: "var(--font-space-mono), monospace" }}
                >
                  운용 효율
                </div>
                <div
                  className="mt-1 text-2xl font-black tracking-tight"
                  style={{ color: "var(--color-accent-indigo)", fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  98.7%
                </div>
                <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full bar-grow"
                    style={{ width: "64%", background: "var(--color-accent-indigo)" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: text & checklist */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={slideRight}
          >
            <div
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] mb-4"
              style={{ color: "var(--color-accent-cyan)", fontFamily: "var(--font-space-mono), monospace" }}
            >
              <span
                className="inline-block h-px w-9"
                style={{ background: "linear-gradient(to right, var(--color-accent-cyan), transparent)" }}
              />
              Core Solution
            </div>

            <h2 className="text-3xl md:text-[44px] font-black tracking-tight leading-tight text-ink">
              IB통합관리시스템
              <br />
              <span className="gradient-text">IBIMS</span>
            </h2>

            <p className="mt-5 text-[15px] text-body leading-relaxed max-w-md">
              투자은행 업무와 관련한 일체의 영업활동을 지원하는 토탈 솔루션
            </p>

            <ul className="mt-8 space-y-4">
              {checklist.map((text) => (
                <li key={text} className="flex items-start gap-3.5">
                  <span
                    className="shrink-0 w-[22px] h-[22px] rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(0, 212, 255, 0.12)",
                      color: "var(--color-accent-cyan)",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-[14px] text-body leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/services/ibims"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[13px] font-bold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo))",
                  color: "#000",
                  boxShadow: "0 4px 20px rgba(0, 212, 255, 0.2)",
                }}
              >
                IBIMS 자세히 보기
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

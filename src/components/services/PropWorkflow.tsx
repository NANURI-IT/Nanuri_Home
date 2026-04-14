"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const products = [
  "국내/해외 주식", "원화/외화 채권", "국내/해외 선물",
  "장외 파생", "장외 주식/채권", "CD", "CP", "RP",
];

const bizBlocks = [
  {
    title: "고유 공통 업무",
    items: ["발행정보 관리", "펀드 마스터정보 관리", "거래상대방정보 관리", "코드정보 및 매매제한종목 관리"],
  },
  {
    title: "고유 주식업무",
    items: ["장내주식/해외주식 주문 체결, 탄소배출권, 소수점 거래, 장외주식 거래 등", "매매제한, 착오매매 관리", "주식 ETF설정/환매관리, DR 차익거래 등", "관리처리, 잔고관리 및 평가"],
  },
  {
    title: "고유 채권업무",
    items: ["채권 장내 주문/체결, 장외채권거래, 기상매매", "채권 장외 리테일 거래 연계, 채권 ETF설정", "CD/CP 매매 등", "관리처리, 잔고관리 및 평가"],
  },
  {
    title: "고유 선물옵션업무",
    items: ["코스피200지수, 개별지수, 통화선물, 금리선물, 금 선물 등 주문체결", "해외상품 선물매매", "매매제한관리, 모니터링, 잔고관리 및 평가"],
  },
  {
    title: "고유 담보/대차 업무",
    items: ["담보설정/해지", "대여/제공 상환관리", "차입신청 상환관리", "Recall/Rollover관리"],
  },
  {
    title: "고유 장외 파생 업무",
    items: ["거래소 TR 보고 의무제도", "장외 파생 운영상품 매매, 평가, 담보 등 정보 관리"],
  },
];

const externalOrgs = ["거래소", "예탁원", "증권금융", "CME", "EUREX"];

const bottomSystems = ["공통상품", "계좌", "유가", "권리", "회계", "리스크"];

/* Thick double-headed horizontal arrow */
function ThickHArrow() {
  return (
    <svg viewBox="0 0 80 40" className="w-full h-auto" preserveAspectRatio="none">
      <defs>
        <linearGradient id="hArrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5E7A93" />
          <stop offset="50%" stopColor="#D4943A" />
          <stop offset="100%" stopColor="#5E7A93" />
        </linearGradient>
      </defs>
      {/* Left arrowhead */}
      <path d="M 2 20 L 14 8 L 14 14 L 66 14 L 66 8 L 78 20 L 66 32 L 66 26 L 14 26 L 14 32 Z" fill="url(#hArrowGrad)" opacity="0.85" />
    </svg>
  );
}

/* Thick double-headed vertical arrow */
function ThickVArrow() {
  return (
    <svg viewBox="0 0 40 80" className="h-full w-auto" preserveAspectRatio="none">
      <defs>
        <linearGradient id="vArrowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5E7A93" />
          <stop offset="50%" stopColor="#D4943A" />
          <stop offset="100%" stopColor="#5E7A93" />
        </linearGradient>
      </defs>
      <path d="M 20 2 L 8 14 L 14 14 L 14 66 L 8 66 L 20 78 L 32 66 L 26 66 L 26 14 L 32 14 Z" fill="url(#vArrowGrad)" opacity="0.85" />
    </svg>
  );
}

export default function PropWorkflow() {
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
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Workflow</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">업무 구성도</h2>
          <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
            <strong className="text-ink">고유자산 업무</strong>를 중심으로 <strong className="text-gold">대외기관</strong>과
            실시간 연계되며, 하단의 <strong className="text-gold">공통 시스템</strong>과도 양방향 상통합니다.
          </p>
        </motion.div>

        <motion.div
          className="glass mt-14 rounded-2xl p-5 sm:p-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          {/* Top title bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 text-center py-2.5 bg-navy rounded-lg">
              <span className="text-[13px] font-bold text-white">고유자산 업무 구성도</span>
            </div>
            <div className="lg:w-32 text-center py-2.5 bg-navy rounded-lg">
              <span className="text-[13px] font-bold text-white">대외기관</span>
            </div>
          </div>

          {/* Main 3-column row */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            {/* Left: 고유상품 */}
            <div className="lg:w-28 shrink-0 space-y-2">
              <div className="text-center py-2 bg-surface rounded-lg border border-line">
                <span className="text-[11px] font-bold text-ink">고유상품</span>
              </div>
              {products.map((p) => (
                <div key={p} className="text-center py-1.5 bg-surface rounded-lg border border-line/60">
                  <span className="text-[10px] text-body">{p}</span>
                </div>
              ))}
            </div>

            {/* Center: 고유자산 업무 (framed) */}
            <motion.div
              className="flex-1 rounded-2xl p-px"
              style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.4), rgba(99,102,241,0.4), rgba(16,185,129,0.4))" }}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="rounded-2xl bg-surface/50 p-4 sm:p-5 h-full">
                <div className="text-center py-2 bg-navy/10 border border-navy/20 rounded-lg mb-4">
                  <span className="text-[13px] font-bold text-navy">고유자산 업무</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bizBlocks.map((block) => (
                    <motion.div
                      key={block.title}
                      variants={item}
                      className="glass rounded-xl p-4 transition-all duration-300"
                    >
                      <h4 className="text-[12px] font-bold text-white bg-navy/75 rounded-lg px-3 py-1.5 mb-3 text-center">
                        {block.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {block.items.map((li, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0" />
                            <span className="text-[10px] sm:text-[11px] text-body leading-relaxed">{li}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Thick double-headed horizontal arrow → 대외기관 */}
            <div className="hidden lg:flex items-center justify-center w-20 shrink-0">
              <div className="w-20 flex items-center justify-center">
                <ThickHArrow />
              </div>
            </div>

            {/* Right: 대외기관 */}
            <div className="lg:w-28 shrink-0 flex lg:flex-col flex-row flex-wrap gap-2 items-center justify-center">
              {externalOrgs.map((org) => (
                <div
                  key={org}
                  className="flex items-center justify-center w-20 h-14 lg:w-full lg:h-auto lg:py-3 rounded-2xl bg-gold/10 border border-gold/25 hover:bg-gold/20 transition-colors duration-300"
                >
                  <span className="text-[12px] font-bold text-gold-dark">{org}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thick double-headed vertical arrow → 공통 시스템 */}
          <div className="flex justify-center my-4">
            <div className="h-16">
              <ThickVArrow />
            </div>
          </div>

          {/* Bottom: 공통 시스템 */}
          <div className="rounded-xl border-2 border-dashed border-gold/30 bg-gold/[0.04] p-4">
            <div className="flex flex-wrap justify-center gap-2">
              {bottomSystems.map((sys) => (
                <div key={sys} className="glass px-5 py-2.5 rounded-lg transition-all">
                  <span className="text-[12px] font-bold text-ink">{sys}</span>
                </div>
              ))}
            </div>
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
            href="/#contact"
            className="group glow-btn relative inline-flex items-center gap-2 px-8 py-4 bg-gold text-white text-sm font-semibold rounded-xl hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all"
          >
            고유자산 솔루션 문의
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

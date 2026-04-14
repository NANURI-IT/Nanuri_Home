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

const bizSystem = [
  {
    title: "토큰증권 발행",
    subs: ["토큰증권 계좌개설", "질권설정/사고관리", "청약관리", "청약접수/취소", "청약배정/환불", "청약입고", "총량관리 (B)"],
  },
  {
    title: "오퍼레이션",
    subs: ["기준가격 관리", "원장 대사", "회계 처리", "자금 정산", "잔고평가관리"],
  },
  {
    title: "권리/청산",
    subs: ["권리확인", "배당/분배금", "권리계좌반영", "원리금상환", "회소수각관리", "수익자총회"],
  },
  {
    title: "토큰증권 유통",
    subs: ["회원사 관리", "종목정보 관리", "주문관리", "체결 매칭 관리", "결제정산", "통계관리", "시장운영 관리", "시장감시", "정보분배"],
  },
  {
    title: "상품관리",
    subs: ["상품정보 등록", "상품 게시"],
  },
  {
    title: "투자정보",
    subs: ["시세수신", "장마감수신", "시세/호가 조회"],
  },
  {
    title: "제휴 웹 서비스",
    subs: ["제휴사정보관리", "기초자산정보관리", "업무결과 조회서비스", "수요예측"],
  },
  {
    title: "계정계 연계",
    subs: ["고객/계좌", "입출금", "회계", "업무공통"],
  },
];

const bizChannel = [
  {
    title: "모바일",
    subs: ["비대면계좌개설", "토큰증권 청약", "토큰증권 공시", "전자투표", "토큰증권 매매"],
  },
  {
    title: "제휴 웹",
    subs: ["제휴사 정보등록", "기초자산 등록", "제휴사제공 조회 서비스", "수요예측"],
  },
];

function PillGroup({ title, subs, accent = false }: { title: string; subs: string[]; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-full text-center px-4 py-2.5 rounded-xl mb-3 ${accent ? "bg-gold" : "bg-navy/70"}`}>
        <span className="text-[12px] font-bold text-white">{title}</span>
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        {subs.map((s) => (
          <div key={s} className="text-center px-3 py-2 bg-surface rounded-xl border border-line/50 hover:border-navy/20 hover:shadow-sm transition-all duration-300">
            <span className="text-[11px] text-body">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StoWorkflow() {
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
            토큰 증권 발행을 위한 <strong className="text-ink">상품 관리 영역</strong>과 계좌 개설, 입출금, 청약의 <strong className="text-ink">토큰 증권 영역</strong>,
            청산 및 결제를 위한 <strong className="text-ink">오퍼레이션 영역</strong>으로 이루어집니다.
          </p>
        </motion.div>

        {/* 대업무 1: 토큰증권 업무 구성도 */}
        <motion.div
          className="glass mt-14 rounded-2xl p-5 sm:p-7"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          <div className="bg-navy rounded-xl px-6 py-3 mb-6 text-center">
            <span className="text-[15px] font-bold text-white">토큰증권 업무 구성도</span>
          </div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {bizSystem.map((group) => (
              <motion.div key={group.title} variants={item}>
                <PillGroup title={group.title} subs={group.subs} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* 대업무 2: 토큰증권 채널 */}
        <motion.div
          className="glass mt-6 rounded-2xl p-5 sm:p-7"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          <div className="bg-gold rounded-xl px-6 py-3 mb-6 text-center max-w-xs mx-auto">
            <span className="text-[15px] font-bold text-white">토큰증권 채널</span>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-4 max-w-md mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {bizChannel.map((group) => (
              <motion.div key={group.title} variants={item}>
                <PillGroup title={group.title} subs={group.subs} accent />
              </motion.div>
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
            href="/#contact"
            className="group glow-btn relative inline-flex items-center gap-2 px-8 py-4 bg-gold text-white text-sm font-semibold rounded-xl hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all"
          >
            STO 솔루션 문의
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

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

const specialFeatures = [
  {
    title: "모바일 표준 및\nUI 편집 기능",
    bullets: [
      "모바일 표준화의 기본을 탑재한 UI 개발 환경 제공",
      "클릭, 드래그앤 드롭을 통한 속성 편집 및 이벤트 처리 기능 제공",
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
        <path d="M9 6h6M9 9h6M9 12h4" />
      </svg>
    ),
  },
  {
    title: "비종속성\n템플릿 제공",
    bullets: [
      "플랫폼에 독립적인 템플릿으로 다양한 디바이스 환경을 지원",
      "재사용 가능한 표준 컴포넌트 라이브러리 제공",
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: "시뮬레이터와\n디버깅 툴",
    bullets: [
      "스파이더젠 런타임 환경으로 크로미움 기반의 시뮬레이터를 제공합니다.",
      "크로미움 브라우저가 제공하는 강력한 데브툴의 디버깅 기능을 모두 사용할 수 있습니다.",
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "반응형 편집\n모드 기능",
    bullets: [
      "다양한 화면 크기와 디바이스에 대응하는 반응형 편집 환경 제공",
      "실시간 프리뷰로 디자인 결과를 즉각 확인할 수 있습니다.",
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function ChannelFeatures() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Special Features</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">채널 서비스 특장점</h2>
          <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
            은행, 증권사, 저축은행 등 금융기관 모바일 및 인터넷 사용자 서비스를 위한
            <br className="hidden sm:block" />
            MTS, WTS, ODS 등 다양한 서비스를 제공합니다.
          </p>
        </motion.div>

        {/* 2x2 feature grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {specialFeatures.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="glass rounded-2xl p-7 transition-all duration-400"
            >
              <div className="flex items-start gap-6">
                {/* Left: circular icon + title */}
                <div className="shrink-0 w-[110px] flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full border-2 border-navy/20 bg-navy/5 flex items-center justify-center text-navy">
                    {f.icon}
                  </div>
                  <h3 className="mt-3 text-[13px] font-bold text-navy leading-snug whitespace-pre-line">
                    {f.title}
                  </h3>
                </div>

                {/* Right: bullets */}
                <ul className="flex-1 space-y-2.5 pt-2">
                  {f.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <span className="text-[13px] text-body leading-relaxed">{b}</span>
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

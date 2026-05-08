"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const businessAreas = [
  {
    title: "금융 SI 및 차세대 시스템 구축",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    title: "IB 시스템 및 기업금융 업무 개발",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 4 5-7" />
      </svg>
    ),
  },
  {
    title: "고유자산·회계·채널 서비스 구축",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    title: "증권사·은행권 프로젝트 수행",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4" />
      </svg>
    ),
  },
  {
    title: "금융 IT 솔루션 고도화 및 운영 지원",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="6" rx="1" />
        <rect x="2" y="15" width="20" height="6" rx="1" />
        <path d="M6 6h.01M6 18h.01M10 6h.01M10 18h.01" />
      </svg>
    ),
  },
];

type FinancialSeries = {
  title: string;
  unit: string;
  englishLabel: string;
  data: { year: string; value: number; display: string }[];
  highlight: { value: string; sub: string; badge?: string };
  accent: string;
  accentSoft: string;
  accentSolidTop: string;
  accentSolidBottom: string;
  accentBarTop: string;
  accentBarBottom: string;
  accentBarBorder: string;
};

const revenueSeries: FinancialSeries = {
  title: "매출액",
  unit: "단위: 만원",
  englishLabel: "Revenue",
  data: [
    { year: "2023", value: 5608, display: "56억 8백만" },
    { year: "2024", value: 7480, display: "74억 8천만" },
    { year: "2025", value: 6670, display: "66억 7천만" },
  ],
  highlight: { value: "66.7억", sub: "2025년 매출액" },
  accent: "var(--color-accent-cyan)",
  accentSoft: "rgba(0, 212, 255, 0.14)",
  accentSolidTop: "rgba(0, 212, 255, 1)",
  accentSolidBottom: "rgba(0, 212, 255, 0.75)",
  accentBarTop: "rgba(0, 212, 255, 0.38)",
  accentBarBottom: "rgba(0, 212, 255, 0.18)",
  accentBarBorder: "rgba(0, 212, 255, 0.45)",
};

const assetsSeries: FinancialSeries = {
  title: "총자산",
  unit: "단위: 만원",
  englishLabel: "Total Assets",
  data: [
    { year: "2023", value: 1960, display: "19억 6천만" },
    { year: "2024", value: 3920, display: "39억 2천만" },
    { year: "2025", value: 5905, display: "59억 5백만" },
  ],
  highlight: { value: "59.05억", sub: "2025년 총자산", badge: "전년 대비 +51%" },
  accent: "var(--color-accent-emerald)",
  accentSoft: "rgba(16, 185, 129, 0.14)",
  accentSolidTop: "rgba(16, 185, 129, 1)",
  accentSolidBottom: "rgba(16, 185, 129, 0.75)",
  accentBarTop: "rgba(16, 185, 129, 0.38)",
  accentBarBottom: "rgba(16, 185, 129, 0.18)",
  accentBarBorder: "rgba(16, 185, 129, 0.45)",
};

function BarChart({ series }: { series: FinancialSeries }) {
  const max = Math.max(...series.data.map((d) => d.value));
  const barMaxHeight = 180; // px

  return (
    <div
      className="glass glass-static rounded-2xl p-6 sm:p-8"
      role="figure"
      aria-label={`${series.title} 3개년 추이: ${series.data
        .map((d) => `${d.year}년 ${d.display}원`)
        .join(", ")}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span
            className="text-[11px] tracking-[0.18em] font-bold uppercase"
            style={{
              color: series.accent,
              fontFamily: "var(--font-space-mono), monospace",
            }}
          >
            {series.englishLabel}
          </span>
          <h4 className="mt-1 text-[18px] font-bold text-ink">{series.title}</h4>
        </div>
        {series.highlight.badge && (
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold"
            style={{
              background: series.accentSoft,
              color: series.accent,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17l9.2-9.2M7 7h10v10" />
            </svg>
            {series.highlight.badge}
          </span>
        )}
      </div>

      {/* Big highlight number — like "+247%" pattern */}
      <div className="mb-6">
        <p
          className="font-black tracking-tight leading-none"
          style={{
            color: series.accent,
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)",
          }}
        >
          {series.highlight.value}
        </p>
        <p className="mt-1.5 text-[13px] text-dim tracking-wide">
          {series.highlight.sub}
        </p>
      </div>

      {/* Bars */}
      <div className="relative">
        <div
          className="flex items-end justify-around gap-3 sm:gap-5 border-b"
          style={{
            borderColor: "var(--color-glass-border)",
            height: `${barMaxHeight + 12}px`,
          }}
        >
          {series.data.map((d) => {
            const isLast = d.year === series.data[series.data.length - 1].year;
            const height = (d.value / max) * barMaxHeight;
            return (
              <div
                key={d.year}
                className="flex-1 flex flex-col items-center justify-end gap-2 min-w-0"
              >
                <span
                  className="text-[12px] sm:text-[13px] font-bold tracking-tight whitespace-nowrap"
                  style={{
                    color: isLast ? series.accent : "var(--color-text-muted)",
                  }}
                >
                  {d.display}
                </span>
                <motion.div
                  className="w-full max-w-[60px] rounded-t-md relative overflow-hidden"
                  style={{
                    background: isLast
                      ? `linear-gradient(180deg, ${series.accentSolidTop}, ${series.accentSolidBottom})`
                      : `linear-gradient(180deg, ${series.accentBarTop}, ${series.accentBarBottom})`,
                    border: `1px solid ${isLast ? series.accent : series.accentBarBorder}`,
                    boxShadow: isLast
                      ? `0 0 24px ${series.accentSoft}`
                      : "none",
                  }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}px` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                >
                  {isLast && (
                    <span
                      className="absolute inset-x-0 top-0 h-px"
                      style={{ background: "rgba(255,255,255,0.5)" }}
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Year labels */}
        <div className="mt-3 flex items-start justify-around gap-3 sm:gap-5">
          {series.data.map((d) => {
            const isLast = d.year === series.data[series.data.length - 1].year;
            return (
              <div
                key={d.year}
                className="flex-1 flex justify-center"
              >
                <span
                  className="text-[12px] tracking-[0.05em] font-semibold"
                  style={{
                    color: isLast ? "var(--color-text-primary)" : "var(--color-text-muted)",
                    fontFamily: "var(--font-space-mono), monospace",
                  }}
                >
                  {d.year}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p
        className="mt-5 text-[11px] tracking-wide text-dim"
        style={{ fontFamily: "var(--font-space-mono), monospace" }}
      >
        {series.unit} · 2025년 12월 기준
      </p>
    </div>
  );
}

export default function BusinessPerformance() {
  return (
    <section className="py-14 md:py-24 px-6 relative overflow-hidden">
      <div
        className="orb-float-slow absolute top-1/3 right-[5%] w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: "rgba(0, 212, 255, 0.04)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">
            Business & Performance
          </span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">
            사업활동 및 실적
          </h2>
        </motion.div>

        {/* Business areas grid */}
        <motion.ul
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {businessAreas.map((b, i) => (
            <motion.li
              key={b.title}
              variants={item}
              className="glass glass-static rounded-2xl p-6 group flex items-start gap-4"
            >
              <div
                className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: "rgba(0, 212, 255, 0.12)",
                  color: "var(--color-accent-cyan)",
                }}
              >
                {b.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="text-[11px] tracking-[0.18em] font-bold"
                  style={{
                    color: "var(--color-accent-cyan)",
                    fontFamily: "var(--font-space-mono), monospace",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 card-body text-ink font-semibold leading-snug">
                  {b.title}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Financial charts */}
        <motion.div
          className="mt-12 md:mt-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-[12px] tracking-[0.2em] font-bold uppercase"
              style={{
                color: "var(--color-accent-cyan)",
                fontFamily: "var(--font-space-mono), monospace",
              }}
            >
              Financial Highlights
            </span>
            <span
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(to right, var(--color-accent-cyan), transparent)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <BarChart series={revenueSeries} />
            <BarChart series={assetsSeries} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

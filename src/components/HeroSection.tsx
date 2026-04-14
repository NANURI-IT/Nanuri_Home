"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";

const STICKY_TEXT = "금융의 미래를 기술로 설계합니다";

function StickyChar({
  char,
  index,
  scrollY,
}: {
  char: string;
  index: number;
  scrollY: MotionValue<number>;
}) {
  const start = 260 + index * 7;
  const end = start + 110;
  const opacity = useTransform(scrollY, [start, end], [0, 1]);
  const y = useTransform(scrollY, [start, end], [22, 0]);
  const rawBlur = useTransform(scrollY, [start, end], [6, 0]);
  const filter = useTransform(rawBlur, (v: number) => `blur(${v}px)`);

  return (
    <motion.span
      style={{ opacity, y, filter, display: "inline-block" }}
      className={index >= 6 ? "gradient-text-inline" : ""}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const { scrollY } = useScroll();
  const [showSticky, setShowSticky] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShowSticky(v > 300));
  const barOpacity = useTransform(scrollY, [220, 320], [0, 1]);
  const lineScaleX = useTransform(scrollY, [220, 500], [0, 1]);

  /* Hero content fade-out on scroll */
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -100]);
  const contentScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.92]);
  const badgeOpacity = useTransform(scrollYProgress, [0.05, 0.22], [1, 0]);
  const buttonsOpacity = useTransform(scrollYProgress, [0.03, 0.18], [1, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.04, 0.2], [1, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.08, 0.28], [1, 0]);

  const stickyChars = STICKY_TEXT.split("");

  return (
    <>
      <section ref={ref} data-scene-anchor="hero" className="relative h-[150vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center px-6 overflow-hidden">
          <motion.div
            className="relative max-w-4xl mx-auto text-center"
            style={{ y: contentY, scale: contentScale, zIndex: 2 }}
          >
            {/* Badge */}
            <motion.div style={{ opacity: badgeOpacity }} className="animate-fade-in-up">
              <div
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 text-[11px] font-medium tracking-[0.1em] uppercase backdrop-blur-xl border"
                style={{
                  background: "var(--color-glass-bg)",
                  borderColor: "var(--color-glass-border)",
                  color: "var(--color-accent-cyan)",
                  fontFamily: "var(--font-space-mono), monospace",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full pulse-dot"
                  style={{
                    background: "var(--color-accent-cyan)",
                    boxShadow: "0 0 12px var(--color-accent-cyan)",
                  }}
                />
                2026 금융 IT 혁신 파트너
              </div>
            </motion.div>

            {/* Heading: 3 lines */}
            <motion.h1
              className="animate-fade-in-up-delay-1 font-black tracking-[-0.04em] leading-[0.95]"
              style={{
                opacity: headingOpacity,
                fontFamily: "var(--font-outfit), 'Noto Sans KR', sans-serif",
                fontSize: "clamp(3rem, 7.5vw, 7rem)",
              }}
            >
              <span className="block" style={{ color: "var(--color-text-primary)" }}>
                금융의 미래를
              </span>
              <span className="block gradient-text">기술로 설계합니다</span>
              <span className="block outline-text" style={{ fontSize: "0.55em" }}>
                NANURI IT
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="animate-fade-in-up-delay-2 mt-9 mx-auto max-w-xl leading-[1.8] font-light"
              style={{
                opacity: descOpacity,
                color: "var(--color-text-muted)",
                fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
              }}
            >
              수십 년간 금융권에서 쌓아온 경험과 전문성으로
              <br className="hidden sm:block" />
              차세대 금융 IT 서비스를 제공합니다
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="animate-fade-in-up-delay-3 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ opacity: buttonsOpacity }}
            >
              <Link
                href="/about"
                className="group relative w-full sm:w-auto sm:min-w-[200px] inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-[14px] font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.97] active:translate-y-0.5 overflow-hidden"
                style={{
                  background: "linear-gradient(170deg, rgba(0,212,255,0.9) 0%, rgba(99,102,241,0.8) 50%, rgba(99,102,241,0.7) 100%)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderBottom: "1px solid rgba(0,0,0,0.15)",
                  color: "#fff",
                  boxShadow: "0 10px 40px rgba(0,212,255,0.3), 0 2px 4px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.15)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                }}
              >
                {/* 상단 볼록 광택 */}
                <span
                  className="absolute inset-x-0 top-0 h-[50%] rounded-full pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)",
                  }}
                  aria-hidden="true"
                />
                {/* 하단 반사광 */}
                <span
                  className="absolute inset-x-4 bottom-[3px] h-[1px] rounded-full pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  }}
                  aria-hidden="true"
                />
                회사소개
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#business"
                className="group relative w-full sm:w-auto sm:min-w-[200px] inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-[14px] font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.97] active:translate-y-0.5 overflow-hidden"
                style={{
                  background: "linear-gradient(170deg, var(--color-glass-highlight), var(--color-glass-bg) 50%, var(--color-glass-bg))",
                  border: "1px solid var(--color-glass-border)",
                  color: "var(--color-ink)",
                  backdropFilter: "blur(20px) saturate(1.6)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08), inset 0 2px 0 var(--color-glass-highlight), inset 0 -2px 4px rgba(0,0,0,0.05)",
                }}
              >
                {/* 상단 볼록 광택 */}
                <span
                  className="absolute inset-x-0 top-0 h-[50%] rounded-full pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)",
                  }}
                  aria-hidden="true"
                />
                {/* 하단 반사광 */}
                <span
                  className="absolute inset-x-4 bottom-[3px] h-[1px] rounded-full pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  }}
                  aria-hidden="true"
                />
                사업영역 보기
                <svg className="w-4 h-4 opacity-60 group-hover:translate-y-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-space-mono), monospace",
              }}
            >
              Scroll
            </span>
            <span className="scroll-indicator-line" />
          </motion.div>
        </div>
      </section>

      {/* Sticky sub-bar — chars wave in from below */}
      <motion.div
        className="fixed top-16 left-0 right-0 z-40 pointer-events-none"
        style={{ opacity: barOpacity }}
        aria-hidden={!showSticky}
      >
        <motion.div
          className="h-px origin-left"
          style={{ scaleX: lineScaleX, background: "var(--color-glass-border)" }}
        />
        <div
          className="backdrop-blur-xl"
          style={{ background: "var(--color-glass-bg)" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-2.5">
            <p
              className="text-[13px] sm:text-[15px] font-bold tracking-tight inline-flex flex-wrap"
              style={{ color: "var(--color-text-primary)" }}
            >
              {stickyChars.map((char, i) => (
                <StickyChar key={i} char={char} index={i} scrollY={scrollY} />
              ))}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

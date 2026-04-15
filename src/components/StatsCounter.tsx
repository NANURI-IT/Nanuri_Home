"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 69, suffix: "+", label: "수행 프로젝트", sub: "PROJECTS" },
  { value: 15, suffix: "+", label: "주요 파트너", sub: "PARTNERS" },
  { value: 100, suffix: "%", label: "매출 증가율", sub: "GROWTH" },
  { value: 100, suffix: "+", label: "프로젝트 수주", sub: "ORDERS" },
];

export default function StatsCounter() {
  return (
    <section className="relative z-10 px-6 -mt-16 sm:-mt-20 mb-8">
      <motion.div
        className="glass glass-static max-w-5xl mx-auto rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="metrics-grid grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: 1 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="metrics-cell group py-10 px-6 text-center transition-colors duration-300"
            >
              <div
                className="text-4xl md:text-5xl font-black tracking-tight"
                style={{
                  color: "var(--color-accent-cyan)",
                  fontFamily: "var(--font-outfit), sans-serif",
                }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-[13px] font-semibold text-ink">{stat.label}</p>
              <p
                className="mt-1 text-[10px] tracking-[0.15em] uppercase text-dim"
                style={{ fontFamily: "var(--font-space-mono), monospace" }}
              >
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

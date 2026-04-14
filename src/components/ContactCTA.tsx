"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function ContactCTA() {
  const contactInfo = [
    {
      label: "전화",
      value: "02.6969.0319",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    },
    {
      label: "이메일",
      value: "mie.shin@nanuriit.kr",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>,
    },
    {
      label: "주소",
      value: "서울특별시 영등포구 선유로49길 23, 1016호 (양평동 4가, 아이에스비즈타워2차)",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    },
  ];

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto">
        {/* Main CTA glass card with conic rotation bg */}
        <motion.div
          className="glass relative rounded-2xl overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          {/* Rotating conic gradient background */}
          <div
            className="conic-rotate absolute"
            style={{
              top: "-60%",
              left: "-60%",
              width: "220%",
              height: "220%",
            }}
            aria-hidden="true"
          />

          <div className="relative text-center px-8 sm:px-14 py-16 sm:py-20">
            <div
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] mb-5"
              style={{ color: "var(--color-accent-cyan)", fontFamily: "var(--font-space-mono), monospace" }}
            >
              <span
                className="inline-block h-px w-9"
                style={{ background: "linear-gradient(to right, var(--color-accent-cyan), transparent)" }}
              />
              Let&apos;s Talk
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight leading-tight text-ink">
              고객의 가치를 실현하는
              <br />
              <span className="gradient-text">금융 솔루션</span>
            </h2>

            <p className="mt-6 text-[15px] text-body max-w-md mx-auto leading-relaxed">
              나누리아이티와 함께 맞춤형 금융 솔루션 도입을 문의하세요
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-[14px] font-bold transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo))",
                  color: "#000",
                  boxShadow: "0 4px 24px rgba(0, 212, 255, 0.25)",
                }}
              >
                도입 상담
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="tel:02-6969-0319"
                className="glass w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full text-[14px] font-semibold text-ink transition-all duration-300"
              >
                02.6969.0319
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact info cards */}
        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {contactInfo.map((info) => (
            <motion.div
              key={info.label}
              variants={item}
              className="glass rounded-2xl p-6 flex flex-col items-center gap-3 text-center"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(0, 212, 255, 0.1)",
                  color: "var(--color-accent-cyan)",
                }}
              >
                {info.icon}
              </div>
              <div>
                <p
                  className="text-[12px] font-semibold text-body uppercase tracking-wider"
                >
                  {info.label}
                </p>
                <p className="mt-1 text-[13px] text-ink font-medium">{info.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

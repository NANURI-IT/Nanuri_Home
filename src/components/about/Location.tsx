"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const contactInfo = [
  {
    label: "주소",
    value: "서울특별시 영등포구 선유로49길 23, 1016호\n(양평동 4가, 아이에스비즈타워2차)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "전화",
    value: "02.6969.0319",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "이메일",
    value: "info@nanuriit.kr",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
];

export default function Location() {
  return (
    <section className="py-14 md:py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Location</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">찾아오시는 길</h2>
          <p className="mt-4 text-[18px] text-body max-w-lg mx-auto leading-relaxed">
            전문 금융 솔루션을 통한 고객의 성공을 <br/> 나누리아이티가 함께합니다.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          {contactInfo.map((info) => (
            <div
              key={info.label}
              className="glass glass-static rounded-2xl p-6 flex flex-col items-center gap-3 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-raised flex items-center justify-center text-navy">
                {info.icon}
              </div>
              <div>
                <p className="card-meta font-medium text-dim uppercase tracking-wider">{info.label}</p>
                <p className="mt-1 card-body text-ink font-medium whitespace-pre-line">{info.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Map embed */}
        <motion.div
          className="mt-8 rounded-2xl overflow-hidden shadow-lg shadow-navy/10 border border-line"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.5!2d126.8916!3d37.5347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9ed5c14b5b0d%3A0x0!2z7ISc7Jq47Yq567OE7IucIOyYgeuTse2PrOq1rCDshKDsnKDroZw0Oeq4uCAyMw!5e0!3m2!1sko!2skr!4v1"
            width="100%"
            height="350"
            className="border-0 grayscale-[30%]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="나누리아이티 위치"
          />
        </motion.div>
      </div>
    </section>
  );
}

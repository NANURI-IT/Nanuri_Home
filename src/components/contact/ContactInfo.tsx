"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const contactInfo = [
  {
    label: "전화",
    value: "02.6969.0319",
    href: "tel:02-6969-0319",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "이메일",
    value: "mie.shin@nanuriit.kr",
    href: "mailto:mie.shin@nanuriit.kr",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
  {
    label: "주소",
    value: "서울특별시 영등포구 선유로49길 23, 1016호\n(양평동 4가, 아이에스비즈타워2차)",
    href: undefined,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div
        className="grid grid-cols-1 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {contactInfo.map((info) => {
          const content = (
            <motion.div
              key={info.label}
              variants={item}
              className="glass rounded-2xl p-6 flex items-center gap-4"
            >
              <div
                className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(0, 212, 255, 0.1)",
                  color: "var(--color-accent-cyan)",
                }}
              >
                {info.icon}
              </div>
              <div>
                <p
                  className="card-meta font-semibold text-body uppercase tracking-wider"
                >
                  {info.label}
                </p>
                <p className="mt-1 card-body text-ink font-medium whitespace-pre-line">
                  {info.value}
                </p>
              </div>
            </motion.div>
          );

          if (info.href) {
            return (
              <a key={info.label} href={info.href} className="transition-opacity hover:opacity-80">
                {content}
              </a>
            );
          }
          return <div key={info.label}>{content}</div>;
        })}
      </motion.div>

      {/* Google Map embed */}
      <motion.div
        className="rounded-2xl overflow-hidden border border-line"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={item}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.5!2d126.8916!3d37.5347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9ed5c14b5b0d%3A0x0!2z7ISc7Jq47Yq567OE7IucIOyYgeuTse2PrOq1rCDshKDsnKDroZw0Oeq4uCAyMw!5e0!3m2!1sko!2skr!4v1"
          width="100%"
          height="220"
          className="border-0 grayscale-[30%]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="나누리아이티 위치"
        />
      </motion.div>
    </div>
  );
}

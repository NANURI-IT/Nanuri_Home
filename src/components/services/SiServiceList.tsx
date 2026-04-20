"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const services = [
  "계좌/출납/뱅킹",
  "청약/권리",
  "주문/체결/결제",
  "유가증권 관리",
  "금융상품",
  "영업지원",
  "통합리스크",
  "DW/CRM",
  "영업 관리",
  "고객 관리",
  "여신 관리",
];

export default function SiServiceList() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Services</span>
          <h2 className="mt-3 text-2xl md:text-[28px] font-bold text-ink tracking-tight">제공 서비스</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service}
              variants={item}
              className="glass group relative rounded-xl overflow-hidden transition-shadow duration-400"
            >
              <div className="relative z-10 px-5 py-4 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                <span className="text-[15px] font-medium text-ink transition-colors duration-300">
                  <span className="group-hover:text-[color:var(--color-accent-cyan)] transition-colors">{service}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

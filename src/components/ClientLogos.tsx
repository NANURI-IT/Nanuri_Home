"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const logoItem = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const clients = [
  { name: "KB국민은행", logo: "KB", color: "#FFB300" },
  { name: "신한은행", logo: "신한", color: "#0046FF" },
  { name: "NH농협생명", logo: "NH", color: "#009A44" },
  { name: "우리은행", logo: "우리", color: "#0066B3" },
  { name: "하나금융그룹", logo: "하나", color: "#009B8D" },
  { name: "한화생명", logo: "한화", color: "#FF6B00" },
  { name: "한국투자증권", logo: "한투", color: "#003DA5" },
  { name: "Huray", logo: "H", color: "#E5318A" },
  { name: "하나증권", logo: "하나", color: "#009B8D" },
  { name: "KB증권", logo: "KB", color: "#FFB300" },
  { name: "한화S&C", logo: "S&C", color: "#FF6B00" },
  { name: "DB Inc.", logo: "DB", color: "#00843D" },
  { name: "투이컨설팅", logo: "2e", color: "#5E7A93" },
  { name: "S-Core", logo: "SC", color: "#1428A0" },
  { name: "SK AX", logo: "SK", color: "#ED1C24" },
];

export default function ClientLogos() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Partners</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">주요 고객사</h2>
          <p className="mt-4 text-[15px] text-body max-w-lg mx-auto leading-relaxed">
            나누리아이티는 꾸준한 성장과 더불어 다양한 고객사의 프로젝트를 성공적으로 수행하였습니다.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {clients.map((client) => (
            <motion.div
              key={client.name}
              variants={logoItem}
              className="glass group flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ backgroundColor: client.color }}
              >
                {client.logo}
              </div>
              <span className="text-[12px] font-medium text-body group-hover:text-ink whitespace-nowrap transition-colors duration-300">
                {client.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

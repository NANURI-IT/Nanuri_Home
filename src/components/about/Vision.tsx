"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 } },
};

export default function Vision() {
  return (
    <section className="py-14 md:py-24 px-6 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Vision</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">
            더 나은 금융 혁신을 위한 기술 개발
          </h2>
          <p className="mt-4 text-[15px] text-body max-w-xl mx-auto leading-relaxed">
            나누리아이티는 전문 IT 기술을 통해 새로운 금융 서비스를 제공할 수 있는 기업을 지향합니다.
          </p>
        </motion.div>

        <div className="glass glass-static mt-16 rounded-2xl overflow-hidden relative">
          <div className="orb-float absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-[100px]" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center p-8 md:p-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={slideLeft}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">창조적인 혁신</h3>
              <p className="mt-2 card-body text-dim tracking-wide">
                일상의 모든 순간, 더 나은 금융을 위한 IT 기업
              </p>
              <p className="mt-6 card-body text-body">
                금융에 필요한 모든 솔루션을 개발하는 나누리아이티는 고객의 비즈니스에 맞춘
                최적의 서비스를 제공하고, 지속적인 기술 개발을 통해 세계 최고의 금융 IT 기업이 되고자 합니다.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={slideRight}
              className="flex items-center justify-center"
            >
              <div className="p-8 rounded-2xl bg-white/[0.06] border border-white/[0.08]">
                <p className="text-2xl sm:text-3xl font-bold text-ink leading-relaxed italic text-center">
                  &ldquo;We Create new finance with
                  <br />
                  <span className="text-gold">Creative ideas</span> and <span className="text-gold">innovation</span>&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
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

const features = [
  {
    title: "Query 편집기",
    desc: "복잡한 금융 데이터 연동을 위한 직관적인 Query 편집 환경을 제공합니다. SQL·전문 파서·전문 편집까지 통합 지원합니다.",
    bullets: ["시각화된 Query 빌더", "전문 규격 자동 완성", "실시간 유효성 검사", "Query 버전 관리"],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
  {
    title: "강력한 시뮬레이터",
    desc: "개발 환경에서 실제 운영 환경을 정교하게 재현하는 시뮬레이터로 서비스 품질을 확보합니다.",
    bullets: ["서버 응답 시뮬레이션", "시세·주문 흐름 재현", "장애 시나리오 테스트", "성능 벤치마킹"],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
  },
  {
    title: "업무별 전용 컨트롤",
    desc: "금융 업무에 특화된 고품질 컨트롤 라이브러리를 제공하여 개발 생산성을 극대화합니다.",
    bullets: ["시세 그리드·차트 컨트롤", "호가·주문 패널", "다국어·통화 변환", "접근성 대응"],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  },
];

const devStack = [
  { label: "Hybrid App", value: "iOS · Android · Web" },
  { label: "Push Framework", value: "실시간 시세·알림" },
  { label: "Security", value: "E2E 암호화 · 인증" },
  { label: "OTA", value: "무중단 배포 · 원격 업데이트" },
];

const ideAreas = [
  {
    title: "Project Explorer",
    desc: "현재 프로젝트 파일의 목록을 표시하는 영역",
    color: "#E53E3E",
  },
  {
    title: "Menu / Tool Bar",
    desc: "File / Edit / View / Build / Help / 퀵버튼 등 스파이더젠 기능을 실행하는 영역",
    color: "#1A2540",
  },
  {
    title: "Layout",
    desc: "화면 구성 요소를 배치하고 편집하는 영역",
    color: "#3B82F6",
  },
  {
    title: "Properties",
    desc: "Layout에서 선택한 컴포넌트의 속성을 변경하는 영역",
    color: "#14B8A6",
  },
  {
    title: "Components",
    desc: "스파이더젠에서 제공하는 컴포넌트 리스트 영역",
    color: "#EAB308",
  },
];

export default function ChannelFunctions() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">Main Function</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">주요 기능</h2>
          <p className="mt-4 text-[15px] text-body max-w-2xl mx-auto leading-relaxed">
            Query 편집 및 강력한 시뮬레이터를 제공하며,
            각 업무에 맞춘 컨트롤을 다량 제공 및 구현 가능합니다.
          </p>
        </motion.div>

        {/* Screenshot showcase */}
        <motion.div
          className="glass mt-12 rounded-2xl overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          <div className="relative w-full bg-white rounded-xl overflow-hidden p-4">
            <Image
              src="/images/channel-functions.png"
              alt="채널 서비스 주요 기능 - Query 편집기, 시뮬레이터, 업무별 컨트롤 화면"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority={false}
            />
          </div>
        </motion.div>

        {/* IDE area descriptions */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {ideAreas.map((area) => (
            <motion.div
              key={area.title}
              variants={item}
              className="pl-4 border-l-[3px] relative"
              style={{ borderColor: area.color }}
            >
              <h3 className="text-[17px] font-bold tracking-tight" style={{ color: area.color }}>
                {area.title}
              </h3>
              <p className="mt-3 text-[13px] text-body leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 3 feature cards */}
        <motion.div
          className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="glass gradient-border group relative rounded-2xl overflow-hidden transition-shadow duration-500"
            >
              <div className="relative z-10 p-8">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.08] flex items-center justify-center text-body group-hover:text-gold group-hover:bg-gold/10 transition-all duration-400">
                  {f.icon}
                </div>
                <h3 className="mt-6 text-[17px] font-bold text-ink">{f.title}</h3>
                <p className="mt-3 text-[13px] text-body leading-relaxed">{f.desc}</p>
                <ul className="mt-5 space-y-2 pt-4 border-t border-white/[0.08]">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
                      <span className="text-[12px] text-body">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Development stack banner */}
        <motion.div
          className="mt-10 rounded-2xl overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={item}
        >
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
            {devStack.map((d) => (
              <div key={d.label} className="p-6 sm:p-7">
                <p className="text-[11px] text-gold font-bold tracking-widest uppercase">{d.label}</p>
                <p className="mt-2 text-[14px] font-semibold text-ink">{d.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={item}
        >
          <Link
            href="/#contact"
            className="group glow-btn relative inline-flex items-center gap-2 px-8 py-4 bg-gold text-ink text-sm font-semibold rounded-xl hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all"
          >
            채널 서비스 문의
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

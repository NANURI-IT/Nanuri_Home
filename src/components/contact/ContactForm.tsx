"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const serviceOptions = [
  "금융 SI",
  "IB 시스템(IBIMS)",
  "고유자산",
  "토큰증권(STO)",
  "회계 서비스",
  "채널 서비스",
  "기타",
];

const inputBaseClass =
  "w-full rounded-xl px-4 py-3 text-[14px] text-ink placeholder:text-body border outline-none transition-all duration-200";

const inputStyle = {
  background: "var(--color-card)",
  borderColor: "var(--color-glass-border)",
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company: "",
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // mailto fallback — 추후 API Route로 교체
    const subject = encodeURIComponent(
      `[도입 상담] ${form.company} - ${form.service}`
    );
    const body = encodeURIComponent(
      `회사명: ${form.company}\n담당자명: ${form.name}\n연락처: ${form.phone}\n관심 서비스: ${form.service}\n\n${form.message}`
    );
    window.open(`mailto:mie.shin@nanuriit.kr?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="glass rounded-2xl p-10 sm:p-14 flex flex-col items-center justify-center text-center min-h-[400px]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
          style={{
            background: "rgba(0, 212, 255, 0.15)",
            color: "var(--color-accent-cyan)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-ink">문의가 접수되었습니다</h3>
        <p className="mt-3 text-[14px] text-body max-w-sm leading-relaxed">
          빠른 시일 내에 담당자가 연락드리겠습니다.
          <br />
          감사합니다.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ company: "", name: "", phone: "", service: "", message: "" });
          }}
          className="mt-8 text-[13px] font-medium transition-colors"
          style={{ color: "var(--color-accent-cyan)" }}
        >
          새 문의 작성하기
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-8 sm:p-10 flex flex-col gap-5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={item}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-[12px] font-semibold text-body mb-1.5 uppercase tracking-wider">
            회사명 <span style={{ color: "var(--color-accent-rose)" }}>*</span>
          </label>
          <input
            id="company"
            type="text"
            required
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="회사명을 입력해주세요"
            className={`${inputBaseClass} focus:ring-2 focus:ring-cyan-500/30 focus:border-[var(--color-accent-cyan)]`}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-[12px] font-semibold text-body mb-1.5 uppercase tracking-wider">
            담당자명 <span style={{ color: "var(--color-accent-rose)" }}>*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="담당자명을 입력해주세요"
            className={`${inputBaseClass} focus:ring-2 focus:ring-cyan-500/30 focus:border-[var(--color-accent-cyan)]`}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-[12px] font-semibold text-body mb-1.5 uppercase tracking-wider">
            연락처 <span style={{ color: "var(--color-accent-rose)" }}>*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="010-0000-0000"
            className={`${inputBaseClass} focus:ring-2 focus:ring-cyan-500/30 focus:border-[var(--color-accent-cyan)]`}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-[12px] font-semibold text-body mb-1.5 uppercase tracking-wider">
            관심 서비스 <span style={{ color: "var(--color-accent-rose)" }}>*</span>
          </label>
          <select
            id="service"
            required
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={`${inputBaseClass} focus:ring-2 focus:ring-cyan-500/30 focus:border-[var(--color-accent-cyan)] appearance-none`}
            style={inputStyle}
          >
            <option value="" disabled>
              서비스를 선택해주세요
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-[12px] font-semibold text-body mb-1.5 uppercase tracking-wider">
          메시지
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="문의하실 내용을 입력해주세요"
          className={`${inputBaseClass} resize-none focus:ring-2 focus:ring-cyan-500/30 focus:border-[var(--color-accent-cyan)]`}
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        className="group mt-2 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[14px] font-bold transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo))",
          color: "#000",
          boxShadow: "0 4px 24px rgba(0, 212, 255, 0.25)",
        }}
      >
        도입 상담 신청하기
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </motion.form>
  );
}

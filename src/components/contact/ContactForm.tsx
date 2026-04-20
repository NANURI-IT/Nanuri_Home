"use client";

import { useState } from "react";
import Link from "next/link";
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
  "w-full rounded-xl px-4 py-3 card-body text-ink placeholder:text-body border outline-none transition-all duration-200";

const inputStyle = {
  background: "var(--color-card)",
  borderColor: "var(--color-glass-border)",
};

const EMAIL = "info@nanuriit.kr";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [mailFailed, setMailFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [agreed, setAgreed] = useState(false);
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
    if (!agreed) return;

    const subject = encodeURIComponent(
      `[도입 상담] ${form.company} - ${form.service}`
    );
    const body = encodeURIComponent(
      `회사명: ${form.company}\n담당자명: ${form.name}\n연락처: ${form.phone}\n관심 서비스: ${form.service}\n\n${form.message}`
    );

    // mailto 시도 후 메일 앱이 열렸는지 감지
    let mailOpened = false;
    const onBlur = () => { mailOpened = true; };
    window.addEventListener("blur", onBlur);

    const link = document.createElement("a");
    link.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    link.click();

    setTimeout(() => {
      window.removeEventListener("blur", onBlur);
      setSubmitted(true);
      if (!mailOpened) {
        setMailFailed(true);
      }
    }, 1000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <motion.div
        className="glass rounded-2xl p-10 sm:p-14 flex flex-col items-center justify-center text-center min-h-[400px]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {mailFailed ? (
          <>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
              style={{
                background: "rgba(245, 158, 11, 0.15)",
                color: "var(--color-accent-amber)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-ink">
              기본 메일 앱이 설정되어 있지 않습니다
            </h3>
            <p className="mt-3 card-body text-body max-w-sm">
              개인 메일로 상담 요청 부탁드립니다.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="card-body font-medium text-ink">{EMAIL}</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg card-meta font-medium transition-all duration-200"
                style={{
                  background: copied
                    ? "rgba(16, 185, 129, 0.15)"
                    : "rgba(0, 212, 255, 0.1)",
                  color: copied
                    ? "var(--color-accent-emerald)"
                    : "var(--color-accent-cyan)",
                }}
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    복사됨
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    이메일 복사
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
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
            <h3 className="text-xl font-bold text-ink">메일 앱이 열렸습니다</h3>
            <p className="mt-3 card-body text-body max-w-sm">
              메일 앱에서 내용을 확인하시고 전송해주세요.
              <br />
              감사합니다.
            </p>
          </>
        )}
        <button
          onClick={() => {
            setSubmitted(false);
            setMailFailed(false);
            setCopied(false);
            setAgreed(false);
            setForm({ company: "", name: "", phone: "", service: "", message: "" });
          }}
          className="mt-8 card-meta font-medium transition-colors"
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
          <label htmlFor="company" className="block card-meta font-semibold text-body mb-1.5 uppercase tracking-wider">
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
          <label htmlFor="name" className="block card-meta font-semibold text-body mb-1.5 uppercase tracking-wider">
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
          <label htmlFor="phone" className="block card-meta font-semibold text-body mb-1.5 uppercase tracking-wider">
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
          <label htmlFor="service" className="block card-meta font-semibold text-body mb-1.5 uppercase tracking-wider">
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
            <option value="" disabled className="bg-[var(--color-surface)] text-[var(--color-ink)]">
              서비스를 선택해주세요
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s} className="bg-[var(--color-surface)] text-[var(--color-ink)]">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block card-meta font-semibold text-body mb-1.5 uppercase tracking-wider">
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

      {/* 개인정보 수집·이용 동의 */}
      <div
        className="mt-2 rounded-xl p-4 border"
        style={{
          background: "var(--color-card)",
          borderColor: "var(--color-glass-border)",
        }}
      >
        <p className="card-meta font-semibold text-body uppercase tracking-wider mb-2">
          개인정보 수집·이용 동의
        </p>
        <ul className="text-[13px] text-body leading-relaxed mb-3 list-disc pl-5 flex flex-col gap-1">
          <li>
            <span className="text-ink font-medium">수집 항목</span>: 회사명,
            담당자명, 연락처, 관심 서비스, 문의 메시지
          </li>
          <li>
            <span className="text-ink font-medium">수집·이용 목적</span>: 도입
            상담 문의 응대 및 서비스 안내
          </li>
          <li>
            <span className="text-ink font-medium">보유·이용 기간</span>: 문의
            처리 완료 후 1년간 보관 후 파기
          </li>
        </ul>
        <p className="text-[12px] text-body mb-3">
          정보주체는 동의를 거부할 권리가 있으며, 동의 거부 시 문의 접수가
          제한될 수 있습니다. 자세한 내용은{" "}
          <Link
            href="/privacy"
            className="underline font-semibold"
            style={{ color: "var(--color-accent-cyan)" }}
            target="_blank"
            rel="noopener"
          >
            개인정보처리방침
          </Link>
          을 확인해주세요.
        </p>
        <label className="flex items-start gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 shrink-0 accent-[var(--color-accent-cyan)] cursor-pointer"
          />
          <span className="text-[14px] text-ink">
            위 개인정보 수집·이용에 동의합니다{" "}
            <span style={{ color: "var(--color-accent-rose)" }}>*</span>
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={!agreed}
        className="group mt-2 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full card-body font-bold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const REPORT_EMAIL = "info@nanuriit.kr";

const protections = [
  {
    title: "비밀 보장",
    desc: "신고자의 인적사항과 신고 내용은 관련 법령에 따라 철저히 보호됩니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
  {
    title: "보복 금지",
    desc: "정당한 신고를 이유로 신고자에게 어떠한 불이익도 가해지지 않습니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 14.14 14.14" />
      </svg>
    ),
  },
  {
    title: "신고자 보호",
    desc: "신원 노출 우려가 있는 경우 보호 조치를 시행하며, 익명 신고도 가능합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "익명 가능",
    desc: "이름·연락처 없이도 신고할 수 있으며, 처리 결과 회신을 받으려면 연락처를 남겨주세요.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M20 8v6M17 11h6" />
      </svg>
    ),
  },
  {
    title: "처리 절차 안내",
    desc: "접수 → 사실관계 조사 → 위반 시 조치 → 결과 통보(신청 시) 순으로 처리됩니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
  },
];

const targets = [
  "뇌물 수수, 부당한 금품·향응 제공 또는 청탁",
  "회사 자산의 횡령·배임, 부패 행위",
  "비밀정보·내부정보 무단 유출 또는 외부 공유",
  "미공개 정보를 이용한 불공정 행위 (자금세탁, 내부자 거래 등)",
  "공정거래법 위반, 그 밖의 불법·비윤리적 행위",
];

const process = [
  { step: "01", label: "신고 접수", desc: "이메일/전화/우편 등으로 신고가 접수됩니다." },
  { step: "02", label: "사실관계 조사", desc: "내부 절차에 따라 조사를 진행합니다." },
  { step: "03", label: "위반 시 조치", desc: "위반 사실 확인 시 사규 및 관련 법령에 따라 조치합니다." },
  { step: "04", label: "결과 통보", desc: "회신을 신청한 신고자에게 결과를 안내합니다." },
];

const categories = [
  { value: "뇌물·청탁", label: "뇌물 수수·청탁" },
  { value: "부패·횡령·배임", label: "부패·횡령·배임" },
  { value: "정보유출·내부정보", label: "정보 유출·내부정보 부정 사용" },
  { value: "공정거래 위반", label: "공정거래·공정경쟁 위반" },
  { value: "괴롭힘·차별", label: "직장 내 괴롭힘·차별" },
  { value: "기타", label: "기타 비윤리적 행위" },
];

export default function EthicsReport() {
  const [type, setType] = useState<"open" | "anonymous">("open");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(categories[0].value);
  const [occurredAt, setOccurredAt] = useState("");
  const [content, setContent] = useState("");
  const [wantsResult, setWantsResult] = useState(false);
  const [consent, setConsent] = useState(false);

  const isAnonymous = type === "anonymous";

  const mailtoHref = useMemo(() => {
    const lines = [
      "===== 윤리경영 위반 신고 =====",
      `[신고 유형] ${isAnonymous ? "익명 신고" : "실명 신고"}`,
      `[신고 분류] ${category}`,
      `[발생 일시/장소] ${occurredAt || "-"}`,
      isAnonymous
        ? "[신고자] 익명"
        : `[신고자] ${name || "-"} / 연락처: ${contact || "-"} / 이메일: ${email || "-"}`,
      `[결과 회신 희망] ${wantsResult ? "예" : "아니오"}`,
      "",
      "[신고 내용]",
      content || "-",
      "",
      "----",
      "개인정보 수집·이용 동의: " + (consent ? "동의" : "미동의"),
    ];
    const subject = `[윤리 신고] ${category} - ${
      isAnonymous ? "익명" : name || "이름 미기재"
    }`;
    const body = lines.join("\n");
    return `mailto:${REPORT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [isAnonymous, category, occurredAt, name, contact, email, wantsResult, content, consent]);

  const contentTooShort = content.trim().length > 0 && content.trim().length < 50;
  const canSubmit = consent && content.trim().length >= 50;

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden">
        <div className="orb-float absolute top-[10%] left-[8%] w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(244, 63, 94, 0.08)" }} aria-hidden="true" />
        <div className="orb-float-reverse absolute bottom-[10%] right-[8%] w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(99, 102, 241, 0.06)" }} aria-hidden="true" />
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

        <motion.div
          className="relative max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={item}
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{
              color: "var(--color-accent-rose)",
              fontFamily: "var(--font-space-mono), monospace",
            }}
          >
            Whistleblower Channel
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-[44px] font-bold text-ink leading-[1.15] tracking-tight">
            윤리경영 <span className="gradient-text">위반 신고</span>
          </h1>
          <p className="mt-6 text-[16px] sm:text-[17px] text-body leading-relaxed max-w-2xl mx-auto">
            신고자의 신원과 신고 내용은 철저히 보호됩니다.
            <br className="hidden sm:block" />
            정당한 신고를 이유로 어떠한 불이익도 가해지지 않습니다.
          </p>
        </motion.div>
      </section>

      {/* Protection promises */}
      <section className="py-10 md:py-16 px-6 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={item}
          >
            <span className="text-xs font-semibold text-navy tracking-widest uppercase">
              Protection Promise
            </span>
            <h2 className="mt-3 text-2xl md:text-[28px] font-bold text-ink tracking-tight">
              신고자 보호 약속
            </h2>
          </motion.div>

          <motion.ul
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {protections.map((p) => (
              <motion.li
                key={p.title}
                variants={item}
                className="glass glass-static rounded-2xl p-6 group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: "rgba(244, 63, 94, 0.12)", color: "var(--color-accent-rose)" }}
                >
                  {p.icon}
                </div>
                <h3 className="text-[15px] font-bold text-ink leading-snug">{p.title}</h3>
                <p className="mt-2 text-[13px] text-body leading-relaxed">{p.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Report targets */}
      <section className="py-10 md:py-16 px-6 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="glass glass-static rounded-2xl p-7 sm:p-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={item}
          >
            <span
              className="text-[11px] tracking-[0.2em] font-bold uppercase"
              style={{
                color: "var(--color-accent-cyan)",
                fontFamily: "var(--font-space-mono), monospace",
              }}
            >
              What to Report
            </span>
            <h2 className="mt-3 text-xl sm:text-[24px] font-bold text-ink tracking-tight">
              이런 사항을 신고하실 수 있습니다
            </h2>

            <ul className="mt-6 space-y-3">
              {targets.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{
                      background: "rgba(0, 212, 255, 0.15)",
                      color: "var(--color-accent-cyan)",
                      fontFamily: "var(--font-space-mono), monospace",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="card-body text-body">{t}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="py-14 md:py-20 px-6 relative overflow-hidden scroll-mt-24">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={item}
          >
            <span className="text-xs font-semibold text-navy tracking-widest uppercase">
              Report Form
            </span>
            <h2 className="mt-3 text-2xl md:text-[28px] font-bold text-ink tracking-tight">
              신고서 작성
            </h2>
            <p className="mt-3 text-[14px] text-dim max-w-2xl mx-auto leading-relaxed">
              작성하신 내용은 메일 클라이언트로 전달되며, 전송 버튼을 누르면 실제 이메일이
              발송됩니다. 정적 사이트 특성상 첨부파일은 메일 작성 화면에서 직접 추가해주세요.
            </p>
          </motion.div>

          <motion.form
            className="glass glass-static rounded-3xl p-6 sm:p-10 space-y-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={item}
            onSubmit={(e) => {
              if (!canSubmit) {
                e.preventDefault();
              }
            }}
            action={mailtoHref}
            method="post"
            encType="text/plain"
          >
            {/* Type radio */}
            <fieldset>
              <legend className="text-[13px] font-bold text-ink mb-3">신고 유형</legend>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    { v: "open", label: "실명 신고" },
                    { v: "anonymous", label: "익명 신고" },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.v}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-semibold cursor-pointer transition-colors"
                    style={{
                      background:
                        type === opt.v
                          ? "rgba(0, 212, 255, 0.18)"
                          : "var(--color-glass-bg)",
                      border: `1px solid ${
                        type === opt.v
                          ? "var(--color-accent-cyan)"
                          : "var(--color-glass-border)"
                      }`,
                      color:
                        type === opt.v
                          ? "var(--color-accent-cyan)"
                          : "var(--color-text-primary)",
                    }}
                  >
                    <input
                      type="radio"
                      name="report-type"
                      value={opt.v}
                      checked={type === opt.v}
                      onChange={() => setType(opt.v)}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Personal info — only when not anonymous */}
            {!isAnonymous && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="이름">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="홍길동"
                  />
                </Field>
                <Field label="연락처 (선택)">
                  <input
                    type="tel"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="input"
                    placeholder="010-1234-5678"
                  />
                </Field>
                <Field label="회신용 이메일 (선택)" className="md:col-span-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="example@email.com"
                  />
                </Field>
              </div>
            )}

            {/* Category */}
            <Field label="신고 분류">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map((c) => (
                  <label
                    key={c.value}
                    className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-[13px] cursor-pointer transition-colors"
                    style={{
                      background:
                        category === c.value
                          ? "rgba(0, 212, 255, 0.15)"
                          : "var(--color-glass-bg)",
                      border: `1px solid ${
                        category === c.value
                          ? "var(--color-accent-cyan)"
                          : "var(--color-glass-border)"
                      }`,
                      color:
                        category === c.value
                          ? "var(--color-accent-cyan)"
                          : "var(--color-text-primary)",
                      fontWeight: category === c.value ? 700 : 500,
                    }}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={c.value}
                      checked={category === c.value}
                      onChange={() => setCategory(c.value)}
                      className="sr-only"
                    />
                    {c.label}
                  </label>
                ))}
              </div>
            </Field>

            {/* Occurred at */}
            <Field label="사건 발생 일시 / 장소 (선택)">
              <input
                type="text"
                value={occurredAt}
                onChange={(e) => setOccurredAt(e.target.value)}
                className="input"
                placeholder="예: 2026.05.10 / 서울 사무실"
              />
            </Field>

            {/* Content */}
            <Field
              label="신고 내용"
              required
              hint={`최소 50자 이상 (현재 ${content.trim().length}자)`}
            >
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="input resize-y"
                placeholder="육하원칙(누가/언제/어디서/무엇을/어떻게/왜)에 따라 구체적으로 작성해주시면 사실관계 조사에 도움이 됩니다."
                required
              />
              {contentTooShort && (
                <p className="mt-1 text-[12px]" style={{ color: "var(--color-accent-rose)" }}>
                  50자 이상 입력해주세요.
                </p>
              )}
            </Field>

            {/* Result notification */}
            <label className="flex items-start gap-3 cursor-pointer text-[14px]">
              <input
                type="checkbox"
                checked={wantsResult}
                onChange={(e) => setWantsResult(e.target.checked)}
                className="mt-1 w-4 h-4 cursor-pointer"
                style={{ accentColor: "var(--color-accent-cyan)" }}
              />
              <span className="text-body">
                처리 결과 회신을 희망합니다. (회신을 위해서는 연락처 또는 이메일이
                필요합니다)
              </span>
            </label>

            {/* Consent */}
            <label className="flex items-start gap-3 cursor-pointer text-[14px]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 cursor-pointer"
                style={{ accentColor: "var(--color-accent-cyan)" }}
                required
              />
              <span className="text-body">
                <span className="text-ink font-semibold">[필수]</span> 신고 처리를 위한 개인정보
                수집·이용에 동의합니다. (수집항목: 이름·연락처·이메일 / 보유기간: 신고 처리
                완료 시까지, 익명 신고 시에는 수집되지 않습니다)
              </span>
            </label>

            {/* Submit */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={canSubmit ? mailtoHref : undefined}
                aria-disabled={!canSubmit}
                onClick={(e) => {
                  if (!canSubmit) {
                    e.preventDefault();
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[15px] font-bold transition-all duration-300"
                style={{
                  background: canSubmit
                    ? "linear-gradient(135deg, var(--color-accent-rose), var(--color-accent-indigo))"
                    : "var(--color-glass-bg)",
                  color: canSubmit ? "#fff" : "var(--color-text-muted)",
                  boxShadow: canSubmit
                    ? "0 4px 20px rgba(244, 63, 94, 0.25)"
                    : "none",
                  border: canSubmit
                    ? "none"
                    : "1px solid var(--color-glass-border)",
                  pointerEvents: canSubmit ? "auto" : "none",
                  opacity: canSubmit ? 1 : 0.55,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m22 2-7 20-4-9-9-4z" />
                  <path d="M22 2 11 13" />
                </svg>
                이메일 클라이언트로 전송
              </a>
              {!canSubmit && (
                <p className="text-[13px] text-dim">
                  개인정보 수집 동의와 50자 이상의 신고 내용을 입력해주세요.
                </p>
              )}
            </div>

            <p className="text-[12px] text-dim leading-relaxed pt-2 border-t" style={{ borderColor: "var(--color-glass-border)" }}>
              ※ 전송 버튼을 누르면 사용자의 기본 메일 프로그램이 열립니다. 본문 내용을
              확인한 뒤 직접 전송해주세요. 첨부파일이 필요한 경우 메일 작성 화면에서 추가할
              수 있습니다. 메일 프로그램이 열리지 않는 환경에서는 아래 대체 채널을
              이용해주세요.
            </p>
          </motion.form>
        </div>
      </section>

      {/* Alternative channels */}
      <section className="py-14 md:py-20 px-6 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={item}
          >
            <span className="text-xs font-semibold text-navy tracking-widest uppercase">
              Alternative Channels
            </span>
            <h2 className="mt-3 text-2xl md:text-[28px] font-bold text-ink tracking-tight">
              대체 신고 채널
            </h2>
            <p className="mt-3 text-[14px] text-body max-w-2xl mx-auto leading-relaxed">
              아래 채널 중 편리한 방법을 선택해 신고하실 수 있습니다.
            </p>
          </motion.div>

          <motion.ul
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.li variants={item} className="glass glass-static rounded-2xl p-6">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(0, 212, 255, 0.12)", color: "var(--color-accent-cyan)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m22 6-10 7L2 6" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </div>
              <h3 className="text-[15px] font-bold text-ink">이메일</h3>
              <a
                href={`mailto:${REPORT_EMAIL}`}
                className="mt-2 inline-block text-[14px] font-semibold hover:underline"
                style={{ color: "var(--color-accent-cyan)" }}
              >
                {REPORT_EMAIL}
              </a>
            </motion.li>

            <motion.li variants={item} className="glass glass-static rounded-2xl p-6">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(0, 212, 255, 0.12)", color: "var(--color-accent-cyan)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.95.36 1.88.7 2.78a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.83.57 2.78.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="text-[15px] font-bold text-ink">전화</h3>
              <a
                href="tel:02-6959-0319"
                className="mt-2 inline-block text-[14px] font-semibold hover:underline"
                style={{ color: "var(--color-accent-cyan)" }}
              >
                02.6959.0319
              </a>
              <p className="mt-1 text-[12px] text-dim">평일 09:00–18:00</p>
            </motion.li>

            <motion.li variants={item} className="glass glass-static rounded-2xl p-6">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(0, 212, 255, 0.12)", color: "var(--color-accent-cyan)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="M9 22V12h6v10" />
                </svg>
              </div>
              <h3 className="text-[15px] font-bold text-ink">우편</h3>
              <p className="mt-2 text-[13px] text-body leading-relaxed">
                서울시 영등포구 선유로49길 23,
                <br />
                1016호 (아이에스비즈타워2차)
              </p>
              <p className="mt-1 text-[12px] text-dim">경영지원실 윤리경영 담당자 앞</p>
            </motion.li>
          </motion.ul>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 md:py-24 px-6 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={item}
          >
            <span className="text-xs font-semibold text-navy tracking-widest uppercase">
              Process
            </span>
            <h2 className="mt-3 text-2xl md:text-[28px] font-bold text-ink tracking-tight">
              신고 처리 절차
            </h2>
          </motion.div>

          <motion.ol
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {process.map((p, i) => (
              <motion.li
                key={p.step}
                variants={item}
                className="glass glass-static rounded-2xl p-6 relative"
              >
                <span
                  className="font-black tracking-tight leading-none"
                  style={{
                    color: "var(--color-accent-cyan)",
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "2.2rem",
                    opacity: 0.85,
                  }}
                >
                  {p.step}
                </span>
                <h3 className="mt-3 text-[16px] font-bold text-ink">{p.label}</h3>
                <p className="mt-2 text-[13px] text-body leading-relaxed">{p.desc}</p>
                {i < process.length - 1 && (
                  <span
                    className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-dim"
                    aria-hidden="true"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ol>

          {/* Back link */}
          <div className="mt-14 text-center">
            <Link
              href="/esg/ethics"
              className="inline-flex items-center gap-2 text-[14px] font-semibold transition-colors duration-300 hover:text-[color:var(--color-accent-cyan)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              윤리경영 정책 페이지로 돌아가기
            </Link>
          </div>
        </div>
      </section>

      {/* Local input styling — uses CSS-in-JS via a style tag scoped via specific class */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          background: var(--color-glass-bg);
          border: 1px solid var(--color-glass-border);
          color: var(--color-text-primary);
          font-size: 14px;
          line-height: 1.6;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .input::placeholder {
          color: var(--color-text-muted);
          opacity: 0.7;
        }
        .input:focus {
          border-color: var(--color-accent-cyan);
          background: var(--color-glass-hover);
        }
      `}</style>
    </>
  );
}

function Field({
  label,
  children,
  required,
  hint,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-bold text-ink">
          {label}
          {required && (
            <span className="ml-1" style={{ color: "var(--color-accent-rose)" }}>
              *
            </span>
          )}
        </span>
        {hint && (
          <span className="text-[12px] text-dim">{hint}</span>
        )}
      </div>
      {children}
    </label>
  );
}

# /contact 도입 상담 페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 도입 상담 전용 페이지(`/contact`)를 추가하고, 사이트 전반의 "도입 문의" 버튼들을 적절히 라우팅 변경한다.

**Architecture:** 2-column glass 레이아웃(폼 좌 / 정보 우), 모바일 시 단일 컬럼 스택. 이메일 전송은 mailto fallback(추후 API Route 교체 가능). 기존 about 페이지 패턴(Header + main + Footer)을 그대로 따른다.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, framer-motion 12, CSS 변수 테마

---

## File Structure

| Action | Path                                               | Responsibility                                   |
| ------ | -------------------------------------------------- | ------------------------------------------------ |
| Create | `src/app/contact/page.tsx`                         | 페이지 컴포넌트 + metadata                       |
| Create | `src/components/contact/ContactForm.tsx`           | 폼 glass 패널                                    |
| Create | `src/components/contact/ContactInfo.tsx`           | 회사 정보 카드 + 지도                            |
| Modify | `src/components/Header.tsx:169-178, 237-246`       | "도입 문의" → "도입 상담", href → `/contact`     |
| Modify | `src/components/ContactCTA.tsx:80-93`              | "도입 문의하기" → "도입 상담", href → `/contact` |
| Modify | `src/components/services/IbimsWorkflow.tsx:60`     | href → `/contact`                                |
| Modify | `src/components/services/SiLoanSystem.tsx:150`     | href → `/contact`                                |
| Modify | `src/components/services/PropWorkflow.tsx:223`     | href → `/contact`                                |
| Modify | `src/components/services/StoWorkflow.tsx:163`      | href → `/contact`                                |
| Modify | `src/components/services/AcctWorkflow.tsx:61`      | href → `/contact`                                |
| Modify | `src/components/services/ChannelFunctions.tsx:197` | href → `/contact`                                |

---

### Task 1: ContactInfo 컴포넌트 생성

**Files:**

- Create: `src/components/contact/ContactInfo.tsx`

- [ ] **Step 1: Create ContactInfo component**

```tsx
"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
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
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "이메일",
    value: "info@nanuriit.kr",
    href: "mailto:info@nanuriit.kr",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
  {
    label: "주소",
    value:
      "서울특별시 영등포구 선유로49길 23, 1016호\n(양평동 4가, 아이에스비즈타워2차)",
    href: undefined,
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
                  className="text-[10px] font-medium uppercase tracking-[0.12em] text-dim"
                  style={{ fontFamily: "var(--font-space-mono), monospace" }}
                >
                  {info.label}
                </p>
                <p className="mt-1 text-[13px] text-ink font-medium whitespace-pre-line">
                  {info.value}
                </p>
              </div>
            </motion.div>
          );

          if (info.href) {
            return (
              <a
                key={info.label}
                href={info.href}
                className="transition-opacity hover:opacity-80"
              >
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
```

- [ ] **Step 2: Verify file renders without errors**

Run: dev server should show no compilation errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/ContactInfo.tsx
git commit -m "feat: add ContactInfo component with company info cards and map"
```

---

### Task 2: ContactForm 컴포넌트 생성

**Files:**

- Create: `src/components/contact/ContactForm.tsx`

- [ ] **Step 1: Create ContactForm component**

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
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
  "w-full rounded-xl px-4 py-3 text-[14px] text-ink placeholder:text-dim border outline-none transition-all duration-200";

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
      `[도입 상담] ${form.company} - ${form.service}`,
    );
    const body = encodeURIComponent(
      `회사명: ${form.company}\n담당자명: ${form.name}\n연락처: ${form.phone}\n관심 서비스: ${form.service}\n\n${form.message}`,
    );
    window.open(`mailto:info@nanuriit.kr?subject=${subject}&body=${body}`);
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
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
            setForm({
              company: "",
              name: "",
              phone: "",
              service: "",
              message: "",
            });
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
          <label
            htmlFor="company"
            className="block text-[12px] font-medium text-dim mb-1.5 uppercase tracking-wider"
          >
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
          <label
            htmlFor="name"
            className="block text-[12px] font-medium text-dim mb-1.5 uppercase tracking-wider"
          >
            담당자명{" "}
            <span style={{ color: "var(--color-accent-rose)" }}>*</span>
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
          <label
            htmlFor="phone"
            className="block text-[12px] font-medium text-dim mb-1.5 uppercase tracking-wider"
          >
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
          <label
            htmlFor="service"
            className="block text-[12px] font-medium text-dim mb-1.5 uppercase tracking-wider"
          >
            관심 서비스{" "}
            <span style={{ color: "var(--color-accent-rose)" }}>*</span>
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
        <label
          htmlFor="message"
          className="block text-[12px] font-medium text-dim mb-1.5 uppercase tracking-wider"
        >
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
          background:
            "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo))",
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
```

- [ ] **Step 2: Verify file renders without errors**

Run: dev server should show no compilation errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/ContactForm.tsx
git commit -m "feat: add ContactForm component with mailto fallback"
```

---

### Task 3: /contact 페이지 생성

**Files:**

- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create page component**

```tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "도입 상담",
  description:
    "나누리아이티에 맞춤형 금융 솔루션 도입을 문의하세요. 금융 SI, IB 시스템, 고유자산, 토큰증권, 회계·채널 서비스까지 전문 상담을 제공합니다.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <section className="py-20 sm:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <div className="text-center mb-14">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{
                  color: "var(--color-accent-cyan)",
                  fontFamily: "var(--font-space-mono), monospace",
                }}
              >
                Contact Us
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight text-ink">
                도입 상담
              </h1>
              <p className="mt-4 text-[15px] text-body max-w-lg mx-auto leading-relaxed">
                나누리아이티와 함께 맞춤형 금융 솔루션 도입을 문의하세요
              </p>
            </div>

            {/* 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Open browser and verify page at `/contact`**

Navigate to `http://localhost:3300/contact`.
Expected: 2-column layout renders with form on left, info+map on right. Mobile view stacks vertically.

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add /contact page with form and company info"
```

---

### Task 4: Header 버튼 변경

**Files:**

- Modify: `src/components/Header.tsx:169-178` (데스크톱 pill)
- Modify: `src/components/Header.tsx:237-246` (모바일 하단)

- [ ] **Step 1: Update desktop pill button**

In `src/components/Header.tsx`, change the desktop "도입 문의" pill button:

```
// Old (line 170-178):
href="/#contact"
...
도입 문의

// New:
href="/contact"
...
도입 상담
```

- [ ] **Step 2: Update mobile bottom button**

In `src/components/Header.tsx`, change the mobile "도입 문의" button:

```
// Old (line 238-246):
href="/#contact"
...
도입 문의

// New:
href="/contact"
...
도입 상담
```

- [ ] **Step 3: Verify in browser**

Navigate to main page. Desktop: pill button in header says "도입 상담" and links to `/contact`. Mobile: bottom menu button same.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: update header buttons to link to /contact page"
```

---

### Task 5: ContactCTA 버튼 변경

**Files:**

- Modify: `src/components/ContactCTA.tsx:80-93`

- [ ] **Step 1: Change mailto link to /contact Link**

In `src/components/ContactCTA.tsx`, replace the `<a href="mailto:...">` with a Next.js `<Link>`:

Add `import Link from "next/link";` at the top.

Change lines 80-93 from:

```tsx
<a
  href="mailto:help@nanuriit.kr"
  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-[14px] font-bold transition-all duration-300 hover:-translate-y-1"
  style={{...}}
>
  도입 문의하기
  ...
</a>
```

To:

```tsx
<Link
  href="/contact"
  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-[14px] font-bold transition-all duration-300 hover:-translate-y-1"
  style={{...}}
>
  도입 상담
  ...
</Link>
```

- [ ] **Step 2: Verify in browser**

On main page, scroll to ContactCTA section. "도입 상담" button should link to `/contact`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactCTA.tsx
git commit -m "feat: update ContactCTA button to link to /contact page"
```

---

### Task 6: 서비스 페이지 버튼 변경 (6 files)

**Files:**

- Modify: `src/components/services/IbimsWorkflow.tsx:60`
- Modify: `src/components/services/SiLoanSystem.tsx:150`
- Modify: `src/components/services/PropWorkflow.tsx:223`
- Modify: `src/components/services/StoWorkflow.tsx:163`
- Modify: `src/components/services/AcctWorkflow.tsx:61`
- Modify: `src/components/services/ChannelFunctions.tsx:197`

- [ ] **Step 1: Update all 6 service page hrefs**

In each file, change `href="/#contact"` to `href="/contact"`:

- `IbimsWorkflow.tsx` line 60: `href="/#contact"` → `href="/contact"`
- `SiLoanSystem.tsx` line 150: `href="/#contact"` → `href="/contact"`
- `PropWorkflow.tsx` line 223: `href="/#contact"` → `href="/contact"`
- `StoWorkflow.tsx` line 163: `href="/#contact"` → `href="/contact"`
- `AcctWorkflow.tsx` line 61: `href="/#contact"` → `href="/contact"`
- `ChannelFunctions.tsx` line 197: `href="/#contact"` → `href="/contact"`

Button text stays the same in all files.

- [ ] **Step 2: Verify in browser**

Navigate to any service page (e.g. `/services/ibims`). CTA button at bottom should link to `/contact`.

- [ ] **Step 3: Commit**

```bash
git add src/components/services/IbimsWorkflow.tsx src/components/services/SiLoanSystem.tsx src/components/services/PropWorkflow.tsx src/components/services/StoWorkflow.tsx src/components/services/AcctWorkflow.tsx src/components/services/ChannelFunctions.tsx
git commit -m "feat: update service page CTA buttons to link to /contact"
```

---

### Task 7: 최종 검증

- [ ] **Step 1: Full page test**

Navigate to `http://localhost:3300/contact`:

- 2-column layout (desktop), single column (mobile)
- Form fields: 회사명, 담당자명, 연락처, 관심 서비스, 메시지
- Required validation on 회사명, 담당자명, 연락처, 관심 서비스
- Submit opens mailto with form data
- 제출 후 "문의가 접수되었습니다" 화면
- Company info cards (전화, 이메일, 주소) + Google Map
- Dark/Light theme 모두 정상

- [ ] **Step 2: Button routing test**

- Header "도입 상담" → `/contact` (desktop + mobile)
- Main page ContactCTA "도입 상담" → `/contact`
- Service pages (6개) CTA → `/contact`
- HeroSection "도입 상담 시작" → `/#contact` (변경 없음 확인)
- Footer "도입 문의" → `/#contact` (변경 없음 확인)

- [ ] **Step 3: Commit all remaining changes (if any)**

```bash
git status
# If clean, no action needed
```

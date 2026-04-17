"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const brandMarkSrc = `${basePath}/images/logo_IT.png`;

const services = [
  { label: "금융 SI", href: "/services/financial-si", english: "Financial System Integration" },
  { label: "IB 시스템", href: "/services/ibims", english: "IBIMS" },
  { label: "고유자산", href: "/services/proprietary", english: "Proprietary Trading" },
  { label: "토큰증권", href: "/services/sto", english: "Security Token" },
  { label: "회계 서비스", href: "/services/accounting", english: "Accounting Service" },
  { label: "채널 서비스", href: "/services/channel", english: "Channel Service" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileBizOpen, setMobileBizOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bizRef = useRef<HTMLDivElement>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setTimeout(() => mobileMenuBtnRef.current?.focus(), 0);
  };

  // Outside click close for dropdown (touch-friendly)
  useEffect(() => {
    if (!bizOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (bizRef.current && !bizRef.current.contains(e.target as Node)) {
        setBizOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [bizOpen]);

  // Outside click / ESC close for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (mobileMenuRef.current?.contains(target)) return;
      if (mobileMenuBtnRef.current?.contains(target)) return;
      setMobileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl border-b"
          : "border-b border-transparent"
      }`}
      style={{
        background: scrolled ? "var(--color-glass-bg)" : "transparent",
        borderColor: scrolled ? "var(--color-glass-border)" : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="relative h-9 w-9 shrink-0">
            <Image
              src={brandMarkSrc}
              alt="나누리아이티 로고"
              fill
              priority
              sizes="36px"
              className="object-contain"
            />
          </span>
          <span
            className="text-2xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, var(--color-logo-from), var(--color-logo-to))",
              fontFamily: "var(--font-outfit), sans-serif",
            }}
          >
            나누리아이티
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/about">회사소개</NavLink>

          {/* 사업영역 dropdown */}
          <div
            className="relative"
            ref={bizRef}
            onMouseEnter={() => setBizOpen(true)}
            onMouseLeave={() => setBizOpen(false)}
          >
            <button
              onClick={() => setBizOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={bizOpen}
              className="nav-text flex items-center gap-1 px-4 py-2 text-[17px] font-medium transition-colors duration-300 focus:outline-none focus-visible:text-[color:var(--color-accent-cyan)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span className="hover:text-[color:var(--color-accent-cyan)]">사업영역</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${bizOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {bizOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                <div className="dropdown-panel w-[340px] overflow-hidden rounded-2xl border">
                  <div className="p-2">
                    <Link
                      href="/#business"
                      onClick={() => setBizOpen(false)}
                      className="dropdown-item flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg group transition-colors duration-200 border-b mb-1 pb-3"
                      style={{ borderColor: "var(--color-glass-border)" }}
                    >
                      <div>
                        <p className="text-[16px] font-semibold text-ink">All Service</p>
                        <p
                          className="text-[12px] tracking-[0.08em] uppercase"
                          style={{
                            color: "var(--color-accent-cyan)",
                            fontFamily: "var(--font-space-mono), monospace",
                          }}
                        >
                          All Business Areas
                        </p>
                      </div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                        style={{ color: "var(--color-accent-cyan)" }}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setBizOpen(false)}
                        className="dropdown-item flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg group transition-colors duration-200"
                      >
                        <div>
                          <p className="text-[16px] font-semibold text-ink">{s.label}</p>
                          <p
                            className="text-[12px] tracking-[0.08em] uppercase"
                            style={{
                              color: "var(--color-accent-cyan)",
                              fontFamily: "var(--font-space-mono), monospace",
                            }}
                          >
                            {s.english}
                          </p>
                        </div>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                          style={{ color: "var(--color-accent-cyan)" }}
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink href="/services/ibims">솔루션</NavLink>
          <NavLink href="/about#history">구축사례</NavLink>
        </nav>

        {/* Right cluster: CTA + Theme toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full text-[15px] font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo))",
              color: "#000",
              boxShadow: "0 4px 20px rgba(0, 212, 255, 0.2)",
            }}
          >
            도입 상담
          </Link>

          <ThemeToggle />

          {/* Mobile menu */}
          <button
            ref={mobileMenuBtnRef}
            className="md:hidden p-2 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 열기"
            style={{ color: "var(--color-text-muted)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav ref={mobileMenuRef} className="dropdown-panel md:hidden px-6 py-3 max-h-[80vh] overflow-y-auto border-t">
          <Link href="/about" className="block py-3 text-[17px]" style={{ color: "var(--color-text-muted)" }} onClick={closeMobileMenu}>
            회사소개
          </Link>

          <button
            className="w-full flex items-center justify-between py-3 text-[17px]"
            style={{ color: "var(--color-text-muted)" }}
            onClick={() => setMobileBizOpen(!mobileBizOpen)}
          >
            사업영역
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${mobileBizOpen ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {mobileBizOpen && (
            <div className="pl-4 pb-2 border-l-2 ml-1 space-y-2" style={{ borderColor: "var(--color-glass-border)" }}>
              <Link
                href="/#business"
                className="block py-2 text-[16px] font-semibold"
                style={{ color: "var(--color-accent-cyan)" }}
                onClick={closeMobileMenu}
              >
                사업영역 전체
              </Link>
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block py-2 text-[20px]"
                  style={{ color: "var(--color-text-muted)" }}
                  onClick={closeMobileMenu}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          )}

          <Link href="/services/ibims" className="block py-3 text-[17px]" style={{ color: "var(--color-text-muted)" }} onClick={closeMobileMenu}>
            솔루션
          </Link>
          <Link href="/about#history" className="block py-3 text-[17px]" style={{ color: "var(--color-text-muted)" }} onClick={closeMobileMenu}>
            구축사례
          </Link>

          <Link
            href="/contact"
            className="block mt-2 mb-2 text-center py-3 text-[17px] font-bold rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo))",
              color: "#000",
            }}
            onClick={closeMobileMenu}
          >
            도입 상담
          </Link>
        </nav>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="nav-text relative px-4 py-2 text-[17px] font-medium transition-colors duration-300 group"
      style={{ color: "var(--color-text-muted)" }}
    >
      <span className="group-hover:text-[color:var(--color-accent-cyan)] transition-colors">{children}</span>
      <span
        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-[70%] transition-all duration-300"
        style={{ background: "var(--color-accent-cyan)" }}
      />
    </Link>
  );
}

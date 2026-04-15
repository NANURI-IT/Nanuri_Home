"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 md:hidden ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        background: "var(--color-glass-bg)",
        border: "1px solid var(--color-glass-border)",
        backdropFilter: "blur(12px)",
        color: "var(--color-text-primary)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

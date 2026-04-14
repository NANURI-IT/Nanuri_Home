"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`${isDark ? "라이트" : "다크"} 모드로 전환`}
      className="glass-pill group relative flex items-center gap-1 rounded-full p-1 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      style={{
        // @ts-expect-error custom css var for ring color
        "--tw-ring-color": "var(--color-accent-cyan)",
      }}
    >
      {/* Slider background */}
      <span
        className="absolute top-1 left-1 bottom-1 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 transition-transform duration-500 ease-out"
        style={{ transform: isDark ? "translateX(0)" : "translateX(calc(100% + 2px))" }}
      />

      {/* Moon (dark) */}
      <span className="relative z-10 flex h-8 w-8 items-center justify-center">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-colors duration-300 ${isDark ? "text-black" : "text-[var(--color-text-muted)]"}`}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* Sun (light) */}
      <span className="relative z-10 flex h-8 w-8 items-center justify-center">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-colors duration-300 ${!isDark ? "text-black" : "text-[var(--color-text-muted)]"}`}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </span>
    </button>
  );
}

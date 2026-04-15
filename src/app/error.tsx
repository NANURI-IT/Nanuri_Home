"use client";

import Link from "next/link";
import Logo from "@/components/Logo";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative text-center">
        <Logo size={34} />

        <h1 className="mt-12 text-[80px] sm:text-[120px] font-bold leading-none gradient-text">
          Oops
        </h1>

        <p className="mt-4 text-lg font-semibold text-ink">
          문제가 발생했습니다
        </p>
        <p className="mt-2 text-sm text-body max-w-md mx-auto">
          일시적인 오류가 발생했습니다. 다시 시도하거나 홈으로 이동해 주세요.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="group glow-btn relative inline-flex items-center gap-2 px-8 py-4 bg-gold text-white text-sm font-semibold rounded-xl hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all"
          >
            다시 시도
            <svg
              className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 glass text-sm font-semibold text-ink rounded-xl transition-all"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

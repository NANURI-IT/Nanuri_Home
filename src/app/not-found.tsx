import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="orb-float absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-navy/5 blur-3xl" />
      <div className="orb-float-reverse absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-gold/[0.04] blur-3xl" />

      <div className="relative text-center">
        <Logo size={34} />

        <h1 className="mt-12 text-[120px] sm:text-[160px] font-bold leading-none gradient-text">
          404
        </h1>

        <p className="mt-4 text-lg font-semibold text-ink">
          페이지를 찾을 수 없습니다
        </p>
        <p className="mt-2 text-sm text-body max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        <Link
          href="/"
          className="group glow-btn relative mt-10 inline-flex items-center gap-2 px-8 py-4 bg-gold text-white text-sm font-semibold rounded-xl hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all"
        >
          홈으로 돌아가기
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

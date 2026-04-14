"use client";

const items = [
  "금융 SI", "IBIMS", "STO 플랫폼", "고유자산관리", "회계 시스템",
  "MTS / HTS", "리스크 관리", "블록체인", "차세대 구축", "데이터 플랫폼",
  "AML 시스템", "디지털 채널", "퇴직연금", "투자심사",
];

export default function TechMarquee() {
  const doubled = [...items, ...items];

  return (
    <section
      className="relative overflow-hidden py-20"
      aria-hidden="true"
    >
      {/* Edge fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-32 sm:w-48 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-bg), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 sm:w-48 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-bg), transparent)" }}
      />

      <div className="marquee-track flex gap-11 w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 whitespace-nowrap text-[15px] font-semibold opacity-40 hover:opacity-100 transition-opacity"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: "var(--color-accent-cyan)" }}
            />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

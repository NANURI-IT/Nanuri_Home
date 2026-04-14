interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function Logo({
  size = 40,
  className = "",
  showText = true,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Logo Mark - Organic blob with IT */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-cyan)" />
            <stop offset="100%" stopColor="var(--color-accent-indigo)" />
          </linearGradient>
        </defs>
        <path
          d="M60 10C85 8 108 25 112 52C116 79 100 105 72 112C44 119 18 102 12 75C6 48 25 14 60 10Z"
          fill="url(#logoGrad)"
        />
        <text
          x="60"
          y="68"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontFamily="var(--font-outfit), Arial, sans-serif"
          fontWeight="800"
          fontSize="38"
          letterSpacing="2"
        >
          IT
        </text>
      </svg>

      {showText && (
        <span
          className="text-[15px] font-bold tracking-tight bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo))",
            fontFamily: "var(--font-outfit), sans-serif",
          }}
        >
          나누리아이티
        </span>
      )}
    </div>
  );
}

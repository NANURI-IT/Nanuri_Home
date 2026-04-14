import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "나누리아이티 - 금융 IT의 미래를 선도하는 전문 파트너";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at top, #0a0a1f 0%, #04040c 70%)",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "linear-gradient(rgba(0, 212, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 120,
            width: 340,
            height: 340,
            borderRadius: 9999,
            background: "rgba(0, 212, 255, 0.15)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 140,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: "rgba(99, 102, 241, 0.18)",
            filter: "blur(90px)",
          }}
        />

        {/* Cyan accent line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "linear-gradient(90deg, #00d4ff, #6366f1)",
            borderRadius: 2,
            marginBottom: 28,
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 22px",
            borderRadius: 9999,
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "#00d4ff",
              boxShadow: "0 0 12px #00d4ff",
            }}
          />
          <span
            style={{
              fontSize: 16,
              color: "#00d4ff",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            2026 Financial IT Partner
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#eeeef2",
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            금융의 미래를
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              backgroundImage: "linear-gradient(135deg, #00d4ff, #6366f1 50%, #10b981)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            기술로 설계합니다
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 22,
            color: "rgba(238, 238, 242, 0.6)",
            margin: 0,
            letterSpacing: 0.3,
          }}
        >
          수십 년간 금융권에서 쌓아온 경험과 전문성
        </p>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 44,
            padding: "20px 44px",
            background: "rgba(255, 255, 255, 0.04)",
            borderRadius: 16,
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {[
            { value: "69+", label: "PROJECTS" },
            { value: "15", label: "PARTNERS" },
            { value: "100%", label: "GROWTH" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <span
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: "#00d4ff",
                  letterSpacing: -1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(238, 238, 242, 0.4)",
                  letterSpacing: 2,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <p
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 14,
            color: "rgba(238, 238, 242, 0.3)",
            margin: 0,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          nanuriit.kr
        </p>
      </div>
    ),
    { ...size }
  );
}

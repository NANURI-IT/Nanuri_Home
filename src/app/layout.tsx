import type { Metadata } from "next";
import { Noto_Sans_KR, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SceneContainer from "@/components/three/SceneContainer";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import CursorGlow from "@/components/ui/CursorGlow";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nanuriit.kr"),
  title: {
    default: "나누리아이티 | 금융 IT 전문기업",
    template: "%s | 나누리아이티",
  },
  description:
    "금융·증권 업무 시스템 구축에 특화된 IT 파트너. 금융 SI, IB 시스템(IBIMS), 고유자산, 토큰증권(STO), 회계 서비스, 채널 서비스, 퇴직연금까지 금융 산업 전반을 아우르는 시스템을 설계·구축합니다.",
  keywords: [
    "나누리아이티", "금융SI", "IB시스템", "IBIMS", "고유자산", "토큰증권",
    "STO", "회계서비스", "채널서비스", "퇴직연금", "금융IT", "증권시스템구축",
    "투자은행시스템", "금융시스템통합", "금융IT전문기업",
  ],
  openGraph: {
    title: "나누리아이티 | 금융 IT 전문기업",
    description: "금융·증권 업무 시스템 구축에 특화된 IT 파트너. 69건 이상의 프로젝트 수행, 15개 주요 금융 파트너사와 함께합니다.",
    url: "https://nanuriit.kr",
    siteName: "나누리아이티",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "나누리아이티 | 금융 IT 전문기업",
    description: "금융·증권 업무 시스템 구축에 특화된 IT 파트너",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://nanuriit.kr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${outfit.variable} ${spaceMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="naver-site-verification" content="74db5ef84f89f67f7c3e230b4582eb6ecf838a60" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('nanuri-theme') || 'dark';
                document.documentElement.setAttribute('data-theme', t);
              } catch(e) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <ThemeProvider>
          <SceneContainer />
          <div className="relative z-10 flex min-h-full flex-col">
            {children}
          </div>
          <CursorGlow />
          <NoiseOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}

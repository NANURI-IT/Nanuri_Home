import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChannelHero from "@/components/services/ChannelHero";
import ChannelFeatures from "@/components/services/ChannelFeatures";
import ChannelFunctions from "@/components/services/ChannelFunctions";

export const metadata: Metadata = {
  title: "채널 서비스",
  description:
    "자유로운 커스터마이징의 멀티 디바이스 대응. 기업 모바일 표준에 필요한 모든 요소와 기능을 갖춘 국내 표준 하이브리드 앱 개발 플랫폼을 제공합니다.",
};

export default function ChannelPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <ChannelHero />
        <ChannelFeatures />
        <ChannelFunctions />
      </main>
      <Footer />
    </>
  );
}

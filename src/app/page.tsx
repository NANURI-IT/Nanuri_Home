import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CompanySummary from "@/components/CompanySummary";
import BusinessAreas from "@/components/BusinessAreas";
import CoreSolution from "@/components/CoreSolution";
import CaseStudies from "@/components/CaseStudies";
import ClientLogos from "@/components/ClientLogos";
import TrustFactors from "@/components/TrustFactors";
import TechMarquee from "@/components/TechMarquee";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import HomeScrollSnap from "@/components/ui/HomeScrollSnap";

export const metadata: Metadata = {
  ...pageSeo({
    path: "/",
    title: "나누리아이티 | 금융 IT 전문기업",
    description:
      "금융·증권 업무 시스템 구축에 특화된 IT 파트너. 69건 이상의 프로젝트 수행, 15개 주요 금융 파트너사와 함께합니다.",
  }),
};

export default function Home() {
  return (
    <>
      <HomeScrollSnap />
      <Header />
      <main className="flex-1 relative">
        <div className="home-snap-section">
          <HeroSection />
        </div>
        <div className="home-snap-section">
          <CompanySummary />
        </div>
        <div className="home-snap-section">
          <BusinessAreas />
        </div>
        <div className="home-snap-section">
          <CoreSolution />
        </div>
        <div className="home-snap-section">
          <CaseStudies />
        </div>
        <div className="home-snap-section">
          <ClientLogos />
        </div>
        <div className="home-snap-section">
          <TrustFactors />
        </div>
        <div className="home-snap-section">
          <TechMarquee />
          <ContactCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}

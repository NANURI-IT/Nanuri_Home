import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
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
          <StatsCounter />
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

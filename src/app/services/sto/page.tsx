import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoHero from "@/components/services/StoHero";
import StoFeatures from "@/components/services/StoFeatures";
import StoWorkflow from "@/components/services/StoWorkflow";

export const metadata: Metadata = {
  title: "토큰증권(STO)",
  description:
    "토큰증권 발행 및 유통 관리 기능, 블록체인 기술과 금융IT 경험으로 특화된 토큰증권 발행 및 거래 솔루션을 제공합니다.",
};

export default function StoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <StoHero />
        <StoFeatures />
        <StoWorkflow />
      </main>
      <Footer />
    </>
  );
}

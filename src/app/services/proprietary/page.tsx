import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropHero from "@/components/services/PropHero";
import PropFeatures from "@/components/services/PropFeatures";
import PropWorkflow from "@/components/services/PropWorkflow";

export const metadata: Metadata = {
  title: "고유자산 솔루션",
  description:
    "고유자산 솔루션을 통해 투자 결정을 최적화하고 리스크 관리를 강화하세요. 수익성을 높일 수 있는 최고의 솔루션을 경험하세요.",
};

export default function ProprietaryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <PropHero />
        <PropFeatures />
        <PropWorkflow />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AcctHero from "@/components/services/AcctHero";
import AcctFeatures from "@/components/services/AcctFeatures";
import AcctWorkflow from "@/components/services/AcctWorkflow";

export const metadata: Metadata = {
  title: "회계 시스템 구축",
  description:
    "30년 이상의 금융 회계 전문인력을 바탕으로 회계시스템 전반의 컨설팅, 구축, 운영까지 고객의 Needs에 맞춘 모든 서비스를 제공합니다.",
};

export default function AccountingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <AcctHero />
        <AcctFeatures />
        <AcctWorkflow />
      </main>
      <Footer />
    </>
  );
}

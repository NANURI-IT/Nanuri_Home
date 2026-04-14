import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IbimsHero from "@/components/services/IbimsHero";
import IbimsFeatures from "@/components/services/IbimsFeatures";
import IbimsWorkflow from "@/components/services/IbimsWorkflow";

export const metadata: Metadata = {
  title: "IBIMS | IB통합관리시스템",
  description:
    "투자은행 업무와 관련하여 초기 Deal 소싱에서의 사전영업부터 성과관리까지 모든 업무 활동을 지원하는 솔루션입니다.",
};

export default function IbimsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <IbimsHero />
        <IbimsFeatures />
        <IbimsWorkflow />
      </main>
      <Footer />
    </>
  );
}

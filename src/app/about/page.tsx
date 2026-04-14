import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import Mission from "@/components/about/Mission";
import CeoMessage from "@/components/about/CeoMessage";
import Vision from "@/components/about/Vision";
import History from "@/components/about/History";
import Location from "@/components/about/Location";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "나누리아이티는 금융 IT의 미래를 선도하는 전문 파트너입니다. 신뢰와 혁신으로 금융의 미래를 설계합니다.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <AboutHero />
        <Mission />
        <CeoMessage />
        <Vision />
        <History />
        <Location />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EsgHero from "@/components/esg/EsgHero";
import EsgPillars from "@/components/esg/EsgPillars";

export const metadata: Metadata = {
  title: "ESG 경영",
  description:
    "나누리아이티는 환경경영, 사회책임경영, 윤리·준법경영을 통해 지속가능한 기업문화를 정착시키고, 고객·임직원·협력사·지역사회로부터 신뢰받는 기업이 되고자 합니다.",
};

export default function EsgPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <EsgHero />
        <EsgPillars />
      </main>
      <Footer />
    </>
  );
}

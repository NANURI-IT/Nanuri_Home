import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EthicsPolicy from "@/components/ethics/EthicsPolicy";

export const metadata: Metadata = {
  title: "윤리경영 정책",
  description:
    "나누리아이티의 윤리경영 정책 — 뇌물방지, 반부패, 부당이익 금지 등 9대 핵심 영역의 윤리경영 정책을 공시합니다.",
  keywords: [
    "윤리경영",
    "반부패",
    "뇌물방지",
    "공정거래",
    "컴플라이언스",
    "나누리아이티",
    "ESG",
    "윤리강령",
  ],
  openGraph: {
    title: "윤리경영 정책 | 나누리아이티",
    description:
      "나누리아이티는 모든 이해관계자에게 신뢰받는 기업이 되기 위해 9대 윤리경영 정책을 공시합니다.",
    type: "article",
  },
};

export default function EthicsPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <EthicsPolicy />
      </main>
      <Footer />
    </>
  );
}

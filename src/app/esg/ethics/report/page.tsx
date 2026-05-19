import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EthicsReport from "@/components/ethics/EthicsReport";

export const metadata: Metadata = {
  title: "윤리 신고",
  description:
    "나누리아이티 윤리경영 위반 사항을 안전하게 신고할 수 있는 채널입니다. 신고자의 신원과 정보는 철저히 보호됩니다.",
  openGraph: {
    title: "윤리 신고 | 나누리아이티",
    description:
      "윤리경영 위반 사항을 안전하게 신고할 수 있습니다. 신고자 보호 원칙을 준수합니다.",
    type: "website",
  },
};

export default function EthicsReportPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <EthicsReport />
      </main>
      <Footer />
    </>
  );
}

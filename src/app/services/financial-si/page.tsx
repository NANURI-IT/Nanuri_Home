import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiHero from "@/components/services/SiHero";
import SiServiceList from "@/components/services/SiServiceList";
import SiSalesSystem from "@/components/services/SiSalesSystem";
import SiCustomerSystem from "@/components/services/SiCustomerSystem";
import SiLoanSystem from "@/components/services/SiLoanSystem";

export const metadata: Metadata = {
  title: "금융 SI 서비스",
  description:
    "계정계/정보계 및 영업 관리, 고객 관리, 여신 업무 등 금융에 필요한 모든 시스템 통합 서비스를 제공합니다.",
};

export default function FinancialSiPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <SiHero />
        <SiServiceList />
        <SiSalesSystem />
        <SiCustomerSystem />
        <SiLoanSystem />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyContent from "@/components/privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "나누리아이티는 「개인정보 보호법」에 따라 정보주체의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리하기 위하여 개인정보처리방침을 수립·공개합니다.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <section className="py-20 sm:py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{
                  color: "var(--color-accent-cyan)",
                  fontFamily: "var(--font-space-mono), monospace",
                }}
              >
                Privacy Policy
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight text-ink">
                개인정보처리방침
              </h1>
              <p className="mt-4 text-[15px] text-body max-w-lg mx-auto leading-relaxed">
                나누리아이티는 정보주체의 개인정보를 소중하게 여기며, 관련 법령을 준수합니다.
              </p>
            </div>
            <PrivacyContent />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "도입 상담",
  description:
    "나누리아이티에 맞춤형 금융 솔루션 도입을 문의하세요. 금융 SI, IB 시스템, 고유자산, 토큰증권, 회계·채널 서비스까지 전문 상담을 제공합니다.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 relative pt-16">
        <section className="py-20 sm:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <div className="text-center mb-14">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{
                  color: "var(--color-accent-cyan)",
                  fontFamily: "var(--font-space-mono), monospace",
                }}
              >
                Contact Us
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight text-ink">
                도입 상담
              </h1>
              <p className="mt-4 text-[15px] text-body max-w-lg mx-auto leading-relaxed">
                나누리아이티와 함께 맞춤형 금융 솔루션 도입을 문의하세요
              </p>
            </div>

            {/* 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

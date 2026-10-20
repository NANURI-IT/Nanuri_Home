import type { Metadata } from "next";
import { OG_IMAGE_AIAX, pageSeo } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AiAxShell from "@/components/services/AiAxShell";
import AiAxHero from "@/components/services/AiAxHero";
import AiAxSubnav from "@/components/services/AiAxSubnav";
import AiAxConditions from "@/components/services/AiAxConditions";
import AiAxPipeline from "@/components/services/AiAxPipeline";
import AiAxModelValidation from "@/components/services/AiAxModelValidation";
import AiAxAssistant from "@/components/services/AiAxAssistant";
import AiAxIdpDemo from "@/components/services/AiAxIdpDemo";
import AiAxServices from "@/components/services/AiAxServices";
import AiAxProcess from "@/components/services/AiAxProcess";
import AiAxFaq from "@/components/services/AiAxFaq";
import AiAxCta from "@/components/services/AiAxCta";
import { AIAX_FAQ } from "@/components/services/aiax/faq";
import "@/components/services/aiax/aiax.css";

const DESCRIPTION =
  "나누리아이티는 AI로 개발하는 금융 IT 기업입니다. 명세·테스트·자동 검증·사람의 승인으로 이어지는 AI 에이전트 개발 방식을 사내 시스템에 먼저 적용해 운영하고 있으며, 그 방식을 금융의 규칙 안에서 고객의 개발과 업무에 적용해 나갑니다.";

export const metadata: Metadata = {
  title: "AI · AX 서비스",
  description: DESCRIPTION,
  keywords: [
    "AI 전환",
    "AX",
    "AI 네이티브 개발",
    "AI 에이전트 개발",
    "금융 AI",
    "온프레미스 LLM",
    "LLM 검증",
    "문서 AI",
    "IDP",
    "금융분야 인공지능 가이드라인",
    "나누리아이티",
  ],
  ...pageSeo({
    path: "/services/ai-ax",
    title: "AI · AX 서비스 | 나누리아이티",
    description:
      "고객께 권하기 전에, 저희가 먼저 AI로 만들었습니다. AI가 기안하고 사람이 결재하는 방식을 금융의 규칙 안에서 고객의 개발과 업무에 적용해 나갑니다.",
    image: OG_IMAGE_AIAX,
  }),
  twitter: {
    card: "summary_large_image",
    title: "AI · AX 서비스 | 나누리아이티",
    description: "AI가 기안하고, 사람이 결재합니다. 나누리아이티의 금융 AI 개발과 업무 AI.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: AIAX_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AiAxPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 relative pt-16">
        <AiAxShell>
          <AiAxHero />
          <AiAxSubnav />
          <AiAxConditions />
          <AiAxPipeline />
          <AiAxModelValidation />
          <AiAxAssistant />
          <AiAxIdpDemo />
          <AiAxServices />
          <AiAxProcess />
          <AiAxFaq />
          <AiAxCta />
        </AiAxShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
      </main>
      <Footer />
    </>
  );
}

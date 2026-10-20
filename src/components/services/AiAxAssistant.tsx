"use client";

import { AIAX_ID, SectionHeader, StatusBadge } from "./aiax/shared";
import { AssistantDemo } from "./aiax/assistant-demo";

/* ═══════════ 문구 ═══════════
   profileManager AI 어시스턴트(온프레미스 LLM 에이전트). "질의 데이터가 사외로 나가지 않음"은 이 에이전트에만 씁니다. */
const ASSISTANT = {
  eyebrow: "04 · AI ASSISTANT",
  title: (
    <>
      긴 요청도 조건으로 나눠,
      <br className="hidden sm:block" /> 근거와 함께 사람을 찾습니다
    </>
  ),
  lead: "사내 인력운영 플랫폼 profileManager의 AI 어시스턴트입니다. 사내 GPU 서버에서 운영하는 LLM이 요청 문장에서 조건을 뽑고, 인력·투입 데이터는 읽기 전용 조회 도구로 가져와 근거와 함께 답합니다. 질의 데이터는 사외로 나가지 않습니다.",
} as const;

export default function AiAxAssistant() {
  return (
    <section
      id={AIAX_ID.assistant}
      aria-labelledby="aiax-assist-title"
      className="relative py-14 md:py-24 px-6 overflow-hidden scroll-mt-32"
    >
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          eyebrow={ASSISTANT.eyebrow}
          title={ASSISTANT.title}
          lead={ASSISTANT.lead}
          titleId="aiax-assist-title"
          aside={<StatusBadge status="live" />}
        />
        <div className="mt-8 md:mt-10 max-w-4xl mx-auto">
          <AssistantDemo skipHref={`#${AIAX_ID.caseIdp}`} />
        </div>
      </div>
    </section>
  );
}

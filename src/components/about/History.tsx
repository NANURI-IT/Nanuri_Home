"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const historyData = [
  {
    year: "2026",
    items: [
      "하나금융TI '우수협력사' 선정",
      "금융 IT Business Partner 선정 (LG CNS)",
      "하나증권 ITO운영 및 관리 (하나금융티아이)",
      "종합수익관리 프로젝트 (제주은행)",
      "연금차세대 시스템 진단컨설팅 (미래에셋증권)",
      "발행어음 시스템 고도화개발 2차 (하나증권)",
      "이노룰스 업그레이드 (DB손해보험)",
      "한국투자증권 트레이딩 개발 업무계약",
    ],
  },
  {
    year: "2025",
    items: [
      "외주 분야 Biz. Partner 선정 (SK주식회사)",
      "외주부문 입찰Pool 선정 (삼성SDS)",
      "하나증권 발행어음 시스템 고도화 1차 개발",
      "우리투자증권 신 시스템 구축",
      "AIFSA 컴퓨터프로그램저작물 저작권등록",
      "하나증권 발행어음 시스템 안정화 구축",
      "한국투자증권 IMA 신규상품 업무개발 계약",
      "Project Meta_Core 고유자산 구축 (신한투자증권)",
      "포인트서비스 및 제휴상품 입점 개발 (하나증권)",
      "자문 & 일임 플랫폼 & MTS 웹 개발 (하나증권)",
      "원큐프로 MTS 재구축 대응개발 (하나증권)",
      "데이터 플랫폼 고도화 (한국투자증권)",
      "관리회계고도화 재무회계 IFRS9 (한국투자증권)",
      "기술혁신형 중소기업 Inno-Biz 인증 (중소벤처기업부)",
      "대체거래소 대응 및 SOR 시스템 구축 (메리츠증권)",
      "자금세탁방지시스템(AML) 고도화 (하나증권)",
      "차세대 시스템 구축 (현대차증권)",
      "ITO 운영 및 기업여신 전산역무 개발 (하나증권)",
      "IBIMS IB통합관리시스템 등록 (한국저작권위원회)",
      "FIRST 하나원큐 비대면빠른서비스 구축 (하나은행)",
      "신용리스크 관리시스템 구축 (하나증권)",
    ],
  },
  {
    year: "2024",
    items: [
      "HUG 차세대 정보시스템 구축 (주택도시보증공사)",
      "바젤III PSMOR 운영리스크 시스템 구축 (수출입은행)",
      "리스크 심사 관리시스템(RAMS) 고도화 (KB증권)",
      "모바일 HR 정보시스템 개발 (하나증권)",
      "금융투자소득 원천징수 시스템 구축 (하나은행·하나증권·현대차증권)",
      "소프트웨어 사업자 신고 (한국소프트웨어산업협회)",
      "여성기업 인증 (서울지방중소벤처기업청)",
      "대체거래소 ATS시스템 개발 (하나증권)",
      "하나금융 퇴직연금 시스템 재구축 (하나금융티아이)",
      "IB비즈니스 고도화 컨설팅 (KB증권)",
      "흥국생명 선심사 프로세스 개선사업 (SK주식회사)",
      "투자자산 통합관리 시스템 개발 (한국투자증권)",
      "농협은행 개인투자용 국채판매대행 시스템 구축 (농협정보시스템)",
      "Finance IT Biz. Partner 선정 (삼성SDS)",
    ],
  },
  {
    year: "2023",
    items: [
      "하나증권 토큰증권(STO) 시스템 구축 (SK주식회사)",
      "하나은행 SCB/JETCO 해외 ATM 출금서비스 구축",
      "하나증권 토큰증권(STO) 플랫폼 구축 (INF컨설팅)",
      "유한대학교 산학협력 체결",
      "스탁머니 서비스 개발 구축 (하나증권)",
      "공공 마이데이터 유통체계 구축 (한국주택금융공사)",
      "우리은행 신IB영업지원시스템 구축 (DB.Inc)",
      "B2B 연계시스템 보증시스템 개발 (건설공제조합)",
      "시니어 TV뱅킹 시범 사업 구축 (하나은행)",
      "IB/PI 투자심사 고도화 개발 (KB증권)",
    ],
  },
  {
    year: "2022",
    items: [
      "기업여신(IB/PI) 고도화 개발 (하나증권)",
      "흥국생명 차세대 구축/대출 시스템 개발 (한화시스템)",
      "국내주식 소수단위 거래 시스템 구축 (하나증권)",
      "기업연구개발전담부서 인증 (과학기술정보통신부)",
      "제안 시스템 신규 구축 (하나증권)",
      "OCIO 외부위탁운용 시스템 구축 (하나금융티아이)",
      "T4 기술역량 우수기업 인증 (한국평가데이터)",
      "리스크심사 관리시스템 구축 (KB증권)",
      "발행어음 관리시스템 개발 (하나금융투자)",
    ],
  },
  {
    year: "2021",
    items: [
      "고도비만 환자 수술 전후 관리 시스템 개발 (휴레이포지티브)",
      "기업금융 자동심사 시스템 구축 (수출입은행)",
      "발행 어음 시스템 구축 개발 (하나금융투자)",
      "헬스케어 (주)휴레이포지티브 협력사 체결",
      "아토마인드 본임상 시험 플랫폼 구축 (휴레이포지티브)",
      "EMI 무릎재활치료 관리시스템 구축 (휴레이포지티브)",
      "ECM 시스템 구축 개발 (KB국민은행)",
      "미수채권관리 시스템 구축 (한화생명)",
      "기업 신용정보 WEB 서비스 구축 (NICE평가정보)",
      "강북삼성병원 진료노트 지원 시스템 구축 (휴레이포지티브)",
    ],
  },
  {
    year: "2020",
    items: [
      "IB중계시스템 패키지 개발",
      "농협정보시스템 IT 협력사",
      "투자금융지원 시스템 구축 (NH농협생명)",
      "IB통합관리시스템 패키지 개발",
      "차세대 시스템 구축 개발 (신용회복위원회)",
      "차세대 정보시스템 구축 (과학기술인공제회)",
      "기업여신시스템 구축 (하나금융티아이)",
      "체불방지시스템 구축 (신한은행)",
      "IB/PI 기업여신 시스템 구축 (한국투자증권)",
    ],
  },
  {
    year: "2013",
    items: ["주식회사 나누리아이티 법인 설립"],
  },
];

const boldKeywords = [
  "우수협력사",
  "Business Partner",
  "Biz. Partner",
  "Finance IT Biz.",
  "Inno-Biz",
  "입찰Pool",
  "IT 협력사",
  "협력사",
  "T4 기술역량 우수기업",
  "여성기업",
  "기업연구개발전담부서",
  "소프트웨어 사업자",
];

function isBoldLine(text: string) {
  return boldKeywords.some((kw) => text.includes(kw));
}

export default function History() {
  return (
    <section id="history" className="py-24 px-6 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <span className="text-xs font-semibold text-navy tracking-widest uppercase">History</span>
          <h2 className="mt-3 text-2xl md:text-[32px] font-bold text-ink tracking-tight">나누리아이티 연혁</h2>
          <p className="mt-4 text-[15px] text-body max-w-lg mx-auto leading-relaxed">
            나누리아이티는 오늘도 고객의 성공을 만들어 가고 있습니다.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-16 relative">
          {/* Vertical cyan gradient line */}
          <div
            className="absolute left-[28px] sm:left-[32px] top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-accent-cyan), var(--color-accent-indigo), var(--color-glass-border))",
            }}
          />

          {historyData.map((group) => (
            <motion.div
              key={group.year}
              className="mb-12 last:mb-0"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={item}
            >
              {/* Year badge */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="relative z-10 w-14 sm:w-16 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo))",
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.35)",
                  }}
                >
                  <span
                    className="text-[13px] font-bold text-black"
                    style={{ fontFamily: "var(--font-space-mono), monospace" }}
                  >
                    {group.year}
                  </span>
                </div>
                <div
                  className="h-px flex-1"
                  style={{
                    background: "linear-gradient(to right, var(--color-accent-cyan), transparent)",
                  }}
                />
              </div>

              {/* Items */}
              <div className="ml-[52px] sm:ml-[60px] space-y-2.5">
                {group.items.map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: "var(--color-accent-cyan)",
                        boxShadow: "0 0 8px rgba(0, 212, 255, 0.5)",
                      }}
                    />
                    <p className={`text-[13px] sm:text-[14px] leading-relaxed ${isBoldLine(text) ? "font-bold text-ink" : "text-body"}`}>{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

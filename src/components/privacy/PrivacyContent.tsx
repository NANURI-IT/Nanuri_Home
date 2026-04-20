const EFFECTIVE_DATE = "2026-04-20";
const DPO_NAME = "신미선";
const DPO_EMAIL = "info@nanuriit.kr";
const DPO_PHONE = "02.6969.0319";

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    id: "purpose",
    title: "제1조 (개인정보의 처리 목적)",
    body: (
      <>
        <p>
          나누리아이티(이하 &quot;회사&quot;)는 다음의 목적을 위하여 개인정보를 처리하며,
          다음의 목적 이외의 용도로는 이용하지 않습니다.
        </p>
        <ul>
          <li>도입 상담 및 문의사항에 대한 응대</li>
          <li>서비스 안내, 제안서 제공 등 영업 커뮤니케이션</li>
          <li>상담 이력 관리 및 민원 처리</li>
        </ul>
      </>
    ),
  },
  {
    id: "items",
    title: "제2조 (처리하는 개인정보의 항목)",
    body: (
      <>
        <p>회사는 도입 상담 문의 시 다음의 개인정보 항목을 수집·처리합니다.</p>
        <ul>
          <li>
            <strong>필수 항목</strong>: 회사명, 담당자명, 연락처, 관심 서비스
          </li>
          <li>
            <strong>선택 항목</strong>: 문의 메시지에 포함된 정보
          </li>
          <li>
            <strong>자동 수집 항목</strong>: 접속 IP, 쿠키, 접속 로그, 브라우저
            정보(서비스 이용 과정에서 자동으로 생성·수집될 수 있음)
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "제3조 (개인정보의 보유 및 이용 기간)",
    body: (
      <>
        <p>
          회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를
          수집 시에 동의 받은 기간 내에서 개인정보를 처리·보유합니다.
        </p>
        <ul>
          <li>
            <strong>도입 상담 문의</strong>: 문의 처리 완료 후 <strong>1년간</strong> 보관 후 파기
          </li>
          <li>
            단, 관계 법령에 의해 보존할 필요가 있는 경우 해당 법령에서 정한 기간
            동안 보관합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party",
    title: "제4조 (개인정보의 제3자 제공)",
    body: (
      <p>
        회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한
        범위 내에서만 처리하며, 정보주체의 사전 동의 없이는 본래의 범위를
        초과하여 처리하거나 제3자에게 제공하지 않습니다.
      </p>
    ),
  },
  {
    id: "outsourcing",
    title: "제5조 (개인정보 처리의 위탁)",
    body: (
      <p>
        회사는 현재 개인정보 처리 업무를 외부에 위탁하고 있지 않습니다. 향후
        위탁이 필요한 경우, 위탁받는 자와 위탁업무 내용을 본 방침을 통하여
        공개하겠습니다.
      </p>
    ),
  },
  {
    id: "destruction",
    title: "제6조 (개인정보의 파기 절차 및 방법)",
    body: (
      <>
        <p>
          회사는 개인정보 보유기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게
          되었을 때에는 지체없이 해당 개인정보를 파기합니다.
        </p>
        <ul>
          <li>
            <strong>파기 절차</strong>: 파기 사유가 발생한 개인정보를 선정하고,
            개인정보보호책임자의 승인을 받아 파기합니다.
          </li>
          <li>
            <strong>파기 방법</strong>: 전자적 파일 형태는 복구 및 재생이 되지
            않도록 안전하게 삭제하며, 종이 문서는 분쇄하거나 소각합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "rights",
    title: "제7조 (정보주체의 권리·의무 및 행사방법)",
    body: (
      <>
        <p>
          정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를
          행사할 수 있습니다.
        </p>
        <ul>
          <li>개인정보 열람 요구</li>
          <li>오류 등이 있을 경우 정정 요구</li>
          <li>삭제 요구</li>
          <li>처리 정지 요구</li>
        </ul>
        <p>
          권리 행사는 개인정보보호책임자에게 서면, 전자우편 등을 통하여
          하실 수 있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "제8조 (개인정보의 안전성 확보 조치)",
    body: (
      <>
        <p>
          회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
        </p>
        <ul>
          <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
          <li>
            기술적 조치: 개인정보처리시스템 접근권한 관리, 접속기록의 보관 및
            위·변조 방지, 개인정보 암호화, 보안 프로그램 설치
          </li>
          <li>물리적 조치: 전산실, 자료보관실 등의 접근 통제</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "제9조 (쿠키의 설치·운영 및 거부)",
    body: (
      <>
        <p>
          회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용 정보를
          저장하고 수시로 불러오는 &apos;쿠키(cookie)&apos;를 사용할 수 있습니다. 이용자는
          웹브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
        </p>
        <ul>
          <li>Chrome: 설정 &gt; 개인정보 및 보안 &gt; 쿠키 및 기타 사이트 데이터</li>
          <li>
            Edge: 설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 사이트 데이터 관리 및 삭제
          </li>
          <li>Safari: 환경설정 &gt; 개인 정보 보호</li>
        </ul>
        <p>쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 제한이 있을 수 있습니다.</p>
      </>
    ),
  },
  {
    id: "dpo",
    title: "제10조 (개인정보보호책임자)",
    body: (
      <>
        <p>
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
          관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
          개인정보보호책임자를 지정하고 있습니다.
        </p>
        <ul>
          <li>
            <strong>성명</strong>: {DPO_NAME}
          </li>
          <li>
            <strong>직책</strong>: 대표이사
          </li>
          <li>
            <strong>연락처</strong>:{" "}
            <a
              href={`mailto:${DPO_EMAIL}`}
              className="underline"
              style={{ color: "var(--color-accent-cyan)" }}
            >
              {DPO_EMAIL}
            </a>
            {" / "}
            {DPO_PHONE}
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "remedy",
    title: "제11조 (권익침해 구제방법)",
    body: (
      <>
        <p>
          정보주체는 개인정보 침해로 인한 구제를 받기 위하여 개인정보 분쟁조정위원회,
          한국인터넷진흥원 개인정보 침해신고센터 등에 분쟁 해결이나 상담 등을
          신청할 수 있습니다.
        </p>
        <ul>
          <li>개인정보 분쟁조정위원회: 1833-6972 (www.kopico.go.kr)</li>
          <li>개인정보 침해신고센터: 118 (privacy.kisa.or.kr)</li>
          <li>대검찰청 사이버수사과: 1301 (www.spo.go.kr)</li>
          <li>경찰청 사이버수사국: 182 (ecrm.police.go.kr)</li>
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    title: "제12조 (개인정보처리방침의 변경)",
    body: (
      <p>
        이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의
        추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을
        통하여 고지할 것입니다.
      </p>
    ),
  },
];

export default function PrivacyContent() {
  return (
    <article className="glass rounded-2xl p-8 sm:p-12">
      <div
        className="mb-8 pb-6 border-b"
        style={{ borderColor: "var(--color-glass-border)" }}
      >
        <p className="card-meta text-body">
          <strong className="text-ink">시행일자</strong>: {EFFECTIVE_DATE}
        </p>
      </div>

      <div className="privacy-prose flex flex-col gap-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">
              {section.title}
            </h2>
            <div className="text-[15px] text-body leading-relaxed flex flex-col gap-3">
              {section.body}
            </div>
          </section>
        ))}
      </div>

      <style>{`
        .privacy-prose ul {
          list-style: disc;
          padding-left: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .privacy-prose strong {
          color: var(--color-ink);
          font-weight: 600;
        }
      `}</style>
    </article>
  );
}

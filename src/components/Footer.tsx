import Image from "next/image";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const brandMarkSrc = `${basePath}/images/logo_IT.png`;

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ borderColor: "var(--color-glass-border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-3.5">
              <span className="relative h-10 w-10 shrink-0">
                <Image
                  src={brandMarkSrc}
                  alt="나누리아이티 로고"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </span>
              <span
                className="inline-block text-2xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--color-logo-from), var(--color-logo-to))",
                  fontFamily: "var(--font-outfit), sans-serif",
                }}
              >
                나누리아이티
              </span>
            </Link>
            <p
              className="text-[18px] md:text-[16px] leading-relaxed max-w-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              풍부한 금융권 개발 경험과 전문성을 바탕으로 금융 IT 서비스를 제공합니다.
            </p>
          </div>

          {/* Services */}
          <FooterCol title="Services">
            <FooterLink href="/services/financial-si">금융 SI</FooterLink>
            <FooterLink href="/services/ibims">IB 시스템</FooterLink>
            <FooterLink href="/services/proprietary">고유자산</FooterLink>
            <FooterLink href="/services/sto">토큰증권</FooterLink>
            <FooterLink href="/services/accounting">회계</FooterLink>
            <FooterLink href="/services/channel">채널</FooterLink>
          </FooterCol>

          {/* Company */}
          <FooterCol title="Company">
            <FooterLink href="/about">회사소개</FooterLink>
            <FooterLink href="/about#history">연혁</FooterLink>
            <FooterLink href="/#contact">도입 문의</FooterLink>
            <FooterLink href="/privacy">개인정보처리방침</FooterLink>
          </FooterCol>

          {/* Contact */}
          <FooterCol title="Contact">
            <FooterLink href="mailto:info@nanuriit.kr">info@nanuriit.kr</FooterLink>
            <FooterLink href="tel:02-6969-0319">02.6969.0319</FooterLink>
            <span
              className="block text-[17px] md:text-[15px] leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              서울시 영등포구 선유로49길 23,
              <br />
              1016호 (아이에스비즈타워2차)
            </span>
          </FooterCol>
        </div>

        <div
          className="pt-8 border-t flex flex-col gap-4"
          style={{ borderColor: "var(--color-glass-border)" }}
        >
          <div
            className="flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-1.5 text-[15px] md:text-[13px] leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span>
              <span className="font-medium">상호</span> 주식회사 나누리아이티
            </span>
            <span>
              <span className="font-medium">대표이사</span>{" "}
              <span className="text-ink">신미선</span>
            </span>
            <span>
              <span className="font-medium">개인정보보호책임자</span> 신미선
              (info@nanuriit.kr)
            </span>
          </div>
          <p
            className="text-[13px] md:text-[12px] leading-relaxed"
            style={{ color: "var(--color-text-muted)", opacity: 0.8 }}
          >
            본 사이트에 게시된 이메일 주소는 전자우편 무단수집을 거부하며, 위반
            시 정보통신망법에 의해 처벌됩니다.
          </p>
          <span
            className="nav-text text-[16px] md:text-[14px] font-normal"
            style={{ color: "var(--color-text-muted)" }}
          >
            © {new Date().getFullYear()} Nanuri IT Co., Ltd. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4
        className="nav-text text-[16px] md:text-[14px] font-semibold mb-4"
        style={{ color: "var(--color-accent-cyan)" }}
      >
        {title}
      </h4>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("tel:");
  const className = "text-[17px] md:text-[15px] transition-colors duration-300 hover:text-[color:var(--color-accent-cyan)]";
  const style = { color: "var(--color-text-primary)", opacity: 0.6 };

  if (isExternal) {
    return (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

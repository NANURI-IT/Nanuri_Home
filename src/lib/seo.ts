import type { Metadata } from "next";

/* 페이지별 canonical·공유 미리보기(Open Graph) 설정.
   Next.js 메타데이터에서 openGraph는 하위 페이지가 정의하면 통째로 교체되고, 정의하지 않으면
   루트 레이아웃 값(홈 URL)을 그대로 물려받습니다. 그래서 페이지마다 이 함수로 자기 경로를 지정합니다.
   title·description을 생략하면 페이지의 title(템플릿 적용)·description을 그대로 씁니다. */

export const SITE_NAME = "나누리아이티";

type OgImage = { url: string; width: number; height: number; alt: string };

export const OG_IMAGE_DEFAULT: OgImage = {
  url: "/og/default.png",
  width: 1200,
  height: 630,
  alt: "나누리아이티 — 금융의 미래를 기술로 설계합니다",
};

export const OG_IMAGE_AIAX: OgImage = {
  url: "/og/ai-ax.png",
  width: 1200,
  height: 630,
  alt: "나누리아이티 AI · AX 서비스 — 고객께 권하기 전에, 저희가 먼저 AI로 만들었습니다",
};

type PageSeoOptions = {
  /** 사이트 루트 기준 경로. 예: "/about" */
  path: string;
  title?: string;
  description?: string;
  type?: "website" | "article";
  image?: OgImage;
};

export function pageSeo({
  path,
  title,
  description,
  type = "website",
  image = OG_IMAGE_DEFAULT,
}: PageSeoOptions): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: { canonical: path },
    openGraph: {
      ...(title && { title }),
      ...(description && { description }),
      url: path,
      siteName: SITE_NAME,
      type,
      locale: "ko_KR",
      images: [image],
    },
  };
}

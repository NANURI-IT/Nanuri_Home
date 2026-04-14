import { ReactNode, CSSProperties } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "article" | "section" | "a";
  href?: string;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  style,
  as = "div",
  href,
  onClick,
}: GlassCardProps) {
  const Tag = as;
  const props: Record<string, unknown> = {
    className: `glass ${className}`,
    style,
    onClick,
  };
  if (as === "a" && href) props.href = href;

  return <Tag {...props}>{children}</Tag>;
}

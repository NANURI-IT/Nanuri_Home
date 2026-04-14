"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useTheme } from "@/contexts/ThemeContext";

const MeshGradient = dynamic(() => import("./MeshGradient"), { ssr: false });
const ThreeNetwork = dynamic(() => import("./ThreeNetwork"), { ssr: false });

export default function SceneContainer() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const isDark = theme === "dark";
  const isHome = pathname === "/";
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const onVisibility = () => setIsTabActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!isDark) return null;

  const paused = !isTabActive;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
    >
      <ThreeNetwork paused={paused} showHomepageAccent={isHome} />
      <MeshGradient paused={paused} />
    </div>
  );
}

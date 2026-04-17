"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip on touch devices (no cursor) and mobile viewports
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isTouch || isMobile) return;

    setEnabled(true);

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

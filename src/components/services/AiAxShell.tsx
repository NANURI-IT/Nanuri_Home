"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export default function AiAxShell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="aiax relative">{children}</div>
    </MotionConfig>
  );
}

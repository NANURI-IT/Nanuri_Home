"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
}

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  caption = "이미지를 탭하면 확대 보기가 가능합니다",
  priority = false,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full bg-white rounded-xl overflow-hidden p-4 cursor-zoom-in transition-transform duration-300 hover:brightness-[0.98]"
        aria-label={`${alt} — 확대 보기`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          priority={priority}
        />

        {/* Zoom affordance badge */}
        <span className="absolute bottom-6 right-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md text-white text-[12px] font-medium pointer-events-none shadow-lg">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
          </svg>
          확대 보기
        </span>
      </button>

      {caption && (
        <p className="mt-3 text-center text-[12px] text-dim md:hidden">
          {caption}
        </p>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} 확대 보기`}
          className="fixed inset-0 z-[100] bg-black/95 overflow-auto"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="fixed top-4 right-4 z-[101] w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="닫기"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>

          <div className="min-h-full flex items-center justify-center p-3 sm:p-6">
            <div
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-auto rounded-lg bg-white"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

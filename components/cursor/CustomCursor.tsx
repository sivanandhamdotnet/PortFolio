"use client";

import React, { useEffect, useState, useRef } from "react";
import { isReducedMotion } from "@/lib/animations/gsap";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<{
    text: string;
    isHovered: boolean;
    isViewing: boolean;
  }>({
    text: "",
    isHovered: false,
    isViewing: false,
  });

  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices and when reduced motion is false
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches || isReducedMotion()) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      target.current = { x: e.clientX, y: e.clientY };

      // Inspect hovered target
      const element = e.target as HTMLElement | null;
      if (!element) return;

      const cursorTarget = element.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const cursorType = cursorTarget.getAttribute("data-cursor");
        if (cursorType === "view") {
          setCursorState({ text: "VIEW", isHovered: true, isViewing: true });
        } else if (cursorType === "explore") {
          setCursorState({ text: "EXPLORE", isHovered: true, isViewing: true });
        } else if (cursorType === "inspect") {
          setCursorState({ text: "INSPECT", isHovered: true, isViewing: true });
        } else {
          setCursorState({ text: "", isHovered: true, isViewing: false });
        }
      } else if (element.closest("a, button, [role='button']")) {
        setCursorState({ text: "", isHovered: true, isViewing: false });
      } else {
        setCursorState({ text: "", isHovered: false, isViewing: false });
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    let animId: number;
    const updateCursor = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      animId = requestAnimationFrame(updateCursor);
    };
    animId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Instant Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-clay-500 rounded-full pointer-events-none z-[9999] transition-opacity duration-200"
      />

      {/* Trailing Interactive Ring / Badge */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -ml-5 -mt-5 flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-200 ease-editorial ${
          cursorState.isViewing
            ? "w-20 h-20 -ml-10 -mt-10 bg-forest-900/90 text-bone-100 border border-lime-accent/80 backdrop-blur-sm shadow-xl"
            : cursorState.isHovered
            ? "w-12 h-12 -ml-6 -mt-6 bg-clay-500/15 border border-clay-500 backdrop-blur-[1px]"
            : "w-10 h-10 border border-forest-900/30"
        }`}
      >
        {cursorState.text && (
          <span className="font-mono text-[10px] tracking-widest font-bold text-lime-accent">
            {cursorState.text}
          </span>
        )}
      </div>
    </>
  );
}

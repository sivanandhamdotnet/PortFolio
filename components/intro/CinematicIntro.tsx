"use client";

import React, { useEffect, useState } from "react";

interface CinematicIntroProps {
  onComplete: () => void;
}

const STEPS = [
  "01 // INITIALIZING RUNTIME KERNEL",
  "02 // LOADING DISTRIBUTED PROTOCOLS",
  "03 // CONNECTING POSTGRESQL · MONGODB · REDIS",
  "04 // BACKEND SYSTEMS ONLINE",
];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDismissing, setIsDismissing] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  const handleFinish = React.useCallback(() => {
    setIsDismissing(true);
    try {
      sessionStorage.setItem("portfolio_intro_seen", "true");
    } catch {}
    setTimeout(() => {
      onComplete();
    }, 450);
  }, [onComplete]);

  useEffect(() => {
    // Check session storage
    try {
      if (sessionStorage.getItem("portfolio_intro_seen") === "true") {
        onComplete();
        return;
      }
    } catch {}
    setHasCheckedSession(true);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 280);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(stepInterval);
          handleFinish();
          return 100;
        }
        const delta = Math.floor(Math.random() * 15) + 12;
        return Math.min(100, prev + delta);
      });
    }, 120);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleFinish, onComplete]);

  if (!hasCheckedSession) {
    return null;
  }

  return (
    <div
      role="status"
      aria-label="System Initializing"
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-forest-950 text-bone-100 p-8 sm:p-12 md:p-16 transition-all duration-500 ease-editorial ${
        isDismissing ? "opacity-0 pointer-events-none translate-y-[-100%]" : "opacity-100"
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between font-mono text-xs text-bone-400 tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime-accent animate-pulse" />
          <span>SIVANANDHAM S // SYSTEM LAUNCH</span>
        </div>
        <button
          onClick={handleFinish}
          className="group flex items-center gap-2 border border-forest-700 bg-forest-900/60 px-3 py-1.5 text-xs text-bone-300 hover:text-lime-accent hover:border-lime-accent transition-colors"
        >
          <span>SKIP INTRO</span>
          <span className="text-[10px] text-bone-400 group-hover:text-lime-accent">ESC</span>
        </button>
      </div>

      {/* Center Console */}
      <div className="max-w-xl mx-auto w-full my-auto">
        <div className="text-xs font-mono text-clay-400 mb-3 tracking-widest">
          SYSTEM_BOOT_SEQUENCE
        </div>
        <div className="font-mono text-lg sm:text-2xl text-bone-100 mb-6 tracking-tight min-h-[36px]">
          {STEPS[stepIndex]}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-forest-800/80 h-1.5 relative overflow-hidden border border-forest-700">
          <div
            className="h-full bg-gradient-to-r from-clay-500 via-lime-accent to-lime-accent transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between font-mono text-xs text-bone-400 mt-3">
          <span>PIPELINE TELEMETRY: ACTIVE</span>
          <span className="text-lime-accent font-semibold">{progress}%</span>
        </div>
      </div>

      {/* Bottom Subtext */}
      <div className="flex justify-between items-end font-mono text-[11px] text-bone-400">
        <div>PYTHON · DJANGO · SYSTEMS ARCHITECTURE</div>
        <div>2026 // PRODUCTION</div>
      </div>
    </div>
  );
}

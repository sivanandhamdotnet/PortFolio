"use client";

import React from "react";

export default function SiteFooter() {
  return (
    <footer className="py-12 px-6 sm:px-10 md:px-14 lg:px-20 bg-forest-950 text-bone-100 border-t border-forest-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-bold text-bone-50 tracking-widest uppercase">
            SIVANANDHAM S
          </span>
          <span className="hidden sm:inline text-forest-700">/</span>
          <span className="text-bone-400">BACKEND SOFTWARE DEVELOPMENT ENGINEER</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-bone-400">
          <span className="text-lime-accent text-[11px] tracking-wider">
            PYTHON · DJANGO · SYSTEMS
          </span>
          <span className="text-forest-700 hidden sm:inline">•</span>
          <span>&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}

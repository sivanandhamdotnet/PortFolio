"use client";

import React, { useState } from "react";
import { ArrowRight, Zap } from "lucide-react";

interface SystemFlowDiagramProps {
  name: string;
  flow: string[];
  description: string;
}

export default function SystemFlowDiagram({ name, flow, description }: SystemFlowDiagramProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="p-5 sm:p-6 bg-forest-900 border border-forest-800 text-bone-100 my-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-forest-800 mb-5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-accent animate-pulse" />
          <span className="font-semibold text-bone-200 tracking-wider uppercase">{name}</span>
        </div>
        <span className="text-[11px] text-clay-400 tracking-widest">INTERACTIVE PIPELINE</span>
      </div>

      {/* Pipeline Sequence */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-2">
        {flow.map((step, idx) => {
          const isSelected = activeStep === idx;
          const isLast = idx === flow.length - 1;

          return (
            <React.Fragment key={step}>
              <button
                onClick={() => setActiveStep(isSelected ? null : idx)}
                onMouseEnter={() => setActiveStep(idx)}
                className={`group relative px-3 py-2 border text-xs font-mono tracking-wider transition-all duration-200 focus:outline-none ${
                  isSelected
                    ? "bg-lime-accent text-forest-950 border-lime-accent shadow-md scale-105"
                    : "bg-forest-950/80 text-bone-300 border-forest-700 hover:border-clay-500 hover:text-bone-100"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] ${isSelected ? "text-forest-900" : "text-clay-400"}`}>
                    0{idx + 1}
                  </span>
                  <span className="font-bold">{step}</span>
                </div>

                {/* Status Dot */}
                <span
                  className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                    isSelected ? "bg-forest-900 animate-ping" : "bg-forest-700"
                  }`}
                />
              </button>

              {!isLast && (
                <div className="flex items-center text-forest-600 px-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer / Context Explanation */}
      <div className="mt-4 pt-3 border-t border-forest-800 flex items-start gap-2 font-mono text-xs text-bone-400">
        <Zap className="w-3.5 h-3.5 text-lime-accent flex-shrink-0 mt-0.5" />
        <div>
          {activeStep !== null ? (
            <span>
              <strong className="text-lime-accent">{flow[activeStep]}</strong>: Validates invariants,
              enforces transaction state, and advances to next pipeline stage.
            </span>
          ) : (
            <span>{description}</span>
          )}
        </div>
      </div>
    </div>
  );
}

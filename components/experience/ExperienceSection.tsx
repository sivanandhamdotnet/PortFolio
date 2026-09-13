"use client";

import React, { useEffect, useRef } from "react";
import { EXPERIENCES } from "@/data/experience";
import SystemFlowDiagram from "./SystemFlowDiagram";
import { MapPin, Calendar, Terminal } from "lucide-react";
import { gsap, isReducedMotion } from "@/lib/animations/gsap";

export default function ExperienceSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Animate timeline chapters as they enter view
      EXPERIENCES.forEach((exp) => {
        gsap.from(`#exp-chapter-${exp.id}`, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `#exp-chapter-${exp.id}`,
            start: "top 80%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      aria-label="Verified System Experience"
      className="relative py-28 sm:py-36 px-6 sm:px-10 md:px-14 lg:px-20 bg-bone-100 text-forest-900 bg-grid-architectural"
    >
      {/* Chapter Marker */}
      <div className="flex items-center justify-between border-b border-forest-900/15 pb-5 mb-16 sm:mb-24 font-mono text-xs text-forest-700">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-none bg-clay-500" />
          <span className="text-clay-500 font-semibold tracking-widest">03 // SYSTEM TIMELINE</span>
        </div>
        <div className="tracking-wider">VERIFIED CAREER MILESTONES (3+ YEARS)</div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-24 sm:gap-32">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.id}
            id={`exp-chapter-${exp.id}`}
            className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 border-t-2 border-forest-900 pt-8"
          >
            {/* Left Architectural Marker Column */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="font-mono text-4xl sm:text-6xl font-bold text-clay-500 mb-2">
                  {exp.index}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-forest-900 uppercase tracking-tight mb-2">
                  {exp.company}
                </h3>
                <div className="font-mono text-xs font-semibold text-forest-800 uppercase tracking-wider mb-4">
                  {exp.role}
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-col gap-2 font-mono text-xs text-forest-700 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-clay-500" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-clay-500" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-clay-500" />
                    <span className="text-[11px] text-clay-600 font-semibold">{exp.category}</span>
                  </div>
                </div>
              </div>

              {/* Technologies Used */}
              <div className="pt-4 border-t border-forest-900/10">
                <div className="font-mono text-[10px] tracking-widest text-forest-600 uppercase mb-2">
                  DEPLOYED TECHNOLOGIES:
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-bone-200/80 border border-forest-900/15 text-forest-900"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Work Breakdown & System Diagram Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Executive Summary */}
              <div className="p-5 bg-bone-50 border-l-2 border-clay-500 border border-forest-900/10 font-sans text-base text-forest-800 leading-relaxed">
                {exp.summary}
              </div>

              {/* Specific Engineering Contributions */}
              <div className="flex flex-col gap-4">
                {exp.points.map((point) => (
                  <div
                    key={point.title}
                    className="p-5 bg-bone-200/50 border border-forest-900/10 hover:border-forest-900/30 transition-colors"
                  >
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-forest-900 mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-clay-500" />
                      <span>{point.title}</span>
                    </h4>
                    <p className="font-sans text-sm text-forest-700/95 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Abstract System Architecture Diagrams */}
              <div className="mt-2">
                <div className="font-mono text-[11px] uppercase tracking-widest text-forest-600 mb-2">
                  SYSTEM FLOW VISUALIZATION:
                </div>
                {exp.systemDiagrams.map((diag) => (
                  <SystemFlowDiagram
                    key={diag.name}
                    name={diag.name}
                    flow={diag.flow}
                    description={diag.description}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

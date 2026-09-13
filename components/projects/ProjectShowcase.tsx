"use client";

import React, { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { Play, Check, Cpu, ShieldAlert, FileCode } from "lucide-react";

export default function ProjectShowcase() {
  const [activeSimulation, setActiveSimulation] = useState<{ [key: string]: number }>({});
  const [simulatingProject, setSimulatingProject] = useState<string | null>(null);

  const triggerSimulation = (projectId: string, pipelineLength: number) => {
    if (simulatingProject === projectId) return;
    setSimulatingProject(projectId);
    setActiveSimulation((prev) => ({ ...prev, [projectId]: 0 }));

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < pipelineLength) {
        setActiveSimulation((prev) => ({ ...prev, [projectId]: step }));
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setSimulatingProject(null);
        }, 1200);
      }
    }, 400);
  };

  return (
    <section
      id="work"
      aria-label="Selected Architecture Case Studies"
      className="relative py-28 sm:py-36 px-6 sm:px-10 md:px-14 lg:px-20 bg-forest-950 text-bone-100 border-t border-b border-forest-800 bg-grid-dark paper-grain"
    >
      {/* Chapter Marker */}
      <div className="flex items-center justify-between border-b border-forest-800 pb-5 mb-16 sm:mb-24 font-mono text-xs text-bone-400">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-none bg-lime-accent" />
          <span className="text-lime-accent font-semibold tracking-widest">04 // SELECTED ARCHITECTURES</span>
        </div>
        <div className="tracking-wider">DEEP SYSTEM CASE STUDIES</div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-28 sm:gap-36">
        {PROJECTS.map((project) => {
          const currentSimStep = activeSimulation[project.id] ?? -1;
          const isSimulating = simulatingProject === project.id;

          return (
            <article
              key={project.id}
              data-cursor="view"
              className="relative p-6 sm:p-10 lg:p-14 bg-forest-900 border border-forest-800 shadow-2xl transition-all duration-300 hover:border-clay-500/80"
            >
              {/* Corner Architectural Brackets */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-clay-500" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-clay-500" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-clay-500" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-clay-500" />

              {/* Header Strip */}
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-forest-800 pb-6 mb-8">
                <div>
                  <div className="font-mono text-xs text-clay-400 font-semibold tracking-widest uppercase mb-2">
                    CASE STUDY // {project.num}
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-bone-50">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-bone-300 mt-2">
                    {project.subtitle}
                  </p>
                </div>

                <div className="font-mono text-xs px-3 py-1 bg-forest-950 border border-forest-800 text-lime-accent">
                  {project.category}
                </div>
              </div>

              {/* System Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {project.systemHighlights.map((highlight) => (
                  <div key={highlight.label} className="p-3 bg-forest-950 border border-forest-800">
                    <div className="font-mono text-[10px] text-bone-400 uppercase tracking-wider mb-1">
                      {highlight.label}
                    </div>
                    <div className="font-mono text-xs font-bold text-bone-100">
                      {highlight.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenge vs Solution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="p-6 bg-forest-950/60 border border-forest-800">
                  <div className="font-mono text-xs font-semibold text-clay-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-clay-500" />
                    <span>ENGINEERING CHALLENGE</span>
                  </div>
                  <p className="font-sans text-sm text-bone-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="p-6 bg-forest-950/60 border border-forest-800">
                  <div className="font-mono text-xs font-semibold text-lime-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-lime-accent" />
                    <span>ARCHITECTURAL RESOLUTION</span>
                  </div>
                  <p className="font-sans text-sm text-bone-300 leading-relaxed">
                    {project.architecturalSolution}
                  </p>
                </div>
              </div>

              {/* Interactive Pipeline Trace Simulation */}
              <div className="p-6 bg-forest-950 border border-forest-800 mb-8">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-forest-800 mb-4">
                  <div className="font-mono text-xs text-bone-200 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-lime-accent" />
                    <span>SYSTEM EXECUTION PIPELINE</span>
                  </div>
                  <button
                    onClick={() => triggerSimulation(project.id, project.systemPipeline.length)}
                    disabled={isSimulating}
                    className="flex items-center gap-2 px-3 py-1.5 font-mono text-xs bg-lime-accent text-forest-950 border border-lime-accent font-semibold hover:bg-transparent hover:text-lime-accent transition-colors disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isSimulating ? "TRACING PIPELINE..." : "RUN PIPELINE TRACE"}</span>
                  </button>
                </div>

                {/* Pipeline Nodes */}
                <div className="flex flex-wrap items-center gap-2">
                  {project.systemPipeline.map((stage, idx) => {
                    const isPassed = currentSimStep >= idx;
                    const isCurrent = currentSimStep === idx;

                    return (
                      <React.Fragment key={stage}>
                        <div
                          className={`px-3 py-2 border font-mono text-xs transition-all duration-300 flex items-center gap-2 ${
                            isCurrent
                              ? "bg-lime-accent text-forest-950 border-lime-accent shadow-lg scale-105"
                              : isPassed
                              ? "bg-forest-900 text-lime-accent border-lime-accent/50"
                              : "bg-forest-900 text-bone-400 border-forest-800"
                          }`}
                        >
                          <span className="text-[10px] opacity-70">0{idx + 1}</span>
                          <span>{stage}</span>
                          {isPassed && <Check className="w-3 h-3 text-lime-accent" />}
                        </div>
                        {idx < project.systemPipeline.length - 1 && (
                          <span className="text-forest-700 font-mono">→</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Code Snippet Blueprint */}
              {project.codeConcept && (
                <div className="p-5 bg-forest-950 border border-forest-800">
                  <div className="flex items-center justify-between pb-3 border-b border-forest-800 font-mono text-[11px] text-bone-400 mb-3">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-3.5 h-3.5 text-clay-400" />
                      <span className="text-bone-200">{project.codeConcept.filename}</span>
                    </div>
                    <span className="text-clay-400">{project.codeConcept.language.toUpperCase()}</span>
                  </div>
                  <pre className="font-mono text-xs text-bone-300 overflow-x-auto leading-relaxed p-2">
                    <code>{project.codeConcept.snippet}</code>
                  </pre>
                </div>
              )}

              {/* Capabilities Bullet Tags */}
              <div className="mt-8 pt-6 border-t border-forest-800 flex flex-wrap gap-2 font-mono text-xs">
                {project.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-2.5 py-1 bg-forest-950 border border-forest-800 text-bone-300"
                  >
                    + {cap}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

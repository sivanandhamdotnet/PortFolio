"use client";

import React, { useState } from "react";
import { TECH_CONSTELLATION, SKILL_GROUPS, TechNode } from "@/data/skills";
// icons removed

export default function StackConstellation() {
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(
    TECH_CONSTELLATION.find((n) => n.id === "python") || null
  );
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const activeId = hoveredNodeId || selectedNode?.id || "python";
  const activeNode = TECH_CONSTELLATION.find((n) => n.id === activeId);
  const connectedIds = activeNode ? [activeNode.id, ...activeNode.connections] : [];

  return (
    <section
      id="stack"
      aria-label="Verified Technology Stack Constellation"
      className="relative py-28 sm:py-36 px-6 sm:px-10 md:px-14 lg:px-20 bg-bone-100 text-forest-900 bg-grid-architectural"
    >
      {/* Chapter Marker */}
      <div className="flex items-center justify-between border-b border-forest-900/15 pb-5 mb-16 sm:mb-24 font-mono text-xs text-forest-700">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-none bg-clay-500" />
          <span className="text-clay-500 font-semibold tracking-widest">05 // THE STACK CONSTELLATION</span>
        </div>
        <div className="tracking-wider">INTERACTIVE SYSTEM TOPOLOGY</div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Constellation Canvas / Matrix Board */}
        <div className="p-6 sm:p-10 lg:p-14 bg-forest-950 text-bone-100 border border-forest-800 shadow-2xl relative overflow-hidden paper-grain">
          {/* Constellation Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest-800 pb-6 mb-8">
            <div>
              <span className="font-mono text-xs text-lime-accent tracking-widest uppercase">
                RELATIONAL TOPOLOGY
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-bone-50 mt-1">
                BACKEND SYSTEMS CONSTELLATION
              </h3>
            </div>
            <div className="font-mono text-xs text-bone-400">
              HOVER A NODE TO TRACE CONNECTIONS
            </div>
          </div>

          {/* Interactive Node Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-6">
            {TECH_CONSTELLATION.map((node) => {
              const isCurrent = node.id === activeId;
              const isConnected = connectedIds.includes(node.id);

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`p-4 text-left border font-mono transition-all duration-300 focus:outline-none relative ${
                    isCurrent
                      ? "bg-lime-accent text-forest-950 border-lime-accent shadow-xl scale-105 z-10"
                      : isConnected
                      ? "bg-forest-900 text-bone-100 border-clay-500 shadow-md"
                      : "bg-forest-900/50 text-bone-400 border-forest-800/80 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] tracking-widest uppercase opacity-70">
                      {node.layer}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isCurrent
                          ? "bg-forest-950 animate-ping"
                          : isConnected
                          ? "bg-clay-500"
                          : "bg-forest-700"
                      }`}
                    />
                  </div>
                  <div className="font-bold text-xs sm:text-sm tracking-tight">
                    {node.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Node Deep Dive Inspector */}
          {activeNode && (
            <div className="mt-8 p-6 bg-forest-900 border border-forest-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
              <div>
                <div className="flex items-center gap-2 text-lime-accent font-semibold mb-1">
                  <span className="w-2 h-2 bg-lime-accent" />
                  <span className="text-sm uppercase tracking-wider">{activeNode.name}</span>
                  <span className="text-bone-400">[{activeNode.layer.toUpperCase()}]</span>
                </div>
                <p className="text-bone-300 font-sans text-sm">{activeNode.description}</p>
              </div>

              <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
                <span className="text-[11px] text-bone-400 uppercase tracking-widest">
                  COUPLED ARCHITECTURAL NODES:
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeNode.connections.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 bg-forest-950 text-clay-400 border border-forest-800 text-[10px] font-mono"
                    >
                      {c.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Structured Category Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((grp) => (
            <div
              key={grp.title}
              className="p-6 bg-bone-50 border border-forest-900/15 hover:border-forest-900/40 transition-colors"
            >
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-clay-500 mb-1">
                {grp.title}
              </h4>
              <p className="font-sans text-xs text-forest-700 mb-4">{grp.subtitle}</p>

              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {grp.skills.map((s) => (
                  <span
                    key={s.id}
                    className="px-2.5 py-1 bg-bone-200 border border-forest-900/10 text-forest-900"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

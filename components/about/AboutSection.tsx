"use client";

import React, { useEffect, useRef } from "react";
import { CheckCircle2, Shield, Zap, Layers } from "lucide-react";
import { gsap, isReducedMotion } from "@/lib/animations/gsap";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.from(".about-headline-word", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Summary text fade in
      gsap.from(".about-summary-block", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 80%",
        },
      });

      // Tenet cards stagger
      gsap.from(".about-tenet-card", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-tenet-grid",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About the Engineer"
      className="relative py-28 sm:py-36 px-6 sm:px-10 md:px-14 lg:px-20 bg-forest-950 text-bone-100 border-t border-b border-forest-800 bg-grid-dark paper-grain"
    >
      {/* Chapter Marker Header */}
      <div className="flex items-center justify-between border-b border-forest-800 pb-5 mb-16 sm:mb-24 font-mono text-xs text-bone-400">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-none bg-lime-accent" />
          <span className="text-lime-accent font-semibold tracking-widest">02 // ARCHITECTURAL INTENT</span>
        </div>
        <div className="tracking-wider text-bone-400">
          THE ENGINEER BEHIND THE SYSTEM
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Monumental Editorial Typography */}
        <div ref={leftColRef} className="lg:col-span-6 flex flex-col justify-start">
          <div className="font-mono text-xs text-clay-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-4 h-px bg-clay-500" />
            <span>CORE POSITIONING</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-bone-50 leading-[0.95] mb-8">
            <span className="about-headline-word block">I BUILD THE</span>
            <span className="about-headline-word block text-lime-accent">SYSTEMS BEHIND</span>
            <span className="about-headline-word block text-bone-200">THE EXPERIENCE.</span>
          </h2>

          <div className="p-6 bg-forest-900 border border-forest-800 text-bone-300 font-mono text-xs sm:text-sm leading-relaxed mb-8">
            <div className="text-lime-accent font-semibold mb-2 tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-accent animate-pulse" />
              <span>POSITIONING STATEMENT:</span>
            </div>
            &ldquo;Quietly technical. System-oriented. Precise. Reliable.&rdquo;
          </div>

          {/* Architectural System Principles */}
          <div className="about-tenet-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="about-tenet-card p-5 bg-forest-900/60 border border-forest-800/80 hover:border-clay-500/60 transition-colors">
              <div className="font-mono text-[10px] text-clay-400 mb-2">01 // INTEGRITY</div>
              <div className="font-mono text-sm font-semibold text-bone-100 mb-1 flex items-center gap-2">
                <Shield className="w-4 h-4 text-clay-500" />
                <span>Deterministic Rules</span>
              </div>
              <p className="text-xs text-bone-400 leading-relaxed font-sans">
                Every business validation, price calculation, and permission boundary is strictly verified before state persistence.
              </p>
            </div>

            <div className="about-tenet-card p-5 bg-forest-900/60 border border-forest-800/80 hover:border-lime-accent/60 transition-colors">
              <div className="font-mono text-[10px] text-lime-accent mb-2">02 // CONCURRENCY</div>
              <div className="font-mono text-sm font-semibold text-bone-100 mb-1 flex items-center gap-2">
                <Zap className="w-4 h-4 text-lime-accent" />
                <span>Zero Data Drift</span>
              </div>
              <p className="text-xs text-bone-400 leading-relaxed font-sans">
                Background synchronization and asynchronous workers maintain idempotent, atomic guarantees across external API boundaries.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Verbatim Professional Summary & System Verification */}
        <div ref={rightColRef} className="lg:col-span-6 flex flex-col gap-8">
          <div className="about-summary-block p-8 sm:p-10 bg-forest-900 border-l-4 border-lime-accent border-forest-800 shadow-xl">
            <div className="font-mono text-xs text-bone-400 tracking-wider mb-4 flex items-center justify-between">
              <span>PROFESSIONAL SUMMARY</span>
              <span className="text-lime-accent font-semibold">[VERIFIED RESUME RECORD]</span>
            </div>

            <p className="text-base sm:text-lg text-bone-200 leading-relaxed font-sans mb-6">
              Backend-focused Software Development Engineer with 3+ years of experience developing
              scalable web applications and RESTful APIs using Python, Django and REST Framework.
              Experienced in travel and booking systems, dynamic pricing, e-commerce integration,
              AI-powered document processing, workflow automation and data-driven applications.
            </p>

            <div className="pt-6 border-t border-forest-800/80 flex flex-wrap gap-4 text-xs font-mono text-bone-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-accent" />
                <span>PostgreSQL & MongoDB</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-accent" />
                <span>OAuth 2.0 & JWT Protocols</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-accent" />
                <span>Celery & Asynchronous Queues</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-accent" />
                <span>OCR & AI Document Processing</span>
              </div>
            </div>
          </div>

          {/* Architectural System Topology Snapshot */}
          <div className="p-6 bg-forest-900/40 border border-forest-800 font-mono text-xs text-bone-300">
            <div className="text-clay-400 tracking-wider font-semibold mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-clay-400" />
              <span>CORE ARCHITECTURAL STACK:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-2.5 bg-forest-950 border border-forest-800">
                <div className="text-[10px] text-bone-400">LANGUAGE</div>
                <div className="font-bold text-bone-100">Python 3.x</div>
              </div>
              <div className="p-2.5 bg-forest-950 border border-forest-800">
                <div className="text-[10px] text-bone-400">FRAMEWORK</div>
                <div className="font-bold text-bone-100">Django / DRF</div>
              </div>
              <div className="p-2.5 bg-forest-950 border border-forest-800">
                <div className="text-[10px] text-bone-400">RELATIONAL DB</div>
                <div className="font-bold text-bone-100">PostgreSQL</div>
              </div>
              <div className="p-2.5 bg-forest-950 border border-forest-800">
                <div className="text-[10px] text-bone-400">DOCUMENT STORE</div>
                <div className="font-bold text-bone-100">MongoDB</div>
              </div>
              <div className="p-2.5 bg-forest-950 border border-forest-800">
                <div className="text-[10px] text-bone-400">CACHE / QUEUE</div>
                <div className="font-bold text-bone-100">Redis / Celery</div>
              </div>
              <div className="p-2.5 bg-forest-950 border border-forest-800">
                <div className="text-[10px] text-bone-400">INFRASTRUCTURE</div>
                <div className="font-bold text-bone-100">AWS EC2 / S3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

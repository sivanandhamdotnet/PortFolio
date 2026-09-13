"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, Cpu, Network, ShieldCheck } from "lucide-react";
import SystemTopology from "@/components/visual/SystemTopology";
import { gsap, isReducedMotion } from "@/lib/animations/gsap";

interface HeroSectionProps {
  introFinished: boolean;
}

export default function HeroSection({ introFinished }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const portraitWrapperRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [conceptIndex, setConceptIndex] = useState(0);

  const CONCEPTS = ["SYSTEMS", "DATA PIPELINES", "BUSINESS LOGIC", "SIVANANDHAM S"];

  // Concept kinetic cycling before settling
  useEffect(() => {
    if (!introFinished) return;
    const timer = setInterval(() => {
      setConceptIndex((prev) => {
        if (prev < CONCEPTS.length - 1) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 450);
    return () => clearInterval(timer);
  }, [introFinished, CONCEPTS.length]);

  // GSAP Entrance & ScrollTrigger Linked Reveal
  useEffect(() => {
    if (!introFinished || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-meta-item", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      })
        .from(
          ".hero-title-line",
          {
            y: 50,
            opacity: 0,
            duration: 1.1,
            stagger: 0.15,
            ease: "expo.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-portrait-card",
          {
            scale: 0.94,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".hero-footer-item",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.6"
        );

      // Scroll-driven portrait transition toward About
      if (portraitWrapperRef.current && heroRef.current) {
        gsap.to(portraitWrapperRef.current, {
          y: 140,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [introFinished]);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero Overview"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 sm:pb-12 px-6 sm:px-10 md:px-14 lg:px-20 bg-bone-100 text-forest-900 overflow-hidden bg-grid-architectural"
    >
      {/* 3D Generative Distributed Topology Background */}
      <SystemTopology />

      {/* Top Metadata Rail */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-forest-900/15 pb-4 font-mono text-xs">
        <div className="hero-meta-item flex items-center gap-2">
          <span className="w-2 h-2 rounded-none bg-clay-500" />
          <span className="tracking-widest font-semibold">SIVANANDHAM S</span>
          <span className="text-forest-700/60 font-sans">/</span>
          <span className="text-forest-700">CHENNAI, INDIA</span>
        </div>

        <div className="hero-meta-item flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-forest-900 text-bone-100 border border-forest-800 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-accent animate-ping" />
            <span className="tracking-wider">PYTHON · DJANGO · SYSTEMS</span>
          </div>
          <div className="hidden lg:block text-forest-700/80 tracking-wider">
            BACKEND / SYSTEMS / ARCHITECTURE
          </div>
        </div>
      </div>

      {/* Main Center Grid: Kinetic Typography + Editorial Portrait */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-10 lg:py-14">
        {/* Left Column: Kinetic Typography & Architectural Positioning */}
        <div ref={headlineRef} className="lg:col-span-7 flex flex-col justify-center">
          {/* Transitioning Concept Badge */}
          <div className="hero-title-line inline-flex items-center gap-3 mb-4">
            <span className="font-mono text-xs tracking-widest text-clay-500 uppercase px-2 py-0.5 border border-clay-500/30 bg-clay-500/5">
              PHASE // {conceptIndex + 1}
            </span>
            <span className="font-mono text-xs tracking-wider text-forest-700 uppercase">
              {CONCEPTS[conceptIndex]}
            </span>
          </div>

          {/* Primary Name Headline */}
          <h1 className="hero-title-line font-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-bold uppercase tracking-tight text-forest-900 leading-[0.92] mb-6">
            SIVANANDHAM<br />
            <span className="text-forest-900 hover:text-clay-500 transition-colors duration-300">
              S.
            </span>
          </h1>

          {/* Professional Title & Subtitle */}
          <div className="hero-title-line flex flex-col gap-3 max-w-2xl border-l-2 border-clay-500 pl-4 sm:pl-6 py-1">
            <h2 className="font-mono text-sm sm:text-base md:text-lg tracking-wider font-semibold text-forest-900 uppercase">
              BACKEND SOFTWARE DEVELOPMENT ENGINEER
            </h2>
            <p className="text-base sm:text-lg text-forest-700/90 leading-relaxed font-sans font-normal">
              3+ years architecting scalable backend systems, deterministic REST APIs, travel &
              booking platforms, dynamic pricing engines, automated OCR document extraction, and
              high-frequency marketplace sync pipelines.
            </p>
          </div>

          {/* Architectural System Badges */}
          <div className="hero-title-line flex flex-wrap gap-2 pt-6 font-mono text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bone-200/80 border border-forest-900/15 text-forest-900">
              <Cpu className="w-3.5 h-3.5 text-clay-500" />
              <span>PYTHON · DJANGO · DRF</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bone-200/80 border border-forest-900/15 text-forest-900">
              <Network className="w-3.5 h-3.5 text-clay-500" />
              <span>POSTGRESQL · MONGODB · REDIS</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bone-200/80 border border-forest-900/15 text-forest-900">
              <ShieldCheck className="w-3.5 h-3.5 text-clay-500" />
              <span>ACID · VALIDATION · WORKFLOWS</span>
            </span>
          </div>
        </div>

        {/* Right Column: Editorial Architectural Portrait Treatment */}
        <div
          ref={portraitWrapperRef}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div
            data-cursor="inspect"
            className="hero-portrait-card relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[682/960] p-3 sm:p-4 bg-forest-900 text-bone-100 shadow-2xl border border-forest-800"
          >
            {/* Architectural Grid Corner Accents */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-lime-accent" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-lime-accent" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-lime-accent" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-lime-accent" />

            {/* Inner Masked Container */}
            <div className="relative w-full h-full overflow-hidden bg-forest-950 border border-forest-800">
              <Image
                src="/portrait.png"
                alt="Sivanandham S — Backend Software Development Engineer"
                fill
                priority
                sizes="(max-width: 768px) 340px, 420px"
                className="object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700 ease-editorial"
              />

              {/* Blueprint Dimension Overlay Lines */}
              <div className="absolute inset-0 pointer-events-none border border-forest-700/40" />
              
              {/* Technical Calibration Watermark */}
              <div className="absolute top-3 left-3 font-mono text-[9px] tracking-widest text-lime-accent/80 bg-forest-950/80 px-2 py-0.5 border border-forest-800">
                PORTRAIT // SPEC_ID: 2026.01
              </div>

              <div className="absolute bottom-3 right-3 font-mono text-[9px] tracking-widest text-bone-300 bg-forest-950/80 px-2 py-0.5 border border-forest-800">
                13.0827° N, 80.2707° E
              </div>
            </div>

            {/* Architectural Caption Strip */}
            <div className="pt-3 flex justify-between items-center font-mono text-[10px] text-bone-300">
              <span className="text-lime-accent font-semibold">SIVANANDHAM S</span>
              <span className="text-bone-400">ENGINEER VERIFIED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Micro-Interaction Rail */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-forest-900/15 pt-4 font-mono text-xs">
        <div className="hero-footer-item flex items-center gap-3 text-forest-700">
          <span className="text-clay-500 font-bold">01 // 06</span>
          <span className="hidden sm:inline">PROLOGUE: CORE SPECIFICATION</span>
        </div>

        {/* Center Scroll Prompt with Vertical Kinetic Pulse */}
        <div
          ref={scrollIndicatorRef}
          className="hero-footer-item flex items-center gap-2 text-forest-800 cursor-pointer group"
          onClick={() => {
            const next = document.getElementById("about");
            if (next) next.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="tracking-widest group-hover:text-clay-500 transition-colors">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-clay-500 animate-bounce" />
        </div>

        <div className="hero-footer-item hidden sm:flex items-center gap-2 text-forest-700 text-right">
          <span>LATENCY: ZERO-DRIFT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-lime-accent" />
        </div>
      </div>
    </section>
  );
}

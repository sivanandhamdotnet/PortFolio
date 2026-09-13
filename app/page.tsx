"use client";

import React, { useState } from "react";
import SmoothScroll from "@/lib/lenis";
import CinematicIntro from "@/components/intro/CinematicIntro";
import FloatingNav from "@/components/navigation/FloatingNav";
import CustomCursor from "@/components/cursor/CustomCursor";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import StackConstellation from "@/components/skills/StackConstellation";
import EducationSection from "@/components/education/EducationSection";
import ContactSection from "@/components/contact/ContactSection";
import SiteFooter from "@/components/footer/SiteFooter";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <SmoothScroll>
      {/* Precision Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Cinematic 1.2s System Boot Intro with Skip Support */}
      <CinematicIntro onComplete={() => setIntroFinished(true)} />

      {/* Minimal Floating Navigation */}
      <FloatingNav />

      {/* Main Orchestrated Viewport Experience */}
      <main className="relative min-h-screen bg-bone-100 text-forest-900 selection:bg-clay-500 selection:text-bone-50">
        <HeroSection introFinished={introFinished} />
        <AboutSection />
        <ExperienceSection />
        <ProjectShowcase />
        <StackConstellation />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <SiteFooter />
    </SmoothScroll>
  );
}

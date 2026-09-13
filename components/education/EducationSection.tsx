"use client";

import React from "react";
import { GraduationCap, Award, Languages } from "lucide-react";

export default function EducationSection() {
  return (
    <section
      aria-label="Education and Qualifications"
      className="relative py-20 px-6 sm:px-10 md:px-14 lg:px-20 bg-forest-950 text-bone-100 border-b border-forest-800 bg-grid-dark paper-grain"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Education */}
        <div className="p-6 bg-forest-900 border border-forest-800">
          <div className="flex items-center gap-2 font-mono text-xs text-clay-400 uppercase tracking-widest mb-3">
            <GraduationCap className="w-4 h-4 text-clay-500" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h4 className="font-display text-xl font-bold text-bone-50 mb-1">
            Bachelor of Engineering
          </h4>
          <div className="font-mono text-xs text-lime-accent mb-2">
            Jayaram College of Engineering & Technology
          </div>
          <div className="flex justify-between items-center font-mono text-xs text-bone-400 border-t border-forest-800 pt-3 mt-4">
            <span>2018 — 2022</span>
            <span>CGPA: 8.02 / 10.0</span>
          </div>
        </div>

        {/* Certifications */}
        <div className="p-6 bg-forest-900 border border-forest-800">
          <div className="flex items-center gap-2 font-mono text-xs text-lime-accent uppercase tracking-widest mb-3">
            <Award className="w-4 h-4 text-lime-accent" />
            <span>TECHNICAL CERTIFICATIONS</span>
          </div>
          <h4 className="font-display text-xl font-bold text-bone-50 mb-1">
            Core Systems & Data Structures
          </h4>
          <p className="font-sans text-xs text-bone-300 mb-3">
            Certified in C, Java, Python Data Structures, MongoDB, SQL, HTML, CSS.
          </p>
          <div className="font-mono text-xs text-bone-400 border-t border-forest-800 pt-3 mt-4">
            VERIFIED INDUSTRY & ACADEMIC CREDENTIALS
          </div>
        </div>

        {/* Languages & Collaboration */}
        <div className="p-6 bg-forest-900 border border-forest-800">
          <div className="flex items-center gap-2 font-mono text-xs text-bone-300 uppercase tracking-widest mb-3">
            <Languages className="w-4 h-4 text-bone-300" />
            <span>LINGUISTIC CAPABILITY</span>
          </div>
          <h4 className="font-display text-xl font-bold text-bone-50 mb-1">
            English & Tamil
          </h4>
          <p className="font-sans text-xs text-bone-300 mb-3">
            Professional proficiency across distributed engineering teams, agile ceremonies, and technical documentation.
          </p>
          <div className="font-mono text-xs text-bone-400 border-t border-forest-800 pt-3 mt-4">
            GLOBAL DISTRIBUTED COLLABORATION
          </div>
        </div>
      </div>
    </section>
  );
}

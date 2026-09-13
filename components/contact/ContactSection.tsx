"use client";

import React, { useState } from "react";
import { ArrowUpRight, Mail, Phone, ExternalLink, Copy, Check } from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "sivanandham.skks@gmail.com";
  const phone = "+91 7867828955";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Collaboration"
      className="relative py-28 sm:py-36 px-6 sm:px-10 md:px-14 lg:px-20 bg-bone-100 text-forest-900 bg-grid-architectural"
    >
      {/* Chapter Marker */}
      <div className="flex items-center justify-between border-b border-forest-900/15 pb-5 mb-16 sm:mb-24 font-mono text-xs text-forest-700">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-none bg-clay-500" />
          <span className="text-clay-500 font-semibold tracking-widest">06 // FINAL TRANSMISSION</span>
        </div>
        <div className="tracking-wider">SYSTEM ENGAGEMENT</div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Monumental Headline */}
        <div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold uppercase tracking-tight text-forest-900 leading-[0.92] mb-8">
            LET&apos;S BUILD<br />
            <span className="text-clay-500">WHAT RUNS</span><br />
            UNDERNEATH.
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 max-w-2xl text-base sm:text-lg text-forest-700 font-sans">
            <p>
              Available for high-impact backend engineering roles, scalable distributed architectures,
              and mission-critical API platforms.
            </p>
          </div>
        </div>

        {/* Large Magnetic CTA */}
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={`mailto:${email}?subject=Engineering%20Inquiry%20%E2%80%94%20Backend%20Systems`}
            data-cursor="magnetic"
            className="group inline-flex items-center justify-between gap-6 px-8 sm:px-10 py-5 sm:py-6 bg-forest-900 text-bone-100 font-display text-lg sm:text-2xl font-bold uppercase tracking-tight hover:bg-clay-500 transition-all duration-300 shadow-2xl border border-forest-800"
          >
            <span>START A CONVERSATION</span>
            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-6 py-5 border border-forest-900/20 bg-bone-200/60 font-mono text-xs text-forest-800 hover:bg-bone-200 hover:border-forest-900 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-clay-500" />
                <span className="text-clay-500 font-semibold">COPIED EMAIL TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-forest-700" />
                <span>COPY EMAIL ADDRESS</span>
              </>
            )}
          </button>
        </div>

        {/* Direct Channels Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-forest-900/15 font-mono text-xs">
          <div className="p-5 bg-bone-50 border border-forest-900/10">
            <div className="text-[10px] text-forest-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-clay-500" />
              <span>DIRECT EMAIL</span>
            </div>
            <a
              href={`mailto:${email}`}
              className="font-bold text-forest-900 hover:text-clay-500 transition-colors break-all"
            >
              {email}
            </a>
          </div>

          <div className="p-5 bg-bone-50 border border-forest-900/10">
            <div className="text-[10px] text-forest-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-clay-500" />
              <span>TELEPHONE</span>
            </div>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="font-bold text-forest-900 hover:text-clay-500 transition-colors"
            >
              {phone}
            </a>
          </div>

          <div className="p-5 bg-bone-50 border border-forest-900/10">
            <div className="text-[10px] text-forest-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-clay-500" />
              <span>PROFESSIONAL NETWORK</span>
            </div>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-forest-900 hover:text-clay-500 transition-colors inline-flex items-center gap-1"
            >
              <span>LINKEDIN PROFILE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-5 bg-bone-50 border border-forest-900/10">
            <div className="text-[10px] text-forest-600 uppercase tracking-widest mb-1">
              CURRENT LOCATION
            </div>
            <div className="font-bold text-forest-900">
              Chennai, Tamil Nadu, India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

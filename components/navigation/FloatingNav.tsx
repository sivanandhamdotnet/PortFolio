"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "ABOUT", href: "#about" },
  { name: "EXPERIENCE", href: "#experience" },
  { name: "WORK", href: "#work" },
  { name: "STACK", href: "#stack" },
  { name: "CONTACT", href: "#contact" },
];

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scrolled past hero
      if (currentScrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/reveal on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Determine active section
      const sections = ["about", "experience", "work", "stack", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 240) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Minimal Navigation Bar */}
      <header
        className={`fixed top-5 inset-x-0 z-40 flex justify-center px-4 sm:px-6 transition-all duration-300 ease-editorial ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className={`flex items-center justify-between gap-6 px-5 py-2.5 transition-all duration-300 border ${
            isScrolled
              ? "bg-forest-900/90 text-bone-100 border-forest-700/80 backdrop-blur-md shadow-2xl"
              : "bg-bone-100/85 text-forest-900 border-forest-900/15 backdrop-blur-sm"
          }`}
        >
          {/* Logo / Identifier */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 font-mono text-xs tracking-wider group focus:outline-none"
          >
            <span className="w-2 h-2 rounded-full bg-lime-accent group-hover:scale-125 transition-transform" />
            <span className="font-bold tracking-widest">SIVANANDHAM S</span>
            <span
              className={`hidden md:inline-block text-[10px] px-1.5 py-0.5 border ${
                isScrolled
                  ? "border-forest-700 text-bone-400"
                  : "border-forest-900/20 text-forest-700"
              }`}
            >
              SDE // BACKEND
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 font-mono text-xs">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 transition-all tracking-wider relative group ${
                    isActive
                      ? isScrolled
                        ? "text-lime-accent font-semibold"
                        : "text-clay-500 font-semibold"
                      : isScrolled
                      ? "text-bone-300 hover:text-bone-100"
                      : "text-forest-800 hover:text-forest-950"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-[2px] ${
                        isScrolled ? "bg-lime-accent" : "bg-clay-500"
                      }`}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA Link & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              data-cursor="magnetic"
              className={`hidden sm:inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-1.5 border transition-all ${
                isScrolled
                  ? "border-lime-accent text-forest-950 bg-lime-accent hover:bg-transparent hover:text-lime-accent"
                  : "border-forest-900 text-bone-100 bg-forest-900 hover:bg-clay-500 hover:border-clay-500"
              }`}
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open Navigation Menu"
              className={`md:hidden p-1.5 border transition-colors ${
                isScrolled
                  ? "border-forest-700 text-bone-100 hover:text-lime-accent"
                  : "border-forest-900/20 text-forest-900 hover:text-clay-500"
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      {isMobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-forest-950/98 text-bone-100 flex flex-col justify-between p-6 sm:p-10 backdrop-blur-xl animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-forest-800 pb-5">
            <div className="flex items-center gap-2 font-mono text-xs text-bone-300">
              <span className="w-2 h-2 rounded-full bg-lime-accent" />
              <span>SIVANANDHAM S // DIRECTORY</span>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close Navigation Menu"
              className="p-2 border border-forest-700 text-bone-300 hover:text-lime-accent hover:border-lime-accent"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group flex items-baseline justify-between border-b border-forest-900 pb-3 font-display text-3xl sm:text-4xl text-bone-200 hover:text-lime-accent transition-colors"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-clay-400">0{idx + 1}</span>
                  <span>{item.name}</span>
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </a>
            ))}
          </nav>

          <div className="border-t border-forest-800 pt-5 flex flex-col gap-3 font-mono text-xs text-bone-400">
            <div className="flex justify-between items-center">
              <span>PRIMARY FOCUS:</span>
              <span className="text-lime-accent">PYTHON · DJANGO · SYSTEMS</span>
            </div>
            <div className="flex justify-between items-center">
              <span>LOCATION:</span>
              <span className="text-bone-200">CHENNAI, INDIA</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

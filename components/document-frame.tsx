"use client"

import { type ReactNode, useEffect, useState, useCallback } from "react"

interface DocumentFrameProps {
  children: ReactNode
}

const SECTIONS = [
  { id: "TITLE", label: "F0", percent: 0 },
  { id: "HERO", label: "F1", percent: 20 },
  { id: "PROJECTS", label: "F2", percent: 45 },
  { id: "ABOUT", label: "F3", percent: 70 },
  { id: "CONTACT", label: "F4", percent: 95 },
]

export function DocumentFrame({ children }: DocumentFrameProps) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [currentSection, setCurrentSection] = useState("TITLE")

  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      if (total > 0) setScrollPercent(Math.round((window.scrollY / total) * 100))
      const els = document.querySelectorAll("[data-section]")
      els.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= 120 && r.bottom >= 120) {
          setCurrentSection(el.getAttribute("data-section") || "TITLE")
        }
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.querySelector(`[data-section="${sectionId}"]`)
    el?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-background grid-paper paper-texture relative">
      {/* LEFT MARGIN -- Unified floor markers + scroll progress.
           The progress bar runs vertically with floor labels positioned at their scroll points. */}
      <div className="fixed left-0 top-0 h-full w-10 md:w-12 border-r border-border bg-background/90 backdrop-blur-sm z-40 flex flex-col">
        {/* Combined progress track with floor markers */}
        <div className="flex-1 relative mx-auto my-8" style={{ width: "1px" }}>
          {/* Background track */}
          <div className="absolute inset-0 bg-border/30" />
          
          {/* Progress fill */}
          <div
            className="absolute top-0 left-0 w-full bg-foreground/40 transition-all duration-150"
            style={{ height: `${scrollPercent}%` }}
          />
          
          {/* Floor markers positioned along the track - centered */}
          {SECTIONS.map((s) => {
            const active = currentSection === s.id
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="absolute left-1/2 flex flex-col items-center group"
                style={{ top: `${s.percent}%`, transform: `translate(-50%, -50%)` }}
                aria-label={`Go to ${s.id}`}
              >
                {/* Label centered on the line */}
                <span
                  className={`text-[10px] font-mono tracking-wider transition-all duration-300 whitespace-nowrap px-1 py-0.5 rounded ${
                    active 
                      ? "text-foreground font-medium bg-background" 
                      : "text-muted-foreground/40 group-hover:text-muted-foreground/70 group-hover:bg-background/50"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Compass at bottom - rotates with scroll */}
        <div className="flex items-center justify-center pb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            className="transition-transform duration-700 ease-out opacity-30"
            style={{ transform: `rotate(${scrollPercent * 3.6}deg)` }}
            aria-hidden="true"
          >
            <circle cx="24" cy="24" r="20" fill="none" stroke="var(--border)" strokeWidth="0.5" />
            <polygon points="24,6 22,22 24,20 26,22" fill="var(--foreground)" opacity="0.6" />
            <line x1="24" y1="6" x2="24" y2="42" stroke="var(--border)" strokeWidth="0.3" />
            <line x1="6" y1="24" x2="42" y2="24" stroke="var(--border)" strokeWidth="0.3" />
          </svg>
        </div>
      </div>

      {/* RIGHT MARGIN -- CV download only, minimal */}
      <div className="fixed right-0 top-0 h-full w-8 md:w-10 border-l border-border bg-background/90 backdrop-blur-sm z-40 flex flex-col items-center py-6">
        {/* CV Download button */}
        <a
          href="/Brandon-Bartlett-CV.pdf"
          download
          className="group flex flex-col items-center gap-2 py-2 px-1 hover:bg-secondary/50 transition-colors rounded"
          title="Download CV"
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            className="text-foreground/40 group-hover:text-foreground transition-colors"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span className="text-[6px] font-mono text-muted-foreground/40 group-hover:text-foreground/60 tracking-[0.1em] writing-vertical transition-colors">CV</span>
        </a>
      </div>

      {/* CORNER MARKS -- Subtle print registration marks */}
      {[
        "top-2 left-[44px]",
        "top-2 right-[36px] -scale-x-100",
        "bottom-2 left-[44px] -scale-y-100",
        "bottom-2 right-[36px] scale-[-1]",
      ].map((pos, i) => (
        <div key={i} className={`fixed z-30 pointer-events-none ${pos}`} aria-hidden="true">
          <svg width="8" height="8" viewBox="0 0 10 10" className="text-border/30">
            <line x1="0" y1="0" x2="8" y2="0" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      ))}

      {/* Main content */}
      <main className="ml-10 md:ml-12 mr-8 md:mr-10 py-4 relative z-10">
        {children}
      </main>
    </div>
  )
}

"use client"

import { type ReactNode, useEffect, useState } from "react"

interface DocumentFrameProps {
  children: ReactNode
}

const SECTIONS = [
  { id: "TITLE", label: "F0", full: "TITLE BLOCK" },
  { id: "HERO", label: "F1", full: "HERO" },
  { id: "PROJECTS", label: "F2", full: "INDEX" },
  { id: "ABOUT", label: "F3", full: "NOTES" },
  { id: "CONTACT", label: "F4", full: "CONTACT" },
]

export function DocumentFrame({ children }: DocumentFrameProps) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [currentSection, setCurrentSection] = useState("TITLE")

  useEffect(() => {
    const handleScroll = () => {
      if (typeof document === "undefined" || typeof window === "undefined") return
      const total = document.body.scrollHeight - window.innerHeight
      if (total > 0) setScrollPercent(Math.round((window.scrollY / total) * 100))

      const sections = document.querySelectorAll("[data-section]")
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) {
          setCurrentSection(s.getAttribute("data-section") || "TITLE")
        }
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const el = document.querySelector(`[data-section="${sectionId}"]`)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background grid-paper paper-texture relative">
      {/* Left margin — floor tick navigation */}
      <div className="fixed left-0 top-0 h-full w-10 md:w-12 border-r border-border bg-background/95 backdrop-blur-sm z-40 flex flex-col items-center justify-between py-4">
        {/* Floor tick marks — each one scrolls to that section */}
        <nav className="flex flex-col items-center gap-0" aria-label="Section navigation">
          {SECTIONS.map((s) => {
            const isActive = currentSection === s.id
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`group relative w-full flex items-center justify-center py-3 transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"
                }`}
                aria-label={`Go to ${s.full}`}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Tick mark line extending from the right edge */}
                <span className={`absolute right-0 top-1/2 -translate-y-px h-px transition-all duration-300 ${
                  isActive ? "w-3 bg-foreground" : "w-1.5 bg-border group-hover:w-2.5 group-hover:bg-muted-foreground/40"
                }`} />
                <span className={`text-[9px] font-mono tracking-wider transition-all duration-300 ${
                  isActive ? "font-bold" : ""
                }`}>
                  {s.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Scale ruler — the scroll progress bar, styled like a ruler */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative w-px h-28 bg-border">
            {/* Ruler ticks */}
            {[0, 25, 50, 75, 100].map((tick) => (
              <span
                key={tick}
                className="absolute left-1/2 -translate-x-1/2 w-1.5 h-px bg-border"
                style={{ top: `${tick}%` }}
              />
            ))}
            {/* Progress fill */}
            <div
              className="absolute top-0 left-0 w-full bg-foreground transition-all duration-150"
              style={{ height: `${scrollPercent}%` }}
            />
          </div>
          <span className="text-[7px] font-mono text-muted-foreground/50 tabular-nums">
            {scrollPercent}%
          </span>
        </div>

        {/* Compass indicator — shows north, rotates slightly on scroll as a playful orientation hint */}
        <div className="flex flex-col items-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="text-muted-foreground/30 transition-transform duration-700"
            style={{ transform: `rotate(${scrollPercent * 0.5}deg)` }}
            aria-hidden="true"
          >
            {/* Simple cartographer compass */}
            <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="0.5" />
            <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="0.5" />
            {/* North arrow */}
            <polygon points="12,2 10,8 14,8" fill="currentColor" />
            <text x="12" y="1" textAnchor="middle" fontSize="3" fill="currentColor" className="font-mono">N</text>
          </svg>
        </div>
      </div>

      {/* Corner registration marks — indicate the document boundary, like a print sheet */}
      <div className="fixed top-3 left-14 z-30 pointer-events-none" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-border">
          <line x1="0" y1="0" x2="12" y2="0" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="fixed top-3 right-3 z-30 pointer-events-none" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-border">
          <line x1="0" y1="0" x2="12" y2="0" stroke="currentColor" strokeWidth="0.5" />
          <line x1="12" y1="0" x2="12" y2="12" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="fixed bottom-3 left-14 z-30 pointer-events-none" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-border">
          <line x1="0" y1="12" x2="12" y2="12" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="fixed bottom-3 right-3 z-30 pointer-events-none" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-border">
          <line x1="0" y1="12" x2="12" y2="12" stroke="currentColor" strokeWidth="0.5" />
          <line x1="12" y1="0" x2="12" y2="12" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Bottom bar — document metadata strip (like a real drawing sheet footer) */}
      <div className="fixed bottom-0 left-10 md:left-12 right-0 h-7 border-t border-border bg-background/95 backdrop-blur-sm z-40 flex items-center justify-between px-4">
        <span className="text-[8px] font-mono text-muted-foreground/40 tracking-widest">DWG: IS-2026-001</span>
        <span className="text-[8px] font-mono text-muted-foreground/40 tracking-widest">SHEET 1 OF 1</span>
        <span className="text-[8px] font-mono text-muted-foreground/40 tracking-widest">SCALE 1:1</span>
        <span className="text-[8px] font-mono text-muted-foreground/40 tracking-widest hidden sm:block">REV 00</span>
      </div>

      {/* Main content */}
      <main className="ml-10 md:ml-12 pb-7 relative z-10">
        {children}
      </main>
    </div>
  )
}

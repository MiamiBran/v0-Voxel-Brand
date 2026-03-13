"use client"

import { type ReactNode, useEffect, useState, useCallback } from "react"

interface DocumentFrameProps {
  children: ReactNode
}

const SECTIONS = [
  { id: "TITLE", label: "F0" },
  { id: "HERO", label: "F1" },
  { id: "PROJECTS", label: "F2" },
  { id: "ABOUT", label: "F3" },
  { id: "CONTACT", label: "F4" },
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
      {/* LEFT MARGIN -- Floor-tick navigation. Each tick is a clickable section anchor. 
           The active tick extends a longer line, like a tab stop on a ruler. */}
      <div className="fixed left-0 top-0 h-full w-10 md:w-14 border-r border-border bg-background/90 backdrop-blur-sm z-40 flex flex-col items-center justify-between py-6">
        <nav className="flex flex-col items-center w-full" aria-label="Section navigation">
          {SECTIONS.map((s) => {
            const active = currentSection === s.id
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="group relative w-full flex items-center justify-center py-4 transition-colors"
                aria-label={`Go to ${s.id}`}
                aria-current={active ? "true" : undefined}
              >
                {/* Tick line from right edge */}
                <span
                  className={`absolute right-0 top-1/2 -translate-y-px h-px transition-all duration-300 ${
                    active
                      ? "w-4 bg-foreground"
                      : "w-1.5 bg-border group-hover:w-3 group-hover:bg-muted-foreground/50"
                  }`}
                />
                <span
                  className={`text-[8px] font-mono tracking-widest transition-colors duration-300 ${
                    active ? "text-foreground font-bold" : "text-muted-foreground/30 group-hover:text-muted-foreground/60"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* SCALE RULER -- Scroll progress. Styled as a technical ruler with 
             tick marks at 0/25/50/75/100 and a fill bar showing position. */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="relative w-px h-24 bg-border/50">
            {[0, 25, 50, 75, 100].map((t) => (
              <span
                key={t}
                className="absolute left-1/2 -translate-x-1/2 h-px bg-border/60"
                style={{ top: `${t}%`, width: t % 50 === 0 ? "6px" : "3px" }}
              />
            ))}
            <div
              className="absolute top-0 left-0 w-full bg-foreground/60 transition-all duration-150"
              style={{ height: `${scrollPercent}%` }}
            />
          </div>
          <span className="text-[7px] font-mono text-muted-foreground/30 tabular-nums">
            {scrollPercent}
          </span>
        </div>

        {/* COMPASS -- Rotates with scroll, acting as an orientation indicator.
             Uses a simple cartographer-style north arrow. */}
        <div className="flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="text-muted-foreground/20 transition-transform duration-700 ease-out"
            style={{ transform: `rotate(${scrollPercent * 1.8}deg)` }}
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="0.4" />
            <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="0.3" />
            <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="0.3" />
            {/* North arrow filled */}
            <polygon points="12,3 10.5,9 13.5,9" fill="currentColor" />
            {/* South arrow outline */}
            <polygon points="12,21 10.5,15 13.5,15" fill="none" stroke="currentColor" strokeWidth="0.3" />
            <text x="12" y="1.5" textAnchor="middle" fontSize="2.5" fill="currentColor" className="font-mono">N</text>
          </svg>
        </div>
      </div>

      {/* REGISTRATION MARKS -- Corner crop marks indicating document boundaries.
           These are standard in print/technical drawing to define trim area. */}
      {[
        "top-2 left-[52px] origin-top-left",
        "top-2 right-2 origin-top-right -scale-x-100",
        "bottom-9 left-[52px] origin-bottom-left -scale-y-100",
        "bottom-9 right-2 origin-bottom-right scale-x-[-1] scale-y-[-1]",
      ].map((pos, i) => (
        <div key={i} className={`fixed z-30 pointer-events-none ${pos}`} aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 10 10" className="text-border/50">
            <line x1="0" y1="0" x2="10" y2="0" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      ))}

      {/* BOTTOM BAR -- Drawing sheet footer strip with document metadata.
           Standard on every architectural drawing: DWG number, sheet count, scale, revision. */}
      <div className="fixed bottom-0 left-10 md:left-14 right-0 h-7 border-t border-border bg-background/90 backdrop-blur-sm z-40 flex items-center px-4 gap-6">
        <span className="text-[7px] font-mono text-muted-foreground/30 tracking-[0.2em]">DWG IS-2026-001</span>
        <span className="text-[7px] font-mono text-muted-foreground/30 tracking-[0.2em]">SHEET 1/1</span>
        <span className="text-[7px] font-mono text-muted-foreground/30 tracking-[0.2em]">SCALE 1:1</span>
        <span className="text-[7px] font-mono text-muted-foreground/30 tracking-[0.2em] ml-auto hidden sm:block">REV 00</span>
      </div>

      {/* Main content */}
      <main className="ml-10 md:ml-14 pb-8 relative z-10">
        {children}
      </main>
    </div>
  )
}

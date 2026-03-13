"use client"

import { type ReactNode, useEffect, useState, useCallback } from "react"

interface DocumentFrameProps {
  children: ReactNode
}

const SECTIONS = [
  { id: "TITLE", label: "00", name: "TOP" },
  { id: "HERO", label: "01", name: "INTRO" },
  { id: "PROJECTS", label: "02", name: "WORK" },
  { id: "PROCESS", label: "03", name: "PROCESS" },
  { id: "CONTACT", label: "04", name: "CONTACT" },
]

export function DocumentFrame({ children }: DocumentFrameProps) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [currentSection, setCurrentSection] = useState("TITLE")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      if (total > 0) setScrollPercent(Math.round((window.scrollY / total) * 100))
      const els = document.querySelectorAll("[data-section]")
      els.forEach((el, idx) => {
        const r = el.getBoundingClientRect()
        if (r.top <= 120 && r.bottom >= 120) {
          const section = el.getAttribute("data-section") || "TITLE"
          setCurrentSection(section)
          const foundIdx = SECTIONS.findIndex(s => s.id === section)
          if (foundIdx >= 0) setCurrentIndex(foundIdx)
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

  const currentSectionData = SECTIONS.find(s => s.id === currentSection) || SECTIONS[0]

  return (
    <div className="min-h-screen bg-background grid-paper paper-texture relative">
      {/* LEFT MARGIN -- Section navigation with progress */}
      <div className="fixed left-0 top-0 h-full w-12 md:w-14 border-r border-border bg-background/95 backdrop-blur-sm z-40 flex flex-col">
        {/* Section list */}
        <nav className="flex-1 flex flex-col justify-center py-8">
          {SECTIONS.map((s, idx) => {
            const isActive = currentSection === s.id
            const isPast = idx < currentIndex
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`group relative flex items-center py-3 px-2 transition-all duration-200 ${
                  isActive ? "bg-secondary/30" : "hover:bg-secondary/20"
                }`}
                aria-label={`Go to ${s.name}`}
              >
                {/* Progress indicator line */}
                <div className={`absolute left-0 top-0 w-0.5 h-full transition-colors duration-300 ${
                  isPast || isActive ? "bg-foreground/60" : "bg-transparent"
                }`} />
                
                {/* Section number */}
                <span className={`text-[11px] font-mono tabular-nums transition-colors duration-200 ${
                  isActive 
                    ? "text-foreground font-medium" 
                    : isPast 
                      ? "text-foreground/50" 
                      : "text-muted-foreground/30 group-hover:text-muted-foreground/60"
                }`}>
                  {s.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Bottom: scroll percentage */}
        <div className="flex flex-col items-center pb-4 gap-2">
          <span className="text-[9px] font-mono tabular-nums text-foreground/50">
            {String(scrollPercent).padStart(2, "0")}%
          </span>
        </div>
      </div>

      {/* RIGHT MARGIN -- Contextual info + actions */}
      <div className="fixed right-0 top-0 h-full w-10 md:w-12 border-l border-border bg-background/95 backdrop-blur-sm z-40 flex flex-col items-center justify-between py-6">
        {/* Top: CV Download */}
        <a
          href="/Brandon-Bartlett-CV.pdf"
          download
          className="group flex flex-col items-center gap-1 p-2 hover:bg-secondary/50 transition-colors rounded"
          title="Download Resume"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            className="text-foreground/50 group-hover:text-foreground transition-colors"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span className="text-[7px] font-mono text-foreground/40 group-hover:text-foreground/70 tracking-wider transition-colors">PDF</span>
        </a>

        {/* Middle: Current section indicator (vertical) */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[8px] font-mono text-muted-foreground/40 tracking-wider writing-vertical">SEC</span>
          <span className="text-[11px] font-mono font-medium text-foreground/70 writing-vertical tracking-wider">
            {currentSectionData.name}
          </span>
        </div>

        {/* Bottom: Quick links */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="mailto:hello@bartlettbuilds.pro"
            className="p-2 hover:bg-secondary/50 transition-colors rounded group"
            title="Email"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/40 group-hover:text-foreground transition-colors">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/brandonbartlett"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-secondary/50 transition-colors rounded group"
            title="LinkedIn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/40 group-hover:text-foreground transition-colors">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://cal.com/brandonbartlett"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-secondary/50 transition-colors rounded group"
            title="Book a call"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/40 group-hover:text-foreground transition-colors">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </a>
        </div>
      </div>

      {/* CORNER MARKS -- Subtle print registration marks */}
      {[
        "top-2 left-[52px]",
        "top-2 right-[44px] -scale-x-100",
        "bottom-2 left-[52px] -scale-y-100",
        "bottom-2 right-[44px] scale-[-1]",
      ].map((pos, i) => (
        <div key={i} className={`fixed z-30 pointer-events-none ${pos}`} aria-hidden="true">
          <svg width="8" height="8" viewBox="0 0 10 10" className="text-border/40">
            <line x1="0" y1="0" x2="8" y2="0" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      ))}

      {/* Main content */}
      <main className="ml-12 md:ml-14 mr-10 md:mr-12 py-4 relative z-10">
        {children}
      </main>
    </div>
  )
}

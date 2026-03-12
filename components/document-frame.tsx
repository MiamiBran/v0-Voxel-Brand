"use client"

import { type ReactNode, useEffect, useState } from "react"

interface DocumentFrameProps {
  children: ReactNode
}

export function DocumentFrame({ children }: DocumentFrameProps) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [currentSection, setCurrentSection] = useState("S0")

  useEffect(() => {
    const handleScroll = () => {
      if (typeof document === "undefined" || typeof window === "undefined") return
      const total = document.body.scrollHeight - window.innerHeight
      if (total > 0) setScrollPercent(Math.round((window.scrollY / total) * 100))

      const sections = document.querySelectorAll("[data-section]")
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) {
          setCurrentSection(s.getAttribute("data-section") || "S0")
        }
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background grid-paper paper-texture relative">
      {/* ── LEFT MARGIN STRIP ── */}
      <div className="fixed left-0 top-0 h-full w-8 md:w-12 border-r border-border bg-background/90 backdrop-blur-sm z-40 flex flex-col items-center justify-between py-12">
        {/* Section indicator */}
        <span className="floor-marker tracking-[0.3em] text-muted-foreground">
          {currentSection}
        </span>

        {/* Floor tick marks */}
        <div className="flex flex-col items-center gap-6">
          {["F5", "F4", "F3", "F2", "F1", "F0"].map((f) => (
            <div key={f} className="flex items-center gap-1">
              <div className="w-2 h-px bg-muted-foreground/60" />
              <span className="text-[8px] font-mono text-muted-foreground/50">{f}</span>
            </div>
          ))}
        </div>

        {/* Drawing number vertical */}
        <span className="floor-marker text-muted-foreground/40 text-[8px]">IS-2026</span>
      </div>

      {/* ── RIGHT MARGIN STRIP ── */}
      <div className="fixed right-0 top-0 h-full w-8 md:w-12 border-l border-border bg-background/90 backdrop-blur-sm z-40 hidden md:flex flex-col items-center justify-between py-12">
        <span className="annotation rotate-90 origin-center whitespace-nowrap mt-12 text-muted-foreground/50">
          SCROLL
        </span>

        {/* Progress bar */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-20 bg-border relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-foreground transition-all duration-200"
              style={{ height: `${scrollPercent}%` }}
            />
          </div>
          <span className="text-[8px] font-mono text-muted-foreground">
            {scrollPercent}%
          </span>
        </div>

        {/* Compass */}
        <CompassRose />
      </div>

      {/* ── TOP BAR ── */}
      <div className="fixed top-0 left-8 md:left-12 right-8 md:right-12 h-8 md:h-10 border-b border-border bg-background/90 backdrop-blur-sm z-40 flex items-center justify-between px-4 md:px-6">
        <span className="annotation text-muted-foreground/70">DWG: IS-2026-001</span>
        <span className="annotation hidden sm:block text-muted-foreground/70">
          ISOMETRIC STRATA
        </span>
        <span className="annotation text-muted-foreground/70">REV: 01</span>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="fixed bottom-0 left-8 md:left-12 right-8 md:right-12 h-8 md:h-10 border-t border-border bg-background/90 backdrop-blur-sm z-40 flex items-center justify-between px-4 md:px-6">
        <ScaleBar />
        <span className="annotation hidden sm:block text-muted-foreground/70">
          SHEET 1 OF 1
        </span>
        <span className="annotation text-muted-foreground/70">SCALE 1:100</span>
      </div>

      {/* ── CORNER REGISTRATION MARKS ── */}
      <CornerMark position="top-left" />
      <CornerMark position="top-right" />
      <CornerMark position="bottom-left" />
      <CornerMark position="bottom-right" />

      {/* ── MAIN CONTENT ── */}
      <main className="ml-8 md:ml-12 mr-8 md:mr-12 mt-8 md:mt-10 mb-8 md:mb-10 relative z-10">
        {children}
      </main>
    </div>
  )
}

/* ── COMPASS ROSE ── */
function CompassRose() {
  return (
    <div className="w-8 h-8 relative mb-2">
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-border" />
        <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-border" />
        {/* Cardinal ticks */}
        <line x1="20" y1="3" x2="20" y2="7" stroke="currentColor" strokeWidth="0.8" className="text-foreground" />
        <line x1="20" y1="33" x2="20" y2="37" stroke="currentColor" strokeWidth="0.4" className="text-muted-foreground" />
        <line x1="3" y1="20" x2="7" y2="20" stroke="currentColor" strokeWidth="0.4" className="text-muted-foreground" />
        <line x1="33" y1="20" x2="37" y2="20" stroke="currentColor" strokeWidth="0.4" className="text-muted-foreground" />
        {/* N label */}
        <text x="20" y="14" textAnchor="middle" className="fill-foreground text-[5px] font-mono" dominantBaseline="middle">
          N
        </text>
        {/* Center dot */}
        <circle cx="20" cy="20" r="1" className="fill-foreground" />
      </svg>
    </div>
  )
}

/* ── SCALE BAR ── */
function ScaleBar() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-1.5">
        <div className="w-3 md:w-5 h-full bg-foreground" />
        <div className="w-3 md:w-5 h-full bg-transparent border-y border-foreground" />
        <div className="w-3 md:w-5 h-full bg-foreground" />
        <div className="w-3 md:w-5 h-full bg-transparent border-y border-r border-foreground" />
      </div>
      <span className="text-[8px] font-mono text-muted-foreground">0 ── 1:100 ── M</span>
    </div>
  )
}

/* ── CORNER REGISTRATION MARKS ── */
function CornerMark({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const pos = {
    "top-left": "top-8 md:top-10 left-8 md:left-12",
    "top-right": "top-8 md:top-10 right-8 md:right-12",
    "bottom-left": "bottom-8 md:bottom-10 left-8 md:left-12",
    "bottom-right": "bottom-8 md:bottom-10 right-8 md:right-12",
  }
  const border = {
    "top-left": "border-t border-l",
    "top-right": "border-t border-r",
    "bottom-left": "border-b border-l",
    "bottom-right": "border-b border-r",
  }
  return (
    <div className={`fixed ${pos[position]} w-3 h-3 ${border[position]} border-muted-foreground/60 z-50 pointer-events-none`} />
  )
}

"use client"

import { type ReactNode, useEffect, useState } from "react"

interface DocumentFrameProps {
  children: ReactNode
}

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

  return (
    <div className="min-h-screen bg-background grid-paper paper-texture relative">
      {/* Left margin — section wayfinding */}
      <div className="fixed left-0 top-0 h-full w-8 md:w-10 border-r border-border bg-background/95 backdrop-blur-sm z-40 flex flex-col items-center justify-between py-6">
        <span className="floor-marker tracking-[0.2em] text-muted-foreground text-[9px]">
          {currentSection}
        </span>

        {/* Scroll progress — functional indicator */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-px h-24 bg-border relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-foreground transition-all duration-150"
              style={{ height: `${scrollPercent}%` }}
            />
          </div>
          <span className="text-[8px] font-mono text-muted-foreground/60">
            {scrollPercent}%
          </span>
        </div>

        <span className="floor-marker text-muted-foreground/30 text-[7px] tracking-[0.15em]">2026</span>
      </div>

      {/* Main content */}
      <main className="ml-8 md:ml-10 relative z-10">
        {children}
      </main>
    </div>
  )
}

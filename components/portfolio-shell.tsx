"use client"

import { type ReactNode, useEffect, useState, useCallback, createContext, useContext } from "react"
import { useTheme } from "next-themes"
import { portfolioShellContent } from "@/lib/site-content"

// Context to share rotation state with hero
export const RotationContext = createContext<{
  isAutoRotating: boolean
  toggleRotation: () => void
  rotationAngle: number
  setRotationAngle: (angle: number) => void
}>({
  isAutoRotating: true,
  toggleRotation: () => {},
  rotationAngle: 0,
  setRotationAngle: () => {},
})

export function useRotation() {
  return useContext(RotationContext)
}

interface PortfolioShellProps {
  children: ReactNode
}

export function PortfolioShell({ children }: PortfolioShellProps) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [currentSection, setCurrentSection] = useState("HEADER")
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [rotationAngle, setRotationAngle] = useState(0)
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (typeof document === "undefined" || typeof window === "undefined") return
      const total = document.body.scrollHeight - window.innerHeight
      if (total > 0) setScrollPercent(Math.round((window.scrollY / total) * 100))

      const sections = document.querySelectorAll("[data-section]")
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) {
          setCurrentSection(s.getAttribute("data-section") || "HEADER")
        }
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof document === "undefined") return
    const el = document.querySelector(`[data-section="${sectionId}"]`)
    el?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const toggleRotation = useCallback(() => {
    setIsAutoRotating((prev) => !prev)
  }, [])

  return (
    <RotationContext.Provider value={{ isAutoRotating, toggleRotation, rotationAngle, setRotationAngle }}>
      <div className="min-h-screen bg-background grid-paper paper-texture relative">
        
        {/* LEFT MARGIN -- Logo at top, floor markers on a progress track */}
        <div className="fixed left-0 top-0 h-full w-10 md:w-12 border-r border-border bg-background/90 backdrop-blur-sm z-40 flex flex-col">
          
          {/* Logo space at top */}
          <div className="h-12 flex items-center justify-center border-b border-border/50">
            <span className="text-[10px] font-mono font-bold text-foreground/60 tracking-tight">
              {portfolioShellContent.logo}
            </span>
          </div>
          
          {/* Progress track container */}
          <div className="flex-1 relative">
            {/* Progress track */}
            <div className="absolute left-1/2 top-4 bottom-4 w-px bg-border -translate-x-1/2">
              {/* Fill based on scroll */}
              <div 
                className="absolute top-0 left-0 w-full bg-foreground/30 transition-all duration-150"
                style={{ height: `${scrollPercent}%` }}
              />
            </div>

            {/* Floor markers */}
            {portfolioShellContent.sections.map((s) => {
            const active = currentSection === s.id
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="absolute left-0 right-0 flex justify-center group min-h-[36px] touch-manipulation"
                style={{ top: `${s.percent}%`, transform: 'translateY(-50%)' }}
                aria-label={`Go to ${s.id}`}
              >
                <span
                  className={`block text-[9px] font-mono tracking-wider px-2 py-1 transition-all duration-200 ${
                    active 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground/50 hover:text-foreground/70 active:text-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            )
          })}
          </div>
        </div>

        {/* RIGHT MARGIN -- Compass rotation control centered, CV at top */}
        <div className="fixed right-0 top-0 h-full w-8 md:w-10 border-l border-border bg-background/90 backdrop-blur-sm z-40 flex flex-col items-center justify-between py-6">
          {/* CV download at top */}
          <a
            href="/Brandon-Bartlett-CV.pdf"
            download
            className="group flex flex-col items-center gap-1.5 p-3 hover:bg-secondary/40 active:bg-secondary/50 transition-colors rounded min-h-[48px] min-w-[40px] touch-manipulation"
            title="Download Resume"
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
            <span className="text-[6px] font-mono text-foreground/30 group-hover:text-foreground/60 tracking-wider writing-vertical transition-colors">CV</span>
          </a>

          {/* Passive compass - centered */}
          <div className="flex items-center justify-center p-3 min-h-[48px] min-w-[48px]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 48 48"
              style={{ 
                transform: `rotate(${rotationAngle}deg)`,
                transition: isAutoRotating ? "none" : "transform 0.5s ease-out",
              }}
              aria-hidden="true"
            >
              <circle 
                cx="24" cy="24" r="20" 
                fill="none" 
                stroke={resolvedTheme === "dark" ? "#A855F7" : "#7000FF"} 
                strokeWidth="0.5" 
                opacity={0.28}
              />
              <circle 
                cx="24" cy="24" r="14" 
                fill="none" 
                stroke={resolvedTheme === "dark" ? "#A855F7" : "#7000FF"}
                strokeWidth="0.3"
                opacity={0.22}
              />
              <line x1="24" y1="4" x2="24" y2="8" stroke={resolvedTheme === "dark" ? "#A855F7" : "#7000FF"} strokeWidth="0.5" opacity={0.32} />
              <line x1="44" y1="24" x2="40" y2="24" stroke={resolvedTheme === "dark" ? "#A855F7" : "#7000FF"} strokeWidth="0.5" opacity={0.32} />
              <line x1="24" y1="44" x2="24" y2="40" stroke={resolvedTheme === "dark" ? "#A855F7" : "#7000FF"} strokeWidth="0.5" opacity={0.32} />
              <line x1="4" y1="24" x2="8" y2="24" stroke={resolvedTheme === "dark" ? "#A855F7" : "#7000FF"} strokeWidth="0.5" opacity={0.32} />
              <polygon 
                points="24,6 21,18 24,16 27,18" 
                fill={resolvedTheme === "dark" ? "#A855F7" : "#7000FF"} 
                opacity={0.42} 
              />
              <polygon 
                points="24,42 21,30 24,32 27,30" 
                fill="none" 
                stroke={resolvedTheme === "dark" ? "#A855F7" : "#7000FF"}
                strokeWidth="0.3" 
                opacity={0.22} 
              />
              <text x="24" y="3" textAnchor="middle" fontSize="4" fill={resolvedTheme === "dark" ? "#A855F7" : "#7000FF"} opacity={0.32} fontFamily="monospace">N</text>
              <circle 
                cx="24" cy="24" r="1.5" 
                fill="var(--foreground)" 
                opacity={0.22} 
              />
            </svg>
          </div>

          {/* Theme toggle at bottom */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="group flex flex-col items-center gap-1.5 p-3 hover:bg-secondary/40 active:bg-secondary/50 transition-colors rounded min-h-[48px] min-w-[40px] touch-manipulation"
            title={mounted ? (resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
          >
            {mounted && resolvedTheme === "dark" ? (
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                className="text-foreground/40 group-hover:text-foreground transition-colors"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                className="text-foreground/40 group-hover:text-foreground transition-colors"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* CORNER MARKS */}
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
    </RotationContext.Provider>
  )
}

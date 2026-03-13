"use client"

import { type ReactNode, useEffect, useState, useCallback, createContext, useContext } from "react"

// Context to share rotation state with hero
export const RotationContext = createContext<{
  isAutoRotating: boolean
  toggleRotation: () => void
}>({
  isAutoRotating: true,
  toggleRotation: () => {},
})

export function useRotation() {
  return useContext(RotationContext)
}

interface DocumentFrameProps {
  children: ReactNode
}

// Sections map to the document structure
const SECTIONS = [
  { id: "TITLE", label: "F0", percent: 3 },
  { id: "HERO", label: "—", percent: 15 },
  { id: "PROJECTS", label: "F1", percent: 35 },
  { id: "PROCESS", label: "F2", percent: 52 },
  { id: "EXPERIMENTS", label: "F3", percent: 72 },
  { id: "CONTACT", label: "F4", percent: 92 },
]

export function DocumentFrame({ children }: DocumentFrameProps) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [currentSection, setCurrentSection] = useState("TITLE")
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [showRotateCTA, setShowRotateCTA] = useState(false)

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

  // Show CTA after a delay on load, or when scrolling near hero
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRotateCTA(true)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  // Hide CTA after user has seen it or scrolled past hero
  useEffect(() => {
    if (scrollPercent > 25) {
      setShowRotateCTA(false)
    } else if (scrollPercent < 20 && currentSection === "HERO") {
      setShowRotateCTA(true)
    }
  }, [scrollPercent, currentSection])

  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof document === "undefined") return
    const el = document.querySelector(`[data-section="${sectionId}"]`)
    el?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const toggleRotation = useCallback(() => {
    setIsAutoRotating(prev => !prev)
    setShowRotateCTA(false)
  }, [])

  return (
    <RotationContext.Provider value={{ isAutoRotating, toggleRotation }}>
      <div className="min-h-screen bg-background grid-paper paper-texture relative">
        
        {/* LEFT MARGIN -- Floor markers on a progress track */}
        <div className="fixed left-0 top-0 h-full w-10 md:w-12 border-r border-border bg-background/90 backdrop-blur-sm z-40">
          
          {/* Progress track */}
          <div className="absolute left-1/2 top-8 bottom-8 w-px bg-border -translate-x-1/2">
            {/* Fill based on scroll */}
            <div 
              className="absolute top-0 left-0 w-full bg-foreground/30 transition-all duration-150"
              style={{ height: `${scrollPercent}%` }}
            />
          </div>

          {/* Floor markers */}
          {SECTIONS.map((s) => {
            const active = currentSection === s.id
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="absolute left-1/2 -translate-x-1/2 group"
                style={{ top: `${s.percent}%` }}
                aria-label={`Go to ${s.id}`}
              >
                <span
                  className={`block text-[10px] font-mono tracking-wide px-1.5 py-0.5 rounded transition-all duration-200 ${
                    active 
                      ? "text-foreground bg-background border border-foreground/20 font-medium" 
                      : "text-muted-foreground/40 hover:text-foreground/60 hover:bg-background/80"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* RIGHT MARGIN -- Compass rotation control centered, CV at top */}
        <div className="fixed right-0 top-0 h-full w-8 md:w-10 border-l border-border bg-background/90 backdrop-blur-sm z-40 flex flex-col items-center justify-between py-6">
          {/* CV download at top */}
          <a
            href="/Brandon-Bartlett-CV.pdf"
            download
            className="group flex flex-col items-center gap-1.5 p-2 hover:bg-secondary/40 transition-colors rounded"
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

          {/* Compass rotation button - centered */}
          <div className="relative">
            {/* CTA tooltip */}
            <div 
              className={`absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-500 ${
                showRotateCTA 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-2 pointer-events-none"
              }`}
            >
              <div className="bg-background/95 border border-border px-2 py-1 rounded text-[8px] font-mono text-foreground/70">
                <span className="text-foreground/40">click to</span> {isAutoRotating ? "pause" : "rotate"}
              </div>
            </div>

            <button
              onClick={toggleRotation}
              className={`group p-2 rounded transition-all duration-300 ${
                isAutoRotating 
                  ? "hover:bg-secondary/40" 
                  : "bg-secondary/30 hover:bg-secondary/50"
              }`}
              title={isAutoRotating ? "Pause rotation" : "Enable rotation"}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 48 48"
                className="transition-transform duration-700 ease-out"
                style={{ 
                  transform: `rotate(${isAutoRotating ? scrollPercent * 3.6 : 0}deg)`,
                  animation: isAutoRotating ? "compass-spin 20s linear infinite" : "none",
                }}
                aria-hidden="true"
              >
                <circle 
                  cx="24" cy="24" r="20" 
                  fill="none" 
                  stroke={isAutoRotating ? "var(--foreground)" : "var(--border)"} 
                  strokeWidth="0.5" 
                  opacity={isAutoRotating ? 0.5 : 0.3}
                />
                <circle 
                  cx="24" cy="24" r="14" 
                  fill="none" 
                  stroke="var(--border)" 
                  strokeWidth="0.3" 
                />
                {/* Cardinal ticks */}
                <line x1="24" y1="4" x2="24" y2="8" stroke="var(--muted-foreground)" strokeWidth="0.5" opacity="0.4" />
                <line x1="44" y1="24" x2="40" y2="24" stroke="var(--muted-foreground)" strokeWidth="0.5" opacity="0.4" />
                <line x1="24" y1="44" x2="24" y2="40" stroke="var(--muted-foreground)" strokeWidth="0.5" opacity="0.4" />
                <line x1="4" y1="24" x2="8" y2="24" stroke="var(--muted-foreground)" strokeWidth="0.5" opacity="0.4" />
                {/* North arrow */}
                <polygon 
                  points="24,6 21,18 24,16 27,18" 
                  fill={isAutoRotating ? "var(--foreground)" : "var(--muted-foreground)"} 
                  opacity={isAutoRotating ? 0.7 : 0.3} 
                />
                <polygon 
                  points="24,42 21,30 24,32 27,30" 
                  fill="none" 
                  stroke="var(--muted-foreground)" 
                  strokeWidth="0.3" 
                  opacity="0.25" 
                />
                {/* N label */}
                <text x="24" y="3" textAnchor="middle" fontSize="4" fill="var(--foreground)" opacity="0.4" fontFamily="monospace">N</text>
                <circle 
                  cx="24" cy="24" r="1.5" 
                  fill={isAutoRotating ? "var(--foreground)" : "var(--muted-foreground)"} 
                  opacity={isAutoRotating ? 0.5 : 0.2} 
                />
              </svg>
            </button>
          </div>

          {/* Spacer */}
          <div className="w-4" />
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

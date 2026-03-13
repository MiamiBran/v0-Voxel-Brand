"use client"

import { forwardRef, useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"

// Colors aligned with hero - light and dark mode values
const phases = [
  {
    name: "DISCOVERY",
    num: "01",
    description:
      "Audit constraints, stakeholders, timing pressure, dependencies. Map the landscape before drawing the first line.",
    outputs: ["Stakeholder Interviews", "System Audits", "Constraint Mapping"],
    color: { light: "#C24B75", dark: "#FF4D8D" },  // F1 pink
  },
  {
    name: "ARCHITECTURE",
    num: "02",
    description:
      "Design the workflow, ownership structure, reporting rhythm, and execution map. Create the blueprint teams can build against.",
    outputs: ["Process Design", "Resource Planning", "Risk Mitigation"],
    color: { light: "#0099B3", dark: "#00D9FF" },  // F2 teal/cyan
  },
  {
    name: "EXECUTION",
    num: "03",
    description:
      "Deploy in the field, coordinate moving parts, remove blockers, preserve momentum. Lead from the front.",
    outputs: ["Field Operations", "Team Coordination", "Progress Tracking"],
    color: { light: "#2D9B6E", dark: "#A855F7" },  // F3 green/purple
  },
  {
    name: "ITERATION",
    num: "04",
    description:
      "Refine from live feedback and convert lessons into repeatable structure. Build sustainable processes, not one-time fixes.",
    outputs: ["Performance Analysis", "Process Optimization", "Knowledge Transfer"],
    color: { light: "#C9A227", dark: "#FFD93D" },  // F4 amber/yellow
  },
]

export const InfoBlock = forwardRef<HTMLElement>(function InfoBlock(_, ref) {
  const [showCTA, setShowCTA] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const isDark = mounted && resolvedTheme === "dark"
  const getColor = (colors: { light: string; dark: string }) => isDark ? colors.dark : colors.light

  // Scroll-triggered CTA
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          // Delay the CTA appearance for smooth feel
          setTimeout(() => setShowCTA(true), 800)
        } else {
          setShowCTA(false)
        }
      },
      { threshold: [0.3] }
    )

    const current = sectionRef.current
    if (current) observer.observe(current)
    return () => { if (current) observer.unobserve(current) }
  }, [])

  return (
    <section 
      ref={(node) => {
        // Combine refs
        sectionRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className="py-12 md:py-20 px-5 md:px-10 relative" 
      data-section="PROCESS"
    >
      {/* Floating floor container with depth */}
      <div className="border border-border bg-card/50 backdrop-blur-sm max-w-3xl">
        {/* Section header */}
        <div className="flex items-baseline justify-between px-4 md:px-5 py-3 border-b border-border">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xs font-mono font-bold tracking-wide text-foreground">SYSTEMS DESIGN</h2>
            <span className="text-[9px] font-mono text-foreground/35 tracking-[0.2em]">F2</span>
          </div>
        </div>

        {/* Methodology description */}
        <div className="px-4 md:px-5 py-4 border-b border-border">
          <p className="text-[10px] font-mono leading-relaxed text-foreground/60 max-w-xl">
            Operational environments fail when information, sequencing, and responsibility drift apart.
            I approach complex challenges like an architect approaches a building: 
            understanding the load-bearing requirements before designing the structure.
          </p>
        </div>

        {/* Process phases table */}
        <div className="hidden sm:flex items-center border-b border-border text-[8px] font-mono text-foreground/35 tracking-[0.15em]">
          <span className="w-10 px-3 py-2 border-r border-border text-center">PHASE</span>
          <span className="flex-1 px-4 py-2 border-r border-border">APPROACH</span>
          <span className="w-40 px-4 py-2">OUTPUTS</span>
        </div>

        {phases.map((phase) => (
          <article key={phase.name} className="border-b border-border last:border-b-0">
            <div className="flex items-stretch">
              {/* Phase number with color indicator */}
              <div className="w-10 shrink-0 border-r border-border flex flex-col items-center justify-center py-4 gap-2">
                <div className="w-3 h-3" style={{ backgroundColor: getColor(phase.color) }} />
                <span className="text-[8px] font-mono text-foreground/40">{phase.num}</span>
              </div>

              <div className="flex-1 px-4 py-3 sm:border-r sm:border-border">
                <h3 className="text-[11px] font-mono font-bold text-foreground tracking-wide">
                  {phase.name}
                </h3>
                <p className="text-[10px] font-mono text-foreground/55 leading-relaxed mt-2">
                  {phase.description}
                </p>
              </div>

              <div className="w-40 shrink-0 hidden sm:flex flex-col justify-center px-4 py-3 gap-1.5">
                {phase.outputs.map((output) => (
                  <span key={output} className="text-[9px] font-mono text-foreground/40 tracking-wide">{output}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Scroll-triggered CTA - materializes from bottom-right */}
      <div 
        className={`fixed bottom-8 right-12 md:right-16 z-50 transition-all duration-500 ease-out ${
          showCTA && !showOverlay
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setShowOverlay(true)}
          className="flex items-center gap-3 px-4 py-3 bg-card/95 backdrop-blur-sm border border-border hover:bg-secondary/50 transition-colors group"
        >
          <span className="text-[9px] font-mono text-foreground/70 tracking-[0.1em] group-hover:text-foreground transition-colors">
            OPEN EXECUTION FRAME
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/40 group-hover:text-foreground transition-colors">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
      </div>

      {/* Detail Frame - collage/comic book style overlay sitting ON TOP of the content */}
      {showOverlay && (
        <div 
          className="absolute top-16 right-4 md:right-8 z-20 w-72 md:w-80 animate-in fade-in zoom-in-95 slide-in-from-right-4 duration-300"
          style={{ 
            transform: 'rotate(1.5deg)',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.15), 16px 16px 24px rgba(0,0,0,0.1)'
          }}
        >
          {/* Paper texture effect */}
          <div className="bg-card border-2 border-foreground/20">
            {/* Title block header - like a comic panel caption */}
            <div className="bg-foreground text-background px-3 py-1.5 flex items-center justify-between">
              <div>
                <h3 className="text-[9px] font-mono font-bold tracking-wide">DETAIL FRAME F2.1</h3>
              </div>
              <button 
                onClick={() => setShowOverlay(false)}
                className="p-1 hover:bg-background/20 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content - dense like a reference card */}
            <div className="p-3 space-y-3">
              {/* Hand-drawn style divider */}
              <div className="h-px bg-foreground/20" style={{ transform: 'rotate(-0.5deg)' }} />
              
              {/* Context blurb */}
              <p className="text-[9px] font-mono text-foreground/70 leading-relaxed italic">
                "Converting ambiguity into executable structure."
              </p>

              {/* Sequence - stacked cards effect */}
              <div className="space-y-1.5">
                {phases.map((phase, i) => (
                  <div 
                    key={phase.name} 
                    className="flex items-center gap-2 p-1.5 border border-border/60 bg-secondary/20"
                    style={{ transform: `rotate(${(i % 2 === 0 ? -0.3 : 0.3)}deg)` }}
                  >
                    <div 
                      className="w-5 h-5 flex items-center justify-center shrink-0" 
                      style={{ backgroundColor: getColor(phase.color) }}
                    >
                      <span className="text-[7px] font-mono text-white font-bold">{phase.num}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] font-mono font-bold text-foreground block">{phase.name}</span>
                      <span className="text-[7px] font-mono text-foreground/50 block truncate">{phase.outputs[0]}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stamp-like footer */}
              <div 
                className="border-2 border-dashed border-foreground/30 p-2 text-center"
                style={{ transform: 'rotate(-1deg)' }}
              >
                <span className="text-[7px] font-mono text-foreground/50 tracking-[0.2em]">
                  EXECUTION SYSTEM REV.01
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
})

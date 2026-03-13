"use client"

import { forwardRef, useState, useEffect, useRef } from "react"

const phases = [
  {
    name: "DISCOVERY",
    num: "01",
    description:
      "Audit constraints, stakeholders, timing pressure, dependencies. Map the landscape before drawing the first line.",
    outputs: ["Stakeholder Interviews", "System Audits", "Constraint Mapping"],
    color: "#E85D4C",
  },
  {
    name: "ARCHITECTURE",
    num: "02",
    description:
      "Design the workflow, ownership structure, reporting rhythm, and execution map. Create the blueprint teams can build against.",
    outputs: ["Process Design", "Resource Planning", "Risk Mitigation"],
    color: "#4A90A4",
  },
  {
    name: "EXECUTION",
    num: "03",
    description:
      "Deploy in the field, coordinate moving parts, remove blockers, preserve momentum. Lead from the front.",
    outputs: ["Field Operations", "Team Coordination", "Progress Tracking"],
    color: "#45B07C",
  },
  {
    name: "ITERATION",
    num: "04",
    description:
      "Refine from live feedback and convert lessons into repeatable structure. Build sustainable processes, not one-time fixes.",
    outputs: ["Performance Analysis", "Process Optimization", "Knowledge Transfer"],
    color: "#F5C842",
  },
]

export const InfoBlock = forwardRef<HTMLElement>(function InfoBlock(_, ref) {
  const [showCTA, setShowCTA] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
        <div className="flex items-baseline justify-between px-5 md:px-6 py-4 border-b border-border">
          <div className="flex items-baseline gap-3">
            <h2 className="text-sm md:text-base font-mono font-bold tracking-tight text-foreground">SYSTEMS DESIGN</h2>
            <span className="text-[8px] font-mono text-foreground/35 tracking-[0.2em]">F2</span>
          </div>
        </div>

        {/* Methodology description */}
        <div className="px-5 md:px-6 py-5 border-b border-border">
          <p className="text-xs md:text-sm leading-relaxed text-foreground/70">
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
                <div className="w-3 h-3" style={{ backgroundColor: phase.color }} />
                <span className="text-[8px] font-mono text-foreground/40">{phase.num}</span>
              </div>

              <div className="flex-1 px-4 py-4 sm:border-r sm:border-border">
                <h3 className="text-xs md:text-sm font-mono font-bold text-foreground tracking-wide">
                  {phase.name}
                </h3>
                <p className="text-[10px] md:text-xs text-foreground/55 leading-relaxed mt-2">
                  {phase.description}
                </p>
              </div>

              <div className="w-40 shrink-0 hidden sm:flex flex-col justify-center px-4 py-4 gap-1">
                {phase.outputs.map((output) => (
                  <span key={output} className="text-[9px] font-mono text-foreground/40 tracking-wider">{output}</span>
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

      {/* Detail Overlay - architectural drawing detail sheet */}
      {showOverlay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowOverlay(false)}
          />
          
          {/* Detail Frame */}
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Title block header */}
            <div className="sticky top-0 bg-card border-b border-border px-5 py-3 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-mono font-bold text-foreground tracking-wide">DETAIL FRAME</h3>
                <p className="text-[8px] font-mono text-foreground/35 tracking-[0.15em] mt-0.5">
                  F2.1 — EXECUTION SYSTEM DETAIL · SCALE: NTS · LAYER: Z+1
                </p>
              </div>
              <button 
                onClick={() => setShowOverlay(false)}
                className="p-2 hover:bg-secondary/50 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-5 md:p-8 space-y-6">
              {/* Context */}
              <div>
                <span className="text-[8px] font-mono text-foreground/35 tracking-[0.2em]">CONTEXT</span>
                <p className="text-xs text-foreground/70 leading-relaxed mt-2">
                  Operational environments fail when information, sequencing, and responsibility drift apart.
                  This system converts ambiguous situations into structured, executable action.
                </p>
              </div>

              {/* Sequence */}
              <div>
                <span className="text-[8px] font-mono text-foreground/35 tracking-[0.2em]">SEQUENCE</span>
                <div className="mt-3 space-y-3">
                  {phases.map((phase) => (
                    <div key={phase.name} className="flex gap-3">
                      <div className="w-5 h-5 flex items-center justify-center shrink-0" style={{ backgroundColor: phase.color }}>
                        <span className="text-[8px] font-mono text-white font-bold">{phase.num}</span>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-mono font-bold text-foreground">{phase.name}</h4>
                        <p className="text-[9px] text-foreground/50 mt-0.5">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applied Example */}
              <div className="border-t border-border pt-5">
                <span className="text-[8px] font-mono text-foreground/35 tracking-[0.2em]">APPLIED EXAMPLE</span>
                <div className="mt-3 bg-secondary/20 border border-border/50 p-4">
                  <h4 className="text-[10px] font-mono font-bold text-foreground">Publix Remodel Execution</h4>
                  <p className="text-[9px] text-foreground/55 mt-2 leading-relaxed">
                    Sequenced turnover, trade flow, reporting cadence, and issue recovery across an active remodel environment.
                    Coordinated multiple trades simultaneously while maintaining store operations.
                  </p>
                </div>
              </div>

              {/* Outputs */}
              <div className="border-t border-border pt-5">
                <span className="text-[8px] font-mono text-foreground/35 tracking-[0.2em]">OUTPUTS</span>
                <ul className="mt-3 space-y-2">
                  {[
                    "Cleaner project visibility",
                    "Faster issue recovery", 
                    "Less dropped communication",
                    "Stronger continuity across personnel shifts"
                  ].map((output) => (
                    <li key={output} className="flex items-center gap-2 text-[9px] font-mono text-foreground/60">
                      <span className="w-1 h-1 bg-foreground/30" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border px-5 py-3 flex items-center justify-between text-[7px] font-mono text-foreground/25 tracking-[0.15em]">
              <span>REV 01</span>
              <span>BARTLETT BUILDS</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
})

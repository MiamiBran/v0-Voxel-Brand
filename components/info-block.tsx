"use client"

import { forwardRef } from "react"

const phases = [
  {
    name: "DISCOVERY",
    num: "01",
    description:
      "Deep immersion into context, constraints, and stakeholder needs. Mapping the landscape before drawing the first line. Understanding what success looks like and what obstacles stand in the way.",
    outputs: ["Stakeholder Interviews", "System Audits", "Constraint Mapping"],
    color: "#E85D4C",
  },
  {
    name: "ARCHITECTURE",
    num: "02",
    description:
      "Designing the structural framework that enables execution. Breaking complex problems into modular, manageable systems. Creating the blueprint that teams can build against.",
    outputs: ["Process Design", "Resource Planning", "Risk Mitigation"],
    color: "#4A90A4",
  },
  {
    name: "EXECUTION",
    num: "03",
    description:
      "Leading from the front with hands-on implementation. Coordinating cross-functional teams, removing blockers, and maintaining momentum through ambiguity.",
    outputs: ["Field Operations", "Team Coordination", "Progress Tracking"],
    color: "#45B07C",
  },
  {
    name: "ITERATION",
    num: "04",
    description:
      "Continuous refinement based on real-world feedback. Measuring outcomes, identifying gaps, and evolving the system. Building sustainable processes, not one-time fixes.",
    outputs: ["Performance Analysis", "Process Optimization", "Knowledge Transfer"],
    color: "#F5C842",
  },
]

export const InfoBlock = forwardRef<HTMLElement>(function InfoBlock(_, ref) {
  return (
    <section 
      ref={ref} 
      className="py-12 md:py-20 px-5 md:px-10" 
      data-section="PROCESS"
    >
      {/* Floating floor container with depth */}
      <div className="border border-border bg-card/50 backdrop-blur-sm max-w-3xl">
        {/* Section header inside the card */}
        <div className="flex items-baseline justify-between px-5 md:px-6 py-4 border-b border-border">
          <div className="flex items-baseline gap-3">
            <h2 className="text-sm md:text-base font-mono font-bold tracking-tight text-foreground">SYSTEMS DESIGN</h2>
            <span className="text-[8px] font-mono text-foreground/35 tracking-[0.2em]">F2</span>
          </div>
        </div>

        {/* Methodology description */}
        <div className="px-5 md:px-6 py-5 border-b border-border">
          <p className="text-xs md:text-sm font-mono leading-relaxed text-foreground/70">
            I approach complex operational challenges like an architect approaches a building: 
            understanding the load-bearing requirements before designing the structure. 
            Every system I build is meant to outlast my involvement.
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
                <p className="text-[10px] md:text-xs font-mono text-foreground/55 leading-relaxed mt-2">
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
    </section>
  )
})

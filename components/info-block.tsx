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

// Top-level categories with their sub-tabs
const detailFrameData = {
  systems: {
    label: "SYSTEMS",
    subtabs: {
      digital: {
        title: "DIGITAL SYSTEMS",
        subtitle: "Software & data infrastructure",
        thinking: "Digital systems require clear data flow, version control, and automated feedback loops. The goal is reducing manual intervention while maintaining visibility.",
        steps: [
          { num: "01", name: "MAP", desc: "Data sources, dependencies, user flows" },
          { num: "02", name: "ARCHITECT", desc: "System design, API contracts, state management" },
          { num: "03", name: "BUILD", desc: "Iterative development, testing, deployment" },
          { num: "04", name: "MONITOR", desc: "Analytics, error tracking, optimization" },
        ]
      },
      analog: {
        title: "ANALOG OPERATIONS", 
        subtitle: "Field work & physical coordination",
        thinking: "Physical operations demand clear handoffs, visual progress tracking, and contingency planning. People and materials don't have undo buttons.",
        steps: [
          { num: "01", name: "SCOUT", desc: "Site conditions, constraints, stakeholders" },
          { num: "02", name: "SEQUENCE", desc: "Trade flow, material staging, milestones" },
          { num: "03", name: "EXECUTE", desc: "Daily coordination, issue resolution, QC" },
          { num: "04", name: "CLOSE", desc: "Punchlist, documentation, lessons learned" },
        ]
      }
    }
  },
  workflows: {
    label: "WORKFLOWS",
    subtabs: {
      project: {
        title: "PROJECT WORKFLOW",
        subtitle: "End-to-end project delivery",
        thinking: "Projects need clear phases with defined handoffs. Each gate ensures quality before moving forward, preventing costly rework downstream.",
        steps: [
          { num: "01", name: "SCOPE", desc: "Define deliverables, timeline, budget" },
          { num: "02", name: "PLAN", desc: "Resource allocation, dependencies, milestones" },
          { num: "03", name: "DELIVER", desc: "Execute phases, track progress, manage changes" },
          { num: "04", name: "TRANSFER", desc: "Handoff, documentation, support transition" },
        ]
      },
      review: {
        title: "REVIEW CYCLE",
        subtitle: "Feedback and iteration loops",
        thinking: "Good feedback is specific, timely, and actionable. Structure the review process to maximize signal while minimizing churn.",
        steps: [
          { num: "01", name: "PRESENT", desc: "Share work in appropriate context" },
          { num: "02", name: "COLLECT", desc: "Gather structured feedback from stakeholders" },
          { num: "03", name: "SYNTHESIZE", desc: "Identify patterns, prioritize changes" },
          { num: "04", name: "ITERATE", desc: "Implement revisions, document decisions" },
        ]
      }
    }
  },
  routines: {
    label: "ROUTINES",
    subtabs: {
      daily: {
        title: "DAILY RHYTHM",
        subtitle: "Day-to-day operational cadence",
        thinking: "Consistency compounds. Small daily habits create the foundation for larger achievements. Design the day to protect deep work.",
        steps: [
          { num: "01", name: "PLAN", desc: "Review priorities, block time, set intentions" },
          { num: "02", name: "FOCUS", desc: "Deep work sessions, minimize interruptions" },
          { num: "03", name: "SYNC", desc: "Check-ins, updates, unblock others" },
          { num: "04", name: "REFLECT", desc: "Review progress, prepare tomorrow" },
        ]
      },
      weekly: {
        title: "WEEKLY REVIEW",
        subtitle: "Recurring strategic checkpoints",
        thinking: "Weekly reviews zoom out from daily tasks to ensure alignment with bigger goals. Course-correct before small drifts become large detours.",
        steps: [
          { num: "01", name: "ASSESS", desc: "Review completed work against goals" },
          { num: "02", name: "CLEAR", desc: "Process inbox, update task lists" },
          { num: "03", name: "PLAN", desc: "Set priorities for upcoming week" },
          { num: "04", name: "PREPARE", desc: "Prep materials, schedule key meetings" },
        ]
      }
    }
  }
}

type CategoryKey = keyof typeof detailFrameData

export const InfoBlock = forwardRef<HTMLElement>(function InfoBlock(_, ref) {
  const [showCTA, setShowCTA] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("systems")
  const [activeSubtab, setActiveSubtab] = useState<string>("digital")
  const sectionRef = useRef<HTMLElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Get current data
  const currentCategory = detailFrameData[activeCategory]
  const subtabKeys = Object.keys(currentCategory.subtabs)
  const currentSubtab = currentCategory.subtabs[activeSubtab as keyof typeof currentCategory.subtabs] || currentCategory.subtabs[subtabKeys[0] as keyof typeof currentCategory.subtabs]
  
  // Reset subtab when category changes
  useEffect(() => {
    const firstSubtab = Object.keys(detailFrameData[activeCategory].subtabs)[0]
    setActiveSubtab(firstSubtab)
  }, [activeCategory])
  
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

      {/* Detail Frame - collage style overlay with tabs */}
      {showOverlay && (
        <div 
          className="absolute top-12 right-4 md:right-8 z-20 w-72 md:w-80 animate-in fade-in zoom-in-95 slide-in-from-right-4 duration-300"
          style={{ 
            transform: 'rotate(1deg)',
            boxShadow: '6px 6px 0 rgba(0,0,0,0.1), 12px 12px 20px rgba(0,0,0,0.08)'
          }}
        >
          <div className="bg-card border border-border">
            {/* Header with close */}
            <div className="px-3 py-2 border-b border-border flex items-center justify-between">
              <span className="text-[9px] font-mono text-foreground/50 tracking-[0.15em]">DETAIL FRAME F2.1</span>
              <button 
                onClick={() => setShowOverlay(false)}
                className="p-1 hover:bg-secondary/50 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/40">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Top-level category tabs */}
            <div className="flex border-b border-border bg-secondary/20">
              {(Object.keys(detailFrameData) as CategoryKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex-1 px-2 py-1.5 text-[8px] font-mono tracking-wider transition-colors ${
                    activeCategory === key 
                      ? "text-foreground bg-card border-b-2 border-foreground/40" 
                      : "text-foreground/35 hover:text-foreground/55"
                  }`}
                >
                  {detailFrameData[key].label}
                </button>
              ))}
            </div>

            {/* Sub-tabs */}
            <div className="flex border-b border-border">
              {subtabKeys.map((key, i) => (
                <button
                  key={key}
                  onClick={() => setActiveSubtab(key)}
                  className={`flex-1 px-3 py-2 text-[9px] font-mono tracking-wide transition-colors ${
                    activeSubtab === key 
                      ? "text-foreground bg-secondary/30 border-b-2 border-foreground/50" 
                      : "text-foreground/40 hover:text-foreground/60"
                  } ${i > 0 ? "border-l border-border" : ""}`}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-3 space-y-3">
              {/* Title & subtitle */}
              <div>
                <h4 className="text-[10px] font-mono font-bold text-foreground tracking-wide">
                  {currentSubtab.title}
                </h4>
                <p className="text-[8px] font-mono text-foreground/40 mt-0.5">
                  {currentSubtab.subtitle}
                </p>
              </div>

              {/* Thinking section */}
              <div className="border-l-2 border-foreground/20 pl-2">
                <p className="text-[8px] font-mono text-foreground/60 leading-relaxed italic">
                  {currentSubtab.thinking}
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-1.5">
                {currentSubtab.steps.map((step, i) => (
                  <div 
                    key={step.num} 
                    className="flex items-start gap-2 p-1.5 bg-secondary/20 border border-border/50"
                    style={{ transform: `rotate(${(i % 2 === 0 ? -0.2 : 0.2)}deg)` }}
                  >
                    <div 
                      className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5" 
                      style={{ backgroundColor: getColor(phases[i].color) }}
                    >
                      <span className="text-[7px] font-mono text-white font-bold">{step.num}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-mono font-bold text-foreground">{step.name}</span>
                      <p className="text-[7px] font-mono text-foreground/50 mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-border/50 text-center">
                <span className="text-[7px] font-mono text-foreground/35 tracking-[0.15em]">
                  {currentSubtab.title} REV.01
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
})

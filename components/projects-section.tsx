"use client"

import { forwardRef, useState } from "react"

// Real case studies based on actual work
const caseStudies = [
  {
    id: "01",
    project: "SSIG",
    domain: "Construction / Infrastructure",
    role: "Founder / Operator",
    signal: "Commercial remodel systems and structural execution thinking",
    type: "FIELD",
    palette: ["#505558", "#8C9196", "#4A6FA5", "#7B68EE"],
    keywords: ["durability", "execution", "systems", "field intelligence"],
  },
  {
    id: "02",
    project: "Bartlett Builds",
    domain: "Personal Brand / Portfolio",
    role: "Creative Director / Systems Builder",
    signal: "Public-facing identity layer for work, writing, and capability",
    type: "SIGNAL",
    palette: ["#FAF9F6", "#6B6B6B", "#1A1A1A", "#7000FF"],
    keywords: ["operator", "architectural", "restrained", "precise"],
  },
  {
    id: "03",
    project: "RunFrame",
    domain: "Execution Software / Personal OS",
    role: "Product Architect",
    signal: "Daily execution surface for routines, tasks, and module-based workflows",
    type: "SYSTEM",
    palette: ["#0A0A0A", "#7000FF", "#4ECDC4", "#6B7280"],
    keywords: ["execution", "modular", "alive", "kinetic"],
  },
  {
    id: "04",
    project: "RootFrame",
    domain: "Memory Engine / Knowledge Infrastructure",
    role: "Systems Architect",
    signal: "Structured memory base for AI, documents, and reusable context",
    type: "INFRA",
    palette: ["#1C1C1C", "#8B5CF6", "#D4D0C8", "#14B8A6"],
    keywords: ["depth", "cognition", "framework", "continuity"],
  },
  {
    id: "05",
    project: "The Art of Progress",
    domain: "Media / Writing / Analysis",
    role: "Strategist / Writer / Host",
    signal: "Narrative engine for worldview, systems thinking, and public intellectual output",
    type: "SIGNAL",
    palette: ["#1A1A1A", "#FFFFF0", "#7B68EE", "#B8860B"],
    keywords: ["analysis", "persuasion", "worldview", "signal"],
  },
  {
    id: "06",
    project: "OpenCLAW Ops Engine",
    domain: "Agent Systems / Automation",
    role: "Agent Designer / Workflow Architect",
    signal: "Autonomous operational support for planning, capture, scheduling, and execution",
    type: "BUILD",
    palette: ["#0A0A0A", "#4B5563", "#22C55E", "#7000FF"],
    keywords: ["autonomous", "operational", "capture", "orchestration"],
  },
  {
    id: "07",
    project: "Publix Remodel Execution",
    domain: "Field Operations / Construction",
    role: "Superintendent / Execution Lead",
    signal: "Real-world proof of logistics, coordination, sequencing, and chaos containment",
    type: "FIELD",
    palette: ["#FFFFFF", "#4B5563", "#4ADE80", "#F59E0B"],
    keywords: ["logistics", "coordination", "sequencing", "delivery"],
  },
  {
    id: "08",
    project: "Comet Construction",
    domain: "Operations / Remodel Delivery",
    role: "Day Superintendent",
    signal: "Live execution under real constraints, teams, timelines, and turnover pressure",
    type: "FIELD",
    palette: ["#6B7280", "#1A1A1A", "#3B82F6", "#F97316"],
    keywords: ["execution", "constraints", "teams", "pressure"],
  },
]

// Operations view - what you actually do across all projects
const operations = [
  {
    id: "01",
    operation: "Field Execution",
    scope: "Active construction sites",
    output: "Coordinated delivery across trades, schedule, access, constraints",
    tools: "Field coordination, daily planning, trade sequencing",
  },
  {
    id: "02",
    operation: "Systems Design",
    scope: "Workflows, planning, team structure",
    output: "Repeatable execution frameworks that survive turnover",
    tools: "Process architecture, documentation, training systems",
  },
  {
    id: "03",
    operation: "Documentation",
    scope: "Reports, tracking, punch logic, communication",
    output: "Cleaner visibility, fewer dropped details, faster recovery",
    tools: "Reporting cadence, issue tracking, status systems",
  },
  {
    id: "04",
    operation: "Operational Architecture",
    scope: "Projects, products, internal systems",
    output: "Structures that convert ambiguity into action",
    tools: "Workflow design, role mapping, decision frameworks",
  },
  {
    id: "05",
    operation: "Automation Thinking",
    scope: "AI workflows, capture systems, scheduling tools",
    output: "Less manual friction, tighter follow-through",
    tools: "Agent systems, automation logic, integration design",
  },
  {
    id: "06",
    operation: "Creative Strategy",
    scope: "Portfolio, writing, public-facing work",
    output: "Clearer identity, stronger signal, coherent narrative",
    tools: "Brand systems, content architecture, editorial direction",
  },
]

// Type colors
const TYPE_COLORS: Record<string, string> = {
  FIELD: "#E85D4C",
  SYSTEM: "#4A90A4",
  BUILD: "#F5C842",
  SIGNAL: "#9B6BC3",
  INFRA: "#45B07C",
}

export const ProjectsSection = forwardRef<HTMLElement>(function ProjectsSection(_, ref) {
  const [mode, setMode] = useState<"case-studies" | "operations">("case-studies")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section 
      ref={ref} 
      className="py-12 md:py-20 px-5 md:px-10" 
      data-section="PROJECTS"
    >
      <div className="border border-border bg-card/50 backdrop-blur-sm">
        {/* Section header with toggle */}
        <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-border">
          <div className="flex items-baseline gap-3">
            <span className="text-[9px] font-mono text-muted-foreground/40 tracking-[0.2em]">F1</span>
          </div>
          
          {/* Toggle */}
          <div className="flex">
            <button
              onClick={() => { setMode("case-studies"); setExpandedId(null) }}
              className={`px-4 py-2 text-[9px] md:text-[10px] font-mono tracking-[0.1em] transition-colors border-r border-border ${
                mode === "case-studies" 
                  ? "text-foreground bg-secondary/40" 
                  : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              CASE STUDIES
            </button>
            <button
              onClick={() => { setMode("operations"); setExpandedId(null) }}
              className={`px-4 py-2 text-[9px] md:text-[10px] font-mono tracking-[0.1em] transition-colors ${
                mode === "operations" 
                  ? "text-foreground bg-secondary/40" 
                  : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              OPERATIONS
            </button>
          </div>
        </div>

        {/* CASE STUDIES view */}
        {mode === "case-studies" && (
          <>
            {/* Table header */}
            <div className="hidden md:flex items-center border-b border-border text-[8px] font-mono text-muted-foreground/35 tracking-[0.15em]">
              <span className="w-36 px-4 py-2 border-r border-border">PROJECT</span>
              <span className="flex-1 px-4 py-2 border-r border-border">DOMAIN</span>
              <span className="w-20 px-3 py-2 border-r border-border text-center">TYPE</span>
              <span className="w-28 px-3 py-2 text-center">PALETTE</span>
            </div>

            {caseStudies.map((study) => (
              <CaseStudyRow
                key={study.id}
                study={study}
                isExpanded={expandedId === study.id}
                onToggle={() => setExpandedId(expandedId === study.id ? null : study.id)}
              />
            ))}
          </>
        )}

        {/* OPERATIONS view */}
        {mode === "operations" && (
          <>
            {/* Table header */}
            <div className="hidden md:flex items-center border-b border-border text-[8px] font-mono text-muted-foreground/35 tracking-[0.15em]">
              <span className="w-40 px-4 py-2 border-r border-border">OPERATION</span>
              <span className="flex-1 px-4 py-2 border-r border-border">SCOPE</span>
              <span className="w-64 px-4 py-2">OUTPUT</span>
            </div>

            {operations.map((op) => (
              <OperationRow key={op.id} operation={op} />
            ))}
          </>
        )}
      </div>
    </section>
  )
})

function CaseStudyRow({ study, isExpanded, onToggle }: {
  study: (typeof caseStudies)[0]
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <article className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center group text-left hover:bg-secondary/20 transition-colors"
      >
        {/* Project name */}
        <div className="w-36 shrink-0 px-4 py-3 border-r border-border">
          <h3 className="text-[10px] md:text-xs font-mono font-bold text-foreground group-hover:text-accent transition-colors tracking-wide">
            {study.project}
          </h3>
          <p className="text-[8px] font-mono text-foreground/35 mt-0.5">{study.role}</p>
        </div>

        {/* Domain + Signal */}
        <div className="flex-1 px-4 py-3 md:border-r md:border-border min-w-0">
          <p className="text-[9px] text-foreground/60 truncate">{study.domain}</p>
          <p className="text-[8px] text-foreground/35 mt-1 truncate hidden md:block">{study.signal}</p>
        </div>

        {/* Type badge */}
        <div className="hidden md:flex w-20 shrink-0 items-center justify-center border-r border-border py-3">
          <span 
            className="text-[8px] font-mono tracking-wider px-2 py-0.5"
            style={{ color: TYPE_COLORS[study.type], borderColor: TYPE_COLORS[study.type], borderWidth: 1 }}
          >
            {study.type}
          </span>
        </div>

        {/* Palette swatches */}
        <div className="w-24 md:w-28 shrink-0 flex items-center justify-center gap-1 px-3 py-3">
          {study.palette.map((c, i) => (
            <div key={i} className="w-3 h-3 md:w-4 md:h-4 border border-border/30" style={{ backgroundColor: c }} />
          ))}
        </div>
      </button>

      {/* Expanded detail */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-border bg-card/30 px-5 md:px-8 py-6">
          <div className="max-w-2xl">
            {/* Signal / thesis */}
            <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
              {study.signal}
            </p>
            
            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mt-4">
              {study.keywords.map((kw) => (
                <span key={kw} className="text-[8px] font-mono text-foreground/40 tracking-wider border border-border/50 px-2 py-1">
                  {kw}
                </span>
              ))}
            </div>

            {/* Palette detail */}
            <div className="mt-5 pt-4 border-t border-border/50">
              <span className="text-[8px] font-mono text-foreground/35 tracking-[0.2em]">PROJECT PALETTE</span>
              <div className="flex gap-2 mt-2">
                {study.palette.map((c, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 border border-border/30" style={{ backgroundColor: c }} />
                    <span className="text-[8px] font-mono text-foreground/35">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function OperationRow({ operation }: { operation: (typeof operations)[0] }) {
  return (
    <article className="border-b border-border last:border-b-0 hover:bg-secondary/10 transition-colors">
      <div className="flex items-stretch">
        {/* Operation name */}
        <div className="w-40 shrink-0 px-4 py-4 border-r border-border">
          <h3 className="text-[10px] md:text-xs font-mono font-bold text-foreground tracking-wide">
            {operation.operation}
          </h3>
          <p className="text-[8px] font-mono text-foreground/30 mt-1 hidden md:block">{operation.tools}</p>
        </div>

        {/* Scope */}
        <div className="flex-1 px-4 py-4 md:border-r md:border-border">
          <p className="text-[9px] text-foreground/55">{operation.scope}</p>
        </div>

        {/* Output */}
        <div className="hidden md:block w-64 shrink-0 px-4 py-4">
          <p className="text-[9px] text-foreground/45">{operation.output}</p>
        </div>
      </div>
    </article>
  )
}

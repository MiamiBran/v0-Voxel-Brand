"use client"

import { forwardRef, useState } from "react"
import { operationsSectionContent, type CaseStudyScheduleItem, type OperationScheduleItem } from "@/lib/site-content"

const {
  caseStudySchedule,
  operationSchedule,
  drawingModes,
  scheduleHeaders,
  title,
  floorLabel,
  generalNotes,
  typeColors,
} = operationsSectionContent

export const OperationsSection = forwardRef<HTMLElement>(function OperationsSection(_, ref) {
  const [activeMode, setActiveMode] = useState<"case-studies" | "operations">("case-studies")
  const [expandedCaseStudyId, setExpandedCaseStudyId] = useState<string | null>(null)

  return (
    <section 
      ref={ref} 
      className="py-12 md:py-20 px-5 md:px-10" 
      data-section="OPERATIONS"
    >
      <div className="border border-border bg-card/50 backdrop-blur-sm">
        {/* Section header with toggle */}
        <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-border">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xs font-mono font-bold tracking-wide text-foreground">{title}</h2>
            <span className="text-[9px] font-mono text-foreground/35 tracking-[0.2em]">{floorLabel}</span>
          </div>
          
          {/* Toggle */}
          <div className="flex">
            <button
              onClick={() => { setActiveMode("case-studies"); setExpandedCaseStudyId(null) }}
              className={`px-3 py-3 min-h-[44px] text-[10px] font-mono tracking-wider transition-colors border-r border-border touch-manipulation ${
                activeMode === "case-studies"
                  ? "text-foreground bg-secondary/40 font-medium"
                  : "text-foreground/40 hover:text-foreground/60 active:text-foreground/80"
              }`}
            >
              {drawingModes.caseStudies}
            </button>
            <button
              onClick={() => { setActiveMode("operations"); setExpandedCaseStudyId(null) }}
              className={`px-3 py-3 min-h-[44px] text-[10px] font-mono tracking-wider transition-colors touch-manipulation ${
                activeMode === "operations"
                  ? "text-foreground bg-secondary/40 font-medium"
                  : "text-foreground/40 hover:text-foreground/60 active:text-foreground/80"
              }`}
            >
              {drawingModes.operations}
            </button>
          </div>
        </div>

        <div className="px-4 md:px-5 py-3 border-b border-border">
          <span className="text-[8px] font-mono text-foreground/35 tracking-[0.18em]">
            {generalNotes.label}
          </span>
          <p className="mt-2 text-[10px] font-mono text-foreground/62 leading-relaxed max-w-xl">
            {generalNotes.body}
          </p>
        </div>

        {/* CASE STUDIES view */}
        {activeMode === "case-studies" && (
          <>
            {/* Table header */}
            <div className="hidden md:flex items-center border-b border-border text-[8px] font-mono text-muted-foreground/35 tracking-[0.15em]">
              <span className="w-36 px-4 py-2 border-r border-border">{scheduleHeaders.caseStudies.project}</span>
              <span className="flex-1 px-4 py-2 border-r border-border">{scheduleHeaders.caseStudies.domain}</span>
              <span className="w-20 px-3 py-2 border-r border-border text-center">{scheduleHeaders.caseStudies.type}</span>
              <span className="w-28 px-3 py-2 text-center">{scheduleHeaders.caseStudies.palette}</span>
            </div>

            {caseStudySchedule.map((study) => (
              <CaseStudyScheduleRow
                key={study.id}
                study={study}
                isExpanded={expandedCaseStudyId === study.id}
                onToggle={() => setExpandedCaseStudyId(expandedCaseStudyId === study.id ? null : study.id)}
              />
            ))}
          </>
        )}

        {/* OPERATIONS view */}
        {activeMode === "operations" && (
          <>
            {/* Table header */}
            <div className="hidden md:flex items-center border-b border-border text-[8px] font-mono text-muted-foreground/35 tracking-[0.15em]">
              <span className="w-40 px-4 py-2 border-r border-border">{scheduleHeaders.operations.operation}</span>
              <span className="flex-1 px-4 py-2 border-r border-border">{scheduleHeaders.operations.scope}</span>
              <span className="w-64 px-4 py-2">{scheduleHeaders.operations.output}</span>
            </div>

            {operationSchedule.map((operation) => (
              <OperationScheduleRow key={operation.id} operation={operation} />
            ))}
          </>
        )}
      </div>
    </section>
  )
})

function CaseStudyScheduleRow({ study, isExpanded, onToggle }: {
  study: CaseStudyScheduleItem
  isExpanded: boolean
  onToggle: () => void
}) {
  const studyType = study.type as keyof typeof typeColors

  return (
    <article className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center group text-left hover:bg-secondary/20 active:bg-secondary/30 transition-colors touch-manipulation"
      >
        {/* Project name */}
        <div className="w-36 shrink-0 px-4 py-3 border-r border-border">
          <h3 className="text-[11px] font-mono font-bold text-foreground group-hover:text-accent transition-colors tracking-wide">
            {study.project}
          </h3>
          <p className="text-[9px] font-mono text-foreground/40 mt-1">{study.role}</p>
        </div>

        {/* Domain + Signal */}
        <div className="flex-1 px-4 py-3 md:border-r md:border-border min-w-0">
          <p className="text-[10px] font-mono text-foreground/55 truncate">{study.domain}</p>
          <p className="text-[9px] font-mono text-foreground/35 mt-1 truncate hidden md:block">{study.signal}</p>
        </div>

        {/* Type badge */}
        <div className="hidden md:flex w-20 shrink-0 items-center justify-center border-r border-border py-3">
          <span 
            className="text-[8px] font-mono tracking-wider px-2 py-0.5"
            style={{ color: typeColors[studyType], borderColor: typeColors[studyType], borderWidth: 1 }}
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

      {/* Expanded keynote */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-border bg-card/30 px-4 md:px-6 py-5">
          <div className="max-w-2xl">
            {/* Signal / thesis */}
            <p className="text-[11px] font-mono text-foreground/70 leading-relaxed">
              {study.signal}
            </p>
            
            {/* Keywords */}
            <div className="flex flex-wrap gap-3 mt-4">
              {study.keywords.map((kw) => (
                <span key={kw} className="text-[8px] font-mono text-foreground/40 tracking-widest uppercase">
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

function OperationScheduleRow({ operation }: { operation: OperationScheduleItem }) {
  return (
    <article className="border-b border-border last:border-b-0 hover:bg-secondary/10 transition-colors">
      <div className="flex items-stretch">
        {/* Operation name */}
        <div className="w-36 shrink-0 px-4 py-3 border-r border-border">
          <h3 className="text-[11px] font-mono font-bold text-foreground tracking-wide">
            {operation.operation}
          </h3>
          <p className="text-[9px] font-mono text-foreground/40 mt-1 hidden md:block">{operation.tools}</p>
        </div>

        {/* Scope */}
        <div className="flex-1 px-4 py-3 md:border-r md:border-border">
          <p className="text-[10px] font-mono text-foreground/55 leading-relaxed">{operation.scope}</p>
        </div>

        {/* Output */}
        <div className="hidden md:block w-56 shrink-0 px-4 py-3">
          <p className="text-[10px] font-mono text-foreground/45 leading-relaxed">{operation.output}</p>
        </div>
      </div>
    </article>
  )
}

"use client"

import { forwardRef, useState } from "react"
import { experimentsSectionContent } from "@/lib/site-content"

const { experiments, testimonials, tabs, intro } = experimentsSectionContent

type ExperimentsView = "experiments" | "feedback"

export const ExperimentsSection = forwardRef<HTMLElement>(function ExperimentsSection(_, ref) {
  const [activeView, setActiveView] = useState<ExperimentsView>("experiments")
  const [isExperimentsExpanded, setIsExperimentsExpanded] = useState(false)

  return (
    <section
      ref={ref}
      className="py-12 md:py-20 px-5 md:px-10"
      data-section="EXPERIMENTS"
    >
      <div className="border border-border bg-card/50 backdrop-blur-sm max-w-4xl overflow-hidden">
        <div className="flex border-b border-border">
          <button
            onClick={() => {
              setActiveView("experiments")
              if (activeView === "experiments") {
                setIsExperimentsExpanded(!isExperimentsExpanded)
              } else {
                setIsExperimentsExpanded(true)
              }
            }}
            className={`flex-1 flex items-center justify-between px-4 md:px-5 py-4 min-h-[52px] transition-colors text-left touch-manipulation ${
              activeView === "experiments" ? "bg-secondary/30" : "hover:bg-secondary/10 active:bg-secondary/20"
            }`}
          >
            <div className="flex items-baseline gap-3">
              <h2 className={`text-xs font-mono font-bold tracking-wide transition-colors ${
                activeView === "experiments" ? "text-foreground" : "text-foreground/40"
              }`}>
                {tabs.experiments.title}
              </h2>
              <span className="text-[9px] font-mono text-muted-foreground/35 tracking-[0.2em]">
                {tabs.experiments.floorLabel}
              </span>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`transition-all duration-300 ${
                activeView === "experiments"
                  ? isExperimentsExpanded ? "rotate-180 text-foreground/60" : "text-foreground/50"
                  : "text-foreground/20"
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <button
            onClick={() => setActiveView("feedback")}
            className={`flex-1 flex items-center justify-between px-4 md:px-5 py-4 min-h-[52px] border-l border-border transition-colors text-left touch-manipulation ${
              activeView === "feedback" ? "bg-secondary/30" : "hover:bg-secondary/10 active:bg-secondary/20"
            }`}
          >
            <div className="flex items-baseline gap-3">
              <h2 className={`text-xs font-mono font-bold tracking-wide transition-colors ${
                activeView === "feedback" ? "text-foreground" : "text-foreground/40"
              }`}>
                {tabs.feedback.title}
              </h2>
              <span className="text-[9px] font-mono text-muted-foreground/35 tracking-[0.2em]">
                {tabs.feedback.floorLabel}
              </span>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`transition-all duration-300 ${
                activeView === "feedback" ? "text-foreground/50" : "text-foreground/20"
              }`}
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>

        <div className="relative overflow-hidden">
          <div
            className={`transition-all duration-500 ease-out ${
              activeView === "experiments"
                ? "opacity-100"
                : "opacity-0 absolute inset-x-0 pointer-events-none"
            }`}
          >
            <div className="px-4 md:px-5 py-3 border-b border-border">
              <p className="text-[10px] font-mono text-foreground/50 leading-relaxed">
                {intro}
              </p>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isExperimentsExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {experiments.map((experiment) => (
                <div
                  key={experiment.id}
                  className="px-4 md:px-5 py-3 border-b border-border last:border-b-0 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-[9px] font-mono text-muted-foreground/35 tabular-nums mt-0.5">
                        {experiment.id}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-[11px] font-mono font-medium text-foreground tracking-wide">
                          {experiment.title}
                        </h3>
                        <p className="text-[10px] font-mono text-foreground/50 mt-1 leading-relaxed">
                          {experiment.desc}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[8px] font-mono tracking-wider px-1.5 py-0.5 border flex-shrink-0 ${
                        experiment.status === "ACTIVE"
                          ? "border-green-500/30 text-green-600/80"
                          : experiment.status === "TESTING"
                          ? "border-blue-500/30 text-blue-600/80"
                          : experiment.status === "PROTOTYPE"
                          ? "border-orange-500/30 text-orange-600/80"
                          : "border-border text-muted-foreground/50"
                      }`}
                    >
                      {experiment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-500 ease-out ${
              activeView === "feedback"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.id}
                  className={`px-4 md:px-5 py-5 ${
                    index < testimonials.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""
                  } group hover:bg-secondary/20 transition-colors`}
                >
                  <blockquote className="text-[11px] font-mono text-foreground/65 leading-relaxed mb-4">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center border border-border/50">
                      <span className="text-[9px] font-mono font-medium text-foreground/55">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-medium text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-[9px] font-mono text-muted-foreground/45">
                        {testimonial.role} · {testimonial.company}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

ExperimentsSection.displayName = "ExperimentsSection"

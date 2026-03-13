"use client"

import { forwardRef } from "react"

const experiments = [
  {
    id: "EXP-01",
    title: "Autonomous Drone Mapping",
    status: "ACTIVE",
    desc: "Real-time terrain analysis using custom flight patterns and ML-based anomaly detection.",
    tags: ["ROBOTICS", "ML", "GIS"],
  },
  {
    id: "EXP-02", 
    title: "Modular Site Logistics",
    status: "TESTING",
    desc: "Containerized workflow system for rapid deployment across distributed job sites.",
    tags: ["SYSTEMS", "LOGISTICS"],
  },
  {
    id: "EXP-03",
    title: "Voice-to-Documentation",
    status: "PROTOTYPE",
    desc: "Field recording to structured reports using speech recognition and templating.",
    tags: ["AI", "DOCS"],
  },
  {
    id: "EXP-04",
    title: "Predictive Maintenance Dashboard",
    status: "CONCEPT",
    desc: "Equipment health monitoring with failure prediction based on usage patterns.",
    tags: ["DATA", "IOT"],
  },
]

export const ExperimentsSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section 
      ref={ref} 
      className="py-12 md:py-20 px-5 md:px-10" 
      data-section="EXPERIMENTS"
    >
      <div className="border border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-baseline justify-between px-5 md:px-6 py-4 border-b border-border">
          <div className="flex items-baseline gap-3">
            <h2 className="text-sm md:text-base font-mono font-bold tracking-tight text-foreground">
              BUILDS
            </h2>
            <span className="text-[7px] font-mono text-muted-foreground/35 tracking-[0.2em]">F3</span>
          </div>
          <span className="text-[8px] font-mono text-muted-foreground/40 tabular-nums">
            {String(experiments.length).padStart(2, "0")} ACTIVE
          </span>
        </div>

        <div className="px-5 md:px-6 py-4 border-b border-border">
          <p className="text-xs md:text-sm font-mono text-foreground/60 leading-relaxed max-w-2xl">
            Side projects, prototypes, and ongoing investigations. Not all will ship—that's the point.
          </p>
        </div>

        {experiments.map((exp, i) => (
          <article 
            key={exp.id}
            className="group border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors"
          >
            <div className="px-5 md:px-6 py-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-[8px] font-mono text-muted-foreground/40 tabular-nums">{exp.id}</span>
                  <h3 className="text-sm font-mono font-medium text-foreground group-hover:text-foreground transition-colors">
                    {exp.title}
                  </h3>
                </div>
                <span 
                  className={`text-[7px] font-mono tracking-wider px-2 py-0.5 border ${
                    exp.status === "ACTIVE" 
                      ? "border-green-500/30 text-green-600/80 bg-green-500/5" 
                      : exp.status === "TESTING"
                      ? "border-blue-500/30 text-blue-600/80 bg-blue-500/5"
                      : exp.status === "PROTOTYPE"
                      ? "border-orange-500/30 text-orange-600/80 bg-orange-500/5"
                      : "border-border text-muted-foreground/50"
                  }`}
                >
                  {exp.status}
                </span>
              </div>
              <p className="text-[11px] font-mono text-foreground/50 leading-relaxed mb-3">
                {exp.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-[7px] font-mono text-muted-foreground/40 tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
})

ExperimentsSection.displayName = "ExperimentsSection"

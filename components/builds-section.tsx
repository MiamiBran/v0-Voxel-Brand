"use client"

import { forwardRef, useState } from "react"

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

const testimonials = [
  {
    id: "01",
    quote: "Brandon doesn't just execute—he architects solutions that scale. Brought order to chaos on a project everyone else had given up on.",
    name: "Sarah Chen",
    role: "Operations Director",
    company: "Infrastructure Corp",
    initials: "SC",
  },
  {
    id: "02",
    quote: "The systems he built are still running three years later with zero maintenance. That's rare.",
    name: "Marcus Williams",
    role: "VP of Field Operations",
    company: "Energy Services Co",
    initials: "MW",
  },
  {
    id: "03",
    quote: "He sees the whole picture—logistics, people, tech, timeline—and figures out how to make it all work together.",
    name: "James Rodriguez",
    role: "Project Manager",
    company: "Construction LLC",
    initials: "JR",
  },
]

export const BuildsSection = forwardRef<HTMLElement>((_, ref) => {
  const [buildsExpanded, setBuildsExpanded] = useState(false)

  return (
    <section 
      ref={ref} 
      className="py-12 md:py-20 px-5 md:px-10" 
      data-section="EXPERIMENTS"
    >
      <div className="border border-border bg-card/50 backdrop-blur-sm max-w-4xl">
        {/* BUILDS header - clickable to expand */}
        <button
          onClick={() => setBuildsExpanded(!buildsExpanded)}
          className="w-full flex items-center justify-between px-5 md:px-6 py-4 border-b border-border hover:bg-secondary/20 transition-colors text-left"
        >
          <div className="flex items-baseline gap-3">
            <h2 className="text-sm md:text-base font-mono font-bold tracking-tight text-foreground">
              BUILDS
            </h2>
            <span className="text-[7px] font-mono text-muted-foreground/35 tracking-[0.2em]">F3</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-mono text-muted-foreground/40 tabular-nums">
              {String(experiments.length).padStart(2, "0")} EXPERIMENTS
            </span>
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className={`text-foreground/30 transition-transform duration-300 ${buildsExpanded ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>

        {/* Builds dropdown content */}
        <div className={`overflow-hidden transition-all duration-400 ease-out ${buildsExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-5 md:px-6 py-4 border-b border-border bg-secondary/10">
            <p className="text-[10px] font-mono text-foreground/50 leading-relaxed max-w-2xl">
              Side projects, prototypes, and ongoing investigations. Not all will ship—that's the point.
            </p>
          </div>

          {experiments.map((exp) => (
            <div 
              key={exp.id}
              className="px-5 md:px-6 py-3 border-b border-border last:border-b-0 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-[7px] font-mono text-muted-foreground/30 tabular-nums">{exp.id}</span>
                  <div className="flex-1">
                    <h3 className="text-[11px] font-mono font-medium text-foreground">
                      {exp.title}
                    </h3>
                    <p className="text-[9px] font-mono text-foreground/40 mt-0.5">{exp.desc}</p>
                  </div>
                </div>
                <span 
                  className={`text-[6px] font-mono tracking-wider px-1.5 py-0.5 border flex-shrink-0 ${
                    exp.status === "ACTIVE" 
                      ? "border-green-500/30 text-green-600/80" 
                      : exp.status === "TESTING"
                      ? "border-blue-500/30 text-blue-600/80"
                      : exp.status === "PROTOTYPE"
                      ? "border-orange-500/30 text-orange-600/80"
                      : "border-border text-muted-foreground/50"
                  }`}
                >
                  {exp.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* SOCIAL PROOF section */}
        <div className="px-5 md:px-6 py-4 border-b border-border">
          <div className="flex items-baseline gap-3">
            <h3 className="text-xs font-mono font-bold tracking-tight text-foreground">SOCIAL PROOF</h3>
            <span className="text-[7px] font-mono text-muted-foreground/35 tracking-[0.2em]">F3.5</span>
          </div>
        </div>

        {/* Modern testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <article 
              key={t.id}
              className={`px-5 md:px-6 py-6 ${i < testimonials.length - 1 ? 'border-b md:border-b-0 md:border-r border-border' : ''} group hover:bg-secondary/20 transition-colors`}
            >
              {/* Avatar and name at top */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border">
                  <span className="text-[11px] font-mono font-medium text-foreground/70">{t.initials}</span>
                </div>
                <div>
                  <div className="text-[11px] font-mono font-medium text-foreground">{t.name}</div>
                  <div className="text-[9px] font-mono text-muted-foreground/50">{t.role}</div>
                </div>
              </div>
              
              {/* Quote */}
              <blockquote className="text-[11px] font-mono text-foreground/70 leading-relaxed mb-3">
                "{t.quote}"
              </blockquote>
              
              {/* Company */}
              <div className="text-[8px] font-mono text-muted-foreground/40 tracking-wider">
                {t.company}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
})

BuildsSection.displayName = "BuildsSection"

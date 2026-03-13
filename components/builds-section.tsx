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

type TabType = "builds" | "feedback"

export const BuildsSection = forwardRef<HTMLElement>((_, ref) => {
  const [activeTab, setActiveTab] = useState<TabType>("builds")
  const [buildsExpanded, setBuildsExpanded] = useState(false)

  return (
    <section 
      ref={ref} 
      className="py-12 md:py-20 px-5 md:px-10" 
      data-section="EXPERIMENTS"
    >
      <div className="border border-border bg-card/50 backdrop-blur-sm max-w-4xl overflow-hidden">
        {/* Tab headers */}
        <div className="flex border-b border-border">
          <button
            onClick={() => {
              setActiveTab("builds")
              if (activeTab === "builds") {
                setBuildsExpanded(!buildsExpanded)
              } else {
                setBuildsExpanded(true)
              }
            }}
            className={`flex-1 flex items-center justify-between px-4 md:px-5 py-3 transition-colors text-left ${
              activeTab === "builds" ? "bg-secondary/30" : "hover:bg-secondary/10"
            }`}
          >
            <div className="flex items-baseline gap-3">
              <h2 className={`text-xs font-mono font-bold tracking-wide transition-colors ${
                activeTab === "builds" ? "text-foreground" : "text-foreground/40"
              }`}>
                BUILDS
              </h2>
              <span className="text-[9px] font-mono text-muted-foreground/35 tracking-[0.2em]">F3</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-mono text-muted-foreground/40 tabular-nums">
                {String(experiments.length).padStart(2, "0")}
              </span>
              <svg 
                width="10" 
                height="10" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className={`text-foreground/30 transition-transform duration-300 ${activeTab === "builds" && buildsExpanded ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex-1 flex items-center justify-between px-4 md:px-5 py-3 border-l border-border transition-colors text-left ${
              activeTab === "feedback" ? "bg-secondary/30" : "hover:bg-secondary/10"
            }`}
          >
            <div className="flex items-baseline gap-3">
              <h2 className={`text-xs font-mono font-bold tracking-wide transition-colors ${
                activeTab === "feedback" ? "text-foreground" : "text-foreground/40"
              }`}>
                CLIENT FEEDBACK
              </h2>
              <span className="text-[9px] font-mono text-muted-foreground/35 tracking-[0.2em]">F3.5</span>
            </div>
            <span className="text-[8px] font-mono text-muted-foreground/40 tabular-nums">
              {String(testimonials.length).padStart(2, "0")}
            </span>
          </button>
        </div>

        {/* Content area with animations */}
        <div className="relative overflow-hidden">
          {/* BUILDS content - subtext always visible, list drops down */}
          <div 
            className={`transition-all duration-500 ease-out ${
              activeTab === "builds" 
                ? "opacity-100" 
                : "opacity-0 absolute inset-x-0 pointer-events-none"
            }`}
          >
            {/* Subtext - always visible when builds tab active */}
            <div className="px-4 md:px-5 py-3 border-b border-border">
              <p className="text-[10px] font-mono text-foreground/50 leading-relaxed">
                Side projects, prototypes, and ongoing investigations.
              </p>
            </div>
            
            {/* Expandable experiments list */}
            <div 
              className={`overflow-hidden transition-all duration-500 ease-out ${
                buildsExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {experiments.map((exp) => (
                <div 
                  key={exp.id}
                  className="px-4 md:px-5 py-3 border-b border-border last:border-b-0 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-[9px] font-mono text-muted-foreground/35 tabular-nums mt-0.5">{exp.id}</span>
                      <div className="flex-1">
                        <h3 className="text-[11px] font-mono font-medium text-foreground tracking-wide">
                          {exp.title}
                        </h3>
                        <p className="text-[10px] font-mono text-foreground/50 mt-1 leading-relaxed">{exp.desc}</p>
                      </div>
                    </div>
                    <span 
                      className={`text-[8px] font-mono tracking-wider px-1.5 py-0.5 border flex-shrink-0 ${
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
          </div>

          {/* CLIENT FEEDBACK content - slide in from right */}
          <div 
            className={`transition-all duration-500 ease-out ${
              activeTab === "feedback" 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <article 
                  key={t.id}
                  className={`px-4 md:px-5 py-5 ${i < testimonials.length - 1 ? 'border-b md:border-b-0 md:border-r border-border' : ''} group hover:bg-secondary/20 transition-colors`}
                >
                  {/* Quote first */}
                  <blockquote className="text-[11px] font-mono text-foreground/65 leading-relaxed mb-4">
                    "{t.quote}"
                  </blockquote>
                  
                  {/* Avatar and name at bottom */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center border border-border/50">
                      <span className="text-[9px] font-mono font-medium text-foreground/55">{t.initials}</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-medium text-foreground">{t.name}</div>
                      <div className="text-[9px] font-mono text-muted-foreground/45">{t.role} · {t.company}</div>
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

BuildsSection.displayName = "BuildsSection"

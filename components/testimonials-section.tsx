"use client"

import { forwardRef } from "react"

const testimonials = [
  {
    id: "T-01",
    quote: "Brandon doesn't just execute—he architects solutions that scale. Brought order to chaos on a project everyone else had given up on.",
    author: "Operations Director",
    company: "Infrastructure Corp",
    context: "Multi-site rollout, 18 locations",
  },
  {
    id: "T-02",
    quote: "The systems he built are still running three years later with zero maintenance. That's rare.",
    author: "VP of Field Operations",
    company: "Energy Services Co",
    context: "Equipment tracking system",
  },
  {
    id: "T-03",
    quote: "He sees the whole picture—logistics, people, tech, timeline—and figures out how to make it all work together.",
    author: "Project Manager",
    company: "Construction LLC",
    context: "Emergency deployment, 72hr turnaround",
  },
]

export const TestimonialsSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section 
      ref={ref} 
      className="py-12 md:py-20 px-5 md:px-10" 
      data-section="TESTIMONIALS"
    >
      <div className="border border-border bg-card/50 backdrop-blur-sm max-w-3xl">
        <div className="flex items-baseline justify-between px-5 md:px-6 py-4 border-b border-border">
          <div className="flex items-baseline gap-3">
            <h2 className="text-sm md:text-base font-mono font-bold tracking-tight text-foreground">
              TESTIMONIALS
            </h2>
            <span className="text-[7px] font-mono text-muted-foreground/35 tracking-[0.2em]">SEC. 04</span>
          </div>
          <span className="text-[8px] font-mono text-muted-foreground/40 tabular-nums">
            {String(testimonials.length).padStart(2, "0")} REFS
          </span>
        </div>

        {testimonials.map((t, i) => (
          <article 
            key={t.id}
            className="border-b border-border last:border-b-0"
          >
            <div className="px-5 md:px-6 py-5">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-[8px] font-mono text-muted-foreground/30 tabular-nums pt-1">{t.id}</span>
                <blockquote className="text-sm font-mono text-foreground/80 leading-relaxed italic">
                  "{t.quote}"
                </blockquote>
              </div>
              <div className="flex items-baseline justify-between pl-7">
                <div>
                  <div className="text-[10px] font-mono text-foreground/60">{t.author}</div>
                  <div className="text-[9px] font-mono text-muted-foreground/40">{t.company}</div>
                </div>
                <span className="text-[8px] font-mono text-muted-foreground/30 tracking-wider">
                  {t.context}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
})

TestimonialsSection.displayName = "TestimonialsSection"

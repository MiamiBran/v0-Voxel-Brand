"use client"

import { forwardRef } from "react"

const movements = [
  {
    name: "CONSTRUCTIVISM",
    period: "1913 -- 1940",
    description:
      "Geometric abstraction merged with dynamic composition. Diagonal lines, intersecting planes, and revolutionary form language that sought to rebuild society through spatial structure.",
    refs: ["Tatlin Tower", "Rusakov Club", "Narkomfin"],
    color: "#E85D4C",
  },
  {
    name: "METABOLISM",
    period: "1959 -- 1975",
    description:
      "Organic growth patterns applied to megastructures. Capsule architecture, plug-in cities, and infrastructure as living organism.",
    refs: ["Nakagin Capsule", "Expo '70", "Helix City"],
    color: "#F5C842",
  },
  {
    name: "DECONSTRUCTIVISM",
    period: "1982 -- PRESENT",
    description:
      "Fragmentation, distortion, and the manipulation of structure's surface. Unpredictability over harmony. The collision of forms as architectural thesis.",
    refs: ["Parc de la Villette", "Wexner Center", "Jewish Museum"],
    color: "#4A90A4",
  },
  {
    name: "BRUTALISM",
    period: "1951 -- 1975",
    description:
      "Raw concrete, modular geometry, and monolithic presence. Unapologetic materiality where the building's structure is its surface and its meaning.",
    refs: ["Habitat 67", "Barbican Estate", "Trellick Tower"],
    color: "#45B07C",
  },
]

export const InfoBlock = forwardRef<HTMLElement>(function InfoBlock(_, ref) {
  return (
    <section ref={ref} className="py-16 md:py-24 border-t border-border px-5 md:px-10" data-section="ABOUT">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-8 md:mb-12">
        <h2 className="text-lg md:text-xl font-mono font-bold tracking-tight text-foreground">
          ABOUT
        </h2>
      </div>

      {/* Description */}
      <div className="max-w-2xl mb-12 md:mb-16">
        <p className="text-sm font-mono leading-relaxed text-foreground/85">
          Isometric Strata is a systematic exploration of architectural movements through
          axonometric visualization. Each diagram deconstructs iconic structures into their
          fundamental geometric relationships -- volumes, circulation, structure, and program --
          rendered as technical drawings.
        </p>
        <p className="text-sm font-mono leading-relaxed text-foreground/85 mt-4">
          The collection spans four movements. By reducing buildings to their essential forms, we
          reveal the underlying logic that defines each architectural era.
        </p>
      </div>

      {/* Movements — each one maps directly to works in the project index */}
      <div className="border-t border-border">
        {movements.map((m) => (
          <article key={m.name} className="border-b border-border py-5 md:py-6">
            <div className="flex items-start gap-3 md:gap-4 mb-3">
              {/* Color key — this color appears in the actual artworks of this movement */}
              <div
                className="w-2 h-2 mt-1.5 shrink-0"
                style={{ backgroundColor: m.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xs md:text-sm font-mono font-bold text-foreground">
                    {m.name}
                  </h3>
                  <span className="text-[10px] font-mono text-muted-foreground/50 shrink-0">
                    {m.period}
                  </span>
                </div>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed mt-2">
                  {m.description}
                </p>
                {/* References — these are the buildings the diagrams are based on */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {m.refs.map((r) => (
                    <span
                      key={r}
                      className="text-[10px] font-mono text-muted-foreground/60"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
})

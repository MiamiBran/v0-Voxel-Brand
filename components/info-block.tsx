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
    <section ref={ref} className="py-12 md:py-20 border-t border-border px-5 md:px-10" data-section="ABOUT">
      <div className="flex items-baseline justify-between mb-8">
        <div className="flex items-baseline gap-3">
          <h2 className="text-sm md:text-base font-mono font-bold tracking-tight text-foreground">NOTES</h2>
          <span className="text-[7px] font-mono text-muted-foreground/25 tracking-[0.2em]">SEC. 03</span>
        </div>
      </div>

      {/* Project description */}
      <div className="max-w-2xl mb-12">
        <p className="text-[11px] md:text-xs font-mono leading-relaxed text-foreground/70">
          Isometric Strata is a systematic exploration of architectural movements through
          axonometric visualization. Each diagram deconstructs iconic structures into their
          fundamental geometric relationships -- volumes, circulation, structure, and program --
          rendered as technical drawings on grid substrates.
        </p>
      </div>

      {/* Movement legend table -- colors map to the palette swatches in the title block and project index */}
      <div className="border border-border max-w-3xl">
        <div className="hidden sm:flex items-center border-b border-border text-[7px] font-mono text-muted-foreground/25 tracking-[0.15em]">
          <span className="w-8 px-2 py-1.5 border-r border-border text-center">KEY</span>
          <span className="flex-1 px-3 py-1.5 border-r border-border">MOVEMENT</span>
          <span className="w-28 px-3 py-1.5">PERIOD</span>
        </div>

        {movements.map((m) => (
          <article key={m.name} className="border-b border-border last:border-b-0">
            <div className="flex items-stretch">
              {/* Color key -- same colors used in project palette swatches */}
              <div className="w-8 shrink-0 border-r border-border flex items-center justify-center">
                <div className="w-3 h-3" style={{ backgroundColor: m.color }} />
              </div>

              <div className="flex-1 px-3 py-3 md:py-4 sm:border-r sm:border-border">
                <h3 className="text-[10px] md:text-xs font-mono font-bold text-foreground tracking-wide">
                  {m.name}
                </h3>
                <p className="text-[9px] md:text-[10px] font-mono text-muted-foreground/50 leading-relaxed mt-1.5">
                  {m.description}
                </p>
                <div className="flex flex-wrap gap-x-3 mt-2">
                  {m.refs.map((r) => (
                    <span key={r} className="text-[8px] font-mono text-muted-foreground/30 tracking-wider">{r}</span>
                  ))}
                </div>
              </div>

              <div className="w-28 shrink-0 hidden sm:flex items-start px-3 py-3">
                <span className="text-[8px] font-mono text-muted-foreground/35">{m.period}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
})

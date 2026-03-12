"use client"

import { forwardRef } from "react"

const movements = [
  {
    id: "01",
    name: "CONSTRUCTIVISM",
    period: "1913 -- 1940",
    description:
      "Geometric abstraction merged with dynamic composition. Diagonal lines, intersecting planes, and revolutionary form language that sought to rebuild society through spatial structure.",
    refs: ["Tatlin Tower", "Rusakov Club", "Narkomfin"],
    color: "#E85D4C",
  },
  {
    id: "02",
    name: "METABOLISM",
    period: "1959 -- 1975",
    description:
      "Organic growth patterns applied to megastructures. Capsule architecture, plug-in cities, and infrastructure as living organism. Scale as ambition.",
    refs: ["Nakagin Capsule", "Expo '70", "Helix City"],
    color: "#F5C842",
  },
  {
    id: "03",
    name: "DECONSTRUCTIVISM",
    period: "1982 -- PRESENT",
    description:
      "Fragmentation, distortion, and the manipulation of structure's surface. Unpredictability over harmony. The collision of forms as architectural thesis.",
    refs: ["Parc de la Villette", "Wexner Center", "Jewish Museum"],
    color: "#4A90A4",
  },
  {
    id: "04",
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
    <section ref={ref} className="py-16 md:py-24 border-t border-border" data-section="S3">
      {/* ── SECTION HEADER ── */}
      <div className="flex items-start justify-between mb-8 md:mb-12">
        <div>
          <div className="annotation text-muted-foreground/50 mb-2">SECTION 03</div>
          <h2 className="text-lg md:text-xl font-mono font-bold tracking-tight text-foreground">
            METHODOLOGY
          </h2>
        </div>
        <div className="annotation text-right text-muted-foreground/50 hidden sm:block">
          <div>MOVEMENTS: 04</div>
          <div>DIAGRAMS: 08</div>
        </div>
      </div>

      {/* ── ABOUT + SPECS ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border mb-12 md:mb-16">
        {/* About */}
        <div className="bg-card p-6 md:p-8">
          <span className="annotation text-muted-foreground/50 block mb-4 pb-3 border-b border-border">
            ABOUT
          </span>
          <p className="text-sm font-mono leading-relaxed text-foreground/85">
            Isometric Strata is a systematic exploration of architectural movements through
            axonometric visualization. Each diagram deconstructs iconic structures into their
            fundamental geometric relationships -- volumes, circulation, structure, and program --
            rendered as technical drawings with precise annotations.
          </p>
          <p className="text-sm font-mono leading-relaxed text-foreground/85 mt-4">
            The collection spans four distinct movements: Constructivism, Metabolism,
            Deconstructivism, and Brutalism. By reducing buildings to their essential forms, we
            reveal the underlying logic that defines each architectural era.
          </p>
        </div>

        {/* Specifications */}
        <div className="bg-card p-6 md:p-8">
          <span className="annotation text-muted-foreground/50 block mb-4 pb-3 border-b border-border">
            SPECIFICATIONS
          </span>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs font-mono">
            <SpecField label="FORMAT" value="DIGITAL / PRINT" />
            <SpecField label="DIMENSIONS" value="A2 / 420x594MM" />
            <SpecField label="VIEW" value="AXONOMETRIC" />
            <SpecField label="SCALE" value="1:100 / 1:200" />
            <SpecField label="SUBSTRATE" value="GRID PAPER" />
            <SpecField label="DETAIL" value="TECHNICAL" />
            <SpecField label="RENDERING" value="LINE + FILL" />
            <SpecField label="ANNOTATION" value="TYPESET" />
          </div>
        </div>
      </div>

      {/* ── MOVEMENTS GRID ── */}
      <div className="mb-6">
        <span className="annotation text-muted-foreground/50 block mb-4">
          ARCHITECTURAL MOVEMENTS REFERENCED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {movements.map((m) => (
          <article key={m.id} className="bg-card p-6 md:p-8 group">
            {/* Header row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 border"
                  style={{ borderColor: m.color, backgroundColor: `${m.color}20` }}
                />
                <span className="annotation text-muted-foreground/40">{m.id}/04</span>
              </div>
              <span className="annotation text-muted-foreground/40">{m.period}</span>
            </div>

            {/* Title */}
            <h3 className="text-sm md:text-base font-mono font-bold mb-3 group-hover:text-accent transition-colors text-foreground">
              {m.name}
            </h3>

            {/* Description */}
            <p className="text-xs font-mono text-muted-foreground leading-relaxed mb-4">
              {m.description}
            </p>

            {/* References */}
            <div className="border-t border-border pt-3">
              <span className="annotation text-muted-foreground/40 block mb-2">REFERENCES</span>
              <ul className="flex flex-wrap gap-2">
                {m.refs.map((r, i) => (
                  <li
                    key={i}
                    className="text-[10px] font-mono px-2 py-1 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="annotation text-muted-foreground/40">END OF METHODOLOGY</span>
        <span className="annotation text-muted-foreground/40">4 MOVEMENTS CATALOGUED</span>
      </div>
    </section>
  )
})

function SpecField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground/50 block text-[10px] tracking-widest mb-0.5">
        {label}
      </span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}

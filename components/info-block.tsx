"use client"

import { forwardRef } from "react"

const movements = [
  {
    id: "01",
    name: "CONSTRUCTIVISM",
    period: "1913-1940",
    description: "Geometric abstraction merged with dynamic composition. Diagonal lines, intersecting planes, and revolutionary form.",
    examples: ["Tatlin Tower", "Rusakov Club", "Narkomfin Building"]
  },
  {
    id: "02", 
    name: "METABOLISM",
    period: "1959-1975",
    description: "Organic growth patterns applied to megastructures. Capsule architecture and plug-in cities.",
    examples: ["Nakagin Capsule", "Expo '70 Pavilion", "Helix City"]
  },
  {
    id: "03",
    name: "DECONSTRUCTIVISM",
    period: "1982-PRESENT",
    description: "Fragmentation, distortion, and the manipulation of structure's surface. Unpredictability over harmony.",
    examples: ["Parc de la Villette", "Wexner Center", "Jewish Museum Berlin"]
  },
  {
    id: "04",
    name: "BRUTALISM",
    period: "1951-1975",
    description: "Raw concrete, modular geometry, and monolithic presence. Unapologetic materiality.",
    examples: ["Habitat 67", "Barbican Estate", "Trellick Tower"]
  }
]

export const InfoBlock = forwardRef<HTMLElement>(function InfoBlock(_, ref) {
  return (
    <section ref={ref} className="py-16 md:py-24 border-t border-border" data-section="S3">
      {/* Section header */}
      <div className="flex items-start justify-between mb-8 md:mb-12">
        <div>
          <div className="annotation mb-2">SECTION 03</div>
          <h2 className="text-lg md:text-xl font-mono font-bold tracking-tight">METHODOLOGY</h2>
        </div>
        <div className="annotation text-right hidden sm:block">
          <div>MOVEMENTS: 4</div>
          <div>DIAGRAMS: 8</div>
        </div>
      </div>

      {/* Description block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
        <div className="border border-border p-6 md:p-8 bg-card/50">
          <span className="annotation block mb-4 pb-3 border-b border-border">ABOUT</span>
          <p className="text-sm md:text-base font-mono leading-relaxed text-foreground/90">
            Isometric Strata is a systematic exploration of architectural movements through axonometric visualization. 
            Each diagram deconstructs iconic structures into their fundamental geometric relationships—volumes, 
            circulation, structure, and program—rendered as technical drawings with precise annotations.
          </p>
          <p className="text-sm md:text-base font-mono leading-relaxed text-foreground/90 mt-4">
            The collection spans four distinct movements: Constructivism, Metabolism, Deconstructivism, and Brutalism. 
            By reducing buildings to their essential forms, we reveal the underlying logic that defines each era.
          </p>
        </div>
        
        <div className="border border-border p-6 md:p-8 bg-card/50">
          <span className="annotation block mb-4 pb-3 border-b border-border">SPECIFICATIONS</span>
          <div className="grid grid-cols-2 gap-4 md:gap-6 text-sm font-mono">
            <div>
              <span className="text-muted-foreground block mb-1">FORMAT:</span>
              <span>DIGITAL / PRINT</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">DIMENSIONS:</span>
              <span>A2 / 420×594MM</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">VIEW:</span>
              <span>AXONOMETRIC</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">SCALE:</span>
              <span>1:100 / 1:200</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">PAPER:</span>
              <span>GRID / STANDARD</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">DETAIL:</span>
              <span>TECHNICAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Movements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {movements.map((movement) => (
          <article key={movement.id} className="bg-card p-6 md:p-8 group">
            <div className="flex items-start justify-between mb-4">
              <span className="annotation">{movement.id}/04</span>
              <span className="annotation">{movement.period}</span>
            </div>
            
            <h3 className="text-base md:text-lg font-mono font-bold mb-3 group-hover:text-accent transition-colors">
              {movement.name}
            </h3>
            
            <p className="text-xs md:text-sm font-mono text-muted-foreground leading-relaxed mb-4">
              {movement.description}
            </p>
            
            <div className="border-t border-border pt-4">
              <span className="annotation block mb-2">REFERENCES</span>
              <ul className="flex flex-wrap gap-2">
                {movement.examples.map((example, i) => (
                  <li key={i} className="text-xs font-mono px-2 py-1 border border-border hover:border-foreground transition-colors">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
})

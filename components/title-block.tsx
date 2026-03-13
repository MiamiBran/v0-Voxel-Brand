"use client"

interface TitleBlockProps {
  onProjectsClick: () => void
  onInfoClick: () => void
  onContactClick: () => void
}

export function TitleBlock({ onProjectsClick, onInfoClick, onContactClick }: TitleBlockProps) {
  return (
    <header data-section="TITLE">
      {/* Floating cartouche -- standard title block on architectural drawing sheets.
           Contains project metadata, navigation index, and palette legend. */}
      <div className="px-5 md:px-10 py-8 md:py-12">
        <div className="border border-border bg-card/60 backdrop-blur-sm max-w-4xl">
          {/* Metadata row -- drawing-sheet header fields */}
          <div className="border-b border-border flex flex-wrap text-[7px] md:text-[8px] font-mono text-foreground/40 tracking-[0.15em]">
            <span className="px-3 py-1.5 border-r border-border">PROJECTION: ISOMETRIC 30{'°'}</span>
            <span className="px-3 py-1.5 border-r border-border hidden sm:block">SUBSTRATE: 5mm GRID</span>
            <span className="px-3 py-1.5 ml-auto">DWG NO. IS-2026-001</span>
          </div>

          {/* Main area -- title + navigation panel */}
          <div className="flex flex-col md:flex-row md:items-stretch">
            {/* Title */}
            <div className="flex-1 px-5 py-5 md:py-6 md:border-r md:border-border">
              <h1 className="text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground leading-none text-balance">
                BRANDON BARTLETT
              </h1>
              <p className="text-[9px] md:text-[11px] font-mono text-foreground/70 mt-2 tracking-[0.1em]">
                Execution Architect • Field Operations Leader • Systems Builder
              </p>
            </div>

            {/* Right panel */}
            <div className="border-t md:border-t-0 border-border flex flex-col min-w-[180px]">
              {/* Index header */}
              <div className="border-b border-border px-4 py-1 text-[7px] font-mono text-foreground/40 tracking-[0.2em]">
                INDEX
              </div>

              {/* Navigation -- styled as a drawing sheet index */}
              <nav className="flex md:flex-col flex-1">
                {[
                  { num: "01", label: "PROJECTS", onClick: onProjectsClick },
                  { num: "02", label: "PROCESS", onClick: onInfoClick },
                  { num: "03", label: "CONTACT", onClick: onContactClick },
                ].map((item) => (
                  <button
                    key={item.num}
                    onClick={item.onClick}
                    className="flex items-center gap-3 px-4 py-2.5 text-left group border-r md:border-r-0 md:border-b border-border last:border-r-0 last:border-b-0 hover:bg-secondary/40 transition-colors"
                  >
                    <span className="text-[7px] font-mono text-foreground/35">{item.num}</span>
                    <span className="text-[9px] md:text-[10px] font-mono tracking-[0.15em] text-foreground/70 group-hover:text-foreground transition-colors">
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Palette legend -- colors map to the four movements in the artwork */}
              <div className="border-t border-border px-4 py-2 flex items-center gap-2">
                {[
                  { color: "#E85D4C", key: "C" },
                  { color: "#F5C842", key: "M" },
                  { color: "#4A90A4", key: "D" },
                  { color: "#45B07C", key: "B" },
                ].map((s) => (
                  <div key={s.key} className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 border border-border" style={{ backgroundColor: s.color }} />
                    <span className="text-[6px] font-mono text-foreground/40 hidden md:block">{s.key}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"

interface TitleBlockProps {
  onProjectsClick: () => void
  onInfoClick: () => void
  onContactClick: () => void
}

export function TitleBlock({ onProjectsClick, onInfoClick, onContactClick }: TitleBlockProps) {
  return (
    <header className="border-b border-border" data-section="TITLE">
      {/* Floating title block — mimics the info cartouche on a real drawing sheet */}
      <div className="px-5 md:px-8 py-6 md:py-8">
        <div className="border border-border bg-card/50 backdrop-blur-sm">
          {/* Top row — drawing metadata */}
          <div className="border-b border-border flex text-[8px] md:text-[9px] font-mono text-muted-foreground/50 tracking-widest">
            <span className="px-3 py-1.5 border-r border-border">VIEW: AXONOMETRIC</span>
            <span className="px-3 py-1.5 border-r border-border hidden sm:block">PROJECTION: ISOMETRIC</span>
            <span className="px-3 py-1.5 border-r border-border">DETAIL: TECHNICAL</span>
            <span className="px-3 py-1.5 ml-auto">DWG NO. IS-2026-001</span>
          </div>

          {/* Main content — title + nav + color key */}
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {/* Title area */}
            <div className="flex-1 px-4 md:px-5 py-4 md:py-5 lg:border-r lg:border-border">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-mono font-bold tracking-tight text-foreground leading-none text-balance">
                ISOMETRIC STRATA
              </h1>
              <p className="text-[10px] md:text-xs font-mono text-muted-foreground mt-1.5 tracking-[0.2em]">
                ARCHITECTURAL DIAGRAM STUDIES
              </p>
            </div>

            {/* Right panel — navigation INDEX + palette */}
            <div className="border-t lg:border-t-0 border-border flex flex-col">
              {/* Index label */}
              <div className="border-b border-border px-4 py-1 text-[8px] font-mono text-muted-foreground/40 tracking-widest">
                INDEX
              </div>

              {/* Navigation links styled as a drawing index */}
              <nav className="flex lg:flex-col">
                <IndexLink num="01" label="PROJECTS" onClick={onProjectsClick} />
                <IndexLink num="02" label="ABOUT" onClick={onInfoClick} />
                <IndexLink num="03" label="CONTACT" onClick={onContactClick} />
              </nav>

              {/* Color palette swatches — functional legend mapping to the 4 movements */}
              <div className="border-t border-border px-4 py-2 flex items-center gap-1.5">
                <PaletteSwatch color="#E85D4C" label="CONST" />
                <PaletteSwatch color="#F5C842" label="METAB" />
                <PaletteSwatch color="#4A90A4" label="DECON" />
                <PaletteSwatch color="#45B07C" label="BRUT" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function IndexLink({ num, label, onClick }: { num: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-left group border-r lg:border-r-0 lg:border-b border-border last:border-r-0 last:border-b-0 hover:bg-secondary/50 transition-colors min-h-[40px]"
    >
      <span className="text-[8px] font-mono text-muted-foreground/30">{num}</span>
      <span className="text-[10px] font-mono tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </button>
  )
}

function PaletteSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="group relative flex items-center gap-1">
      <div className="w-3 h-3 border border-border/50" style={{ backgroundColor: color }} />
      <span className="text-[7px] font-mono text-muted-foreground/30 hidden md:block">{label}</span>
    </div>
  )
}

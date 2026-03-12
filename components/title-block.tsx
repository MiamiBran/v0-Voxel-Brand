"use client"

interface TitleBlockProps {
  onProjectsClick: () => void
  onInfoClick: () => void
  onContactClick: () => void
}

export function TitleBlock({ onProjectsClick, onInfoClick, onContactClick }: TitleBlockProps) {
  return (
    <header className="border-b border-border pb-6 pt-4 md:pt-6 md:pb-8" data-section="S0">
      {/* ── UPPER META ROW ── */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <ColorSwatch color="#E85D4C" label="R" />
          <ColorSwatch color="#4A90A4" label="B" />
          <ColorSwatch color="#F5C842" label="Y" />
          <ColorSwatch color="#45B07C" label="G" />
          <ColorSwatch color="#9B59B6" label="V" />
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span className="annotation text-muted-foreground/60">DATE: 2026.03</span>
          <span className="annotation text-muted-foreground/60">CHK: A.S.</span>
        </div>
      </div>

      {/* ── MAIN TITLE BLOCK ── */}
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-px bg-border">
        {/* Title area */}
        <div className="flex-1 bg-card p-5 md:p-7">
          <div className="flex flex-col gap-4">
            <div>
              <div className="annotation text-muted-foreground/50 mb-2">PROJECT TITLE</div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-mono font-bold tracking-tight text-foreground leading-none text-balance">
                ISOMETRIC STRATA
              </h1>
              <p className="text-xs md:text-sm font-mono text-muted-foreground mt-2 tracking-widest">
                ARCHITECTURAL DIAGRAM STUDIES
              </p>
            </div>

            <div className="h-px bg-border" />

            {/* Technical metadata grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 text-xs font-mono">
              <MetaField label="VIEW" value="AXONOMETRIC" />
              <MetaField label="DETAIL" value="TECHNICAL" />
              <MetaField label="DENSITY" value="MODERATE" />
              <MetaField label="PALETTE" value="MULTI" />
            </div>
          </div>
        </div>

        {/* DWG info block */}
        <div className="w-full lg:w-44 bg-card p-5 md:p-7 flex flex-col justify-between">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 text-xs font-mono">
            <MetaField label="DWG NO." value="IS-2026" />
            <MetaField label="SHEET" value="1 / 1" />
            <MetaField label="REV" value="01" />
            <MetaField label="SCALE" value="1:100" />
          </div>
        </div>

        {/* Navigation — INDEX panel */}
        <nav className="w-full lg:w-48 bg-card p-5 md:p-7">
          <span className="annotation block mb-3 pb-2 border-b border-border text-muted-foreground/60">
            INDEX
          </span>
          <ul className="flex flex-col gap-1">
            <NavItem label="PROJECTS" section="S2" onClick={onProjectsClick} />
            <NavItem label="METHODOLOGY" section="S3" onClick={onInfoClick} />
            <NavItem label="CONTACT" section="S4" onClick={onContactClick} />
          </ul>
        </nav>
      </div>
    </header>
  )
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground/60 block text-[10px] tracking-widest">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className="w-4 h-4 md:w-5 md:h-5 border border-foreground/10"
        style={{ backgroundColor: color }}
      />
      <span className="text-[7px] font-mono text-muted-foreground/40">{label}</span>
    </div>
  )
}

function NavItem({ label, section, onClick }: { label: string; section: string; onClick: () => void }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex items-center justify-between gap-2 w-full text-left group py-2 md:py-1.5 min-h-[44px] md:min-h-0"
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 border border-current group-hover:bg-accent group-hover:border-accent transition-colors" />
          <span className="text-xs font-mono group-hover:text-accent transition-colors">{label}</span>
        </div>
        <span className="text-[9px] font-mono text-muted-foreground/40">{section}</span>
      </button>
    </li>
  )
}

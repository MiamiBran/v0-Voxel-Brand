"use client"

interface TitleBlockProps {
  onProjectsClick: () => void
  onInfoClick: () => void
  onContactClick: () => void
}

export function TitleBlock({ onProjectsClick, onInfoClick, onContactClick }: TitleBlockProps) {
  return (
    <header className="border-b border-border py-6 md:py-10 px-5 md:px-10" data-section="TITLE">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12">
        {/* Identity */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-mono font-bold tracking-tight text-foreground leading-none text-balance">
            ISOMETRIC STRATA
          </h1>
          <p className="text-xs md:text-sm font-mono text-muted-foreground mt-2 tracking-widest">
            ARCHITECTURAL DIAGRAM STUDIES
          </p>
        </div>

        {/* Navigation — the only metadata that does something */}
        <nav className="flex items-center gap-6 md:gap-8">
          <NavLink label="PROJECTS" onClick={onProjectsClick} />
          <NavLink label="ABOUT" onClick={onInfoClick} />
          <NavLink label="CONTACT" onClick={onContactClick} />
        </nav>
      </div>
    </header>
  )
}

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-xs font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2 min-h-[44px] flex items-center relative group"
    >
      {label}
      <span className="absolute bottom-1.5 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
    </button>
  )
}

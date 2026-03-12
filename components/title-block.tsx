"use client"

interface TitleBlockProps {
  onProjectsClick: () => void
  onInfoClick: () => void
  onContactClick: () => void
}

export function TitleBlock({ onProjectsClick, onInfoClick, onContactClick }: TitleBlockProps) {
  return (
    <header className="border-b border-border py-6 md:py-8" data-section="S0">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        {/* Main title block - like a technical drawing header */}
        <div className="flex-1">
          <div className="border border-border p-4 md:p-6 bg-card/50">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-mono font-bold tracking-tight text-foreground leading-none">
                    ISOMETRIC STRATA
                  </h1>
                  <p className="text-xs md:text-sm font-mono text-muted-foreground mt-2 tracking-wide">
                    ARCHITECTURAL DIAGRAM STUDIES
                  </p>
                </div>
                <div className="flex gap-1">
                  <ColorSwatch color="#E85D4C" />
                  <ColorSwatch color="#4A90A4" />
                  <ColorSwatch color="#F5C842" />
                  <ColorSwatch color="#45B07C" />
                  <ColorSwatch color="#9B59B6" />
                </div>
              </div>
              
              <div className="h-px bg-border" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-muted-foreground block">VIEW:</span>
                  <span className="text-foreground">AXONOMETRIC</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">DETAIL:</span>
                  <span className="text-foreground">TECHNICAL</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">DENSITY:</span>
                  <span className="text-foreground">MODERATE</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">PALETTE:</span>
                  <span className="text-foreground">MULTI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - styled as legend/index */}
        <nav className="md:w-48">
          <div className="border border-border p-4 bg-card/50">
            <span className="annotation block mb-3 pb-2 border-b border-border">INDEX</span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button 
                  onClick={onProjectsClick}
                  className="flex items-center gap-2 hover:text-accent transition-colors w-full text-left group min-h-[44px] md:min-h-0"
                >
                  <span className="w-3 h-3 border border-current group-hover:bg-accent group-hover:border-accent transition-colors" />
                  <span>PROJECTS</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onInfoClick}
                  className="flex items-center gap-2 hover:text-accent transition-colors w-full text-left group min-h-[44px] md:min-h-0"
                >
                  <span className="w-3 h-3 border border-current group-hover:bg-accent group-hover:border-accent transition-colors" />
                  <span>INFO</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onContactClick}
                  className="flex items-center gap-2 hover:text-accent transition-colors w-full text-left group min-h-[44px] md:min-h-0"
                >
                  <span className="w-3 h-3 border border-current group-hover:bg-accent group-hover:border-accent transition-colors" />
                  <span>CONTACT</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

function ColorSwatch({ color }: { color: string }) {
  return (
    <div 
      className="w-4 h-4 md:w-5 md:h-5 border border-foreground/20"
      style={{ backgroundColor: color }}
    />
  )
}

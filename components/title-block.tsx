"use client"

import { useState } from "react"

interface TitleBlockProps {
  onProjectsClick: () => void
  onExperimentsClick: () => void
  onProcessClick: () => void
  onTestimonialsClick: () => void
  onContactClick: () => void
}

// Colors aligned with hero floors
const SECTION_COLORS = {
  projects: "#E85D4C",
  experiments: "#F5C842",
  process: "#4A90A4",
  testimonials: "#9B6BC3",
  contact: "#45B07C",
}

export function TitleBlock({ 
  onProjectsClick, 
  onExperimentsClick, 
  onProcessClick, 
  onTestimonialsClick, 
  onContactClick 
}: TitleBlockProps) {
  const [contactHovered, setContactHovered] = useState(false)

  const navItems = [
    { num: "01", label: "PROJECTS", color: SECTION_COLORS.projects, onClick: onProjectsClick },
    { num: "02", label: "EXPERIMENTS", color: SECTION_COLORS.experiments, onClick: onExperimentsClick },
    { num: "03", label: "PROCESS", color: SECTION_COLORS.process, onClick: onProcessClick },
    { num: "04", label: "TESTIMONIALS", color: SECTION_COLORS.testimonials, onClick: onTestimonialsClick },
  ]

  return (
    <header data-section="TITLE">
      <div className="px-5 md:px-10 py-4 md:py-6">
        <div className="border border-border bg-card/60 backdrop-blur-sm max-w-4xl">
          {/* Metadata row */}
          <div className="border-b border-border flex flex-wrap text-[7px] md:text-[8px] font-mono text-foreground/40 tracking-[0.15em]">
            <span className="px-3 py-1.5 border-r border-border">PROJECTION: ISOMETRIC 30{'°'}</span>
            <span className="px-3 py-1.5 border-r border-border hidden sm:block">SUBSTRATE: 5mm GRID</span>
            <span className="px-3 py-1.5 ml-auto">DWG NO. IS-2026-001</span>
          </div>

          {/* Main area */}
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

            {/* Nav panel */}
            <div className="border-t md:border-t-0 border-border flex flex-col min-w-[200px]">
              <div className="border-b border-border px-4 py-1 text-[7px] font-mono text-foreground/40 tracking-[0.2em]">
                INDEX
              </div>

              <nav className="flex flex-wrap md:flex-col flex-1">
                {navItems.map((item) => (
                  <button
                    key={item.num}
                    onClick={item.onClick}
                    className="flex items-center gap-2 px-4 py-2 text-left group border-r md:border-r-0 md:border-b border-border last:border-r-0 hover:bg-secondary/40 transition-colors"
                  >
                    <div 
                      className="w-2 h-2 border border-border/50 group-hover:scale-110 transition-transform flex-shrink-0" 
                      style={{ backgroundColor: item.color }} 
                    />
                    <span className="text-[7px] font-mono text-foreground/35">{item.num}</span>
                    <span className="text-[9px] md:text-[10px] font-mono tracking-[0.1em] text-foreground/70 group-hover:text-foreground transition-colors">
                      {item.label}
                    </span>
                  </button>
                ))}

                {/* CONTACT with hover dropdown */}
                <div 
                  className="relative flex-1"
                  onMouseEnter={() => setContactHovered(true)}
                  onMouseLeave={() => setContactHovered(false)}
                >
                  <button
                    onClick={onContactClick}
                    className="w-full h-full flex items-center gap-2 px-4 py-2 text-left group hover:bg-secondary/40 transition-colors"
                  >
                    <div 
                      className="w-2 h-2 border border-border/50 group-hover:scale-110 transition-transform flex-shrink-0" 
                      style={{ backgroundColor: SECTION_COLORS.contact }} 
                    />
                    <span className="text-[7px] font-mono text-foreground/35">05</span>
                    <span className="text-[9px] md:text-[10px] font-mono tracking-[0.1em] text-foreground/70 group-hover:text-foreground transition-colors">
                      CONTACT
                    </span>
                    <svg 
                      width="8" 
                      height="8" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className={`ml-auto text-foreground/30 transition-transform duration-200 ${contactHovered ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  
                  {/* Quick actions dropdown */}
                  <div 
                    className={`absolute left-0 right-0 top-full z-50 overflow-hidden transition-all duration-200 ease-out ${
                      contactHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="border border-t-0 border-border bg-card/95 backdrop-blur-sm">
                      <a
                        href="https://cal.com/brandonbartlett"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 text-[9px] font-mono text-foreground/60 hover:text-foreground hover:bg-secondary/40 transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        BOOK A CALL
                      </a>
                      <a
                        href="mailto:hello@bartlettbuilds.pro"
                        className="flex items-center gap-2 px-4 py-2.5 text-[9px] font-mono text-foreground/60 hover:text-foreground hover:bg-secondary/40 transition-colors border-t border-border"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        EMAIL
                      </a>
                      <a
                        href="/Brandon-Bartlett-CV.pdf"
                        download
                        className="flex items-center gap-2 px-4 py-2.5 text-[9px] font-mono text-foreground/60 hover:text-foreground hover:bg-secondary/40 transition-colors border-t border-border"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        DOWNLOAD RESUME
                      </a>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

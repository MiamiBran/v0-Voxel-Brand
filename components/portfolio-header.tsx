"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { portfolioHeaderContent } from "@/lib/site-content"

interface PortfolioHeaderProps {
  onOperationsClick: () => void
  onSystemsClick: () => void
  onExperimentsClick: () => void
  onContactClick: () => void
}

export function PortfolioHeader({
  onOperationsClick,
  onSystemsClick,
  onExperimentsClick,
  onContactClick 
}: PortfolioHeaderProps) {
  const [isContactActionsOpen, setIsContactActionsOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const isDark = mounted && resolvedTheme === "dark"
  const getColor = (colors: { light: string; dark: string }) => isDark ? colors.dark : colors.light
  const handlers = {
    operations: onOperationsClick,
    systems: onSystemsClick,
    experiments: onExperimentsClick,
    contact: onContactClick,
  }

  const indexEntries = portfolioHeaderContent.indexEntries.map((item) => ({
    ...item,
    color: getColor(item.color),
    onClick: handlers[item.target as keyof typeof handlers],
  }))
  const contactColor = getColor(portfolioHeaderContent.contactEntry.color)

  return (
    <header data-section="HEADER">
      <div className="px-5 md:px-10 py-4 md:py-6">
        <div className="border border-border bg-card/60 backdrop-blur-sm max-w-4xl">
          {/* Metadata row */}
          <div className="border-b border-border flex flex-wrap text-[8px] font-mono text-foreground/40 tracking-[0.15em]">
            <span className="px-3 py-1.5 border-r border-border">{portfolioHeaderContent.drawingNotes.projection}</span>
            <span className="px-3 py-1.5 border-r border-border hidden sm:block">{portfolioHeaderContent.drawingNotes.substrate}</span>
            <span className="px-3 py-1.5 ml-auto">{portfolioHeaderContent.drawingNotes.drawingNumber}</span>
          </div>

          {/* Main area */}
          <div className="flex flex-col md:flex-row md:items-stretch">
            {/* Title */}
            <div className="flex-1 px-5 py-5 md:px-6 md:py-6 md:border-r md:border-border">
              <h1 className="text-[1.7rem] md:text-[2.15rem] font-mono font-bold tracking-[-0.04em] text-foreground">
                {portfolioHeaderContent.name}
              </h1>
              <p className="text-[10px] md:text-[10.5px] font-mono text-foreground/58 mt-2 tracking-[0.14em]">
                {portfolioHeaderContent.subtitle}
              </p>
              <p className="mt-4 max-w-2xl text-[12px] md:text-[13px] font-mono leading-[1.7] text-foreground/72">
                {portfolioHeaderContent.thesis}
              </p>
            </div>

            {/* Nav panel */}
            <div className="border-t md:border-t-0 border-border flex flex-col min-w-[180px]">
              <div className="border-b border-border px-4 py-1 text-[8px] font-mono text-foreground/40 tracking-[0.2em]">
                {portfolioHeaderContent.contactEntry.indexLabel}
              </div>

              <nav className="flex flex-wrap md:flex-col flex-1">
                {indexEntries.map((item) => (
                  <button
                    key={item.num}
                    onClick={item.onClick}
                    className="flex items-center gap-2 px-4 py-3 min-h-[48px] text-left group border-r md:border-r-0 md:border-b border-border last:border-r-0 hover:bg-secondary/40 active:bg-secondary/50 transition-colors touch-manipulation"
                  >
                    <div 
                      className="w-2 h-2 border border-border/50 group-hover:scale-110 transition-transform flex-shrink-0" 
                      style={{ backgroundColor: item.color }} 
                    />
                    <span className="text-[9px] font-mono text-foreground/40">{item.num}</span>
                    <span className="text-[10px] font-mono tracking-[0.1em] text-foreground/80 group-hover:text-foreground transition-colors">
                      {item.label}
                    </span>
                  </button>
                ))}

                {/* CONTACT with hover/touch dropdown */}
                <div 
                  className="relative flex-1"
                  onMouseEnter={() => setIsContactActionsOpen(true)}
                  onMouseLeave={() => setIsContactActionsOpen(false)}
                  onTouchStart={() => setIsContactActionsOpen(true)}
                >
                  <button
                    onClick={() => {
                      // On touch, toggle dropdown. On click (mouse), navigate
                      if (isContactActionsOpen) {
                        onContactClick()
                        setIsContactActionsOpen(false)
                      } else {
                        setIsContactActionsOpen(true)
                      }
                    }}
                    className="w-full h-full flex items-center gap-2 px-4 py-3 min-h-[48px] text-left group hover:bg-secondary/40 active:bg-secondary/50 transition-colors touch-manipulation"
                  >
                    <div
                      className="w-2 h-2 border border-border/50 group-hover:scale-110 transition-transform flex-shrink-0"
                      style={{ backgroundColor: contactColor }}
                    />
                    <span className="text-[9px] font-mono text-foreground/40">{portfolioHeaderContent.contactEntry.num}</span>
                    <span className="text-[10px] font-mono tracking-[0.1em] text-foreground/80 group-hover:text-foreground transition-colors">
                      {portfolioHeaderContent.contactEntry.label}
                    </span>
                    <svg 
                      width="8" 
                      height="8" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className={`ml-auto text-foreground/30 transition-transform duration-200 ${isContactActionsOpen ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  
                  {/* Quick actions dropdown */}
                  <div 
                    className={`absolute left-0 right-0 top-full z-50 overflow-hidden transition-all duration-200 ease-out ${
                      isContactActionsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="border border-t-0 border-border bg-card/95 backdrop-blur-sm">
                      {portfolioHeaderContent.contactEntry.actionLinks.map((action, index) => (
                        <a
                          key={action.label}
                          href={action.href}
                          target={action.external ? "_blank" : undefined}
                          rel={action.external ? "noopener noreferrer" : undefined}
                          download={action.download}
                          className={`flex items-center gap-2 px-4 py-3 min-h-[44px] text-[9px] font-mono text-foreground/60 hover:text-foreground hover:bg-secondary/40 active:bg-secondary/50 transition-colors touch-manipulation ${
                            index > 0 ? "border-t border-border" : ""
                          }`}
                        >
                          <ContactActionIcon kind={action.kind as "calendar" | "email" | "download"} />
                          {action.label}
                        </a>
                      ))}
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

function ContactActionIcon({ kind }: { kind: "calendar" | "email" | "download" }) {
  if (kind === "calendar") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  }

  if (kind === "email") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  }

  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

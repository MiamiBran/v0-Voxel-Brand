"use client"

import { ReactNode, useEffect, useState } from "react"

interface DocumentFrameProps {
  children: ReactNode
}

export function DocumentFrame({ children }: DocumentFrameProps) {
  const [scrollY, setScrollY] = useState(0)
  const [currentSection, setCurrentSection] = useState("S1")

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = document.querySelectorAll('[data-section]')
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setCurrentSection(section.getAttribute('data-section') || "S1")
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background grid-paper paper-texture relative">
      {/* Left margin with floor markers */}
      <div className="fixed left-0 top-0 h-full w-8 md:w-12 border-r border-border bg-background/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
        <div className="floor-marker text-muted-foreground tracking-widest">
          {currentSection}
        </div>
      </div>

      {/* Right margin with scroll indicator */}
      <div className="fixed right-0 top-0 h-full w-8 md:w-12 border-l border-border bg-background/80 backdrop-blur-sm z-40 hidden md:flex flex-col items-center justify-between py-8">
        <div className="annotation rotate-90 origin-center whitespace-nowrap mt-16">
          SCROLL
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-24 bg-border relative">
            <div 
              className="absolute top-0 left-0 w-full bg-foreground transition-all duration-300"
              style={{ height: `${Math.min((scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%` }}
            />
          </div>
          <span className="annotation">
            {Math.round((scrollY / (document.body.scrollHeight - window.innerHeight || 1)) * 100)}%
          </span>
        </div>
        <CompassRose />
      </div>

      {/* Top border with revision info */}
      <div className="fixed top-0 left-8 md:left-12 right-8 md:right-12 h-8 md:h-10 border-b border-border bg-background/80 backdrop-blur-sm z-40 flex items-center justify-between px-4 md:px-6">
        <span className="annotation">DWG: IS-2026</span>
        <span className="annotation hidden sm:block">ISOMETRIC STRATA</span>
        <span className="annotation">REV: 01</span>
      </div>

      {/* Bottom border with scale */}
      <div className="fixed bottom-0 left-8 md:left-12 right-8 md:right-12 h-8 md:h-10 border-t border-border bg-background/80 backdrop-blur-sm z-40 flex items-center justify-between px-4 md:px-6">
        <ScaleBar />
        <span className="annotation hidden sm:block">SHEET 1/1</span>
        <span className="annotation">1:100</span>
      </div>

      {/* Main content area */}
      <main className="ml-8 md:ml-12 mr-8 md:mr-12 mt-8 md:mt-10 mb-8 md:mb-10 relative z-10">
        {children}
      </main>

      {/* Corner markers */}
      <CornerMarker position="top-left" />
      <CornerMarker position="top-right" />
      <CornerMarker position="bottom-left" />
      <CornerMarker position="bottom-right" />
    </div>
  )
}

function CompassRose() {
  return (
    <div className="w-8 h-8 relative">
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
        <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
        <line x1="20" y1="2" x2="20" y2="8" stroke="currentColor" strokeWidth="1" className="text-foreground" />
        <line x1="20" y1="32" x2="20" y2="38" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
        <line x1="2" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
        <line x1="32" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
        <text x="20" y="6" textAnchor="middle" className="fill-foreground text-[6px] font-mono">N</text>
      </svg>
    </div>
  )
}

function ScaleBar() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-2">
        <div className="w-4 md:w-6 h-full bg-foreground" />
        <div className="w-4 md:w-6 h-full bg-transparent border border-foreground" />
        <div className="w-4 md:w-6 h-full bg-foreground" />
        <div className="w-4 md:w-6 h-full bg-transparent border border-foreground" />
      </div>
      <span className="annotation">0___1:100___M</span>
    </div>
  )
}

function CornerMarker({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const positionClasses = {
    'top-left': 'top-8 md:top-10 left-8 md:left-12',
    'top-right': 'top-8 md:top-10 right-8 md:right-12',
    'bottom-left': 'bottom-8 md:bottom-10 left-8 md:left-12',
    'bottom-right': 'bottom-8 md:bottom-10 right-8 md:right-12',
  }

  const lineStyles = {
    'top-left': 'border-t border-l',
    'top-right': 'border-t border-r',
    'bottom-left': 'border-b border-l',
    'bottom-right': 'border-b border-r',
  }

  return (
    <div className={`fixed ${positionClasses[position]} w-4 h-4 ${lineStyles[position]} border-muted-foreground z-50 pointer-events-none`} />
  )
}

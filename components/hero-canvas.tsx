"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function HeroCanvas() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative py-12 md:py-20 min-h-[70vh] md:min-h-[80vh] flex items-center justify-center" data-section="S1">
      {/* Floor level markers */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-around py-20 pointer-events-none">
        <FloorMarker level="F5" />
        <FloorMarker level="F4" />
        <FloorMarker level="F3" />
        <FloorMarker level="F2" />
        <FloorMarker level="F1" />
      </div>

      {/* Construction lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" className="text-border" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" className="text-border" />
          <line x1="80" y1="0" x2="80" y2="100" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" className="text-border" />
          <line x1="0" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" className="text-border" />
          <line x1="0" y1="70" x2="100" y2="70" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" className="text-border" />
        </svg>
      </div>

      {/* Hero image container */}
      <div 
        className="relative w-full max-w-3xl mx-auto aspect-square md:aspect-[4/5]"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Outer frame */}
        <div className="absolute inset-0 border border-border" />
        
        {/* Inner frame with offset */}
        <div className="absolute inset-4 md:inset-8 border border-border" />
        
        {/* The main image */}
        <div className="absolute inset-4 md:inset-8 overflow-hidden bg-card">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ef8490ab-0a2d-4277-af17-224c34ae8d74.jpeg"
            alt="Constructivist Diagram - Monument / Tatlin - Isometric axonometric view with colorful geometric forms"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Corner annotations */}
        <div className="absolute -top-6 left-0 annotation">CONSTRUCTIVIST DIAGRAM</div>
        <div className="absolute -top-6 right-0 annotation text-right hidden sm:block">PROJECT #2125</div>
        <div className="absolute -bottom-6 left-0 annotation">MONUMENT / TATLIN</div>
        <div className="absolute -bottom-6 right-0 annotation text-right hidden sm:block">ISOMETRIC STRATA</div>

        {/* Dimension lines */}
        <div className="absolute -right-8 top-4 md:top-8 bottom-4 md:bottom-8 w-6 hidden md:flex flex-col items-center justify-between">
          <div className="w-full h-px bg-muted-foreground" />
          <span className="annotation rotate-90 whitespace-nowrap">HEIGHT: 4F</span>
          <div className="w-full h-px bg-muted-foreground" />
        </div>
      </div>

      {/* Legend panel */}
      <div className="absolute bottom-8 right-0 hidden lg:block">
        <div className="border border-border p-4 bg-card/80 backdrop-blur-sm text-xs font-mono space-y-2 max-w-48">
          <div className="border-b border-border pb-2 mb-2">
            <span className="annotation">LEGEND</span>
          </div>
          <LegendItem symbol="□" label="VOLUMES" />
          <LegendItem symbol="○" label="CIRCULATION" />
          <LegendItem symbol="△" label="STRUCTURE" />
          <LegendItem symbol="◇" label="PROGRAM" />
        </div>
      </div>
    </section>
  )
}

function FloorMarker({ level }: { level: string }) {
  return (
    <div className="flex items-center gap-2 -ml-1">
      <div className="w-3 h-px bg-muted-foreground" />
      <span className="text-[10px] font-mono text-muted-foreground">{level}</span>
    </div>
  )
}

function LegendItem({ symbol, label }: { symbol: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-4 text-center text-muted-foreground">{symbol}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  )
}

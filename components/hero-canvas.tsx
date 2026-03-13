"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function HeroCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const offsetX = (mousePos.x - 0.5) * 6
  const offsetY = (mousePos.y - 0.5) * 6

  return (
    <section
      ref={containerRef}
      className="relative py-12 md:py-20 px-5 md:px-8 min-h-[60vh] md:min-h-[85vh] flex items-center justify-center"
      data-section="HERO"
    >
      {/* Construction lines radiating from center — like the actual construction lines in the artwork */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
        </svg>
      </div>

      <div
        className="relative w-full max-w-lg mx-auto"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transition: "transform 0.5s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* Dimension line — top, shows the width concept like a real technical drawing */}
        <div className="flex items-center gap-2 mb-2 px-1" aria-hidden="true">
          <div className="flex-1 h-px bg-muted-foreground/15 relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-1.5 bg-muted-foreground/15" />
          </div>
          <span className="text-[7px] font-mono text-muted-foreground/25 tracking-wider">3M</span>
          <div className="flex-1 h-px bg-muted-foreground/15 relative">
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1.5 bg-muted-foreground/15" />
          </div>
        </div>

        {/* Image container with technical frame */}
        <div className="border border-border bg-card/30 p-3 md:p-4 relative">
          {/* Floor markers along the left edge of the hero image — matching the artwork's own floor markers */}
          <div className="absolute left-0 top-3 md:top-4 bottom-3 md:bottom-4 w-3 flex flex-col justify-between items-center pointer-events-none" aria-hidden="true">
            {["F4", "F3", "F2", "F1"].map((f) => (
              <span key={f} className="text-[6px] font-mono text-muted-foreground/20 -rotate-90">{f}</span>
            ))}
          </div>

          <div className="relative aspect-[3/4] overflow-hidden bg-[#0a1628] ml-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ef8490ab-0a2d-4277-af17-224c34ae8d74.jpeg"
              alt="Constructivist tower diagram with magenta, yellow, cyan geometric forms on dark blue ground"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Caption block — like a print annotation below a plate */}
          <div className="pt-3 flex items-end justify-between border-t border-border/50 mt-3">
            <div>
              <div className="text-xs font-mono font-bold text-foreground tracking-wide">MONUMENT / TATLIN</div>
              <div className="text-[9px] font-mono text-muted-foreground mt-0.5 tracking-wider">CONSTRUCTIVIST DIAGRAM -- 4F TOWER</div>
            </div>
            <div className="text-right">
              <div className="text-[8px] font-mono text-muted-foreground/40">PLATE</div>
              <div className="text-xs font-mono text-foreground font-bold">#01</div>
            </div>
          </div>
        </div>

        {/* Dimension line — right side, vertical height indicator */}
        <div className="absolute right-0 top-2 bottom-0 translate-x-full pl-2 flex flex-col items-center" aria-hidden="true">
          <div className="flex-1 w-px bg-muted-foreground/15 relative">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-px bg-muted-foreground/15" />
          </div>
          <span className="text-[7px] font-mono text-muted-foreground/25 -rotate-90 my-2 tracking-wider">4F</span>
          <div className="flex-1 w-px bg-muted-foreground/15 relative">
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-px bg-muted-foreground/15" />
          </div>
        </div>
      </div>
    </section>
  )
}

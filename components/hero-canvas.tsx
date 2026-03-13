"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function HeroCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const offsetX = (mousePos.x - 0.5) * 8
  const offsetY = (mousePos.y - 0.5) * 8

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 px-5 md:px-10 min-h-[70vh] md:min-h-[90vh] flex items-center justify-center"
      data-section="HERO"
    >
      {/* Construction lines -- crosshair through center, like the axis lines in the actual artwork.
           These establish the isometric grid origin point for the hero piece. */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 12" opacity="0.25" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 12" opacity="0.25" />
          {/* 30-degree isometric guidelines radiating from center */}
          <line x1="50%" y1="50%" x2="100%" y2="21%" stroke="var(--border)" strokeWidth="0.3" strokeDasharray="2 8" opacity="0.12" />
          <line x1="50%" y1="50%" x2="0%" y2="21%" stroke="var(--border)" strokeWidth="0.3" strokeDasharray="2 8" opacity="0.12" />
        </svg>
      </div>

      <div
        className="relative w-full max-w-lg mx-auto"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* Dimension line -- horizontal, shows width. Standard technical drawing notation. */}
        <div className="flex items-center gap-2 mb-2 px-1" aria-hidden="true">
          <span className="w-px h-2 bg-muted-foreground/15" />
          <div className="flex-1 h-px bg-muted-foreground/15" />
          <span className="text-[7px] font-mono text-muted-foreground/20 tracking-widest">3M</span>
          <div className="flex-1 h-px bg-muted-foreground/15" />
          <span className="w-px h-2 bg-muted-foreground/15" />
        </div>

        {/* Image frame with floor markers */}
        <div className="border border-border bg-card/20 p-3 md:p-4 relative">
          {/* Floor markers along left edge -- matching the artwork's own F1-F4 markers visible in the image */}
          <div className="absolute left-0 top-3 md:top-4 bottom-3 md:bottom-4 w-4 flex flex-col justify-between items-center pointer-events-none" aria-hidden="true">
            {["F4", "F3", "F2", "F1"].map((f) => (
              <span key={f} className="text-[6px] font-mono text-muted-foreground/15 -rotate-90 tracking-wider">{f}</span>
            ))}
          </div>

          {/* The hero artwork */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[#0a1628] ml-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ef8490ab-0a2d-4277-af17-224c34ae8d74.jpeg"
              alt="Constructivist tower diagram: magenta, yellow, cyan geometric wireframe forms stacked on dark blue ground with colored construction lines"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Caption -- plate identification, standard below any technical illustration */}
          <div className="pt-3 flex items-end justify-between border-t border-border/50 mt-3">
            <div>
              <div className="text-xs md:text-sm font-mono font-bold text-foreground tracking-wide">MONUMENT / TATLIN</div>
              <div className="text-[8px] md:text-[9px] font-mono text-muted-foreground/50 mt-0.5 tracking-[0.15em]">
                CONSTRUCTIVIST DIAGRAM -- 4F TOWER
              </div>
            </div>
            <div className="text-right">
              <div className="text-[7px] font-mono text-muted-foreground/30 tracking-widest">PLATE</div>
              <div className="text-sm font-mono text-foreground font-bold">#01</div>
            </div>
          </div>
        </div>

        {/* Dimension line -- vertical height indicator along right edge */}
        <div className="absolute right-0 top-2 bottom-0 translate-x-full pl-3 flex flex-col items-center" aria-hidden="true">
          <span className="h-px w-2 bg-muted-foreground/15" />
          <div className="flex-1 w-px bg-muted-foreground/15" />
          <span className="text-[7px] font-mono text-muted-foreground/20 -rotate-90 my-2 tracking-widest">4F</span>
          <div className="flex-1 w-px bg-muted-foreground/15" />
          <span className="h-px w-2 bg-muted-foreground/15" />
        </div>
      </div>
    </section>
  )
}

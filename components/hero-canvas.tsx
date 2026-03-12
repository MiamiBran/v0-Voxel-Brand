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

  // Subtle parallax offset based on mouse
  const offsetX = (mousePos.x - 0.5) * 8
  const offsetY = (mousePos.y - 0.5) * 8

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 px-5 md:px-10 min-h-[60vh] md:min-h-[85vh] flex items-center justify-center"
      data-section="HERO"
    >
      {/* Hero image — the actual content */}
      <div
        className="relative w-full max-w-xl mx-auto"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transition: "transform 0.5s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* Frame — a single border that acts as a mat, like a real print */}
        <div className="border border-border p-3 md:p-5 bg-card">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#0a1628]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ef8490ab-0a2d-4277-af17-224c34ae8d74.jpeg"
              alt="Constructivist tower diagram with magenta, yellow, cyan geometric forms on dark blue ground"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Caption below image — like a print label */}
          <div className="pt-3 flex items-end justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-foreground">MONUMENT / TATLIN</div>
              <div className="text-[10px] font-mono text-muted-foreground mt-0.5">Constructivist Diagram</div>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground/50 text-right">
              #2125
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

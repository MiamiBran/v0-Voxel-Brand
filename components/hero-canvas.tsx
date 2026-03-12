"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function HeroCanvas() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      setOffset({ x, y })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section
      className="relative py-12 md:py-20 min-h-[65vh] md:min-h-[80vh] flex items-center justify-center"
      data-section="S1"
    >
      {/* ── FLOOR LEVEL MARKERS (left edge) ── */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-around py-16 pointer-events-none">
        {["F5", "F4", "F3", "F2", "F1"].map((f) => (
          <FloorTick key={f} level={f} />
        ))}
      </div>

      {/* ── CONSTRUCTION LINES OVERLAY ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {/* Vertical guides */}
          <line x1="200" y1="0" x2="200" y2="1000" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6,8" className="text-border" />
          <line x1="500" y1="0" x2="500" y2="1000" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6,8" className="text-border" />
          <line x1="800" y1="0" x2="800" y2="1000" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6,8" className="text-border" />
          {/* Horizontal guides */}
          <line x1="0" y1="300" x2="1000" y2="300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6,8" className="text-border" />
          <line x1="0" y1="700" x2="1000" y2="700" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6,8" className="text-border" />
          {/* Diagonal — isometric reference 30deg */}
          <line x1="0" y1="1000" x2="577" y2="0" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4,12" className="text-muted-foreground" />
          <line x1="1000" y1="1000" x2="423" y2="0" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4,12" className="text-muted-foreground" />
        </svg>
      </div>

      {/* ── HERO IMAGE CONTAINER ── */}
      <div
        className="relative w-full max-w-2xl mx-auto aspect-[3/4] md:aspect-[4/5]"
        style={{
          transform: `translate(${offset.x * 0.4}px, ${offset.y * 0.4}px)`,
          transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* Outer technical frame */}
        <div className="absolute inset-0 border border-border" />
        {/* Inner content frame */}
        <div className="absolute inset-3 md:inset-6 border border-border" />

        {/* Image */}
        <div className="absolute inset-3 md:inset-6 overflow-hidden bg-[#0a1628]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ef8490ab-0a2d-4277-af17-224c34ae8d74.jpeg"
            alt="Constructivist Diagram - Monument / Tatlin - Isometric axonometric tower with magenta, yellow, cyan geometric forms on dark blue"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* ── TOP ANNOTATIONS ── */}
        <div className="absolute -top-7 left-0 right-0 flex items-end justify-between">
          <span className="annotation">CONSTRUCTIVIST DIAGRAM</span>
          <span className="annotation hidden sm:block">DWG #2125</span>
        </div>

        {/* ── BOTTOM ANNOTATIONS ── */}
        <div className="absolute -bottom-7 left-0 right-0 flex items-start justify-between">
          <span className="annotation">MONUMENT / TATLIN</span>
          <span className="annotation hidden sm:block">ISOMETRIC STRATA</span>
        </div>

        {/* ── RIGHT DIMENSION LINE ── */}
        <div className="absolute -right-10 top-3 md:top-6 bottom-3 md:bottom-6 w-8 hidden md:flex flex-col items-center justify-between">
          <DimTick />
          <span className="annotation [writing-mode:vertical-lr] rotate-180 whitespace-nowrap">
            HEIGHT: 4F
          </span>
          <DimTick />
        </div>

        {/* ── BOTTOM DIMENSION LINE ── */}
        <div className="absolute -bottom-14 left-3 md:left-6 right-3 md:right-6 h-6 hidden md:flex items-center justify-between">
          <DimTick horizontal />
          <span className="annotation whitespace-nowrap">WIDTH: 3M</span>
          <DimTick horizontal />
        </div>
      </div>

      {/* ── LEGEND PANEL (bottom-right) ── */}
      <div className="absolute bottom-12 right-0 hidden lg:block">
        <div className="border border-border p-4 bg-card/80 backdrop-blur-sm">
          <div className="border-b border-border pb-2 mb-3">
            <span className="annotation text-muted-foreground/60">LEGEND</span>
          </div>
          <div className="flex flex-col gap-2 text-[10px] font-mono text-muted-foreground">
            <LegendRow symbol="square" label="VOLUMES" color="#E85D4C" />
            <LegendRow symbol="circle" label="CIRCULATION" color="#4A90A4" />
            <LegendRow symbol="triangle" label="STRUCTURE" color="#F5C842" />
            <LegendRow symbol="diamond" label="PROGRAM" color="#45B07C" />
          </div>
        </div>
      </div>

      {/* ── SECTION ANNOTATION (top-left) ── */}
      <div className="absolute top-8 left-0 hidden lg:block">
        <div className="flex flex-col gap-1">
          <span className="annotation text-muted-foreground/40">SECTION 01</span>
          <span className="annotation text-muted-foreground/40">HERO VIEW</span>
          <span className="annotation text-muted-foreground/40">AXONOMETRIC</span>
        </div>
      </div>
    </section>
  )
}

function FloorTick({ level }: { level: string }) {
  return (
    <div className="flex items-center gap-1.5 -ml-0.5">
      <div className="w-2.5 h-px bg-muted-foreground/40" />
      <span className="text-[9px] font-mono text-muted-foreground/40">{level}</span>
    </div>
  )
}

function DimTick({ horizontal }: { horizontal?: boolean }) {
  return horizontal ? (
    <div className="h-2.5 w-px bg-muted-foreground/60" />
  ) : (
    <div className="w-2.5 h-px bg-muted-foreground/60" />
  )
}

function LegendRow({ symbol, label, color }: { symbol: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="10" height="10" viewBox="0 0 10 10">
        {symbol === "square" && (
          <rect x="1" y="1" width="8" height="8" fill="none" stroke={color} strokeWidth="1.2" />
        )}
        {symbol === "circle" && (
          <circle cx="5" cy="5" r="4" fill="none" stroke={color} strokeWidth="1.2" />
        )}
        {symbol === "triangle" && (
          <polygon points="5,1 9,9 1,9" fill="none" stroke={color} strokeWidth="1.2" />
        )}
        {symbol === "diamond" && (
          <polygon points="5,1 9,5 5,9 1,5" fill="none" stroke={color} strokeWidth="1.2" />
        )}
      </svg>
      <span>{label}</span>
    </div>
  )
}

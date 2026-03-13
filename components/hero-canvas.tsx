"use client"

import dynamic from "next/dynamic"

// Dynamically import the 3D scene with no SSR to avoid R3F hydration issues
const IsometricTowerScene = dynamic(
  () => import("./isometric-tower-scene").then((mod) => mod.IsometricTowerScene),
  { ssr: false }
)

export function HeroCanvas() {
  return (
    <section
      className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center"
      data-section="HERO"
    >
      {/* Dark blueprint background */}
      <div className="absolute inset-0 bg-[#0a0f1a]" />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <IsometricTowerScene />
      </div>

      {/* Caption overlay */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
        <div className="border border-white/10 bg-black/60 backdrop-blur-sm px-4 py-3">
          <div className="text-xs md:text-sm font-mono font-bold text-white tracking-wide">
            MONUMENT / TATLIN
          </div>
          <div className="text-[8px] md:text-[9px] font-mono text-white/50 mt-0.5 tracking-[0.15em]">
            CONSTRUCTIVIST DIAGRAM -- 4F TOWER
          </div>
        </div>
      </div>

      {/* Plate number */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10">
        <div className="text-right">
          <div className="text-[7px] font-mono text-white/30 tracking-widest">PLATE</div>
          <div className="text-sm font-mono text-white/70 font-bold">#01</div>
        </div>
      </div>
    </section>
  )
}

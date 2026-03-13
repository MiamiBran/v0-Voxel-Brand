"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"

// 5 floors aligned with sections
const FLOORS = [
  { id: "F1", label: "PROJECTS", color: "#E85D4C", section: "projects", desc: "Selected projects and case studies" },
  { id: "F2", label: "EXPERIMENTS", color: "#F5C842", section: "experiments", desc: "Prototypes and ongoing investigations" },
  { id: "F3", label: "PROCESS", color: "#4A90A4", section: "process", desc: "How I approach complex challenges" },
  { id: "F4", label: "TESTIMONIALS", color: "#9B6BC3", section: "testimonials", desc: "What collaborators say" },
  { id: "F5", label: "CONTACT", color: "#45B07C", section: "contact", desc: "Let's build together" },
]

interface HeroCanvasProps {
  onNavigate?: (section: string) => void
}

// Isometric projection
const ISO = {
  toScreen: (x: number, y: number, z: number, scale = 10) => ({
    sx: (x - y) * scale * 0.866,
    sy: (x + y) * scale * 0.5 - z * scale,
  }),
}

// Isometric cube wireframe
function IsoCube({ x, y, z, size = 1, color, strokeWidth = 0.8, opacity = 1, scale = 10 }: {
  x: number; y: number; z: number; size?: number; color: string; strokeWidth?: number; opacity?: number; scale?: number
}) {
  const s = size
  const v = [
    ISO.toScreen(x, y, z, scale),
    ISO.toScreen(x + s, y, z, scale),
    ISO.toScreen(x + s, y + s, z, scale),
    ISO.toScreen(x, y + s, z, scale),
    ISO.toScreen(x, y, z + s, scale),
    ISO.toScreen(x + s, y, z + s, scale),
    ISO.toScreen(x + s, y + s, z + s, scale),
    ISO.toScreen(x, y + s, z + s, scale),
  ]

  return (
    <g opacity={opacity}>
      {/* Top face */}
      <polygon
        points={`${v[4].sx},${v[4].sy} ${v[5].sx},${v[5].sy} ${v[6].sx},${v[6].sy} ${v[7].sx},${v[7].sy}`}
        fill="none" stroke={color} strokeWidth={strokeWidth}
      />
      {/* Left face */}
      <polygon
        points={`${v[0].sx},${v[0].sy} ${v[3].sx},${v[3].sy} ${v[7].sx},${v[7].sy} ${v[4].sx},${v[4].sy}`}
        fill="none" stroke={color} strokeWidth={strokeWidth * 0.6}
      />
      {/* Right face */}
      <polygon
        points={`${v[1].sx},${v[1].sy} ${v[5].sx},${v[5].sy} ${v[6].sx},${v[6].sy} ${v[2].sx},${v[2].sy}`}
        fill="none" stroke={color} strokeWidth={strokeWidth * 0.4}
      />
      {/* Vertical edge */}
      <line x1={v[0].sx} y1={v[0].sy} x2={v[4].sx} y2={v[4].sy} stroke={color} strokeWidth={strokeWidth} />
    </g>
  )
}

export function HeroCanvas({ onNavigate }: HeroCanvasProps) {
  const [hoveredFloor, setHoveredFloor] = useState<string | null>(null)
  const [activeFloorIndex, setActiveFloorIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }, [])

  const handleFloorClick = (floor: typeof FLOORS[0], index: number) => {
    setActiveFloorIndex(index)
    setTimeout(() => {
      if (onNavigate) onNavigate(floor.section)
      setActiveFloorIndex(null)
    }, 400)
  }

  const activeFloor = hoveredFloor ? FLOORS.find(f => f.id === hoveredFloor) : null
  const activeFloorData = activeFloor || (activeFloorIndex !== null ? FLOORS[activeFloorIndex] : null)

  // Tower structure - 5 distinct floors stacked vertically
  const towerStructure = useMemo(() => {
    const scale = 12
    const floorHeight = 90

    // F1: Wide base platform (PROJECTS)
    const f1: Array<{ x: number; y: number; z: number }> = []
    for (let x = -6; x <= 6; x++) {
      for (let y = -6; y <= 6; y++) {
        if (Math.abs(x) + Math.abs(y) <= 8) f1.push({ x, y, z: 0 })
      }
    }

    // F2: Smaller offset platform (EXPERIMENTS)  
    const f2: Array<{ x: number; y: number; z: number }> = []
    for (let x = -5; x <= 5; x++) {
      for (let y = -5; y <= 5; y++) {
        if (Math.abs(x) + Math.abs(y) <= 6) f2.push({ x, y, z: 0 })
      }
    }
    // Corner pillars
    for (let z = 0; z < 3; z++) {
      f2.push({ x: -4, y: -4, z })
      f2.push({ x: 4, y: -4, z })
      f2.push({ x: -4, y: 4, z })
      f2.push({ x: 4, y: 4, z })
    }

    // F3: Central core (PROCESS)
    const f3: Array<{ x: number; y: number; z: number }> = []
    for (let x = -4; x <= 4; x++) {
      for (let y = -4; y <= 4; y++) {
        if (Math.abs(x) + Math.abs(y) <= 5) f3.push({ x, y, z: 0 })
      }
    }
    // Central tower
    for (let z = 0; z < 4; z++) {
      f3.push({ x: 0, y: 0, z })
      f3.push({ x: 1, y: 0, z })
      f3.push({ x: 0, y: 1, z })
      f3.push({ x: -1, y: 0, z })
      f3.push({ x: 0, y: -1, z })
    }

    // F4: Ring structure (TESTIMONIALS)
    const f4: Array<{ x: number; y: number; z: number }> = []
    for (let x = -4; x <= 4; x++) {
      for (let y = -4; y <= 4; y++) {
        const dist = Math.sqrt(x * x + y * y)
        if (dist <= 4 && dist >= 2) f4.push({ x, y, z: 0 })
      }
    }

    // F5: Beacon top (CONTACT)
    const f5: Array<{ x: number; y: number; z: number }> = []
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        if (Math.abs(x) + Math.abs(y) <= 3) f5.push({ x, y, z: 0 })
      }
    }
    // Spire
    for (let z = 0; z < 5; z++) {
      f5.push({ x: 0, y: 0, z })
    }

    return { f1, f2, f3, f4, f5, scale, floorHeight }
  }, [])

  // Floor Y positions (bottom to top)
  const floorPositions = [160, 80, 0, -80, -160]

  return (
    <section
      ref={containerRef}
      data-section="HERO"
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Floor markers - left side, aligned with tower floors */}
      <nav className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-6">
        {[...FLOORS].reverse().map((floor, i) => {
          const actualIndex = FLOORS.length - 1 - i
          const isHovered = hoveredFloor === floor.id
          const isActive = activeFloorIndex === actualIndex
          return (
            <button
              key={floor.id}
              onClick={() => handleFloorClick(floor, actualIndex)}
              onMouseEnter={() => setHoveredFloor(floor.id)}
              onMouseLeave={() => setHoveredFloor(null)}
              className="group flex items-center gap-2 text-left cursor-pointer"
              style={{
                transform: mounted ? "translateX(0)" : "translateX(-20px)",
                opacity: mounted ? 1 : 0,
                transition: `all 0.4s ease ${i * 80 + 400}ms`,
              }}
            >
              <span
                className="text-[10px] font-mono tracking-[0.2em] transition-all duration-300 w-5"
                style={{
                  color: isHovered || isActive ? floor.color : "var(--foreground)",
                  opacity: isHovered || isActive ? 1 : 0.35,
                  textShadow: isHovered || isActive ? `0 0 15px ${floor.color}` : "none",
                }}
              >
                {floor.id}
              </span>
              <span
                className="h-px transition-all duration-400 ease-out"
                style={{
                  width: isActive ? 80 : isHovered ? 50 : 20,
                  backgroundColor: isHovered || isActive ? floor.color : "var(--border)",
                  boxShadow: isHovered || isActive ? `0 0 10px ${floor.color}` : "none",
                }}
              />
            </button>
          )
        })}
      </nav>

      {/* Main tower */}
      <div
        className="relative w-full max-w-3xl mx-auto px-4"
        style={{
          transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 5}px)`,
          transition: "transform 0.5s ease-out",
        }}
      >
        <svg
          viewBox="-350 -280 700 560"
          className="w-full h-auto"
          style={{
            overflow: "visible",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
            transition: "all 0.6s ease-out 0.2s",
          }}
        >
          <defs>
            {FLOORS.map((floor) => (
              <filter key={`glow-${floor.id}`} id={`glow-${floor.id}`} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor={floor.color} floodOpacity="0.5" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* Ground reference grid */}
          <g opacity="0.05">
            {Array.from({ length: 15 }).map((_, i) => {
              const pos = -70 + i * 10
              return (
                <g key={i}>
                  <line
                    x1={pos * 0.866} y1={pos * 0.5 + 200}
                    x2={pos * 0.866 + 140 * 0.866} y2={pos * 0.5 + 200 + 140 * 0.5}
                    stroke="var(--foreground)" strokeWidth="0.3"
                  />
                  <line
                    x1={-pos * 0.866} y1={pos * 0.5 + 200}
                    x2={-pos * 0.866 + 140 * 0.866} y2={pos * 0.5 + 200 + 140 * 0.5}
                    stroke="var(--foreground)" strokeWidth="0.3"
                  />
                </g>
              )
            })}
          </g>

          {/* Construction lines */}
          <g style={{ opacity: hoveredFloor ? 0.5 : 0.15, transition: "opacity 0.3s" }}>
            <line x1="0" y1="-200" x2="30" y2="-300" stroke="#00d4ff" strokeWidth="0.6" />
            <line x1="0" y1="-200" x2="100" y2="-280" stroke="#ff0066" strokeWidth="0.6" />
            <line x1="0" y1="-200" x2="-80" y2="-260" stroke="#F5C842" strokeWidth="0.6" />
            <line x1="0" y1="180" x2="150" y2="250" stroke="#00ff88" strokeWidth="0.6" />
            <line x1="0" y1="180" x2="-120" y2="240" stroke="#9B6BC3" strokeWidth="0.6" />
          </g>

          {/* F1: Base - PROJECTS */}
          <g
            onMouseEnter={() => setHoveredFloor("F1")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[0], 0)}
            className="cursor-pointer"
            filter={hoveredFloor === "F1" || activeFloorIndex === 0 ? "url(#glow-F1)" : undefined}
          >
            <rect x="-140" y={floorPositions[0] - 20} width="280" height="80" fill="transparent" />
            <g transform={`translate(0, ${floorPositions[0]})`}>
              {towerStructure.f1.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={FLOORS[0].color}
                  strokeWidth={hoveredFloor === "F1" || activeFloorIndex === 0 ? 1.4 : 0.8}
                  opacity={hoveredFloor === "F1" || activeFloorIndex === 0 ? 1 : 0.7}
                  scale={towerStructure.scale}
                />
              ))}
            </g>
          </g>

          {/* F2: EXPERIMENTS */}
          <g
            onMouseEnter={() => setHoveredFloor("F2")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[1], 1)}
            className="cursor-pointer"
            filter={hoveredFloor === "F2" || activeFloorIndex === 1 ? "url(#glow-F2)" : undefined}
          >
            <rect x="-120" y={floorPositions[1] - 20} width="240" height="80" fill="transparent" />
            <g transform={`translate(0, ${floorPositions[1]})`}>
              {towerStructure.f2.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={FLOORS[1].color}
                  strokeWidth={hoveredFloor === "F2" || activeFloorIndex === 1 ? 1.4 : 0.8}
                  opacity={hoveredFloor === "F2" || activeFloorIndex === 1 ? 1 : 0.7}
                  scale={towerStructure.scale}
                />
              ))}
            </g>
          </g>

          {/* F3: PROCESS */}
          <g
            onMouseEnter={() => setHoveredFloor("F3")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[2], 2)}
            className="cursor-pointer"
            filter={hoveredFloor === "F3" || activeFloorIndex === 2 ? "url(#glow-F3)" : undefined}
          >
            <rect x="-100" y={floorPositions[2] - 20} width="200" height="80" fill="transparent" />
            <g transform={`translate(0, ${floorPositions[2]})`}>
              {towerStructure.f3.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={FLOORS[2].color}
                  strokeWidth={hoveredFloor === "F3" || activeFloorIndex === 2 ? 1.4 : 0.8}
                  opacity={hoveredFloor === "F3" || activeFloorIndex === 2 ? 1 : 0.7}
                  scale={towerStructure.scale}
                />
              ))}
            </g>
          </g>

          {/* F4: TESTIMONIALS */}
          <g
            onMouseEnter={() => setHoveredFloor("F4")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[3], 3)}
            className="cursor-pointer"
            filter={hoveredFloor === "F4" || activeFloorIndex === 3 ? "url(#glow-F4)" : undefined}
          >
            <rect x="-90" y={floorPositions[3] - 20} width="180" height="80" fill="transparent" />
            <g transform={`translate(0, ${floorPositions[3]})`}>
              {towerStructure.f4.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={FLOORS[3].color}
                  strokeWidth={hoveredFloor === "F4" || activeFloorIndex === 3 ? 1.4 : 0.8}
                  opacity={hoveredFloor === "F4" || activeFloorIndex === 3 ? 1 : 0.7}
                  scale={towerStructure.scale}
                />
              ))}
            </g>
          </g>

          {/* F5: CONTACT */}
          <g
            onMouseEnter={() => setHoveredFloor("F5")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[4], 4)}
            className="cursor-pointer"
            filter={hoveredFloor === "F5" || activeFloorIndex === 4 ? "url(#glow-F5)" : undefined}
          >
            <rect x="-70" y={floorPositions[4] - 30} width="140" height="80" fill="transparent" />
            <g transform={`translate(0, ${floorPositions[4]})`}>
              {towerStructure.f5.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={FLOORS[4].color}
                  strokeWidth={hoveredFloor === "F5" || activeFloorIndex === 4 ? 1.4 : 0.8}
                  opacity={hoveredFloor === "F5" || activeFloorIndex === 4 ? 1 : 0.7}
                  scale={towerStructure.scale}
                />
              ))}
            </g>
          </g>

          {/* Central axis line */}
          <line x1="0" y1="180" x2="0" y2="-200" stroke="var(--foreground)" strokeWidth="0.5" opacity="0.15" />

          {/* Hover info panel */}
          {activeFloorData && (
            <foreignObject
              x="140"
              y={floorPositions[FLOORS.findIndex(f => f.id === activeFloorData.id)] - 35}
              width="180"
              height="90"
              style={{
                opacity: hoveredFloor || activeFloorIndex !== null ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}
            >
              <div 
                className="bg-background/90 backdrop-blur-sm border-l-2 pl-3 pr-4 py-2"
                style={{ borderColor: activeFloorData.color }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-2 h-2" 
                    style={{ 
                      backgroundColor: activeFloorData.color,
                      boxShadow: `0 0 8px ${activeFloorData.color}`,
                    }} 
                  />
                  <span 
                    className="text-[9px] font-mono tracking-[0.2em]" 
                    style={{ color: activeFloorData.color }}
                  >
                    {activeFloorData.id}
                  </span>
                </div>
                <div 
                  className="text-sm font-mono font-bold tracking-wide"
                  style={{ color: activeFloorData.color }}
                >
                  {activeFloorData.label}
                </div>
                <div className="text-[9px] font-mono text-foreground/50 mt-1 leading-relaxed">
                  {activeFloorData.desc}
                </div>
              </div>
            </foreignObject>
          )}
        </svg>
      </div>

      {/* Bottom legend */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-4 md:gap-6"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.5s ease 0.6s",
        }}
      >
        {FLOORS.map((floor, i) => (
          <button
            key={floor.id}
            onClick={() => handleFloorClick(floor, i)}
            onMouseEnter={() => setHoveredFloor(floor.id)}
            onMouseLeave={() => setHoveredFloor(null)}
            className="flex items-center gap-1.5 group cursor-pointer"
          >
            <div
              className="w-2.5 h-2.5 border transition-all duration-200"
              style={{
                borderColor: floor.color,
                backgroundColor: hoveredFloor === floor.id || activeFloorIndex === i ? floor.color : "transparent",
                boxShadow: hoveredFloor === floor.id || activeFloorIndex === i ? `0 0 10px ${floor.color}` : "none",
              }}
            />
            <span
              className="text-[8px] font-mono tracking-[0.1em] transition-all duration-200"
              style={{
                color: hoveredFloor === floor.id || activeFloorIndex === i ? floor.color : "var(--foreground)",
                opacity: hoveredFloor === floor.id || activeFloorIndex === i ? 1 : 0.4,
              }}
            >
              {floor.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

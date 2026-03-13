"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"

// Floors map to portfolio sections - magenta base, yellow top (like reference)
const FLOORS = [
  { id: "F1", label: "WORK", color: "#E85D4C", section: "projects", desc: "Selected projects and case studies" },
  { id: "F2", label: "ABOUT", color: "#D64B8C", section: "info", desc: "Background, skills, and methodology" },
  { id: "F3", label: "PROCESS", color: "#C93A7A", section: "info", desc: "How I approach challenges" },
  { id: "F4", label: "CONTACT", color: "#F5C842", section: "contact", desc: "Let's build together" },
]

interface HeroCanvasProps {
  onNavigate?: (section: string) => void
}

// Isometric projection helpers
const ISO = {
  // Convert grid x,y,z to screen x,y
  toScreen: (x: number, y: number, z: number, scale = 8) => ({
    sx: (x - y) * scale * 0.866,
    sy: (x + y) * scale * 0.5 - z * scale,
  }),
}

// Generate a single isometric wireframe cube
function IsoCube({ x, y, z, size = 1, color, strokeWidth = 0.8, opacity = 1, scale = 8 }: {
  x: number; y: number; z: number; size?: number; color: string; strokeWidth?: number; opacity?: number; scale?: number
}) {
  const s = size
  // 8 vertices of a cube
  const vertices = [
    ISO.toScreen(x, y, z, scale),           // 0: front-bottom-left
    ISO.toScreen(x + s, y, z, scale),       // 1: front-bottom-right
    ISO.toScreen(x + s, y + s, z, scale),   // 2: back-bottom-right
    ISO.toScreen(x, y + s, z, scale),       // 3: back-bottom-left
    ISO.toScreen(x, y, z + s, scale),       // 4: front-top-left
    ISO.toScreen(x + s, y, z + s, scale),   // 5: front-top-right
    ISO.toScreen(x + s, y + s, z + s, scale), // 6: back-top-right
    ISO.toScreen(x, y + s, z + s, scale),   // 7: back-top-left
  ]

  // Only draw visible edges (3 faces visible in isometric)
  return (
    <g opacity={opacity}>
      {/* Top face */}
      <polygon
        points={`${vertices[4].sx},${vertices[4].sy} ${vertices[5].sx},${vertices[5].sy} ${vertices[6].sx},${vertices[6].sy} ${vertices[7].sx},${vertices[7].sy}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      {/* Left face */}
      <polygon
        points={`${vertices[0].sx},${vertices[0].sy} ${vertices[3].sx},${vertices[3].sy} ${vertices[7].sx},${vertices[7].sy} ${vertices[4].sx},${vertices[4].sy}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.7}
      />
      {/* Right face */}
      <polygon
        points={`${vertices[1].sx},${vertices[1].sy} ${vertices[5].sx},${vertices[5].sy} ${vertices[6].sx},${vertices[6].sy} ${vertices[2].sx},${vertices[2].sy}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.5}
      />
      {/* Front vertical edge */}
      <line x1={vertices[0].sx} y1={vertices[0].sy} x2={vertices[4].sx} y2={vertices[4].sy} stroke={color} strokeWidth={strokeWidth} />
    </g>
  )
}

// Generate a grid of cubes for a floor platform
function CubeGrid({ centerX, centerY, baseZ, width, depth, color, strokeWidth, opacity, scale = 8 }: {
  centerX: number; centerY: number; baseZ: number; width: number; depth: number; color: string; strokeWidth: number; opacity: number; scale?: number
}) {
  const cubes = []
  const halfW = Math.floor(width / 2)
  const halfD = Math.floor(depth / 2)
  
  for (let x = -halfW; x < halfW; x++) {
    for (let y = -halfD; y < halfD; y++) {
      cubes.push(
        <IsoCube
          key={`${x}-${y}`}
          x={centerX + x}
          y={centerY + y}
          z={baseZ}
          color={color}
          strokeWidth={strokeWidth}
          opacity={opacity}
          scale={scale}
        />
      )
    }
  }
  return <>{cubes}</>
}

export function HeroCanvas({ onNavigate }: HeroCanvasProps) {
  const [hoveredFloor, setHoveredFloor] = useState<string | null>(null)
  const [activeFloorIndex, setActiveFloorIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isExploded, setIsExploded] = useState(false)
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
    if (activeFloorIndex === index) {
      setActiveFloorIndex(null)
      setIsExploded(false)
    } else {
      setActiveFloorIndex(index)
      setIsExploded(true)
      setTimeout(() => {
        if (onNavigate) onNavigate(floor.section)
      }, 600)
    }
  }

  const activeFloor = hoveredFloor ? FLOORS.find(f => f.id === hoveredFloor) : null

  // Memoize the tower structure to prevent recalculation
  const towerStructure = useMemo(() => {
    // F1: Wide base platform (like the reference hexagonal base)
    const f1Cubes: Array<{ x: number; y: number; z: number }> = []
    // Outer ring
    for (let x = -8; x <= 8; x++) {
      for (let y = -8; y <= 8; y++) {
        // Create hexagonal-ish shape
        if (Math.abs(x) + Math.abs(y) <= 10 && Math.abs(x) + Math.abs(y) >= 8) {
          f1Cubes.push({ x, y, z: 0 })
        }
      }
    }
    // Inner platform
    for (let x = -6; x <= 6; x++) {
      for (let y = -6; y <= 6; y++) {
        if (Math.abs(x) + Math.abs(y) <= 7) {
          f1Cubes.push({ x, y, z: 0 })
        }
      }
    }

    // F2: Stepped middle section
    const f2Cubes: Array<{ x: number; y: number; z: number }> = []
    for (let x = -5; x <= 5; x++) {
      for (let y = -5; y <= 5; y++) {
        if (Math.abs(x) + Math.abs(y) <= 6) {
          f2Cubes.push({ x, y, z: 0 })
          // Add height variation
          if (Math.abs(x) <= 3 && Math.abs(y) <= 3) {
            f2Cubes.push({ x, y, z: 1 })
          }
        }
      }
    }
    // Vertical pillars
    for (let z = 0; z < 4; z++) {
      f2Cubes.push({ x: -4, y: -4, z })
      f2Cubes.push({ x: 4, y: -4, z })
      f2Cubes.push({ x: -4, y: 4, z })
      f2Cubes.push({ x: 4, y: 4, z })
    }

    // F3: Central core section
    const f3Cubes: Array<{ x: number; y: number; z: number }> = []
    for (let x = -4; x <= 4; x++) {
      for (let y = -4; y <= 4; y++) {
        if (Math.abs(x) + Math.abs(y) <= 5) {
          f3Cubes.push({ x, y, z: 0 })
        }
      }
    }
    // Central pillar going up
    for (let z = 0; z < 6; z++) {
      f3Cubes.push({ x: 0, y: 0, z })
      f3Cubes.push({ x: 1, y: 0, z })
      f3Cubes.push({ x: 0, y: 1, z })
      f3Cubes.push({ x: -1, y: 0, z })
      f3Cubes.push({ x: 0, y: -1, z })
    }

    // F4: Yellow dome (mushroom cap shape)
    const f4Cubes: Array<{ x: number; y: number; z: number }> = []
    // Bottom layer - widest
    for (let x = -6; x <= 6; x++) {
      for (let y = -6; y <= 6; y++) {
        const dist = Math.sqrt(x * x + y * y)
        if (dist <= 6 && dist >= 4) {
          f4Cubes.push({ x, y, z: 0 })
        }
      }
    }
    // Middle layers
    for (let x = -5; x <= 5; x++) {
      for (let y = -5; y <= 5; y++) {
        const dist = Math.sqrt(x * x + y * y)
        if (dist <= 5) {
          f4Cubes.push({ x, y, z: 1 })
        }
      }
    }
    // Upper layers (smaller)
    for (let x = -4; x <= 4; x++) {
      for (let y = -4; y <= 4; y++) {
        const dist = Math.sqrt(x * x + y * y)
        if (dist <= 4) {
          f4Cubes.push({ x, y, z: 2 })
        }
        if (dist <= 3) {
          f4Cubes.push({ x, y, z: 3 })
        }
        if (dist <= 2) {
          f4Cubes.push({ x, y, z: 4 })
        }
      }
    }

    return { f1Cubes, f2Cubes, f3Cubes, f4Cubes }
  }, [])

  return (
    <section
      ref={containerRef}
      data-section="HERO"
      className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden py-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Floor markers - left side */}
      <nav className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-10">
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
              className="group flex items-center gap-3 text-left cursor-pointer"
              style={{
                transform: mounted ? "translateX(0)" : "translateX(-20px)",
                opacity: mounted ? 1 : 0,
                transition: `all 0.5s ease ${i * 100 + 500}ms`,
              }}
            >
              <span
                className="text-xs font-mono tracking-[0.3em] transition-all duration-300 w-6"
                style={{
                  color: isHovered || isActive ? floor.color : "var(--foreground)",
                  opacity: isHovered || isActive ? 1 : 0.35,
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {floor.id}
              </span>
              <span
                className="h-px transition-all duration-500 ease-out"
                style={{
                  width: isActive ? 80 : isHovered ? 50 : 24,
                  backgroundColor: isHovered || isActive ? floor.color : "var(--border)",
                }}
              />
            </button>
          )
        })}
      </nav>

      {/* Main tower */}
      <div
        className="relative w-full max-w-2xl mx-auto px-4"
        style={{
          transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 5}px)`,
          transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <svg
          viewBox="-300 -400 600 550"
          className="w-full h-auto"
          style={{
            overflow: "visible",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
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

          {/* Ground grid - subtle */}
          <g opacity="0.08">
            {Array.from({ length: 21 }).map((_, i) => {
              const pos = -100 + i * 10
              return (
                <g key={i}>
                  <line
                    x1={pos * 0.866} y1={pos * 0.5 + 100}
                    x2={pos * 0.866 + 200 * 0.866} y2={pos * 0.5 + 100 + 200 * 0.5}
                    stroke="var(--foreground)" strokeWidth="0.3"
                  />
                  <line
                    x1={-pos * 0.866} y1={pos * 0.5 + 100}
                    x2={-pos * 0.866 + 200 * 0.866} y2={pos * 0.5 + 100 + 200 * 0.5}
                    stroke="var(--foreground)" strokeWidth="0.3"
                  />
                </g>
              )
            })}
          </g>

          {/* Construction lines radiating from center */}
          <g style={{ opacity: hoveredFloor ? 0.4 : 0.15, transition: "opacity 0.4s ease" }}>
            {[
              { angle: -80, len: 280, c: "#00d4ff" },
              { angle: -55, len: 320, c: "#ff0066" },
              { angle: -30, len: 260, c: "#F5C842" },
              { angle: 20, len: 290, c: "#00ff88" },
              { angle: 50, len: 310, c: "#ff0066" },
              { angle: 75, len: 250, c: "#00d4ff" },
              { angle: 120, len: 220, c: "#8855ff" },
              { angle: 150, len: 270, c: "#F5C842" },
            ].map((line, i) => {
              const rad = (line.angle * Math.PI) / 180
              return (
                <line
                  key={i}
                  x1={0} y1={-120}
                  x2={Math.cos(rad) * line.len}
                  y2={-120 + Math.sin(rad) * line.len}
                  stroke={line.c}
                  strokeWidth="0.8"
                />
              )
            })}
          </g>

          {/* F1: Base platform - magenta */}
          <g
            style={{
              transform: `translateY(${isExploded && activeFloorIndex !== 0 ? (0 - (activeFloorIndex ?? 0)) * 40 : 0}px)`,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={() => setHoveredFloor("F1")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[0], 0)}
            className="cursor-pointer"
            filter={hoveredFloor === "F1" || activeFloorIndex === 0 ? "url(#glow-F1)" : undefined}
          >
            {/* Invisible hit area */}
            <rect x="-150" y="20" width="300" height="120" fill="transparent" />
            <g transform="translate(0, 80)">
              {towerStructure.f1Cubes.map((cube, i) => (
                <IsoCube
                  key={i}
                  x={cube.x} y={cube.y} z={cube.z}
                  color={FLOORS[0].color}
                  strokeWidth={hoveredFloor === "F1" || activeFloorIndex === 0 ? 1.2 : 0.6}
                  opacity={hoveredFloor === "F1" || activeFloorIndex === 0 ? 0.9 : 0.5}
                />
              ))}
            </g>
          </g>

          {/* F2: Middle section - magenta */}
          <g
            style={{
              transform: `translateY(${isExploded && activeFloorIndex !== 1 ? (1 - (activeFloorIndex ?? 0)) * 40 : 0}px)`,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={() => setHoveredFloor("F2")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[1], 1)}
            className="cursor-pointer"
            filter={hoveredFloor === "F2" || activeFloorIndex === 1 ? "url(#glow-F2)" : undefined}
          >
            <rect x="-120" y="-50" width="240" height="100" fill="transparent" />
            <g transform="translate(0, 0)">
              {towerStructure.f2Cubes.map((cube, i) => (
                <IsoCube
                  key={i}
                  x={cube.x} y={cube.y} z={cube.z}
                  color={FLOORS[1].color}
                  strokeWidth={hoveredFloor === "F2" || activeFloorIndex === 1 ? 1.2 : 0.6}
                  opacity={hoveredFloor === "F2" || activeFloorIndex === 1 ? 0.9 : 0.5}
                />
              ))}
            </g>
          </g>

          {/* F3: Core section - magenta/pink */}
          <g
            style={{
              transform: `translateY(${isExploded && activeFloorIndex !== 2 ? (2 - (activeFloorIndex ?? 0)) * 40 : 0}px)`,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={() => setHoveredFloor("F3")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[2], 2)}
            className="cursor-pointer"
            filter={hoveredFloor === "F3" || activeFloorIndex === 2 ? "url(#glow-F3)" : undefined}
          >
            <rect x="-100" y="-130" width="200" height="100" fill="transparent" />
            <g transform="translate(0, -80)">
              {towerStructure.f3Cubes.map((cube, i) => (
                <IsoCube
                  key={i}
                  x={cube.x} y={cube.y} z={cube.z}
                  color={FLOORS[2].color}
                  strokeWidth={hoveredFloor === "F3" || activeFloorIndex === 2 ? 1.2 : 0.6}
                  opacity={hoveredFloor === "F3" || activeFloorIndex === 2 ? 0.9 : 0.5}
                />
              ))}
            </g>
          </g>

          {/* F4: Yellow dome - top */}
          <g
            style={{
              transform: `translateY(${isExploded && activeFloorIndex !== 3 ? (3 - (activeFloorIndex ?? 0)) * 40 : 0}px)`,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={() => setHoveredFloor("F4")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[3], 3)}
            className="cursor-pointer"
            filter={hoveredFloor === "F4" || activeFloorIndex === 3 ? "url(#glow-F4)" : undefined}
          >
            <rect x="-120" y="-280" width="240" height="120" fill="transparent" />
            <g transform="translate(0, -180)">
              {towerStructure.f4Cubes.map((cube, i) => (
                <IsoCube
                  key={i}
                  x={cube.x} y={cube.y} z={cube.z}
                  color={FLOORS[3].color}
                  strokeWidth={hoveredFloor === "F4" || activeFloorIndex === 3 ? 1.2 : 0.6}
                  opacity={hoveredFloor === "F4" || activeFloorIndex === 3 ? 0.9 : 0.5}
                />
              ))}
            </g>
          </g>

          {/* Central vertical pillars connecting floors */}
          <g opacity="0.3">
            <line x1="0" y1="80" x2="0" y2="-180" stroke="var(--foreground)" strokeWidth="1" />
            <line x1="-35" y1="60" x2="-35" y2="-60" stroke="var(--foreground)" strokeWidth="0.5" />
            <line x1="35" y1="60" x2="35" y2="-60" stroke="var(--foreground)" strokeWidth="0.5" />
          </g>
        </svg>
      </div>

      {/* Info panel - right side */}
      <div
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500"
        style={{
          opacity: activeFloor ? 1 : 0,
          transform: activeFloor ? "translateX(0)" : "translateX(20px)",
        }}
      >
        {activeFloor && (
          <div className="border-l-4 bg-background/90 backdrop-blur-sm pl-5 pr-6 py-4 min-w-[160px]" style={{ borderColor: activeFloor.color }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5" style={{ backgroundColor: activeFloor.color }} />
              <span className="text-[10px] font-mono tracking-[0.3em]" style={{ color: activeFloor.color }}>{activeFloor.id}</span>
            </div>
            <div className="text-lg font-mono font-bold text-foreground tracking-wide">{activeFloor.label}</div>
            <div className="text-[10px] font-mono text-foreground/50 mt-2 leading-relaxed">{activeFloor.desc}</div>
          </div>
        )}
      </div>

      {/* Bottom legend */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-6"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease 0.8s",
        }}
      >
        {FLOORS.map((floor, i) => (
          <button
            key={floor.id}
            onClick={() => handleFloorClick(floor, i)}
            onMouseEnter={() => setHoveredFloor(floor.id)}
            onMouseLeave={() => setHoveredFloor(null)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div
              className="w-3 h-3 border-2 transition-all duration-300"
              style={{
                backgroundColor: hoveredFloor === floor.id || activeFloorIndex === i ? floor.color : "transparent",
                borderColor: floor.color,
                transform: hoveredFloor === floor.id ? "scale(1.2)" : "scale(1)",
              }}
            />
            <span
              className="text-[9px] font-mono tracking-[0.15em] transition-all duration-300"
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

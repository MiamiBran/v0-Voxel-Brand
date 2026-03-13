"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"

// Floors map to portfolio sections - distinct colors for each level
const FLOORS = [
  { id: "F1", label: "WORK", color: "#E85D4C", section: "projects", desc: "Selected projects and case studies", yOffset: 80 },
  { id: "F2", label: "ABOUT", color: "#4A90A4", section: "info", desc: "Background, skills, and methodology", yOffset: 0 },
  { id: "F3", label: "PROCESS", color: "#45B07C", section: "info", desc: "How I approach challenges", yOffset: -80 },
  { id: "F4", label: "CONTACT", color: "#F5C842", section: "contact", desc: "Let's build together", yOffset: -200 },
]

interface HeroCanvasProps {
  onNavigate?: (section: string) => void
}

// Isometric projection helpers
const ISO = {
  toScreen: (x: number, y: number, z: number, scale = 10) => ({
    sx: (x - y) * scale * 0.866,
    sy: (x + y) * scale * 0.5 - z * scale,
  }),
}

// Generate a single isometric wireframe cube
function IsoCube({ x, y, z, size = 1, color, strokeWidth = 0.8, opacity = 1, scale = 10 }: {
  x: number; y: number; z: number; size?: number; color: string; strokeWidth?: number; opacity?: number; scale?: number
}) {
  const s = size
  const vertices = [
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
      <polygon
        points={`${vertices[4].sx},${vertices[4].sy} ${vertices[5].sx},${vertices[5].sy} ${vertices[6].sx},${vertices[6].sy} ${vertices[7].sx},${vertices[7].sy}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <polygon
        points={`${vertices[0].sx},${vertices[0].sy} ${vertices[3].sx},${vertices[3].sy} ${vertices[7].sx},${vertices[7].sy} ${vertices[4].sx},${vertices[4].sy}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.7}
      />
      <polygon
        points={`${vertices[1].sx},${vertices[1].sy} ${vertices[5].sx},${vertices[5].sy} ${vertices[6].sx},${vertices[6].sy} ${vertices[2].sx},${vertices[2].sy}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.5}
      />
      <line x1={vertices[0].sx} y1={vertices[0].sy} x2={vertices[4].sx} y2={vertices[4].sy} stroke={color} strokeWidth={strokeWidth} />
    </g>
  )
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
  const activeFloorData = activeFloor || (activeFloorIndex !== null ? FLOORS[activeFloorIndex] : null)

  // Memoize the tower structure
  const towerStructure = useMemo(() => {
    // F1: Wide base platform
    const f1Cubes: Array<{ x: number; y: number; z: number }> = []
    for (let x = -8; x <= 8; x++) {
      for (let y = -8; y <= 8; y++) {
        if (Math.abs(x) + Math.abs(y) <= 10 && Math.abs(x) + Math.abs(y) >= 8) {
          f1Cubes.push({ x, y, z: 0 })
        }
      }
    }
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
          if (Math.abs(x) <= 3 && Math.abs(y) <= 3) {
            f2Cubes.push({ x, y, z: 1 })
          }
        }
      }
    }
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
    for (let z = 0; z < 6; z++) {
      f3Cubes.push({ x: 0, y: 0, z })
      f3Cubes.push({ x: 1, y: 0, z })
      f3Cubes.push({ x: 0, y: 1, z })
      f3Cubes.push({ x: -1, y: 0, z })
      f3Cubes.push({ x: 0, y: -1, z })
    }

    // F4: Yellow dome
    const f4Cubes: Array<{ x: number; y: number; z: number }> = []
    for (let x = -6; x <= 6; x++) {
      for (let y = -6; y <= 6; y++) {
        const dist = Math.sqrt(x * x + y * y)
        if (dist <= 6 && dist >= 4) {
          f4Cubes.push({ x, y, z: 0 })
        }
      }
    }
    for (let x = -5; x <= 5; x++) {
      for (let y = -5; y <= 5; y++) {
        const dist = Math.sqrt(x * x + y * y)
        if (dist <= 5) {
          f4Cubes.push({ x, y, z: 1 })
        }
      }
    }
    for (let x = -4; x <= 4; x++) {
      for (let y = -4; y <= 4; y++) {
        const dist = Math.sqrt(x * x + y * y)
        if (dist <= 4) f4Cubes.push({ x, y, z: 2 })
        if (dist <= 3) f4Cubes.push({ x, y, z: 3 })
        if (dist <= 2) f4Cubes.push({ x, y, z: 4 })
      }
    }

    return { f1Cubes, f2Cubes, f3Cubes, f4Cubes }
  }, [])

  // Construction lines - shorter, proportional to tower
  const constructionLines = [
    { x2: 35, y2: -280, color: "#00d4ff" },
    { x2: 130, y2: -260, color: "#ff0066" },
    { x2: 165, y2: -160, color: "#F5C842" },
    { x2: 200, y2: 20, color: "#00ff88" },
    { x2: 150, y2: 100, color: "#ff0066" },
    { x2: 50, y2: 100, color: "#00d4ff" },
    { x2: -85, y2: 60, color: "#8855ff" },
    { x2: -175, y2: 15, color: "#F5C842" },
  ]

  return (
    <section
      ref={containerRef}
      data-section="HERO"
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-32"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Floor markers - left side */}
      <nav className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-12">
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
                  opacity: isHovered || isActive ? 1 : 0.4,
                  fontWeight: isActive ? 700 : 400,
                  textShadow: isHovered || isActive ? `0 0 20px ${floor.color}` : "none",
                }}
              >
                {floor.id}
              </span>
              <span
                className="h-px transition-all duration-500 ease-out"
                style={{
                  width: isActive ? 100 : isHovered ? 60 : 28,
                  backgroundColor: isHovered || isActive ? floor.color : "var(--border)",
                  boxShadow: isHovered || isActive ? `0 0 15px ${floor.color}` : "none",
                }}
              />
            </button>
          )
        })}
      </nav>

      {/* Main tower - SCALED UP */}
      <div
        className="relative w-full max-w-4xl mx-auto px-4"
        style={{
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 6}px)`,
          transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <svg
          viewBox="-400 -500 800 700"
          className="w-full h-auto"
          style={{
            overflow: "visible",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
          }}
        >
          <defs>
            {FLOORS.map((floor) => (
              <filter key={`glow-${floor.id}`} id={`glow-${floor.id}`} x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feFlood floodColor={floor.color} floodOpacity="0.6" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
            {/* Line glow filter */}
            <filter id="lineGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ground grid */}
          <g opacity="0.06">
            {Array.from({ length: 25 }).map((_, i) => {
              const pos = -120 + i * 10
              return (
                <g key={i}>
                  <line
                    x1={pos * 0.866} y1={pos * 0.5 + 120}
                    x2={pos * 0.866 + 240 * 0.866} y2={pos * 0.5 + 120 + 240 * 0.5}
                    stroke="var(--foreground)" strokeWidth="0.3"
                  />
                  <line
                    x1={-pos * 0.866} y1={pos * 0.5 + 120}
                    x2={-pos * 0.866 + 240 * 0.866} y2={pos * 0.5 + 120 + 240 * 0.5}
                    stroke="var(--foreground)" strokeWidth="0.3"
                  />
                </g>
              )
            })}
          </g>

          {/* Construction lines - GLOW on hover */}
          <g 
            style={{ 
              opacity: hoveredFloor ? 0.7 : 0.2, 
              transition: "opacity 0.4s ease",
            }}
            filter={hoveredFloor ? "url(#lineGlow)" : undefined}
          >
            {constructionLines.map((line, i) => (
              <line
                key={i}
                x1="0" y1="-140"
                x2={line.x2} y2={line.y2}
                stroke={line.color}
                strokeWidth={hoveredFloor ? "1.5" : "0.8"}
                style={{ transition: "stroke-width 0.3s ease" }}
              />
            ))}
          </g>

          {/* F1: Base platform */}
          <g
            style={{
              transform: `translateY(${isExploded && activeFloorIndex !== 0 ? (0 - (activeFloorIndex ?? 0)) * 50 : 0}px)`,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={() => setHoveredFloor("F1")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[0], 0)}
            className="cursor-pointer"
            filter={hoveredFloor === "F1" || activeFloorIndex === 0 ? "url(#glow-F1)" : undefined}
          >
            <rect x="-180" y="20" width="360" height="150" fill="transparent" />
            <g transform="translate(0, 140)">
              {towerStructure.f1Cubes.map((cube, i) => (
                <IsoCube
                  key={i}
                  x={cube.x} y={cube.y} z={cube.z}
                  color={FLOORS[0].color}
                  strokeWidth={hoveredFloor === "F1" || activeFloorIndex === 0 ? 1.8 : 1}
                  opacity={hoveredFloor === "F1" || activeFloorIndex === 0 ? 1 : 0.75}
                  scale={14}
                />
              ))}
            </g>
          </g>

          {/* F2: Middle section */}
          <g
            style={{
              transform: `translateY(${isExploded && activeFloorIndex !== 1 ? (1 - (activeFloorIndex ?? 0)) * 50 : 0}px)`,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={() => setHoveredFloor("F2")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[1], 1)}
            className="cursor-pointer"
            filter={hoveredFloor === "F2" || activeFloorIndex === 1 ? "url(#glow-F2)" : undefined}
          >
            <rect x="-150" y="-60" width="300" height="120" fill="transparent" />
            <g transform="translate(0, 0)">
              {towerStructure.f2Cubes.map((cube, i) => (
                <IsoCube
                  key={i}
                  x={cube.x} y={cube.y} z={cube.z}
                  color={FLOORS[1].color}
                  strokeWidth={hoveredFloor === "F2" || activeFloorIndex === 1 ? 1.8 : 1}
                  opacity={hoveredFloor === "F2" || activeFloorIndex === 1 ? 1 : 0.75}
                  scale={14}
                />
              ))}
            </g>
          </g>

          {/* F3: Core section */}
          <g
            style={{
              transform: `translateY(${isExploded && activeFloorIndex !== 2 ? (2 - (activeFloorIndex ?? 0)) * 50 : 0}px)`,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={() => setHoveredFloor("F3")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[2], 2)}
            className="cursor-pointer"
            filter={hoveredFloor === "F3" || activeFloorIndex === 2 ? "url(#glow-F3)" : undefined}
          >
            <rect x="-130" y="-160" width="260" height="120" fill="transparent" />
            <g transform="translate(0, -140)">
              {towerStructure.f3Cubes.map((cube, i) => (
                <IsoCube
                  key={i}
                  x={cube.x} y={cube.y} z={cube.z}
                  color={FLOORS[2].color}
                  strokeWidth={hoveredFloor === "F3" || activeFloorIndex === 2 ? 1.8 : 1}
                  opacity={hoveredFloor === "F3" || activeFloorIndex === 2 ? 1 : 0.75}
                  scale={14}
                />
              ))}
            </g>
          </g>

          {/* F4: Yellow dome */}
          <g
            style={{
              transform: `translateY(${isExploded && activeFloorIndex !== 3 ? (3 - (activeFloorIndex ?? 0)) * 50 : 0}px)`,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={() => setHoveredFloor("F4")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[3], 3)}
            className="cursor-pointer"
            filter={hoveredFloor === "F4" || activeFloorIndex === 3 ? "url(#glow-F4)" : undefined}
          >
            <rect x="-150" y="-350" width="300" height="150" fill="transparent" />
            <g transform="translate(0, -310)">
              {towerStructure.f4Cubes.map((cube, i) => (
                <IsoCube
                  key={i}
                  x={cube.x} y={cube.y} z={cube.z}
                  color={FLOORS[3].color}
                  strokeWidth={hoveredFloor === "F4" || activeFloorIndex === 3 ? 1.8 : 1}
                  opacity={hoveredFloor === "F4" || activeFloorIndex === 3 ? 1 : 0.75}
                  scale={14}
                />
              ))}
            </g>
          </g>

          {/* Central pillars */}
          <g opacity="0.25">
            <line x1="0" y1="100" x2="0" y2="-220" stroke="var(--foreground)" strokeWidth="1.2" />
            <line x1="-45" y1="75" x2="-45" y2="-75" stroke="var(--foreground)" strokeWidth="0.6" />
            <line x1="45" y1="75" x2="45" y2="-75" stroke="var(--foreground)" strokeWidth="0.6" />
          </g>

          {/* Info panel positioned NEAR the hovered floor */}
          {activeFloorData && (
            <foreignObject
              x="160"
              y={activeFloorData.yOffset - 50}
              width="200"
              height="120"
              style={{
                opacity: hoveredFloor || activeFloorIndex !== null ? 1 : 0,
                transition: "opacity 0.3s ease, y 0.3s ease",
              }}
            >
              <div 
                className="bg-background/95 backdrop-blur-sm border-l-4 pl-4 pr-5 py-3"
                style={{ borderColor: activeFloorData.color }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div 
                    className="w-2.5 h-2.5 transition-shadow duration-300" 
                    style={{ 
                      backgroundColor: activeFloorData.color,
                      boxShadow: `0 0 12px ${activeFloorData.color}`,
                    }} 
                  />
                  <span 
                    className="text-[10px] font-mono tracking-[0.3em]" 
                    style={{ color: activeFloorData.color }}
                  >
                    {activeFloorData.id}
                  </span>
                </div>
                <div 
                  className="text-base font-mono font-bold tracking-wide"
                  style={{ color: activeFloorData.color }}
                >
                  {activeFloorData.label}
                </div>
                <div className="text-[9px] font-mono text-foreground/60 mt-1.5 leading-relaxed">
                  {activeFloorData.desc}
                </div>
              </div>
            </foreignObject>
          )}
        </svg>
      </div>

      {/* Bottom legend */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-8"
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
              className="w-3.5 h-3.5 border-2 transition-all duration-300"
              style={{
                borderColor: floor.color,
                backgroundColor: hoveredFloor === floor.id || activeFloorIndex === i ? floor.color : "transparent",
                boxShadow: hoveredFloor === floor.id || activeFloorIndex === i ? `0 0 15px ${floor.color}` : "none",
              }}
            />
            <span
              className="text-[10px] font-mono tracking-[0.15em] transition-all duration-300"
              style={{
                color: hoveredFloor === floor.id || activeFloorIndex === i ? floor.color : "var(--foreground)",
                opacity: hoveredFloor === floor.id || activeFloorIndex === i ? 1 : 0.5,
                textShadow: hoveredFloor === floor.id ? `0 0 15px ${floor.color}` : "none",
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

"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"
import { useTheme } from "next-themes"
import { useRotation } from "./document-frame"

// Floors aligned with document sections - 4 floors
// Light mode uses muted versions, dark mode uses vibrant neon
const FLOORS = [
  { id: "F1", label: "OPERATIONS", color: "#C24B75", darkColor: "#FF4D8D", section: "projects", desc: "Project index and case studies" },
  { id: "F2", label: "SYSTEMS", color: "#0099B3", darkColor: "#00D9FF", section: "process", desc: "Process and systems design" },
  { id: "F3", label: "BUILDS", color: "#2D9B6E", darkColor: "#A855F7", section: "experiments", desc: "Experiments and client feedback" },
  { id: "F4", label: "CONTACT", color: "#C9A227", darkColor: "#FFD93D", section: "contact", desc: "Get in touch" },
]

interface HeroCanvasProps {
  onNavigate?: (section: string) => void
}

// Isometric projection with rotation
const isoProject = (x: number, y: number, z: number, scale: number, rotation: number) => {
  // Rotate point around Z axis
  const rad = (rotation * Math.PI) / 180
  const rx = x * Math.cos(rad) - y * Math.sin(rad)
  const ry = x * Math.sin(rad) + y * Math.cos(rad)
  
  return {
    sx: (rx - ry) * scale * 0.866,
    sy: (rx + ry) * scale * 0.5 - z * scale,
  }
}

// Isometric cube wireframe with rotation support
function IsoCube({ x, y, z, size = 1, color, strokeWidth = 0.8, opacity = 1, scale = 10, rotation = 0 }: {
  x: number; y: number; z: number; size?: number; color: string; strokeWidth?: number; opacity?: number; scale?: number; rotation?: number
}) {
  const s = size
  const v = [
    isoProject(x, y, z, scale, rotation),
    isoProject(x + s, y, z, scale, rotation),
    isoProject(x + s, y + s, z, scale, rotation),
    isoProject(x, y + s, z, scale, rotation),
    isoProject(x, y, z + s, scale, rotation),
    isoProject(x + s, y, z + s, scale, rotation),
    isoProject(x + s, y + s, z + s, scale, rotation),
    isoProject(x, y + s, z + s, scale, rotation),
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
  const { isAutoRotating, setRotationAngle } = useRotation()
  const { theme, resolvedTheme } = useTheme()
  const [hoveredFloor, setHoveredFloor] = useState<string | null>(null)
  const [activeFloorIndex, setActiveFloorIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  const isDark = mounted && resolvedTheme === "dark"
  
  // Get floor color based on theme
  const getFloorColor = useCallback((floor: typeof FLOORS[0]) => {
    return isDark ? floor.darkColor : floor.color
  }, [isDark])

  // Is any floor hovered - triggers expansion
  const isHovering = hoveredFloor !== null

  // Sync rotation to parent context
  useEffect(() => {
    if (setRotationAngle) setRotationAngle(rotation)
  }, [rotation, setRotationAngle])

  // Continuous rotation animation
  useEffect(() => {
    if (!isAutoRotating) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      return
    }

    let lastTime = performance.now()
    
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000
      lastTime = time
      
      setRotation(prev => (prev + delta * 8) % 360)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isAutoRotating])

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

  // Tower structure - COMPACT and STURDY like a real building model
  const towerStructure = useMemo(() => {
    const scale = 16 // Bigger cubes
    
    // F1: Wide solid base (OPERATIONS) - much denser
    const f1: Array<{ x: number; y: number; z: number }> = []
    for (let x = -5; x <= 5; x++) {
      for (let y = -5; y <= 5; y++) {
        if (Math.abs(x) + Math.abs(y) <= 7) {
          f1.push({ x, y, z: 0 })
          // Add depth - 2 layers
          if (Math.abs(x) + Math.abs(y) <= 5) f1.push({ x, y, z: 1 })
        }
      }
    }

    // F2: Core structure (SYSTEMS)
    const f2: Array<{ x: number; y: number; z: number }> = []
    for (let x = -4; x <= 4; x++) {
      for (let y = -4; y <= 4; y++) {
        if (Math.abs(x) + Math.abs(y) <= 5) {
          f2.push({ x, y, z: 0 })
          if (Math.abs(x) + Math.abs(y) <= 3) f2.push({ x, y, z: 1 })
        }
      }
    }
    // Corner towers
    for (let z = 0; z < 3; z++) {
      f2.push({ x: -3, y: -3, z })
      f2.push({ x: 3, y: -3, z })
      f2.push({ x: -3, y: 3, z })
      f2.push({ x: 3, y: 3, z })
    }

    // F3: Central tower (BUILDS)
    const f3: Array<{ x: number; y: number; z: number }> = []
    for (let x = -3; x <= 3; x++) {
      for (let y = -3; y <= 3; y++) {
        if (Math.abs(x) + Math.abs(y) <= 4) {
          f3.push({ x, y, z: 0 })
        }
      }
    }
    // Rising core
    for (let z = 0; z < 4; z++) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          f3.push({ x, y, z })
        }
      }
    }

    // F4: Crown/beacon (CONTACT)
    const f4: Array<{ x: number; y: number; z: number }> = []
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        if (Math.abs(x) + Math.abs(y) <= 3) {
          f4.push({ x, y, z: 0 })
        }
      }
    }
    // Spire
    for (let z = 1; z < 5; z++) {
      f4.push({ x: 0, y: 0, z })
    }

    return { f1, f2, f3, f4, scale }
  }, [])

  // Floor Y positions - COMPACT stacking (closer together)
  const basePositions = [70, 20, -30, -80] // Tight stacking
  const expandedPositions = [100, 30, -40, -120] // Spread on hover
  
  const getFloorY = (index: number) => {
    return isHovering ? expandedPositions[index] : basePositions[index]
  }

  return (
    <section
      ref={containerRef}
      data-section="HERO"
      className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden py-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Floor markers - left side */}
      <nav className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
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
                className="text-[11px] font-mono tracking-[0.15em] transition-all duration-300 w-6"
                style={{
                  color: isHovered || isActive ? getFloorColor(floor) : "var(--foreground)",
                  opacity: isHovered || isActive ? 1 : 0.4,
                  textShadow: isHovered || isActive ? `0 0 12px ${getFloorColor(floor)}` : "none",
                }}
              >
                {floor.id}
              </span>
              <span
                className="h-px transition-all duration-300 ease-out"
                style={{
                  width: isActive ? 60 : isHovered ? 40 : 16,
                  backgroundColor: isHovered || isActive ? getFloorColor(floor) : "var(--border)",
                  boxShadow: isHovered || isActive ? `0 0 8px ${getFloorColor(floor)}` : "none",
                }}
              />
            </button>
          )
        })}
      </nav>

      {/* Main tower - LARGER */}
      <div
        className="relative w-full max-w-4xl mx-auto px-4"
        style={{
          transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 4}px)`,
          transition: "transform 0.4s ease-out",
        }}
      >
        <svg
          viewBox="-280 -200 560 400"
          className="w-full h-auto"
          style={{
            overflow: "visible",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            transition: "all 0.5s ease-out 0.2s",
          }}
        >
          <defs>
            {FLOORS.map((floor) => (
              <filter key={`glow-${floor.id}`} id={`glow-${floor.id}`} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor={getFloorColor(floor)} floodOpacity="0.6" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* Construction/plane lines - FAINTER */}
          <g style={{ opacity: isHovering ? 0.25 : 0.08, transition: "opacity 0.4s" }}>
            <line x1="0" y1="-120" x2="25" y2="-220" stroke="#00d4ff" strokeWidth="0.5" />
            <line x1="0" y1="-120" x2="80" y2="-200" stroke="#ff0066" strokeWidth="0.5" />
            <line x1="0" y1="-120" x2="-60" y2="-180" stroke="#F5C842" strokeWidth="0.5" />
            <line x1="0" y1="100" x2="120" y2="160" stroke="#00ff88" strokeWidth="0.5" />
            <line x1="0" y1="100" x2="-90" y2="150" stroke="#9B6BC3" strokeWidth="0.5" />
            <line x1="0" y1="-120" x2="0" y2="-240" stroke="#ffffff" strokeWidth="0.3" />
          </g>

          {/* F1: Base - OPERATIONS */}
          <g
            onMouseEnter={() => setHoveredFloor("F1")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[0], 0)}
            className="cursor-pointer"
            filter={hoveredFloor === "F1" || activeFloorIndex === 0 ? "url(#glow-F1)" : undefined}
            style={{
              transform: `translateY(${getFloorY(0) - basePositions[0]}px)`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <rect x="-160" y={basePositions[0] - 30} width="320" height="100" fill="transparent" />
            <g transform={`translate(0, ${basePositions[0]})`}>
              {towerStructure.f1.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={getFloorColor(FLOORS[0])}
                  strokeWidth={hoveredFloor === "F1" || activeFloorIndex === 0 ? 1.6 : 0.9}
                  opacity={hoveredFloor === "F1" || activeFloorIndex === 0 ? 1 : 0.75}
                  scale={towerStructure.scale}
                  rotation={rotation}
                />
              ))}
            </g>
          </g>

          {/* F2: SYSTEMS */}
          <g
            onMouseEnter={() => setHoveredFloor("F2")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[1], 1)}
            className="cursor-pointer"
            filter={hoveredFloor === "F2" || activeFloorIndex === 1 ? "url(#glow-F2)" : undefined}
            style={{
              transform: `translateY(${getFloorY(1) - basePositions[1]}px)`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <rect x="-140" y={basePositions[1] - 30} width="280" height="90" fill="transparent" />
            <g transform={`translate(0, ${basePositions[1]})`}>
              {towerStructure.f2.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={getFloorColor(FLOORS[1])}
                  strokeWidth={hoveredFloor === "F2" || activeFloorIndex === 1 ? 1.6 : 0.9}
                  opacity={hoveredFloor === "F2" || activeFloorIndex === 1 ? 1 : 0.75}
                  scale={towerStructure.scale}
                  rotation={rotation}
                />
              ))}
            </g>
          </g>

          {/* F3: BUILDS */}
          <g
            onMouseEnter={() => setHoveredFloor("F3")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[2], 2)}
            className="cursor-pointer"
            filter={hoveredFloor === "F3" || activeFloorIndex === 2 ? "url(#glow-F3)" : undefined}
            style={{
              transform: `translateY(${getFloorY(2) - basePositions[2]}px)`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <rect x="-120" y={basePositions[2] - 30} width="240" height="80" fill="transparent" />
            <g transform={`translate(0, ${basePositions[2]})`}>
              {towerStructure.f3.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={getFloorColor(FLOORS[2])}
                  strokeWidth={hoveredFloor === "F3" || activeFloorIndex === 2 ? 1.6 : 0.9}
                  opacity={hoveredFloor === "F3" || activeFloorIndex === 2 ? 1 : 0.75}
                  scale={towerStructure.scale}
                  rotation={rotation}
                />
              ))}
            </g>
          </g>

          {/* F4: CONTACT */}
          <g
            onMouseEnter={() => setHoveredFloor("F4")}
            onMouseLeave={() => setHoveredFloor(null)}
            onClick={() => handleFloorClick(FLOORS[3], 3)}
            className="cursor-pointer"
            filter={hoveredFloor === "F4" || activeFloorIndex === 3 ? "url(#glow-F4)" : undefined}
            style={{
              transform: `translateY(${getFloorY(3) - basePositions[3]}px)`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <rect x="-80" y={basePositions[3] - 30} width="160" height="80" fill="transparent" />
            <g transform={`translate(0, ${basePositions[3]})`}>
              {towerStructure.f4.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={getFloorColor(FLOORS[3])}
                  strokeWidth={hoveredFloor === "F4" || activeFloorIndex === 3 ? 1.6 : 0.9}
                  opacity={hoveredFloor === "F4" || activeFloorIndex === 3 ? 1 : 0.75}
                  scale={towerStructure.scale}
                  rotation={rotation}
                />
              ))}
            </g>
          </g>

          {/* Hover info panel */}
          {activeFloorData && (
            <foreignObject
              x="160"
              y={basePositions[FLOORS.findIndex(f => f.id === activeFloorData.id)] - 30}
              width="160"
              height="80"
              style={{
                opacity: hoveredFloor || activeFloorIndex !== null ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}
            >
              <div 
                className="bg-background/90 backdrop-blur-sm border-l-2 pl-3 pr-3 py-2"
                style={{ borderColor: activeFloorData.color }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-2 h-2" 
                    style={{ 
                      backgroundColor: activeFloorData.color,
                      boxShadow: `0 0 6px ${activeFloorData.color}`,
                    }} 
                  />
                  <span 
                    className="text-[8px] font-mono tracking-[0.2em]" 
                    style={{ color: activeFloorData.color }}
                  >
                    {activeFloorData.id}
                  </span>
                </div>
                <div 
                  className="text-xs font-mono font-bold tracking-wide"
                  style={{ color: activeFloorData.color }}
                >
                  {activeFloorData.label}
                </div>
                <div className="text-[8px] font-mono text-foreground/50 mt-1 leading-relaxed">
                  {activeFloorData.desc}
                </div>
              </div>
            </foreignObject>
          )}
        </svg>
      </div>

      {/* Bottom legend */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-3 md:gap-5"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s ease 0.5s",
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
              className="w-2 h-2 border transition-all duration-200"
              style={{
                borderColor: getFloorColor(floor),
                backgroundColor: hoveredFloor === floor.id || activeFloorIndex === i ? getFloorColor(floor) : "transparent",
                boxShadow: hoveredFloor === floor.id || activeFloorIndex === i ? `0 0 8px ${getFloorColor(floor)}` : "none",
              }}
            />
            <span
              className="text-[7px] font-mono tracking-[0.1em] transition-all duration-200"
              style={{
                color: hoveredFloor === floor.id || activeFloorIndex === i ? getFloorColor(floor) : "var(--foreground)",
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

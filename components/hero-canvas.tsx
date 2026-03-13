"use client"

import { useState, useCallback, useRef, useEffect } from "react"

// Floors map to portfolio sections
const FLOORS = [
  { id: "F1", label: "WORK", color: "#E85D4C", section: "projects", desc: "Selected projects and case studies" },
  { id: "F2", label: "ABOUT", color: "#4A90A4", section: "info", desc: "Background, skills, and methodology" },
  { id: "F3", label: "PROCESS", color: "#45B07C", section: "info", desc: "How I approach challenges" },
  { id: "F4", label: "CONTACT", color: "#F5C842", section: "contact", desc: "Let's build together" },
]

interface HeroCanvasProps {
  onNavigate?: (section: string) => void
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

  return (
    <section
      ref={containerRef}
      data-section="HERO"
      className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden py-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Floor markers - left side */}
      <nav className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-8">
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
              <span
                className="text-[10px] font-mono tracking-[0.2em] transition-all duration-300"
                style={{ 
                  color: floor.color,
                  opacity: isHovered || isActive ? 1 : 0,
                  transform: isHovered || isActive ? "translateX(0)" : "translateX(-10px)",
                }}
              >
                {floor.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Main tower */}
      <div
        className="relative w-full max-w-2xl mx-auto px-4"
        style={{
          transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 8}px)`,
          transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <svg
          viewBox="0 0 800 750"
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
              <filter key={`glow-${floor.id}`} id={`glow-${floor.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feFlood floodColor={floor.color} floodOpacity="0.6" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* Ground grid */}
          <g transform="translate(400, 650)" opacity="0.06">
            {Array.from({ length: 17 }).map((_, i) => {
              const pos = -200 + i * 25
              return (
                <g key={i}>
                  <line x1={pos * 0.866} y1={pos * 0.5} x2={(pos + 400) * 0.866 - 400 * 0.866} y2={(pos + 400) * 0.5} stroke="var(--foreground)" strokeWidth="0.5" />
                  <line x1={-pos * 0.866} y1={pos * 0.5} x2={(-pos + 400) * 0.866 - 400 * 0.866} y2={(pos + 400) * 0.5} stroke="var(--foreground)" strokeWidth="0.5" />
                </g>
              )
            })}
          </g>

          {/* Construction lines */}
          <g style={{ opacity: hoveredFloor ? 0.3 : 0.1, transition: "opacity 0.4s ease" }}>
            {[
              { angle: -75, len: 380, c: 0 },
              { angle: -50, len: 420, c: 1 },
              { angle: -25, len: 350, c: 2 },
              { angle: 15, len: 380, c: 3 },
              { angle: 40, len: 400, c: 0 },
              { angle: 65, len: 340, c: 1 },
              { angle: 115, len: 300, c: 2 },
              { angle: 140, len: 360, c: 3 },
            ].map((line, i) => {
              const rad = (line.angle * Math.PI) / 180
              const floor = FLOORS[line.c]
              return (
                <line
                  key={i}
                  x1={400}
                  y1={380}
                  x2={400 + Math.cos(rad) * line.len}
                  y2={380 + Math.sin(rad) * line.len}
                  stroke={floor.color}
                  strokeWidth="1"
                  strokeDasharray="6 12"
                  style={{ opacity: hoveredFloor === floor.id ? 1 : 0.5, transition: "opacity 0.3s" }}
                />
              )
            })}
          </g>

          {/* Tower floors */}
          {FLOORS.map((floor, index) => {
            const isHovered = hoveredFloor === floor.id
            const isActive = activeFloorIndex === index
            const baseY = 580 - index * 120
            const explodeOffset = isExploded ? (index - (activeFloorIndex ?? 0)) * 70 : 0

            return (
              <g
                key={floor.id}
                style={{
                  transform: `translateY(${explodeOffset}px)`,
                  transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                onMouseEnter={() => setHoveredFloor(floor.id)}
                onMouseLeave={() => setHoveredFloor(null)}
                onClick={() => handleFloorClick(floor, index)}
                className="cursor-pointer"
                filter={isHovered || isActive ? `url(#glow-${floor.id})` : undefined}
              >
                {/* Large invisible hit area for easy hovering */}
                <rect
                  x={200}
                  y={baseY - 130}
                  width={400}
                  height={140}
                  fill="transparent"
                  className="cursor-pointer"
                />

                {/* Floor content based on type */}
                {index === 0 && (
                  <FloorWork 
                    baseY={baseY} 
                    color={floor.color} 
                    isHovered={isHovered} 
                    isActive={isActive} 
                  />
                )}
                {index === 1 && (
                  <FloorAbout 
                    baseY={baseY} 
                    color={floor.color} 
                    isHovered={isHovered} 
                    isActive={isActive} 
                  />
                )}
                {index === 2 && (
                  <FloorProcess 
                    baseY={baseY} 
                    color={floor.color} 
                    isHovered={isHovered} 
                    isActive={isActive} 
                  />
                )}
                {index === 3 && (
                  <FloorContact 
                    baseY={baseY} 
                    color={floor.color} 
                    isHovered={isHovered} 
                    isActive={isActive} 
                  />
                )}
              </g>
            )
          })}

          {/* Dimension annotations */}
          <g opacity="0.15" className="pointer-events-none">
            <line x1="700" y1="120" x2="700" y2="590" stroke="var(--foreground)" strokeWidth="0.5" />
            <line x1="695" y1="120" x2="705" y2="120" stroke="var(--foreground)" strokeWidth="0.5" />
            <line x1="695" y1="590" x2="705" y2="590" stroke="var(--foreground)" strokeWidth="0.5" />
            <text x="715" y="360" fontSize="9" fill="var(--foreground)" fontFamily="monospace">4F</text>
          </g>
        </svg>
      </div>

      {/* Info panel */}
      <div 
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500"
        style={{
          opacity: activeFloor ? 1 : 0,
          transform: activeFloor ? "translateX(0)" : "translateX(20px)",
        }}
      >
        {activeFloor && (
          <div className="border-l-4 bg-background/90 backdrop-blur-sm pl-5 pr-6 py-4 min-w-[180px]" style={{ borderColor: activeFloor.color }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5" style={{ backgroundColor: activeFloor.color }} />
              <span className="text-[10px] font-mono tracking-[0.3em]" style={{ color: activeFloor.color }}>{activeFloor.id}</span>
            </div>
            <div className="text-xl font-mono font-bold text-foreground tracking-wide">{activeFloor.label}</div>
            <div className="text-[10px] font-mono text-foreground/50 mt-2 leading-relaxed">{activeFloor.desc}</div>
            <div className="text-[8px] font-mono text-foreground/30 mt-4 tracking-[0.2em]">CLICK TO NAVIGATE</div>
          </div>
        )}
      </div>

      {/* Bottom palette */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-8"
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
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div
              className="w-3.5 h-3.5 border-2 transition-all duration-300"
              style={{
                backgroundColor: hoveredFloor === floor.id || activeFloorIndex === i ? floor.color : "transparent",
                borderColor: floor.color,
                transform: hoveredFloor === floor.id ? "scale(1.2)" : "scale(1)",
              }}
            />
            <span
              className="text-[9px] font-mono tracking-[0.2em] transition-all duration-300"
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

// F1: WORK - Complex modular structure with scattered project cubes
function FloorWork({ baseY, color, isHovered, isActive }: { baseY: number; color: string; isHovered: boolean; isActive: boolean }) {
  const opacity = isHovered || isActive ? 1 : 0.4
  const strokeW = isHovered || isActive ? 1.8 : 1
  const fillOpacity = isHovered || isActive ? 0.15 : 0.05

  return (
    <g transform={`translate(400, ${baseY})`} style={{ opacity, transition: "opacity 0.3s" }}>
      {/* Base platform */}
      <polygon points="-150,-20 0,-95 150,-20 0,55" fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth={strokeW} />
      <polygon points="-150,-20 -150,10 0,85 0,55" fill={color} fillOpacity={fillOpacity * 0.5} stroke={color} strokeWidth={strokeW * 0.6} />
      <polygon points="150,-20 150,10 0,85 0,55" fill={color} fillOpacity={fillOpacity * 0.3} stroke={color} strokeWidth={strokeW * 0.6} />
      
      {/* Grid on platform */}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`g${i}`} x1={-120 + i * 60} y1={-5 - i * 15} x2={-60 + i * 60} y2={40 - i * 15} stroke={color} strokeWidth="0.4" opacity={isHovered ? 0.6 : 0.2} />
      ))}
      
      {/* Project cubes - scattered */}
      <g transform="translate(-80, -50)">
        <polygon points="0,-25 25,-40 50,-25 25,-10" fill={color} fillOpacity={fillOpacity * 1.5} stroke={color} strokeWidth={strokeW} />
        <polygon points="0,-25 0,5 25,20 25,-10" fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth={strokeW * 0.7} />
        <polygon points="50,-25 50,5 25,20 25,-10" fill={color} fillOpacity={fillOpacity * 0.5} stroke={color} strokeWidth={strokeW * 0.7} />
        <line x1="25" y1="-40" x2="25" y2="-70" stroke={color} strokeWidth={strokeW * 0.5} strokeDasharray="3 3" />
      </g>
      
      <g transform="translate(40, -65)">
        <polygon points="0,-20 20,-32 40,-20 20,-8" fill={color} fillOpacity={fillOpacity * 1.5} stroke={color} strokeWidth={strokeW} />
        <polygon points="0,-20 0,10 20,22 20,-8" fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth={strokeW * 0.7} />
        <polygon points="40,-20 40,10 20,22 20,-8" fill={color} fillOpacity={fillOpacity * 0.5} stroke={color} strokeWidth={strokeW * 0.7} />
      </g>
      
      <g transform="translate(80, -30)">
        <polygon points="0,-15 15,-23 30,-15 15,-7" fill={color} fillOpacity={fillOpacity * 1.5} stroke={color} strokeWidth={strokeW * 0.8} />
        <polygon points="0,-15 0,15 15,23 15,-7" fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth={strokeW * 0.5} />
        <polygon points="30,-15 30,15 15,23 15,-7" fill={color} fillOpacity={fillOpacity * 0.5} stroke={color} strokeWidth={strokeW * 0.5} />
      </g>
      
      {/* Cross bracing lines */}
      <line x1="-100" y1="-40" x2="100" y2="-60" stroke={color} strokeWidth="0.5" strokeDasharray="4 6" opacity={isHovered ? 0.8 : 0.3} />
      <line x1="-80" y1="0" x2="80" y2="-80" stroke={color} strokeWidth="0.5" strokeDasharray="4 6" opacity={isHovered ? 0.8 : 0.3} />
    </g>
  )
}

// F2: ABOUT - Central monolithic tower with details
function FloorAbout({ baseY, color, isHovered, isActive }: { baseY: number; color: string; isHovered: boolean; isActive: boolean }) {
  const opacity = isHovered || isActive ? 1 : 0.4
  const strokeW = isHovered || isActive ? 1.8 : 1
  const fillOpacity = isHovered || isActive ? 0.15 : 0.05

  return (
    <g transform={`translate(400, ${baseY})`} style={{ opacity, transition: "opacity 0.3s" }}>
      {/* Base */}
      <polygon points="-130,-15 0,-80 130,-15 0,50" fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth={strokeW} />
      <polygon points="-130,-15 -130,15 0,80 0,50" fill={color} fillOpacity={fillOpacity * 0.5} stroke={color} strokeWidth={strokeW * 0.6} />
      <polygon points="130,-15 130,15 0,80 0,50" fill={color} fillOpacity={fillOpacity * 0.3} stroke={color} strokeWidth={strokeW * 0.6} />
      
      {/* Central tower */}
      <g transform="translate(0, -40)">
        <polygon points="-35,-30 0,-50 35,-30 0,-10" fill={color} fillOpacity={fillOpacity * 2} stroke={color} strokeWidth={strokeW * 1.2} />
        <polygon points="-35,-30 -35,30 0,50 0,-10" fill={color} fillOpacity={fillOpacity * 1.5} stroke={color} strokeWidth={strokeW} />
        <polygon points="35,-30 35,30 0,50 0,-10" fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth={strokeW} />
        
        {/* Window details */}
        <rect x="-20" y="-25" width="8" height="12" fill="none" stroke={color} strokeWidth="0.5" transform="skewY(-30)" opacity={isHovered ? 0.8 : 0.3} />
        <rect x="12" y="-25" width="8" height="12" fill="none" stroke={color} strokeWidth="0.5" transform="skewY(30)" opacity={isHovered ? 0.8 : 0.3} />
      </g>
      
      {/* Vertical pillars */}
      <line x1="-90" y1="-40" x2="-90" y2="30" stroke={color} strokeWidth={strokeW * 0.6} />
      <line x1="90" y1="-40" x2="90" y2="30" stroke={color} strokeWidth={strokeW * 0.6} />
      <line x1="-60" y1="-55" x2="-60" y2="15" stroke={color} strokeWidth={strokeW * 0.4} opacity="0.6" />
      <line x1="60" y1="-55" x2="60" y2="15" stroke={color} strokeWidth={strokeW * 0.4} opacity="0.6" />
      
      {/* Horizontal connectors */}
      <line x1="-90" y1="-20" x2="-35" y2="-50" stroke={color} strokeWidth="0.5" strokeDasharray="3 4" opacity={isHovered ? 0.8 : 0.3} />
      <line x1="90" y1="-20" x2="35" y2="-50" stroke={color} strokeWidth="0.5" strokeDasharray="3 4" opacity={isHovered ? 0.8 : 0.3} />
    </g>
  )
}

// F3: PROCESS - Overlapping translucent planes (decon style)
function FloorProcess({ baseY, color, isHovered, isActive }: { baseY: number; color: string; isHovered: boolean; isActive: boolean }) {
  const opacity = isHovered || isActive ? 1 : 0.4
  const strokeW = isHovered || isActive ? 1.8 : 1
  const fillOpacity = isHovered || isActive ? 0.2 : 0.08

  return (
    <g transform={`translate(400, ${baseY})`} style={{ opacity, transition: "opacity 0.3s" }}>
      {/* Back plane - tilted */}
      <g transform="rotate(-8)">
        <polygon points="-80,-60 20,-100 100,-60 0,-20" fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth={strokeW * 0.8} />
        <polygon points="-80,-60 -80,-30 0,10 0,-20" fill={color} fillOpacity={fillOpacity * 0.5} stroke={color} strokeWidth={strokeW * 0.5} />
      </g>
      
      {/* Middle plane */}
      <polygon points="-100,-40 0,-85 100,-40 0,5" fill={color} fillOpacity={fillOpacity * 1.5} stroke={color} strokeWidth={strokeW} />
      <polygon points="-100,-40 -100,0 0,45 0,5" fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth={strokeW * 0.7} />
      <polygon points="100,-40 100,0 0,45 0,5" fill={color} fillOpacity={fillOpacity * 0.5} stroke={color} strokeWidth={strokeW * 0.7} />
      
      {/* Front plane - tilted opposite */}
      <g transform="rotate(5)">
        <polygon points="-60,-20 30,-55 90,-25 0,10" fill={color} fillOpacity={fillOpacity * 0.8} stroke={color} strokeWidth={strokeW * 0.8} />
      </g>
      
      {/* Collision/intersection lines */}
      <line x1="-70" y1="-50" x2="70" y2="-70" stroke={color} strokeWidth="0.6" opacity={isHovered ? 0.9 : 0.4} />
      <line x1="-50" y1="-30" x2="80" y2="-50" stroke={color} strokeWidth="0.6" opacity={isHovered ? 0.9 : 0.4} />
      <line x1="0" y1="-85" x2="0" y2="-120" stroke={color} strokeWidth={strokeW * 0.4} strokeDasharray="2 4" />
      
      {/* Internal structure hints */}
      <line x1="-50" y1="-60" x2="-50" y2="-20" stroke={color} strokeWidth="0.4" opacity="0.5" />
      <line x1="50" y1="-70" x2="50" y2="-30" stroke={color} strokeWidth="0.4" opacity="0.5" />
    </g>
  )
}

// F4: CONTACT - Beacon/antenna structure
function FloorContact({ baseY, color, isHovered, isActive }: { baseY: number; color: string; isHovered: boolean; isActive: boolean }) {
  const opacity = isHovered || isActive ? 1 : 0.4
  const strokeW = isHovered || isActive ? 1.8 : 1
  const fillOpacity = isHovered || isActive ? 0.2 : 0.08

  return (
    <g transform={`translate(400, ${baseY})`} style={{ opacity, transition: "opacity 0.3s" }}>
      {/* Base platform */}
      <polygon points="-90,-12 0,-60 90,-12 0,36" fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth={strokeW} />
      <polygon points="-90,-12 -90,8 0,56 0,36" fill={color} fillOpacity={fillOpacity * 0.5} stroke={color} strokeWidth={strokeW * 0.6} />
      <polygon points="90,-12 90,8 0,56 0,36" fill={color} fillOpacity={fillOpacity * 0.3} stroke={color} strokeWidth={strokeW * 0.6} />
      
      {/* Central mast */}
      <line x1="0" y1="-60" x2="0" y2="-140" stroke={color} strokeWidth={strokeW * 1.5} />
      
      {/* Cross arms */}
      <line x1="-40" y1="-100" x2="40" y2="-100" stroke={color} strokeWidth={strokeW} />
      <line x1="-25" y1="-120" x2="25" y2="-120" stroke={color} strokeWidth={strokeW * 0.8} />
      
      {/* Diagonal supports */}
      <line x1="-35" y1="-60" x2="0" y2="-100" stroke={color} strokeWidth={strokeW * 0.5} opacity="0.7" />
      <line x1="35" y1="-60" x2="0" y2="-100" stroke={color} strokeWidth={strokeW * 0.5} opacity="0.7" />
      
      {/* Beacon at top */}
      <circle cx="0" cy="-145" r={isHovered || isActive ? 10 : 6} fill={color} fillOpacity={isHovered || isActive ? 0.8 : 0.4} />
      <circle cx="0" cy="-145" r={isHovered || isActive ? 16 : 10} fill="none" stroke={color} strokeWidth="1" opacity={isHovered ? 0.6 : 0.2} />
      <circle cx="0" cy="-145" r={isHovered || isActive ? 24 : 14} fill="none" stroke={color} strokeWidth="0.5" opacity={isHovered ? 0.4 : 0.1} />
      
      {/* Signal waves when hovered */}
      {isHovered && (
        <>
          <circle cx="0" cy="-145" r="32" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" from="20" to="50" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="-145" r="40" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2">
            <animate attributeName="r" from="25" to="60" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      
      {/* Platform detail cubes */}
      <g transform="translate(-55, -30)">
        <polygon points="0,-8 10,-13 20,-8 10,-3" fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth="0.6" />
        <polygon points="0,-8 0,2 10,7 10,-3" fill={color} fillOpacity={fillOpacity * 0.5} stroke={color} strokeWidth="0.4" />
      </g>
      <g transform="translate(40, -25)">
        <polygon points="0,-8 10,-13 20,-8 10,-3" fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth="0.6" />
        <polygon points="20,-8 20,2 10,7 10,-3" fill={color} fillOpacity={fillOpacity * 0.5} stroke={color} strokeWidth="0.4" />
      </g>
    </g>
  )
}

"use client"

import { useState, useCallback, useRef, useEffect } from "react"

// Floors map to actual portfolio sections - each is a navigation target
const FLOORS = [
  { 
    id: "F1", 
    label: "WORK", 
    color: "#E85D4C", 
    section: "projects",
    desc: "Selected projects and case studies"
  },
  { 
    id: "F2", 
    label: "ABOUT", 
    color: "#4A90A4", 
    section: "info",
    desc: "Background, skills, and methodology"
  },
  { 
    id: "F3", 
    label: "PROCESS", 
    color: "#45B07C", 
    section: "info",
    desc: "How I approach design challenges"
  },
  { 
    id: "F4", 
    label: "CONTACT", 
    color: "#F5C842", 
    section: "contact",
    desc: "Let's work together"
  },
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

  // Animated entrance
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
    // Toggle explode on click
    if (activeFloorIndex === index) {
      setActiveFloorIndex(null)
      setIsExploded(false)
    } else {
      setActiveFloorIndex(index)
      setIsExploded(true)
      // Navigate after animation
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
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Floor markers - left side navigation */}
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
              className="group flex items-center gap-3 text-left cursor-pointer transition-transform duration-300"
              style={{
                transform: mounted ? "translateX(0)" : "translateX(-20px)",
                opacity: mounted ? 1 : 0,
                transitionDelay: `${i * 100 + 500}ms`,
              }}
            >
              <span
                className="text-xs font-mono tracking-[0.3em] transition-all duration-300 w-6"
                style={{
                  color: isHovered || isActive ? floor.color : "var(--muted-foreground)",
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

      {/* Main tower visualization - BIG and centered */}
      <div
        className="relative w-full max-w-4xl mx-auto px-4"
        style={{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 10}px)`,
          transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <svg
          viewBox="0 0 800 700"
          className="w-full h-auto"
          style={{ 
            overflow: "visible",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
          }}
        >
          <defs>
            {/* Glow filters for each floor */}
            {FLOORS.map((floor) => (
              <filter key={`glow-${floor.id}`} id={`glow-${floor.id}`} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feFlood floodColor={floor.color} floodOpacity="0.5" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
            
            {/* Sketch effect filter */}
            <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>

          {/* Ground grid - isometric */}
          <g transform="translate(400, 600)" opacity="0.08">
            <IsometricGrid size={500} cells={16} />
          </g>

          {/* Construction lines radiating from center */}
          <g className="transition-opacity duration-500" style={{ opacity: hoveredFloor ? 0.25 : 0.08 }}>
            {[
              { angle: -70, len: 350 },
              { angle: -45, len: 400 },
              { angle: -20, len: 320 },
              { angle: 20, len: 350 },
              { angle: 45, len: 380 },
              { angle: 70, len: 300 },
              { angle: 110, len: 280 },
              { angle: 135, len: 350 },
              { angle: 160, len: 300 },
            ].map((line, i) => {
              const floor = FLOORS[i % FLOORS.length]
              const rad = (line.angle * Math.PI) / 180
              return (
                <line
                  key={i}
                  x1={400}
                  y1={350}
                  x2={400 + Math.cos(rad) * line.len}
                  y2={350 + Math.sin(rad) * line.len}
                  stroke={floor.color}
                  strokeWidth="1"
                  strokeDasharray="8 16"
                  style={{
                    opacity: hoveredFloor === floor.id ? 0.8 : 0.4,
                    transition: "opacity 0.3s ease",
                  }}
                />
              )
            })}
          </g>

          {/* Tower floors - from bottom to top */}
          {FLOORS.map((floor, index) => {
            const isHovered = hoveredFloor === floor.id
            const isActive = activeFloorIndex === index
            
            // Base positions - stacked tower
            const baseY = 520 - index * 110
            const width = 320 - index * 35
            const height = 90 + index * 5
            
            // Explosion effect
            const explodeOffset = isExploded 
              ? (index - (activeFloorIndex ?? 0)) * 60
              : 0

            return (
              <g
                key={floor.id}
                className="cursor-pointer"
                style={{
                  transform: `translateY(${explodeOffset}px)`,
                  transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                onMouseEnter={() => setHoveredFloor(floor.id)}
                onMouseLeave={() => setHoveredFloor(null)}
                onClick={() => handleFloorClick(floor, index)}
                filter={isHovered || isActive ? `url(#glow-${floor.id})` : undefined}
              >
                <g transform={`translate(400, ${baseY})`}>
                  {/* Main cube */}
                  <IsometricCube
                    width={width}
                    depth={width * 0.8}
                    height={height}
                    color={floor.color}
                    strokeWidth={isHovered || isActive ? 3 : 1.5}
                    opacity={isHovered || isActive ? 1 : 0.45}
                    filled={isActive}
                  />
                  
                  {/* Grid on top face */}
                  <IsometricTopGrid
                    width={width}
                    depth={width * 0.8}
                    height={height}
                    color={floor.color}
                    cells={5}
                    opacity={isHovered || isActive ? 0.6 : 0.15}
                  />

                  {/* Detail elements per floor - makes each unique */}
                  {index === 0 && (
                    // F1: Work - scattered portfolio cubes
                    <>
                      <g transform="translate(-100, 20)">
                        <IsometricCube width={50} depth={50} height={40} color={floor.color} strokeWidth={1} opacity={isHovered ? 0.8 : 0.3} />
                      </g>
                      <g transform="translate(110, 30)">
                        <IsometricCube width={40} depth={40} height={55} color={floor.color} strokeWidth={1} opacity={isHovered ? 0.8 : 0.3} />
                      </g>
                    </>
                  )}
                  {index === 1 && (
                    // F2: About - central pillar
                    <g transform="translate(0, -30)">
                      <IsometricCube width={60} depth={60} height={80} color={floor.color} strokeWidth={1.2} opacity={isHovered ? 0.9 : 0.35} />
                    </g>
                  )}
                  {index === 2 && (
                    // F3: Process - overlapping planes
                    <>
                      <g transform="translate(-40, -20)">
                        <IsometricCube width={100} depth={30} height={50} color={floor.color} strokeWidth={1} opacity={isHovered ? 0.7 : 0.25} />
                      </g>
                      <g transform="translate(30, -10)">
                        <IsometricCube width={80} depth={40} height={45} color={floor.color} strokeWidth={1} opacity={isHovered ? 0.7 : 0.25} />
                      </g>
                    </>
                  )}
                  {index === 3 && (
                    // F4: Contact - antenna/beacon
                    <>
                      <line x1="0" y1={-height} x2="0" y2={-height - 80} stroke={floor.color} strokeWidth={isHovered ? 3 : 1.5} opacity={isHovered ? 1 : 0.5} />
                      <circle cx="0" cy={-height - 85} r={isHovered ? 8 : 5} fill={floor.color} opacity={isHovered ? 0.9 : 0.4} />
                    </>
                  )}

                  {/* Floor label inside */}
                  <text
                    x="0"
                    y={-height / 2 + 5}
                    textAnchor="middle"
                    fontSize={isHovered || isActive ? "14" : "11"}
                    fontFamily="monospace"
                    letterSpacing="0.15em"
                    fill={floor.color}
                    opacity={isHovered || isActive ? 0.9 : 0}
                    style={{ transition: "all 0.3s ease" }}
                  >
                    {floor.label}
                  </text>
                </g>
              </g>
            )
          })}

          {/* Dimension line - right side */}
          <g opacity="0.12" className="pointer-events-none">
            <line x1="680" y1="100" x2="680" y2="530" stroke="var(--foreground)" strokeWidth="0.5" />
            <line x1="675" y1="100" x2="685" y2="100" stroke="var(--foreground)" strokeWidth="0.5" />
            <line x1="675" y1="530" x2="685" y2="530" stroke="var(--foreground)" strokeWidth="0.5" />
            <text x="695" y="320" fontSize="10" fill="var(--muted-foreground)" fontFamily="monospace" letterSpacing="0.1em">4 FLOORS</text>
          </g>
        </svg>
      </div>

      {/* Info panel - appears on hover */}
      <div 
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500"
        style={{
          opacity: activeFloor ? 1 : 0,
          transform: activeFloor ? "translateX(0)" : "translateX(20px)",
        }}
      >
        {activeFloor && (
          <div
            className="border-l-4 bg-background/90 backdrop-blur-sm pl-5 pr-6 py-4 min-w-[180px]"
            style={{ borderColor: activeFloor.color }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5" style={{ backgroundColor: activeFloor.color }} />
              <span className="text-[10px] font-mono tracking-[0.3em]" style={{ color: activeFloor.color }}>
                {activeFloor.id}
              </span>
            </div>
            <div className="text-xl font-mono font-bold text-foreground tracking-wide">
              {activeFloor.label}
            </div>
            <div className="text-[10px] font-mono text-muted-foreground/60 mt-2 leading-relaxed">
              {activeFloor.desc}
            </div>
            <div className="text-[8px] font-mono text-muted-foreground/40 mt-4 tracking-[0.2em]">
              CLICK TO NAVIGATE
            </div>
          </div>
        )}
      </div>

      {/* Palette legend - bottom center */}
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
                color: hoveredFloor === floor.id || activeFloorIndex === i ? floor.color : "var(--muted-foreground)",
                opacity: hoveredFloor === floor.id || activeFloorIndex === i ? 1 : 0.4,
              }}
            >
              {floor.label}
            </span>
          </button>
        ))}
      </div>

      {/* Interaction hint */}
      <div 
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10"
        style={{
          opacity: mounted && !hoveredFloor ? 0.3 : 0,
          transition: "opacity 0.5s ease 1.5s",
        }}
      >
        <span className="text-[8px] font-mono text-muted-foreground tracking-[0.25em]">
          HOVER TO EXPLORE
        </span>
      </div>
    </section>
  )
}

// Isometric cube wireframe with optional fill
function IsometricCube({
  width,
  depth,
  height,
  color,
  strokeWidth = 1,
  opacity = 1,
  filled = false,
}: {
  width: number
  depth: number
  height: number
  color: string
  strokeWidth?: number
  opacity?: number
  filled?: boolean
}) {
  const cos30 = 0.866
  const sin30 = 0.5
  const hw = width / 2
  const hd = depth / 2

  const project = (x: number, y: number, z: number): [number, number] => [
    (x - y) * cos30,
    (x + y) * sin30 - z,
  ]

  const [b1x, b1y] = project(-hw, -hd, 0)
  const [b2x, b2y] = project(hw, -hd, 0)
  const [b3x, b3y] = project(hw, hd, 0)
  const [b4x, b4y] = project(-hw, hd, 0)
  const [t1x, t1y] = project(-hw, -hd, height)
  const [t2x, t2y] = project(hw, -hd, height)
  const [t3x, t3y] = project(hw, hd, height)
  const [t4x, t4y] = project(-hw, hd, height)

  return (
    <g style={{ opacity, transition: "opacity 0.3s ease" }}>
      {/* Filled faces if active */}
      {filled && (
        <>
          <polygon points={`${t1x},${t1y} ${t2x},${t2y} ${t3x},${t3y} ${t4x},${t4y}`} fill={color} opacity="0.15" />
          <polygon points={`${t2x},${t2y} ${b2x},${b2y} ${b3x},${b3y} ${t3x},${t3y}`} fill={color} opacity="0.1" />
          <polygon points={`${t4x},${t4y} ${t3x},${t3y} ${b3x},${b3y} ${b4x},${b4y}`} fill={color} opacity="0.05" />
        </>
      )}
      {/* Top face */}
      <polygon
        points={`${t1x},${t1y} ${t2x},${t2y} ${t3x},${t3y} ${t4x},${t4y}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Right face */}
      <polygon
        points={`${t2x},${t2y} ${b2x},${b2y} ${b3x},${b3y} ${t3x},${t3y}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.7}
        strokeLinejoin="round"
      />
      {/* Left face */}
      <polygon
        points={`${t4x},${t4y} ${t3x},${t3y} ${b3x},${b3y} ${b4x},${b4y}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.5}
        strokeLinejoin="round"
      />
      {/* Visible vertical edges */}
      <line x1={t1x} y1={t1y} x2={b1x} y2={b1y} stroke={color} strokeWidth={strokeWidth * 0.4} />
      <line x1={t4x} y1={t4y} x2={b4x} y2={b4y} stroke={color} strokeWidth={strokeWidth * 0.4} />
    </g>
  )
}

// Grid on top face of cube
function IsometricTopGrid({
  width,
  depth,
  height,
  color,
  cells,
  opacity = 0.2,
}: {
  width: number
  depth: number
  height: number
  color: string
  cells: number
  opacity?: number
}) {
  const cos30 = 0.866
  const sin30 = 0.5
  const hw = width / 2
  const hd = depth / 2

  const project = (x: number, y: number): [number, number] => [
    (x - y) * cos30,
    (x + y) * sin30 - height,
  ]

  const lines: JSX.Element[] = []
  const stepX = width / cells
  const stepY = depth / cells

  for (let i = 1; i < cells; i++) {
    const x = -hw + i * stepX
    const [x1, y1] = project(x, -hd)
    const [x2, y2] = project(x, hd)
    lines.push(<line key={`x${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.5" />)
  }

  for (let i = 1; i < cells; i++) {
    const y = -hd + i * stepY
    const [x1, y1] = project(-hw, y)
    const [x2, y2] = project(hw, y)
    lines.push(<line key={`y${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.5" />)
  }

  return <g style={{ opacity, transition: "opacity 0.3s ease" }}>{lines}</g>
}

// Ground grid
function IsometricGrid({ size, cells }: { size: number; cells: number }) {
  const cos30 = 0.866
  const sin30 = 0.5
  const half = size / 2

  const project = (x: number, y: number): [number, number] => [
    (x - y) * cos30,
    (x + y) * sin30,
  ]

  const lines: JSX.Element[] = []
  const step = size / cells

  for (let i = 0; i <= cells; i++) {
    const pos = -half + i * step
    const isMajor = i % 4 === 0
    
    const [x1a, y1a] = project(pos, -half)
    const [x2a, y2a] = project(pos, half)
    const [x1b, y1b] = project(-half, pos)
    const [x2b, y2b] = project(half, pos)
    
    lines.push(
      <line key={`gx${i}`} x1={x1a} y1={y1a} x2={x2a} y2={y2a} stroke="var(--foreground)" strokeWidth={isMajor ? 0.6 : 0.25} />,
      <line key={`gy${i}`} x1={x1b} y1={y1b} x2={x2b} y2={y2b} stroke="var(--foreground)" strokeWidth={isMajor ? 0.6 : 0.25} />
    )
  }

  // Outline
  const corners = [project(-half, -half), project(half, -half), project(half, half), project(-half, half)]
  lines.push(
    <polygon
      key="outline"
      points={corners.map(c => `${c[0]},${c[1]}`).join(" ")}
      fill="none"
      stroke="var(--foreground)"
      strokeWidth="0.8"
    />
  )

  return <g>{lines}</g>
}

export default HeroCanvas

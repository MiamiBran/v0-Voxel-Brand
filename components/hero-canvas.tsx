"use client"

import { useState, useCallback, useRef } from "react"

// Floors map to actual portfolio sections
const FLOORS = [
  { 
    id: "F1", 
    label: "PROJECTS", 
    color: "#E85D4C", 
    section: "projects",
    desc: "Selected works and case studies"
  },
  { 
    id: "F2", 
    label: "ABOUT", 
    color: "#4A90A4", 
    section: "info",
    desc: "Background and methodology"
  },
  { 
    id: "F3", 
    label: "PROCESS", 
    color: "#45B07C", 
    section: "info",
    desc: "Design approach and tools"
  },
  { 
    id: "F4", 
    label: "CONTACT", 
    color: "#F5C842", 
    section: "contact",
    desc: "Get in touch"
  },
]

interface HeroCanvasProps {
  onNavigate?: (section: string) => void
}

export function HeroCanvas({ onNavigate }: HeroCanvasProps) {
  const [hoveredFloor, setHoveredFloor] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }, [])

  const handleFloorClick = (floor: typeof FLOORS[0]) => {
    if (onNavigate) {
      onNavigate(floor.section)
    }
  }

  const activeFloor = hoveredFloor ? FLOORS.find(f => f.id === hoveredFloor) : null

  return (
    <section
      ref={containerRef}
      data-section="HERO"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Floor markers - left side navigation */}
      <nav className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-6">
        {[...FLOORS].reverse().map((floor) => {
          const isHovered = hoveredFloor === floor.id
          return (
            <button
              key={floor.id}
              onClick={() => handleFloorClick(floor)}
              onMouseEnter={() => setHoveredFloor(floor.id)}
              onMouseLeave={() => setHoveredFloor(null)}
              className="group flex items-center gap-3 text-left cursor-pointer"
            >
              <span
                className="text-[10px] font-mono tracking-[0.2em] transition-all duration-300"
                style={{
                  color: isHovered ? floor.color : "var(--muted-foreground)",
                  opacity: isHovered ? 1 : 0.4,
                }}
              >
                {floor.id}
              </span>
              <span
                className="h-px transition-all duration-300"
                style={{
                  width: isHovered ? 48 : 20,
                  backgroundColor: isHovered ? floor.color : "var(--border)",
                }}
              />
              <span
                className="text-[10px] font-mono tracking-[0.15em] transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ color: floor.color }}
              >
                {floor.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Main tower visualization */}
      <div
        className="relative w-full max-w-3xl aspect-square"
        style={{
          transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Glow filters for each color */}
            {FLOORS.map((floor) => (
              <filter key={`glow-${floor.id}`} id={`glow-${floor.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
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
          <g transform="translate(300, 520)">
            <IsometricGrid size={400} cells={12} opacity={0.12} />
          </g>

          {/* Construction lines - subtle */}
          <g opacity={hoveredFloor ? 0.3 : 0.1}>
            {[
              { angle: -60, color: "#E85D4C", length: 280 },
              { angle: -30, color: "#4A90A4", length: 320 },
              { angle: 30, color: "#45B07C", length: 300 },
              { angle: 60, color: "#F5C842", length: 260 },
              { angle: 120, color: "#E85D4C", length: 240 },
              { angle: 150, color: "#4A90A4", length: 280 },
            ].map((line, i) => {
              const rad = (line.angle * Math.PI) / 180
              return (
                <line
                  key={i}
                  x1={300}
                  y1={300}
                  x2={300 + Math.cos(rad) * line.length}
                  y2={300 + Math.sin(rad) * line.length}
                  stroke={line.color}
                  strokeWidth="1"
                  strokeDasharray="6 12"
                  className="transition-opacity duration-500"
                />
              )
            })}
          </g>

          {/* Tower floors - from bottom to top */}
          {FLOORS.map((floor, index) => {
            const isHovered = hoveredFloor === floor.id
            const baseY = 440 - index * 100
            const width = 280 - index * 40
            const height = 80 + index * 10
            
            // Explosion offset when any floor is hovered
            const explosionOffset = hoveredFloor 
              ? (index - FLOORS.findIndex(f => f.id === hoveredFloor)) * (isHovered ? 0 : 15)
              : 0

            return (
              <g
                key={floor.id}
                className="cursor-pointer transition-transform duration-500"
                style={{
                  transform: `translateY(${explosionOffset}px)`,
                }}
                onMouseEnter={() => setHoveredFloor(floor.id)}
                onMouseLeave={() => setHoveredFloor(null)}
                onClick={() => handleFloorClick(floor)}
                filter={isHovered ? `url(#glow-${floor.id})` : undefined}
              >
                <g transform={`translate(300, ${baseY})`}>
                  <IsometricCube
                    width={width}
                    depth={width}
                    height={height}
                    color={floor.color}
                    strokeWidth={isHovered ? 2.5 : 1.2}
                    opacity={isHovered ? 1 : 0.5}
                  />
                  
                  {/* Inner grid on top face */}
                  <IsometricTopFace
                    width={width}
                    depth={width}
                    height={height}
                    color={floor.color}
                    cells={Math.max(3, Math.floor(width / 60))}
                    opacity={isHovered ? 0.5 : 0.15}
                  />

                  {/* Additional detail cubes for visual interest */}
                  {index === 3 && (
                    <g transform="translate(0, -50)">
                      <IsometricCube
                        width={80}
                        depth={80}
                        height={50}
                        color={floor.color}
                        strokeWidth={isHovered ? 2 : 1}
                        opacity={isHovered ? 0.9 : 0.4}
                      />
                    </g>
                  )}
                  {index === 2 && (
                    <>
                      <g transform="translate(-50, 0)">
                        <IsometricCube
                          width={60}
                          depth={60}
                          height={height}
                          color={floor.color}
                          strokeWidth={isHovered ? 1.5 : 0.8}
                          opacity={isHovered ? 0.8 : 0.35}
                        />
                      </g>
                      <g transform="translate(50, 0)">
                        <IsometricCube
                          width={50}
                          depth={50}
                          height={height * 0.7}
                          color={floor.color}
                          strokeWidth={isHovered ? 1.5 : 0.8}
                          opacity={isHovered ? 0.8 : 0.35}
                        />
                      </g>
                    </>
                  )}
                </g>
              </g>
            )
          })}

          {/* Dimension annotations */}
          <g opacity="0.15" className="pointer-events-none">
            <line x1="520" y1="140" x2="520" y2="440" stroke="var(--foreground)" strokeWidth="0.5" />
            <line x1="515" y1="140" x2="525" y2="140" stroke="var(--foreground)" strokeWidth="0.5" />
            <line x1="515" y1="440" x2="525" y2="440" stroke="var(--foreground)" strokeWidth="0.5" />
            <text x="530" y="290" fontSize="9" fill="var(--muted-foreground)" fontFamily="monospace">4F</text>
          </g>
        </svg>
      </div>

      {/* Info tooltip - follows hovered floor */}
      {activeFloor && (
        <div 
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
        >
          <div
            className="border-2 bg-background/95 backdrop-blur-sm px-5 py-4 min-w-[200px] transition-all duration-300"
            style={{ borderColor: activeFloor.color }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-3 h-3"
                style={{ backgroundColor: activeFloor.color }}
              />
              <span 
                className="text-xs font-mono tracking-[0.2em]" 
                style={{ color: activeFloor.color }}
              >
                {activeFloor.id}
              </span>
            </div>
            <div className="text-lg font-mono font-bold text-foreground tracking-wide">
              {activeFloor.label}
            </div>
            <div className="text-[11px] font-mono text-muted-foreground/70 mt-1">
              {activeFloor.desc}
            </div>
            <div className="text-[9px] font-mono text-muted-foreground/40 mt-4 tracking-wider">
              CLICK TO NAVIGATE
            </div>
          </div>
        </div>
      )}

      {/* Palette legend - bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-6">
        {FLOORS.map((floor) => (
          <button
            key={floor.id}
            onClick={() => handleFloorClick(floor)}
            onMouseEnter={() => setHoveredFloor(floor.id)}
            onMouseLeave={() => setHoveredFloor(null)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div
              className="w-3 h-3 border transition-all duration-300"
              style={{
                backgroundColor: hoveredFloor === floor.id ? floor.color : "transparent",
                borderColor: floor.color,
              }}
            />
            <span
              className="text-[9px] font-mono tracking-[0.15em] transition-all duration-300"
              style={{
                color: hoveredFloor === floor.id ? floor.color : "var(--muted-foreground)",
                opacity: hoveredFloor === floor.id ? 1 : 0.5,
              }}
            >
              {floor.label}
            </span>
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="text-[8px] font-mono text-muted-foreground/30 tracking-[0.2em] animate-pulse">
          HOVER OR CLICK TO EXPLORE
        </div>
      </div>
    </section>
  )
}

// Isometric cube wireframe
function IsometricCube({
  width,
  depth,
  height,
  color,
  strokeWidth = 1,
  opacity = 1,
}: {
  width: number
  depth: number
  height: number
  color: string
  strokeWidth?: number
  opacity?: number
}) {
  const cos30 = 0.866
  const sin30 = 0.5
  const hw = width / 2
  const hd = depth / 2

  const project = (x: number, y: number, z: number): string => {
    const px = (x - y) * cos30
    const py = (x + y) * sin30 - z
    return `${px.toFixed(1)},${py.toFixed(1)}`
  }

  // Vertices
  const b1 = project(-hw, -hd, 0)
  const b2 = project(hw, -hd, 0)
  const b3 = project(hw, hd, 0)
  const b4 = project(-hw, hd, 0)
  const t1 = project(-hw, -hd, height)
  const t2 = project(hw, -hd, height)
  const t3 = project(hw, hd, height)
  const t4 = project(-hw, hd, height)

  return (
    <g style={{ opacity, transition: "opacity 0.3s ease" }}>
      {/* Top face */}
      <polygon
        points={`${t1} ${t2} ${t3} ${t4}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Right face */}
      <polygon
        points={`${t2} ${b2} ${b3} ${t3}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.7}
        strokeLinejoin="round"
      />
      {/* Left face */}
      <polygon
        points={`${t4} ${t3} ${b3} ${b4}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.5}
        strokeLinejoin="round"
      />
      {/* Vertical edges */}
      <line x1={t1.split(",")[0]} y1={t1.split(",")[1]} x2={b1.split(",")[0]} y2={b1.split(",")[1]} stroke={color} strokeWidth={strokeWidth * 0.4} />
      <line x1={t4.split(",")[0]} y1={t4.split(",")[1]} x2={b4.split(",")[0]} y2={b4.split(",")[1]} stroke={color} strokeWidth={strokeWidth * 0.4} />
    </g>
  )
}

// Grid on top face
function IsometricTopFace({
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
    lines.push(
      <line key={`x${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.5" />
    )
  }

  for (let i = 1; i < cells; i++) {
    const y = -hd + i * stepY
    const [x1, y1] = project(-hw, y)
    const [x2, y2] = project(hw, y)
    lines.push(
      <line key={`y${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.5" />
    )
  }

  return <g style={{ opacity, transition: "opacity 0.3s ease" }}>{lines}</g>
}

// Ground grid
function IsometricGrid({ size, cells, opacity = 0.1 }: { size: number; cells: number; opacity?: number }) {
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
      <line key={`gx${i}`} x1={x1a} y1={y1a} x2={x2a} y2={y2a} stroke="var(--foreground)" strokeWidth={isMajor ? 0.6 : 0.2} />,
      <line key={`gy${i}`} x1={x1b} y1={y1b} x2={x2b} y2={y2b} stroke="var(--foreground)" strokeWidth={isMajor ? 0.6 : 0.2} />
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

  return <g style={{ opacity }}>{lines}</g>
}

export default HeroCanvas

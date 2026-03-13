"use client"

import { useEffect, useState, useCallback, useRef } from "react"

// Palette colors matching the title block swatches and your artwork movements
const PALETTE = {
  C: { color: "#E85D4C", name: "CONSTRUCTIVISM", desc: "Geometric abstraction" },
  M: { color: "#F5C842", name: "METABOLISM", desc: "Organic modularity" },
  D: { color: "#4A90A4", name: "DECONSTRUCTIVISM", desc: "Fragmented forms" },
  B: { color: "#45B07C", name: "BRUTALISM", desc: "Raw materiality" },
}

// Floor configuration - each floor maps to a movement
const FLOORS = [
  { id: "F1", movement: "C", yBase: 380, height: 80, width: 320 },
  { id: "F2", movement: "D", yBase: 280, height: 100, width: 260 },
  { id: "F3", movement: "B", yBase: 160, height: 120, width: 200 },
  { id: "F4", movement: "M", yBase: 20, height: 140, width: 140 },
]

export function HeroCanvas() {
  const [mounted, setMounted] = useState(false)
  const [activeFloor, setActiveFloor] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [explosionFactor, setExplosionFactor] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Smooth explosion animation when clicking
  useEffect(() => {
    if (activeFloor) {
      const animate = () => {
        setExplosionFactor((prev) => {
          const target = 1
          const diff = target - prev
          if (Math.abs(diff) < 0.01) return target
          return prev + diff * 0.08
        })
      }
      const interval = setInterval(animate, 16)
      return () => clearInterval(interval)
    } else {
      const animate = () => {
        setExplosionFactor((prev) => {
          if (prev < 0.01) return 0
          return prev * 0.9
        })
      }
      const interval = setInterval(animate, 16)
      return () => clearInterval(interval)
    }
  }, [activeFloor])

  // Track mouse for parallax
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }, [])

  if (!mounted) {
    return (
      <section data-section="HERO" className="relative w-full min-h-[90vh] flex items-center justify-center">
        <div className="text-muted-foreground/30 font-mono text-xs tracking-widest">LOADING DIAGRAM...</div>
      </section>
    )
  }

  const activeMovement = activeFloor
    ? PALETTE[FLOORS.find((f) => f.id === activeFloor)?.movement as keyof typeof PALETTE]
    : null

  return (
    <section
      ref={containerRef}
      data-section="HERO"
      className="relative w-full min-h-[90vh] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Floor markers on left edge */}
      <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-center gap-20 z-20">
        {[...FLOORS].reverse().map((floor) => {
          const movement = PALETTE[floor.movement as keyof typeof PALETTE]
          const isActive = activeFloor === floor.id
          return (
            <button
              key={floor.id}
              onClick={() => setActiveFloor(isActive ? null : floor.id)}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span
                className="text-[9px] font-mono tracking-widest transition-all duration-500"
                style={{
                  color: isActive ? movement.color : "var(--muted-foreground)",
                  opacity: isActive ? 1 : 0.3,
                }}
              >
                {floor.id}
              </span>
              <span
                className="h-px transition-all duration-500"
                style={{
                  width: isActive ? 40 : 16,
                  backgroundColor: isActive ? movement.color : "var(--border)",
                }}
              />
            </button>
          )
        })}
      </div>

      {/* Main SVG diagram */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <svg
          viewBox="-50 -100 600 700"
          className="w-full h-full max-w-4xl max-h-[85vh]"
          style={{ overflow: "visible" }}
        >
          {/* Construction lines - radiate from center, visible on hover */}
          <g style={{ opacity: activeFloor ? 0.4 : 0.15 }}>
            {[
              { angle: -70, color: "#E85D4C" },
              { angle: -45, color: "#4A90A4" },
              { angle: -20, color: "#F5C842" },
              { angle: 15, color: "#45B07C" },
              { angle: 40, color: "#E85D4C" },
              { angle: 70, color: "#4A90A4" },
              { angle: 95, color: "#F5C842" },
              { angle: -95, color: "#45B07C" },
            ].map((line, i) => {
              const rad = (line.angle * Math.PI) / 180
              const len = 350 + Math.sin(i * 0.5) * 50
              const cx = 250
              const cy = 250
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={cx + Math.cos(rad) * len}
                  y2={cy + Math.sin(rad) * len}
                  stroke={line.color}
                  strokeWidth="0.8"
                  strokeDasharray="4 8"
                  className="transition-opacity duration-500"
                />
              )
            })}
          </g>

          {/* Ground grid */}
          <g transform="translate(250, 480)">
            <IsoGrid size={340} cells={10} />
          </g>

          {/* The tower - each floor explodes outward when active */}
          {FLOORS.map((floor, floorIndex) => {
            const movement = PALETTE[floor.movement as keyof typeof PALETTE]
            const isActive = activeFloor === floor.id
            const isAnyActive = activeFloor !== null
            
            // Calculate explosion offset for this floor
            const explosionOffset = explosionFactor * (floorIndex - 1.5) * 35
            const yOffset = isAnyActive ? explosionOffset : 0

            return (
              <g
                key={floor.id}
                className="cursor-pointer"
                style={{
                  transform: `translateY(${yOffset}px)`,
                  transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                onClick={() => setActiveFloor(isActive ? null : floor.id)}
                onMouseEnter={() => !activeFloor && setActiveFloor(floor.id)}
                onMouseLeave={() => !activeFloor && setActiveFloor(null)}
              >
                <g transform={`translate(250, ${floor.yBase})`}>
                  {/* Wireframe cube for this floor */}
                  <IsoCube
                    width={floor.width}
                    depth={floor.width}
                    height={floor.height}
                    color={movement.color}
                    active={isActive}
                    strokeWidth={isActive ? 2 : 1}
                  />
                  
                  {/* Grid on top face */}
                  <IsoTopGrid
                    width={floor.width}
                    depth={floor.width}
                    cells={Math.floor(floor.width / 40)}
                    color={movement.color}
                    yOffset={-floor.height}
                    active={isActive}
                  />

                  {/* Inner detail cubes */}
                  {floor.id === "F4" && (
                    <>
                      <g transform="translate(0, -60)">
                        <IsoCube width={80} depth={80} height={60} color={movement.color} active={isActive} strokeWidth={isActive ? 1.5 : 0.8} />
                      </g>
                      <g transform="translate(30, -30)">
                        <IsoCube width={40} depth={40} height={30} color={movement.color} active={isActive} strokeWidth={isActive ? 1.5 : 0.8} />
                      </g>
                    </>
                  )}

                  {floor.id === "F3" && (
                    <>
                      <g transform="translate(-40, 0)">
                        <IsoCube width={60} depth={100} height={floor.height} color={movement.color} active={isActive} strokeWidth={isActive ? 1.5 : 0.8} />
                      </g>
                      <g transform="translate(50, 0)">
                        <IsoCube width={50} depth={80} height={floor.height * 0.8} color={movement.color} active={isActive} strokeWidth={isActive ? 1.5 : 0.8} />
                      </g>
                    </>
                  )}

                  {floor.id === "F2" && (
                    <g transform="translate(0, 0)">
                      <IsoCube width={160} depth={160} height={50} color={movement.color} active={isActive} strokeWidth={isActive ? 1.5 : 0.8} />
                    </g>
                  )}
                </g>
              </g>
            )
          })}

          {/* Vertical construction lines / pillars */}
          <g opacity="0.2">
            {[[-60, 0], [60, 0], [0, -60], [0, 60]].map(([dx, dy], i) => (
              <line
                key={i}
                x1={250 + dx * 1.5}
                y1={100}
                x2={250 + dx * 1.5}
                y2={460}
                stroke="var(--foreground)"
                strokeWidth="0.5"
                strokeDasharray="2 6"
              />
            ))}
          </g>

          {/* Dimension lines */}
          <g opacity="0.15" className="pointer-events-none">
            {/* Horizontal dimension */}
            <line x1="80" y1="500" x2="420" y2="500" stroke="var(--foreground)" strokeWidth="0.5" />
            <line x1="80" y1="495" x2="80" y2="505" stroke="var(--foreground)" strokeWidth="0.5" />
            <line x1="420" y1="495" x2="420" y2="505" stroke="var(--foreground)" strokeWidth="0.5" />
            <text x="250" y="515" textAnchor="middle" fontSize="8" fill="var(--muted-foreground)" fontFamily="monospace">320</text>
            
            {/* Vertical dimension */}
            <line x1="30" y1="20" x2="30" y2="460" stroke="var(--foreground)" strokeWidth="0.5" />
            <line x1="25" y1="20" x2="35" y2="20" stroke="var(--foreground)" strokeWidth="0.5" />
            <line x1="25" y1="460" x2="35" y2="460" stroke="var(--foreground)" strokeWidth="0.5" />
            <text x="20" y="240" textAnchor="middle" fontSize="8" fill="var(--muted-foreground)" fontFamily="monospace" transform="rotate(-90, 20, 240)">440</text>
          </g>
        </svg>
      </div>

      {/* Info panel - appears when a floor is active */}
      {activeMovement && activeFloor && (
        <div
          className="absolute top-8 right-4 md:right-8 z-30 border bg-background/95 backdrop-blur-sm px-5 py-4 max-w-xs transition-all duration-300"
          style={{ borderColor: activeMovement.color }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-3 h-3 border"
              style={{ backgroundColor: activeMovement.color, borderColor: activeMovement.color }}
            />
            <span className="text-xs font-mono tracking-[0.2em]" style={{ color: activeMovement.color }}>
              {activeFloor}
            </span>
          </div>
          <div className="text-sm font-mono font-bold text-foreground tracking-wide">
            {activeMovement.name}
          </div>
          <div className="text-[10px] font-mono text-muted-foreground/60 mt-1">
            {activeMovement.desc}
          </div>
          <div className="text-[8px] font-mono text-muted-foreground/30 mt-3 tracking-wider">
            CLICK TO LOCK / UNLOCK VIEW
          </div>
        </div>
      )}

      {/* Bottom caption */}
      <div className="absolute bottom-12 left-4 md:left-8 z-20">
        <div className="border border-border bg-background/80 backdrop-blur-sm px-5 py-4">
          <div className="text-base md:text-lg font-mono font-bold text-foreground tracking-wide">
            ISOMETRIC STRATA
          </div>
          <div className="text-[8px] md:text-[9px] font-mono text-muted-foreground/50 mt-1 tracking-[0.2em]">
            MONUMENT / TATLIN — AXONOMETRIC VIEW
          </div>
          <div className="flex gap-3 mt-3">
            {Object.entries(PALETTE).map(([key, { color }]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 border border-border/50" style={{ backgroundColor: color }} />
                <span className="text-[7px] font-mono text-muted-foreground/40">{key}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plate number */}
      <div className="absolute bottom-12 right-4 md:right-8 z-20 text-right hidden md:block">
        <div className="text-[7px] font-mono text-muted-foreground/20 tracking-[0.3em]">PLATE</div>
        <div className="text-xl font-mono text-muted-foreground/30 font-bold">#01</div>
      </div>

      {/* Mobile hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 md:hidden">
        <div className="text-[8px] font-mono text-muted-foreground/30 tracking-[0.15em]">
          TAP FLOORS TO EXPLORE
        </div>
      </div>
    </section>
  )
}

// Isometric cube wireframe
function IsoCube({
  width,
  depth,
  height,
  color,
  active = false,
  strokeWidth = 1,
}: {
  width: number
  depth: number
  height: number
  color: string
  active?: boolean
  strokeWidth?: number
}) {
  const cos30 = 0.866
  const sin30 = 0.5
  const hw = width / 2
  const hd = depth / 2

  const project = (x: number, y: number, z: number): [number, number] => [
    (x - y) * cos30,
    (x + y) * sin30 - z,
  ]

  const vertices = {
    b1: project(-hw, -hd, 0),
    b2: project(hw, -hd, 0),
    b3: project(hw, hd, 0),
    b4: project(-hw, hd, 0),
    t1: project(-hw, -hd, height),
    t2: project(hw, -hd, height),
    t3: project(hw, hd, height),
    t4: project(-hw, hd, height),
  }

  const pt = (v: [number, number]) => `${v[0].toFixed(1)},${v[1].toFixed(1)}`

  return (
    <g style={{ opacity: active ? 1 : 0.6, transition: "opacity 0.3s ease" }}>
      {/* Top face */}
      <polygon
        points={`${pt(vertices.t1)} ${pt(vertices.t2)} ${pt(vertices.t3)} ${pt(vertices.t4)}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Bottom face - fainter */}
      <polygon
        points={`${pt(vertices.b1)} ${pt(vertices.b2)} ${pt(vertices.b3)} ${pt(vertices.b4)}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.5}
        opacity={0.3}
        strokeLinejoin="round"
      />
      {/* Vertical edges */}
      <line x1={vertices.t1[0]} y1={vertices.t1[1]} x2={vertices.b1[0]} y2={vertices.b1[1]} stroke={color} strokeWidth={strokeWidth} />
      <line x1={vertices.t2[0]} y1={vertices.t2[1]} x2={vertices.b2[0]} y2={vertices.b2[1]} stroke={color} strokeWidth={strokeWidth} />
      <line x1={vertices.t3[0]} y1={vertices.t3[1]} x2={vertices.b3[0]} y2={vertices.b3[1]} stroke={color} strokeWidth={strokeWidth} />
      <line x1={vertices.t4[0]} y1={vertices.t4[1]} x2={vertices.b4[0]} y2={vertices.b4[1]} stroke={color} strokeWidth={strokeWidth} />
    </g>
  )
}

// Isometric grid on top face of cube
function IsoTopGrid({
  width,
  depth,
  cells,
  color,
  yOffset = 0,
  active = false,
}: {
  width: number
  depth: number
  cells: number
  color: string
  yOffset?: number
  active?: boolean
}) {
  const cos30 = 0.866
  const sin30 = 0.5
  const hw = width / 2
  const hd = depth / 2

  const project = (x: number, y: number): [number, number] => [
    (x - y) * cos30,
    (x + y) * sin30 + yOffset,
  ]

  const lines: JSX.Element[] = []
  const stepX = width / cells
  const stepY = depth / cells

  for (let i = 1; i < cells; i++) {
    const x = -hw + i * stepX
    const p1 = project(x, -hd)
    const p2 = project(x, hd)
    lines.push(
      <line
        key={`x${i}`}
        x1={p1[0].toFixed(1)}
        y1={p1[1].toFixed(1)}
        x2={p2[0].toFixed(1)}
        y2={p2[1].toFixed(1)}
        stroke={color}
        strokeWidth={active ? 0.6 : 0.3}
        opacity={active ? 0.4 : 0.2}
      />
    )
  }

  for (let i = 1; i < cells; i++) {
    const y = -hd + i * stepY
    const p1 = project(-hw, y)
    const p2 = project(hw, y)
    lines.push(
      <line
        key={`y${i}`}
        x1={p1[0].toFixed(1)}
        y1={p1[1].toFixed(1)}
        x2={p2[0].toFixed(1)}
        y2={p2[1].toFixed(1)}
        stroke={color}
        strokeWidth={active ? 0.6 : 0.3}
        opacity={active ? 0.4 : 0.2}
      />
    )
  }

  return <g>{lines}</g>
}

// Ground plane isometric grid
function IsoGrid({ size, cells }: { size: number; cells: number }) {
  const cos30 = 0.866
  const sin30 = 0.5
  const half = size / 2

  const project = (x: number, y: number): [number, number] => [
    (x - y) * cos30,
    (x + y) * sin30,
  ]

  const lines: JSX.Element[] = []
  const step = size / cells

  // Grid lines
  for (let i = 0; i <= cells; i++) {
    const pos = -half + i * step
    const isMajor = i % 5 === 0
    
    // X direction
    const x1 = project(pos, -half)
    const x2 = project(pos, half)
    lines.push(
      <line
        key={`gx${i}`}
        x1={x1[0].toFixed(1)}
        y1={x1[1].toFixed(1)}
        x2={x2[0].toFixed(1)}
        y2={x2[1].toFixed(1)}
        stroke="var(--foreground)"
        strokeWidth={isMajor ? 0.4 : 0.15}
        opacity={isMajor ? 0.15 : 0.08}
      />
    )
    
    // Y direction
    const y1 = project(-half, pos)
    const y2 = project(half, pos)
    lines.push(
      <line
        key={`gy${i}`}
        x1={y1[0].toFixed(1)}
        y1={y1[1].toFixed(1)}
        x2={y2[0].toFixed(1)}
        y2={y2[1].toFixed(1)}
        stroke="var(--foreground)"
        strokeWidth={isMajor ? 0.4 : 0.15}
        opacity={isMajor ? 0.15 : 0.08}
      />
    )
  }

  // Outline
  const corners = [
    project(-half, -half),
    project(half, -half),
    project(half, half),
    project(-half, half),
  ]
  
  lines.push(
    <polygon
      key="outline"
      points={corners.map((c) => `${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" ")}
      fill="none"
      stroke="var(--foreground)"
      strokeWidth="0.5"
      opacity="0.2"
    />
  )

  return <g>{lines}</g>
}

export default HeroCanvas

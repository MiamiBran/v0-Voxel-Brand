"use client"

import { useEffect, useState, useCallback } from "react"

// Color palette matching the movements
const FLOOR_COLORS = {
  F1: { stroke: "#E85D4C", glow: "#E85D4C", name: "CONSTRUCTIVISM" },
  F2: { stroke: "#4A90A4", glow: "#4A90A4", name: "DECONSTRUCTIVISM" },
  F3: { stroke: "#45B07C", glow: "#45B07C", name: "BRUTALISM" },
  F4: { stroke: "#F5C842", glow: "#F5C842", name: "METABOLISM" },
}

// Construction line colors
const LINE_COLORS = ["#00d4ff", "#ff0066", "#ffcc00", "#00ff88", "#ff00ff", "#6666ff"]

export function HeroCanvas() {
  const [mounted, setMounted] = useState(false)
  const [activeFloor, setActiveFloor] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [lineAnimOffset, setLineAnimOffset] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animate construction lines
  useEffect(() => {
    const interval = setInterval(() => {
      setLineAnimOffset((prev) => (prev + 0.5) % 20)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Parallax effect on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    setMousePos({ x, y })
  }, [])

  if (!mounted) {
    return (
      <section
        data-section="F0"
        className="relative w-full min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0a0e14" }}
      >
        <div className="text-white/20 font-mono text-sm">Initializing diagram...</div>
      </section>
    )
  }

  return (
    <section
      data-section="F0"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0a0e14" }}
      onMouseMove={handleMouseMove}
    >
      {/* SVG Filters for glow effects */}
      <svg className="absolute w-0 h-0">
        <defs>
          {Object.entries(FLOOR_COLORS).map(([floor, colors]) => (
            <filter key={floor} id={`glow-${floor}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feFlood floodColor={colors.glow} floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="coloredBlur" operator="in" result="coloredGlow" />
              <feMerge>
                <feMergeNode in="coloredGlow" />
                <feMergeNode in="coloredGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
          <filter id="glow-line" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Blueprint grid background with parallax */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          backgroundImage: `
            linear-gradient(rgba(40, 60, 90, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(40, 60, 90, 0.12) 1px, transparent 1px),
            linear-gradient(rgba(40, 60, 90, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(40, 60, 90, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 20px 20px, 100px 100px, 100px 100px",
        }}
      />

      {/* Floor markers on left edge - clickable */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 flex flex-col justify-center gap-24 md:gap-32 z-20">
        {(["F4", "F3", "F2", "F1"] as const).map((floor) => (
          <button
            key={floor}
            onClick={() => setActiveFloor(activeFloor === floor ? null : floor)}
            onMouseEnter={() => setActiveFloor(floor)}
            onMouseLeave={() => setActiveFloor(null)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span
              className="font-mono text-[10px] md:text-xs tracking-widest transition-all duration-300"
              style={{
                color: activeFloor === floor ? FLOOR_COLORS[floor].stroke : "rgba(80, 100, 140, 0.5)",
                textShadow: activeFloor === floor ? `0 0 10px ${FLOOR_COLORS[floor].glow}` : "none",
              }}
            >
              {floor}
            </span>
            <div
              className="h-px transition-all duration-300"
              style={{
                width: activeFloor === floor ? "60px" : "24px",
                backgroundColor: activeFloor === floor ? FLOOR_COLORS[floor].stroke : "rgba(80, 100, 140, 0.3)",
                boxShadow: activeFloor === floor ? `0 0 8px ${FLOOR_COLORS[floor].glow}` : "none",
              }}
            />
            {activeFloor === floor && (
              <span
                className="font-mono text-[8px] tracking-[0.2em] animate-pulse"
                style={{ color: FLOOR_COLORS[floor].stroke }}
              >
                {FLOOR_COLORS[floor].name}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main isometric tower - SVG with parallax */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        <svg
          viewBox="-400 -550 800 1100"
          className="w-full h-full max-w-5xl max-h-[95vh]"
          style={{ overflow: "visible" }}
        >
          {/* Animated construction lines radiating from center */}
          <g>
            {[
              { angle: -75, len: 480 },
              { angle: -50, len: 450 },
              { angle: -25, len: 420 },
              { angle: 5, len: 400 },
              { angle: 30, len: 440 },
              { angle: 55, len: 460 },
              { angle: 80, len: 430 },
              { angle: 105, len: 450 },
              { angle: -105, len: 420 },
              { angle: 130, len: 400 },
              { angle: -130, len: 380 },
            ].map((line, i) => {
              const rad = (line.angle * Math.PI) / 180
              const color = LINE_COLORS[i % LINE_COLORS.length]
              return (
                <line
                  key={i}
                  x1="0"
                  y1="-100"
                  x2={(Math.cos(rad) * line.len).toFixed(1)}
                  y2={(Math.sin(rad) * line.len - 100).toFixed(1)}
                  stroke={color}
                  strokeWidth="1.5"
                  strokeDasharray="8 12"
                  strokeDashoffset={lineAnimOffset}
                  opacity="0.6"
                  filter="url(#glow-line)"
                />
              )
            })}
          </g>

          {/* F1 - Base platform (Constructivism - Red/Orange) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setActiveFloor("F1")}
            onMouseLeave={() => setActiveFloor(null)}
            style={{ filter: activeFloor === "F1" ? "url(#glow-F1)" : "none" }}
          >
            <g transform="translate(0, 300)">
              <IsoCubeWireframe
                w={280}
                d={280}
                h={55}
                color={FLOOR_COLORS.F1.stroke}
                active={activeFloor === "F1"}
              />
              {/* Inner detail */}
              <IsoCubeWireframe
                w={200}
                d={200}
                h={35}
                color={FLOOR_COLORS.F1.stroke}
                yOffset={-12}
                active={activeFloor === "F1"}
              />
              {/* Grid cells */}
              <IsoGridCells w={280} d={280} cells={8} color={FLOOR_COLORS.F1.stroke} yOffset={-55} active={activeFloor === "F1"} />
            </g>
          </g>

          {/* Support pillars */}
          <g opacity="0.3">
            {[[-80, 200], [80, 200], [-80, 100], [80, 100]].map(([x, y], i) => (
              <line
                key={i}
                x1={x}
                y1={y}
                x2={x}
                y2={y + 100}
                stroke="#1a2535"
                strokeWidth="6"
              />
            ))}
          </g>

          {/* F2 - Lower structure (Deconstructivism - Blue) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setActiveFloor("F2")}
            onMouseLeave={() => setActiveFloor(null)}
            style={{ filter: activeFloor === "F2" ? "url(#glow-F2)" : "none" }}
          >
            <g transform="translate(0, 130)">
              <IsoCubeWireframe
                w={220}
                d={220}
                h={130}
                color={FLOOR_COLORS.F2.stroke}
                active={activeFloor === "F2"}
              />
              <IsoGridCells w={220} d={220} cells={7} color={FLOOR_COLORS.F2.stroke} yOffset={-130} active={activeFloor === "F2"} />
            </g>
          </g>

          {/* F3 - Mid section (Brutalism - Green) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setActiveFloor("F3")}
            onMouseLeave={() => setActiveFloor(null)}
            style={{ filter: activeFloor === "F3" ? "url(#glow-F3)" : "none" }}
          >
            <g transform="translate(0, -60)">
              <IsoCubeWireframe
                w={170}
                d={170}
                h={150}
                color={FLOOR_COLORS.F3.stroke}
                active={activeFloor === "F3"}
              />
              <IsoGridCells w={170} d={170} cells={5} color={FLOOR_COLORS.F3.stroke} yOffset={-150} active={activeFloor === "F3"} />
              {/* Central vertical element */}
              <rect
                x="-15"
                y="-110"
                width="30"
                height="110"
                fill="none"
                stroke={FLOOR_COLORS.F3.stroke}
                strokeWidth={activeFloor === "F3" ? "2" : "1.5"}
                opacity={activeFloor === "F3" ? 1 : 0.5}
              />
            </g>
          </g>

          {/* F4 - Top dome (Metabolism - Yellow) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setActiveFloor("F4")}
            onMouseLeave={() => setActiveFloor(null)}
            style={{ filter: activeFloor === "F4" ? "url(#glow-F4)" : "none" }}
          >
            <g transform="translate(0, -230)">
              <IsoDome color={FLOOR_COLORS.F4.stroke} active={activeFloor === "F4"} />
            </g>
          </g>

          {/* Ground shadow */}
          <ellipse
            cx="0"
            cy="400"
            rx="180"
            ry="70"
            fill="rgba(0, 0, 0, 0.5)"
          />
        </svg>
      </div>

      {/* Active floor info panel */}
      {activeFloor && (
        <div
          className="absolute top-8 right-8 z-30 border backdrop-blur-md px-5 py-4 transition-all duration-300"
          style={{
            borderColor: FLOOR_COLORS[activeFloor as keyof typeof FLOOR_COLORS].stroke,
            backgroundColor: "rgba(10, 14, 20, 0.9)",
            boxShadow: `0 0 30px ${FLOOR_COLORS[activeFloor as keyof typeof FLOOR_COLORS].glow}40`,
          }}
        >
          <div
            className="text-xs font-mono tracking-[0.3em] mb-1"
            style={{ color: FLOOR_COLORS[activeFloor as keyof typeof FLOOR_COLORS].stroke }}
          >
            {activeFloor}
          </div>
          <div className="text-sm font-mono text-white/80">
            {FLOOR_COLORS[activeFloor as keyof typeof FLOOR_COLORS].name}
          </div>
          <div className="text-[9px] font-mono text-white/30 mt-2 tracking-wider">
            ARCHITECTURAL MOVEMENT
          </div>
        </div>
      )}

      {/* Caption overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-20">
        <div className="border border-white/10 bg-black/80 backdrop-blur-sm px-6 py-4">
          <div className="text-sm md:text-base font-mono font-bold text-white tracking-wide">
            MONUMENT / TATLIN
          </div>
          <div className="text-[8px] md:text-[9px] font-mono text-white/40 mt-1 tracking-[0.25em]">
            CONSTRUCTIVIST DIAGRAM — ISOMETRIC 30°
          </div>
          <div className="flex gap-3 mt-3">
            {Object.entries(FLOOR_COLORS).map(([floor, colors]) => (
              <div key={floor} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2"
                  style={{
                    backgroundColor: colors.stroke,
                    boxShadow: `0 0 6px ${colors.glow}`,
                  }}
                />
                <span className="text-[7px] font-mono text-white/30">{floor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plate number */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 hidden md:block">
        <div className="text-right">
          <div className="text-[8px] font-mono text-white/20 tracking-[0.3em]">PLATE</div>
          <div className="text-xl font-mono text-white/50 font-bold">#01</div>
        </div>
      </div>

      {/* Interactive hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 md:hidden">
        <div className="text-[8px] font-mono text-white/20 tracking-[0.2em] animate-pulse">
          TAP FLOORS TO EXPLORE
        </div>
      </div>
    </section>
  )
}

// Isometric cube wireframe with hover support
function IsoCubeWireframe({
  w,
  d,
  h,
  color,
  yOffset = 0,
  active = false,
}: {
  w: number
  d: number
  h: number
  color: string
  yOffset?: number
  active?: boolean
}) {
  const cos30 = 0.866
  const sin30 = 0.5
  const hw = w / 2
  const hd = d / 2

  const proj = (x: number, y: number, z: number): [number, number] => [
    (x - y) * cos30,
    (x + y) * sin30 - z + yOffset,
  ]

  const v = {
    b1: proj(-hw, -hd, 0),
    b2: proj(hw, -hd, 0),
    b3: proj(hw, hd, 0),
    b4: proj(-hw, hd, 0),
    t1: proj(-hw, -hd, h),
    t2: proj(hw, -hd, h),
    t3: proj(hw, hd, h),
    t4: proj(-hw, hd, h),
  }

  const pt = (p: [number, number]) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`
  const strokeW = active ? "2.5" : "1.5"
  const opacity = active ? 1 : 0.7

  return (
    <g opacity={opacity}>
      {/* Top face */}
      <polygon
        points={`${pt(v.t1)} ${pt(v.t2)} ${pt(v.t3)} ${pt(v.t4)}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeW}
      />
      {/* Bottom face */}
      <polygon
        points={`${pt(v.b1)} ${pt(v.b2)} ${pt(v.b3)} ${pt(v.b4)}`}
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.25"
      />
      {/* Vertical edges */}
      <line x1={v.t1[0]} y1={v.t1[1]} x2={v.b1[0]} y2={v.b1[1]} stroke={color} strokeWidth={strokeW} />
      <line x1={v.t2[0]} y1={v.t2[1]} x2={v.b2[0]} y2={v.b2[1]} stroke={color} strokeWidth={strokeW} />
      <line x1={v.t3[0]} y1={v.t3[1]} x2={v.b3[0]} y2={v.b3[1]} stroke={color} strokeWidth={strokeW} />
      <line x1={v.t4[0]} y1={v.t4[1]} x2={v.b4[0]} y2={v.b4[1]} stroke={color} strokeWidth={strokeW} />
    </g>
  )
}

// Isometric grid cells on top of a cube
function IsoGridCells({
  w,
  d,
  cells,
  color,
  yOffset = 0,
  active = false,
}: {
  w: number
  d: number
  cells: number
  color: string
  yOffset?: number
  active?: boolean
}) {
  const cos30 = 0.866
  const sin30 = 0.5
  const hw = w / 2
  const hd = d / 2

  const proj = (x: number, y: number): [number, number] => [
    (x - y) * cos30,
    (x + y) * sin30 + yOffset,
  ]

  const lines: JSX.Element[] = []
  const step = w / cells
  const strokeW = active ? "0.8" : "0.4"
  const opacity = active ? 0.6 : 0.3

  for (let i = 0; i <= cells; i++) {
    const x = -hw + i * step
    const p1 = proj(x, -hd)
    const p2 = proj(x, hd)
    lines.push(
      <line
        key={`x${i}`}
        x1={p1[0].toFixed(1)}
        y1={p1[1].toFixed(1)}
        x2={p2[0].toFixed(1)}
        y2={p2[1].toFixed(1)}
        stroke={color}
        strokeWidth={strokeW}
        opacity={opacity}
      />
    )
  }

  for (let i = 0; i <= cells; i++) {
    const y = -hd + i * step
    const p1 = proj(-hw, y)
    const p2 = proj(hw, y)
    lines.push(
      <line
        key={`y${i}`}
        x1={p1[0].toFixed(1)}
        y1={p1[1].toFixed(1)}
        x2={p2[0].toFixed(1)}
        y2={p2[1].toFixed(1)}
        stroke={color}
        strokeWidth={strokeW}
        opacity={opacity}
      />
    )
  }

  return <g>{lines}</g>
}

// Isometric dome made of stacked octagonal rings
function IsoDome({ color, active = false }: { color: string; active?: boolean }) {
  const layers = [
    { y: 0, r: 75, h: 35 },
    { y: -35, r: 70, h: 35 },
    { y: -70, r: 60, h: 35 },
    { y: -105, r: 48, h: 40 },
    { y: -145, r: 32, h: 35 },
    { y: -180, r: 18, h: 25 },
  ]

  return (
    <g>
      {layers.map((layer, i) => (
        <IsoOctagonRing
          key={i}
          radius={layer.r}
          height={layer.h}
          yOffset={layer.y}
          color={color}
          active={active}
        />
      ))}
      {/* Top spire */}
      <line x1="0" y1="-205" x2="0" y2="-240" stroke={color} strokeWidth={active ? "3" : "2"} />
      <ellipse
        cx="0"
        cy={-205}
        rx={active ? 14 : 12}
        ry={active ? 7 : 6}
        fill="none"
        stroke={color}
        strokeWidth={active ? "2" : "1.5"}
      />
    </g>
  )
}

// Octagonal ring in isometric
function IsoOctagonRing({
  radius,
  height,
  yOffset,
  color,
  active = false,
}: {
  radius: number
  height: number
  yOffset: number
  color: string
  active?: boolean
}) {
  const cos30 = 0.866
  const sin30 = 0.5

  const topPts: [number, number][] = []
  const botPts: [number, number][] = []

  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 + Math.PI / 8
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const px = (x - y) * cos30
    const pyTop = (x + y) * sin30 + yOffset - height
    const pyBot = (x + y) * sin30 + yOffset
    topPts.push([px, pyTop])
    botPts.push([px, pyBot])
  }

  const toPath = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") + " Z"

  const strokeW = active ? "2" : "1.2"
  const opacity = active ? 1 : 0.7

  return (
    <g opacity={opacity}>
      <path d={toPath(topPts)} fill="none" stroke={color} strokeWidth={strokeW} />
      <path d={toPath(botPts)} fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {topPts.map((tp, i) => (
        <line
          key={i}
          x1={tp[0].toFixed(1)}
          y1={tp[1].toFixed(1)}
          x2={botPts[i][0].toFixed(1)}
          y2={botPts[i][1].toFixed(1)}
          stroke={color}
          strokeWidth={active ? "1.2" : "0.6"}
          opacity={active ? 0.7 : 0.4}
        />
      ))}
    </g>
  )
}

export default HeroCanvas

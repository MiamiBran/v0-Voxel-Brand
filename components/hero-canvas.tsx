"use client"

import { useEffect, useState } from "react"

// Isometric tower built with pure SVG - no external 3D libraries
// Matches the visual style: dark navy grid, magenta/yellow wireframe cubes, construction lines

export function HeroCanvas() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section
        data-section="F0"
        className="relative w-full min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0d1117" }}
      >
        <div className="text-white/20 font-mono text-sm">Loading...</div>
      </section>
    )
  }

  return (
    <section
      data-section="F0"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0d1117" }}
    >
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(60, 80, 120, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(60, 80, 120, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floor markers on left edge */}
      <div className="absolute left-6 md:left-10 top-0 bottom-0 flex flex-col justify-center gap-32 md:gap-40 z-10">
        {["F4", "F3", "F2", "F1"].map((floor, i) => (
          <div key={floor} className="flex items-center gap-3">
            <span
              className="font-mono text-[10px] md:text-xs tracking-widest"
              style={{ color: "rgba(80, 100, 140, 0.6)" }}
            >
              {floor}
            </span>
            <div
              className="w-6 md:w-10 h-px"
              style={{ backgroundColor: "rgba(80, 100, 140, 0.3)" }}
            />
          </div>
        ))}
      </div>

      {/* Main isometric tower - SVG */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="-350 -500 700 1000"
          className="w-full h-full max-w-4xl max-h-[90vh]"
          style={{ overflow: "visible" }}
        >
          {/* Construction lines radiating from center */}
          <g opacity="0.5">
            {[
              { angle: -70, color: "#00d4ff", len: 400 },
              { angle: -45, color: "#ff0066", len: 420 },
              { angle: -20, color: "#ff0066", len: 380 },
              { angle: 10, color: "#ffcc00", len: 350 },
              { angle: 35, color: "#00ff88", len: 390 },
              { angle: 60, color: "#00d4ff", len: 370 },
              { angle: 85, color: "#ff00ff", len: 360 },
              { angle: 110, color: "#6666ff", len: 400 },
              { angle: -100, color: "#ffcc00", len: 380 },
            ].map((line, i) => {
              const rad = (line.angle * Math.PI) / 180
              return (
                <line
                  key={i}
                  x1="0"
                  y1="-80"
                  x2={(Math.cos(rad) * line.len).toFixed(1)}
                  y2={(Math.sin(rad) * line.len - 80).toFixed(1)}
                  stroke={line.color}
                  strokeWidth="1.5"
                />
              )
            })}
          </g>

          {/* F1 - Base platform (magenta wireframe) */}
          <g transform="translate(0, 280)">
            <IsoCube w={260} d={260} h={50} color="#ff0066" />
            {/* Inner cutout detail */}
            <IsoCube w={180} d={180} h={30} color="#ff0066" yOffset={-10} />
          </g>

          {/* Support pillars */}
          <g opacity="0.4">
            {[[-70, 180], [70, 180], [-70, 80], [70, 80]].map(([x, y], i) => (
              <line
                key={i}
                x1={x}
                y1={y}
                x2={x}
                y2={y + 100}
                stroke="#2a3050"
                strokeWidth="4"
              />
            ))}
          </g>

          {/* F2 - Lower structure (magenta) */}
          <g transform="translate(0, 120)">
            <IsoCube w={200} d={200} h={120} color="#ff0066" />
            {/* Grid cells on top */}
            <IsoGrid w={200} d={200} cells={6} color="#ff0066" yOffset={-120} />
          </g>

          {/* F3 - Mid section (magenta + transition) */}
          <g transform="translate(0, -60)">
            <IsoCube w={160} d={160} h={140} color="#ff0066" />
            <IsoGrid w={160} d={160} cells={5} color="#ff0066" yOffset={-140} />
            {/* Central vertical element */}
            <rect
              x="-12"
              y="-100"
              width="24"
              height="100"
              fill="none"
              stroke="#ff0066"
              strokeWidth="1.5"
              opacity="0.6"
            />
          </g>

          {/* F4 - Top dome (yellow wireframe) */}
          <g transform="translate(0, -220)">
            {/* Stacked octagonal rings forming dome */}
            <IsoDome color="#ffcc00" />
          </g>

          {/* Ground shadow */}
          <ellipse
            cx="0"
            cy="380"
            rx="160"
            ry="60"
            fill="rgba(0, 0, 0, 0.4)"
          />
        </svg>
      </div>

      {/* Caption overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-10">
        <div className="border border-white/10 bg-black/70 backdrop-blur-sm px-5 py-3">
          <div className="text-xs md:text-sm font-mono font-bold text-white tracking-wide">
            MONUMENT / TATLIN
          </div>
          <div className="text-[8px] md:text-[9px] font-mono text-white/40 mt-1 tracking-[0.2em]">
            CONSTRUCTIVIST DIAGRAM — ISOMETRIC 30°
          </div>
        </div>
      </div>

      {/* Plate number */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10 hidden md:block">
        <div className="text-right">
          <div className="text-[8px] font-mono text-white/25 tracking-[0.3em]">PLATE</div>
          <div className="text-lg font-mono text-white/60 font-bold">#01</div>
        </div>
      </div>
    </section>
  )
}

// Isometric cube wireframe
function IsoCube({
  w,
  d,
  h,
  color,
  yOffset = 0,
}: {
  w: number
  d: number
  h: number
  color: string
  yOffset?: number
}) {
  // Isometric projection: 30° angles
  // x-axis goes right-down, y-axis goes left-down, z-axis goes up
  const cos30 = 0.866
  const sin30 = 0.5

  const hw = w / 2
  const hd = d / 2

  // Project a point: x goes right-down, y goes left-down, z goes up
  const proj = (x: number, y: number, z: number): [number, number] => [
    (x - y) * cos30,
    (x + y) * sin30 - z + yOffset,
  ]

  // 8 vertices of the cube
  const v = {
    // Bottom face
    b1: proj(-hw, -hd, 0),
    b2: proj(hw, -hd, 0),
    b3: proj(hw, hd, 0),
    b4: proj(-hw, hd, 0),
    // Top face
    t1: proj(-hw, -hd, h),
    t2: proj(hw, -hd, h),
    t3: proj(hw, hd, h),
    t4: proj(-hw, hd, h),
  }

  const pt = (p: [number, number]) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`

  return (
    <g>
      {/* Top face */}
      <polygon
        points={`${pt(v.t1)} ${pt(v.t2)} ${pt(v.t3)} ${pt(v.t4)}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Bottom face (partially visible) */}
      <polygon
        points={`${pt(v.b1)} ${pt(v.b2)} ${pt(v.b3)} ${pt(v.b4)}`}
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.3"
      />
      {/* Vertical edges */}
      <line x1={v.t1[0]} y1={v.t1[1]} x2={v.b1[0]} y2={v.b1[1]} stroke={color} strokeWidth="1.5" />
      <line x1={v.t2[0]} y1={v.t2[1]} x2={v.b2[0]} y2={v.b2[1]} stroke={color} strokeWidth="1.5" />
      <line x1={v.t3[0]} y1={v.t3[1]} x2={v.b3[0]} y2={v.b3[1]} stroke={color} strokeWidth="1.5" />
      <line x1={v.t4[0]} y1={v.t4[1]} x2={v.b4[0]} y2={v.b4[1]} stroke={color} strokeWidth="1.5" />
    </g>
  )
}

// Isometric grid on top of a cube
function IsoGrid({
  w,
  d,
  cells,
  color,
  yOffset = 0,
}: {
  w: number
  d: number
  cells: number
  color: string
  yOffset?: number
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

  // Lines along X axis
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
        strokeWidth="0.5"
        opacity="0.4"
      />
    )
  }

  // Lines along Y axis
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
        strokeWidth="0.5"
        opacity="0.4"
      />
    )
  }

  return <g>{lines}</g>
}

// Isometric dome made of stacked rings
function IsoDome({ color }: { color: string }) {
  const layers = [
    { y: 0, r: 70, h: 30 },
    { y: -30, r: 65, h: 30 },
    { y: -60, r: 55, h: 30 },
    { y: -90, r: 42, h: 35 },
    { y: -125, r: 25, h: 30 },
    { y: -155, r: 12, h: 20 },
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
        />
      ))}
      {/* Top cap */}
      <ellipse
        cx="0"
        cy={-180}
        rx="10"
        ry="5"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
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
}: {
  radius: number
  height: number
  yOffset: number
  color: string
}) {
  const cos30 = 0.866
  const sin30 = 0.5

  // Generate octagon vertices
  const topPts: [number, number][] = []
  const botPts: [number, number][] = []

  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 + Math.PI / 8
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    // Isometric projection
    const px = (x - y) * cos30
    const pyTop = (x + y) * sin30 + yOffset - height
    const pyBot = (x + y) * sin30 + yOffset
    topPts.push([px, pyTop])
    botPts.push([px, pyBot])
  }

  const toPath = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") + " Z"

  return (
    <g>
      {/* Top octagon */}
      <path d={toPath(topPts)} fill="none" stroke={color} strokeWidth="1.5" />
      {/* Bottom octagon */}
      <path d={toPath(botPts)} fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Vertical edges */}
      {topPts.map((tp, i) => (
        <line
          key={i}
          x1={tp[0].toFixed(1)}
          y1={tp[1].toFixed(1)}
          x2={botPts[i][0].toFixed(1)}
          y2={botPts[i][1].toFixed(1)}
          stroke={color}
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}
    </g>
  )
}

export default HeroCanvas

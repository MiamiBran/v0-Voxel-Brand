"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"
import { useTheme } from "next-themes"
import { useRotation } from "./portfolio-shell"
import { heroSectionContent } from "@/lib/site-content"

const DRAWING_LEVELS = heroSectionContent.drawingLevels

interface HeroSectionProps {
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

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const { isAutoRotating, toggleRotation, setRotationAngle } = useRotation()
  const { resolvedTheme } = useTheme()
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null)
  const [activeLevelIndex, setActiveLevelIndex] = useState<number | null>(null)
  const [defaultLevelId, setDefaultLevelId] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const animationRef = useRef<number | null>(null)
  const hasSettledRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  const isDark = mounted && resolvedTheme === "dark"
  
  // Get level color based on theme
  const getLevelColor = useCallback((level: typeof DRAWING_LEVELS[0]) => {
    return isDark ? level.darkColor : level.color
  }, [isDark])

  // Is any level active - triggers expansion
  const displayedLevelId = hoveredLevel ?? (activeLevelIndex !== null ? DRAWING_LEVELS[activeLevelIndex].id : defaultLevelId)
  const isHovering = displayedLevelId !== null

  // Sync rotation to parent context
  useEffect(() => {
    if (setRotationAngle) setRotationAngle(rotation)
  }, [rotation, setRotationAngle])

  // Continuous rotation animation
  useEffect(() => {
    if (!isAutoRotating) {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
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
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
    }
  }, [isAutoRotating])

  useEffect(() => {
    if (!mounted || hasSettledRef.current) return

    const timer = setTimeout(() => {
      setDefaultLevelId("F1")
      hasSettledRef.current = true
      if (isAutoRotating) toggleRotation()
    }, 2200)

    return () => clearTimeout(timer)
  }, [mounted, isAutoRotating, toggleRotation])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }, [])

  const handleLevelClick = (level: typeof DRAWING_LEVELS[0], index: number) => {
    setDefaultLevelId(level.id)
    setActiveLevelIndex(index)
    setTimeout(() => {
      if (onNavigate) onNavigate(level.section)
      setActiveLevelIndex(null)
    }, 400)
  }

  const activeLevelKeynote = displayedLevelId
    ? DRAWING_LEVELS.find((level) => level.id === displayedLevelId) ?? null
    : null

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

    // F3: Central tower (EXPERIMENTS)
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

  // Level Y positions - COMPACT stacking (closer together)
  const basePositions = [70, 20, -30, -80] // Tight stacking
  const expandedPositions = [100, 30, -40, -120] // Spread on hover
  
  const getLevelY = (index: number) => {
    return isHovering ? expandedPositions[index] : basePositions[index]
  }

  return (
    <section
      ref={containerRef}
      data-section="HERO"
      className="relative w-full min-h-[72vh] md:min-h-[78vh] flex items-center justify-center overflow-hidden pt-0 pb-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Level markers - left side */}
      <nav className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 md:gap-4">
        {[...DRAWING_LEVELS].reverse().map((level, i) => {
          const actualIndex = DRAWING_LEVELS.length - 1 - i
          const isActive = displayedLevelId === level.id
          return (
            <button
              key={level.id}
              onClick={() => handleLevelClick(level, actualIndex)}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(null)}
              onTouchStart={() => setHoveredLevel(level.id)}
              onTouchEnd={() => { handleLevelClick(level, actualIndex); setHoveredLevel(null) }}
              className="group flex items-center gap-2 text-left cursor-pointer min-h-[44px] min-w-[44px] touch-manipulation"
              style={{
                transform: mounted ? "translateX(0)" : "translateX(-20px)",
                opacity: mounted ? 1 : 0,
                transition: `all 0.4s ease ${i * 80 + 400}ms`,
              }}
            >
              <span
                className="text-[11px] font-mono tracking-[0.15em] transition-all duration-300 w-6"
                style={{
                  color: isActive ? getLevelColor(level) : "var(--foreground)",
                  opacity: isActive ? 1 : 0.4,
                  textShadow: isActive ? `0 0 12px ${getLevelColor(level)}` : "none",
                }}
              >
                {level.id}
              </span>
              <span
                className="h-px transition-all duration-300 ease-out hidden md:block"
                style={{
                  width: isActive ? 56 : 16,
                  backgroundColor: isActive ? getLevelColor(level) : "var(--border)",
                  boxShadow: isActive ? `0 0 8px ${getLevelColor(level)}` : "none",
                }}
              />
            </button>
          )
        })}
      </nav>

      {/* Main tower - LARGER */}
      <div
        className="relative w-full max-w-4xl mx-auto px-4 -mt-10 md:-mt-6"
        style={{
          transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 4 - 8}px)`,
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
            {DRAWING_LEVELS.map((level) => (
              <filter key={`glow-${level.id}`} id={`glow-${level.id}`} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor={getLevelColor(level)} floodOpacity="0.6" />
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
            onMouseEnter={() => setHoveredLevel("F1")}
            onMouseLeave={() => setHoveredLevel(null)}
            onClick={() => handleLevelClick(DRAWING_LEVELS[0], 0)}
            className="cursor-pointer"
            filter={displayedLevelId === "F1" ? "url(#glow-F1)" : undefined}
            style={{
              transform: `translateY(${getLevelY(0) - basePositions[0]}px)`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <rect x="-160" y={basePositions[0] - 30} width="320" height="100" fill="transparent" />
            <g transform={`translate(0, ${basePositions[0]})`}>
              {towerStructure.f1.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={getLevelColor(DRAWING_LEVELS[0])}
                  strokeWidth={displayedLevelId === "F1" ? 1.6 : 0.9}
                  opacity={displayedLevelId === "F1" ? 1 : 0.75}
                  scale={towerStructure.scale}
                  rotation={rotation}
                />
              ))}
            </g>
          </g>

          {/* F2: SYSTEMS */}
          <g
            onMouseEnter={() => setHoveredLevel("F2")}
            onMouseLeave={() => setHoveredLevel(null)}
            onClick={() => handleLevelClick(DRAWING_LEVELS[1], 1)}
            className="cursor-pointer"
            filter={displayedLevelId === "F2" ? "url(#glow-F2)" : undefined}
            style={{
              transform: `translateY(${getLevelY(1) - basePositions[1]}px)`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <rect x="-140" y={basePositions[1] - 30} width="280" height="90" fill="transparent" />
            <g transform={`translate(0, ${basePositions[1]})`}>
              {towerStructure.f2.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={getLevelColor(DRAWING_LEVELS[1])}
                  strokeWidth={displayedLevelId === "F2" ? 1.6 : 0.9}
                  opacity={displayedLevelId === "F2" ? 1 : 0.75}
                  scale={towerStructure.scale}
                  rotation={rotation}
                />
              ))}
            </g>
          </g>

          {/* F3: BUILDS */}
          <g
            onMouseEnter={() => setHoveredLevel("F3")}
            onMouseLeave={() => setHoveredLevel(null)}
            onClick={() => handleLevelClick(DRAWING_LEVELS[2], 2)}
            className="cursor-pointer"
            filter={displayedLevelId === "F3" ? "url(#glow-F3)" : undefined}
            style={{
              transform: `translateY(${getLevelY(2) - basePositions[2]}px)`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <rect x="-120" y={basePositions[2] - 30} width="240" height="80" fill="transparent" />
            <g transform={`translate(0, ${basePositions[2]})`}>
              {towerStructure.f3.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={getLevelColor(DRAWING_LEVELS[2])}
                  strokeWidth={displayedLevelId === "F3" ? 1.6 : 0.9}
                  opacity={displayedLevelId === "F3" ? 1 : 0.75}
                  scale={towerStructure.scale}
                  rotation={rotation}
                />
              ))}
            </g>
          </g>

          {/* F4: CONTACT */}
          <g
            onMouseEnter={() => setHoveredLevel("F4")}
            onMouseLeave={() => setHoveredLevel(null)}
            onClick={() => handleLevelClick(DRAWING_LEVELS[3], 3)}
            className="cursor-pointer"
            filter={displayedLevelId === "F4" ? "url(#glow-F4)" : undefined}
            style={{
              transform: `translateY(${getLevelY(3) - basePositions[3]}px)`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <rect x="-80" y={basePositions[3] - 30} width="160" height="80" fill="transparent" />
            <g transform={`translate(0, ${basePositions[3]})`}>
              {towerStructure.f4.map((c, i) => (
                <IsoCube
                  key={i}
                  x={c.x} y={c.y} z={c.z}
                  color={getLevelColor(DRAWING_LEVELS[3])}
                  strokeWidth={displayedLevelId === "F4" ? 1.6 : 0.9}
                  opacity={displayedLevelId === "F4" ? 1 : 0.75}
                  scale={towerStructure.scale}
                  rotation={rotation}
                />
              ))}
            </g>
          </g>

        </svg>
      </div>

      {activeLevelKeynote ? (
        <div
          className={`absolute left-4 right-4 top-5 z-20 transition-all duration-300 md:left-auto md:right-10 md:top-1/2 md:w-72 md:-translate-y-1/2 ${
            activeLevelKeynote ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="space-y-3">
            <div
              className="bg-background/90 backdrop-blur-sm border-l-2 pl-3 pr-3 py-2 shadow-[8px_8px_0_rgba(0,0,0,0.05)]"
              style={{ borderColor: getLevelColor(activeLevelKeynote) }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2"
                  style={{
                    backgroundColor: getLevelColor(activeLevelKeynote),
                    boxShadow: `0 0 6px ${getLevelColor(activeLevelKeynote)}`,
                  }}
                />
                <span
                  className="text-[8px] font-mono tracking-[0.2em]"
                  style={{ color: getLevelColor(activeLevelKeynote) }}
                >
                  {activeLevelKeynote.id}
                </span>
              </div>
              <div
                className="text-xs font-mono font-bold tracking-wide"
                style={{ color: getLevelColor(activeLevelKeynote) }}
              >
                {activeLevelKeynote.label}
              </div>
              <div className="text-[8px] font-mono text-foreground/62 mt-1 leading-relaxed">
                {activeLevelKeynote.legend}
              </div>
            </div>

            <div className="border border-border bg-background/92 backdrop-blur-sm shadow-[8px_8px_0_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
                <span className="text-[8px] font-mono text-foreground/45 tracking-[0.2em]">
                  KEY NOTE
                </span>
                <span
                  className="text-[8px] font-mono tracking-[0.2em]"
                  style={{ color: getLevelColor(activeLevelKeynote) }}
                >
                  {activeLevelKeynote.id}
                </span>
              </div>

              <div className="space-y-2 px-3 py-3">
                <div
                  className="text-[10px] font-mono font-bold tracking-[0.08em]"
                  style={{ color: getLevelColor(activeLevelKeynote) }}
                >
                  {activeLevelKeynote.keynote.title}
                </div>
                <p className="text-[9px] font-mono leading-relaxed text-foreground/62">
                  {activeLevelKeynote.keynote.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Bottom legend */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-1 md:gap-3"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s ease 0.5s",
        }}
      >
        {DRAWING_LEVELS.map((level, i) => (
          <button
            key={level.id}
            onClick={() => handleLevelClick(level, i)}
            onMouseEnter={() => setHoveredLevel(level.id)}
            onMouseLeave={() => setHoveredLevel(null)}
            className="flex items-center gap-1.5 group cursor-pointer px-2 py-2 min-h-[44px] touch-manipulation"
          >
            <div
              className="w-2.5 h-2.5 md:w-2 md:h-2 border transition-all duration-200"
              style={{
                borderColor: getLevelColor(level),
                backgroundColor: displayedLevelId === level.id ? getLevelColor(level) : "transparent",
                boxShadow: displayedLevelId === level.id ? `0 0 8px ${getLevelColor(level)}` : "none",
              }}
            />
            <span
              className="text-[8px] md:text-[7px] font-mono tracking-[0.1em] transition-all duration-200"
              style={{
                color: displayedLevelId === level.id ? getLevelColor(level) : "var(--foreground)",
                opacity: displayedLevelId === level.id ? 1 : 0.45,
              }}
            >
              {level.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

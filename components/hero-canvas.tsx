"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrthographicCamera, Line, Text } from "@react-three/drei"
import * as THREE from "three"

// Wireframe box component - creates the cube outlines like in the artwork
function WireframeBox({ 
  position, 
  size, 
  color 
}: { 
  position: [number, number, number]
  size: [number, number, number]
  color: string 
}) {
  const edges = useMemo(() => {
    const geo = new THREE.BoxGeometry(...size)
    return new THREE.EdgesGeometry(geo)
  }, [size])

  return (
    <lineSegments position={position}>
      <primitive object={edges} attach="geometry" />
      <lineBasicMaterial color={color} linewidth={1} />
    </lineSegments>
  )
}

// Grid of wireframe cubes forming a floor/platform
function WireframeGrid({ 
  position, 
  gridSize, 
  cubeSize, 
  color,
  pattern = "full"
}: { 
  position: [number, number, number]
  gridSize: [number, number]
  cubeSize: number
  color: string
  pattern?: "full" | "ring" | "cross" | "dome"
}) {
  const cubes = useMemo(() => {
    const result: [number, number, number][] = []
    const [cols, rows] = gridSize
    const halfCols = Math.floor(cols / 2)
    const halfRows = Math.floor(rows / 2)

    for (let x = -halfCols; x <= halfCols; x++) {
      for (let z = -halfRows; z <= halfRows; z++) {
        const dist = Math.sqrt(x * x + z * z)
        const maxDist = Math.max(halfCols, halfRows)
        
        let include = false
        if (pattern === "full") {
          include = true
        } else if (pattern === "ring") {
          include = dist >= maxDist - 1.5
        } else if (pattern === "cross") {
          include = Math.abs(x) <= 1 || Math.abs(z) <= 1
        } else if (pattern === "dome") {
          include = dist <= maxDist * 0.8
        }
        
        if (include) {
          result.push([x * cubeSize, 0, z * cubeSize])
        }
      }
    }
    return result
  }, [gridSize, cubeSize, pattern])

  return (
    <group position={position}>
      {cubes.map((pos, i) => (
        <WireframeBox 
          key={i} 
          position={pos} 
          size={[cubeSize * 0.95, cubeSize * 0.95, cubeSize * 0.95]} 
          color={color} 
        />
      ))}
    </group>
  )
}

// Construction lines radiating from center
function ConstructionLines({ y }: { y: number }) {
  const lines = useMemo(() => {
    const colors = ["#00ffff", "#ff00ff", "#ffff00", "#ff4444", "#4444ff", "#00ff88"]
    return colors.map((color, i) => {
      const angle = (i / colors.length) * Math.PI * 2 + Math.PI / 6
      const length = 8 + Math.random() * 6
      const endY = y + (Math.random() - 0.3) * 8
      return {
        points: [
          new THREE.Vector3(0, y, 0),
          new THREE.Vector3(Math.cos(angle) * length, endY, Math.sin(angle) * length)
        ],
        color
      }
    })
  }, [y])

  return (
    <>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          color={line.color}
          lineWidth={1}
          opacity={0.6}
          transparent
        />
      ))}
    </>
  )
}

// Blueprint grid on the ground plane
function BlueprintGrid() {
  const gridLines = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3 }[] = []
    const size = 20
    const divisions = 40
    const step = size / divisions

    for (let i = -divisions / 2; i <= divisions / 2; i++) {
      const pos = i * step
      // X lines
      lines.push({
        start: new THREE.Vector3(-size / 2, -0.01, pos),
        end: new THREE.Vector3(size / 2, -0.01, pos)
      })
      // Z lines
      lines.push({
        start: new THREE.Vector3(pos, -0.01, -size / 2),
        end: new THREE.Vector3(pos, -0.01, size / 2)
      })
    }
    return lines
  }, [])

  return (
    <>
      {gridLines.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color="#1a2744"
          lineWidth={0.5}
          opacity={0.5}
          transparent
        />
      ))}
    </>
  )
}

// Floor markers along the left side
function FloorMarkers() {
  const floors = [
    { label: "F1", y: 0 },
    { label: "F2", y: 1.2 },
    { label: "F3", y: 2.8 },
    { label: "F4", y: 4.5 },
  ]

  return (
    <>
      {floors.map((floor) => (
        <group key={floor.label} position={[-7, floor.y, 0]}>
          <Text
            fontSize={0.3}
            color="#3a4a6a"
            anchorX="right"
            anchorY="middle"
            font="/fonts/GeistMono-Regular.ttf"
          >
            {floor.label}
          </Text>
          <Line
            points={[
              new THREE.Vector3(0.2, 0, 0),
              new THREE.Vector3(1.5, 0, 0)
            ]}
            color="#2a3a5a"
            lineWidth={0.5}
            opacity={0.4}
            transparent
          />
        </group>
      ))}
    </>
  )
}

// The main tower structure
function Tower() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle float animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* F1 - Base platform: wide ring of magenta cubes */}
      <WireframeGrid
        position={[0, 0, 0]}
        gridSize={[9, 9]}
        cubeSize={0.4}
        color="#ff1493"
        pattern="ring"
      />
      
      {/* F1 - Inner base structure */}
      <WireframeGrid
        position={[0, 0.4, 0]}
        gridSize={[7, 7]}
        cubeSize={0.4}
        color="#ff1493"
        pattern="full"
      />

      {/* F2 - Stepped middle section */}
      <WireframeGrid
        position={[0, 1.2, 0]}
        gridSize={[5, 5]}
        cubeSize={0.4}
        color="#ff1493"
        pattern="full"
      />
      
      {/* F2 - Upper step */}
      <WireframeGrid
        position={[0, 1.6, 0]}
        gridSize={[4, 4]}
        cubeSize={0.4}
        color="#ff1493"
        pattern="ring"
      />

      {/* F3 - Transition section - mixed colors */}
      <WireframeGrid
        position={[0, 2.4, 0]}
        gridSize={[5, 5]}
        cubeSize={0.35}
        color="#ff1493"
        pattern="cross"
      />
      
      {/* F3 - Yellow emerging */}
      <WireframeGrid
        position={[0, 2.8, 0]}
        gridSize={[4, 4]}
        cubeSize={0.35}
        color="#ffd700"
        pattern="full"
      />

      {/* F4 - Yellow dome top */}
      <WireframeGrid
        position={[0, 3.4, 0]}
        gridSize={[5, 5]}
        cubeSize={0.35}
        color="#ffd700"
        pattern="dome"
      />
      
      {/* F4 - Crown */}
      <WireframeGrid
        position={[0, 3.9, 0]}
        gridSize={[4, 4]}
        cubeSize={0.3}
        color="#ffd700"
        pattern="dome"
      />
      
      {/* F4 - Peak */}
      <WireframeGrid
        position={[0, 4.3, 0]}
        gridSize={[3, 3]}
        cubeSize={0.25}
        color="#ffd700"
        pattern="dome"
      />
      
      {/* F4 - Tip */}
      <WireframeGrid
        position={[0, 4.6, 0]}
        gridSize={[2, 2]}
        cubeSize={0.2}
        color="#ffd700"
        pattern="full"
      />

      {/* Vertical support pillars */}
      {[[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].map(([x, z], i) => (
        <Line
          key={i}
          points={[
            new THREE.Vector3(x, 0.4, z),
            new THREE.Vector3(x, 2.4, z)
          ]}
          color="#2a2a4a"
          lineWidth={1}
          opacity={0.5}
          transparent
        />
      ))}

      {/* Construction lines from the tower */}
      <ConstructionLines y={3.5} />
    </group>
  )
}

// Scene component with camera and lighting
function Scene() {
  return (
    <>
      {/* Isometric camera - true isometric angle */}
      <OrthographicCamera
        makeDefault
        position={[10, 8, 10]}
        zoom={55}
        near={0.1}
        far={100}
      />
      
      {/* Minimal lighting for wireframe visibility */}
      <ambientLight intensity={1} />
      
      {/* Blueprint grid floor */}
      <BlueprintGrid />
      
      {/* Floor markers */}
      <FloorMarkers />
      
      {/* The main tower */}
      <Tower />
    </>
  )
}

export function HeroCanvas() {
  return (
    <section
      className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center"
      data-section="HERO"
    >
      {/* Dark blueprint background */}
      <div className="absolute inset-0 bg-[#0a0f1a]" />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Canvas
            gl={{ antialias: true, alpha: false }}
            dpr={[1, 2]}
          >
            <color attach="background" args={["#0a0f1a"]} />
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Caption overlay */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
        <div className="border border-white/10 bg-black/60 backdrop-blur-sm px-4 py-3">
          <div className="text-xs md:text-sm font-mono font-bold text-white tracking-wide">
            MONUMENT / TATLIN
          </div>
          <div className="text-[8px] md:text-[9px] font-mono text-white/50 mt-0.5 tracking-[0.15em]">
            CONSTRUCTIVIST DIAGRAM -- 4F TOWER
          </div>
        </div>
      </div>

      {/* Plate number */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10">
        <div className="text-right">
          <div className="text-[7px] font-mono text-white/30 tracking-widest">PLATE</div>
          <div className="text-sm font-mono text-white/70 font-bold">#01</div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// Custom orthographic camera setup
function IsometricCamera() {
  const { camera, size } = useThree()
  
  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      const aspect = size.width / size.height
      const frustumSize = 10
      camera.left = -frustumSize * aspect
      camera.right = frustumSize * aspect
      camera.top = frustumSize
      camera.bottom = -frustumSize
      camera.position.set(10, 8, 10)
      camera.lookAt(0, 2, 0)
      camera.updateProjectionMatrix()
    }
  }, [camera, size])

  return null
}

// Wireframe box component
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
      <lineBasicMaterial color={color} />
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

// Simple line component using BufferGeometry
function SimpleLine({ 
  start, 
  end, 
  color, 
  opacity = 1 
}: { 
  start: [number, number, number]
  end: [number, number, number]
  color: string
  opacity?: number
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array([...start, ...end])
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geo
  }, [start, end])

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  )
}

// Construction lines radiating from center
function ConstructionLines({ y }: { y: number }) {
  const lines = useMemo(() => {
    const colors = ["#00ffff", "#ff00ff", "#ffff00", "#ff4444", "#4444ff", "#00ff88"]
    return colors.map((color, i) => {
      const angle = (i / colors.length) * Math.PI * 2 + Math.PI / 6
      const length = 8 + (i % 3) * 2
      const endY = y + ((i % 4) - 1.5) * 3
      return {
        start: [0, y, 0] as [number, number, number],
        end: [Math.cos(angle) * length, endY, Math.sin(angle) * length] as [number, number, number],
        color
      }
    })
  }, [y])

  return (
    <>
      {lines.map((line, i) => (
        <SimpleLine
          key={i}
          start={line.start}
          end={line.end}
          color={line.color}
          opacity={0.7}
        />
      ))}
    </>
  )
}

// Blueprint grid on the ground plane
function BlueprintGrid() {
  const gridLines = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number] }[] = []
    const size = 20
    const divisions = 40
    const step = size / divisions

    for (let i = -divisions / 2; i <= divisions / 2; i++) {
      const pos = i * step
      lines.push({
        start: [-size / 2, -0.01, pos],
        end: [size / 2, -0.01, pos]
      })
      lines.push({
        start: [pos, -0.01, -size / 2],
        end: [pos, -0.01, size / 2]
      })
    }
    return lines
  }, [])

  return (
    <>
      {gridLines.map((line, i) => (
        <SimpleLine
          key={i}
          start={line.start}
          end={line.end}
          color="#1a2744"
          opacity={0.5}
        />
      ))}
    </>
  )
}

// The main tower structure
function Tower() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* F1 - Base platform */}
      <WireframeGrid
        position={[0, 0, 0]}
        gridSize={[9, 9]}
        cubeSize={0.4}
        color="#ff1493"
        pattern="ring"
      />
      
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
      
      <WireframeGrid
        position={[0, 1.6, 0]}
        gridSize={[4, 4]}
        cubeSize={0.4}
        color="#ff1493"
        pattern="ring"
      />

      {/* F3 - Transition section */}
      <WireframeGrid
        position={[0, 2.4, 0]}
        gridSize={[5, 5]}
        cubeSize={0.35}
        color="#ff1493"
        pattern="cross"
      />
      
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
      
      <WireframeGrid
        position={[0, 3.9, 0]}
        gridSize={[4, 4]}
        cubeSize={0.3}
        color="#ffd700"
        pattern="dome"
      />
      
      <WireframeGrid
        position={[0, 4.3, 0]}
        gridSize={[3, 3]}
        cubeSize={0.25}
        color="#ffd700"
        pattern="dome"
      />
      
      <WireframeGrid
        position={[0, 4.6, 0]}
        gridSize={[2, 2]}
        cubeSize={0.2}
        color="#ffd700"
        pattern="full"
      />

      {/* Vertical support pillars */}
      {[[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].map(([x, z], i) => (
        <SimpleLine
          key={i}
          start={[x, 0.4, z]}
          end={[x, 2.4, z]}
          color="#2a2a4a"
          opacity={0.5}
        />
      ))}

      {/* Construction lines */}
      <ConstructionLines y={3.5} />
    </group>
  )
}

// Scene component
function Scene() {
  return (
    <>
      <IsometricCamera />
      <ambientLight intensity={1} />
      <BlueprintGrid />
      <Tower />
    </>
  )
}

export function IsometricTowerScene() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 55, position: [10, 8, 10], near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      style={{ background: "#0a0f1a" }}
    >
      <color attach="background" args={["#0a0f1a"]} />
      <Scene />
    </Canvas>
  )
}

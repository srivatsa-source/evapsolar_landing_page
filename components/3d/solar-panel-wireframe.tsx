"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function SolarPanel({
  position,
  delay,
}: {
  position: [number, number, number]
  delay: number
}) {
  const groupRef = useRef<THREE.Group>(null)

  const frameEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.4, 0.9)),
    []
  )

  const cellLines = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pts: number[] = []
    // 3 horizontal dividers → 4 rows
    for (let i = 1; i <= 3; i++) {
      const y = -0.45 + (0.9 / 4) * i
      pts.push(-0.7, y, 0.001, 0.7, y, 0.001)
    }
    // 5 vertical dividers → 6 columns
    for (let j = 1; j <= 5; j++) {
      const x = -0.7 + (1.4 / 6) * j
      pts.push(x, -0.45, 0.001, x, 0.45, 0.001)
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime + delay
    groupRef.current.position.y = position[1] + Math.sin(t * 0.38) * 0.1
    groupRef.current.rotation.z = Math.sin(t * 0.18 + 1.2) * 0.018
  })

  return (
    <group ref={groupRef} position={position}>
      <lineSegments geometry={frameEdges}>
        <lineBasicMaterial color="#c8d8f0" opacity={0.3} transparent />
      </lineSegments>
      <lineSegments geometry={cellLines}>
        <lineBasicMaterial color="#90b8e0" opacity={0.14} transparent />
      </lineSegments>
    </group>
  )
}

function SolarGrid({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null)

  const panels = useMemo(() => {
    const items: { position: [number, number, number]; delay: number }[] = []
    const cols = 7
    const rows = 4
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        items.push({
          position: [
            (c - (cols - 1) / 2) * 1.72,
            (r - (rows - 1) / 2) * 1.12,
            0,
          ],
          delay: (r * cols + c) * 0.22,
        })
      }
    }
    return items
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -0.42 + mouseY * 0.06,
      0.04
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      0.18 + mouseX * 0.06,
      0.04
    )
  })

  return (
    <group ref={groupRef} rotation={[-0.42, 0.18, 0]}>
      {panels.map((p, i) => (
        <SolarPanel key={i} position={p.position} delay={p.delay} />
      ))}
    </group>
  )
}

export function SolarPanelWireframe() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener("mousemove", handler, { passive: true })
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SolarGrid mouseX={mouse.x} mouseY={mouse.y} />
      </Canvas>
    </div>
  )
}

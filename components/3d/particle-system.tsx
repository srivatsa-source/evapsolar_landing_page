"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

interface ParticleSystemProps {
  count?: number
  mousePosition: { x: number; y: number }
}

export function ParticleSystem({ count = 1000, mousePosition }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere around the sculpture
      const radius = 5 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // White particles with slight blue tint
      colors[i * 3] = 0.8 + Math.random() * 0.2
      colors[i * 3 + 1] = 0.9 + Math.random() * 0.1
      colors[i * 3 + 2] = 1
    }

    return [positions, colors]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return

    // Gentle rotation influenced by mouse
    pointsRef.current.rotation.x += 0.001 + mousePosition.y * 0.0005
    pointsRef.current.rotation.y += 0.002 + mousePosition.x * 0.0005

    // Subtle pulsing effect
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    pointsRef.current.scale.setScalar(scale)
  })

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial size={0.02} vertexColors transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </Points>
  )
}

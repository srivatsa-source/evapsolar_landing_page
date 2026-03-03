"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Fog } from "three"
import { useThree } from "@react-three/fiber"
import type * as THREE from "three"

export function EnvironmentEffects() {
  const { scene } = useThree()

  // Add volumetric fog
  scene.fog = new Fog("#000000", 5, 20)

  return null
}

// Animated background gradient plane
export function BackgroundGradient() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    // Subtle movement for depth
    meshRef.current.position.z = -10 + Math.sin(time * 0.1) * 0.5
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#0a0a0a" transparent opacity={0.8} />
    </mesh>
  )
}

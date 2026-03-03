"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function SceneLighting() {
  const directionalRef = useRef<THREE.DirectionalLight>(null)

  useFrame((state) => {
    if (!directionalRef.current) return

    directionalRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 3
    directionalRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 3
  })

  return (
    <>
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Main directional light for wireframes */}
      <directionalLight ref={directionalRef} position={[5, 5, 5]} intensity={0.8} color="#ffffff" />

      <pointLight position={[-3, -3, -3]} intensity={0.3} color="#ffffff" />
      <pointLight position={[3, -3, 3]} intensity={0.2} color="#ffffff" />
    </>
  )
}

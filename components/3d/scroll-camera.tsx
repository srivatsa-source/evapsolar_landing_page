"use client"

import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import * as THREE from "three"

interface ScrollCameraProps {
  mousePosition: { x: number; y: number }
}

export function ScrollCamera({ mousePosition }: ScrollCameraProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const { scrollProgress } = useScrollAnimation()
  const { set } = useThree()

  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current })
    }
  }, [set])

  useFrame((state) => {
    if (!cameraRef.current) return

    const time = state.clock.elapsedTime

    // Base camera position
    const baseZ = 8
    const baseY = 0
    const baseX = 0

    // Scroll-based camera movement
    const scrollZ = baseZ - scrollProgress * 3 // Move closer as user scrolls
    const scrollY = baseY + scrollProgress * 2 // Move up as user scrolls
    const scrollX = baseX + Math.sin(scrollProgress * Math.PI) * 1 // Subtle arc movement

    // Mouse parallax effect
    const mouseX = mousePosition.x * 0.5
    const mouseY = mousePosition.y * 0.3

    // Combine all movements with smooth interpolation
    const targetX = scrollX + mouseX
    const targetY = scrollY + mouseY
    const targetZ = scrollZ

    // Smooth camera movement
    cameraRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05)

    // Dynamic camera rotation based on scroll and mouse
    const rotationX = -mousePosition.y * 0.1 + Math.sin(scrollProgress * Math.PI * 2) * 0.05
    const rotationY = mousePosition.x * 0.1 + scrollProgress * 0.2
    const rotationZ = Math.sin(time * 0.1) * 0.02

    cameraRef.current.rotation.x = THREE.MathUtils.lerp(cameraRef.current.rotation.x, rotationX, 0.05)
    cameraRef.current.rotation.y = THREE.MathUtils.lerp(cameraRef.current.rotation.y, rotationY, 0.05)
    cameraRef.current.rotation.z = THREE.MathUtils.lerp(cameraRef.current.rotation.z, rotationZ, 0.05)

    // Dynamic field of view based on scroll
    const targetFov = 60 + scrollProgress * 20 // Wider FOV as user scrolls
    cameraRef.current.fov = THREE.MathUtils.lerp(cameraRef.current.fov, targetFov, 0.02)
    cameraRef.current.updateProjectionMatrix()

    // Look at target that moves with scroll
    const lookAtTarget = new THREE.Vector3(Math.sin(scrollProgress * Math.PI) * 0.5, scrollProgress * 0.5, 0)
    cameraRef.current.lookAt(lookAtTarget)
  })

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 8]} fov={60} near={0.1} far={100} />
}

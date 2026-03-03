"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere, Box, Octahedron } from "@react-three/drei"
import * as THREE from "three"

interface AbstractSculptureProps {
  mousePosition: { x: number; y: number }
  scrollProgress: number
  variant?: "sphere" | "cube" | "octahedron" | "morphing"
}

export function AbstractSculpture({ mousePosition, scrollProgress, variant = "morphing" }: AbstractSculptureProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  const [currentVariant, setCurrentVariant] = useState(0)

  // Create multiple geometries for morphing effect
  const geometries = useMemo(
    () => [
      new THREE.IcosahedronGeometry(1, 4),
      new THREE.BoxGeometry(1.5, 1.5, 1.5, 8, 8, 8),
      new THREE.OctahedronGeometry(1.2, 3),
      new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16),
    ],
    [],
  )

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return

    const time = state.clock.elapsedTime

    // Continuous rotation with mouse influence
    meshRef.current.rotation.x += 0.005 + mousePosition.y * 0.002
    meshRef.current.rotation.y += 0.008 + mousePosition.x * 0.002
    meshRef.current.rotation.z += 0.003

    // Scroll-based scaling and position
    const scale = 1 + scrollProgress * 0.3 + Math.sin(time * 0.5) * 0.1
    meshRef.current.scale.setScalar(scale)

    // Dynamic position based on scroll
    meshRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 0.5

    // Dynamic material properties
    materialRef.current.distort = 0.4 + Math.sin(time * 0.8) * 0.2 + mousePosition.x * 0.1
    materialRef.current.speed = 1.5 + mousePosition.y * 1.5

    // Color morphing based on time and interaction
    const hue = (time * 0.1 + scrollProgress * 0.5) % 1
    const saturation = 0.3 + mousePosition.x * 0.3
    const lightness = 0.8 + mousePosition.y * 0.2

    materialRef.current.color.setHSL(hue, saturation, lightness)

    // Geometry morphing for "morphing" variant
    if (variant === "morphing" && Math.floor(time * 0.2) !== currentVariant) {
      setCurrentVariant(Math.floor(time * 0.2) % geometries.length)
    }
  })

  const renderGeometry = () => {
    switch (variant) {
      case "sphere":
        return <Sphere ref={meshRef} args={[1, 64, 64]} />
      case "cube":
        return <Box ref={meshRef} args={[1.5, 1.5, 1.5]} />
      case "octahedron":
        return <Octahedron ref={meshRef} args={[1.2]} />
      case "morphing":
      default:
        return <mesh ref={meshRef} geometry={geometries[currentVariant]} />
    }
  }

  return (
    <group>
      {renderGeometry()}
      <MeshDistortMaterial
        ref={materialRef}
        color="#ffffff"
        metalness={0.9}
        roughness={0.1}
        distort={0.4}
        speed={1.5}
        transparent
        opacity={0.95}
        envMapIntensity={1}
      />
    </group>
  )
}

// Secondary floating sculptures for depth
export function FloatingSculptures({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const group1Ref = useRef<THREE.Group>(null)
  const group2Ref = useRef<THREE.Group>(null)
  const group3Ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (group1Ref.current) {
      group1Ref.current.position.x = Math.sin(time * 0.3) * 3 + mousePosition.x * 0.5
      group1Ref.current.position.y = Math.cos(time * 0.4) * 2
      group1Ref.current.rotation.y += 0.01
    }

    if (group2Ref.current) {
      group2Ref.current.position.x = Math.cos(time * 0.2) * -4 - mousePosition.x * 0.3
      group2Ref.current.position.z = Math.sin(time * 0.5) * 2
      group2Ref.current.rotation.x += 0.008
    }

    if (group3Ref.current) {
      group3Ref.current.position.y = Math.sin(time * 0.6) * 1.5 + mousePosition.y * 0.4
      group3Ref.current.position.z = Math.cos(time * 0.3) * -3
      group3Ref.current.rotation.z += 0.012
    }
  })

  return (
    <>
      <group ref={group1Ref} position={[3, 0, -2]}>
        <Octahedron args={[0.3]}>
          <meshStandardMaterial color="#4a90e2" metalness={0.8} roughness={0.2} transparent opacity={0.7} />
        </Octahedron>
      </group>

      <group ref={group2Ref} position={[-4, 1, 2]}>
        <Box args={[0.4, 0.4, 0.4]}>
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} transparent opacity={0.6} />
        </Box>
      </group>

      <group ref={group3Ref} position={[0, 1.5, -3]}>
        <Sphere args={[0.25]}>
          <MeshDistortMaterial
            color="#e2e8f0"
            metalness={0.7}
            roughness={0.3}
            distort={0.2}
            speed={3}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </group>
    </>
  )
}

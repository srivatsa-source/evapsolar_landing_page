"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { EdgesGeometry, type LineSegments } from "three"
import * as THREE from "three"

interface WireframeSculptureProps {
  position: [number, number, number]
  scale?: number
  rotationSpeed?: number
  mousePosition?: { x: number; y: number }
  onHover?: (hovered: boolean, info?: any) => void
  sculptureInfo?: any
}

export function WireframeSculpture({
  position,
  scale = 1,
  rotationSpeed = 0.01,
  mousePosition = { x: 0, y: 0 },
  onHover,
  sculptureInfo,
}: WireframeSculptureProps) {
  const meshRef = useRef<LineSegments>(null)
  const [hovered, setHovered] = useState(false)
  const { camera, raycaster, pointer } = useThree()

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 2)
    const edges = new EdgesGeometry(geo)
    return edges
  }, [])

  const invisibleSphereGeometry = useMemo(() => {
    return new THREE.SphereGeometry(1.5, 16, 16)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const baseRotationSpeed = hovered ? rotationSpeed * 2 : rotationSpeed
      meshRef.current.rotation.x += baseRotationSpeed
      meshRef.current.rotation.y += baseRotationSpeed * 0.7
      meshRef.current.rotation.z += baseRotationSpeed * 0.3

      meshRef.current.rotation.x += mousePosition.y * 0.001
      meshRef.current.rotation.y += mousePosition.x * 0.001

      const floatOffset = hovered ? 0.3 : 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * floatOffset

      const targetScale = hovered ? scale * 1.2 : scale
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group>
      <mesh
        geometry={invisibleSphereGeometry}
        position={position}
        scale={scale * 1.2}
        visible={false}
        onPointerEnter={() => {
          setHovered(true)
          onHover?.(true, sculptureInfo)
          document.body.style.cursor = "pointer"
        }}
        onPointerLeave={() => {
          setHovered(false)
          onHover?.(false)
          document.body.style.cursor = "default"
        }}
        onClick={() => {
          console.log("[v0] Wireframe sculpture clicked:", sculptureInfo)
        }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Visible wireframe */}
      <lineSegments ref={meshRef} geometry={geometry} position={position} scale={scale}>
        <lineBasicMaterial color={hovered ? "#ffffff" : "#ffffff"} transparent opacity={hovered ? 0.9 : 0.6} />
      </lineSegments>
    </group>
  )
}

interface WireframeSculptureGroupProps {
  mousePosition: { x: number; y: number }
  onHoverChange?: (hovered: boolean, info?: any) => void
}

export function WireframeSculptureGroup({ mousePosition, onHoverChange }: WireframeSculptureGroupProps) {
  const sculptureData = [
    { name: "Zinc-Ion Core", description: "Primary energy storage unit", type: "Core Structure" },
    { name: "Electrolyte Matrix", description: "Ion transport medium", type: "Conductive Layer" },
    { name: "Cathode Assembly", description: "Positive electrode structure", type: "Energy Interface" },
    { name: "Anode Framework", description: "Negative electrode grid", type: "Collection Point" },
  ]

  const handleHover = (hovered: boolean, info?: any) => {
    onHoverChange?.(hovered, info)
  }

  return (
    <group>
      <WireframeSculpture
        position={[2, 0, -1]}
        scale={1.5}
        rotationSpeed={0.008}
        mousePosition={mousePosition}
        onHover={handleHover}
        sculptureInfo={sculptureData[0]}
      />

      <WireframeSculpture
        position={[4, 2, -2]}
        scale={0.8}
        rotationSpeed={0.012}
        mousePosition={mousePosition}
        onHover={handleHover}
        sculptureInfo={sculptureData[1]}
      />

      <WireframeSculpture
        position={[3, -1.5, -1.5]}
        scale={1.2}
        rotationSpeed={0.006}
        mousePosition={mousePosition}
        onHover={handleHover}
        sculptureInfo={sculptureData[2]}
      />

      <WireframeSculpture
        position={[5, 0.5, -3]}
        scale={0.6}
        rotationSpeed={0.015}
        mousePosition={mousePosition}
        onHover={handleHover}
        sculptureInfo={sculptureData[3]}
      />
    </group>
  )
}

export function WireframeSculptureTooltip({ hoveredInfo }: { hoveredInfo: any }) {
  if (!hoveredInfo) return null

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-32 -translate-y-16 z-50 bg-black/90 border border-white/30 rounded-lg p-4 max-w-xs pointer-events-none">
      <div className="text-white space-y-2">
        <h3 className="text-sm font-mono text-white">{hoveredInfo.name}</h3>
        <p className="text-xs text-white/70">{hoveredInfo.description}</p>
        <div className="text-xs text-white/50 font-mono">{hoveredInfo.type}</div>
      </div>
    </div>
  )
}

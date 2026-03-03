"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function Perovskite2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredStructure, setHoveredStructure] = useState<any>(null);
  const [clickedStructure, setClickedStructure] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const particlesRef = useRef<any[]>([]);
  const structuresRef = useRef<any[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const moleculeData = [
    {
      name: "Lead (Pb)",
      symbol: "Pb",
      role: "Central metal cation",
      color: "#4a90e2",
      details:
        "Forms the core of the perovskite structure, providing stability and electronic properties",
    },
    {
      name: "Iodine (I)",
      symbol: "I",
      role: "Halide anion",
      color: "#9b59b6",
      details:
        "Creates the octahedral framework around lead, enabling charge transport",
    },
    {
      name: "Methylammonium",
      symbol: "CH₃NH₃⁺",
      role: "Organic cation",
      color: "#e74c3c",
      details:
        "Occupies the A-site in the ABX₃ structure, influencing crystal stability",
    },
  ];

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    structuresRef.current.forEach((structure) => {
      if (isPointNearStructure(clickX, clickY, structure)) {
        setClickedStructure(structure);
        structure.pulseTime = Date.now();
      }
    });
  }, []);

  const isPointNearStructure = (
    x: number,
    y: number,
    structure: any,
    threshold = 80
  ) => {
    const dx = x - structure.center.x;
    const dy = y - structure.center.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < threshold;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      setDimensions({ width, height });
      canvas.width = width;
      canvas.height = height;

      return { width, height };
    };

    const { width, height } = updateDimensions();

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 40; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const createOctahedron = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      index: number
    ) => {
      const points: Array<{ x: number; y: number }> = [];
      const angles = [0, 60, 120, 180, 240, 300];

      angles.forEach((angle) => {
        const rad = ((angle + rotation) * Math.PI) / 180;
        points.push({
          x: x + Math.cos(rad) * size,
          y: y + Math.sin(rad) * size,
        });
      });

      return {
        center: { x, y },
        points,
        rotation,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        size,
        glassPhase: Math.random() * Math.PI * 2,
        index,
        moleculeType: index % 3,
      };
    };

    const initStructures = () => {
      const structures: any[] = [];
      const positions = [
        { x: 0.2, y: 0.3, size: 60 },
        { x: 0.5, y: 0.25, size: 70 },
        { x: 0.35, y: 0.6, size: 50 },
        { x: 0.7, y: 0.5, size: 65 },
        { x: 0.8, y: 0.75, size: 45 },
      ];

      positions.forEach((pos, i) => {
        structures.push(
          createOctahedron(pos.x * width, pos.y * height, pos.size, i * 35, i)
        );
      });

      structuresRef.current = structures;
    };

    initParticles();
    initStructures();

    const drawParticle = (p: any) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawStructure = (
      structure: any,
      mouseX: number,
      mouseY: number,
      time: number,
      isHovered: boolean
    ) => {
      const { center, points, size } = structure;

      const dx = mouseX - center.x;
      const dy = mouseY - center.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 300;
      const influence = Math.max(0, 1 - dist / maxDist);

      const isClicked = clickedStructure === structure;
      const pulseEffect =
        isClicked && structure.pulseTime
          ? Math.max(0, 1 - (Date.now() - structure.pulseTime) / 1000)
          : 0;
      const pulseScale = 1 + pulseEffect * 0.3;

      const hoverScale = isHovered ? 1.1 : 1;
      const totalScale = hoverScale * pulseScale;

      points.forEach((point: any, i: number) => {
        const attractX = point.x + dx * influence * 0.1;
        const attractY = point.y + dy * influence * 0.1;

        const vertexSize = (isHovered ? 4 : 3) * totalScale;
        const glowIntensity = isHovered ? 0.8 : 0.4;

        if (isHovered || pulseEffect > 0) {
          ctx.shadowColor =
            "rgba(255, 255, 255, " + (glowIntensity + pulseEffect) + ")";
          ctx.shadowBlur = 10 + pulseEffect * 20;
        }

        ctx.fillStyle =
          isHovered || pulseEffect > 0
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(attractX, attractY, vertexSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      });

      const centerSize = (isHovered ? 6 : 4.5) * totalScale;
      if (isHovered || pulseEffect > 0) {
        ctx.shadowColor = "rgba(255, 255, 255, " + (0.8 + pulseEffect) + ")";
        ctx.shadowBlur = 15 + pulseEffect * 25;
      }

      ctx.fillStyle =
        isHovered || pulseEffect > 0
          ? "rgba(255, 255, 255, 1)"
          : "rgba(255, 255, 255, 0.95)";
      ctx.beginPath();
      ctx.arc(center.x, center.y, centerSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      points.forEach((point: any, i: number) => {
        const attractX = point.x + dx * influence * 0.1;
        const attractY = point.y + dy * influence * 0.1;

        const edgeOpacity =
          (isHovered ? 1 : 0.7 + influence * 0.2) + pulseEffect * 0.3;
        const edgeWidth = (isHovered ? 2 : 1.2 + influence * 1.5) * totalScale;

        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, edgeOpacity)})`;
        ctx.lineWidth = edgeWidth;

        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(attractX, attractY);
        ctx.stroke();

        const nextPoint = points[(i + 1) % points.length];
        const nextAttractX = nextPoint.x + dx * influence * 0.1;
        const nextAttractY = nextPoint.y + dy * influence * 0.1;

        ctx.beginPath();
        ctx.moveTo(attractX, attractY);
        ctx.lineTo(nextAttractX, nextAttractY);
        ctx.stroke();
      });

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 2; j < points.length; j++) {
          if (j !== (i + points.length - 1) % points.length) {
            const p1 = points[i];
            const p2 = points[j];
            const attractX1 = p1.x + dx * influence * 0.1;
            const attractY1 = p1.y + dy * influence * 0.1;
            const attractX2 = p2.x + dx * influence * 0.1;
            const attractY2 = p2.y + dy * influence * 0.1;

            const innerOpacity = isHovered ? 0.6 : 0.15 + influence * 0.3;
            ctx.strokeStyle = `rgba(255, 255, 255, ${innerOpacity})`;

            ctx.beginPath();
            ctx.moveTo(attractX1, attractY1);
            ctx.lineTo(attractX2, attractY2);
            ctx.stroke();
          }
        }
      }
    };

    const drawConnections = (mouseX: number, mouseY: number, time: number) => {
      structuresRef.current.forEach((s1, i) => {
        structuresRef.current.forEach((s2, j) => {
          if (i < j) {
            const dist = Math.sqrt(
              Math.pow(s1.center.x - s2.center.x, 2) +
                Math.pow(s1.center.y - s2.center.y, 2)
            );

            const dx1 = mouseX - s1.center.x;
            const dy1 = mouseY - s1.center.y;
            const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

            const dx2 = mouseX - s2.center.x;
            const dy2 = mouseY - s2.center.y;
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            const avgInfluence = Math.max(0, 1 - (dist1 + dist2) / 600);
            const baseOpacity = 0.12 + avgInfluence * 0.2;

            ctx.strokeStyle = `rgba(255, 255, 255, ${baseOpacity})`;
            ctx.lineWidth = 0.5 + avgInfluence * 0.5;

            ctx.beginPath();
            ctx.moveTo(s1.center.x, s1.center.y);
            ctx.lineTo(s2.center.x, s2.center.y);
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      timeRef.current += 0.01;
      const time = timeRef.current;

      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        drawParticle(p);
      });

      structuresRef.current.forEach((structure) => {
        structure.rotation += structure.rotationSpeed;

        const angles = [0, 60, 120, 180, 240, 300];
        structure.points = angles.map((angle: number) => {
          const rad = ((angle + structure.rotation) * Math.PI) / 180;
          return {
            x: structure.center.x + Math.cos(rad) * structure.size,
            y: structure.center.y + Math.sin(rad) * structure.size,
          };
        });
      });

      let currentHovered: any = null;
      structuresRef.current.forEach((structure) => {
        if (isPointNearStructure(mousePos.x, mousePos.y, structure)) {
          currentHovered = structure;
        }
      });
      setHoveredStructure(currentHovered);

      drawConnections(mousePos.x, mousePos.y, time);

      structuresRef.current.forEach((structure) => {
        drawStructure(
          structure,
          mousePos.x,
          mousePos.y,
          time,
          currentHovered === structure
        );
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const { width: newWidth, height: newHeight } = updateDimensions();
      initParticles();
      initStructures();
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove, handleClick]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
      />

      <div className="absolute top-4 left-4 z-10 text-white pointer-events-none">
        <h1 className="text-2xl font-light tracking-wider mb-1">CH₃NH₃PbI₃</h1>
        <p className="text-gray-500 text-xs tracking-wide">
          PEROVSKITE STRUCTURE
        </p>
      </div>

      {hoveredStructure && (
        <div
          className="absolute z-20 bg-black/95 border border-white/40 rounded-lg p-4 pointer-events-none transition-all duration-200 max-w-sm shadow-2xl"
          style={{
            left: `${Math.min(
              hoveredStructure.center.x + 60,
              dimensions.width - 250
            )}px`,
            top: `${Math.max(hoveredStructure.center.y - 40, 10)}px`,
          }}
        >
          <div className="text-white space-y-2">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-3 h-3 rounded-full shadow-lg"
                style={{
                  backgroundColor:
                    moleculeData[hoveredStructure.moleculeType].color,
                  boxShadow: `0 0 10px ${
                    moleculeData[hoveredStructure.moleculeType].color
                  }50`,
                }}
              />
              <h3 className="text-base font-mono text-white">
                {moleculeData[hoveredStructure.moleculeType].name}
              </h3>
            </div>
            <div className="text-gray-300 text-sm space-y-2">
              <p>
                <span className="text-gray-500 font-mono">Symbol:</span>{" "}
                {moleculeData[hoveredStructure.moleculeType].symbol}
              </p>
              <p>
                <span className="text-gray-500 font-mono">Role:</span>{" "}
                {moleculeData[hoveredStructure.moleculeType].role}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed border-t border-white/20 pt-2">
                {moleculeData[hoveredStructure.moleculeType].details}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-gray-600 text-xs pointer-events-none">
        <div className="space-y-1 font-light">
          <p>2D Projection</p>
          <p>Interactive Wireframe</p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-gray-500 text-xs text-right font-mono pointer-events-none">
        <p>HOVER FOR DETAILS • CLICK TO INTERACT</p>
      </div>
    </div>
  );
}

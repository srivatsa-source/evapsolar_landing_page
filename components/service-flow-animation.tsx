"use client";

import { useEffect, useState } from "react";

interface FlowAnimationProps {
  isVisible: boolean;
  sourceId: string;
  targetIds: string[];
  delay?: number;
  duration?: number;
  animationType?: "lines" | "particles" | "graph";
}

export function ServiceFlowAnimation({
  isVisible,
  sourceId,
  targetIds,
  delay = 0,
  duration = 1500,
  animationType = "lines",
}: FlowAnimationProps) {
  const [connections, setConnections] = useState<
    Array<{
      id: string;
      path: string;
      length: number;
      delay: number;
    }>
  >([]);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setShouldRender(false);
      setConnections([]);
      return;
    }

    // Small delay to ensure elements are rendered and positioned
    const timeoutId = setTimeout(() => {
      const sourceElement = document.getElementById(sourceId);
      if (!sourceElement) return;

      const sourceRect = sourceElement.getBoundingClientRect();
      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top + sourceRect.height / 2;

      const newConnections = targetIds
        .map((targetId, index) => {
          const targetElement = document.getElementById(targetId);
          if (!targetElement) return null;

          const targetRect = targetElement.getBoundingClientRect();
          const targetCenterX = targetRect.left + targetRect.width / 2;
          const targetCenterY = targetRect.top + targetRect.height / 2;

          // Create a curved path from source to target
          const deltaX = targetCenterX - sourceCenterX;
          const deltaY = targetCenterY - sourceCenterY;

          // Add some curve to make it look more organic
          const controlX1 = sourceCenterX + deltaX * 0.3;
          const controlY1 = sourceCenterY - 50; // Curve upward first
          const controlX2 = sourceCenterX + deltaX * 0.7;
          const controlY2 = targetCenterY - 30; // Then curve toward target

          const path = `M ${sourceCenterX} ${sourceCenterY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${targetCenterX} ${targetCenterY}`;

          // Calculate approximate path length for animation
          const pathLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 1.3;

          return {
            id: `connection-${index}`,
            path,
            length: pathLength,
            delay: delay + index * 200, // Stagger the animations
          };
        })
        .filter(Boolean) as Array<{
        id: string;
        path: string;
        length: number;
        delay: number;
      }>;

      setConnections(newConnections);
      setShouldRender(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isVisible, sourceId, targetIds, delay]);

  if (!shouldRender || connections.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Gradient definitions for the flow lines */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="30%" stopColor="rgba(255, 255, 255, 0.6)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>

          {/* Particle gradient */}
          <radialGradient id="particleGradient">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.map((connection, index) => (
          <g key={connection.id}>
            {animationType === "lines" && (
              <>
                {/* Base path (static) */}
                <path
                  d={connection.path}
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="1"
                  fill="none"
                  className="animate-pulse"
                />

                {/* Animated flowing line */}
                <path
                  d={connection.path}
                  stroke="url(#flowGradient)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                  strokeDasharray={connection.length}
                  strokeDashoffset={connection.length}
                  style={{
                    animation: `flowAnimation-${connection.id} ${duration}ms ease-out ${connection.delay}ms forwards`,
                  }}
                />
              </>
            )}

            {animationType === "particles" && (
              <>
                {/* Base path */}
                <path
                  d={connection.path}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                  fill="none"
                />

                {/* Animated particles */}
                {[0, 0.3, 0.6].map((offset, particleIndex) => (
                  <circle
                    key={`particle-${index}-${particleIndex}`}
                    r="3"
                    fill="url(#particleGradient)"
                    className="flow-particle"
                    style={{
                      animation: `particleFlow ${duration}ms ease-out ${
                        connection.delay + particleIndex * 100
                      }ms forwards`,
                      offsetPath: `path('${connection.path}')`,
                      offsetDistance: `${offset * 100}%`,
                    }}
                  />
                ))}
              </>
            )}

            {animationType === "graph" && (
              <>
                {/* Node connections with data visualization style */}
                <path
                  d={connection.path}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />

                {/* Data flow indicators */}
                <path
                  d={connection.path}
                  stroke="rgba(255, 255, 255, 0.6)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="10"
                  strokeDashoffset="20"
                  className="data-flow"
                  style={{
                    animation: `dataFlow ${duration * 2}ms linear ${
                      connection.delay
                    }ms infinite`,
                  }}
                />
              </>
            )}
          </g>
        ))}
      </svg>

      <style jsx global>{`
        ${connections
          .map(
            (connection) => `
          @keyframes flowAnimation-${connection.id} {
            from {
              stroke-dashoffset: ${connection.length};
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `
          )
          .join("")}

        @keyframes particleFlow {
          from {
            offset-distance: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            offset-distance: 100%;
            opacity: 0;
          }
        }

        @keyframes dataFlow {
          from {
            stroke-dashoffset: 20;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";

const EvapSolarAnimation = ({
  onComplete,
  className = "",
  playSound = true,
}: {
  onComplete?: () => void;
  className?: string;
  playSound?: boolean;
}) => {
  const [stage, setStage] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    if (playSound && !audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }

    const playTone = (
      frequency: number,
      duration: number,
      delay: number,
      type: OscillatorType = "sine"
    ) => {
      if (!playSound || !audioContextRef.current) return;

      setTimeout(() => {
        const ctx = audioContextRef.current;
        if (!ctx) return;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + duration
        );

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
      }, delay);
    };

    const playElectricZap = (delay: number) => {
      if (!playSound || !audioContextRef.current) return;

      setTimeout(() => {
        const ctx = audioContextRef.current;
        if (!ctx) return;

        // Create noise for electric effect
        const bufferSize = ctx.sampleRate * 0.3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2000, ctx.currentTime);
        filter.Q.setValueAtTime(1, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start(ctx.currentTime);
        noise.stop(ctx.currentTime + 0.3);
      }, delay);
    };

    // Sound timeline
    playTone(220, 0.15, 200, "sine"); // Initial pulse sound
    playTone(330, 0.2, 1000, "sine"); // ES expansion
    playTone(440, 0.3, 1800, "triangle"); // Letters slide in
    playElectricZap(1800); // Electric zap with letters
    playTone(554, 0.4, 2600, "sine"); // Final letter expansion
    playTone(660, 0.5, 3000, "triangle"); // Power up sound

    const timers = [
      setTimeout(() => setStage(1), 200),
      setTimeout(() => setStage(2), 1000),
      setTimeout(() => setStage(3), 1800),
      setTimeout(() => setStage(4), 2600),
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 3800),
    ];

    return () => {
      timers.forEach(clearTimeout);
      const ctx = audioContextRef.current;
      if (ctx && ctx.state !== "closed") {
        ctx.close();
      }
    };
  }, [onComplete, playSound]);

  return (
    <div
      className={`fixed inset-0 w-full h-[100svh] bg-black flex items-center justify-center overflow-hidden z-50 ${className}`}
    >
      {/* Animated Wave Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute border-2 border-white rounded-full"
            style={{
              width: stage >= 3 ? `${34 + i * 14}vmin` : "0vmin",
              height: stage >= 3 ? `${34 + i * 14}vmin` : "0vmin",
              opacity: 0,
              transition: `all ${1.2 + i * 0.2}s cubic-bezier(0.4, 0, 0.2, 1)`,
              animationName: stage >= 3 ? "wave" : "none",
              animationDuration: `${2.5 + i * 0.5}s`,
              animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              animationIterationCount: "infinite",
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* CSS Animation for waves */}
      <style>{`
        @keyframes wave {
          0% {
            transform: scale(0.8);
            opacity: 0.4;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        @keyframes smoothPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
      `}</style>

      <div className="relative z-10 px-4">
        {/* ES Letters */}
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <div
            className={`font-bold text-white relative z-20 transition-all ease-in-out ${
              stage >= 2 ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
            style={{
              transitionDuration: "800ms",
              animationName: stage >= 1 && stage < 2 ? "smoothPulse" : "none",
              animationDuration: "1s",
              animationTimingFunction: "ease-in-out",
              fontSize: "clamp(2.5rem, 16vw, 6rem)",
            }}
          >
            es
          </div>
        </div>

        {/* Lightning Bolt */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all ease-out pointer-events-none"
          style={{
            zIndex: 0,
            opacity: stage >= 3 ? 0.3 : 0,
            transform: stage >= 3 ? "scale(1)" : "scale(0.7)",
            transitionDuration: "1000ms",
          }}
        >
          <svg
            className="w-32 h-40"
            stroke="white"
            strokeWidth="2"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M13 2L3 14h8l-1 8 10-12h-8z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Full Name */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all ease-out"
          style={{
            zIndex: 10,
            opacity: stage >= 2 ? 1 : 0,
            transitionDuration: "800ms",
          }}
        >
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
            {/* Evap */}
            <div
              className="font-bold text-white flex transition-all ease-out"
              style={{
                transform: stage >= 2 ? "translateX(0)" : "translateX(-6vw)",
                opacity: stage >= 2 ? 1 : 0,
                transitionDuration: "800ms",
                fontSize: "clamp(2rem, 10vw, 4.5rem)",
              }}
            >
              <span className="inline-block transform transition-all duration-300 hover:scale-110">
                e
              </span>
              <span
                className="inline-block transform transition-all ease-out"
                style={{
                  opacity: stage >= 3 ? 1 : 0,
                  transform: stage >= 3 ? "translateX(0)" : "translateX(-4vw)",
                  transitionDuration: "700ms",
                  transitionDelay: "200ms",
                }}
              >
                vap
              </span>
            </div>

            {/* Spacer for lightning */}
            <div className="w-4 md:w-8 lg:w-12"></div>

            {/* Solar */}
            <div
              className="font-bold text-white flex transition-all ease-out"
              style={{
                transform: stage >= 2 ? "translateX(0)" : "translateX(6vw)",
                opacity: stage >= 2 ? 1 : 0,
                transitionDuration: "800ms",
                fontSize: "clamp(2rem, 10vw, 4.5rem)",
              }}
            >
              <span className="inline-block transform transition-all duration-300 hover:scale-110">
                s
              </span>
              <span
                className="inline-block transform transition-all ease-out"
                style={{
                  opacity: stage >= 4 ? 1 : 0,
                  transform: stage >= 4 ? "translateX(0)" : "translateX(-4vw)",
                  transitionDuration: "700ms",
                  transitionDelay: "200ms",
                }}
              >
                olar
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvapSolarAnimation;

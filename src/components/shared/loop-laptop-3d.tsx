"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * LoopLaptop3D
 * A pure-SVG / CSS "3D" animation of a laptop deconstructing into floating
 * fragments, then reconstructing — symbolising refurbishment & the circular
 * economy. Lightweight (no WebGL / model loading) so it ships in a prototype.
 */
export function LoopLaptop3D() {
  const reduce = useReducedMotion();

  // Floating particle fragments orbiting the laptop.
  const fragments = Array.from({ length: 14 });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Glow halo */}
      <div className="absolute inset-0 rounded-full bg-radial-fade blur-2xl" />

      {/* Rotating orbit rings */}
      <motion.div
        className="absolute inset-[12%] rounded-full border border-primary/20"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[24%] rounded-full border border-eco/15"
        animate={reduce ? {} : { rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      {/* Central laptop */}
      <motion.div
        className="absolute inset-[28%] flex items-center justify-center"
        animate={
          reduce
            ? {}
            : {
                y: [0, -10, 0],
                rotateX: [12, 6, 12],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ perspective: 800 }}
      >
        <svg viewBox="0 0 200 180" className="w-full drop-shadow-[0_20px_40px_rgba(34,211,238,0.35)]">
          <defs>
            <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#0a1620" />
              <stop offset="1" stopColor="#0e1e2a" />
            </linearGradient>
            <linearGradient id="screen-glow" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#4ade80" />
            </linearGradient>
            <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#1a2632" />
              <stop offset="1" stopColor="#0c1219" />
            </linearGradient>
          </defs>

          {/* Screen back panel */}
          <motion.g
            animate={reduce ? {} : { opacity: [1, 0.92, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <rect x="40" y="20" width="120" height="80" rx="6" fill="url(#body)" stroke="url(#screen-glow)" strokeWidth="1.5" />
            <rect x="48" y="28" width="104" height="64" rx="3" fill="url(#screen)" stroke="#1f3b4d" strokeWidth="0.5" />

            {/* Glowing UI lines on screen */}
            <motion.g
              animate={reduce ? {} : { opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <rect x="56" y="36" width="40" height="3" rx="1.5" fill="url(#screen-glow)" />
              <rect x="56" y="46" width="64" height="2" rx="1" fill="#22d3ee" opacity="0.6" />
              <rect x="56" y="53" width="48" height="2" rx="1" fill="#4ade80" opacity="0.5" />
              <rect x="56" y="60" width="70" height="2" rx="1" fill="#22d3ee" opacity="0.4" />
              <circle cx="142" cy="80" r="4" fill="none" stroke="#4ade80" strokeWidth="1.5" />
              <motion.circle
                cx="142"
                cy="80"
                r="2"
                fill="#4ade80"
                animate={reduce ? {} : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            </motion.g>
          </motion.g>

          {/* Hinge */}
          <rect x="38" y="100" width="124" height="6" rx="2" fill="#0c1219" stroke="#1f3b4d" strokeWidth="0.5" />

          {/* Base / keyboard */}
          <polygon points="28,106 172,106 162,150 38,150" fill="url(#body)" stroke="url(#screen-glow)" strokeWidth="1.2" />
          <rect x="48" y="116" width="104" height="22" rx="2" fill="#0a1118" />
          {/* keys */}
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: 12 }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={52 + c * 8}
                y={119 + r * 6}
                width="6"
                height="4"
                rx="0.8"
                fill="#15222e"
                stroke="#1f3b4d"
                strokeWidth="0.3"
              />
            ))
          )}
          {/* trackpad */}
          <rect x="78" y="140" width="44" height="6" rx="1.5" fill="#0a1118" stroke="#1f3b4d" strokeWidth="0.4" />
        </svg>
      </motion.div>

      {/* Floating tech fragments (the "deconstructing" elements) */}
      {fragments.map((_, i) => {
        const angle = (i / fragments.length) * Math.PI * 2;
        const radius = 38 + (i % 3) * 6;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        const shapes = ["cpu", "ram", "chip", "code"];
        const shape = shapes[i % shapes.length];
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={
              reduce
                ? {}
                : {
                    x: [0, Math.cos(angle) * 14, 0],
                    y: [0, Math.sin(angle) * 14, 0],
                    opacity: [0.4, 1, 0.4],
                  }
            }
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            <FragmentIcon shape={shape} />
          </motion.div>
        );
      })}
    </div>
  );
}

function FragmentIcon({ shape }: { shape: string }) {
  const common =
    "h-5 w-5 text-primary drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]";
  if (shape === "cpu")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        {[2, 8, 14, 20].map((p) => (
          <g key={p} stroke="currentColor" strokeWidth="1.2">
            <line x1={p} y1="6" x2={p} y2="3" />
            <line x1={p} y1="21" x2={p} y2="18" />
          </g>
        ))}
      </svg>
    );
  if (shape === "ram")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <rect x="2" y="8" width="20" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        {[6, 10, 14, 18].map((p) => (
          <line key={p} x1={p} y1="8" x2={p} y2="16" stroke="currentColor" strokeWidth="1.2" />
        ))}
      </svg>
    );
  if (shape === "code")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="16,6 22,12 16,18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" className={common}>
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

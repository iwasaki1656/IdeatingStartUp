import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative">
        {/* Outer aurora glow — purple → cyan → green */}
        <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-purple-500/30 via-cyan-400/20 to-green-400/30 blur-xl animate-pulse" />
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-purple-500/40 via-cyan-400/30 to-green-400/40 blur-md" />

        {/* SVG enlarged: 42→56. viewBox stays 0 0 42 42 so all coordinates are unchanged. */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 42 42"
          fill="none"
          className="relative drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]"
        >
          <defs>
            {/*
              Gradient: purple(#a855f7) → cyan(#22d3ee) → green(#4ade80)
              Each stop cycles through that same order so the overall
              direction is always purple → cyan → green.
            */}
            <linearGradient id="infinity-main" x1="0" y1="0" x2="42" y2="42">
              <stop offset="0%" stopColor="#a855f7">
                <animate
                  attributeName="stop-color"
                  values="#a855f7;#22d3ee;#4ade80;#a855f7"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#22d3ee">
                <animate
                  attributeName="stop-color"
                  values="#22d3ee;#4ade80;#a855f7;#22d3ee"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#4ade80">
                <animate
                  attributeName="stop-color"
                  values="#4ade80;#a855f7;#22d3ee;#4ade80"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            {/* Glow filter — used only by the diamond, not the ∞ */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Orbiting rings ── */}
          <ellipse
            cx="21" cy="21" rx="19" ry="19"
            stroke="url(#infinity-main)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="4 8"
            opacity="0.4"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 21 21"
              to="360 21 21"
              dur="10s"
              repeatCount="indefinite"
            />
          </ellipse>

          <ellipse
            cx="21" cy="21" rx="16" ry="16"
            stroke="url(#infinity-main)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="2 6"
            opacity="0.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 21 21"
              to="0 21 21"
              dur="7s"
              repeatCount="indefinite"
            />
          </ellipse>

          {/* ── Orbiting particles: purple → cyan → green ── */}
          <circle r="1.5" fill="#a855f7" opacity="0.8">
            <animateMotion path="M21,2 A19,19 0 1,1 20.99,2" dur="10s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;1;0.2" dur="10s" repeatCount="indefinite" />
          </circle>
          <circle r="1.5" fill="#22d3ee" opacity="0.8">
            <animateMotion path="M21,2 A19,19 0 1,1 20.99,2" dur="10s" repeatCount="indefinite" begin="3.33s" />
            <animate attributeName="opacity" values="0.2;1;0.2" dur="10s" repeatCount="indefinite" begin="3.33s" />
          </circle>
          <circle r="1.5" fill="#4ade80" opacity="0.8">
            <animateMotion path="M21,2 A19,19 0 1,1 20.99,2" dur="10s" repeatCount="indefinite" begin="6.66s" />
            <animate attributeName="opacity" values="0.2;1;0.2" dur="10s" repeatCount="indefinite" begin="6.66s" />
          </circle>

          {/*
            ── Infinity symbol ──
            CENTERING FIX: original path starts at M10 → visual center at x=24 (3px right of SVG center 21).
            Changed to M7 (all subsequent coords are relative so nothing else changes).
            New x-range: 7→35, center = 21 ✓

            COLOR: fixed black (#1a1a1a — slightly softer than pure black).
            No gradient, no animation, no glow filter.
          */}
          <path
            d="M7 21c0-3 2.5-7 7-7 3.5 0 4.5 2.5 7 7 2.5 4.5 3.5 7 7 7s7-4 7-7-2.5-7-7-7c-3.5 0-4.5 2.5-7 7-2.5 4.5-3.5 7-7 7s-7-4-7-7Z"
            stroke="#22d3ee"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* ── Center diamond (stays at SVG center 21,21) ── */}
          <g transform="translate(21,21)">
            <path
              d="M0,-3 L2,0 L0,3 L-2,0 Z"
              fill="#a855f7"
              opacity="0.9"
              filter="url(#glow)"
            >
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M-6,0 L6,0 M0,-6 L0,6" stroke="#a855f7" strokeWidth="0.3" opacity="0.5">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
            </path>
          </g>

          {/* ── Sparkles: one per brand color ── */}
          <path d="M5 7 L5.5 9 L7 9.5 L5.5 10 L5 12 L4.5 10 L3 9.5 L4.5 9 Z" fill="#a855f7" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="0s" />
          </path>
          <path d="M36 7 L36.5 9 L38 9.5 L36.5 10 L36 12 L35.5 10 L34 9.5 L35.5 9 Z" fill="#4ade80" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1.5s" />
          </path>
          <path d="M7 33 L7.5 35 L9 35.5 L7.5 36 L7 38 L6.5 36 L5 35.5 L6.5 35 Z" fill="#22d3ee" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
          </path>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          {/* Font size: text-xl → text-2xl */}
          <span className="font-display text-2xl font-bold tracking-tight leading-tight">
            Loop<span className="text-gradient-neon">Tech</span>
          </span>
          <span className="text-[10px] font-medium tracking-[0.3em] text-purple-400/70 uppercase">
            Infinite Innovation
          </span>
        </div>
      )}
    </div>
  );
}
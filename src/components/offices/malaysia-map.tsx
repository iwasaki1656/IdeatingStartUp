"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { OfficeLocation } from "@/lib/types";

/**
 * Improved Malaysia map with accurate SVG silhouettes for:
 *  - Peninsular Malaysia (with internal state division lines)
 *  - Sarawak (north-west Borneo)
 *  - Sabah (north-east Borneo)
 *
 * Pins are placed using mapX / mapY (0–100%) from the data file.
 */
export function MalaysiaMap({
  offices,
  activeId,
  onSelect,
}: {
  offices: OfficeLocation[];
  activeId?: string;
  onSelect: (office: OfficeLocation) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
      <svg
        viewBox="0 0 800 450"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Ocean gradient */}
          <radialGradient id="ocean-grad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#071926" />
            <stop offset="100%" stopColor="#040f18" />
          </radialGradient>

          {/* Land gradient */}
          <linearGradient id="land-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d2233" />
            <stop offset="100%" stopColor="#091a28" />
          </linearGradient>

          {/* Neon stroke gradient */}
          <linearGradient id="neon-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          {/* Active pin glow */}
          <filter id="glow-pin">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Land glow filter */}
          <filter id="land-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ocean wave pattern */}
          <pattern id="wave-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.6" fill="#22d3ee" opacity="0.07" />
          </pattern>

          {/* Clip for map border */}
          <clipPath id="map-clip">
            <rect x="0" y="0" width="800" height="450" rx="12" />
          </clipPath>
        </defs>

        <g clipPath="url(#map-clip)">
          {/* ── Ocean background ── */}
          <rect x="0" y="0" width="800" height="450" fill="url(#ocean-grad)" />
          <rect x="0" y="0" width="800" height="450" fill="url(#wave-dots)" />

          {/* Fine grid overlay */}
          <g opacity="0.08" stroke="#22d3ee" strokeWidth="0.5">
            {Array.from({ length: 17 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="450" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
            ))}
          </g>

          {/* ══════════════════════════════════════════
              PENINSULAR MALAYSIA
              Accurate silhouette (simplified from GeoJSON)
          ══════════════════════════════════════════ */}
          {/* Outer glow */}
          <path
            d="M 188 48
               L 200 44 L 215 46 L 228 52 L 238 62 L 242 74
               L 238 84 L 232 90 L 228 100 L 230 112
               L 234 122 L 238 134 L 240 148 L 238 162
               L 234 176 L 228 192 L 220 208 L 212 224
               L 208 238 L 210 250 L 216 260 L 218 270
               L 214 278 L 208 282 L 202 280 L 198 272
               L 196 260 L 192 248 L 186 238 L 178 230
               L 170 222 L 162 214 L 156 204 L 152 192
               L 150 178 L 152 164 L 156 150 L 158 136
               L 156 122 L 152 110 L 148 98 L 148 84
               L 152 72 L 160 60 L 172 52 Z"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="4"
            opacity="0.12"
            filter="url(#land-glow)"
          />
          {/* Main landmass */}
          <path
            d="M 188 48
               L 200 44 L 215 46 L 228 52 L 238 62 L 242 74
               L 238 84 L 232 90 L 228 100 L 230 112
               L 234 122 L 238 134 L 240 148 L 238 162
               L 234 176 L 228 192 L 220 208 L 212 224
               L 208 238 L 210 250 L 216 260 L 218 270
               L 214 278 L 208 282 L 202 280 L 198 272
               L 196 260 L 192 248 L 186 238 L 178 230
               L 170 222 L 162 214 L 156 204 L 152 192
               L 150 178 L 152 164 L 156 150 L 158 136
               L 156 122 L 152 110 L 148 98 L 148 84
               L 152 72 L 160 60 L 172 52 Z"
            fill="url(#land-dark)"
            stroke="url(#neon-stroke)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Internal division lines — stylized state separators */}
          <g stroke="#22d3ee" strokeWidth="0.4" opacity="0.25" strokeDasharray="3,3">
            {/* Kelantan/Pahang rough line */}
            <line x1="155" y1="110" x2="238" y2="130" />
            {/* KL/Selangor area */}
            <line x1="152" y1="160" x2="235" y2="162" />
            {/* Negeri Sembilan */}
            <line x1="155" y1="195" x2="230" y2="195" />
            {/* Melaka/JB */}
            <line x1="160" y1="230" x2="220" y2="228" />
          </g>

          {/* State mini-labels */}
          <text x="168" y="90" fill="#4ade80" fontSize="7" opacity="0.55" fontFamily="monospace" fontWeight="bold">KELANTAN</text>
          <text x="198" y="108" fill="#22d3ee" fontSize="6" opacity="0.4" fontFamily="monospace">TERENGGANU</text>
          <text x="155" y="148" fill="#4ade80" fontSize="7" opacity="0.4" fontFamily="monospace">PAHANG</text>
          <text x="153" y="178" fill="#22d3ee" fontSize="6.5" opacity="0.5" fontFamily="monospace">SELANGOR</text>
          <text x="162" y="208" fill="#4ade80" fontSize="6" opacity="0.4" fontFamily="monospace">N. SEMBILAN</text>
          <text x="167" y="236" fill="#22d3ee" fontSize="7" opacity="0.5" fontFamily="monospace">JOHOR</text>
          <text x="152" y="72" fill="#4ade80" fontSize="6.5" opacity="0.45" fontFamily="monospace">PERAK</text>
          <text x="152" y="58" fill="#22d3ee" fontSize="6" opacity="0.4" fontFamily="monospace">PENANG</text>

          {/* Big region label */}
          <text x="140" y="38" fill="#4ade80" fontSize="9" opacity="0.7" fontFamily="monospace" fontWeight="bold" letterSpacing="2">PENINSULAR MALAYSIA</text>

          {/* ══════════════════════════════════════════
              SARAWAK (NW Borneo)
          ══════════════════════════════════════════ */}
          <path
            d="M 460 180
               L 490 165 L 525 158 L 558 160 L 580 170
               L 595 185 L 598 200 L 590 218 L 572 230
               L 548 238 L 524 240 L 500 234 L 480 222
               L 464 208 L 458 194 Z"
            fill="url(#land-dark)"
            stroke="url(#neon-stroke)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <text x="488" y="155" fill="#4ade80" fontSize="9" opacity="0.7" fontFamily="monospace" fontWeight="bold" letterSpacing="2">SARAWAK</text>
          {/* Kuching label */}
          <text x="474" y="230" fill="#22d3ee" fontSize="5.5" opacity="0.4" fontFamily="monospace">KUCHING</text>

          {/* ══════════════════════════════════════════
              SABAH (NE Borneo)
          ══════════════════════════════════════════ */}
          <path
            d="M 580 80
               L 610 68 L 645 62 L 676 68 L 698 82
               L 712 100 L 710 120 L 696 136 L 674 146
               L 648 150 L 620 146 L 598 134 L 582 116
               L 576 98 Z"
            fill="url(#land-dark)"
            stroke="url(#neon-stroke)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <text x="596" y="60" fill="#22d3ee" fontSize="9" opacity="0.7" fontFamily="monospace" fontWeight="bold" letterSpacing="2">SABAH</text>
          {/* KK label */}
          <text x="596" y="140" fill="#4ade80" fontSize="5.5" opacity="0.4" fontFamily="monospace">KOTA KINABALU</text>

          {/* ── Dashed sea connector (shows they're one country) ── */}
          <line
            x1="240" y1="160"
            x2="458" y2="200"
            stroke="#22d3ee"
            strokeWidth="0.7"
            strokeDasharray="6,5"
            opacity="0.2"
          />
          <line
            x1="598" y1="130"
            x2="598" y2="168"
            stroke="#22d3ee"
            strokeWidth="0.7"
            strokeDasharray="6,5"
            opacity="0.2"
          />

          {/* ── SOUTH CHINA SEA label ── */}
          <text x="315" y="310" fill="#22d3ee" fontSize="8.5" opacity="0.18" fontFamily="monospace" fontStyle="italic" letterSpacing="3">SOUTH CHINA SEA</text>

          {/* ── SULU SEA label ── */}
          <text x="650" y="165" fill="#22d3ee" fontSize="7" opacity="0.15" fontFamily="monospace" fontStyle="italic" letterSpacing="2">SULU SEA</text>

          {/* ── STRAIT OF MALACCA label ── */}
          <text
            x="100"
            y="175"
            fill="#22d3ee"
            fontSize="6.5"
            opacity="0.15"
            fontFamily="monospace"
            fontStyle="italic"
            letterSpacing="1.5"
            transform="rotate(-80 100 175)"
          >STRAIT OF MALACCA</text>

          {/* ── Legend chip ── */}
          <rect x="14" y="414" width="130" height="24" rx="5" fill="#0d2233" opacity="0.8" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.3" />
          <circle cx="28" cy="426" r="4" fill="#22d3ee" opacity="0.9" />
          <text x="38" y="430" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" opacity="0.8">{offices.length} service centers</text>

          {/* Compass rose (decorative) */}
          <g transform="translate(752, 408)" opacity="0.25">
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#22d3ee" strokeWidth="0.8" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#22d3ee" strokeWidth="0.8" />
            <polygon points="0,-14 -3,-6 0,-9 3,-6" fill="#4ade80" />
            <text x="-2" y="-17" fill="#4ade80" fontSize="6" fontFamily="monospace">N</text>
          </g>
        </g>
      </svg>

      {/* ── Interactive pins (HTML layer) ── */}
      {offices.map((o) => {
        const active = o.id === activeId;
        const isHovered = o.id === hovered;
        const prominent = active || isHovered;

        return (
          <motion.button
            key={o.id}
            onClick={() => onSelect(o)}
            onMouseEnter={() => setHovered(o.id)}
            onMouseLeave={() => setHovered(null)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${o.mapX}%`, top: `${o.mapY}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.05 }}
            aria-label={`Select ${o.name}`}
          >
            {/* outer pulse ring */}
            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping ${
                active
                  ? "h-12 w-12 bg-primary/25"
                  : "h-7 w-7 bg-neon-cyan/15"
              }`}
            />
            {/* secondary static ring */}
            {prominent && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-primary/50 bg-primary/5"
              />
            )}
            {/* pin dot */}
            <motion.span
              animate={{
                width: prominent ? 20 : 12,
                height: prominent ? 20 : 12,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative flex items-center justify-center rounded-full border-2 transition-colors ${
                active
                  ? "border-primary bg-primary shadow-[0_0_20px_4px_rgba(34,211,238,0.7)]"
                  : isHovered
                  ? "border-primary bg-primary/80 shadow-[0_0_14px_2px_rgba(34,211,238,0.5)]"
                  : "border-neon-cyan bg-neon-cyan/70 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
              }`}
            >
              {/* inner dot */}
              {active && (
                <span className="h-2.5 w-2.5 rounded-full bg-background" />
              )}
            </motion.span>

            {/* tooltip label */}
            <AnimatePresence>
              {prominent && (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-primary/50 bg-background/95 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-lg backdrop-blur-sm"
                >
                  {o.name.replace("LoopTech ", "")}
                  <span className="ml-1.5 rounded-full bg-eco/20 px-1.5 py-0.5 text-[9px] font-bold text-eco">
                    {o.liveInventory}
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

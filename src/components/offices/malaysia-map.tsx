"use client";

import { motion } from "framer-motion";

import type { OfficeLocation } from "@/lib/types";

/**
 * A stylized (non-geographically-exact) silhouette of Peninsular + East
 * Malaysia rendered as neon-outlined blobs. Office pins are positioned using
 * the normalized mapX/mapY (0–100) coords from the data file.
 *
 * This is a lightweight visual stand-in for an embedded Google Maps view —
 * easy to swap for the real Maps Embed API later by replacing this component.
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
  return (
    <div className="relative aspect-[4/5] w-full sm:aspect-[5/4]">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="land-grad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#0c1a24" />
            <stop offset="1" stopColor="#0a141c" />
          </linearGradient>
          <linearGradient id="land-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#4ade80" />
          </linearGradient>
        </defs>

        {/* grid overlay */}
        <g opacity="0.12" stroke="#22d3ee" strokeWidth="0.15">
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} />
          ))}
        </g>

        {/* Peninsular Malaysia */}
        <path
          d="M 24 30 Q 28 24 34 26 Q 40 28 44 34 Q 48 40 50 48 Q 52 56 54 64 Q 55 72 52 80 Q 48 88 50 92 Q 52 90 54 86 Q 58 78 53 70 Q 49 62 47 54 Q 44 44 40 38 Q 36 32 30 32 Z"
          fill="url(#land-grad)"
          stroke="url(#land-stroke)"
          strokeWidth="0.4"
        />

        {/* Sabah (top right of Borneo area) */}
        <path
          d="M 74 22 Q 82 20 88 26 Q 90 32 86 38 Q 80 40 75 36 Q 72 30 74 22 Z"
          fill="url(#land-grad)"
          stroke="url(#land-stroke)"
          strokeWidth="0.4"
        />

        {/* Sarawak (left of Sabah, Borneo area) */}
        <path
          d="M 68 40 Q 76 38 82 44 Q 84 52 80 58 Q 73 60 68 56 Q 65 48 68 40 Z"
          fill="url(#land-grad)"
          stroke="url(#land-stroke)"
          strokeWidth="0.4"
        />

        {/* Region labels */}
        <text x="42" y="22" fill="#4ade80" fontSize="2.2" opacity="0.5" fontFamily="monospace">
          PENINSULAR
        </text>
        <text x="74" y="18" fill="#22d3ee" fontSize="2.2" opacity="0.5" fontFamily="monospace">
          SABAH
        </text>
        <text x="68" y="64" fill="#4ade80" fontSize="2.2" opacity="0.5" fontFamily="monospace">
          SARAWAK
        </text>
      </svg>

      {/* Interactive pins (HTML for easy hover/popover handling) */}
      {offices.map((o) => {
        const active = o.id === activeId;
        return (
          <motion.button
            key={o.id}
            onClick={() => onSelect(o)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${o.mapX}%`, top: `${o.mapY}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label={`Select ${o.name}`}
          >
            {/* ping ring */}
            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                active ? "h-10 w-10 bg-primary/30" : "h-7 w-7 bg-primary/15"
              } animate-ping`}
            />
            {/* pin dot */}
            <span
              className={`relative flex items-center justify-center rounded-full border-2 transition-all ${
                active
                  ? "h-5 w-5 border-primary bg-primary shadow-[0_0_16px_rgba(34,211,238,0.9)]"
                  : "h-3.5 w-3.5 border-neon-cyan bg-neon-cyan/80 group-hover:h-5 group-hover:w-5 group-hover:border-primary group-hover:bg-primary group-hover:shadow-[0_0_16px_rgba(34,211,238,0.9)]"
              }`}
            />
            {/* label on hover/active */}
            <span
              className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-primary/40 bg-background/90 px-2 py-0.5 text-[10px] font-medium text-primary backdrop-blur transition-opacity ${
                active
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {o.name.replace("LoopTech ", "")}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

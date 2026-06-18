import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          className="drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
        >
          <defs>
            <linearGradient id="lg-grad" x1="0" y1="0" x2="34" y2="34">
              <stop stopColor="#22d3ee" />
              <stop offset="0.5" stopColor="#06b6d4" />
              <stop offset="1" stopColor="#4ade80" />
            </linearGradient>
          </defs>
          {/* Outer hex ring (futurism) */}
          <path
            d="M17 2L30 9.5V24.5L17 32L4 24.5V9.5L17 2Z"
            stroke="url(#lg-grad)"
            strokeWidth="1.6"
            fill="rgba(34,211,238,0.06)"
          />
          {/* Circular loop arrow (recycle / loop) */}
          <path
            d="M11.5 20.5a6 6 0 1 1 .6-6.4"
            stroke="url(#lg-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M12 11v3.5h3.5"
            stroke="url(#lg-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      {showText && (
        <span className="font-display text-lg font-bold tracking-tight">
          Loop<span className="text-gradient-neon">Tech</span>
        </span>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Laptop,
  RefreshCw,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { userGuideSteps } from "@/lib/data/dashboard";

const iconMap: Record<string, LucideIcon> = {
  laptop: Laptop,
  "badge-check": BadgeCheck,
  truck: Truck,
  "refresh-cw": RefreshCw,
};

export function UserGuideSection() {
  return (
    <section id="guide" className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="font-mono text-sm uppercase tracking-widest text-primary">
            How It Works
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Rent a PC in <span className="text-gradient-neon">4 simple steps.</span>
          </h2>
        </ScrollReveal>

        {/* Futuristic timeline */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {userGuideSteps.map((s, i) => {
              const Icon = iconMap[s.icon] ?? Laptop;
              const isLast = i === userGuideSteps.length - 1;
              return (
                <ScrollReveal key={s.step} delay={i * 0.12}>
                  <div className="group relative">
                    {/* Node */}
                    <div className="relative z-10 mb-6 flex items-center justify-center lg:justify-start">
                      <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-primary/30 bg-card/70 backdrop-blur transition-all group-hover:border-primary group-hover:shadow-[0_0_30px_-6px_rgba(34,211,238,0.7)]">
                        <Icon className="h-9 w-9 text-primary transition-transform group-hover:scale-110" />
                        <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-cyan font-display text-xs font-bold text-background shadow-[0_0_14px_-2px_rgba(34,211,238,0.9)]">
                          {s.step}
                        </span>
                        {/* Arrow between nodes */}
                        {!isLast && (
                          <span className="absolute left-full top-1/2 hidden h-2 w-2 -translate-y-1/2 translate-x-4 rotate-45 border-r-2 border-t-2 border-primary/40 lg:block" />
                        )}
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-semibold">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <ScrollReveal className="mt-16 text-center" delay={0.2}>
          <Button variant="neon" size="xl" asChild>
            <Link href="/catalog">Browse Devices & Get Started</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

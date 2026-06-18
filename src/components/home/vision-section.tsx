"use client";

import { motion } from "framer-motion";
import { BookOpen, Recycle, GraduationCap, Leaf } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

const sdgCards = [
  {
    code: "SDG 4",
    title: "Quality Education",
    icon: GraduationCap,
    color: "from-amber-400 to-red-500",
    description:
      "We close the digital divide by putting capable PCs into the hands of every student — regardless of family income.",
    stat: "4,860+",
    statLabel: "students empowered",
  },
  {
    code: "SDG 12",
    title: "Responsible Consumption",
    icon: Leaf,
    color: "from-eco to-eco-deep",
    description:
      "By refurbishing and leasing instead of discarding, we extend device lifecycles and slash electronic waste.",
    stat: "5,240+",
    statLabel: "devices saved from landfill",
  },
];

export function VisionSection() {
  return (
    <section id="vision" className="relative py-24">
      <div className="container">
        {/* Kinetic typography heading */}
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-sm uppercase tracking-widest text-primary">
            Our Mission
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            A future where{" "}
            <motion.span
              className="inline-block text-gradient-neon"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              learning
            </motion.span>{" "}
            never stops — and nothing is{" "}
            <motion.span
              className="inline-block text-gradient-eco"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              wasted.
            </motion.span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            LoopTech sits at the intersection of two UN Sustainable Development
            Goals. Every rental is a vote for equal access and a circular
            economy.
          </p>
        </ScrollReveal>

        {/* SDG infographic cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {sdgCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.code} delay={i * 0.15}>
                <div className="neon-border group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card/50 p-8 backdrop-blur-sm transition-all hover:bg-card/70">
                  {/* Gradient corner glow */}
                  <div
                    className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${card.color} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-foreground/80">
                        {card.code}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-bold">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>

                    <div className="mt-6 flex items-end gap-3 border-t border-white/5 pt-5">
                      <span className="font-display text-3xl font-bold text-gradient-neon">
                        {card.stat}
                      </span>
                      <span className="pb-1 text-xs text-muted-foreground">
                        {card.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Loop diagram */}
        <ScrollReveal className="mt-10" delay={0.2}>
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-eco/20 bg-eco/[0.03] p-8 text-center sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2 text-eco">
              <Recycle className="h-5 w-5" />
              <span className="font-medium">Refurbish</span>
            </div>
            <span className="hidden text-muted-foreground sm:inline">→</span>
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Educate</span>
            </div>
            <span className="hidden text-muted-foreground sm:inline">→</span>
            <div className="flex items-center gap-2 text-eco">
              <Leaf className="h-5 w-5" />
              <span className="font-medium">Sustain</span>
            </div>
            <span className="hidden text-muted-foreground sm:inline">↻</span>
            <p className="text-sm text-muted-foreground">
              The LoopTech Circular Cycle
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

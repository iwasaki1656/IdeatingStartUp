"use client";

import { Users, MonitorSmartphone, CloudCog } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CountUp } from "@/components/shared/count-up";
import { impactStats } from "@/lib/data/dashboard";

const metrics = [
  {
    key: "students",
    icon: Users,
    label: "Students Empowered by LoopTech",
    value: impactStats.studentsEmpowered,
    suffix: "",
    accent: "text-primary",
    glow: "shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)]",
  },
  {
    key: "devices",
    icon: MonitorSmartphone,
    label: "Devices Saved from Landfills",
    value: impactStats.devicesSaved,
    suffix: "",
    accent: "text-eco",
    glow: "shadow-[0_0_24px_-4px_rgba(74,222,128,0.5)]",
  },
  {
    key: "co2",
    icon: CloudCog,
    label: "CO₂ Emissions Reduced",
    value: impactStats.co2ReducedKg,
    suffix: " kg",
    accent: "text-neon-purple",
    glow: "shadow-[0_0_24px_-4px_rgba(168,85,247,0.5)]",
  },
];

export function ImpactCounterSection() {
  return (
    <section id="impact" className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container">
        <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-mono text-sm uppercase tracking-widest text-eco">
            Live Impact Tracker
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Real change, <span className="text-gradient-eco">measured.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            These numbers update in real time as students rent and devices are
            rescued. Together we&apos;re building a measurable legacy.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <ScrollReveal key={m.key} delay={i * 0.12}>
                <div
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-card/50 p-8 backdrop-blur-sm transition-transform hover:-translate-y-1 ${m.glow}`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
                  <Icon className={`h-8 w-8 ${m.accent}`} />
                  <div
                    className={`mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl ${m.accent}`}
                  >
                    <CountUp end={m.value} duration={2.4} />
                    {m.suffix}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

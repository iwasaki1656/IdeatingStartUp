"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Recycle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LoopLaptop3D } from "@/components/shared/loop-laptop-3d";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated grid + radial glow background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="container relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        {/* Left: copy + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-eco/30 bg-eco/10 px-3 py-1 text-xs font-medium text-eco">
            <Sparkles className="h-3.5 w-3.5" />
            Sustainable Futurism for Malaysian Students
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Empowering Education,
            <br />
            <span className="text-gradient-neon">Sustaining</span> the{" "}
            <span className="text-gradient-eco">Planet.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            AI is pushing PC prices out of reach for students. LoopTech leases
            certified, eco-refurbished laptops — so every child gets the tech
            they need, while we keep devices out of landfills.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="neon" size="xl" asChild>
              <Link href="/catalog">
                Rent a PC <span className="text-foreground/60">(For Students)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="eco" size="xl" asChild>
              <Link href="/buyback">
                <Recycle className="h-4 w-4" />
                Give / Sell a PC <span className="text-foreground/60">(Donors)</span>
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-eco shadow-[0_0_8px_#4ade80]" />
              4,860+ students empowered
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_8px_#22d3ee]" />
              5,240+ devices saved
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-neon-purple shadow-[0_0_8px_#a855f7]" />
              Promoting UN SDG 4 & 12
            </span>
          </div>
        </motion.div>

        {/* Right: 3D laptop animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <LoopLaptop3D />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

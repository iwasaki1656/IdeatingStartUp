"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, HardDrive, MemoryStick } from "lucide-react";

import { cn, formatRM } from "@/lib/utils";
import type { Device, StockStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const stockVariant: Record<
  StockStatus,
  "default" | "warning" | "danger" | "muted" | "eco"
> = {
  "In Stock": "eco",
  "Low Stock": "warning",
  "In-Store Pickup Only": "default",
  "Out of Stock": "danger",
};

export function DeviceCard({ device }: { device: Device }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <Link
        href={`/catalog/${device.slug}`}
        className="neon-border flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/60 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-card/80"
      >
        {/* Image with 3D-angle hover rotation */}
        <div
          className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white/5 to-transparent"
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="h-full w-full"
            whileHover={{ rotateY: -16, rotateX: 8, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={device.image}
              alt={device.name}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Top badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            <Badge variant={device.condition === "New" ? "default" : "eco"}>
              {device.condition === "Rebuilt"
                ? "Rebuilt (Certified Pre-owned)"
                : "New"}
            </Badge>
          </div>
          <div className="absolute right-3 top-3">
            <Badge variant={stockVariant[device.stock]}>{device.stock}</Badge>
          </div>

          {/* CO2 badge for rebuilt devices */}
          {device.co2SavedKg > 0 && (
            <div className="absolute bottom-3 left-3 rounded-full border border-eco/30 bg-background/80 px-2.5 py-1 text-xs font-medium text-eco backdrop-blur">
              ♻ {device.co2SavedKg} kg CO₂ saved
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {device.brand}
              </p>
              <h3 className="mt-1 font-display text-base font-semibold leading-tight">
                {device.name}
              </h3>
            </div>
          </div>

          {/* Spec chips */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <Spec icon={Cpu} label={device.cpuFamily} />
            <Spec icon={MemoryStick} label={`${device.ramGB}GB`} />
            <Spec icon={HardDrive} label={device.storageGB >= 1024 ? "1TB" : `${device.storageGB}GB`} />
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {device.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {t.replace("For ", "")}
              </span>
            ))}
          </div>

          {/* Footer: price */}
          <div className="mt-5 flex items-end justify-between border-t border-white/5 pt-4">
            <div>
              <p className="font-display text-2xl font-bold text-gradient-neon">
                {formatRM(device.monthlyFeeRM)}
                <span className="text-sm font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {device.stockCount} available
              </p>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
              View <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Spec({
  icon: Icon,
  label,
}: {
  icon: typeof Cpu;
  label: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.03] px-2 py-1.5"
      )}
    >
      <Icon className="h-3.5 w-3.5 text-primary/70" />
      <span className="font-medium text-foreground/80">{label}</span>
    </div>
  );
}

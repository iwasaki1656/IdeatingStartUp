"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Battery,
  Cpu,
  Gauge,
  HardDrive,
  MemoryStick,
  Monitor,
  ShieldCheck,
  Weight,
  Wrench,
  CheckCircle2,
  ShoppingCart,
  Leaf,
} from "lucide-react";

import type { Device } from "@/lib/types";
import { formatRM } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function DeviceDetailClient({ device }: { device: Device }) {
  const [activeImg, setActiveImg] = useState(0);
  const [duration, setDuration] = useState<"1" | "2">("2");
  const [warranty, setWarranty] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const monthlyWithDiscount =
    duration === "2" ? device.monthlyFeeRM : device.monthlyFeeRM + 5;
  const warrantyFee = warranty ? 8 : 0;
  const total = (monthlyWithDiscount + warrantyFee) * (Number(duration) * 12);

  return (
    <div className="container py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <a href="/catalog" className="hover:text-primary">
          Catalog
        </a>{" "}
        / <span className="text-foreground">{device.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* LEFT: gallery */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <motion.img
              key={activeImg}
              src={device.gallery[activeImg]}
              alt={`${device.name} angle ${activeImg + 1}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4 flex gap-2">
              <Badge variant={device.condition === "New" ? "default" : "eco"}>
                {device.condition === "Rebuilt"
                  ? "Rebuilt (Certified Pre-owned)"
                  : "Brand New"}
              </Badge>
            </div>
          </div>
          {/* Thumbnails */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            {device.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  activeImg === i
                    ? "border-primary shadow-[0_0_14px_-4px_rgba(34,211,238,0.8)]"
                    : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
          {/* Cosmetic transparency note */}
          {device.condition === "Rebuilt" && (
            <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4">
              <p className="flex items-start gap-2 text-sm text-amber-200/90">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <strong>Cosmetic transparency:</strong> {device.cosmeticNote}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* RIGHT: info + actions */}
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            {device.brand}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
            {device.name}
          </h1>

          {/* Quick spec row */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <QuickSpec icon={Cpu} label="CPU" value={device.cpuFamily} />
            <QuickSpec icon={MemoryStick} label="RAM" value={`${device.ramGB}GB`} />
            <QuickSpec
              icon={HardDrive}
              label="Storage"
              value={`${device.storageGB}GB`}
            />
            <QuickSpec icon={Monitor} label="Display" value={`${device.screenSizeInch}"`} />
          </div>

          {/* Price */}
          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-4xl font-bold text-gradient-neon">
              {formatRM(monthlyWithDiscount)}
              <span className="text-base font-normal text-muted-foreground">
                /month
              </span>
            </span>
            <Badge variant="eco">{device.stock}</Badge>
          </div>

          {/* Action area */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-card/40 p-5 backdrop-blur-sm">
            <label className="text-sm font-medium">Rental Duration</label>
            <ToggleGroup
              type="single"
              value={duration}
              onValueChange={(v) => v && setDuration(v as "1" | "2")}
              className="mt-2 w-full"
            >
              <ToggleGroupItem value="1" className="flex-1">
                1 Year — {formatRM(device.monthlyFeeRM + 5)}/mo
              </ToggleGroupItem>
              <ToggleGroupItem value="2" className="flex-1">
                2 Years — {formatRM(device.monthlyFeeRM)}/mo{" "}
                <span className="ml-1 text-xs text-eco">(Save 12%)</span>
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.02] p-3">
              <Checkbox
                id="warranty"
                checked={warranty}
                onCheckedChange={(c) => setWarranty(c === true)}
              />
              <label
                htmlFor="warranty"
                className="flex-1 cursor-pointer text-sm"
              >
                <span className="font-medium">Damage Protection Warranty</span>
                <span className="block text-xs text-muted-foreground">
                  Covers accidental damage. +{formatRM(8)}/month
                </span>
              </label>
              <ShieldCheck className="h-5 w-5 text-eco" />
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Estimated total ({duration} yr)
              </span>
              <span className="font-display text-xl font-bold">
                {formatRM(total)}
              </span>
            </div>

            <Button
              variant={addedToCart ? "eco" : "neon"}
              size="lg"
              className="mt-4 w-full transition-all"
              onClick={handleAddToCart}
            >
              {addedToCart ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
            {device.co2SavedKg > 0 && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-eco">
                <Leaf className="h-3.5 w-3.5" />
                Choosing this rebuilt device saves {device.co2SavedKg} kg of CO₂
              </p>
            )}
          </div>
        </div>
      </div>

      {/* TABBED SPEC SHEET */}
      <div className="mt-14">
        <Tabs defaultValue="basic">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="tech">Technical Specs</TabsTrigger>
            <TabsTrigger value="condition">Device Condition</TabsTrigger>
          </TabsList>

          {/* Basic Info */}
          <TabsContent value="basic">
            <div className="rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-sm">
              <h3 className="font-display text-xl font-semibold">
                What you can do with this PC
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {device.studentDescription}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {device.capabilities.map((cap) => (
                  <div
                    key={cap}
                    className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.03] p-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-eco" />
                    <span className="text-sm">{cap}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {device.tags.map((t) => (
                  <Badge key={t} variant="purple">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Technical Specs */}
          <TabsContent value="tech">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-sm">
              {[
                { icon: Cpu, label: "Processor (Exact Model)", value: device.cpu },
                { icon: Gauge, label: "Graphics", value: device.gpu },
                { icon: MemoryStick, label: "Memory", value: `${device.ramGB}GB DDR` },
                { icon: HardDrive, label: "Storage", value: `${device.storageGB}GB ${device.storageType}` },
                { icon: Monitor, label: "Display", value: `${device.screenSizeInch}" panel` },
                { icon: Weight, label: "Weight", value: `${device.weightKg} kg` },
                { icon: Battery, label: "Battery Life", value: `Up to ${device.batteryHours} hours` },
                { icon: Monitor, label: "Operating System", value: device.os },
              ].map((row, i) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between gap-4 p-4 ${
                      i % 2 === 0 ? "bg-white/[0.015]" : ""
                    }`}
                  >
                    <span className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Icon className="h-4 w-4 text-primary/70" />
                      {row.label}
                    </span>
                    <span className="text-right font-medium text-foreground">
                      {row.value}
                    </span>
                  </div>
                );
              })}
              {/* Ports */}
              <div className="border-t border-white/5 p-4">
                <p className="mb-2 text-sm text-muted-foreground">Ports</p>
                <div className="flex flex-wrap gap-2">
                  {device.ports.map((p) => (
                    <span
                      key={p}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Device Condition (transparency log) */}
          <TabsContent value="condition">
            <div className="rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-eco" />
                <h3 className="font-display text-xl font-semibold">
                  Refurbishment & Transparency Log
                </h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Full disclosure of every component we touched. For new devices,
                the original factory seal applies.
              </p>
              <div className="mt-5 space-y-2">
                {device.conditionLog.map((log, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/[0.02] p-4"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                        log.action === "Replaced"
                          ? "bg-eco/15 text-eco"
                          : log.action === "Cleaned"
                          ? "bg-primary/15 text-primary"
                          : log.action === "Tested"
                          ? "bg-amber-400/15 text-amber-300"
                          : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {log.action === "Original" ? "ORIG" : log.action.slice(0, 4)}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.part}</p>
                      <p className="text-xs text-muted-foreground">{log.detail}</p>
                    </div>
                    <Badge
                      variant={
                        log.action === "Replaced"
                          ? "eco"
                          : log.action === "Original"
                          ? "muted"
                          : "default"
                      }
                    >
                      {log.action}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function QuickSpec({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Cpu;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
      <Icon className="mx-auto h-5 w-5 text-primary/70" />
      <p className="mt-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

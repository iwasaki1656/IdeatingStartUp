"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  MapPin,
  MessageCircle,
  Package,
  Recycle,
  Store,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { OfficeLocation, OfficeService } from "@/lib/types";
import { officeLocations } from "@/lib/data/offices";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MalaysiaMap } from "./malaysia-map";

const serviceIcon: Record<OfficeService, LucideIcon> = {
  "Self-Pickup Available": Store,
  "Repair Hub": Wrench,
  "Used Tech Buying Counter": Recycle,
  "Student Verification": Package,
};

type View = "map" | "list";

export function OfficesClient() {
  const [view, setView] = useState<View>("map");
  const [activeOffice, setActiveOffice] = useState<OfficeLocation | null>(null);
  const [bookingOffice, setBookingOffice] = useState<OfficeLocation | null>(
    null
  );

  // Group offices by state for the list view
  const byState = officeLocations.reduce<
    Record<string, OfficeLocation[]>
  >((acc, o) => {
    (acc[o.state] = acc[o.state] || []).push(o);
    return acc;
  }, {});

  return (
    <div className="container py-10">
      {/* View toggle */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {officeLocations.length}
          </span>{" "}
          support & pickup centers across Malaysia
        </p>
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1">
          <ToggleBtn active={view === "map"} onClick={() => setView("map")}>
            <MapPin className="h-4 w-4" /> Map View
          </ToggleBtn>
          <ToggleBtn active={view === "list"} onClick={() => setView("list")}>
            <Store className="h-4 w-4" /> Card List
          </ToggleBtn>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "map" ? (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid gap-6 lg:grid-cols-5">
              {/* Map */}
              <div className="lg:col-span-3">
                <div
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-sm"
                  style={{ height: 500 }}
                >
                  <MalaysiaMap
                    offices={officeLocations}
                    activeId={activeOffice?.id}
                    onSelect={(o) => setActiveOffice(o)}
                  />
                </div>
              </div>

              {/* Popup detail / fallback list */}
              <div className="lg:col-span-2">
                {activeOffice ? (
                  <OfficeDetailCard
                    office={activeOffice}
                    onBook={() => setBookingOffice(activeOffice)}
                    onClose={() => setActiveOffice(null)}
                    compact
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 p-8 text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                    <p className="mt-3 text-sm text-muted-foreground">
                      Click any pin on the map to view office details, hours,
                      and live inventory.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {Object.entries(byState).map(([state, offices]) => (
              <div key={state}>
                <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold">
                  <MapPin className="h-4 w-4 text-primary" />
                  {state}
                  <Badge variant="muted" className="ml-1">
                    {offices.length}
                  </Badge>
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {offices.map((o) => (
                    <OfficeDetailCard
                      key={o.id}
                      office={o}
                      onBook={() => setBookingOffice(o)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking dialog */}
      <PickupBookingDialog
        office={bookingOffice}
        onClose={() => setBookingOffice(null)}
      />
    </div>
  );
}

/* --------------------------------- Toggle --------------------------------- */
function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
        active
          ? "bg-primary/15 text-primary shadow-[0_0_16px_-6px_rgba(34,211,238,0.7)] ring-1 ring-primary/40"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

/* --------------------------- Office detail card --------------------------- */
function OfficeDetailCard({
  office,
  onBook,
  onClose,
  compact,
}: {
  office: OfficeLocation;
  onBook: () => void;
  onClose?: () => void;
  compact?: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/60 backdrop-blur-sm",
        compact && "border-primary/30 shadow-[0_0_24px_-8px_rgba(34,211,238,0.6)]"
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={office.image}
          alt={office.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-background/70 p-1.5 text-foreground/80 backdrop-blur transition-colors hover:bg-background hover:text-foreground"
          >
            ✕
          </button>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[11px] font-mono uppercase tracking-wider text-primary">
            {office.state}
          </p>
          <h4 className="font-display text-base font-semibold leading-tight">
            {office.name}
          </h4>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="space-y-2 text-sm">
          <p className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {office.address}
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            {office.hours}
          </p>
        </div>

        {/* Services */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {office.services.map((s) => {
            const Icon = serviceIcon[s];
            return (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-foreground/80"
              >
                <Icon className="h-3 w-3 text-primary" />
                {s}
              </span>
            );
          })}
        </div>

        {/* Live inventory */}
        <div className="mt-3 flex items-center justify-between rounded-lg border border-eco/20 bg-eco/[0.04] px-3 py-2">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Package className="h-3.5 w-3.5 text-eco" />
            Live inventory
          </span>
          <span className="font-display text-sm font-bold text-eco">
            {office.liveInventory} units
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2 pt-4">
          <Button variant="neon" size="sm" className="flex-1" onClick={onBook}>
            <CalendarCheck className="h-4 w-4" />
            Book Pickup
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            aria-label="WhatsApp contact"
          >
            <a
              href={`https://wa.me/${office.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4 text-eco" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* --------------------------- Pickup booking dialog ------------------------ */
function PickupBookingDialog({
  office,
  onClose,
}: {
  office: OfficeLocation | null;
  onClose: () => void;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // Generate next 14 days for the date selector
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const timeSlots = [
    "10:00 AM",
    "11:30 AM",
    "1:00 PM",
    "2:30 PM",
    "4:00 PM",
    "5:30 PM",
  ];

  const handleClose = () => {
    onClose();
    // reset after close animation
    setTimeout(() => {
      setDate("");
      setTime("");
      setConfirmed(false);
    }, 200);
  };

  return (
    <Dialog
      open={!!office}
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-primary" />
            Book Self-Pickup
          </DialogTitle>
          <DialogDescription>
            {office?.name} · Free pickup for verified students
          </DialogDescription>
        </DialogHeader>

        {confirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-eco/15">
              <CalendarCheck className="h-8 w-8 text-eco" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">
              Pickup booked!
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {date && (() => {
                const [y, m, d] = date.split("-").map(Number);
                return new Date(y, m - 1, d).toLocaleDateString("en-MY", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                });
              })()}{" "}
              at {time}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              We&apos;ll send a confirmation to your WhatsApp.
            </p>
            <Button variant="neon" className="mt-5" onClick={handleClose}>
              Done
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* Date selector */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Select a date
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-cyber">
                {days.map((d) => {
                  const iso = d.toISOString().split("T")[0];
                  const selected = date === iso;
                  return (
                    <button
                      key={iso}
                      onClick={() => setDate(iso)}
                      className={cn(
                        "flex min-w-[64px] shrink-0 flex-col items-center rounded-xl border px-3 py-2 transition-all",
                        selected
                          ? "border-primary bg-primary/15 text-primary shadow-[0_0_14px_-4px_rgba(34,211,238,0.7)]"
                          : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      )}
                    >
                      <span className="text-[10px] uppercase">
                        {d.toLocaleDateString("en-MY", { weekday: "short" })}
                      </span>
                      <span className="font-display text-lg font-bold">
                        {d.getDate()}
                      </span>
                      <span className="text-[10px]">
                        {d.toLocaleDateString("en-MY", { month: "short" })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time selector */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Select a time slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    disabled={!date}
                    className={cn(
                      "rounded-lg border px-2 py-2 text-xs font-medium transition-all disabled:opacity-40",
                      time === t
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="neon"
              className="w-full"
              disabled={!date || !time}
              onClick={() => setConfirmed(true)}
            >
              Confirm Booking
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              No delivery fee · Collect in person at {office?.name}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

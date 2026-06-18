"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, PackageOpen, X } from "lucide-react";

import { devices, filterOptions } from "@/lib/data/devices";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeviceCard } from "./device-card";

type FilterKey = "cpu" | "ram" | "storage" | "os" | "condition" | "tags";

type FilterState = Record<FilterKey, string[]>;

const initialFilters: FilterState = {
  cpu: [],
  ram: [],
  storage: [],
  os: [],
  condition: [],
  tags: [],
};

const filterGroups: { key: FilterKey; label: string; options: readonly string[] }[] = [
  { key: "cpu", label: "CPU", options: filterOptions.cpu },
  { key: "ram", label: "RAM", options: filterOptions.ram },
  { key: "storage", label: "Storage", options: filterOptions.storage },
  { key: "os", label: "Operating System", options: filterOptions.os },
  { key: "condition", label: "Condition", options: filterOptions.condition },
];

export function CatalogClient() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggle = (key: FilterKey, value: string) => {
    setFilters((prev) => {
      const has = prev[key].includes(value);
      return {
        ...prev,
        [key]: has
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
      };
    });
  };

  const clearAll = () => setFilters(initialFilters);

  const filtered = useMemo(() => {
    return devices.filter((d) => {
      // cpuFamily
      if (filters.cpu.length && !filters.cpu.includes(d.cpuFamily)) return false;
      // ram
      if (filters.ram.length && !filters.ram.includes(`${d.ramGB}GB`))
        return false;
      // storage
      if (
        filters.storage.length &&
        !filters.storage.includes(
          d.storageGB >= 1024 ? "1TB" : `${d.storageGB}GB`
        )
      )
        return false;
      // os
      if (filters.os.length && !filters.os.includes(d.os)) return false;
      // condition
      if (filters.condition.length && !filters.condition.includes(d.condition))
        return false;
      // student tags
      if (filters.tags.length && !filters.tags.some((t) => d.tags.includes(t as never)))
        return false;
      return true;
    });
  }, [filters]);

  const activeCount = Object.values(filters).reduce(
    (a, b) => a + b.length,
    0
  );

  const Sidebar = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">Filters</h3>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-primary hover:underline"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {/* Tech specs groups */}
      {filterGroups.map((group) => (
        <FilterGroup
          key={group.key}
          label={group.label}
          options={group.options}
          selected={filters[group.key]}
          onToggle={(v) => toggle(group.key, v)}
        />
      ))}

      {/* Student quick tags — emphasized */}
      <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-4">
        <h4 className="mb-3 text-sm font-semibold text-primary">
          Quick Tags for Students
        </h4>
        <div className="flex flex-col gap-2">
          {filterOptions.tags.map((tag) => (
            <FilterCheck
              key={tag}
              label={tag}
              checked={filters.tags.includes(tag)}
              onChange={() => toggle("tags", tag)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Desktop sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-white/10 bg-card/40 p-5 backdrop-blur-sm">
            {Sidebar}
          </div>
        </aside>

        {/* Main grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              of {devices.length} devices
            </p>
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filters {activeCount > 0 && `(${activeCount})`}
            </Button>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((d) => (
                  <DeviceCard key={d.id} device={d} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
              <PackageOpen className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-display text-lg font-semibold">
                No devices match your filters
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try removing some filters to see more options.
              </p>
              <Button variant="neon" size="sm" className="mt-5" onClick={clearAll}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto border-l border-white/10 bg-background p-5 scrollbar-cyber"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="rounded-md p-1.5 hover:bg-white/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {Sidebar}
              <Button
                variant="neon"
                className="mt-6 w-full"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Show {filtered.length} results
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-foreground">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                active
                  ? "border-primary bg-primary/15 text-primary shadow-[0_0_12px_-4px_rgba(34,211,238,0.7)]"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FilterCheck({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className="flex w-full items-center gap-2.5 text-left"
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
          checked
            ? "border-primary bg-primary"
            : "border-white/20"
        }`}
      >
        {checked && (
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3 text-background"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="2,6 5,9 10,3" />
          </svg>
        )}
      </span>
      <span
        className={`text-sm ${
          checked ? "text-primary" : "text-foreground/80"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export { Badge };

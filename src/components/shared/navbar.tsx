"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Moon, Sun, ChevronDown, Target, BarChart3, Lightbulb } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Devices" },
  { href: "/dashboard", label: "My Page" },
  { href: "/offices", label: "Office Network" },
  { href: "/buyback", label: "Sell / Donate" },
];

const discoverLinks = [
  {
    href: "/mission",
    label: "Our Mission",
    icon: Target,
  },
  {
    href: "/impact",
    label: "Impact Tracker",
    icon: BarChart3,
  },
  {
    href: "/how-it-works",
    label: "How It Works",
    icon: Lightbulb,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [mobileDiscoverOpen, setMobileDiscoverOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const discoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (discoverRef.current && !discoverRef.current.contains(e.target as Node)) {
        setDiscoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const isDiscoverActive = discoverLinks.some((l) => pathname.startsWith(l.href));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}
              </Link>
            );
          })}

          {/* Discover Us dropdown */}
          <div className="relative" ref={discoverRef}>
            <button
              onClick={() => setDiscoverOpen((o) => !o)}
              aria-expanded={discoverOpen}
              className={cn(
                "relative flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                isDiscoverActive
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              Discover Us
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  discoverOpen && "rotate-180"
                )}
              />
              {isDiscoverActive && (
                <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}
            </button>

            {/* Dropdown panel */}
            {discoverOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-background shadow-lg backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="divide-y divide-white/5">
                  {discoverLinks.map(({ href, label, icon: Icon }) => {
                    const active = pathname.startsWith(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setDiscoverOpen(false)}
                        className={cn(
                          "group flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors",
                          active
                            ? "text-primary"
                            : "text-foreground/70 hover:text-foreground"
                        )}
                      >
                        <Icon className={cn(
                          "h-3.5 w-3.5 shrink-0 transition-colors",
                          active ? "text-primary" : "text-foreground/40 group-hover:text-primary"
                        )} />
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {/* Theme toggle */}
          {mounted && (
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">Sign In</Link>
          </Button>
          <Button variant="neon" size="sm" asChild>
            <Link href="/catalog">Rent a PC</Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          {mounted && (
            <button
              id="theme-toggle-btn-mobile"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}
          <button
            className="rounded-md p-2 text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-background/95 md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Discover Us accordion */}
            <button
              onClick={() => setMobileDiscoverOpen((o) => !o)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isDiscoverActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-white/5"
              )}
            >
              Discover Us
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  mobileDiscoverOpen && "rotate-180"
                )}
              />
            </button>
            {mobileDiscoverOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                {discoverLinks.map(({ href, label, icon: Icon }) => {
                  const active = pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => { setOpen(false); setMobileDiscoverOpen(false); }}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "text-primary"
                          : "text-foreground/70 hover:bg-white/5"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button variant="neon" size="sm" className="flex-1" asChild>
                <Link href="/catalog" onClick={() => setOpen(false)}>
                  Rent a PC
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

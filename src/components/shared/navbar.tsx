"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">Sign In</Link>
          </Button>
          <Button variant="neon" size="sm" asChild>
            <Link href="/catalog">Rent a PC</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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

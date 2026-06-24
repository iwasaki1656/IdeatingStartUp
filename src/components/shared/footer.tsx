import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, Recycle } from "lucide-react";

import { Logo } from "./logo";

const footerLinks: Record<string, { label: string; href: string | null }[]> = {
  Service: [
    { label: "Device Catalog", href: "/catalog" },
    { label: "My Page / Dashboard", href: "/dashboard" },
    { label: "Find an Office", href: "/offices" },
    { label: "Sell / Donate a PC", href: "/buyback" },
  ],
  Company: [
    { label: "Our Mission", href: "/mission" },
    { label: "Impact Tracker", href: "/impact" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Careers", href: null },
  ],
  Support: [
    { label: "Help Center", href: null },
    { label: "WhatsApp Us", href: null },
    { label: "Damage Protection", href: null },
    { label: "Terms & Privacy", href: null },
  ],
};

const socialLinks = [
  { icon: Mail, label: "Email", href: null },
  { icon: Instagram, label: "Instagram", href: null },
  { icon: Linkedin, label: "LinkedIn", href: null },
  { icon: Github, label: "GitHub", href: null },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-background/80">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Empowering education, sustaining the planet. We lease certified
              computers to Malaysian students, closing the digital divide while
              fighting E-waste.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-eco/30 bg-eco/10 px-3 py-1 text-xs font-medium text-eco">
                <Recycle className="h-3.5 w-3.5" /> SDG 4 · Quality Education
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-eco/30 bg-eco/10 px-3 py-1 text-xs font-medium text-eco">
                <Recycle className="h-3.5 w-3.5" /> SDG 12 · Responsible Consumption
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span
                        title="Coming soon"
                        className="inline-flex items-center gap-1.5 cursor-default text-sm text-muted-foreground/50"
                      >
                        {link.label}
                        <span className="rounded-sm bg-white/5 px-1 py-0.5 text-[10px] font-medium text-muted-foreground/40">
                          Soon
                        </span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LoopTech Sdn. Bhd. All rights reserved.
            Built in Malaysia 🇲🇾
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            {socialLinks.map(({ icon: Icon, label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ) : (
                <span
                  key={label}
                  title={`${label} — coming soon`}
                  aria-label={`${label} — coming soon`}
                  className="cursor-default opacity-30"
                >
                  <Icon className="h-4 w-4" />
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

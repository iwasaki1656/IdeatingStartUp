# LoopTech 🔄 — *Empowering Education, Sustaining the Planet.*

A Next.js prototype for **LoopTech**, a Malaysian startup that leases certified,
eco-refurbished computers to students — closing the digital divide (UN SDG 4)
while fighting E-waste (UN SDG 12).

Built with the **"Sustainable Futurism"** design language: a dark cyberpunk
baseline with neon-blue & cyber-green accents, kinetic scroll animations, and
3D micro-interactions.

---

## ✨ Tech Stack

| Layer            | Choice                                              |
| ---------------- | --------------------------------------------------- |
| Framework        | **Next.js 14** (App Router, RSC)                    |
| Styling          | **Tailwind CSS** + custom design tokens             |
| UI Primitives    | **shadcn/ui-style** components (Radix UI + CVA)     |
| Animation        | **Framer Motion** (scroll reveals, 3D hover, count-up) |
| Icons            | **lucide-react**                                    |
| Language         | **TypeScript** (strict)                             |

---

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

---

## 🗺️ Site Map & Features

| Route                | Page                                | Highlights                                                                 |
| -------------------- | ----------------------------------- | -------------------------------------------------------------------------- |
| `/`                  | **Homepage**                        | 3D deconstructing-laptop hero, kinetic SDG vision, count-up impact tracker, 4-step timeline |
| `/catalog`           | **Device Catalog**                  | Multi-faceted sidebar filter (CPU/RAM/Storage/OS/condition/student tags), 3D-hover device cards |
| `/catalog/[slug]`    | **Specification Details**           | Multi-angle gallery, tabbed spec sheet (Basic / Technical / Condition log), rental-duration & warranty selector |
| `/dashboard`         | **My Page / Dashboard**             | Active-rental progress bar, billing table with PDF invoices, FPX/TnG/card payment methods, student verification upload |
| `/offices`           | **Malaysia Office Network**         | Map ⇄ Card-list toggle, interactive Malaysia map with custom pins & popups, state-grouped accordion, self-pickup booking calendar |
| `/buyback`           | **Sell / Donate a PC**              | 5-step assessment simulator with live buyback + eco-points estimate, corporate B2B bulk form with Data Destruction & SDG report info |

---

## 🎨 Design System

- **Palette** — `neon.blue` `#22d3ee`, `neon.cyan` `#06b6d4`, `eco` `#4ade80`,
  `eco.deep` `#16a34a`, accent `neon.purple` `#a855f7`. Defined in
  `tailwind.config.ts`.
- **Fonts** — Orbitron (display), Space Grotesk (sans), JetBrains Mono (mono),
  loaded via `next/font`.
- **Tokens** — HSL CSS variables in `src/app/globals.css` drive the shadcn-style
  primitives, so the whole theme is restorable from one file.
- **Helpers** — `.text-gradient-neon`, `.text-gradient-eco`, `.glass`,
  `.neon-border`, `.bg-cyber-grid`, `.clip-cyber`.

---

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (fonts, Navbar, Footer)
│   ├── page.tsx              # Homepage (composes section components)
│   ├── globals.css           # Design tokens + base styles
│   ├── catalog/
│   │   ├── page.tsx          # Catalog listing
│   │   └── [slug]/page.tsx   # Dynamic spec detail page
│   ├── dashboard/page.tsx
│   ├── offices/page.tsx
│   └── buyback/page.tsx
├── components/
│   ├── ui/                   # shadcn-style primitives (button, card, tabs, …)
│   ├── shared/               # Navbar, Footer, Logo, ScrollReveal, CountUp, LoopLaptop3D
│   ├── home/                 # Hero, Vision, ImpactCounter, UserGuide sections
│   ├── catalog/              # CatalogClient, DeviceCard, DeviceDetailClient
│   ├── dashboard/            # DashboardClient (rental + billing + verification)
│   ├── offices/              # OfficesClient + MalaysiaMap
│   └── buyback/              # BuybackClient (simulator + corporate form)
└── lib/
    ├── types.ts              # Domain models (Device, Office, Rental, …)
    ├── utils.ts              # cn(), formatRM(), formatNumber()
    └── data/                 # Mock data (devices, offices, dashboard)
```

---

## 🔌 Going to Production

This is a **front-end prototype** with mock data in `src/lib/data/`. To make it
production-ready:

1. **Auth & student verification** — wire the upload area to an auth provider
   (NextAuth / Clerk) + a verification service for `.edu.my` domains.
2. **Payments** — integrate a Malaysian gateway (Billplz, iPay88, SenangPay)
   for FPX, Touch 'n Go eWallet, and cards.
3. **Real catalog** — replace `src/lib/data/devices.ts` with a CMS or DB
   (Supabase / PlanetScale).
4. **Maps** — swap `MalaysiaMap.tsx` for the Google Maps Embed/JS API using a
   `NEXT_PUBLIC_GOOGLE_MAPS_KEY`.
5. **Invoices** — generate real PDFs server-side (e.g. `@react-pdf/renderer`)
   instead of the placeholder download buttons.

---

## ♿ Accessibility & Performance Notes

- All interactive elements are keyboard-reachable via Radix UI primitives.
- `useReducedMotion()` is respected in the hero and count-up animations.
- Images use `next/image`-compatible remote patterns; the prototype uses
  Unsplash-hosted photos for device/office visuals.

---

© LoopTech Sdn. Bhd. — Built in Malaysia 🇲🇾 — Promoting UN SDG 4 & 12.

import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LoopTech — Empowering Education, Sustaining the Planet",
  description:
    "LoopTech leases certified, eco-refurbished computers to Malaysian students. Closing the digital divide while fighting E-waste. SDG 4 & SDG 12.",
  keywords: [
    "LoopTech",
    "PC rental Malaysia",
    "student laptop",
    "refurbished computer",
    "E-waste",
    "SDG 4",
    "SDG 12",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "dark scroll-smooth",
        spaceGrotesk.variable,
        orbitron.variable,
        jetbrains.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

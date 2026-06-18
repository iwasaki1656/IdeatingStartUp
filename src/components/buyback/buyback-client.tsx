"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Building2,
  CheckCircle2,
  Coins,
  FileCheck,
  Leaf,
  MonitorUp,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { formatRM } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

/* ============================ 5.1 Assessment Simulator ============================ */

const BRANDS = ["Apple", "Lenovo", "Dell", "HP", "ASUS", "Acer", "Microsoft", "Other"];
const CPUS = ["Apple M1/M2", "Core i7 (gen 10+)", "Core i5 (gen 10+)", "Ryzen 7", "Ryzen 5", "Core i3 / Older", "Unknown"];
const CONDITIONS = [
  { key: "Fully Functional", label: "Fully Functional", desc: "Boots up, works perfectly", multiplier: 1.0 },
  { key: "Minor Wear", label: "Minor Wear", desc: "Works fine, some scratches", multiplier: 0.75 },
  { key: "Screen Scratched", label: "Screen Scratched", desc: "Functional but screen damaged", multiplier: 0.5 },
  { key: "Dead", label: "Dead / Won't Turn On", desc: "Not booting, parts only", multiplier: 0.25 },
];

const STEPS = ["Brand", "Model & Year", "CPU", "Condition", "Result"] as const;

export function BuybackClient() {
  return (
    <div className="container space-y-16 py-12">
      <AssessmentSimulator />
      <CorporateForm />
    </div>
  );
}

function AssessmentSimulator() {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [cpu, setCpu] = useState("");
  const [condition, setCondition] = useState("");
  const [buybackChoice, setBuybackChoice] = useState<"cash" | "eco" | null>(null);

  const { buybackPrice, ecoPoints } = useMemo(
    () => calculateEstimate({ brand, cpu, year, condition }),
    [brand, cpu, year, condition]
  );

  const reset = () => {
    setStep(0);
    setBrand("");
    setModel("");
    setYear("");
    setCpu("");
    setCondition("");
    setBuybackChoice(null);
  };

  const canAdvance =
    (step === 0 && brand) ||
    (step === 1 && model && year) ||
    (step === 2 && cpu) ||
    (step === 3 && condition);

  return (
    <section id="assess">
      <ScrollReveal className="mb-8 text-center">
        <span className="font-mono text-sm uppercase tracking-widest text-primary">
          Online Assessment Simulator
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          What&apos;s your PC <span className="text-gradient-neon">worth?</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Get an instant estimate in under a minute. Sell for cash or donate for
          Eco-Contribution Points.
        </p>
      </ScrollReveal>

      <Card className="mx-auto max-w-2xl overflow-hidden">
        {/* Step indicator */}
        <div className="flex items-center gap-2 border-b border-white/5 px-6 py-4">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  i < step
                    ? "bg-eco text-background"
                    : i === step
                    ? "bg-primary text-background shadow-[0_0_14px_-2px_rgba(34,211,238,0.9)]"
                    : "bg-white/5 text-muted-foreground"
                }`}
              >
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-px flex-1 transition-colors ${
                    i < step ? "bg-eco/50" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <CardContent className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* STEP 0: Brand */}
              {step === 0 && (
                <div>
                  <h3 className="mb-4 font-display text-xl font-semibold">
                    Select the brand
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {BRANDS.map((b) => (
                      <OptionCard
                        key={b}
                        label={b}
                        selected={brand === b}
                        onClick={() => setBrand(b)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 1: Model & Year */}
              {step === 1 && (
                <div>
                  <h3 className="mb-4 font-display text-xl font-semibold">
                    Model & year
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="model">Model name</Label>
                      <Input
                        id="model"
                        placeholder="e.g. ThinkPad T14, MacBook Air, XPS 13"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year of purchase</Label>
                      <Input
                        id="year"
                        type="number"
                        placeholder="e.g. 2021"
                        min="2010"
                        max={new Date().getFullYear()}
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CPU */}
              {step === 2 && (
                <div>
                  <h3 className="mb-4 font-display text-xl font-semibold">
                    Which processor?
                  </h3>
                  <div className="grid gap-2.5">
                    {CPUS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCpu(c)}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                          cpu === c
                            ? "border-primary bg-primary/15 text-primary shadow-[0_0_14px_-4px_rgba(34,211,238,0.7)]"
                            : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Condition */}
              {step === 3 && (
                <div>
                  <h3 className="mb-4 font-display text-xl font-semibold">
                    Current condition
                  </h3>
                  <div className="grid gap-2.5">
                    {CONDITIONS.map((c) => (
                      <button
                        key={c.key}
                        onClick={() => setCondition(c.key)}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                          condition === c.key
                            ? "border-primary bg-primary/15 shadow-[0_0_14px_-4px_rgba(34,211,238,0.7)]"
                            : "border-white/10 bg-white/[0.03] hover:border-primary/40"
                        }`}
                      >
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              condition === c.key ? "text-primary" : ""
                            }`}
                          >
                            {c.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {c.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Result */}
              {step === 4 && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-eco/15"
                  >
                    <Coins className="h-8 w-8 text-eco" />
                  </motion.div>
                  <h3 className="mt-4 font-display text-2xl font-bold">
                    Your estimate
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {brand} {model} ({year})
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {/* Buyback price */}
                    <div className="rounded-2xl border border-primary/30 bg-primary/[0.05] p-5">
                      <Coins className="mx-auto h-7 w-7 text-primary" />
                      <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                        Estimated Buyback
                      </p>
                      <p className="mt-1 font-display text-3xl font-bold text-gradient-neon">
                        {formatRM(buybackPrice)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Cash via FPX / TnG eWallet
                      </p>
                    </div>
                    {/* Eco points */}
                    <div className="rounded-2xl border border-eco/30 bg-eco/[0.05] p-5">
                      <Award className="mx-auto h-7 w-7 text-eco" />
                      <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                        Or Eco-Contribution
                      </p>
                      <p className="mt-1 font-display text-3xl font-bold text-gradient-eco">
                        {ecoPoints.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Points (tax-deductible donation)
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2 text-xs text-eco">
                    <Leaf className="h-3.5 w-3.5" />
                    Saves ~{(buybackPrice * 4).toFixed(0)} kg CO₂ vs. new
                    manufacturing
                  </div>

                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    {buybackChoice ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex w-full flex-col items-center gap-2 rounded-xl border border-eco/30 bg-eco/[0.06] p-4 text-center"
                      >
                        <CheckCircle2 className="h-7 w-7 text-eco" />
                        <p className="font-semibold text-eco">
                          {buybackChoice === "cash" ? "Cash Buyback Accepted!" : "Eco Points Donation Submitted!"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {buybackChoice === "cash"
                            ? "Our team will contact you within 1 business day to arrange pickup and payment."
                            : "Your eco-contribution is registered. Your tax-deductible certificate will be emailed shortly."}
                        </p>
                      </motion.div>
                    ) : (
                      <>
                        <Button variant="neon" className="flex-1" onClick={() => setBuybackChoice("cash")}>
                          Accept Cash Buyback
                        </Button>
                        <Button variant="eco" className="flex-1" onClick={() => setBuybackChoice("eco")}>
                          Donate for Eco Points
                        </Button>
                      </>
                    )}
                  </div>
                  <button
                    onClick={reset}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Start over
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons (hidden on result step) */}
          {step < 4 && (
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                Back
              </Button>
              <Button
                variant="neon"
                size="sm"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance}
              >
                {step === 3 ? "See Estimate" : "Continue"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
        selected
          ? "border-primary bg-primary/15 text-primary shadow-[0_0_14px_-4px_rgba(34,211,238,0.7)]"
          : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

/** Rough heuristic estimate for the prototype. */
function calculateEstimate({
  brand,
  cpu,
  year,
  condition,
}: {
  brand: string;
  cpu: string;
  year: string;
  condition: string;
}) {
  // Base values by brand tier
  const brandBase: Record<string, number> = {
    Apple: 900,
    Microsoft: 700,
    Lenovo: 600,
    Dell: 600,
    HP: 550,
    ASUS: 550,
    Acer: 450,
    Other: 400,
  };
  // CPU tier multiplier
  const cpuMult: Record<string, number> = {
    "Apple M1/M2": 1.2,
    "Core i7 (gen 10+)": 1.1,
    "Ryzen 7": 1.05,
    "Core i5 (gen 10+)": 0.95,
    "Ryzen 5": 0.9,
    "Core i3 / Older": 0.65,
    Unknown: 0.7,
  };
  // Age depreciation
  const yr = parseInt(year, 10);
  const currentYear = new Date().getFullYear();
  const age = yr ? Math.max(0, currentYear - yr) : 4;
  const ageFactor = Math.max(0.2, 1 - age * 0.15);

  const cond = CONDITIONS.find((c) => c.key === condition);
  const condMult = cond?.multiplier ?? 0.5;

  const base = brandBase[brand] ?? 450;
  const cpuM = cpuMult[cpu] ?? 0.7;

  const buybackPrice = Math.round(
    (base * cpuM * ageFactor * condMult) / 10
  ) * 10; // round to nearest 10

  // Eco points = buyback value in points × 1.5 bonus
  const ecoPoints = Math.round((buybackPrice * 1.5) / 5) * 5;

  return { buybackPrice, ecoPoints };
}

/* ============================ 5.2 Corporate B2B Form ============================ */

const benefits = [
  {
    icon: ShieldCheck,
    title: "Data Destruction Certificates",
    desc: "NIST-compliant secure wipe with a verifiable certificate for every device — auditable for your records.",
  },
  {
    icon: Leaf,
    title: "SDGs Contribution Report",
    desc: "A quantified ESG/CSR report showing CO₂ saved and students enabled, ready for your sustainability disclosures.",
  },
  {
    icon: Building2,
    title: "Bulk Logistics Handled",
    desc: "We coordinate pickup of dozens or hundreds of devices nationwide during your office relocation.",
  },
];

export function CorporateForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="corporate" className="grid gap-10 lg:grid-cols-5">
      {/* Left: value props */}
      <div className="lg:col-span-2">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-1 text-xs font-medium text-neon-purple">
            <Sparkles className="h-3.5 w-3.5" />
            For Corporates
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
            Offload fleet devices.{" "}
            <span className="text-gradient-eco">Boost your ESG.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Relocating or upgrading? Turn your used laptops into measurable
            sustainability impact — with full documentation for your audits.
          </p>

          <div className="mt-8 space-y-4">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="flex gap-3 rounded-xl border border-white/10 bg-card/40 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-eco/15">
                    <Icon className="h-5 w-5 text-eco" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{b.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Badge variant="eco">
              <FileCheck className="h-3.5 w-3.5" /> ISO-certified data wiping
            </Badge>
            <Badge variant="purple">
              <MonitorUp className="h-3.5 w-3.5" /> Nationwide pickup
            </Badge>
          </div>
        </ScrollReveal>
      </div>

      {/* Right: form */}
      <div className="lg:col-span-3">
        <Card>
          <CardContent className="p-6 sm:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-eco/15">
                  <CheckCircle2 className="h-8 w-8 text-eco" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  Request received!
                </h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Our B2B team will reach out within 1 business day with a
                  tailored buyback proposal and logistics plan.
                </p>
                <Button
                  variant="outline"
                  className="mt-5"
                  onClick={() => setSubmitted(false)}
                >
                  Submit another request
                </Button>
              </motion.div>
            ) : (
              <>
                <h3 className="font-display text-xl font-semibold">
                  Bulk Donation / Buyback Inquiry
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell us about your fleet. We&apos;ll prepare a custom proposal.
                </p>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="company">Company name *</Label>
                      <Input
                        id="company"
                        required
                        placeholder="Acme Corp Sdn. Bhd."
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact">Contact person *</Label>
                      <Input
                        id="contact"
                        required
                        placeholder="Jane Doe"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Work email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="jane@acme.com"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="+60 1x-xxx xxxx"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="qty">Approx. device quantity *</Label>
                      <Input
                        id="qty"
                        type="number"
                        required
                        min="1"
                        placeholder="e.g. 50"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Pickup location *</Label>
                      <Input
                        id="location"
                        required
                        placeholder="e.g. KL, Penang, JB"
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">
                      Tell us about the devices (brands, ages, conditions)
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="e.g. 30x Dell Latitude (2020), 20x MacBook Air M1 — all functional"
                      className="mt-1.5"
                    />
                  </div>
                  <Button type="submit" variant="neon" size="lg" className="w-full">
                    Submit Inquiry
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    We respond within 1 business day · Your data stays private
                  </p>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

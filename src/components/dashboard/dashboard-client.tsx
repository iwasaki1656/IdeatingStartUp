"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarClock,
  CreditCard,
  Download,
  FileText,
  Plus,
  RotateCw,
  Send,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  Truck,
  Upload,
  Wallet,
} from "lucide-react";

import type { PaymentMethod, PaymentStatus } from "@/lib/types";
import {
  activeRental,
  billingHistory,
  paymentMethods,
} from "@/lib/data/dashboard";
import { formatRM } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const statusVariant: Record<PaymentStatus, "eco" | "warning" | "danger"> = {
  Completed: "eco",
  Pending: "warning",
  Failed: "danger",
};

const paymentIcon: Record<PaymentMethod["type"], typeof Wallet> = {
  FPX: Wallet,
  "Touch 'n Go eWallet": Smartphone,
  "Credit Card": CreditCard,
  GrabPay: Smartphone,
};

export function DashboardClient() {
  return (
    <div className="container space-y-8 py-10">
      {/* Greeting */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Welcome back, <span className="text-gradient-neon">Aisyah</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your active rental, payments, and student verification.
          </p>
        </div>
        <Badge variant="eco" className="h-fit gap-1.5 px-3 py-1.5 text-sm">
          <BadgeCheck className="h-4 w-4" />
          Verified Student
        </Badge>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT: Rental status (spans 2) */}
        <div className="lg:col-span-2">
          <ActiveRentalCard />
        </div>
        {/* RIGHT: Verification */}
        <div>
          <VerificationCard />
        </div>
      </div>

      {/* Billing + payment methods */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BillingCard />
        </div>
        <div>
          <PaymentMethodsCard />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- 3.1 Active Rental ---------------------------- */
function ActiveRentalCard() {
  // Compute progress to return date
  const { daysLeft, progressPct, totalDays } = useMemo(() => {
    const start = new Date(activeRental.startDate).getTime();
    const end = new Date(activeRental.returnDate).getTime();
    const now = Date.now();
    const total = Math.round((end - start) / 86_400_000);
    const left = Math.max(0, Math.round((end - now) / 86_400_000));
    const elapsed = total - left;
    return {
      totalDays: total,
      daysLeft: left,
      progressPct: Math.min(100, Math.round((elapsed / total) * 100)),
    };
  }, []);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Active Rental Status</CardTitle>
        <Badge variant="eco" className="gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-eco" />
          {activeRental.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Device image */}
          <div className="relative w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent sm:w-56">
            <img
              src={activeRental.deviceImage}
              alt={activeRental.deviceName}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h3 className="font-display text-xl font-semibold">
              {activeRental.deviceName}
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Detail
                icon={FileText}
                label="Serial Number"
                value={activeRental.serialNumber}
              />
              <Detail
                icon={CalendarClock}
                label="Return Date"
                value={new Date(activeRental.returnDate).toLocaleDateString(
                  "en-MY",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              />
              <Detail
                icon={Wallet}
                label="Monthly Fee"
                value={formatRM(activeRental.monthlyFeeRM)}
              />
              <Detail
                icon={CalendarClock}
                label="Days Remaining"
                value={`${daysLeft} days`}
                accent
              />
            </div>

            {/* Progress bar */}
            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Contract Progress</span>
                <span>
                  {progressPct}% · Day {totalDays - daysLeft} of {totalDays}
                </span>
              </div>
              <Progress value={progressPct} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
          <Button variant="outline" size="sm" className="justify-start">
            <RotateCw className="h-4 w-4" />
            Request Extension
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <TriangleAlert className="h-4 w-4" />
            Report Malfunction
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <Truck className="h-4 w-4" />
            Initiate Return
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
      <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </p>
      <p className={`mt-1 text-sm font-medium ${accent ? "text-primary" : ""}`}>
        {value}
      </p>
    </div>
  );
}

/* ------------------------------ 3.3 Verification ----------------------------- */
function VerificationCard() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldCheck className="h-5 w-5 text-eco" />
          Student Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Verified badge */}
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-eco/30 bg-eco/[0.06] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-eco/20">
            <BadgeCheck className="h-6 w-6 text-eco" />
          </div>
          <div>
            <p className="text-sm font-semibold text-eco">Verified Student</p>
            <p className="text-xs text-muted-foreground">
              Student-tier pricing unlocked
            </p>
          </div>
        </div>

        <p className="mb-2 text-sm text-muted-foreground">
          Upload a student ID or verify your institution email (.edu.my)
        </p>

        {/* Upload area */}
        <label
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all ${
            uploaded
              ? "border-eco/50 bg-eco/[0.06]"
              : "border-white/15 hover:border-primary/50 hover:bg-white/[0.02]"
          }`}
        >
          <Upload className="h-6 w-6 text-primary" />
          <span className="text-sm font-medium">
            {uploaded ? "student_card.jpg uploaded" : "Drop file or click to upload"}
          </span>
          <span className="text-xs text-muted-foreground">
            JPG, PNG or PDF · max 5MB
          </span>
          <input
            type="file"
            className="hidden"
            onChange={() => setUploaded(true)}
          />
        </label>

        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Send className="h-3.5 w-3.5" />
          Or verify via .edu.my email instead
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------ 3.2 Billing ----------------------------- */
function BillingCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Payment & Billing History</CardTitle>
        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto scrollbar-cyber">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 pr-4 font-medium">Description</th>
                <th className="pb-3 pr-4 text-right font-medium">Amount</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                >
                  <td className="py-3 pr-4 text-muted-foreground">
                    {new Date(row.date).toLocaleDateString("en-MY", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 pr-4">{row.description}</td>
                  <td className="py-3 pr-4 text-right font-medium">
                    {formatRM(row.amountRM)}
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={statusVariant[row.status]}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-primary transition-colors hover:bg-primary/10">
                      <Download className="h-3.5 w-3.5" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------- Payment methods management ------------------------ */
function PaymentMethodsCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Payment Methods</CardTitle>
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {paymentMethods.map((pm) => {
          const Icon = paymentIcon[pm.type];
          return (
            <div
              key={pm.id}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                pm.isDefault
                  ? "border-primary/30 bg-primary/[0.04]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{pm.label}</p>
                <p className="text-xs text-muted-foreground">{pm.detail}</p>
              </div>
              {pm.isDefault && (
                <Badge variant="default" className="text-[10px]">
                  Default
                </Badge>
              )}
            </div>
          );
        })}
        <p className="pt-1 text-center text-xs text-muted-foreground">
          Supports FPX, Touch &apos;n Go eWallet, GrabPay & major cards
        </p>
      </CardContent>
    </Card>
  );
}

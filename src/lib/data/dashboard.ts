import type {
  ActiveRental,
  BillingRecord,
  PaymentMethod,
} from "../types";

export const activeRental: ActiveRental = {
  deviceId: "dev-001",
  deviceName: "Lenovo ThinkPad T14 Gen3",
  deviceImage:
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
  serialNumber: "LT-TP14-2024-0xA93F",
  startDate: "2026-06-18",
  returnDate: "2028-06-18",
  monthlyFeeRM: 35,
  status: "Active",
};

export const billingHistory: BillingRecord[] = [
  { id: "inv-006", date: "2026-06-18", description: "June 2026 — Monthly Rental", amountRM: 35, status: "Pending" },
  { id: "inv-005", date: "2026-05-18", description: "May 2026 — Monthly Rental", amountRM: 35, status: "Completed" },
  { id: "inv-004", date: "2026-04-18", description: "April 2026 — Monthly Rental", amountRM: 35, status: "Completed" },
  { id: "inv-003", date: "2026-03-18", description: "March 2026 — Monthly Rental", amountRM: 35, status: "Completed" },
  { id: "inv-002", date: "2026-02-18", description: "Feb 2026 — Damage Protection", amountRM: 8, status: "Completed" },
  { id: "inv-001", date: "2026-01-18", description: "Jan 2026 — Activation & First Month", amountRM: 70, status: "Completed" },
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm-1",
    type: "Touch 'n Go eWallet",
    label: "Touch 'n Go eWallet",
    detail: "Linked: 012-***4471",
    isDefault: true,
  },
  {
    id: "pm-2",
    type: "FPX",
    label: "FPX — Maybank",
    detail: "Account ending 8842",
    isDefault: false,
  },
  {
    id: "pm-3",
    type: "Credit Card",
    label: "Visa •••• 4096",
    detail: "Exp 11/27",
    isDefault: false,
  },
];

// Environmental impact tracker (Homepage counter)
export const impactStats = {
  studentsEmpowered: 4860,
  devicesSaved: 5240,
  co2ReducedKg: 892_400,
};

// Homepage 4-step guide
export const userGuideSteps = [
  {
    step: 1,
    title: "Select Device Online",
    description: "Browse our catalog and pick a PC that fits your studies and budget.",
    icon: "laptop",
  },
  {
    step: 2,
    title: "Verify Student Identity",
    description: "Upload your student ID or .edu.my email to unlock student-tier pricing.",
    icon: "badge-check",
  },
  {
    step: 3,
    title: "Payment & Delivery",
    description: "Choose FPX, Touch 'n Go, or card. Get it delivered or self-pickup free.",
    icon: "truck",
  },
  {
    step: 4,
    title: "Use & Return/Upgrade",
    description: "Study worry-free for 2 years. Then return, extend, or upgrade.",
    icon: "refresh-cw",
  },
];

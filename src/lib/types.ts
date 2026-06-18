// Core domain types for LoopTech

export type DeviceCondition = "New" | "Rebuilt";

export type StudentTag =
  | "For Programming"
  | "For Online Classes & Reports"
  | "For Video Editing & Design";

export type StockStatus =
  | "In Stock"
  | "Low Stock"
  | "In-Store Pickup Only"
  | "Out of Stock";

export interface DeviceConditionLog {
  part: string;
  action: "Replaced" | "Cleaned" | "Tested" | "Original";
  detail: string;
}

export interface Device {
  id: string;
  slug: string;
  name: string;
  brand: string;
  condition: DeviceCondition;
  image: string;
  gallery: string[];
  monthlyFeeRM: number; // rental per month
  stock: StockStatus;
  stockCount: number;
  cpu: string;
  cpuFamily: "Core i5" | "Core i7" | "Ryzen 5" | "Ryzen 7";
  ramGB: 8 | 16 | 32;
  storageGB: 256 | 512 | 1024;
  storageType: "SSD" | "NVMe";
  os: "Windows 11" | "Windows 10" | "macOS" | "Ubuntu";
  gpu: string;
  screenSizeInch: number;
  weightKg: number;
  batteryHours: number;
  ports: string[];
  tags: StudentTag[];
  studentDescription: string;
  capabilities: string[];
  conditionLog: DeviceConditionLog[];
  cosmeticNote: string;
  co2SavedKg: number; // environmental impact vs buying new
}

export type RentalStatus = "Active" | "Returning" | "Overdue";

export interface ActiveRental {
  deviceId: string;
  deviceName: string;
  deviceImage: string;
  serialNumber: string;
  startDate: string; // ISO
  returnDate: string; // ISO
  monthlyFeeRM: number;
  status: RentalStatus;
}

export type PaymentStatus = "Completed" | "Pending" | "Failed";

export interface BillingRecord {
  id: string;
  date: string; // ISO
  description: string;
  amountRM: number;
  status: PaymentStatus;
}

export interface PaymentMethod {
  id: string;
  type: "FPX" | "Touch 'n Go eWallet" | "Credit Card" | "GrabPay";
  label: string;
  detail: string;
  isDefault: boolean;
}

export type OfficeService =
  | "Self-Pickup Available"
  | "Repair Hub"
  | "Used Tech Buying Counter"
  | "Student Verification";

export interface OfficeLocation {
  id: string;
  name: string;
  state: string;
  address: string;
  hours: string;
  whatsapp: string;
  phone: string;
  image: string;
  services: OfficeService[];
  liveInventory: number;
  // normalized map coordinates (percentage on the Malaysia map svg)
  mapX: number;
  mapY: number;
}

export interface AssessmentStep {
  key: string;
  label: string;
  options: string[];
}

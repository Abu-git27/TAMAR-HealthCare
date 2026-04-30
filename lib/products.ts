export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "cardiovit-ft1",
    name: "CARDIOVIT FT-1 ECG Machine",
    category: "ECG",
    description:
      "Portable 12-lead ECG device with high precision and touchscreen interface.",
    image: "/ecg.jpg",
  },
  {
    id: "patient-monitor",
    name: "Patient Monitor",
    category: "ICU",
    description: "Advanced monitoring system for real-time patient vitals.",
    image: "/monitor.jpg",
  },
  {
    id: "anaesthesia-machine",
    name: "Anaesthesia Machine",
    category: "OT",
    description:
      "Reliable anaesthesia delivery system for surgical procedures.",
    image: "/anaesthesia.jpg",
  },
];
import { Truck, ShieldCheck, RotateCcw, BadgeIndianRupee } from "lucide-react";

const BADGES = [
  { icon: Truck, label: "2–4 Day Delivery", detail: "Free above ₹15,000" },
  { icon: ShieldCheck, label: "Secure Payments", detail: "Card, UPI, wallets" },
  { icon: RotateCcw, label: "Easy Returns", detail: "14-day window" },
  { icon: BadgeIndianRupee, label: "Cash on Delivery", detail: "Available pan-India" },
];

export function TrustBadges() {
  return (
    <div className="border-y border-white/10 bg-krama-bg px-6 py-10 md:px-10">
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-6 sm:grid-cols-4">
        {BADGES.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-pill bg-krama-accent/10 text-krama-accent">
              <Icon size={18} strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium uppercase tracking-label text-krama-text-primary">
                {label}
              </p>
              <p className="truncate text-xs text-krama-text-primary/45">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

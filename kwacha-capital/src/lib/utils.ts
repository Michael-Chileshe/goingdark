export function formatCurrency(amount: number, currency = "ZMW"): string {
  if (currency === "BTC") {
    return `${amount.toFixed(6)} BTC`;
  }
  if (currency === "USDT" || currency === "USD") {
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `K${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
      return "text-emerald-400";
    case "pending":
      return "text-amber-400";
    case "failed":
      return "text-red-400";
    case "open":
      return "text-teal-400";
    case "closed":
      return "text-slate-400";
    default:
      return "text-slate-400";
  }
}

export function getPnlColor(value: number): string {
  return value >= 0 ? "text-emerald-400" : "text-red-400";
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case "low":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "medium-low":
      return "bg-teal-500/20 text-teal-400 border-teal-500/30";
    case "medium":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    default:
      return "bg-slate-500/20 text-slate-400 border-slate-500/30";
  }
}

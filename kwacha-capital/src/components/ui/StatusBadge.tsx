"use client";

import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  failed: "bg-red-500/15 text-red-400 border-red-500/30",
  open: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  closed: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  inactive: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("badge", statusStyles[status] || statusStyles.pending)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

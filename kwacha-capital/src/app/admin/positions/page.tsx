"use client";

import { useState } from "react";
import { mockPositions } from "@/data/mock";
import { formatCurrency, formatPercent, formatDate, getPnlColor, cn } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import { Position } from "@/types";

export default function PositionsPage() {
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all");
  const [selected, setSelected] = useState<Position | null>(null);

  const filtered = mockPositions.filter((p) => filter === "all" || p.status === filter);
  const totalPnl = filtered.reduce((sum, p) => sum + p.pnl, 0);
  const openCount = mockPositions.filter((p) => p.status === "open").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Trading Positions</h1>
          <p className="text-sm text-slate-500">
            {openCount} open positions &middot; Total P/L: <span className={getPnlColor(totalPnl)}>{formatCurrency(totalPnl)}</span>
          </p>
        </div>
        <div className="flex gap-2">
          {(["all", "open", "closed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Ticker</th>
                <th className="table-header">Company</th>
                <th className="table-header">Strategy</th>
                <th className="table-header text-right">Entry</th>
                <th className="table-header text-right">Current</th>
                <th className="table-header text-right">Shares</th>
                <th className="table-header text-right">P/L</th>
                <th className="table-header text-right">Return</th>
                <th className="table-header">Status</th>
                <th className="table-header">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="cursor-pointer transition-colors hover:bg-slate-800/30"
                  onClick={() => setSelected(p)}
                >
                  <td className="table-cell font-semibold text-white">{p.ticker}</td>
                  <td className="table-cell max-w-[180px] truncate">{p.company}</td>
                  <td className="table-cell">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                      {p.strategy}
                    </span>
                  </td>
                  <td className="table-cell text-right">K{p.entryPrice.toFixed(2)}</td>
                  <td className="table-cell text-right">K{p.currentPrice.toFixed(2)}</td>
                  <td className="table-cell text-right">{p.shares.toLocaleString()}</td>
                  <td className={cn("table-cell text-right font-medium", getPnlColor(p.pnl))}>
                    {formatCurrency(p.pnl)}
                  </td>
                  <td className={cn("table-cell text-right font-medium", getPnlColor(p.pnlPercent))}>
                    {formatPercent(p.pnlPercent)}
                  </td>
                  <td className="table-cell"><StatusBadge status={p.status} /></td>
                  <td className="table-cell text-xs text-slate-500">{formatDate(p.entryDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Position Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected ? `${selected.ticker} - ${selected.company}` : ""}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-800/50 p-3">
                <p className="text-xs text-slate-500">Entry Price</p>
                <p className="text-sm font-semibold text-white">K{selected.entryPrice.toFixed(2)}</p>
              </div>
              <div className="rounded-lg bg-slate-800/50 p-3">
                <p className="text-xs text-slate-500">Current Price</p>
                <p className="text-sm font-semibold text-white">K{selected.currentPrice.toFixed(2)}</p>
              </div>
              <div className="rounded-lg bg-slate-800/50 p-3">
                <p className="text-xs text-slate-500">Shares</p>
                <p className="text-sm font-semibold text-white">{selected.shares.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-slate-800/50 p-3">
                <p className="text-xs text-slate-500">P/L</p>
                <p className={cn("text-sm font-semibold", getPnlColor(selected.pnl))}>
                  {formatCurrency(selected.pnl)} ({formatPercent(selected.pnlPercent)})
                </p>
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">Strategy</p>
              <span className="rounded bg-teal-600/20 px-2.5 py-1 text-xs font-medium text-teal-400">
                {selected.strategy}
              </span>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">Trade Reasoning</p>
              <p className="text-sm leading-relaxed text-slate-300">{selected.reasoning}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Entry: {formatDate(selected.entryDate)}</span>
              {selected.exitDate && <span>Exit: {formatDate(selected.exitDate)}</span>}
              <StatusBadge status={selected.status} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

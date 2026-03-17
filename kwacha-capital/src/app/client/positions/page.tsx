"use client";

import { useState } from "react";
import { mockPositions, mockStrategies } from "@/data/mock";
import { formatPercent, formatDate, getPnlColor, getRiskColor, cn } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import { Position } from "@/types";

export default function ClientPositionsPage() {
  const [selected, setSelected] = useState<Position | null>(null);
  const [strategyFilter, setStrategyFilter] = useState<string>("all");

  const filtered = mockPositions.filter(
    (p) => strategyFilter === "all" || p.strategy === strategyFilter
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Fund Positions</h1>
        <p className="text-sm text-slate-500">
          See exactly where your money is invested and why each position was taken.
        </p>
      </div>

      {/* Strategy Overview Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {mockStrategies.map((s) => (
          <button
            key={s.id}
            onClick={() => setStrategyFilter(strategyFilter === s.id ? "all" : s.id)}
            className={cn(
              "card-hover p-4 text-left transition-all",
              strategyFilter === s.id && "border-teal-500/50 bg-teal-600/10"
            )}
          >
            <div className="flex items-center justify-between">
              <span className={cn("badge text-[10px]", getRiskColor(s.riskLevel))}>{s.riskLevel}</span>
              <span className={cn("text-xs font-medium", getPnlColor(s.pnl))}>
                {formatPercent((s.pnl / 245000) * 100)}
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-white">{s.name}</p>
            <p className="text-[10px] text-slate-500">{s.allocation}% allocation</p>
          </button>
        ))}
      </div>

      {/* Positions Table */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate-800 px-5 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              {strategyFilter === "all" ? "All Positions" : mockStrategies.find((s) => s.id === strategyFilter)?.name}
            </h3>
            {strategyFilter !== "all" && (
              <button onClick={() => setStrategyFilter("all")} className="text-xs text-teal-400 hover:text-teal-300">
                Show all
              </button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Ticker</th>
                <th className="table-header">Company</th>
                <th className="table-header">Sector</th>
                <th className="table-header text-right">Entry</th>
                <th className="table-header text-right">Current</th>
                <th className="table-header text-right">Return</th>
                <th className="table-header">Status</th>
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
                  <td className="table-cell">{p.company}</td>
                  <td className="table-cell">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-xs">{p.sector}</span>
                  </td>
                  <td className="table-cell text-right">K{p.entryPrice.toFixed(2)}</td>
                  <td className="table-cell text-right">K{p.currentPrice.toFixed(2)}</td>
                  <td className={cn("table-cell text-right font-medium", getPnlColor(p.pnlPercent))}>
                    {formatPercent(p.pnlPercent)}
                  </td>
                  <td className="table-cell"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Position Detail Modal - shows reasoning */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected ? `${selected.ticker} - Position Details` : ""}>
        {selected && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-800/50 p-4">
              <h4 className="mb-1 text-xs font-medium uppercase tracking-wider text-teal-400">Why We Invested</h4>
              <p className="text-sm leading-relaxed text-slate-300">{selected.reasoning}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-800/50 p-3">
                <p className="text-xs text-slate-500">Company</p>
                <p className="text-sm font-medium text-white">{selected.company}</p>
              </div>
              <div className="rounded-lg bg-slate-800/50 p-3">
                <p className="text-xs text-slate-500">Strategy</p>
                <span className="rounded bg-teal-600/20 px-2 py-0.5 text-xs font-medium text-teal-400">
                  {selected.strategy}
                </span>
              </div>
              <div className="rounded-lg bg-slate-800/50 p-3">
                <p className="text-xs text-slate-500">Entry Price</p>
                <p className="text-sm font-medium text-white">K{selected.entryPrice.toFixed(2)}</p>
              </div>
              <div className="rounded-lg bg-slate-800/50 p-3">
                <p className="text-xs text-slate-500">Current Price</p>
                <p className="text-sm font-medium text-white">K{selected.currentPrice.toFixed(2)}</p>
              </div>
              <div className="rounded-lg bg-slate-800/50 p-3">
                <p className="text-xs text-slate-500">Return</p>
                <p className={cn("text-sm font-semibold", getPnlColor(selected.pnlPercent))}>
                  {formatPercent(selected.pnlPercent)}
                </p>
              </div>
              <div className="rounded-lg bg-slate-800/50 p-3">
                <p className="text-xs text-slate-500">Entry Date</p>
                <p className="text-sm font-medium text-white">{formatDate(selected.entryDate)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Sector: {selected.sector}</span>
              <StatusBadge status={selected.status} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

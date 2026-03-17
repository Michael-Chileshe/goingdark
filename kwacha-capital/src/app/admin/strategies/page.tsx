"use client";

import { useState } from "react";
import { mockStrategies } from "@/data/mock";
import { formatCurrency, formatPercent, getPnlColor, getRiskColor, cn } from "@/lib/utils";
import { Strategy } from "@/types";

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>(mockStrategies);

  const totalPnl = strategies.reduce((sum, s) => sum + s.pnl, 0);
  const totalAllocation = strategies.reduce((sum, s) => sum + s.allocation, 0);

  const toggleStrategy = (id: string) => {
    setStrategies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const updateAllocation = (id: string, value: number) => {
    setStrategies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, allocation: value } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Trading Strategies</h1>
          <p className="text-sm text-slate-500">
            Manage allocation and risk across {strategies.length} strategies
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-slate-500">Total Allocation</p>
            <p className={cn("text-sm font-bold", totalAllocation === 100 ? "text-emerald-400" : "text-amber-400")}>
              {totalAllocation}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Total P/L</p>
            <p className={cn("text-sm font-bold", getPnlColor(totalPnl))}>{formatCurrency(totalPnl)}</p>
          </div>
        </div>
      </div>

      {totalAllocation !== 100 && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
          Allocation does not sum to 100%. Current total: {totalAllocation}%. Please adjust.
        </div>
      )}

      <div className="grid gap-4">
        {strategies.map((s) => (
          <div key={s.id} className={cn("card-hover p-5", !s.active && "opacity-60")}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{s.name}</h3>
                  <span className={cn("badge", getRiskColor(s.riskLevel))}>
                    {s.riskLevel} risk
                  </span>
                  <span className={cn(
                    "badge",
                    s.active
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-slate-500/15 text-slate-400 border-slate-500/30"
                  )}>
                    {s.active ? "Active" : "Paused"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-slate-500">Allocation</p>
                    <div className="mt-1 flex items-center gap-2">
                      <input
                        type="range"
                        min={0}
                        max={50}
                        value={s.allocation}
                        onChange={(e) => updateAllocation(s.id, parseInt(e.target.value))}
                        className="h-1.5 w-24 appearance-none rounded-full bg-slate-700 accent-teal-500"
                      />
                      <span className="text-sm font-bold text-white">{s.allocation}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Target Return</p>
                    <p className="mt-1 text-sm font-semibold text-white">{s.targetReturn}% / yr</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Open Positions</p>
                    <p className="mt-1 text-sm font-semibold text-white">{s.positions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">P/L</p>
                    <p className={cn("mt-1 text-sm font-semibold", getPnlColor(s.pnl))}>
                      {formatCurrency(s.pnl)} ({formatPercent((s.pnl / 245000) * 100)})
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleStrategy(s.id)}
                className={cn(
                  "ml-4 rounded-lg px-4 py-2 text-xs font-medium transition-colors",
                  s.active
                    ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                    : "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30"
                )}
              >
                {s.active ? "Pause" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Strategy Performance Summary */}
      <div className="card p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">Risk Management Parameters</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-800/50 p-4">
            <p className="text-xs text-slate-500">Max Position Size</p>
            <p className="mt-1 text-lg font-bold text-white">5%</p>
            <p className="text-xs text-slate-500">of total AUM per position</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 p-4">
            <p className="text-xs text-slate-500">Stop Loss</p>
            <p className="mt-1 text-lg font-bold text-white">-8%</p>
            <p className="text-xs text-slate-500">automatic exit trigger</p>
          </div>
          <div className="rounded-lg bg-slate-800/50 p-4">
            <p className="text-xs text-slate-500">Max Drawdown Limit</p>
            <p className="mt-1 text-lg font-bold text-white">-12%</p>
            <p className="text-xs text-slate-500">fund-level circuit breaker</p>
          </div>
        </div>
      </div>
    </div>
  );
}

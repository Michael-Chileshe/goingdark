"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    maxPositionSize: 5,
    stopLoss: 8,
    maxDrawdown: 12,
    rebalanceFrequency: "weekly",
    autoTrade: true,
    notifications: true,
    minInvestment: 1000,
    withdrawalLockDays: 30,
    managementFee: 2,
    performanceFee: 20,
  });

  const update = (key: string, value: number | string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-500">Fund parameters and risk management configuration</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Risk Management */}
        <div className="card p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">Risk Management</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-slate-500">Max Position Size (% of AUM)</label>
              <input
                type="number"
                value={settings.maxPositionSize}
                onChange={(e) => update("maxPositionSize", +e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Stop Loss Trigger (%)</label>
              <input
                type="number"
                value={settings.stopLoss}
                onChange={(e) => update("stopLoss", +e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Max Drawdown Limit (%)</label>
              <input
                type="number"
                value={settings.maxDrawdown}
                onChange={(e) => update("maxDrawdown", +e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Rebalance Frequency</label>
              <select
                value={settings.rebalanceFrequency}
                onChange={(e) => update("rebalanceFrequency", e.target.value)}
                className="input"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fund Parameters */}
        <div className="card p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">Fund Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-slate-500">Minimum Investment (ZMW)</label>
              <input
                type="number"
                value={settings.minInvestment}
                onChange={(e) => update("minInvestment", +e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Withdrawal Lock Period (days)</label>
              <input
                type="number"
                value={settings.withdrawalLockDays}
                onChange={(e) => update("withdrawalLockDays", +e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Management Fee (%/yr)</label>
              <input
                type="number"
                step="0.1"
                value={settings.managementFee}
                onChange={(e) => update("managementFee", +e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Performance Fee (% of profits)</label>
              <input
                type="number"
                value={settings.performanceFee}
                onChange={(e) => update("performanceFee", +e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="card p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">Automation</h3>
          <div className="space-y-3">
            {[
              { key: "autoTrade", label: "Auto Trading", desc: "Execute trades automatically based on strategy signals" },
              { key: "notifications", label: "Admin Notifications", desc: "Receive alerts for deposits, withdrawals, and risk events" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between rounded-lg bg-slate-800/50 p-4">
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
                <button
                  onClick={() => update(key, !((settings as Record<string, unknown>)[key] as boolean))}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    Boolean((settings as Record<string, unknown>)[key]) ? "bg-teal-600" : "bg-slate-700"
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                      Boolean((settings as Record<string, unknown>)[key]) && "translate-x-5"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card border-red-900/30 p-5">
          <h3 className="mb-4 text-sm font-semibold text-red-400">Danger Zone</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-red-900/10 p-4">
              <div>
                <p className="text-sm font-medium text-white">Emergency Stop</p>
                <p className="text-xs text-slate-500">Close all positions and halt trading immediately</p>
              </div>
              <button className="btn-danger text-xs">Emergency Stop</button>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-red-900/10 p-4">
              <div>
                <p className="text-sm font-medium text-white">Liquidate All Positions</p>
                <p className="text-xs text-slate-500">Sell all holdings at market price</p>
              </div>
              <button className="btn-danger text-xs">Liquidate</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">Save All Settings</button>
      </div>
    </div>
  );
}

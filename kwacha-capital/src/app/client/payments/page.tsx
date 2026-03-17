"use client";

import { useState } from "react";
import { mockTransactions } from "@/data/mock";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";

export default function PaymentsPage() {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState<"bank" | "mobile-money" | "crypto">("bank");
  const [filter, setFilter] = useState<"all" | "deposit" | "withdrawal">("all");
  const [submitted, setSubmitted] = useState(false);

  const myTx = mockTransactions.filter((t) => t.userId === "user-1");
  const filteredTx = myTx.filter((t) => filter === "all" || t.type === filter);

  const totalDeposits = myTx.filter((t) => t.type === "deposit").reduce((s, t) => s + (t.currency === "ZMW" ? t.amount : 0), 0);
  const totalWithdrawals = myTx.filter((t) => t.type === "withdrawal").reduce((s, t) => s + (t.currency === "ZMW" ? t.amount : 0), 0);

  const handleWithdraw = () => {
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments & Withdrawals</h1>
          <p className="text-sm text-slate-500">View your transaction history and request withdrawals</p>
        </div>
        <button onClick={() => { setShowWithdraw(true); setSubmitted(false); }} className="btn-primary">
          Request Withdrawal
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="stat-card">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Deposited</p>
          <p className="mt-2 text-2xl font-bold text-emerald-400">{formatCurrency(totalDeposits)}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Withdrawn</p>
          <p className="mt-2 text-2xl font-bold text-red-400">{formatCurrency(totalWithdrawals)}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Available Balance</p>
          <p className="mt-2 text-2xl font-bold text-white">{formatCurrency(125000)}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "deposit", "withdrawal"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              filter === f ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}s
          </button>
        ))}
      </div>

      {/* Transaction History */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Reference</th>
                <th className="table-header">Type</th>
                <th className="table-header">Method</th>
                <th className="table-header text-right">Amount</th>
                <th className="table-header">Status</th>
                <th className="table-header">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTx.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTx.map((tx) => (
                  <tr key={tx.id} className="transition-colors hover:bg-slate-800/30">
                    <td className="table-cell font-mono text-xs text-slate-400">{tx.reference}</td>
                    <td className="table-cell">
                      <span className={tx.type === "deposit" ? "text-emerald-400" : "text-red-400"}>
                        {tx.type === "deposit" ? "Deposit" : "Withdrawal"}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-xs">{tx.method}</span>
                    </td>
                    <td className="table-cell text-right font-medium text-white">
                      {formatCurrency(tx.amount, tx.currency)}
                    </td>
                    <td className="table-cell"><StatusBadge status={tx.status} /></td>
                    <td className="table-cell text-xs text-slate-500">{formatDate(tx.date)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawal Modal */}
      <Modal isOpen={showWithdraw} onClose={() => setShowWithdraw(false)} title="Request Withdrawal">
        {!submitted ? (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-slate-500">Amount (ZMW)</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                className="input"
              />
              <p className="mt-1 text-xs text-slate-500">Available: K125,000.00</p>
            </div>

            <div>
              <label className="mb-2 block text-xs text-slate-500">Withdrawal Method</label>
              <div className="flex gap-2">
                {([
                  { key: "bank", label: "Bank" },
                  { key: "mobile-money", label: "Mobile Money" },
                  { key: "crypto", label: "Crypto" },
                ] as const).map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setWithdrawMethod(m.key)}
                    className={cn(
                      "flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                      withdrawMethod === m.key
                        ? "border-teal-500 bg-teal-600/20 text-teal-400"
                        : "border-slate-700 bg-slate-800 text-slate-400"
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {withdrawMethod === "bank" && (
              <div>
                <label className="mb-1 block text-xs text-slate-500">Bank Account Number</label>
                <input type="text" placeholder="Enter account number" className="input" />
              </div>
            )}

            {withdrawMethod === "mobile-money" && (
              <div>
                <label className="mb-1 block text-xs text-slate-500">Phone Number</label>
                <input type="tel" placeholder="+260 9X XXX XXXX" className="input" />
              </div>
            )}

            {withdrawMethod === "crypto" && (
              <div>
                <label className="mb-1 block text-xs text-slate-500">Wallet Address</label>
                <input type="text" placeholder="Enter wallet address" className="input" />
              </div>
            )}

            <div className="text-xs text-amber-400">
              Withdrawals are processed within 24-48 hours. A 30-day lock period applies to new investments.
            </div>

            <button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
              className="btn-primary w-full"
            >
              Submit Withdrawal Request
            </button>
          </div>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/20">
              <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-white">Withdrawal request submitted!</p>
            <p className="mt-1 text-xs text-slate-400">You&apos;ll receive a confirmation once processed.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

"use client";

import { useState } from "react";
import { mockUsers, mockTransactions } from "@/data/mock";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import StatCard from "@/components/ui/StatCard";
import Modal from "@/components/ui/Modal";
import { Transaction } from "@/types";

export default function FundsPage() {
  const [tab, setTab] = useState<"investors" | "transactions">("investors");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [txFilter, setTxFilter] = useState<"all" | "deposit" | "withdrawal">("all");

  const totalBalance = mockUsers.reduce((s, u) => s + u.balance, 0);
  const totalInvested = mockUsers.reduce((s, u) => s + u.totalInvested, 0);
  const totalReturns = mockUsers.reduce((s, u) => s + u.totalReturns, 0);
  const pendingTx = mockTransactions.filter((t) => t.status === "pending");
  const filteredTx = mockTransactions.filter((t) => txFilter === "all" || t.type === txFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Fund & Investors</h1>
        <p className="text-sm text-slate-500">Manage investor accounts and fund flows</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Investor Balances"
          value={formatCurrency(totalBalance)}
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Total Invested"
          value={formatCurrency(totalInvested)}
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
        <StatCard
          title="Total Returns Paid"
          value={formatCurrency(totalReturns)}
          changeType="positive"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Pending Transactions"
          value={pendingTx.length.toString()}
          change="Requires action"
          changeType={pendingTx.length > 0 ? "negative" : "neutral"}
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-slate-900 p-1">
        {(["investors", "transactions"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              tab === t ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
            )}
          >
            {t === "investors" ? "Investors" : "Transactions"}
          </button>
        ))}
      </div>

      {tab === "investors" ? (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Phone</th>
                  <th className="table-header text-right">Balance</th>
                  <th className="table-header text-right">Invested</th>
                  <th className="table-header text-right">Returns</th>
                  <th className="table-header">KYC</th>
                  <th className="table-header">Joined</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((u) => (
                  <tr key={u.id} className="transition-colors hover:bg-slate-800/30">
                    <td className="table-cell font-medium text-white">{u.name}</td>
                    <td className="table-cell text-slate-400">{u.email}</td>
                    <td className="table-cell text-slate-400">{u.phone}</td>
                    <td className="table-cell text-right font-medium text-white">{formatCurrency(u.balance)}</td>
                    <td className="table-cell text-right">{formatCurrency(u.totalInvested)}</td>
                    <td className="table-cell text-right text-emerald-400">{formatCurrency(u.totalReturns)}</td>
                    <td className="table-cell">
                      <StatusBadge status={u.kycVerified ? "completed" : "pending"} />
                    </td>
                    <td className="table-cell text-xs text-slate-500">{formatDate(u.joinedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            {(["all", "deposit", "withdrawal"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setTxFilter(f)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  txFilter === f ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                )}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}s
              </button>
            ))}
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">Reference</th>
                    <th className="table-header">Investor</th>
                    <th className="table-header">Type</th>
                    <th className="table-header">Method</th>
                    <th className="table-header text-right">Amount</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Date</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTx.map((tx) => (
                    <tr key={tx.id} className="transition-colors hover:bg-slate-800/30">
                      <td className="table-cell font-mono text-xs text-slate-400">{tx.reference}</td>
                      <td className="table-cell font-medium text-white">{tx.userName}</td>
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
                      <td className="table-cell">
                        {tx.status === "pending" && (
                          <div className="flex gap-1">
                            <button className="rounded bg-emerald-600/20 px-2 py-1 text-xs text-emerald-400 hover:bg-emerald-600/30">
                              Approve
                            </button>
                            <button className="rounded bg-red-600/20 px-2 py-1 text-xs text-red-400 hover:bg-red-600/30">
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <Modal isOpen={!!selectedTx} onClose={() => setSelectedTx(null)} title="Transaction Details">
        {selectedTx && (
          <div className="space-y-3 text-sm">
            <p><span className="text-slate-500">Reference:</span> <span className="text-white">{selectedTx.reference}</span></p>
            <p><span className="text-slate-500">Amount:</span> <span className="text-white">{formatCurrency(selectedTx.amount, selectedTx.currency)}</span></p>
          </div>
        )}
      </Modal>
    </div>
  );
}

"use client";

import StatCard from "@/components/ui/StatCard";
import PerformanceChart from "@/components/charts/PerformanceChart";
import AllocationChart from "@/components/charts/AllocationChart";
import { mockPositions, mockTransactions } from "@/data/mock";
import { formatCurrency, formatPercent, formatDate } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";

export default function PortfolioPage() {
  const openPositions = mockPositions.filter((p) => p.status === "open");
  const totalValue = 125000;
  const totalInvested = 100000;
  const totalReturns = totalValue - totalInvested;
  const returnPct = (totalReturns / totalInvested) * 100;
  const myTx = mockTransactions.filter((t) => t.userId === "user-1").slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Portfolio</h1>
        <p className="text-sm text-slate-500">Welcome back, Mwila. Here&apos;s your investment overview.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Portfolio Value"
          value={formatCurrency(totalValue)}
          change={formatPercent(returnPct) + " all time"}
          changeType="positive"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Total Invested"
          value={formatCurrency(totalInvested)}
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>}
        />
        <StatCard
          title="Total Returns"
          value={formatCurrency(totalReturns)}
          change="10-15% target annually"
          changeType="positive"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
        <StatCard
          title="Active Positions"
          value={openPositions.length.toString()}
          subtitle="Across 5 strategies"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <AllocationChart />
      </div>

      {/* Recent Activity */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate-800 px-5 py-4">
          <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
        </div>
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
              {myTx.map((tx) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

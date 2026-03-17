"use client";

import StatCard from "@/components/ui/StatCard";
import PerformanceChart from "@/components/charts/PerformanceChart";
import AllocationChart from "@/components/charts/AllocationChart";
import FlowChart from "@/components/charts/FlowChart";
import StatusBadge from "@/components/ui/StatusBadge";
import { mockAdminDashboard, mockTransactions, mockPositions } from "@/data/mock";
import { formatCurrency, formatPercent, getPnlColor } from "@/lib/utils";

export default function AdminDashboard() {
  const d = mockAdminDashboard;
  const recentTx = mockTransactions.slice(0, 5);
  const topPositions = mockPositions.filter((p) => p.status === "open").slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">Fund overview and management</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
            All Systems Operational
          </span>
          <span className="text-xs text-slate-500">Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total AUM"
          value={formatCurrency(d.totalAum)}
          change={formatPercent(d.ytdReturn) + " YTD"}
          changeType="positive"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Total Investors"
          value={d.totalInvestors.toString()}
          change="+12 this month"
          changeType="positive"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        <StatCard
          title="Monthly Return"
          value={formatPercent(d.monthlyReturn)}
          change="Target: 0.83-1.25%"
          changeType="positive"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
        <StatCard
          title="Win Rate"
          value={`${d.winRate}%`}
          change={`${d.activePositions} active positions`}
          changeType="positive"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      {/* Net Flow Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Inflows"
          value={formatCurrency(d.totalInflows)}
          changeType="positive"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>}
        />
        <StatCard
          title="Total Outflows"
          value={formatCurrency(d.totalOutflows)}
          changeType="negative"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" /></svg>}
        />
        <StatCard
          title="Net Flow"
          value={formatCurrency(d.netFlow)}
          change="Healthy inflow ratio"
          changeType="positive"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <AllocationChart />
      </div>

      {/* Flow Chart */}
      <FlowChart />

      {/* Tables Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Positions */}
        <div className="card overflow-hidden">
          <div className="border-b border-slate-800 px-5 py-4">
            <h3 className="text-sm font-semibold text-white">Top Open Positions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">Ticker</th>
                  <th className="table-header">Strategy</th>
                  <th className="table-header text-right">P/L</th>
                  <th className="table-header text-right">Return</th>
                </tr>
              </thead>
              <tbody>
                {topPositions.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-slate-800/30">
                    <td className="table-cell">
                      <span className="font-medium text-white">{p.ticker}</span>
                      <span className="ml-2 text-xs text-slate-500">{p.sector}</span>
                    </td>
                    <td className="table-cell text-xs">{p.strategy}</td>
                    <td className={`table-cell text-right font-medium ${getPnlColor(p.pnl)}`}>
                      {formatCurrency(p.pnl)}
                    </td>
                    <td className={`table-cell text-right font-medium ${getPnlColor(p.pnlPercent)}`}>
                      {formatPercent(p.pnlPercent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card overflow-hidden">
          <div className="border-b border-slate-800 px-5 py-4">
            <h3 className="text-sm font-semibold text-white">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">Investor</th>
                  <th className="table-header">Type</th>
                  <th className="table-header text-right">Amount</th>
                  <th className="table-header text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTx.map((tx) => (
                  <tr key={tx.id} className="transition-colors hover:bg-slate-800/30">
                    <td className="table-cell">
                      <span className="font-medium text-white">{tx.userName}</span>
                      <span className="ml-2 text-xs text-slate-500">{tx.method}</span>
                    </td>
                    <td className="table-cell">
                      <span className={tx.type === "deposit" ? "text-emerald-400" : "text-red-400"}>
                        {tx.type === "deposit" ? "Deposit" : "Withdrawal"}
                      </span>
                    </td>
                    <td className="table-cell text-right font-medium text-white">
                      {formatCurrency(tx.amount, tx.currency)}
                    </td>
                    <td className="table-cell text-right">
                      <StatusBadge status={tx.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

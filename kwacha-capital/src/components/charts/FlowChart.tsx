"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Oct", inflows: 320000, outflows: 45000 },
  { month: "Nov", inflows: 410000, outflows: 62000 },
  { month: "Dec", inflows: 380000, outflows: 85000 },
  { month: "Jan", inflows: 290000, outflows: 38000 },
  { month: "Feb", inflows: 450000, outflows: 72000 },
  { month: "Mar", inflows: 520000, outflows: 55000 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload) return null;
  return (
    <div className="custom-tooltip">
      <p className="mb-1 text-xs font-medium text-slate-400">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: K{(entry.value / 1000).toFixed(0)}k
        </p>
      ))}
    </div>
  );
}

export default function FlowChart() {
  return (
    <div className="card p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">Fund Flows (Monthly)</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 11 }} />
          <YAxis stroke="#475569" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            formatter={(value) => <span className="text-slate-400">{value}</span>}
          />
          <Bar dataKey="inflows" name="Inflows" fill="#14b8a6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="outflows" name="Outflows" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

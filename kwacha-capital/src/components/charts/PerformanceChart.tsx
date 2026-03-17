"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockPerformance } from "@/data/mock";

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
          {entry.name}: {entry.value.toFixed(2)}%
        </p>
      ))}
    </div>
  );
}

export default function PerformanceChart() {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Fund Performance vs LUSE All-Share Index</h3>
          <p className="text-xs text-slate-500">Indexed to 100 at inception</p>
        </div>
        <div className="flex gap-2">
          {["1M", "3M", "6M", "1Y", "All"].map((period) => (
            <button
              key={period}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                period === "All"
                  ? "bg-teal-600/20 text-teal-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockPerformance}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="date" stroke="#475569" tick={{ fontSize: 11 }} />
          <YAxis stroke="#475569" tick={{ fontSize: 11 }} domain={["dataMin - 1", "dataMax + 1"]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            formatter={(value) => <span className="text-slate-400">{value}</span>}
          />
          <Line
            type="monotone"
            dataKey="value"
            name="Kwacha Capital"
            stroke="#14b8a6"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#14b8a6" }}
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            name="LUSE All-Share"
            stroke="#475569"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

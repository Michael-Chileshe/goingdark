"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockStrategies } from "@/data/mock";

const COLORS = ["#14b8a6", "#0ea5e9", "#f59e0b", "#ef4444", "#06b6d4"];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="custom-tooltip">
      <p className="text-xs font-medium text-white">{payload[0].name}</p>
      <p className="text-xs text-slate-400">{payload[0].value}% allocation</p>
    </div>
  );
}

export default function AllocationChart() {
  const data = mockStrategies.map((s) => ({ name: s.name, value: s.allocation }));

  return (
    <div className="card p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">Strategy Allocation</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {data.map((entry, i) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
            <span className="text-slate-400">{entry.name}</span>
            <span className="ml-auto font-medium text-slate-300">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

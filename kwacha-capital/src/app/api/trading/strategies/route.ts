import { NextResponse } from "next/server";
import { mockStrategies } from "@/data/mock";

export async function GET() {
  return NextResponse.json({
    strategies: mockStrategies,
    totalAllocation: mockStrategies.reduce((s, st) => s + st.allocation, 0),
    totalPnl: mockStrategies.reduce((s, st) => s + st.pnl, 0),
  });
}

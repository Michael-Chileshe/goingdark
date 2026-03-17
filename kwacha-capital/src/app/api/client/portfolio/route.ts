import { NextResponse } from "next/server";
import { mockPositions, mockTransactions, mockPerformance } from "@/data/mock";

export async function GET() {
  const openPositions = mockPositions.filter((p) => p.status === "open");
  const totalValue = 125000;
  const totalInvested = 100000;

  return NextResponse.json({
    portfolio: {
      totalValue,
      totalInvested,
      totalReturns: totalValue - totalInvested,
      returnPercent: ((totalValue - totalInvested) / totalInvested) * 100,
      activePositions: openPositions.length,
    },
    recentTransactions: mockTransactions.filter((t) => t.userId === "user-1").slice(0, 5),
    performance: mockPerformance,
  });
}

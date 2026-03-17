import { NextRequest, NextResponse } from "next/server";
import { mockUsers, mockTransactions } from "@/data/mock";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // "investors" | "transactions"

  if (type === "transactions") {
    const txFilter = searchParams.get("filter") || "all";
    let transactions = [...mockTransactions];
    if (txFilter !== "all") {
      transactions = transactions.filter((t) => t.type === txFilter);
    }
    return NextResponse.json({
      transactions,
      summary: {
        totalDeposits: mockTransactions.filter((t) => t.type === "deposit").reduce((s, t) => s + t.amount, 0),
        totalWithdrawals: mockTransactions.filter((t) => t.type === "withdrawal").reduce((s, t) => s + t.amount, 0),
        pending: mockTransactions.filter((t) => t.status === "pending").length,
      },
    });
  }

  return NextResponse.json({
    investors: mockUsers,
    summary: {
      total: mockUsers.length,
      totalBalance: mockUsers.reduce((s, u) => s + u.balance, 0),
      totalInvested: mockUsers.reduce((s, u) => s + u.totalInvested, 0),
      totalReturns: mockUsers.reduce((s, u) => s + u.totalReturns, 0),
      kycVerified: mockUsers.filter((u) => u.kycVerified).length,
    },
  });
}

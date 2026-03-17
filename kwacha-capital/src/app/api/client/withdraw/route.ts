import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { amount, method, accountDetails } = await req.json();

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  // Demo: In production, verify balance, lock period, and initiate withdrawal
  return NextResponse.json({
    success: true,
    withdrawal: {
      id: `wd-${Date.now()}`,
      reference: `WD-${Date.now().toString(36).toUpperCase()}`,
      amount,
      method,
      accountDetails,
      status: "pending",
      estimatedProcessing: "24-48 hours",
      date: new Date().toISOString().split("T")[0],
    },
  });
}

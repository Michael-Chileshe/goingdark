import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { amount, paymentMethodId, methodType } = await req.json();

  if (!amount || amount < 1000) {
    return NextResponse.json(
      { error: "Minimum investment is K1,000" },
      { status: 400 }
    );
  }

  // Demo: In production, initiate actual payment flow
  const reference = `INV-${Date.now().toString(36).toUpperCase()}`;

  return NextResponse.json({
    success: true,
    transaction: {
      id: `tx-${Date.now()}`,
      reference,
      amount,
      methodType,
      paymentMethodId,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    },
    paymentInstructions: methodType === "bank"
      ? {
          accountName: "Kwacha Capital Ltd",
          accountNumber: "0100-2345-6789",
          bank: "ZANACO",
          branch: "Lusaka Main",
          reference,
        }
      : methodType === "mobile-money"
      ? {
          phoneNumber: "+260 97 123 4567",
          name: "Kwacha Capital Ltd",
          reference,
        }
      : {
          walletAddress: "TRx7fH8kN2mQ4...wP9vL3jY6bC1",
          network: "TRC-20",
          reference,
        },
  });
}

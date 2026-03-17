import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Demo registration - in production, validate, hash password, store in DB
  return NextResponse.json({
    success: true,
    user: {
      id: `user-${Date.now()}`,
      email: body.email,
      name: body.name,
      phone: body.phone,
      role: "client",
      balance: 0,
      totalInvested: 0,
      totalReturns: 0,
      joinedAt: new Date().toISOString().split("T")[0],
      kycVerified: false,
    },
    token: "demo-jwt-token",
  });
}

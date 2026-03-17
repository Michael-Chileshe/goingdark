import { NextRequest, NextResponse } from "next/server";
import { mockUsers } from "@/data/mock";

export async function POST(req: NextRequest) {
  const { email, role } = await req.json();

  // Demo auth - in production, use proper auth (NextAuth, etc.)
  const user = mockUsers.find((u) => u.email === email) || mockUsers[0];

  return NextResponse.json({
    success: true,
    user: { ...user, role: role || "client" },
    token: "demo-jwt-token",
    redirect: role === "admin" ? "/admin" : "/client/portfolio",
  });
}

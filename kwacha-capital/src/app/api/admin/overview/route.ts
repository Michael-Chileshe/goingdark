import { NextResponse } from "next/server";
import { mockAdminDashboard, mockPerformance } from "@/data/mock";

export async function GET() {
  return NextResponse.json({
    dashboard: mockAdminDashboard,
    performance: mockPerformance,
  });
}

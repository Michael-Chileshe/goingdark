import { NextRequest, NextResponse } from "next/server";
import { mockPositions } from "@/data/mock";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const strategy = searchParams.get("strategy");

  let positions = [...mockPositions];

  if (status && status !== "all") {
    positions = positions.filter((p) => p.status === status);
  }
  if (strategy && strategy !== "all") {
    positions = positions.filter((p) => p.strategy === strategy);
  }

  const totalPnl = positions.reduce((sum, p) => sum + p.pnl, 0);
  const openCount = positions.filter((p) => p.status === "open").length;

  return NextResponse.json({
    positions,
    summary: {
      total: positions.length,
      open: openCount,
      closed: positions.length - openCount,
      totalPnl,
    },
  });
}

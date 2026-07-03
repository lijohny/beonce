import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const emiAccountId = searchParams.get("emiAccountId");

  const mandates = await prisma.mandateRecord.findMany({
    where: {
      userId,
      ...(emiAccountId && { emiAccountId: Number(emiAccountId) }),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      authType: true,
      maxAmount: true,
      status: true,
      referenceNo: true,
      activatedAt: true,
      failureReason: true,
      createdAt: true,
      emiAccount: { select: { id: true, emiAmount: true, nextDueDate: true } },
    },
  });

  return NextResponse.json({ mandates });
}

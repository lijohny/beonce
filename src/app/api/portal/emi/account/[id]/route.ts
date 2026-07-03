import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const account = await prisma.emiAccount.findFirst({
    where: { id: Number(id), userId },
    include: {
      payments: {
        where: { status: "SUCCESS" },
        orderBy: { paidAt: "desc" },
        take: 5,
        select: { id: true, type: true, amount: true, gst: true, paidAt: true, razorpayPaymentId: true },
      },
    },
  });

  if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const remaining = account.totalEmis - account.paidEmis;
  const paidAmount = Number(account.emiAmount) * account.paidEmis;
  const pendingAmount = Number(account.emiAmount) * remaining;

  return NextResponse.json({
    account: {
      ...account,
      remaining,
      paidAmount,
      pendingAmount,
      progressPercent: Math.round((account.paidEmis / account.totalEmis) * 100),
    },
  });
}

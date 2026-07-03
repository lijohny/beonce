import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = 10;

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      where: { emiAccount: { userId } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        type: true,
        status: true,
        amount: true,
        gst: true,
        razorpayPaymentId: true,
        paidAt: true,
        createdAt: true,
        emiAccount: { select: { id: true, loanAmount: true, emiAmount: true } },
      },
    }),
    prisma.payment.count({ where: { emiAccount: { userId } } }),
  ]);

  return NextResponse.json({ payments, total, page, pages: Math.ceil(total / limit) });
}

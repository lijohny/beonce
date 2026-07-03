import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const status = searchParams.get("status") || undefined;
  const type = searchParams.get("type") || undefined;
  const search = searchParams.get("search") || "";
  const limit = 20;

  const where = {
    ...(status && { status: status as never }),
    ...(type && { type: type as never }),
    ...(search && {
      OR: [
        { razorpayPaymentId: { contains: search } },
        { razorpayOrderId: { contains: search } },
        { emiAccount: { user: { mobile: { contains: search } } } },
      ],
    }),
  };

  const [payments, total, aggregate] = await Promise.all([
    prisma.payment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true, type: true, status: true, amount: true, gst: true,
        razorpayOrderId: true, razorpayPaymentId: true, paidAt: true, createdAt: true,
        emiAccount: { select: { id: true, user: { select: { name: true, mobile: true } } } },
      },
    }),
    prisma.payment.count({ where }),
    prisma.payment.aggregate({
      where: { status: "SUCCESS" },
      _sum: { amount: true, gst: true },
    }),
  ]);

  return NextResponse.json({
    payments, total, page, pages: Math.ceil(total / limit),
    totalCollected: Number(aggregate._sum.amount || 0) + Number(aggregate._sum.gst || 0),
  });
}

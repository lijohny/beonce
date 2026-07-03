import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createRazorpayOrder, calcGst } from "@/lib/razorpay";
import { z } from "zod";

const schema = z.object({
  emiAccountId: z.number().int().positive(),
  type: z.enum(["EMI", "ADVANCE_EMI", "PROCESSING_FEE"]),
});

export async function POST(req: NextRequest) {
  const userId = Number(req.headers.get("x-user-id"));
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { emiAccountId, type } = parsed.data;

  const emiAccount = await prisma.emiAccount.findFirst({
    where: { id: emiAccountId, userId },
  });
  if (!emiAccount) return NextResponse.json({ error: "EMI account not found" }, { status: 404 });

  let baseAmount: number;

  if (type === "PROCESSING_FEE") {
    baseAmount = Number(emiAccount.processingFee);
  } else if (type === "ADVANCE_EMI") {
    const remaining = emiAccount.totalEmis - emiAccount.paidEmis;
    if (remaining <= 0) return NextResponse.json({ error: "No remaining EMIs" }, { status: 400 });
    baseAmount = Number(emiAccount.emiAmount);
  } else {
    baseAmount = Number(emiAccount.emiAmount);
  }

  const gst = type === "PROCESSING_FEE" ? calcGst(baseAmount) : 0;
  const totalAmount = baseAmount + gst;

  const receipt = `rcpt_${emiAccountId}_${Date.now()}`;
  const order = await createRazorpayOrder(totalAmount, receipt, {
    userId: String(userId),
    emiAccountId: String(emiAccountId),
    type,
  });

  // Create pending payment record
  const payment = await prisma.payment.create({
    data: {
      emiAccountId,
      razorpayOrderId: order.id,
      amount: baseAmount,
      gst,
      type,
      status: "PENDING",
    },
  });

  return NextResponse.json({
    orderId: order.id,
    paymentId: payment.id,
    amount: Math.round(totalAmount * 100), // paise
    currency: "INR",
    keyId: process.env.RAZORPAY_KEY_ID,
  });
}
